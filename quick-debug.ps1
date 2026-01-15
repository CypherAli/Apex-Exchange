# Quick Debug Orders
Write-Host "Checking Database..." -ForegroundColor Cyan

# Count orders
Write-Host "`nTotal Orders:" -ForegroundColor Yellow
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -t -c "SELECT COUNT(*) FROM orders"

# Orders by status
Write-Host "`nOrders by Status:" -ForegroundColor Yellow  
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "SELECT status, COUNT(*) FROM orders GROUP BY status"

# Recent orders
Write-Host "`nRecent 3 Orders:" -ForegroundColor Yellow
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "SELECT id, user_id, symbol, side, price::numeric(10,2), amount::numeric(10,4), status, created_at FROM orders ORDER BY created_at DESC LIMIT 3"

# Check users
Write-Host "`nUsers:" -ForegroundColor Yellow
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "SELECT id, username FROM users LIMIT 3"
