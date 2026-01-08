# 🎯 Quick Start Guide - Transactional Banking APIs

## ✅ Đã hoàn thành

Hệ thống Gateway Service đã được nâng cấp với:
- ✅ Database Transaction Support (ACID compliance)
- ✅ Store pattern với pgxpool connection pooling
- ✅ Account Management APIs (List, Deposit, GetBalance)
- ✅ Atomic operations cho nạp tiền

## 🚀 Bắt đầu sử dụng

### 1. Setup Database (Nếu chưa có)

**Tạo database:**
```bash
createdb trading_db
```

**Chạy migrations:**
```bash
# Nếu có golang-migrate
migrate -path ./migrations -database "postgresql://postgres:postgres@localhost:5432/trading_db?sslmode=disable" up

# Hoặc chạy SQL trực tiếp
psql -d trading_db -f migrations/000001_init_schema.up.sql
psql -d trading_db -f migrations/000003_add_transactions_table.up.sql
```

### 2. Cấu hình Environment

**Copy .env:**
```bash
cp .env.example .env
```

**Chỉnh sửa .env:**
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/trading_db?sslmode=disable
JWT_SECRET=your-super-secret-key-change-in-production
```

### 3. Chạy Server

```bash
# Build
go build -o gateway.exe ./cmd/server

# Run
./gateway.exe
```

Hoặc:
```bash
go run ./cmd/server/main.go
```

## 📝 API Endpoints

### Public Endpoints

#### 1. Register User
```bash
POST http://localhost:8080/api/v1/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### 2. Login
```bash
POST http://localhost:8080/api/v1/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}

# Response:
{
  "username": "testuser",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Protected Endpoints (Cần JWT Token)

#### 3. List All Accounts
```bash
GET http://localhost:8080/api/v1/accounts
Authorization: Bearer YOUR_JWT_TOKEN
```

#### 4. Deposit Money (Nạp tiền)
```bash
POST http://localhost:8080/api/v1/accounts/deposit
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "amount": "1000.50",
  "currency": "USD"
}

# Response:
{
  "message": "Deposit successful",
  "transaction": {
    "id": 1,
    "account_id": 1,
    "type": "deposit",
    "amount": "1000.50",
    "status": "completed"
  },
  "account": {
    "id": 1,
    "balance": "1000.50",
    "currency": "USD"
  }
}
```

#### 5. Get Account Balance
```bash
GET http://localhost:8080/api/v1/accounts/USD
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🧪 Testing với curl

**1. Đăng ký:**
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"pass123"}'
```

**2. Login và lưu token:**
```bash
TOKEN=$(curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"pass123"}' \
  | jq -r '.access_token')
```

**3. Nạp tiền:**
```bash
curl -X POST http://localhost:8080/api/v1/accounts/deposit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"amount":"500","currency":"USD"}'
```

**4. Kiểm tra số dư:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8080/api/v1/accounts
```

## ⚠️ Lưu ý quan trọng

### 1. Database Schema
Hiện tại migration `000001` sử dụng **UUID** cho primary keys, nhưng code sử dụng **BIGINT/int64**.

**Cần chọn 1 trong 2:**

**Option A:** Sửa models để dùng UUID
```go
type Users struct {
    ID string `json:"id"` // UUID as string
}
```

**Option B:** Tạo migration mới để đổi sang BIGSERIAL

### 2. User Registration chưa lưu DB
File `user.go` hiện tại chỉ tạo token, **chưa lưu user vào database**.

Cần cập nhật để:
- Hash password bằng bcrypt
- Lưu user vào DB thông qua `store.CreateUser()`

### 3. Security Checklist
- [ ] Đổi `JWT_SECRET` trong production
- [ ] Enable SSL cho database
- [ ] Thêm password hashing
- [ ] Validate amount (> 0, có giới hạn)
- [ ] Add rate limiting
- [ ] Implement audit logs

## 📚 Tài liệu chi tiết

Xem file [GIAI_DOAN_3_PHAN_2_SUMMARY.md](GIAI_DOAN_3_PHAN_2_SUMMARY.md) để biết:
- Kiến trúc chi tiết
- Giải thích về ACID transactions
- Best practices cho financial systems
- Các bước tiếp theo

## 🎯 Các bước tiếp theo

1. **Fix User Registration:** Lưu user vào DB thật
2. **Implement Withdraw:** API rút tiền
3. **Implement Transfer:** Chuyển tiền giữa users
4. **Transaction History:** Xem lịch sử với pagination
5. **Integration với Matching Engine**

---

**Prepared by:** GitHub Copilot  
**Date:** January 8, 2026  
**Status:** ✅ Ready for Testing
