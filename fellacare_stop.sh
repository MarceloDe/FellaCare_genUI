#!/bin/bash

# FellaCare Development Environment Stop Script
# This script stops all running services

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[FellaCare]${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Function to kill process on a specific port
kill_port() {
    local port=$1
    local service_name=$2
    local pid=$(lsof -t -i:$port 2>/dev/null)
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
        print_success "Stopped $service_name on port $port (PID: $pid)"
    else
        print_status "$service_name not running on port $port"
    fi
}

print_status "Stopping FellaCare Development Environment..."
echo ""

# Stop services by port
kill_port 9002 "Next.js"
kill_port 4000 "Genkit UI"
kill_port 4033 "Telemetry API"
kill_port 3100 "Genkit Runtime"
kill_port 3101 "Genkit Runtime (alternate)"

# Stop services by PID files
if [ -d ".pids" ]; then
    for pid_file in .pids/*.pid; do
        if [ -f "$pid_file" ]; then
            pid=$(cat "$pid_file")
            if ps -p $pid > /dev/null 2>&1; then
                kill -9 $pid 2>/dev/null
                print_success "Stopped process $pid from $(basename $pid_file)"
            fi
            rm -f "$pid_file"
        fi
    done
fi

# Kill any remaining node/npm processes related to the project
pkill -f "npm run next:dev" 2>/dev/null
pkill -f "npm run genkit" 2>/dev/null
pkill -f "tsx.*src/ai/dev.ts" 2>/dev/null

echo ""
print_success "All FellaCare services stopped"
echo ""