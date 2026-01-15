# Check Gateway logs for last error
Write-Host "Testing NEW order placement to see error..." -ForegroundColor Yellow

try {
    $token = (Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" -Method POST -ContentType "application/json" -Body '{"username":"trader1","password":"Pass1234"}').access_token
    
    Write-Host "Placing order..." -ForegroundColor Cyan
    $response = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders" `
        -Method POST `
        -ContentType "application/json" `
        -Headers @{"Authorization" = "Bearer $token"} `
        -Body '{"symbol":"BTC/USDT","side":"buy","type":"Limit","price":100000,"amount":0.01}' `
        -ErrorAction Stop
    
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    $response | ConvertTo-Json
    
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host "Status: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Message: $($_.ErrorDetails.Message)" -ForegroundColor Yellow
    
    # Try to parse error JSON
    try {
        $errorObj = $_.ErrorDetails.Message | ConvertFrom-Json
        Write-Host "Error details: $($errorObj.error)" -ForegroundColor Red
    } catch {
        Write-Host "Raw error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
