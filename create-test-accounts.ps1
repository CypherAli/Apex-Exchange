# Create Test Accounts for Trading Platform
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Creating Test Accounts..." -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan

$API = "http://localhost:8080/api/v1"

# Test accounts to create
$testAccounts = @(
    @{ username = "trader1"; email = "trader1@test.com"; password = "Pass1234"; btc = "10"; usdt = "100000" }
    @{ username = "trader2"; email = "trader2@test.com"; password = "Pass1234"; btc = "5"; usdt = "50000" }
    @{ username = "alice"; email = "alice@test.com"; password = "Pass1234"; btc = "20"; usdt = "200000" }
    @{ username = "bob"; email = "bob@test.com"; password = "Pass1234"; btc = "15"; usdt = "150000" }
)

$successfulAccounts = @()

foreach ($account in $testAccounts) {
    Write-Host "`n[Creating] $($account.username)..." -ForegroundColor Yellow
    
    try {
        # 1. Register
        $regBody = @{ 
            username = $account.username
            email = $account.email
            password = $account.password 
        } | ConvertTo-Json
        
        $regRes = Invoke-RestMethod -Uri "$API/auth/register" -Method POST -Body $regBody -ContentType "application/json" -ErrorAction Stop
        Write-Host "  ✓ Registered - User ID: $($regRes.user.id)" -ForegroundColor Green
        
        # 2. Login to get token
        $loginBody = @{ 
            username = $account.username
            password = $account.password 
        } | ConvertTo-Json
        
        $loginRes = Invoke-RestMethod -Uri "$API/auth/login" -Method POST -Body $loginBody -ContentType "application/json" -ErrorAction Stop
        $token = $loginRes.access_token
        Write-Host "  ✓ Logged in" -ForegroundColor Green
        
        $headers = @{ 
            "Authorization" = "Bearer $token"
            "Content-Type" = "application/json" 
        }
        
        # 3. Deposit BTC
        $btcBody = @{ currency = "BTC"; amount = $account.btc } | ConvertTo-Json
        Invoke-RestMethod -Uri "$API/accounts/deposit" -Method POST -Headers $headers -Body $btcBody -ErrorAction Stop | Out-Null
        Write-Host "  ✓ Deposited $($account.btc) BTC" -ForegroundColor Green
        
        # 4. Deposit USDT
        $usdtBody = @{ currency = "USDT"; amount = $account.usdt } | ConvertTo-Json
        Invoke-RestMethod -Uri "$API/accounts/deposit" -Method POST -Headers $headers -Body $usdtBody -ErrorAction Stop | Out-Null
        Write-Host "  ✓ Deposited $($account.usdt) USDT" -ForegroundColor Green
        
        $successfulAccounts += $account
        
    } catch {
        Write-Host "  ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $responseBody = $reader.ReadToEnd()
            Write-Host "    Details: $responseBody" -ForegroundColor Red
        }
    }
}

Write-Host "`n==================================" -ForegroundColor Cyan
Write-Host "Test Accounts Created!" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan

if ($successfulAccounts.Count -gt 0) {
    Write-Host "`nLogin Credentials:" -ForegroundColor Yellow
    Write-Host "==================" -ForegroundColor Yellow
    foreach ($account in $successfulAccounts) {
        Write-Host "`nUsername: $($account.username)" -ForegroundColor Cyan
        Write-Host "Password: $($account.password)" -ForegroundColor Cyan
        Write-Host "Balance:  $($account.btc) BTC, $($account.usdt) USDT" -ForegroundColor Gray
    }
    
    Write-Host "`n==================================" -ForegroundColor Cyan
    Write-Host "Login at: http://localhost:3000/login" -ForegroundColor Green
    Write-Host "==================================" -ForegroundColor Cyan
} else {
    Write-Host "`n✗ No accounts were created successfully" -ForegroundColor Red
    Write-Host "Make sure the Gateway API is running on http://localhost:8080" -ForegroundColor Yellow
}
