#!/bin/bash

echo "🚀 Starting Markdown Editor Development (JavaScript Version)"
echo "=========================================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🎯 Starting React development server..."
echo "📍 Open http://localhost:5173 in your browser"

# Start in development mode
npm run dev:renderer