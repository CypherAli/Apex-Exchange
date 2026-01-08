# ✅ Giai đoạn 5 - HOÀN THÀNH: Lưu dữ liệu vào Database (Closing the Loop)

## 📋 Tổng quan

Giai đoạn này đã hoàn thành việc tích hợp **Rust Matching Engine** với **PostgreSQL Database** thông qua **Go Worker**. Bây giờ mọi sự kiện từ Rust (OrderPlaced, TradeExecuted) đều được lưu vào database.

## 🔄 Luồng hoạt động hoàn chỉnh

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Postman   │────────>│ Go Gateway  │────────>│  NATS MQ    │────────>│ Rust Engine │
│   (API)     │  HTTP   │  (API)      │  Pub    │   Queue     │  Sub    │  (Matcher)  │
└─────────────┘         └─────────────┘         └─────────────┘         └─────────────┘
                                                                                │
                                                                                │ Match
                                                                                │ Orders
                                                                                ▼
                        ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
                        │ PostgreSQL  │<────────│ Go Worker   │<────────│ NATS Events │
                        │  Database   │  Store  │ (Processor) │   Sub   │   Topic     │
                        └─────────────┘         └─────────────┘         └─────────────┘
```

## 📝 Những gì đã thực hiện

### 1. ✅ Cập nhật Rust Engine Models

**File:** `services/engine/src/models.rs`

Bổ sung đầy đủ thông tin vào `EngineEvent::OrderPlaced`:

```rust
pub enum EngineEvent {
    OrderPlaced { 
        order_id: u64,
        user_id: u64,      // ✨ MỚI
        symbol: String,
        price: Decimal,    // ✨ MỚI
        amount: Decimal,   // ✨ MỚI
        side: Side,        // ✨ MỚI
    },
    OrderCancelled { order_id: u64, success: bool },
    TradeExecuted { trade: Trade },
}
```

### 2. ✅ Cập nhật Rust Engine Logic

**File:** `services/engine/src/engine.rs`

Emit đầy đủ thông tin khi đặt lệnh:

```rust
events.push(EngineEvent::OrderPlaced { 
    order_id: order.id,
    user_id: order.user_id,     // ✨ GỬI USER ID
    symbol,
    price: order.price,         // ✨ GỬI GIÁ
    amount: order.amount,       // ✨ GỬI SỐ LƯỢNG
    side: order.side,           // ✨ GỬI PHÍA (BID/ASK)
});
```

### 3. ✅ Tạo Go Event Models

**File:** `services/gateway/internal/models/event.go`

```go
type OrderPlacedData struct {
    OrderID   uint64 `json:"order_id"`
    UserID    uint64 `json:"user_id"`
    Symbol    string `json:"symbol"`
    Price     string `json:"price"`
    Amount    string `json:"amount"`
    Side      string `json:"side"`
}

type TradeExecutedData struct {
    Trade TradeData `json:"trade"`
}
```

### 4. ✅ Tạo Go Worker Processor

**File:** `services/gateway/internal/worker/processor.go`

Worker lắng nghe NATS topic "events" và xử lý:

- **OrderPlaced**: Lưu order vào bảng `engine_orders`
- **TradeExecuted**: Lưu trade vào bảng `engine_trades`
- **OrderCancelled**: Cập nhật status (TODO nâng cao)

```go
func (p *EventProcessor) Start(ctx context.Context) error {
    _, err := p.natsConn.Subscribe("events", func(msg *nats.Msg) {
        p.handleEvent(msg.Data)
    })
    // ...
}
```

### 5. ✅ Bổ sung Database Queries

**File:** `services/gateway/internal/database/sqlc/db.go`

Thêm 3 methods mới:

```go
CreateOrder(ctx, arg CreateOrderParams) (Orders, error)
UpdateOrderStatus(ctx, arg UpdateOrderStatusParams) (Orders, error)
CreateTrade(ctx, arg CreateTradeParams) (Trades, error)
```

### 6. ✅ Tạo Migration cho Engine Tables

**File:** `services/gateway/migrations/000004_add_engine_tables.up.sql`

Tạo 2 bảng đơn giản cho matching engine:

- `engine_orders`: Lưu orders từ Rust
- `engine_trades`: Lưu trades đã khớp

### 7. ✅ Tích hợp Worker vào Main

**File:** `services/gateway/cmd/server/main.go`

Khởi động Worker trong goroutine riêng:

```go
processor := worker.NewEventProcessor(store, nc)
go func() {
    if err := processor.Start(ctx); err != nil {
        log.Fatalf("Event processor error: %v", err)
    }
}()
```

## 🧪 Cách Test

### Bước 1: Khởi động Services

```powershell
# Terminal 1: Rust Engine
cd E:\My_Project\services\engine
cargo run --release

# Terminal 2: Go Gateway + Worker
cd E:\My_Project\services\gateway
go run cmd/server/main.go
```

### Bước 2: Đặt lệnh qua Postman

**Endpoint:** `POST http://localhost:8080/api/v1/orders`

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Body:**
```json
{
  "symbol": "BTC/USDT",
  "price": "45000.5",
  "amount": "0.1",
  "side": "Bid"
}
```

### Bước 3: Quan sát Logs

