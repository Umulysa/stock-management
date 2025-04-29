#!/bin/bash

# This script runs both the frontend and backend applications

# Start the Spring Boot backend
echo "Starting Spring Boot backend..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 10

# Start the Next.js frontend
echo "Starting Next.js frontend..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

# Function to handle script termination
function cleanup {
  echo "Stopping applications..."
  kill $BACKEND_PID
  kill $FRONTEND_PID
  exit
}

# Register the cleanup function for script termination
trap cleanup SIGINT SIGTERM

# Keep the script running
echo "Both applications are running. Press Ctrl+C to stop."
wait
