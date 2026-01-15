# Test Account Information
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Test Accounts Available" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

$API = "http://localhost:8080/api/v1"

# Existing test accounts that were just created
$existingAccounts = @(
    @{ username = "trader1"; password = "Pass1234" }
    @{ username = "trader2"; password = "Pass1234" }
    @{ username = "alice"; password = "Pass1234" }
    @{ username = "bob"; password = "Pass1234" }
)

Write-Host "`n✅ These accounts are ready to use:" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Green

foreach ($account in $existingAccounts) {
    Write-Host "`nUsername: $($account.username)" -ForegroundColor Cyan
    Write-Host "Password: $($account.password)" -ForegroundColor Cyan
    
    # Try to login and check balance
    try {
        $loginBody = @{ username = $account.username; password = $account.password } | ConvertTo-Json
        $loginRes = Invoke-RestMethod -Uri "$API/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -ErrorAction Stop
        $token = $loginRes.access_token
        
        $headers = @{ "Authorization" = "Bearer $token" }
        
        # Get balance
        $balance = Invoke-RestMethod -Uri "$API/balance" -Method GET -Headers $headers -ErrorAction Stop
        
        $btc = ($balance | Where-Object { $_.currency -eq "BTC" }).available
        $usdt = ($balance | Where-Object { $_.currency -eq "USDT" }).available
        
        Write-Host "Balance:  $btc BTC, $usdt USDT" -ForegroundColor Gray
        Write-Host "Status:   ✅ Active" -ForegroundColor Green
        
        # If balance is 0, offer to deposit
        if ([decimal]$btc -eq 0 -or [decimal]$usdt -eq 0) {
            Write-Host "⚠️  Low balance - depositing funds..." -ForegroundColor Yellow
            
            Invoke-RestMethod -Uri "$API/accounts/deposit" -Method POST -Headers $headers -Body (@{currency="BTC"; amount="10"} | ConvertTo-Json) -ContentType "application/json" -ErrorAction Stop | Out-Null
            Invoke-RestMethod -Uri "$API/accounts/deposit" -Method POST -Headers $headers -Body (@{currency="USDT"; amount="100000"} | ConvertTo-Json) -ContentType "application/json" -ErrorAction Stop | Out-Null
            
            Write-Host "✅ Deposited: 10 BTC, 100,000 USDT" -ForegroundColor Green
        }
        
    } catch {
        Write-Host "Status:   ⚠️  Could not verify" -ForegroundColor Yellow
    }
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Login at: http://localhost:3000/login" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan

Write-Host "`nQuick Copy:" -ForegroundColor Yellow
Write-Host "Username: trader1" -ForegroundColor White
Write-Host "Password: Pass1234" -ForegroundColor White
