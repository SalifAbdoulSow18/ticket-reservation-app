# =========================================
# STAGE 1: BUILD - Compilation de l'application Vue.js
# =========================================
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances (pour bénéficier du cache Docker)
COPY package*.json ./
COPY package-lock.json ./

# Installer les dépendances
RUN npm ci --only=production

# Copier le reste du code source
COPY . .

# Compiler l'application pour la production
RUN npm run build

# =========================================
# STAGE 2: RUN - Serveur Nginx pour les fichiers statiques
# =========================================
FROM nginx:alpine AS runner

# Créer les dossiers nécessaires avec les bonnes permissions
RUN mkdir -p /var/cache/nginx /var/run && \
    chown -R nginx:nginx /var/cache/nginx /var/run && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers compilés depuis l'étape builder
COPY --from=builder --chown=nginx:nginx /app/dist /usr/share/nginx/html

# Exposer le port (port non-privilégié)
EXPOSE 8080

# Passer à l'utilisateur non-root
USER nginx

# Démarrer Nginx en avant-plan
CMD ["nginx", "-g", "daemon off;"]