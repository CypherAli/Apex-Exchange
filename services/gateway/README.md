# Gateway Service

High-performance API gateway with transactional banking capabilities, built with Go and Gin framework.

## 🎯 Current Status

✅ **Phase 3.2 Complete:** Transactional Banking System
- ACID-compliant database transactions
- Secure user authentication (bcrypt + JWT)
- Account management with atomic operations
- Connection pooling with pgxpool

## 🚀 Features

### Authentication & Security
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ CORS handling
- ✅ Token-based authorization

### Banking Operations
- ✅ User registration and login
- ✅ Multi-currency account management
- ✅ Atomic deposit transactions
- ✅ Transaction history tracking
- ✅ Balance queries

### Infrastructure
- ✅ PostgreSQL with connection pooling
- ✅ Database migrations support
- ✅ Health check endpoints
- ✅ Environment-based configuration

## 📁 Project Structure

```
gateway/
├── cmd/
│   └── server/              # Application entry point
├── internal/
│   ├── api/
│   │   ├── server.go        # Gin router setup
│   │   ├── middleware.go    # JWT authentication
│   │   └── handlers/
│   │       ├── user.go      # Auth endpoints
│   │       └── account.go   # Banking endpoints
│   ├── database/
│   │   └── sqlc/            # Database layer
│   │       ├── store.go     # Transaction support
│   │       ├── db.go        # Query implementations
│   │       ├── models.go    # Data models
│   │       └── queries.go   # Interface definitions
│   ├── config/              # Configuration loader
│   └── util/                # JWT utilities
├── migrations/              # SQL migrations
├── Dockerfile
├── go.mod
└── go.sum
```

## 🏃 Quick Start

### 1. Setup Database
```bash
# Create database
createdb trading_db

# Run migrations
psql -d trading_db -f migrations/000001_init_schema.up.sql
psql -d trading_db -f migrations/000003_add_transactions_table.up.sql
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your database credentials and JWT secret
```

### 3. Run
```bash
# Build
go build -o gateway.exe ./cmd/server

# Run
./gateway.exe
```

## 📡 API Endpoints

### Public Endpoints
```
POST   /api/v1/auth/register    # User registration
POST   /api/v1/auth/login       # User login
GET    /health                  # Health check
```

### Protected Endpoints (Require JWT Token)
```
GET    /api/v1/users/me                # Current user info
GET    /api/v1/accounts                # List all accounts
POST   /api/v1/accounts/deposit        # Deposit money
GET    /api/v1/accounts/:currency      # Get balance by currency
```

## 🧪 Testing Examples

### Register a new user
```bash
curl -X POST http://localhost:8080/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Deposit money (with token)
```bash
curl -X POST http://localhost:8080/api/v1/accounts/deposit \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": "1000.50",
    "currency": "USD"
  }'
```

## 📚 Documentation

- **[QUICKSTART_TRANSACTIONAL_BANKING.md](QUICKSTART_TRANSACTIONAL_BANKING.md)** - Quick start guide
- **[GIAI_DOAN_3_PHAN_2_SUMMARY.md](GIAI_DOAN_3_PHAN_2_SUMMARY.md)** - Technical details
- **[ARCHITECTURE_DIAGRAM.md](ARCHITECTURE_DIAGRAM.md)** - System architecture
- **[CHECKLIST.md](CHECKLIST.md)** - Implementation checklist

## 🏗️ Key Features

### ACID Transactions
Atomic operations ensure data consistency:
- Balance updates and transaction logs succeed together
- Automatic rollback on failures
- No partial updates possible

### Security
- Bcrypt password hashing
- JWT token authentication
- SQL injection prevention
- Input validation

### Performance
- Connection pooling (pgxpool)
- Efficient decimal operations
- Concurrent request handling

## 🛠️ Development

```bash
# Run locally
go run ./cmd/server/main.go

# Build
go build -o gateway.exe ./cmd/server
```

## 🚧 Roadmap

- [x] JWT authentication
- [x] Atomic deposit transactions
- [ ] Withdraw functionality
- [ ] Transfer between users
- [ ] Transaction history
- [ ] Integration with Matching Engine

---

**Built with Go + Gin + PostgreSQL**
