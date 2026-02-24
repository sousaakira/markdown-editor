#!/bin/bash

echo "🚀 Starting Markdown Editor (JavaScript Version)"
echo "============================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🎯 Starting React development server..."
echo "📍 Open http://localhost:5173 or http://localhost:5174 in your browser"
echo ""
echo "⚡ Note: First run may show some warnings - this is normal!"
echo "🔧 The editor will be ready in a few seconds..."
echo ""

# Start React development server
npm run dev:renderer