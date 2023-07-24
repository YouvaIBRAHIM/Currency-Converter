# MoneyValue
##Présentation 
Bienvenue dans la documentation de MoneyValue, une plateforme de conversion monétaire développée dans le domaine de la finance. MoneyValue offre un service public et gratuit qui permet d'acquérir des données sur les conversions de devises les plus demandées.

## Description

Ce projet est composé de deux parties distinctes : un backend basé sur Laravel contenu dans le dossier `api`, et un frontend utilisant Vue.js contenu dans le dossier `admin`. Cette architecture permet de développer et déployer facilement une application web complète en utilisant des technologies modernes.

## Installation

1. Cloner le dépôt GitHub :
   ```
   git clone https://github.com/YouvaIBRAHIM/Currency-Converter.git
   ```
   
Installation des dépendances Laravel :
   - Accéder au dossier `api` :
     ```
     cd api
     ```

## Étapes pour le dossier api :

1. Copier le fichier `.env` :
   ```
   cp .env.example .env
   ```

2. Configurer les variables d'environnement :
   Ouvrez le fichier `.env` nouvellement copié et configurez les paramètres de connexion à la base de données, l'URL de l'application, etc., selon vos besoins.

3. Générer une clé d'application :
   ```
   php artisan key:generate
   ```

4. Installer les dépendances Laravel :
   ```
   composer install
   ```

5. Effectuer une migration avec le remplissage de la base de données :
    
    Assurez vous d'avoir lancé le service MySQL avant d'exécuter cette commande
   ```
   php artisan migrate:fresh --seed
   ```

   Cette commande va créer toutes les tables de la base de données et les remplir avec des données de démonstration grâce aux seeders.

6. Lancer le serveur Laravel :
   ```
   php artisan serve
   ```

   Le serveur backend Laravel sera accessible à l'adresse http://localhost:8000.

Assurez-vous d'avoir correctement configuré les informations de la base de données dans le fichier `.env` avant d'exécuter la commande de migration et le serveur.

Une fois ces étapes terminées, vous pouvez passer au dossier `admin` pour configurer et lancer le frontend Vue.js en suivant les étapes que vous avez mentionnées :

## Étapes pour le dossier admin :

1. Installer les dépendances Vue.js :
   ```
   cd admin
   npm install
   ```

2. Lancer le serveur de développement pour le frontend :
   ```
   npm run dev
   ```

   Le serveur frontend Vue.js sera accessible à l'adresse http://localhost:3000.


Pour accéder à la page d'administration de votre application, suivez les étapes suivantes :

1. Assurez-vous que les serveurs du backend (Laravel) et du frontend (Vue.js) sont en cours d'exécution.

2. Accédez à la page de login en ouvrant votre navigateur Web et en entrant l'URL suivante : http://localhost:3000/login

3. Sur la page de login, entrez les informations d'identification suivantes :
   - Email : admin@admin.com
   - Mot de passe : admin

