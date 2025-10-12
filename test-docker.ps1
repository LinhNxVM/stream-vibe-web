# Simple Docker Test Script for React Frontend

Write-Host "⚛️ Testing React Frontend Docker Configuration..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Build Development Image
Write-Host "📦 Building development image..." -ForegroundColor Yellow
try {
    docker build -f Dockerfile.dev -t react-app:dev .
    Write-Host "✅ Development build successful!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Development build failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Build Production Image  
Write-Host "📦 Building production image..." -ForegroundColor Yellow
try {
    docker build -t react-app:prod --target production .
    Write-Host "✅ Production build successful!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Production build failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 3: Run Development Server
Write-Host "🚀 Starting React development server..." -ForegroundColor Yellow
try {
    docker run -d --name test-react-dev `
        -e VITE_API_URL=http://localhost:3000 `
        -p 3001:3001 `
        react-app:dev
    Write-Host "✅ Development server started!" -ForegroundColor Green
    Start-Sleep 5  # Wait for server to start
}
catch {
    Write-Host "❌ Development server failed to start: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Run Production Server
Write-Host "🚀 Starting React production server..." -ForegroundColor Yellow
try {
    docker run -d --name test-react-prod `
        -e VITE_API_URL=http://localhost:3000 `
        -p 8080:80 `
        react-app:prod
    Write-Host "✅ Production server started!" -ForegroundColor Green
    Start-Sleep 5  # Wait for server to start
}
catch {
    Write-Host "❌ Production server failed to start: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Check if applications are responding
Write-Host "🔍 Testing applications..." -ForegroundColor Yellow

try {
    $devResponse = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 5
    Write-Host "✅ Development server responding! Status: $($devResponse.StatusCode)" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Development server not responding: $($_.Exception.Message)" -ForegroundColor Yellow
}

try {
    $prodResponse = Invoke-WebRequest -Uri "http://localhost:8080" -TimeoutSec 5
    Write-Host "✅ Production server responding! Status: $($prodResponse.StatusCode)" -ForegroundColor Green
}
catch {
    Write-Host "⚠️  Production server not responding: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Test Summary:" -ForegroundColor Cyan
Write-Host "- Development: http://localhost:3001" -ForegroundColor White
Write-Host "- Production: http://localhost:8080" -ForegroundColor White

Write-Host ""
Write-Host "🧹 Cleanup commands:" -ForegroundColor Yellow  
Write-Host "docker stop test-react-dev test-react-prod" -ForegroundColor Gray
Write-Host "docker rm test-react-dev test-react-prod" -ForegroundColor Gray
Write-Host "docker rmi react-app:dev react-app:prod" -ForegroundColor Gray