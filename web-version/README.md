# ProgressTracker - Application Web

Ce projet est une migration de l'application Android ProgressTracker vers une application web complète utilisant React, TypeScript et Node.js.

## Structure du projet

Le projet est divisé en deux parties principales :

- **Frontend** : Application React/TypeScript avec Vite
- **Backend** : API REST Node.js/Express avec MongoDB

## Prérequis

- Node.js (v16+)
- MongoDB (local ou MongoDB Atlas)
- npm ou yarn

## Installation et démarrage

### Backend

1. Accédez au dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier `.env` à la racine du dossier backend avec les variables suivantes :
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/progress-tracker
JWT_SECRET=votre_secret_jwt
JWT_EXPIRATION=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

4. Démarrez le serveur en mode développement :
```bash
npm run dev
```

### Frontend

1. Accédez au dossier frontend :
```bash
cd progress-tracker
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez l'application en mode développement :
```bash
npm run dev
```

4. L'application sera accessible à l'adresse : http://localhost:5173

## Fonctionnalités

- **Authentification** : Inscription et connexion des utilisateurs
- **Objectifs annuels** : Définition et suivi des objectifs pour RD, LB, LC et PS
- **Saisie quotidienne** : Enregistrement des activités journalières
- **Tableau de bord** : Visualisation de la progression vers les objectifs
- **Historique** : Consultation des entrées précédentes
- **Importunités** : Gestion des sujets d'importunité avec compteurs

## Structure des données

L'application utilise MongoDB avec les collections suivantes :

- **Users** : Informations des utilisateurs
- **AnnualGoals** : Objectifs annuels par utilisateur
- **DailyEntries** : Entrées quotidiennes
- **BibleReadings** : Lectures bibliques liées aux entrées
- **ChristianReadings** : Lectures chrétiennes liées aux entrées
- **Importunities** : Sujets d'importunité

## Technologies utilisées

### Frontend
- React 19
- TypeScript
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS
- DaisyUI
- React Hook Form

### Backend
- Node.js
- Express
- TypeScript
- MongoDB avec Mongoose
- JWT pour l'authentification
- bcrypt pour le hachage des mots de passe

## Développement

### Ajout de nouvelles fonctionnalités

1. **Backend** : Créez de nouveaux modèles, contrôleurs et routes dans les dossiers correspondants
2. **Frontend** : Ajoutez de nouveaux composants, pages et slices Redux selon les besoins

### Tests

Des tests peuvent être ajoutés dans les dossiers appropriés :

- **Backend** : Utilisez Jest pour les tests unitaires et d'intégration
- **Frontend** : Utilisez Vitest pour les tests de composants et d'intégration

## Déploiement

### Backend
Le backend peut être déployé sur des services comme Heroku, Render, ou Railway.

### Frontend
Le frontend peut être déployé sur Vercel, Netlify, ou GitHub Pages.

## Licence

Ce projet est sous licence MIT.
