FROM nginx:alpine

# Copy web files (viewer, stills, audio, video preview)
COPY web/ /usr/share/nginx/html/

# Nginx config for proper MIME types and range requests for media streaming
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    client_max_body_size 100M; \
    location / { \
        add_header Cache-Control "no-cache, must-revalidate"; \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(mp4|mp3)$ { \
        add_header Cache-Control "no-cache, must-revalidate"; \
        add_header Accept-Ranges bytes; \
    } \
    location ~* \.(png|jpg|jpeg|gif|svg|ico)$ { \
        expires 1d; \
        add_header Cache-Control "public, no-transform"; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
