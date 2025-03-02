# Base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build all apps (monorepo)
RUN npm run build:gateway && \
    npm run build:user-service && \
    npm run build:product-service && \
    npm run build:order-service

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy built files and node_modules from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port (only for gateway, others are microservices)
EXPOSE 3000

# Command will be overridden by docker-compose.yaml
CMD ["npm", "start"]
