package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	db "github.com/trading-platform/gateway/internal/database/sqlc"
	"github.com/trading-platform/gateway/internal/util"
)

type BalanceHandler struct {
	store db.Store
}

func NewBalanceHandler(store db.Store) *BalanceHandler {
	return &BalanceHandler{store: store}
}

type BalanceResponse struct {
	Currency  string `json:"currency"`
	Available string `json:"available"`
	Locked    string `json:"locked"`
}

// ListBalance returns all account balances for the authenticated user
func (h *BalanceHandler) ListBalance(ctx *gin.Context) {
	// Get user from JWT token
	payload := ctx.MustGet("authorization_payload").(*util.Payload)
	_, err := h.store.GetUserByUsername(ctx, payload.Username)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	// Return hardcoded currencies with 0 balance for now
	// TODO: Implement proper account_balances table queries
	response := []BalanceResponse{
		{
			Currency:  "BTC",
			Available: "0.0000",
			Locked:    "0.0000",
		},
		{
			Currency:  "USDT",
			Available: "0.0000",
			Locked:    "0.0000",
		},
	}

	ctx.JSON(http.StatusOK, response)
}
