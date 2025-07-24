# Construir mi aplicación Angular
FROM node:18-alpine AS build
WORKDIR /app

# Instalar cosas que necesita Angular
RUN apk add --no-cache python3 make g++

# Copiar archivos de configuración
COPY package*.json ./
RUN npm install

# Copiar mi código y compilarlo
COPY . .
RUN npm install -g @angular/cli
RUN npm run build

# Servir con nginx (más liviano)
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
RUN rm /etc/nginx/conf.d/default.conf

# Copiar mi aplicación compilada
COPY --from=build /app/dist/announcements/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Dar permisos
RUN chmod -R 755 /usr/share/nginx/html

# Exponer puerto web
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]