# Utiliser l'image Nginx comme base
FROM nginx:stable-alpine

# Copier les fichiers frontend dans le répertoire du serveur Nginx
COPY . /usr/share/nginx/html

# Exposer le port pour l'accès au serveur
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
