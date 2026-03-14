# 🎟️ Application de Réservation de Tickets - Sénégal

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Vue.js](https://img.shields.io/badge/Vue.js-3.x-brightgreen)
![Pinia](https://img.shields.io/badge/Pinia-2.x-yellow)
![License](https://img.shields.io/badge/license-MIT-orange)

## 📋 Table des matières
- [Aperçu du projet](#aperçu-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture](#architecture)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Composants détaillés](#composants-détaillés)
- [Gestion d'état avec Pinia](#gestion-détat-avec-pinia)
- [Adaptation pour le Sénégal](#adaptation-pour-le-sénégal)
- [Flux de réservation](#flux-de-réservation)
- [API et méthodes](#api-et-méthodes)
- [Personnalisation](#personnalisation)
- [Déploiement](#déploiement)
- [Contribuer](#contribuer)
- [Licence](#licence)

---

## 🎯 Aperçu du projet

Application web de réservation de tickets pour événements culturels et sportifs au Sénégal. Elle permet aux utilisateurs de parcourir les événements disponibles, de sélectionner des places et de réserver en ligne.

**Objectif** : Simplifier la réservation de tickets pour les événements sénégalais avec une interface moderne et adaptée au contexte local.

---

## ✨ Fonctionnalités

### Pour les utilisateurs
- ✅ **Parcourir les événements** : Liste complète des événements à venir
- ✅ **Filtres visuels** : Badges de disponibilité (vert, orange, rouge)
- ✅ **Formulaire de réservation** : Saisie des informations personnelles
- ✅ **Adaptation locale** : Préfixe +221, régions du Sénégal, FCFA
- ✅ **Calcul automatique** : Prix total mis à jour en temps réel
- ✅ **Validation** : Contrôle des champs obligatoires
- ✅ **Confirmation** : Modal avec numéro de réservation
- ✅ **Design responsive** : Mobile, tablette et desktop

### Fonctionnalités techniques
- 🚀 **Single Page Application** : Navigation fluide sans rechargement
- 📦 **Gestion d'état centralisée** : Données partagées entre composants
- 🔄 **Réactivité** : Mise à jour automatique de l'interface
- 📱 **Mobile-first** : Adapté à tous les écrans
- ♿ **Accessibilité** : Labels et messages clairs

---

## 🛠 Technologies utilisées

| Technologie | Version | Rôle |
|------------|---------|------|
| **Vue.js** | 3.x | Framework JavaScript principal |
| **Pinia** | 2.x | Gestion d'état (store) |
| **Vue Router** | 4.x | Navigation entre les pages |
| **Composition API** | - | Organisation du code moderne |
| **CSS3** | - | Styles et animations |
| **Intl API** | - | Formatage des prix et dates |
| **Vite** | 4.x | Build tool et serveur de développement |


---

## 💻 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm (inclus avec Node.js)

### Étapes d'installation

```bash
# 1. Cloner le projet
git clone https://github.com/votre-nom/ticket-reservation-app.git

# 2. Accéder au dossier
cd ticket-reservation-app

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev

# 5. Ouvrir le navigateur à l'adresse
# http://localhost:5173

npm run dev      # Lance le serveur de développement
npm run build    # Compile pour la production
npm run preview  # Prévisualise la version compilée


---

## 🏗 Architecture
ticket-reservation-app/
│
├── public/                  # Fichiers statiques
│   └── favicon.ico
│
├── src/
│   ├── assets/              # Images, fonts, etc.
│   │
│   ├── components/          # Composants réutilisables
│   │   ├── EventList.vue    # Liste des événements
│   │   ├── EventCard.vue    # Carte d'événement
│   │   ├── ReservationForm.vue # Formulaire
│   │   └── ConfirmationModal.vue # Popup de confirmation
│   │
│   ├── views/               # Pages complètes
│   │   ├── HomeView.vue     # Page d'accueil
│   │   └── ReservationView.vue # Page de réservation
│   │
│   ├── stores/              # Gestion d'état Pinia
│   │   └── ticketStore.js   # Store principal
│   │
│   ├── router/              # Configuration des routes
│   │   └── index.js
│   │
│   ├── App.vue              # Composant racine
│   └── main.js              # Point d'entrée
│
├── index.html               # Page HTML principale
├── package.json             # Dépendances et scripts
├── vite.config.js           # Configuration Vite
└── README.md                # Documentation


┌─────────────┐
│   ACCUEIL   │
│  HomeView   │
└──────┬──────┘
       │ 1. Parcourir les événements
       ▼
┌─────────────┐
│ EventList   │
│ (Grille)    │
└──────┬──────┘
       │ 2. Cliquer sur un événement
       ▼
┌─────────────┐
│ EventCard   │
│ (Détails)   │
└──────┬──────┘
       │ 3. store.selectEvent()
       ▼
┌─────────────┐
│ Reservation │
│    View     │
└──────┬──────┘
       │ 4. Afficher le formulaire
       ▼
┌─────────────┐
│ Reservation │
│    Form     │
└──────┬──────┘
       │ 5. Remplir les champs
       │ 6. Valider
       ▼
┌─────────────┐
│   store.    │
│makeReservation│
└──────┬──────┘
       │ 7. Créer la réservation
       │ 8. Mettre à jour les stocks
       ▼
┌─────────────┐
│Confirmation │
│   Modal     │
└──────┬──────┘
       │ 9. Afficher le récapitulatif
       │ 10. Retour à l'accueil
       ▼
┌─────────────┐
│   ACCUEIL   │
│    (fin)    │
└─────────────┘