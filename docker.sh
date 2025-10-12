#!/bin/bash

# Docker Management Script for React Frontend

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

print_usage() {
    echo "Usage: $0 [COMMAND] [MODE]"
    echo ""
    echo "Commands:"
    echo "  start    Start the services"
    echo "  stop     Stop the services"
    echo "  restart  Restart the services"
    echo "  logs     Show logs"
    echo "  clean    Stop services"
    echo "  build    Build the services"
    echo ""
    echo "Modes:"
    echo "  dev      Development mode (default)"
    echo "  prod     Production mode"
    echo ""
    echo "Examples:"
    echo "  $0 start dev"
    echo "  $0 logs prod"
    echo "  $0 clean"
}

COMMAND=${1:-start}
MODE=${2:-dev}

if [ "$MODE" = "prod" ]; then
    COMPOSE_FILE="docker-compose.yml"
    PORT="80"
    echo -e "${GREEN}Using production mode${NC}"
else
    COMPOSE_FILE="docker-compose.dev.yml"
    PORT="3001"
    echo -e "${YELLOW}Using development mode${NC}"
fi

case $COMMAND in
    start)
        echo -e "${GREEN}Starting React Frontend services...${NC}"
        docker-compose -f $COMPOSE_FILE up -d --build
        echo -e "${GREEN}Services started!${NC}"
        echo "Frontend: http://localhost:$PORT"
        ;;
    stop)
        echo -e "${YELLOW}Stopping services...${NC}"
        docker-compose -f $COMPOSE_FILE down
        echo -e "${GREEN}Services stopped!${NC}"
        ;;
    restart)
        echo -e "${YELLOW}Restarting services...${NC}"
        docker-compose -f $COMPOSE_FILE down
        docker-compose -f $COMPOSE_FILE up -d --build
        echo -e "${GREEN}Services restarted!${NC}"
        ;;
    logs)
        docker-compose -f $COMPOSE_FILE logs -f
        ;;
    clean)
        echo -e "${RED}Stopping services...${NC}"
        docker-compose -f docker-compose.yml down 2>/dev/null || true
        docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
        echo -e "${GREEN}Cleanup completed!${NC}"
        ;;
    build)
        echo -e "${GREEN}Building services...${NC}"
        docker-compose -f $COMPOSE_FILE build
        echo -e "${GREEN}Build completed!${NC}"
        ;;
    *)
        print_usage
        exit 1
        ;;
esac