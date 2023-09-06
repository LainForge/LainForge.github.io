# Build stage
FROM node:16-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Serve with nginx
FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

# Install Certbot and its dependencies
RUN apk add --no-cache certbot certbot-nginx

# Copy a custom Nginx configuration file (if needed)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports 80 and 443
EXPOSE 80
EXPOSE 443

# Entry point script to obtain and renew the SSL certificate
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

