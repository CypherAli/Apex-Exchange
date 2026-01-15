$token = (Invoke-RestMethod -Uri "http://localhost:8080/api/v1/auth/login" -Method POST -ContentType "application/json" -Body '{"username":"trader1","password":"Pass1234"}').access_token
$orders = Invoke-RestMethod -Uri "http://localhost:8080/api/v1/orders/open" -Method GET -Headers @{"Authorization" = "Bearer $token"}
Write-Host "Found: $($orders.Count) orders"
$orders | ConvertTo-Json
