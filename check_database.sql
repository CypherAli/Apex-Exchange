-- ============================================
-- SQL SCRIPTS TO CHECK MATCHING ENGINE RESULTS
-- ============================================

-- 1️⃣ KIỂM TRA ORDERS (Lệnh đã đặt)
-- ============================================
SELECT 
    id,
    user_id,
    symbol,
    side,
    price::numeric AS price,
    amount::numeric AS amount,
    status,
    created_at
FROM engine_orders 
ORDER BY created_at DESC;

-- 2️⃣ KIỂM TRA TRADES (Lệnh đã khớp)
-- ============================================
SELECT 
    id AS trade_id,
    maker_order_id,
    taker_order_id,
    price::numeric AS matched_price,
    amount::numeric AS matched_amount,
    created_at
FROM engine_trades 
ORDER BY created_at DESC;

-- 3️⃣ XEM CHI TIẾT TRADE VỚI THÔNG TIN USER
-- ============================================
SELECT 
    t.id AS trade_id,
    t.price::numeric AS matched_price,
    t.amount::numeric AS matched_amount,
    
    -- Seller (Maker) info
    o_maker.id AS seller_order_id,
    o_maker.user_id AS seller_user_id,
    o_maker.price::numeric AS seller_price,
    o_maker.side AS seller_side,
    
    -- Buyer (Taker) info
    o_taker.id AS buyer_order_id,
    o_taker.user_id AS buyer_user_id,
    o_taker.price::numeric AS buyer_price,
    o_taker.side AS buyer_side,
    
    t.created_at
FROM engine_trades t
JOIN engine_orders o_maker ON t.maker_order_id = o_maker.id
JOIN engine_orders o_taker ON t.taker_order_id = o_taker.id
ORDER BY t.created_at DESC;

-- 4️⃣ THỐNG KÊ THEO SYMBOL
-- ============================================
SELECT 
    o.symbol,
    COUNT(DISTINCT o.id) AS total_orders,
    COUNT(DISTINCT t.id) AS total_trades,
    SUM(t.amount::numeric) AS total_volume
FROM engine_orders o
LEFT JOIN engine_trades t ON (t.maker_order_id = o.id OR t.taker_order_id = o.id)
GROUP BY o.symbol
ORDER BY total_volume DESC NULLS LAST;

-- 5️⃣ THỐNG KÊ THEO SIDE (BUY/SELL)
-- ============================================
SELECT 
    side,
    COUNT(*) AS order_count,
    SUM(amount::numeric) AS total_amount,
    AVG(price::numeric) AS avg_price,
    MIN(price::numeric) AS min_price,
    MAX(price::numeric) AS max_price
FROM engine_orders
GROUP BY side;

-- 6️⃣ LỊCH SỬ GIAO DỊCH CỦA 1 USER CỤ THỂ
-- ============================================
-- Thay USER_ID bằng ID thực tế
SELECT 
    t.id AS trade_id,
    o.symbol,
    o.side AS my_side,
    t.price::numeric AS matched_price,
    t.amount::numeric AS matched_amount,
    (t.price::numeric * t.amount::numeric) AS total_value,
    t.created_at
FROM engine_trades t
JOIN engine_orders o ON (
    (t.maker_order_id = o.id OR t.taker_order_id = o.id)
    AND o.user_id = 1  -- 👈 THAY ĐỔI USER_ID TẠI ĐÂY
)
ORDER BY t.created_at DESC;

-- 7️⃣ KIỂM TRA ORDERS CHƯA KHỚP (PENDING)
-- ============================================
SELECT 
    id,
    user_id,
    symbol,
    side,
    price::numeric AS price,
    amount::numeric AS remaining_amount,
    status,
    created_at,
    NOW() - created_at AS waiting_time
FROM engine_orders
WHERE status = 'pending'
ORDER BY created_at DESC;

-- 8️⃣ TOP 10 TRADES LỚN NHẤT
-- ============================================
SELECT 
    t.id,
    o.symbol,
    t.price::numeric AS price,
    t.amount::numeric AS amount,
    (t.price::numeric * t.amount::numeric) AS total_value,
    t.created_at
FROM engine_trades t
JOIN engine_orders o ON t.maker_order_id = o.id
ORDER BY total_value DESC
LIMIT 10;

-- 9️⃣ KIỂM TRA DỮ LIỆU GẦN NHẤT (LAST 5)
-- ============================================
-- Orders gần nhất
(
    SELECT 'ORDER' AS type, id::text, symbol, side, price, amount, status, created_at
    FROM engine_orders
    ORDER BY created_at DESC
    LIMIT 5
)
UNION ALL
(
    SELECT 'TRADE' AS type, id::text, 'N/A' AS symbol, 'N/A' AS side, price, amount, 'matched' AS status, created_at
    FROM engine_trades
    ORDER BY created_at DESC
    LIMIT 5
)
ORDER BY created_at DESC;

-- 🔟 XÓA TẤT CẢ DỮ LIỆU (ĐỂ TEST LẠI TỪ ĐẦU)
-- ============================================
-- ⚠️  CẢNH BÁO: Lệnh này sẽ xóa toàn bộ dữ liệu test!
-- Bỏ comment để chạy:

-- TRUNCATE TABLE engine_trades CASCADE;
-- TRUNCATE TABLE engine_orders CASCADE;
-- 
-- SELECT 'All test data deleted! ✅' AS status;
