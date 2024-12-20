Mets le titre et sous titre partout sur le projet et rend le beau : # **My DevOps Project**

Ce projet est une application **TODO List** avec une architecture moderne utilisant Docker pour le développement et le déploiement. L'application permet de gérer des tâches avec une interface intuitive et une gestion centralisée des données.

---

## **Table des matières**

- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration de la base de données MySQL](#configuration-de-la-base-de-données-mysql)
- [Lancement du projet](#lancement-du-projet)
- [Structure du projet](#structure-du-projet)
- [Contribution](#contribution)

---

## **Architecture**

- **Frontend** : React.js  
- **Backend** : Node.js avec Express  
- **Base de données** : MySQL  
- **Conteneurisation** : Docker  
- **CI/CD** : GitHub Actions  

---

## **Prérequis**

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre système :

1. **Docker et Docker Compose** (pour la conteneurisation et l'orchestration).
2. **Node.js** (pour le développement local).
3. **Git** (pour cloner le dépôt).

---

## **Installation**

1. Clonez ce dépôt en utilisant Git :
   
bash
   git clone https://github.com/dankyle670/my-devops.git
   cd my-devops


2. Assurez-vous que vous êtes dans le répertoire du projet avant de continuer.

---

## **Configuration de la base de données MySQL**

Avant de lancer le projet, configurez manuellement la base de données MySQL :

1. Connectez-vous à MySQL :
   
bash
   mysql -u root -p


2. Créez la base de données nécessaire au projet :
   
sql
   CREATE DATABASE todo_db;
   USE todo_db;


3. Une fois la base de données créée, vous pouvez passer à la configuration et au lancement du projet.

---

## **Lancement du projet**

1. Lancez les conteneurs Docker (frontend, backend, et base de données) :
   
bash
   docker-compose up --build


2. L'application sera disponible :
   - **Frontend** : [http://localhost:3000](http://localhost:3000)  
   - **Backend** : [http://localhost:5000](http://localhost:5000)

3. Pour arrêter les conteneurs :
   
bash
   docker-compose down


---

## **Structure du projet**

Voici la structure de votre projet :

my-devops/
├── Backend/           # Code source du serveur Node.js
│   ├── config/        # Configuration de la base de données
│   ├── models/        # Modèles de données
│   ├── routes/        # Routes API
│   └── server.js      # Point d'entrée du serveur
├── Frontend/          # Code source de l'application React.js
│   ├── src/           # Code source React
│   ├── public/        # Fichiers publics
│   └── package.json   # Dépendances frontend
├── docker-compose.yml # Configuration Docker Compose
├── Dockerfile         # Dockerfile pour le backend
└── README.md          # Documentation du projet


---

## **Membres du groupe**
Ousmane Sacko
Kilian Izatoola
Daniel Komoe
EHoura Yvann
