# Quick Test - Place Order and Check Database
Write-Host "================================" -ForegroundColor Cyan
Write-Host "TESTING ORDER PLACEMENT & DB" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Login
Write-Host "`n[1] Logging in as trader1..." -ForegroundColor Yellow
$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"username":"trader1","password":"Pass1234"}'

$token = $loginResponse.access_token
Write-Host "✅ Token: $($token.Substring(0,20))..." -ForegroundColor Green

# Place Order
Write-Host "`n[2] Placing test order..." -ForegroundColor Yellow
$orderResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders" `
    -Method POST `
    -ContentType "application/json" `
    -Headers @{"Authorization" = "Bearer $token"} `
    -Body '{"symbol":"BTC/USDT","side":"buy","type":"Limit","price":98000,"amount":0.001}'

Write-Host "✅ Order placed: $($orderResponse.order_id_db)" -ForegroundColor Green
Write-Host "Response: $($orderResponse | ConvertTo-Json)" -ForegroundColor Gray

# Check Database
Write-Host "`n[3] Checking database..." -ForegroundColor Yellow
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "
SELECT 
    id::text as order_id,
    symbol,
    side,
    order_type,
    price::numeric(10,2),
    quantity::numeric(10,4),
    status,
    created_at
FROM orders
WHERE user_id = (SELECT id FROM users WHERE username='trader1')
ORDER BY created_at DESC
LIMIT 5;
"

# Fetch Orders via API
Write-Host "`n[4] Fetching orders via API..." -ForegroundColor Yellow
$ordersResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders/open" `
    -Method GET `
    -Headers @{"Authorization" = "Bearer $token"}

Write-Host "✅ Found $($ordersResponse.Count) orders" -ForegroundColor Green
$ordersResponse | ConvertTo-Json

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ TEST COMPLETE!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