**Go Gateway sẽ in:**
```
📩 Received event: {"type":"OrderPlaced","data":{...}}
📝 Processing OrderPlaced: Order ID 1234, Symbol BTC/USDT
✅ DB Updated: Order 1234 stored successfully
```

**Nếu có trade khớp:**
```
📩 Received event: {"type":"TradeExecuted","data":{...}}
💰 Processing TradeExecuted: Trade ID 1
💰 DB Updated: Trade stored 0.1 @ 45000.5
```

### Bước 4: Kiểm tra Database

```powershell
# Kết nối vào PostgreSQL
docker exec -it trading-postgres psql -U trading_user -d trading_db
```

```sql
-- Xem orders đã lưu
SELECT * FROM engine_orders;

-- Xem trades đã khớp
SELECT * FROM engine_trades;

-- Kết hợp để xem chi tiết
SELECT 
    t.id AS trade_id,
    t.price,
    t.amount,
    o1.user_id AS maker_user,
    o2.user_id AS taker_user
FROM engine_trades t
JOIN engine_orders o1 ON t.maker_order_id = o1.id
JOIN engine_orders o2 ON t.taker_order_id = o2.id;
```

## 📊 Cấu trúc Database

### Bảng `engine_orders`

| Column     | Type           | Description                |
|------------|----------------|----------------------------|
| id         | BIGINT (PK)    | Order ID từ Rust           |
| user_id    | BIGINT         | User đặt lệnh              |
| symbol     | VARCHAR(20)    | Cặp giao dịch (BTC/USDT)   |
| price      | DECIMAL(20,8)  | Giá đặt                    |
| amount     | DECIMAL(20,8)  | Số lượng                   |
| side       | VARCHAR(10)    | "Bid" hoặc "Ask"           |
| status     | VARCHAR(20)    | "pending", "open", "filled"|
| created_at | TIMESTAMP      | Thời gian đặt              |

### Bảng `engine_trades`

| Column          | Type           | Description           |
|-----------------|----------------|-----------------------|
| id              | BIGSERIAL (PK) | Trade ID tự động      |
| maker_order_id  | BIGINT         | Order ID người bán    |
| taker_order_id  | BIGINT         | Order ID người mua    |
| price           | DECIMAL(20,8)  | Giá khớp              |
| amount          | DECIMAL(20,8)  | Số lượng khớp         |
| created_at      | TIMESTAMP      | Thời gian khớp        |

## 🎯 Kết quả đạt được

✅ **Rust Engine** emit đầy đủ thông tin (user_id, price, amount, side)  
✅ **Go Worker** lắng nghe events từ NATS  
✅ **Database** lưu trữ đầy đủ orders và trades  
✅ **Tích hợp hoàn chỉnh** giữa 3 services: Go → Rust → Go  
✅ **Migration** cho bảng engine riêng biệt  

## 🚀 Các bước tiếp theo (Nâng cao)

### 1. Cập nhật số dư tài khoản

Sau khi trade được khớp, cần:
- Trừ tiền người mua
- Cộng tiền người bán

```go
func (p *EventProcessor) handleTradeExecuted(data interface{}) {
    // ... lưu trade ...
    
    // TODO: Update balance
    // - Buyer: Trừ (amount * price) từ wallet
    // - Seller: Cộng (amount * price) vào wallet
}
```

### 2. Cập nhật Order Status

Khi order bị khớp một phần hoặc hoàn toàn:

```go
// Cập nhật status = "filled" sau khi khớp hết
p.store.UpdateOrderStatus(ctx, UpdateOrderStatusParams{
    ID: orderID,
    Status: "filled",
})
```

### 3. WebSocket Notification

Push real-time updates cho clients:

```go
// Broadcast trade event qua WebSocket
websocket.BroadcastToUser(userID, TradeNotification{
    Type: "trade_executed",
    Data: tradeData,
})
```

## 📚 Files đã thay đổi

```
services/
├── engine/
│   └── src/
│       ├── models.rs         ✨ Bổ sung fields vào OrderPlaced
│       └── engine.rs         ✨ Emit đầy đủ thông tin
└── gateway/
    ├── cmd/server/main.go    ✨ Khởi động Worker
    ├── internal/
    │   ├── models/
    │   │   └── event.go      ✨ MỚI: Event models
    │   ├── worker/
    │   │   └── processor.go  ✨ MỚI: Event processor
    │   └── database/sqlc/
    │       ├── db.go         ✨ Thêm CreateOrder, CreateTrade
    │       └── models.go     ✨ Thêm Orders, Trades models
    └── migrations/
        └── 000004_add_engine_tables.up.sql  ✨ MỚI: Engine tables
```

## 🎉 Tổng kết

Chúng ta đã hoàn thành **Giai đoạn 5** - đóng vòng lặp dữ liệu từ API → Engine → Database. Hệ thống bây giờ có khả năng:

1. **Nhận lệnh** từ API (Go Gateway)
2. **Khớp lệnh** trong memory (Rust Engine)
3. **Lưu kết quả** vào database (Go Worker + PostgreSQL)
4. **Truy vấn** lịch sử orders và trades

Đây là nền tảng vững chắc cho các tính năng nâng cao tiếp theo! 🚀
