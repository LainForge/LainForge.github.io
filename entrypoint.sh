#!/bin/sh

# Check if Certbot needs to obtain or renew the certificate
certbot certonly --nginx --non-interactive --agree-tos -d lainforge.org -d www.lainforge.org

# Start Nginx
nginx -g "daemon off;"
