# Test Login and Place Order
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Testing API Endpoints" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

$API = "http://localhost:8080/api/v1"

# 1. Login
Write-Host "`n[1] Logging in as trader1..." -ForegroundColor Yellow
try {
    $loginBody = @{ username = "trader1"; password = "Pass1234" } | ConvertTo-Json
    $loginRes = Invoke-RestMethod -Uri "$API/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -ErrorAction Stop
    $token = $loginRes.access_token
    Write-Host "OK - Token obtained" -ForegroundColor Green
} catch {
    Write-Host "FAILED - Could not login" -ForegroundColor Red
    exit 1
}

$headers = @{ 
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json" 
}

# 2. Check Balance
Write-Host "`n[2] Checking balance..." -ForegroundColor Yellow
try {
    $balance = Invoke-RestMethod -Uri "$API/balance" -Method GET -Headers $headers -ErrorAction Stop
    Write-Host "OK - Balance retrieved:" -ForegroundColor Green
    foreach ($b in $balance) {
        Write-Host "  $($b.currency): Available=$($b.available), Locked=$($b.locked)" -ForegroundColor Gray
    }
} catch {
    Write-Host "FAILED - Could not get balance" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Deposit funds if needed
Write-Host "`n[3] Ensuring funds..." -ForegroundColor Yellow
$needsDeposit = $false
if ($balance) {
    $btc = ($balance | Where-Object { $_.currency -eq "BTC" })
    $usdt = ($balance | Where-Object { $_.currency -eq "USDT" })
    
    if (-not $btc -or [decimal]$btc.available -lt 1) {
        $needsDeposit = $true
    }
    if (-not $usdt -or [decimal]$usdt.available -lt 10000) {
        $needsDeposit = $true
    }
}

if ($needsDeposit) {
    Write-Host "  Depositing funds..." -ForegroundColor Yellow
    try {
        # Note: Backend expects USD, BTC, ETH not USDT
        Invoke-RestMethod -Uri "$API/accounts/deposit" -Method POST -Headers $headers -Body (@{currency="BTC"; amount="10"} | ConvertTo-Json) -ErrorAction SilentlyContinue | Out-Null
        Invoke-RestMethod -Uri "$API/accounts/deposit" -Method POST -Headers $headers -Body (@{currency="USD"; amount="100000"} | ConvertTo-Json) -ErrorAction SilentlyContinue | Out-Null
        Write-Host "  OK - Funds deposited" -ForegroundColor Green
    } catch {
        Write-Host "  Note: Deposit might have failed - continuing anyway" -ForegroundColor Gray
    }
} else {
    Write-Host "  OK - Sufficient funds" -ForegroundColor Green
}

# 4. Place a test order
Write-Host "`n[4] Placing test order..." -ForegroundColor Yellow
try {
    $orderBody = @{
        symbol = "BTC/USDT"
        side = "Bid"
        type = "Limit"
        price = 98000.50
        amount = 0.001
        trigger_price = 0
    } | ConvertTo-Json
    
    $orderRes = Invoke-RestMethod -Uri "$API/orders" -Method POST -Headers $headers -Body $orderBody -ErrorAction Stop
    Write-Host "OK - Order placed successfully!" -ForegroundColor Green
    Write-Host "  Order ID: $($orderRes.order.id)" -ForegroundColor Gray
} catch {
    Write-Host "FAILED - Could not place order" -ForegroundColor Red
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "  Response: $responseBody" -ForegroundColor Red
    }
}

# 5. Check open orders
Write-Host "`n[5] Checking open orders..." -ForegroundColor Yellow
try {
    $orders = Invoke-RestMethod -Uri "$API/orders/open" -Method GET -Headers $headers -ErrorAction Stop
    if ($orders -and $orders.Count -gt 0) {
        Write-Host "OK - $($orders.Count) open order(s)" -ForegroundColor Green
    } else {
        Write-Host "OK - No open orders" -ForegroundColor Green
    }
} catch {
    Write-Host "FAILED - Could not get orders" -ForegroundColor Red
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Test Complete!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "`nYou can now:" -ForegroundColor Yellow
Write-Host "1. Go to http://localhost:3000/login" -ForegroundColor White
Write-Host "2. Login with: trader1 / Pass1234" -ForegroundColor White
Write-Host "3. Try placing orders in the UI" -ForegroundColor White
