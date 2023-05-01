# Pull node alpine and use it to build the application
FROM node:16 as builder

# Set a working directory, copy application files and install packages
WORKDIR /app
COPY . ./
RUN npx pnpm i --store=node_modules/.pnpm-store && npx pnpm run build

# Copy built application and run it using nginx web server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
