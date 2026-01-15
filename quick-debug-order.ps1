# Quick Debug - Test Order Placement
Write-Host "Testing order placement..." -ForegroundColor Yellow

try {
    # Login
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" `
        -Method POST `
        -ContentType "application/json" `
        -Body '{"username":"trader1","password":"Pass1234"}'

    $token = $loginResponse.access_token
    Write-Host "✅ Login OK" -ForegroundColor Green

    # Place Order
    $orderResponse = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $token"} `
        -Body '{"symbol":"BTC/USDT","side":"buy","type":"Limit","price":98000,"amount":0.001}' `
        -ErrorAction Stop

    Write-Host "✅ Order placed!" -ForegroundColor Green
    $orderResponse | ConvertTo-Json
} catch {
    Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Response: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
}
