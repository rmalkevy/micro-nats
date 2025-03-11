# Base image for building
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root configuration files
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/
COPY prisma/migrations ./prisma/migrations/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy all source files
COPY apps/ ./apps/

# Build all apps
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
COPY --from=builder /app/prisma ./prisma/

# Expose port (only for gateway)
EXPOSE 3000

# Command will be overridden by docker-compose.yaml
CMD ["npm", "start"]
