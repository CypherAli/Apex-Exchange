# 🧪 Hướng dẫn Test Matching Engine - Database Integration

## 📋 Chuẩn bị

### 1. Đảm bảo các services đang chạy

```powershell
# Kiểm tra Docker containers
docker ps

# Cần thấy:
# - trading-postgres (PostgreSQL)
# - trading-nats (NATS)
```

### 2. Khởi động Rust Engine

```powershell
# Terminal 1
cd E:\My_Project\services\engine
cargo run --release
```

Đợi thấy log:
```
🚀 Matching Engine Started
⚡ Listening on NATS: orders
```

### 3. Khởi động Go Gateway + Worker

```powershell
# Terminal 2
cd E:\My_Project\services\gateway
go run cmd/server/main.go
```

Đợi thấy log:
```
✅ Database connected successfully
✅ NATS connected successfully
🎧 Starting Event Processor...
✅ Event Processor started successfully
🚀 Gateway server starting on port 8080
```

## 🎯 Test Case 1: Đặt lệnh đơn giản

### Bước 1: Đăng ký user (nếu chưa có)

**Endpoint:** `POST http://localhost:8080/api/v1/auth/register`

**Body:**
```json
{
  "username": "trader1",
  "email": "trader1@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "trader1",
    "email": "trader1@example.com"
  }
}
```

### Bước 2: Login để lấy JWT Token

**Endpoint:** `POST http://localhost:8080/api/v1/auth/login`

**Body:**
```json
{
  "email": "trader1@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "trader1"
  }
}
```

**➡️ Copy token này để dùng cho các request tiếp theo**

### Bước 3: Đặt lệnh MUA (Bid)

**Endpoint:** `POST http://localhost:8080/api/v1/orders`

**Headers:**
```
Authorization: Bearer <YOUR_JWT_TOKEN>
Content-Type: application/json
```

**Body:**
```json
{
  "symbol": "BTC/USDT",
  "price": "45000.00",
  "amount": "0.5",
  "side": "Bid"
}
```

**Response:**
```json
{
  "message": "Order placed successfully",
  "order_id": 1736330000000000000
}
```

### Bước 4: Quan sát logs

**Go Gateway Terminal sẽ hiển thị:**
```
📩 Received event: {"type":"OrderPlaced","data":{"order_id":1736330000000000000,"user_id":1,"symbol":"BTC/USDT","price":"45000.00","amount":"0.5","side":"Bid"}}
📝 Processing OrderPlaced: Order ID 1736330000000000000, Symbol BTC/USDT
✅ DB Updated: Order 1736330000000000000 stored successfully
```

### Bước 5: Kiểm tra Database

```powershell
docker exec -it trading-postgres psql -U trading_user -d trading_db
```

```sql
-- Xem order vừa đặt
SELECT id, user_id, symbol, side, price, amount, status, created_at 
FROM engine_orders 
ORDER BY created_at DESC;
```

**Kết quả mong đợi:**
```
       id               | user_id |  symbol   | side | price  | amount | status  |         created_at         
------------------------+---------+-----------+------+--------+--------+---------+----------------------------
 1736330000000000000    |       1 | BTC/USDT  | Bid  | 45000  | 0.5    | pending | 2026-01-08 15:10:23.456789
```

## 🎯 Test Case 2: Khớp lệnh (Matching)

### Bước 1: Đặt lệnh BÁN (Ask) để khớp với lệnh MUA trên

**Endpoint:** `POST http://localhost:8080/api/v1/orders`

**Body:**
```json
{
  "symbol": "BTC/USDT",
  "price": "44500.00",
  "amount": "0.3",
  "side": "Ask"
}
```

**➡️ Giá Ask (44500) thấp hơn giá Bid (45000) → Sẽ khớp ngay!**

### Bước 2: Quan sát logs

**Go Gateway sẽ hiển thị 2 events:**

```
📩 Received event: {"type":"OrderPlaced","data":{...}}
📝 Processing OrderPlaced: Order ID 1736330000000000001, Symbol BTC/USDT
✅ DB Updated: Order 1736330000000000001 stored successfully

📩 Received event: {"type":"TradeExecuted","data":{"trade":{"trade_id":1,"buyer_order_id":1736330000000000000,"seller_order_id":1736330000000000001,"price":"45000.00","amount":"0.3","timestamp":0}}}
💰 Processing TradeExecuted: Trade ID 1
💰 DB Updated: Trade stored 0.3 @ 45000.00
```

### Bước 3: Kiểm tra Database

```sql
-- 1. Xem tất cả orders
SELECT id, user_id, symbol, side, price, amount, status 
FROM engine_orders 
ORDER BY created_at DESC;

-- 2. Xem trades đã khớp
SELECT 
    t.id AS trade_id,
    t.maker_order_id,
    t.taker_order_id,
    t.price,
    t.amount,
    t.created_at
FROM engine_trades t
ORDER BY t.created_at DESC;

-- 3. Xem chi tiết trade với thông tin user
SELECT 
    t.id AS trade_id,
    t.price AS matched_price,
    t.amount AS matched_amount,
    o_maker.user_id AS seller_user_id,
    o_maker.price AS seller_price,
    o_taker.user_id AS buyer_user_id,
    o_taker.price AS buyer_price,
    t.created_at
FROM engine_trades t
JOIN engine_orders o_maker ON t.maker_order_id = o_maker.id
JOIN engine_orders o_taker ON t.taker_order_id = o_taker.id
ORDER BY t.created_at DESC;
```

