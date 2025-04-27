#!/bin/bash
set -e

echo "🐳 Starting Docker Compose..."
docker compose -f infra/docker/docker-compose.test.yml up --build -d

echo "🧪 Running tests inside container..."
docker exec node-app-test npm run test:only

echo "🧹 Cleaning up Docker Compose..."
docker compose -f infra/docker/docker-compose.test.yml down -v
