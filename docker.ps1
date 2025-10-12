# Docker Management Script for React Frontend (PowerShell)

param(
    [Parameter(Position=0)]
    [ValidateSet("start", "stop", "restart", "logs", "clean", "build")]
    [string]$Command = "start",
    
    [Parameter(Position=1)]
    [ValidateSet("dev", "prod")]
    [string]$Mode = "dev"
)

function Write-ColorOutput {
    param($Message, $Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

function Show-Usage {
    Write-Host "Usage: .\docker.ps1 [COMMAND] [MODE]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Commands:" -ForegroundColor Yellow
    Write-Host "  start    Start the services"
    Write-Host "  stop     Stop the services"
    Write-Host "  restart  Restart the services"
    Write-Host "  logs     Show logs"
    Write-Host "  clean    Stop services"
    Write-Host "  build    Build the services"
    Write-Host ""
    Write-Host "Modes:" -ForegroundColor Yellow
    Write-Host "  dev      Development mode (default)"
    Write-Host "  prod     Production mode"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\docker.ps1 start dev"
    Write-Host "  .\docker.ps1 logs prod"
    Write-Host "  .\docker.ps1 clean"
}

if ($Mode -eq "prod") {
    $ComposeFile = "docker-compose.yml"
    $Port = "80"
    Write-ColorOutput "Using production mode" "Green"
} else {
    $ComposeFile = "docker-compose.dev.yml"
    $Port = "3001"
    Write-ColorOutput "Using development mode" "Yellow"
}

switch ($Command) {
    "start" {
        Write-ColorOutput "Starting React Frontend services..." "Green"
        docker-compose -f $ComposeFile up -d --build
        Write-ColorOutput "Services started!" "Green"
        Write-Host "Frontend: http://localhost:$Port"
    }
    "stop" {
        Write-ColorOutput "Stopping services..." "Yellow"
        docker-compose -f $ComposeFile down
        Write-ColorOutput "Services stopped!" "Green"
    }
    "restart" {
        Write-ColorOutput "Restarting services..." "Yellow"
        docker-compose -f $ComposeFile down
        docker-compose -f $ComposeFile up -d --build
        Write-ColorOutput "Services restarted!" "Green"
    }
    "logs" {
        docker-compose -f $ComposeFile logs -f
    }
    "clean" {
        Write-ColorOutput "Stopping services..." "Red"
        try { docker-compose -f docker-compose.yml down } catch {}
        try { docker-compose -f docker-compose.dev.yml down } catch {}
        Write-ColorOutput "Cleanup completed!" "Green"
    }
    "build" {
        Write-ColorOutput "Building services..." "Green"
        docker-compose -f $ComposeFile build
        Write-ColorOutput "Build completed!" "Green"
    }
    default {
        Show-Usage
        exit 1
    }
}