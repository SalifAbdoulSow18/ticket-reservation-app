<div align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=667EEA&center=true&vCenter=true&width=435&lines=%F0%9F%8E%9F%EF%B8%8F+Ticket+Reservation;%F0%9F%87%B8%F0%9F%87%B3+Made+in+Senegal;%F0%9F%91%A8%F0%9F%8F%BD%E2%80%8D%F0%9F%92%BB+by+Salif" alt="Typing SVG" />
</div>

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


# 🎟️ TICKET RESERVATION APP - GUIDE COMPLET

## 📋 Table des matières
1. [Création du projet Vue.js](#1-création-du-projet-vuejs)
2. [Dockerisation](#2-dockerisation)
3. [Jenkins & CI/CD](#3-jenkins--cicd)
4. [Kubernetes](#4-kubernetes)
5. [ArgoCD](#5-argocd)
6. [Commandes de vérification](#6-commandes-de-vérification)
7. [Dépannage](#7-dépannage)

---
📚 README - GUIDE COMPLET DU PROJET

## 1. CRÉATION DU PROJET VUE.JS

```bash
# 1.1 Créer le projet
npm create vue@latest ticket-reservation-app
cd ticket-reservation-app

# 1.2 Installer les dépendances
npm install
npm install pinia @vueuse/core

# 1.3 Lancer en développement
npm run dev
# Accès : http://localhost:5173

# 1.4 Build pour production
npm run build
# Les fichiers sont générés dans /dist

## 2. DOCKERISATION
- Dockerfile
- nginx.conf

## 3. JENKINS & CI/CD
  ------
  3.1 Installation Jenkins (macOS)

  # 3.1.1 Installation avec Homebrew
  brew install jenkins-lts
  brew services start jenkins-lts

  # 3.1.2 Accès
  open http://localhost:8080
  # Récupérer le mot de passe :
  cat ~/.jenkins/secrets/initialAdminPassword

  # 3.1.3 Configurer le PATH pour Docker
  sudo nano /opt/homebrew/opt/jenkins-lts/homebrew.mxcl.jenkins-lts.plist

  brew services restart jenkins-lts
  
  ------
  3.2 Plugins Jenkins nécessaires
    Git

    NodeJS

    Docker Pipeline

    Pipeline Stage View

    GitHub Integration

  ------
  3.3 Credentials Jenkins

    # GitHub
    Type: Username with password
    Username: votre-username
    Password: [GitHub Personal Access Token]
    ID: github-credentials

    # Docker Hub
    Type: Username with password  
    Username: votre-username
    Password: [Docker Hub Access Token]
    ID: docker-hub-credentials

  ------
  3.4 Jenkinsfile complet

  ------
  3.5 Configuration Webhook GitHub
    GitHub → Repository → Settings → Webhooks → Add webhook

    Payload URL: http://[VOTRE_IP]:8080/github-webhook/

    Content type: application/json

    Events: "Just the push event"

    Active: ✅

------
  4. KUBERNETES
  4.1 Installation Minikube (macOS)  

    # 4.1.1 Installer Minikube
    brew install minikube kubectl

    # 4.1.2 Démarrer le cluster
    minikube start --cpus=4 --memory=4096 --driver=docker

    # 4.1.3 Vérifier
    kubectl get nodes
    minikube status

  4.2 Manifests Kubernetes
    k8s/namespace.yaml
    k8s/deployment.yaml
    k8s/service.yaml

  4.3 Déploiement manuel

    # 4.3.1 Appliquer les manifests
    kubectl apply -f k8s/namespace.yaml
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml

    # 4.3.2 Vérifier
    kubectl get pods -n ticket-reservation -w
    kubectl get svc -n ticket-reservation

    # 4.3.3 Exposer l'application
    kubectl port-forward svc/ticket-reservation-service -n ticket-reservation 8082:80
    open http://localhost:8082

  5. ARGOCD
    5.1 Installation ArgoCD
    # 5.1.1 Créer le namespace et installer
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

    # 5.1.2 Attendre que les pods soient prêts
    kubectl wait --for=condition=Ready pods --all -n argocd --timeout=300s
    kubectl get pods -n argocd

    # 5.1.3 Exposer ArgoCD
    kubectl port-forward svc/argocd-server -n argocd 8081:443 &
    # Accès : https://localhost:8081

    # 5.1.4 Récupérer le mot de passe admin
    kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
  
    5.2 Installer la CLI ArgoCD

    brew install argocd
    argocd login localhost:8081 --insecure
    # Username: admin
    # Password: [mot de passe récupéré]

    5.3 Déclarer l'application
    argocd-application.yaml
    kubectl apply -f argocd-application.yaml
    # Lister les applications
    argocd app list

    # Synchroniser
    argocd app sync ticket-reservation-app

    # Voir les détails
    argocd app get ticket-reservation-app

  6. COMMANDES DE VÉRIFICATION
    6.1 Kubernetes
    # Pods
    kubectl get pods -n ticket-reservation
    kubectl get pods -n ticket-reservation -w
    kubectl get pods -n ticket-reservation -o wide

    # Logs
    kubectl logs -n ticket-reservation -l app=ticket-reservation-app --tail=50
    kubectl logs -n ticket-reservation -l app=ticket-reservation-app -f

    # Services
    kubectl get svc -n ticket-reservation
    kubectl describe svc -n ticket-reservation ticket-reservation-service

    # Événements
    kubectl get events -n ticket-reservation --sort-by='.lastTimestamp'

    6.2 ArgoCD

    # État de l'application
    argocd app get ticket-reservation-app
    argocd app get ticket-reservation-app -w

    # Historique
    argocd app history ticket-reservation-app

    # Logs des composants ArgoCD
    kubectl logs -n argocd -l app.kubernetes.io/name=argocd-server --tail=50
    kubectl logs -n argocd -l app.kubernetes.io/name=argocd-repo-server --tail=50

    6.3 Tester l'application

    # Exposer l'application
    kubectl port-forward svc/ticket-reservation-service -n ticket-reservation 8082:80

    # Dans le navigateur
    open http://localhost:8082

  7. DÉPANNAGE
    7.1 Problèmes courants
      Problème	Solution
      CrashLoopBackOff	Vérifier les logs : kubectl logs -n ticket-reservation [POD]
      ImagePullBackOff	Vérifier l'image sur Docker Hub et les credentials
      docker: command not found	Configurer le PATH dans Jenkins
      Boucle infinie Jenkins	Ajouter [skip ci] dans les commits Jenkins
      ArgoCD ne sync pas	Vérifier le projet : argocd proj list

    7.2 Redémarrages utiles
      # Redémarrer les pods
      kubectl rollout restart deployment -n ticket-reservation ticket-reservation-app

      # Revenir en arrière
      kubectl rollout undo deployment -n ticket-reservation ticket-reservation-app

      # Redémarrer Jenkins
      brew services restart jenkins-lts