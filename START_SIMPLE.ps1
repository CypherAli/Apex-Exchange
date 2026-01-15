# Quick Start - Simple Version
Write-Host ""
Write-Host "=== STARTING TRADING PLATFORM ===" -ForegroundColor Cyan
Write-Host ""

# Step 1: Start infrastructure
Write-Host "[1/4] Starting infrastructure (Postgres, Redis, NATS)..." -ForegroundColor Cyan
docker-compose up -d postgres redis nats

Write-Host "Waiting for databases..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Step 2: Start Rust Engine
Write-Host ""
Write-Host "[2/4] Starting Rust Matching Engine..." -ForegroundColor Cyan
$rustProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'e:\My_Project\services\engine'; Write-Host 'Rust Engine Starting...' -ForegroundColor Green; cargo run --release" -PassThru

Start-Sleep -Seconds 3

# Step 3: Start Go Gateway
Write-Host ""
Write-Host "[3/4] Starting Go Gateway..." -ForegroundColor Cyan
$goProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'e:\My_Project\services\gateway'; Write-Host 'Go Gateway Starting...' -ForegroundColor Green; go run cmd\server\main.go" -PassThru

Start-Sleep -Seconds 3

# Step 4: Start Frontend
Write-Host ""
Write-Host "[4/4] Starting Frontend..." -ForegroundColor Cyan
$webProcess = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'e:\My_Project\web'; Write-Host 'Frontend Starting...' -ForegroundColor Green; npm run dev" -PassThru

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "All services are starting!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Wait 10-15 seconds for services to be ready" -ForegroundColor Yellow
Write-Host ""
Write-Host "URLs:" -ForegroundColor Cyan
Write-Host "  - Frontend:  http://localhost:3000" -ForegroundColor White
Write-Host "  - Gateway:   http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "To stop: close terminal windows and run docker-compose down" -ForegroundColor Yellow
Write-Host ""
