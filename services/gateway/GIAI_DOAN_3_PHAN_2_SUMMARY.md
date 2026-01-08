# 🎯 Giai Đoạn 3 - Phần 2: Transactional Banking

## ✅ Đã hoàn thành

Chúng ta đã nâng cấp Gateway Service để hỗ trợ **xử lý giao dịch tiền tệ với tính nguyên tử (Atomicity)** thông qua Database Transactions.

### 📁 Cấu trúc mới được tạo

```
services/gateway/
├── internal/
│   ├── database/
│   │   └── sqlc/
│   │       ├── store.go       # Store interface với transaction support
│   │       ├── db.go          # Queries implementation
│   │       ├── models.go      # Database models
│   │       └── queries.go     # Querier interface
│   └── api/
│       └── handlers/
│           └── account.go     # Account API handlers
├── migrations/
│   ├── 000003_add_transactions_table.up.sql
│   └── 000003_add_transactions_table.down.sql
└── .env.example
```

## 🚀 Tính năng chính

### 1. **Database Transaction Support**

**File: `internal/database/sqlc/store.go`**
- ✅ `Store` interface: Định nghĩa các operations với transactions
- ✅ `SQLStore` struct: Implement với pgxpool connection
- ✅ `execTx()`: Helper function để chạy transaction an toàn
- ✅ `DepositTx()`: Transaction nạp tiền với tính nguyên tử

**Đảm bảo nguyên tắc ACID:**
```go
// Hoặc là cả hai thao tác thành công
1. Cộng tiền vào ví (UpdateAccountBalance)
2. Ghi lịch sử giao dịch (CreateDeposit)

// Hoặc là không có gì thay đổi (rollback nếu có lỗi)
```

### 2. **Database Queries & Models**

**File: `internal/database/sqlc/db.go`**
- ✅ `Queries` struct với DBTX interface
- ✅ User queries: `GetUserByUsername`, `GetUserByID`, `CreateUser`
- ✅ Account queries: `GetAccountsByUserID`, `GetAccountByUserAndType`, `UpdateAccountBalance`
- ✅ Transaction queries: `CreateDeposit`, `GetTransactionsByAccountID`

**File: `internal/database/sqlc/models.go`**
- ✅ `Users`: User model
- ✅ `Accounts`: Account/Wallet model
- ✅ `Transactions`: Transaction history model

### 3. **Account API Handlers**

**File: `internal/api/handlers/account.go`**

#### 📋 **GET /api/v1/accounts** (Protected)
Lấy danh sách tất cả ví của user hiện tại.

**Request:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/v1/accounts
```

**Response:**
```json
{
  "accounts": [
    {
      "id": 1,
      "user_id": 1,
      "currency": "USD",
      "balance": "1000.50",
      "created_at": "2026-01-08T10:00:00Z",
      "updated_at": "2026-01-08T10:00:00Z"
    }
  ]
}
```

#### 💰 **POST /api/v1/accounts/deposit** (Protected)
Nạp tiền vào ví (với transaction an toàn).

**Request:**
```bash
curl -X POST http://localhost:8080/api/v1/accounts/deposit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "100.50",
    "currency": "USD"
  }'
```

**Response:**
```json
{
  "message": "Deposit successful",
  "transaction": {
    "id": 123,
    "account_id": 1,
    "type": "deposit",
    "amount": "100.50",
    "status": "completed",
    "created_at": "2026-01-08T10:30:00Z"
  },
  "account": {
    "id": 1,
    "user_id": 1,
    "currency": "USD",
    "balance": "1101.00",
    "created_at": "2026-01-08T10:00:00Z",
    "updated_at": "2026-01-08T10:30:00Z"
  }
}
```

#### 📊 **GET /api/v1/accounts/:currency** (Protected)
Xem số dư của một loại tiền cụ thể.

**Request:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/v1/accounts/USD
```

**Response:**
```json
{
  "account": {
    "id": 1,
    "user_id": 1,
    "currency": "USD",
    "balance": "1101.00",
    "created_at": "2026-01-08T10:00:00Z",
    "updated_at": "2026-01-08T10:30:00Z"
  }
}
```

## 🔧 Cập nhật các file chính

### 1. **main.go**
```go
// Khởi tạo pgxpool connection
connPool, err := pgxpool.New(ctx, cfg.Database.DBSource)
// Tạo Store
store := db.NewStore(connPool)
// Inject vào server
server := api.NewServer(*cfg, store)
```

### 2. **server.go**
```go
type Server struct {
    config config.Config
    store  db.Store  // Thêm Store
    router *gin.Engine
}

// Đăng ký account routes
authRoutes.GET("/api/v1/accounts", accountHandler.ListAccounts)
authRoutes.POST("/api/v1/accounts/deposit", accountHandler.AddDeposit)
authRoutes.GET("/api/v1/accounts/:currency", accountHandler.GetAccountBalance)
```

