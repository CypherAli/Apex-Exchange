package models

// EngineEvent là struct đại diện cho event từ Rust Engine
type EngineEvent struct {
	Type string      `json:"type"` // "OrderPlaced", "TradeExecuted", "OrderCancelled"
	Data interface{} `json:"data"`
}

// OrderPlacedData là dữ liệu khi order được đặt thành công
type OrderPlacedData struct {
	OrderID uint64 `json:"order_id"`
	UserID  uint64 `json:"user_id"`
	Symbol  string `json:"symbol"`
	Price   string `json:"price"`
	Amount  string `json:"amount"`
	Side    string `json:"side"` // "Bid" hoặc "Ask"
}

// TradeExecutedData là dữ liệu khi trade được khớp
type TradeExecutedData struct {
	Trade TradeData `json:"trade"`
}

// TradeData chứa thông tin chi tiết của trade
type TradeData struct {
	TradeID       uint64 `json:"trade_id"`
	BuyerOrderID  uint64 `json:"buyer_order_id"`
	SellerOrderID uint64 `json:"seller_order_id"`
	Price         string `json:"price"`
	Amount        string `json:"amount"`
	Timestamp     uint64 `json:"timestamp"`
}

// OrderCancelledData là dữ liệu khi order bị hủy
type OrderCancelledData struct {
	OrderID uint64 `json:"order_id"`
	Success bool   `json:"success"`
}
