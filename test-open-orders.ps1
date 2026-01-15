# Test Open Orders API
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Testing Open Orders API" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

$API = "http://localhost:8080/api/v1"

# 1. Login
Write-Host "`n[1] Logging in..." -ForegroundColor Yellow
$loginBody = @{ username = "trader1"; password = "Pass1234" } | ConvertTo-Json
$loginRes = Invoke-RestMethod -Uri "$API/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
$token = $loginRes.access_token
Write-Host "OK - Token: $($token.Substring(0,20))..." -ForegroundColor Green

$headers = @{ 
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json" 
}

# 2. Place a test order
Write-Host "`n[2] Placing test order..." -ForegroundColor Yellow
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
    Write-Host "OK - Order created" -ForegroundColor Green
} catch {
    Write-Host "WARNING - Order creation: $($_.Exception.Message)" -ForegroundColor Yellow
}

# 3. Get open orders
Write-Host "`n[3] Fetching open orders..." -ForegroundColor Yellow
try {
    $orders = Invoke-RestMethod -Uri "$API/orders/open" -Method GET -Headers $headers
    
    if ($orders) {
        Write-Host "OK - Found $($orders.Count) order(s)" -ForegroundColor Green
        Write-Host "`nOrders:" -ForegroundColor Cyan
        $orders | Format-Table -AutoSize
    } else {
        Write-Host "INFO - No open orders found" -ForegroundColor Yellow
    }
} catch {
    Write-Host "ERROR - Failed to fetch orders: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response: $responseBody" -ForegroundColor Red
    }
}

# 4. Check database
Write-Host "`n[4] Checking database..." -ForegroundColor Yellow
try {
    $dbOrders = docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -t -c "SELECT COUNT(*) FROM orders" 2>$null
    Write-Host "Total orders in DB: $($dbOrders.Trim())" -ForegroundColor Cyan
    
    Write-Host "`nRecent orders:" -ForegroundColor Cyan
    docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "SELECT id, symbol, side, price, amount, status FROM orders ORDER BY created_at DESC LIMIT 3" 2>$null
} catch {
    Write-Host "WARNING - Could not check database" -ForegroundColor Yellow
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Test Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
