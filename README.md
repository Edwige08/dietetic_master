# 🧠 Dietetic Master

## 📌 Description

**Dietetic Master** est une plateforme web éducative interactive destinée aux étudiants en diététique en France.
Elle permet de réviser efficacement grâce à des outils modernes comme des **flashcards**, des **quiz** et des **cas cliniques immersifs**, tout en intégrant des mécanismes de **gamification** pour renforcer la motivation.

L’application s’adresse à trois types d’utilisateurs :

* 🎓 Étudiants
* 👩‍🏫 Enseignants
* ⚙️ Administrateurs

---

## 🎯 Objectifs du projet

* Faciliter la **révision active** des étudiants
* Proposer des **cas pratiques réalistes**
* Permettre la **création et le partage de contenu pédagogique**
* Offrir aux enseignants un **suivi des performances**
* Garantir un contenu **fiable via validation**

---

## 🚀 Fonctionnalités principales (MVP)

### 🎓 Étudiants

* Créer et gérer des flashcards
* Réviser via un système interactif
* Faire des quiz
* Consulter des cas cliniques simples
* Suivre leur progression

### 👩‍🏫 Enseignants *(version future)*

* Créer du contenu pédagogique
* Assigner des exercices
* Suivre les résultats des étudiants

### ⚙️ Administrateur *(version future)*

* Valider les contenus
* Gérer les utilisateurs
* Superviser la plateforme

---

## 🧱 Architecture technique

### 🖥️ Frontend

* Framework : Next.js
* Langage : TypeScript
* Styling : CSS moderne
* UI Components : Storybook

### 🔙 Backend

* Langage : Python
* Framework : Django
* API : Django REST Framework

### 🗄️ Base de données

* PostgreSQL
* Hébergement : Neon

### ☁️ Déploiement

* Vercel

### 📦 Monorepo

Organisation du projet :

```
dietetic_master/
├── packages/
│   ├── app/         # Frontend Next.js
│   ├── api/         # Backend Django
│   ├── design-system/         # Composants partagés (Storybook)
│
└── README.md
```

---

## 🗃️ Modélisation des données (simplifiée)

### Entités principales :

* User (rôles : étudiant, enseignant, admin)
* Flashcard
* Quiz
* Question
* AnswerChoice
* ClinicalCase (future version)

---

## ⚙️ Installation du projet

### 1. Cloner le repository

```bash
git clone https://github.com/Edwige08/dietetic_master.git
cd dietetic_master
```

---

### 2. Installer les dépendances

```bash
pnpm install
```

---

### 3. Lancer le frontend

```bash
cd packages/app/
pnpm dev
```

---

### 4. Lancer le backend

```bash
cd packages/api/
python manage.py runserver
```

---

### 5. Configurer les variables d’environnement

Créer un fichier `.env` :

```
DATABASE_URL=your_neon_database_url
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🧪 Lancer Storybook

```bash
cd packages/design-system
pnpm run storybook
```

---

## 📱 Approche mobile-first

L’application est conçue en **mobile-first** :

* Interface optimisée smartphone
* Navigation simple et rapide
* Expérience utilisateur fluide

---

## 📈 Roadmap

### MVP (en cours)

* [x] Setup projet
* [ ] Flashcards (CRUD + révision)
* [ ] Quiz basiques
* [ ] Suivi simple

### V2

* [ ] Système de validation des contenus
* [ ] Outils enseignants
* [ ] Cas cliniques avancés
* [ ] Gamification avancée

### V3

* [ ] Recommandations intelligentes
* [ ] Personnalisation des parcours

---

## ⚠️ Statut du projet

Ce projet est actuellement en développement dans un cadre académique.
Toute utilisation ou reproduction est interdite sans autorisation.

---

## 📄 Licence

Ce projet est propriétaire. Tous droits réservés.
Aucune utilisation, reproduction ou distribution de ce code n’est autorisée sans permission explicite.

---

## 👩‍💻 Auteur

Projet développé par Edwige Saves, étudiante en développement web et anciennement diététicienne, passionnée par l’edtech et la nutrition.

---

## 💡 Vision

Créer une plateforme moderne qui transforme l’apprentissage de la diététique en une expérience **interactive, engageante et collaborative**.
