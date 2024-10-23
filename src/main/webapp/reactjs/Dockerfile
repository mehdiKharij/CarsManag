FROM nginx:alpine

# Copie les fichiers construits dans le répertoire public de Nginx
COPY build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
