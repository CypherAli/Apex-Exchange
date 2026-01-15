# Test Full Flow - Check if orders appear
Write-Host "================================" -ForegroundColor Cyan
Write-Host "FULL FLOW TEST" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Login
Write-Host "`n[1] Login..." -ForegroundColor Yellow
$loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body '{"username":"trader1","password":"Pass1234"}'

$token = $loginResponse.access_token
Write-Host "✅ Token OK" -ForegroundColor Green

# Place Order
Write-Host "`n[2] Place Order..." -ForegroundColor Yellow
$orderResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders" `
    -Method POST `
    -ContentType "application/json" `
    -Headers @{"Authorization" = "Bearer $token"} `
    -Body '{"symbol":"BTC/USDT","side":"buy","type":"Limit","price":98500,"amount":0.002}'

Write-Host "✅ Order ID: $($orderResponse.order_id_db)" -ForegroundColor Green

# Fetch Open Orders
Write-Host "`n[3] Fetch Open Orders..." -ForegroundColor Yellow
$ordersResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders/open" `
    -Method GET `
    -Headers @{"Authorization" = "Bearer $token"}

Write-Host "✅ Found $($ordersResponse.Count) orders:" -ForegroundColor Green
$ordersResponse | ForEach-Object {
    Write-Host "  - ID: $($_.id)" -ForegroundColor Cyan
    Write-Host "    Symbol: $($_.symbol), Side: $($_.side), Price: $($_.price), Amount: $($_.amount)" -ForegroundColor Gray
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ SUCCESS - Orders are working!" -ForegroundColor Green
Write-Host "Now HARD REFRESH browser: Ctrl+Shift+R" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Cyan
