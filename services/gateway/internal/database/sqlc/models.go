package db

import (
	"time"
)

// Users represents a user in the system
type Users struct {
	ID        int64     `json:"id"`
	Username  string    `json:"username"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Accounts represents a user's account (wallet)
type Accounts struct {
	ID        int64     `json:"id"`
	UserID    int32     `json:"user_id"`
	Currency  string    `json:"currency"`
	Balance   string    `json:"balance"` // Sử dụng string để tránh lỗi làm tròn
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Transactions represents a transaction record
type Transactions struct {
	ID        int64     `json:"id"`
	AccountID int64     `json:"account_id"`
	Type      string    `json:"type"` // "deposit", "withdraw", "transfer"
	Amount    string    `json:"amount"`
	Status    string    `json:"status"` // "pending", "completed", "failed"
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
