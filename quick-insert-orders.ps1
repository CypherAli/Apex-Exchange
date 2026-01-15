# Quick Insert Test Orders
Write-Host "Inserting test orders..." -ForegroundColor Cyan

docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "
INSERT INTO orders (user_id, symbol, side, price, amount, status, created_at) 
SELECT id, 'BTC/USDT', 'Bid', 98000, 0.5, 'open', NOW() FROM users WHERE username='trader1' LIMIT 1;

INSERT INTO orders (user_id, symbol, side, price, amount, status, created_at) 
SELECT id, 'BTC/USDT', 'Bid', 97500, 0.3, 'open', NOW() FROM users WHERE username='trader1' LIMIT 1;

INSERT INTO orders (user_id, symbol, side, price, amount, status, created_at) 
SELECT id, 'BTC/USDT', 'Ask', 100000, 0.4, 'open', NOW() FROM users WHERE username='trader1' LIMIT 1;

SELECT COUNT(*) as total_orders FROM orders;
"

Write-Host "Done! Refresh the web page" -ForegroundColor Green
