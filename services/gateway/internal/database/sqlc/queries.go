package db

import (
	"context"
)

// Querier defines all database query operations
type Querier interface {
	// User operations
	GetUserByUsername(ctx context.Context, username string) (Users, error)
	GetUserByID(ctx context.Context, id int64) (Users, error)
	CreateUser(ctx context.Context, arg CreateUserParams) (Users, error)

	// Account operations
	GetAccountsByUserID(ctx context.Context, userID int32) ([]Accounts, error)
	GetAccountByUserAndType(ctx context.Context, arg GetAccountByUserAndTypeParams) (Accounts, error)
	CreateAccount(ctx context.Context, arg CreateAccountParams) (Accounts, error)
	UpdateAccountBalance(ctx context.Context, arg UpdateAccountBalanceParams) (Accounts, error)

	// Transaction operations
	CreateDeposit(ctx context.Context, arg CreateDepositParams) (Transactions, error)
	GetTransactionsByAccountID(ctx context.Context, accountID int64) ([]Transactions, error)
}

// CreateUserParams contains parameters for CreateUser
type CreateUserParams struct {
	Username string
	Email    string
	Password string
}

// GetAccountByUserAndTypeParams contains parameters for GetAccountByUserAndType
type GetAccountByUserAndTypeParams struct {
	UserID   int32
	Currency string
}

// CreateAccountParams contains parameters for CreateAccount
type CreateAccountParams struct {
	UserID   int32
	Currency string
	Balance  string
}

// UpdateAccountBalanceParams contains parameters for UpdateAccountBalance
type UpdateAccountBalanceParams struct {
	ID     int64
	Amount string
}

// CreateDepositParams contains parameters for CreateDeposit
type CreateDepositParams struct {
	AccountID int64
	Amount    string
}