### 3. **config.go**
```go
type DatabaseConfig struct {
    URL             string
    DBSource        string  // Thêm DBSource cho pgxpool
    MaxOpenConns    int
    MaxIdleConns    int
    ConnMaxLifetime time.Duration
}
```

## 📝 Các bước setup

### 1. Copy file .env
```bash
cp .env.example .env
# Chỉnh sửa .env với thông tin database của bạn
```

### 2. Chạy migrations (nếu có database)
```bash
# Sử dụng migrate tool hoặc chạy SQL trực tiếp
migrate -path ./migrations -database "postgresql://postgres:postgres@localhost:5432/trading_db?sslmode=disable" up
```

### 3. Build và chạy
```bash
go build -o gateway.exe ./cmd/server
./gateway.exe
```

## 🧪 Testing Flow

### Bước 1: Đăng ký user mới
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Bước 2: Login và lấy token
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Bước 3: Nạp tiền
```bash
curl -X POST http://localhost:8080/api/v1/accounts/deposit \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "1000.00",
    "currency": "USD"
  }'
```

### Bước 4: Kiểm tra số dư
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8080/api/v1/accounts
```

## 🎯 Điểm mạnh của kiến trúc này

### 1. **Tính nguyên tử (Atomicity)**
```go
err := store.execTx(ctx, func(q *Queries) error {
    // Bước 1: Cộng tiền
    account, err := q.UpdateAccountBalance(...)
    // Bước 2: Ghi lịch sử
    transaction, err := q.CreateDeposit(...)
    // Nếu có lỗi ở bất kỳ đâu, tất cả đều rollback
    return nil
})
```

### 2. **Sử dụng Decimal/String cho tiền**
Tránh lỗi làm tròn của float:
```go
type DepositTxParams struct {
    Amount string `json:"amount"`  // "100.50" thay vì 100.5
}
```

Database xử lý phép tính:
```sql
UPDATE accounts 
SET balance = (balance::numeric + $2::numeric)::text
WHERE id = $1
```

### 3. **Connection Pooling**
Sử dụng `pgxpool` thay vì `pgx.Conn` đơn lẻ để:
- Quản lý nhiều connections hiệu quả
- Hỗ trợ concurrent requests
- Tự động retry và health check

### 4. **Interface-based Design**
```go
type Store interface {
    Querier
    DepositTx(ctx context.Context, arg DepositTxParams) (DepositTxResult, error)
}
```
Dễ dàng mock cho testing và swap implementation.

## 🚧 Lưu ý quan trọng

### 1. **Schema hiện tại sử dụng UUID**
Migration `000001_init_schema.up.sql` đang dùng UUID cho primary keys. Cần điều chỉnh để khớp với code (sử dụng BIGINT/BIGSERIAL) hoặc ngược lại.

**Option 1:** Đổi models.go sang UUID
```go
type Users struct {
    ID string `json:"id"`  // UUID string
    // ...
}
```

**Option 2:** Tạo migration mới để chuyển sang BIGSERIAL

### 2. **User Registration chưa lưu database**
Handler `RegisterUser` trong `user.go` hiện tại chỉ tạo token, chưa lưu user vào DB. Cần cập nhật:

```go
func (h *UserHandler) RegisterUser(ctx *gin.Context) {
    // ...
    // Thêm: Hash password
    hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    
    // Thêm: Lưu user vào DB
    user, err := h.store.CreateUser(ctx, db.CreateUserParams{
        Username: req.Username,
        Email:    req.Email,
        Password: string(hashedPassword),
    })
    // ...
}
```

### 3. **Production checklist**
- [ ] Thay đổi JWT_SECRET trong production
- [ ] Enable SSL/TLS cho database connection
- [ ] Thêm rate limiting cho API
- [ ] Implement password hashing với bcrypt
- [ ] Thêm validation cho amount (phải > 0, không quá lớn)
- [ ] Thêm audit logging cho transactions
- [ ] Setup monitoring và alerts

## 📚 Bước tiếp theo

1. ✅ **Đã xong:** Transaction-safe deposit
2. 🔜 **Tiếp theo:** Implement withdraw (rút tiền)
3. 🔜 **Tiếp theo:** Implement transfer (chuyển tiền giữa users)
4. 🔜 **Tiếp theo:** Transaction history với pagination
5. 🔜 **Tiếp theo:** Integration với Matching Engine

## 🎓 Kiến thức thu được

- ✅ Database Transactions trong Go với pgx
- ✅ ACID properties trong financial systems
- ✅ Decimal arithmetic cho tiền tệ
- ✅ Connection pooling với pgxpool
- ✅ Repository pattern với Store interface
- ✅ Atomic operations với SQL

---

**🎉 Chúc mừng!** Gateway Service của bạn giờ đã có khả năng xử lý giao dịch tài chính an toàn với tính nguyên tử (Atomicity).
