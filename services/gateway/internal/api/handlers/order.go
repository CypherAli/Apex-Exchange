package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/nats-io/nats.go"
	db "github.com/trading-platform/gateway/internal/database/sqlc"
	"github.com/trading-platform/gateway/internal/models"
	"github.com/trading-platform/gateway/internal/util"
)

type OrderHandler struct {
	natsConn *nats.Conn
	store    db.Store
}

func NewOrderHandler(nc *nats.Conn, store db.Store) *OrderHandler {
	return &OrderHandler{
		natsConn: nc,
		store:    store,
	}
}

type createOrderRequest struct {
	Symbol       string  `json:"symbol" binding:"required"`
	Price        float64 `json:"price"`
	Amount       float64 `json:"amount" binding:"required,gt=0"`
	Quantity     float64 `json:"quantity"` // Alias for amount
	Side         string  `json:"side" binding:"required"`
	Type         string  `json:"type" binding:"required,oneof=Limit Market StopLimit"` // Thêm StopLimit
	TriggerPrice float64 `json:"trigger_price"`                                        // Bắt buộc cho StopLimit
}

func (h *OrderHandler) PlaceOrder(ctx *gin.Context) {
	var req createOrderRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Cho phép dùng quantity hoặc amount
	amount := req.Amount
	if amount == 0 && req.Quantity > 0 {
		amount = req.Quantity
	}

	// Chuẩn hóa side: buy/sell/Bid/Ask -> BUY/SELL (cho database) và Bid/Ask (cho engine)
	sideDB := ""        // Side cho database
	sideEngine := ""    // Side cho engine
	
	switch req.Side {
	case "buy", "Buy", "BUY":
		sideDB = "BUY"
		sideEngine = "Bid"
	case "sell", "Sell", "SELL":
		sideDB = "SELL"
		sideEngine = "Ask"
	case "Bid", "bid":
		sideDB = "BUY"
		sideEngine = "Bid"
	case "Ask", "ask":
		sideDB = "SELL"
		sideEngine = "Ask"
	default:
		ctx.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("invalid side: %s (expected: buy, sell, Bid, or Ask)", req.Side)})
		return
	}

	// Chuẩn hóa type: Mặc định là Limit nếu không có
	orderType := req.Type
	if orderType == "" {
		orderType = "Limit"
	}
	
	// Uppercase orderType cho database
	orderTypeDB := ""
	switch orderType {
	case "Limit", "limit":
		orderTypeDB = "LIMIT"
	case "Market", "market":
		orderTypeDB = "MARKET"
	case "StopLimit", "stop_limit":
		orderTypeDB = "LIMIT" // StopLimit lưu như LIMIT
	default:
		orderTypeDB = "LIMIT"
	}

	// Validate: Market Order không cần price, Limit Order bắt buộc có price
	if orderType == "Limit" && req.Price <= 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Limit order requires price > 0"})
		return
	}

	// Validate: StopLimit Order bắt buộc có cả trigger_price và limit price
	if orderType == "StopLimit" {
		if req.TriggerPrice <= 0 {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "StopLimit order requires trigger_price > 0"})
			return
		}
		if req.Price <= 0 {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "StopLimit order requires price > 0"})
			return
		}

		// Logic validation: Stop-Loss Sell (giảm giá) vs Stop-Buy (tăng giá)
		// Stop-Loss Sell: trigger_price < current_price, limit_price <= trigger_price
		// Stop-Buy: trigger_price > current_price, limit_price >= trigger_price
		// (Tạm thời skip validation này, engine sẽ xử lý)
	}

	// 1. Lấy UserID từ Token và get user từ database
	payload := ctx.MustGet("authorization_payload").(*util.Payload)
	user, err := h.store.GetUserByUsername(ctx, payload.Username)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get user"})
		return
	}

	// 2. Insert order vào database với UUID (dùng sideDB và orderTypeDB uppercase)
	orderIDStr, err := h.store.InsertOrderWithUUID(ctx, user.ID, req.Symbol, sideDB, orderTypeDB, req.Price, amount)
	if err != nil {
		log.Printf("❌ Failed to insert order: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save order"})
		return
	}

	log.Printf("✅ Order saved to database: ID=%s", orderIDStr)

	// 3. Generate numeric order ID for engine
	orderID := uint64(time.Now().UnixNano())

	// 4. Chuẩn bị trigger_price (chỉ có với StopLimit)
	triggerPrice := ""
	if orderType == "StopLimit" {
		triggerPrice = fmt.Sprintf("%.8f", req.TriggerPrice)
	}

	// Parse user.ID to uint64 for engine
	userIDInt := uint64(1) // Default fallback
	if id, err := strconv.ParseUint(user.ID[:8], 16, 64); err == nil {
		userIDInt = id
	}

	// 5. Tạo Command chuẩn format Rust (chuyển số về string) - dùng sideEngine
	cmd := models.Command{
		Type: "Place",
		Data: models.OrderData{
			ID:           orderID,
			UserID:       userIDInt,
			Symbol:       req.Symbol,
			Price:        fmt.Sprintf("%.8f", req.Price),
			Amount:       fmt.Sprintf("%.8f", amount),
			Side:         sideEngine, // Dùng sideEngine cho NATS
			Type:         orderType,
			TriggerPrice: triggerPrice,
			Timestamp:    time.Now().Unix(),
		},
	}

	// 6. Serialize sang JSON
	data, err := json.Marshal(cmd)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to marshal command"})
		return
	}

	// 7. Bắn vào NATS topic "orders"
	err = h.natsConn.Publish("orders", data)
	if err != nil {
		// Nếu NATS fail, log nhưng vẫn trả về success vì order đã lưu database
		log.Printf("⚠️ Failed to publish to NATS: %v", err)
	}

	// 8. Trả về thành công
	ctx.JSON(http.StatusOK, gin.H{
		"message":      "Order placed successfully",
		"order_id":     orderID,
		"order_id_db":  orderIDStr,
		"order": gin.H{
			"id":     orderIDStr,
			"symbol": req.Symbol,
			"side":   sideDB,
			"price":  req.Price,
			"amount": amount,
			"type":   orderTypeDB,
			"status": "OPEN",
		},
	})
}
// cancelOrderRequest defines the request structure for canceling an order
type cancelOrderRequest struct {
	OrderID uint64 `json:"order_id" binding:"required"`
}

