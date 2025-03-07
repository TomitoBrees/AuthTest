# Application Web DRMTest

Il s'agit d'une application web simple qui simule l'authentification des utilisateurs. Elle est composée d'un backend en Python et d'un frontend en React. L'application utilise une base de données PostgreSQL pour stocker les données des utilisateurs.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Python 3.x**
- **Node.js** (pour les dépendances du frontend)
- **Yarn** (pour la gestion des packages du frontend)
- **PostgreSQL**

## Installation

### 1. Cloner le Répertoire

Commencez par cloner le répertoire sur votre machine locale :

```bash
git clone <url-du-répertoire>
cd DRMTest
```

### 2. Configurer le Backend

Accédez au dossier `backend` et installez les packages Python requis :

```bash
cd backend
pip install -r requirements.txt
```

Puis, pour configurer la base de donnée:
1. **Démarrer PostgreSQL** : Assurez-vous que PostgreSQL est en cours d'exécution sur votre machine.
2. **Créer une Base de Données** : Créez une nouvelle base de données nommée `DRMAuth` dans PostgreSQL.
3. **Mettre à Jour la Configuration de la Base de Données** : Ouvrez le fichier `database.py` dans le répertoire backend et mettez à jour les variables suivantes avec vos identifiants PostgreSQL :
    
   ```python
    USER = "postgres"
    PASSWORD = "1234"
    DATABASE_NAME = "DRMAuth"
    ```
   
### 3. Configurer le Frontend

Accédez au dossier `frontend` et installez les packages Node.js requis en utilisant Yarn:

```bash
cd ../frontend
yarn install
```

### 4. Lancer l'Application

Dans le dossier `backend`, démarrez le serveur Python :

```bash
cd ../backend
python main.py
```

Dans le dossier `frontend`, démarrez le serveur de développement Vite :

```bash
cd ../frontend
yarn dev
```

### 5. Accéder à l'Application

Une fois que les serveurs `backend` et `frontend` sont en cours d'exécution, vous pouvez accéder à l'application en naviguant vers `http://localhost:5173` dans votre navigateur web.

Vous pouvez également faire des requête API à l'addresse suivante: `http://localhost:8000/`

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
  - `public/` : Contient les fichiers statiques comme `index.html`.
  - `vite.config.ts` : Configuration de Vite pour le développement.

### Base de Données
- **Technologie** : L'application utilise PostgreSQL pour le stockage des données.
- **Configuration** : Assurez-vous que la base de données est correctement configurée et en cours d'exécution avant de démarrer le serveur backend.
- **Fichier de Configuration** : `database.py` contient les informations de connexion à la base de données.

### Dépendances
- **Backend** : Les dépendances Python sont listées dans `requirements.txt`.
- **Frontend** : Les dépendances Node.js sont gérées par Yarn et listées dans `package.json`.
