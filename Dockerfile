FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
COPY nest-cli.json ./
COPY tsconfig.json ./
COPY libs/ ./libs/  # Includes libs/common/prisma/
COPY apps/ ./apps/

RUN npm install
RUN npx prisma generate --schema libs/common/prisma/schema.prisma  # Specify schema path
RUN npm run build:gateway && \
    npm run build:user-service && \
    npm run build:product-service && \
    npm run build:order-service

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/nest-cli.json ./nest-cli.json
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/libs/ ./libs/  # Includes prisma/

EXPOSE 3000

CMD ["npm", "start"]