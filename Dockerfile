# Base image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root configuration files
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY apps/ ./apps/
COPY tsconfig.json ./

# Build all apps (monorepo)
RUN npm run build:gateway && \
    npm run build:user && \
    npm run build:product && \
    npm run build:order

# Production image
FROM node:20-alpine

WORKDIR /app

# Copy built files and necessary configs
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/nest-cli.json ./nest-cli.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Expose port (only for gateway)
EXPOSE 3000

# Command will be overridden by docker-compose.yaml
CMD ["npm", "start"]
