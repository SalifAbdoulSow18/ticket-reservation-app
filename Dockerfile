# =========================================
# STAGE 1: BUILD
# =========================================
FROM node:22-alpine AS builder

WORKDIR /app

# 1. D'abord, copier UNIQUEMENT les fichiers de dépendances
COPY package*.json ./
COPY package-lock.json ./

# 2. INSTALLER LES DÉPENDANCES DANS LE CONTENEUR LINUX
#    C'est l'étape cruciale ! Ça installera les bons binaires Linux
RUN npm ci

# 3. Ensuite seulement, copier le reste du code source
COPY . .

# 4. Build
RUN npm run build

# =========================================
# STAGE 2: RUN
# =========================================
FROM nginx:alpine AS runner

# Configuration...
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
USER nginx
CMD ["nginx", "-g", "daemon off;"]