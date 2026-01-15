# Insert Test Orders with UUID
Write-Host "================================" -ForegroundColor Cyan
Write-Host "INSERTING TEST ORDERS (UUID)" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`n[1] Inserting 3 test orders for trader1..." -ForegroundColor Yellow

docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "
INSERT INTO orders (id, user_id, symbol, side, order_type, price, quantity, status, created_at)
SELECT 
    gen_random_uuid(),
    u.id,
    'BTC/USDT',
    'BUY',
    'LIMIT',
    98000.00,
    0.5,
    'OPEN',
    NOW()
FROM users u WHERE u.username = 'trader1'
LIMIT 1;

INSERT INTO orders (id, user_id, symbol, side, order_type, price, quantity, status, created_at)
SELECT 
    gen_random_uuid(),
    u.id,
    'BTC/USDT',
    'BUY',
    'LIMIT',
    97500.00,
    0.3,
    'OPEN',
    NOW()
FROM users u WHERE u.username = 'trader1'
LIMIT 1;

INSERT INTO orders (id, user_id, symbol, side, order_type, price, quantity, status, created_at)
SELECT 
    gen_random_uuid(),
    u.id,
    'BTC/USDT',
    'SELL',
    'LIMIT',
    100000.00,
    0.4,
    'OPEN',
    NOW()
FROM users u WHERE u.username = 'trader1'
LIMIT 1;
"

Write-Host "`n[2] Verifying orders..." -ForegroundColor Yellow
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "
SELECT 
    o.id::text as order_id,
    o.symbol,
    o.side,
    o.price,
    o.quantity,
    o.status,
    o.created_at
FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.username = 'trader1'
ORDER BY o.created_at DESC
LIMIT 5;
"

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ Done! Refresh the web page" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