// ListOpenOrders lists all pending orders for the authenticated user
func (h *OrderHandler) ListOpenOrders(ctx *gin.Context) {
	// Lấy UserID từ Token
	payload := ctx.MustGet("authorization_payload").(*util.Payload)

	// Get user ID from username
	user, err := h.store.GetUserByUsername(ctx, payload.Username)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to get user"})
		return
	}

	// Query orders với UUID
	orders, err := h.store.ListOrdersWithUUID(ctx, user.ID)
	if err != nil {
		log.Printf("❌ Failed to list orders: %v", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query orders"})
		return
	}

	// Ensure we always return an array, not null
	if orders == nil {
		orders = []map[string]interface{}{}
	}

	log.Printf("✅ Found %d orders for user %s", len(orders), user.Username)
	ctx.JSON(http.StatusOK, orders)
}

// CancelOrder sends a cancel command to the matching engine via NATS
func (h *OrderHandler) CancelOrder(ctx *gin.Context) {
	var req cancelOrderRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify that the order belongs to the user (optional security check)
	// For now, we trust the request and send to engine

	// Tạo Command Hủy gửi sang NATS
	cmd := models.Command{
		Type: "Cancel",
		Data: models.CancelData{
			OrderID: req.OrderID,
		},
	}

	// Serialize JSON
	data, err := json.Marshal(cmd)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to marshal cancel command"})
		return
	}

	// Bắn sang NATS topic "orders" (Rust đang nghe cái này)
	if err := h.natsConn.Publish("orders", data); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "failed to publish cancel command"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Cancel request sent successfully"})
}
