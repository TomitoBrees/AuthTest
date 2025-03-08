# Application Web DRMTest

Il s'agit d'une application web simple qui simule l'authentification des utilisateurs. Elle est composée d'un backend en Python et d'un frontend en React. L'application utilise une base de données PostgreSQL pour stocker les données des utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Docker**

## Installation

### 1. Cloner le Répertoire

Commencez par cloner le répertoire sur votre machine locale :

```bash
git clone https://github.com/TomitoBrees/DRMTest.git
cd DRMTest
```

### 2. Lancer l'Application

Le `backend`, le `frontend` ansi que la `database` peuvent être lancés directement grace a **Docker**.

Depuis la racine, il suffit de faire cette commande :

```bash
docker-compose up --build
```

### 5. Accéder à l'Application

Une fois que les serveurs `backend` et `frontend` sont en cours d'exécution, vous pouvez accéder à l'application en naviguant vers `http://localhost:5173` dans votre navigateur web.

Vous pouvez également faire des requêtes API à l'adresse suivante: `http://localhost:8000/`

## Endpoints API

## 1. Récupérer tous les utilisateurs

### **GET** `/users`

- **Description** : Cet endpoint renvoie une liste de tous les utilisateurs enregistrés.
- **Réponse** : Une liste d'utilisateurs sous forme de `UserResponse`.
- **Exemple de réponse** :
  ```json
  {
    "users": [
      {"username": "user1"},
      {"username": "user2"}
    ]
  }
  ```
  
## 2. Ajouter un nouvel utilisateur

### **POST** `/users`

- **Description** : Cet endpoint permet d'ajouter un nouvel utilisateur à la base de données.
- **Corps de la requête** : Un objet `UserCreate` contenant `username` et `password`.
- **Réponse** :
  - Si l'utilisateur est ajouté avec succès : `{"success": True}`
  - Si l'utilisateur existe déjà : `{"success": False}`
- **Exemple de requête** :
  ```json
  {
    "username": "newuser",
    "password": "password123"
  }
  ```
  
## 3. Vérifier l'existence d'un utilisateur

### **POST** `/check-user`

- **Description** : Cet endpoint vérifie si un utilisateur existe et si le mot de passe est correct.
- **Corps de la requête** : Un objet `UserCreate` contenant `username` et `password`.
- **Réponse** :
  - Si l'utilisateur existe et que le mot de passe est correct : `{"success": True}`
  - Sinon : `{"success": False}`
- **Exemple de requête** :
  ```json
  {
    "username": "existinguser",
    "password": "password123"
  }
  ```
  
## Informations Supplémentaires

### Backend
- **Technologie** : Le backend est construit en Python avec SQLAlchemy pour la gestion de la base de données.
- **Fichiers Principaux** :
  - `main.py` : Point d'entrée de l'application backend.
  - `database.py` : Configuration de la base de données.
  - `models.py` : Définition des modèles de données.
  - `auth.py` : Gestion de l'authentification.

### Frontend
- **Technologie** : Le frontend est construit en React avec Tailwind CSS pour le style.
- **Fichiers Principaux** :
  - `src/` : Contient les composants React et la logique du frontend.
  - `vite.config.ts` : Configuration de Vite pour le développement.

### Base de Données
- **Technologie** : L'application utilise PostgreSQL pour le stockage des données.
- **Configuration** : Assurez-vous que la base de données est correctement configurée et en cours d'exécution avant de démarrer le serveur backend.
- **Fichier de Configuration** : `database.py` contient les informations de connexion à la base de données.

### Dépendances
- **Backend** : Les dépendances Python sont listées dans `requirements.txt`.
- **Frontend** : Les dépendances Node.js sont gérées par Yarn et listées dans `package.json`.

Readme écris avec l'aide de l'IA générative.
