
FROM node:22-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package.json frontend/yarn.lock ./

RUN apk add --no-cache python3 make g++
RUN yarn install --frozen-lockfile

COPY frontend/ ./
RUN yarn build

FROM node:22-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package.json backend/yarn.lock ./
RUN apk add --no-cache python3 make g++
RUN yarn install --frozen-lockfile

COPY backend/ ./
RUN yarn build

FROM node:22-alpine AS frontend
WORKDIR /app/frontend
COPY --from=frontend-build /app/frontend/dist ./dist
COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install --production --ignore-scripts --prefer-offline
EXPOSE 5173
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]

FROM node:22-alpine AS backend
WORKDIR /app/backend
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY backend/package.json ./
EXPOSE 3000
ENV NODE_ENV production
CMD ["node", "dist/main.js"]
