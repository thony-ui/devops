# -------------------------------
# Stage 1: Build Stage
# -------------------------------
    FROM node:23-slim AS builder

    # Set working directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json first (better cache)
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy the rest of the app
    COPY . .
    
    # Build the app (TypeScript -> JavaScript)
    RUN npm run build
    
    # -------------------------------
    # Stage 2: Production Stage
    # -------------------------------
    FROM node:23-slim AS production
    
    # Set working directory
    WORKDIR /app
    
    # Only copy production node_modules and built app
    COPY --from=builder /app/package*.json ./
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/dist ./dist
    
    # (Optional) Install PM2 if you want process management
    # RUN npm install -g pm2
    
    # Expose the app port
    EXPOSE 3000
    
    # Default command
    CMD ["node", "dist/app.js"]
    