**Kết quả mong đợi:**

**Orders:**
```
       id               | user_id |  symbol   | side | price  | amount | status
------------------------+---------+-----------+------+--------+--------+---------
 1736330000000000001    |       1 | BTC/USDT  | Ask  | 44500  | 0.3    | pending
 1736330000000000000    |       1 | BTC/USDT  | Bid  | 45000  | 0.5    | pending
```

**Trades:**
```
 trade_id | maker_order_id      | taker_order_id      | price  | amount |         created_at         
----------+---------------------+---------------------+--------+--------+----------------------------
        1 | 1736330000000000001 | 1736330000000000000 | 45000  | 0.3    | 2026-01-08 15:12:45.789012
```

**Chi tiết Trade:**
```
 trade_id | matched_price | matched_amount | seller_user_id | seller_price | buyer_user_id | buyer_price
----------+---------------+----------------+----------------+--------------+---------------+-------------
        1 | 45000         | 0.3            |              1 | 44500        |             1 | 45000
```

**✨ Giải thích:**
- Người bán đặt giá 44500 (sẵn sàng bán rẻ)
- Người mua đặt giá 45000 (sẵn sàng mua đắt)
- Khớp tại giá 45000 (giá của người mua - tốt cho người bán!)
- Khớp 0.3 BTC (bé hơn trong 2 lệnh)

## 🎯 Test Case 3: Nhiều lệnh khớp từng phần

### Scenario: Một lệnh mua lớn khớp với nhiều lệnh bán nhỏ

**Lệnh 1 - Đặt BID lớn:**
```json
{
  "symbol": "ETH/USDT",
  "price": "3000.00",
  "amount": "2.0",
  "side": "Bid"
}
```

**Lệnh 2 - Đặt ASK nhỏ:**
```json
{
  "symbol": "ETH/USDT",
  "price": "2950.00",
  "amount": "0.5",
  "side": "Ask"
}
```
➡️ Khớp 0.5 ETH, còn lại 1.5 ETH chưa khớp

**Lệnh 3 - Đặt ASK nhỏ nữa:**
```json
{
  "symbol": "ETH/USDT",
  "price": "2900.00",
  "amount": "0.8",
  "side": "Ask"
}
```
➡️ Khớp thêm 0.8 ETH, còn lại 0.7 ETH chưa khớp

**Kiểm tra Database:**
```sql
SELECT * FROM engine_trades WHERE maker_order_id IN (
    SELECT id FROM engine_orders WHERE symbol = 'ETH/USDT'
);
```

## 🔍 Các lệnh SQL hữu ích

### Thống kê tổng quan

```sql
-- Số lượng orders theo side
SELECT side, COUNT(*) as count, SUM(amount::numeric) as total_amount
FROM engine_orders
GROUP BY side;

-- Số lượng trades theo symbol
SELECT 
    o.symbol,
    COUNT(t.id) as trade_count,
    SUM(t.amount::numeric) as total_volume
FROM engine_trades t
JOIN engine_orders o ON t.maker_order_id = o.id
GROUP BY o.symbol;
```

### Xóa dữ liệu test

```sql
-- Xóa tất cả để test lại từ đầu
TRUNCATE TABLE engine_trades CASCADE;
TRUNCATE TABLE engine_orders CASCADE;
```

## ❌ Troubleshooting

### Lỗi: "Event processor không nhận được event"

**Nguyên nhân:** Worker chưa subscribe kịp hoặc NATS chưa kết nối

**Giải pháp:**
```powershell
# Restart Go Gateway
# Đảm bảo thấy log: "✅ Event Processor started successfully"
```

### Lỗi: "Failed to store order in DB"

**Nguyên nhân:** Có thể do order_id trùng lặp (timestamp collision)

**Giải pháp:**
```powershell
# Đợi 1 giây giữa các requests
# Hoặc implement Snowflake ID generator
```

### Database rỗng dù đã gửi order

**Check:**
1. NATS có running không? `docker ps | grep nats`
2. Rust Engine có nhận được command? Xem log terminal 1
3. Go Worker có nhận được event? Xem log terminal 2

## 🎉 Kết luận

Nếu bạn thấy:
- ✅ Orders trong bảng `engine_orders`
- ✅ Trades trong bảng `engine_trades`
- ✅ Logs hiển thị đầy đủ quá trình xử lý

**➡️ Backend Core đã hoàn tất! 🚀**

Hệ thống đã có khả năng:
1. Nhận lệnh qua API
2. Gửi lệnh sang Rust Engine qua NATS
3. Khớp lệnh trong memory (cực nhanh)
4. Lưu kết quả vào PostgreSQL
5. Sẵn sàng cho các tính năng nâng cao!
