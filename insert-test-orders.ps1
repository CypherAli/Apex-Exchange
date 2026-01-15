# Insert Test Orders Directly to Database
Write-Host "================================" -ForegroundColor Cyan
Write-Host "INSERTING TEST ORDERS" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Get trader1 user ID
Write-Host "`n[1] Getting trader1 user ID..." -ForegroundColor Yellow
$userId = docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -t -c "SELECT id FROM users WHERE username='trader1'" 2>$null
$userId = $userId.Trim()

if ($userId) {
    Write-Host "✅ User ID: $userId" -ForegroundColor Green
    
    # Insert test orders
    Write-Host "`n[2] Inserting 3 test orders..." -ForegroundColor Yellow
    
    $sql = @"
INSERT INTO orders (user_id, symbol, side, price, amount, status, created_at) VALUES
('$userId', 'BTC/USDT', 'Bid', 98000, 0.5, 'open', NOW()),
('$userId', 'BTC/USDT', 'Bid', 97500, 0.3, 'open', NOW()),
('$userId', 'BTC/USDT', 'Ask', 100000, 0.4, 'open', NOW());
"@
    
    docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "$sql" 2>$null
    Write-Host "✅ Inserted 3 orders" -ForegroundColor Green
    
    # Verify
    Write-Host "`n[3] Verifying orders..." -ForegroundColor Yellow
    docker exec -e PGPASSWORD='trading_password' trading-postgres psql -U trading_user -d trading_db -c "SELECT id, symbol, side, price::numeric(10,2), amount::numeric(10,4), status FROM orders WHERE user_id='$userId' ORDER BY created_at DESC LIMIT 5" 2>$null
    
} else {
    Write-Host "❌ trader1 user not found!" -ForegroundColor Red
    Write-Host "Please register trader1 first" -ForegroundColor Yellow
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "✅ Done! Now refresh the web page" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
