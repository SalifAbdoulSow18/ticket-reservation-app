# =========================================
# STAGE 1: BUILD
# =========================================
FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# =========================================
# STAGE 2: RUN
# =========================================
FROM nginx:alpine AS runner

# Créer les dossiers nécessaires avec les bonnes permissions
RUN mkdir -p /var/cache/nginx /var/run /tmp/nginx && \
    chown -R nginx:nginx /var/cache/nginx /var/run /tmp/nginx && \
    chmod -R 755 /var/cache/nginx /var/run /tmp/nginx

# Copier la configuration Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers compilés
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 8080

# Utilisateur non-root
USER nginx

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]