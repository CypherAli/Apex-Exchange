# Complete Test Flow
Write-Host "================================" -ForegroundColor Cyan
Write-Host "COMPLETE TEST FLOW" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

$API = "http://localhost:8080/api/v1"

# 1. Login
Write-Host "`n[1] Login as trader1..." -ForegroundColor Yellow
$loginBody = '{"username":"trader1","password":"Pass1234"}'
$loginRes = Invoke-RestMethod -Uri "$API/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $loginRes.access_token
Write-Host "✅ Logged in" -ForegroundColor Green

$headers = @{ 
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json" 
}

# 2. Place order
Write-Host "`n[2] Placing a test order..." -ForegroundColor Yellow
$orderBody = @{
    symbol = "BTC/USDT"
    side = "Bid"
    type = "Limit"
    price = 98000
    amount = 0.001
    trigger_price = 0
} | ConvertTo-Json

try {
    $orderRes = Invoke-RestMethod -Uri "$API/orders" -Method POST -Headers $headers -Body $orderBody
    Write-Host "✅ Order created!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Order creation failed: $($_.Exception.Message)" -ForegroundColor Yellow
}

Start-Sleep -Seconds 1

# 3. Get open orders via API
Write-Host "`n[3] Fetching open orders from API..." -ForegroundColor Yellow
$orders = Invoke-RestMethod -Uri "$API/orders/open" -Method GET -Headers $headers

Write-Host "Response Type: $($orders.GetType().Name)" -ForegroundColor Cyan
Write-Host "Is Array: $(if ($orders -is [Array]) { 'Yes' } else { 'No' })" -ForegroundColor Cyan
Write-Host "Count: $($orders.Count)" -ForegroundColor Cyan

if ($orders -and $orders.Count -gt 0) {
    Write-Host "`n✅ Found $($orders.Count) order(s):" -ForegroundColor Green
    $orders | Format-Table -AutoSize
} else {
    Write-Host "⚠️ No orders returned from API" -ForegroundColor Yellow
}

# 4. Check database directly
Write-Host "`n[4] Checking database..." -ForegroundColor Yellow
$dbCount = docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -t -c "SELECT COUNT(*) FROM orders" 2>$null
Write-Host "Total orders in DB: $($dbCount.Trim())" -ForegroundColor Cyan

Write-Host "`nRecent orders in DB:" -ForegroundColor Cyan
docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "SELECT id, user_id, symbol, side, price::numeric(10,2), amount::numeric(10,4), status FROM orders ORDER BY created_at DESC LIMIT 3" 2>$null

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ Test Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan

Write-Host "`nNow:" -ForegroundColor Yellow
Write-Host "1. Reload web page (Ctrl+R)" -ForegroundColor White
Write-Host "2. Click 'Refresh' button in Open Orders" -ForegroundColor White
Write-Host "3. You should see orders if they exist!" -ForegroundColor White
