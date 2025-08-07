#!/bin/bash

# FellaCare Development Environment Startup Script
# This script starts all required services in the correct order

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

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -i :$port >/dev/null 2>&1; then
        return 0 # Port is in use
    else
        return 1 # Port is free
    fi
}

# Function to kill process on a specific port
kill_port() {
    local port=$1
    local pid=$(lsof -t -i:$port)
    if [ ! -z "$pid" ]; then
        kill -9 $pid 2>/dev/null
        print_warning "Killed process on port $port"
        sleep 1
    fi
}

# Function to wait for a service to be ready
wait_for_service() {
    local port=$1
    local service_name=$2
    local max_attempts=30
    local attempt=0
    
    print_status "Waiting for $service_name to start on port $port..."
    
    while [ $attempt -lt $max_attempts ]; do
        if check_port $port; then
            print_success "$service_name is ready on port $port"
            return 0
        fi
        sleep 1
        attempt=$((attempt + 1))
    done
    
    print_error "$service_name failed to start on port $port"
    return 1
}

# Main script starts here
print_status "Starting FellaCare Development Environment..."
echo ""

# Step 1: Load environment variables
print_status "Loading environment variables..."
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
    print_success "Environment variables loaded from .env.local"
else
    print_error ".env.local file not found!"
    exit 1
fi

# Set required environment variables
export GENKIT_ENV=dev
export NODE_ENV=development

# Step 2: Check and clean up existing processes
print_status "Checking for existing processes..."

PORTS=(9002 3100 3101 4000 4033)
for port in "${PORTS[@]}"; do
    if check_port $port; then
        print_warning "Port $port is already in use"
        kill_port $port
    fi
done

# Step 3: Install dependencies if needed
if [ ! -d "node_modules" ]; then
    print_status "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies"
        exit 1
    fi
    print_success "Dependencies installed"
fi

# Create logs and pids directories if they don't exist
mkdir -p logs
mkdir -p .pids

# Step 4: Start Genkit Runtime
print_status "Starting Genkit Runtime..."
npx tsx src/ai/dev.ts > logs/genkit-runtime.log 2>&1 &
GENKIT_RUNTIME_PID=$!
echo $GENKIT_RUNTIME_PID > .pids/genkit-runtime.pid

# Wait a bit for the runtime to initialize
sleep 3

# Check if runtime started successfully
if ps -p $GENKIT_RUNTIME_PID > /dev/null; then
    print_success "Genkit Runtime started (PID: $GENKIT_RUNTIME_PID)"
else
    print_error "Genkit Runtime failed to start. Check logs/genkit-runtime.log"
    exit 1
fi

# Step 5: Start Genkit UI
print_status "Starting Genkit Developer UI..."
npm run genkit:ui > logs/genkit-ui.log 2>&1 &
GENKIT_UI_PID=$!
echo $GENKIT_UI_PID > .pids/genkit-ui.pid

# Wait for Genkit UI to be ready
if wait_for_service 4000 "Genkit UI"; then
    print_success "Genkit UI available at http://localhost:4000"
else
    print_error "Genkit UI failed to start. Check logs/genkit-ui.log"
    exit 1
fi

# Step 6: Start Next.js Development Server
print_status "Starting Next.js development server..."
npm run next:dev > logs/nextjs.log 2>&1 &
NEXTJS_PID=$!
echo $NEXTJS_PID > .pids/nextjs.pid

# Wait for Next.js to be ready (Next.js takes longer to compile)
sleep 5  # Give Next.js time to start compilation
if wait_for_service 9002 "Next.js"; then
    print_success "Next.js available at http://localhost:9002"
else
    print_error "Next.js failed to start. Check logs/nextjs.log"
    exit 1
fi

# Summary
echo ""
print_success "FellaCare Development Environment is ready!"
echo ""
echo -e "${BLUE}Services running:${NC}"
echo -e "  • Next.js App:     ${GREEN}http://localhost:9002${NC}"
echo -e "  • Genkit UI:       ${GREEN}http://localhost:4000${NC}"
echo -e "  • Genkit Runtime:  ${GREEN}Port 3100${NC}"
echo -e "  • Telemetry API:   ${GREEN}Port 4033${NC}"
echo ""
echo -e "${BLUE}Logs available in:${NC}"
echo -e "  • Next.js:         logs/nextjs.log"
echo -e "  • Genkit UI:       logs/genkit-ui.log"
echo -e "  • Genkit Runtime:  logs/genkit-runtime.log"
echo ""
echo -e "${YELLOW}To stop all services, run:${NC} ./fellacare_stop.sh"
echo ""

# Keep the script running and show combined logs
print_status "Showing combined logs (Press Ctrl+C to stop all services)..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    print_status "Stopping all services..."
    
    # Kill all services
    for pid_file in .pids/*.pid; do
        if [ -f "$pid_file" ]; then
            pid=$(cat "$pid_file")
            if ps -p $pid > /dev/null 2>&1; then
                kill -9 $pid 2>/dev/null
                print_success "Stopped process $pid"
            fi
            rm -f "$pid_file"
        fi
    done
    
    print_success "All services stopped"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup EXIT INT TERM

# Tail all logs
tail -f logs/*.log