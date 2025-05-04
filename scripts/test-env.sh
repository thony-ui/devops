#!/bin/bash

echo "🐳 Starting Docker Compose..."
docker compose -p "test" -f infra/docker/docker-compose.test.yml up --build -d

echo "🧪 Running end to end tests inside container..."
docker exec node-app-test npm run test:e2e

echo "🧪 Running unit tests inside container..."
docker exec node-app-test npm run test:unit

echo "🧹 Cleaning up Docker Compose..."
docker compose -p "test" -f infra/docker/docker-compose.test.yml down -v
