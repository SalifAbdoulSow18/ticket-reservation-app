pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-22'   // Changez ici pour correspondre au nouveau nom
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installation des dépendances...'
                sh 'npm install'
            }
        }
        
        stage('Build Application') {
            steps {
                echo '🔨 Compilation de l\'application...'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Construction de l\'image Docker...'
                sh 'docker build -t sasow/ticket-reservation-app:${BUILD_NUMBER} .'
            }
        }
    }
    
    post {
        always {
            echo '🏁 Nettoyage...'
        }
    }
}














// // =========================================
// // JENKINSFILE - Pipeline CI/CD complète
// // =========================================

// pipeline {
//     // Jenkins peut utiliser n'importe quel agent disponible
//     agent any
    
//     // =========================================
//     // VARIABLES D'ENVIRONNEMENT
//     // =========================================
//     environment {
//         // Informations Docker
//         DOCKER_REGISTRY = 'docker.io'
//         DOCKER_IMAGE = 'sasow/ticket-reservation-app'  // CHANGEZ ICI
//         DOCKER_TAG = "${env.BUILD_NUMBER}"
        
//         // Informations Git
//         GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
//         GIT_BRANCH = "main"
        
//         // Credentials (définis dans Jenkins)
//         DOCKER_CREDENTIALS = 'docker-hub-credentials'
//         GITHUB_CREDENTIALS = 'github-credentials'
//     }
    
//     // =========================================
//     // TRIGGERS - Comment Jenkins est déclenché
//     // =========================================
//     // triggers {
//     //     // Déclenchement automatique quand on push sur main
//     //     pollSCM('* * * * *')  // Vérifie toutes les minutes
//     //     // Alternative: utiliser webhook GitHub (voir configuration plus bas)
//     // }

//     tools {
//         nodejs 'NodeJS-25'
//     }
    
//     // =========================================
//     // ÉTAPES DE LA PIPELINE
//     // =========================================
//     stages {
//         // ÉTAPE 1: Récupération du code depuis GitHub
//         stage('Checkout') {
//             steps {
//                 echo '📦 Récupération du code depuis GitHub...'
//                 checkout scm
                
//                 // Afficher les infos pour debug
//                 sh '''
//                     echo "Branch: ${GIT_BRANCH}"
//                     echo "Commit: ${GIT_COMMIT}"
//                     ls -la
//                 '''
//             }
//         }
        
//         // ÉTAPE 2: Installation des dépendances Node.js
//         stage('Install Dependencies') {
//             steps {
//                 echo '📦 Installation des dépendances...'
//                 sh 'npm install'
//             }
//         }
        
//         // ÉTAPE 5: Build de l'application Vue.js
//         stage('Build Application') {
//             steps {
//                 echo '🔨 Compilation de l\'application...'
//                 sh 'npm run build'
                
//                 // Vérifier que le build a fonctionné
//                 sh 'ls -la dist/'
//             }
//         }
        
//         // ÉTAPE 6: Build de l'image Docker
//         stage('Build Docker Image') {
//             steps {
//                 echo '🐳 Construction de l\'image Docker...'
//                 script {
//                     // Construire l'image avec le tag du build
//                     docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                    
//                     // Tagguer aussi en 'latest'
//                     sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
//                 }
//             }
//         }
        
//         // ÉTAPE 7: Push de l'image sur Docker Hub
//         stage('Push to Docker Hub') {
//             steps {
//                 echo '📤 Push de l\'image sur Docker Hub...'
//                 script {
//                     // Utiliser les credentials Docker configurés dans Jenkins
//                     docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS) {
//                         // Push avec le tag du build
//                         docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        
//                         // Push avec le tag 'latest'
//                         docker.image("${DOCKER_IMAGE}:latest").push()
//                     }
//                 }
//             }
//         }
        
//         // ÉTAPE 8: Mise à jour des manifests Kubernetes pour ArgoCD
//         stage('Update K8s Manifests') {
//             steps {
//                 echo '📝 Mise à jour des manifests Kubernetes...'
//                 script {
//                     // Modifier le fichier deployment.yaml avec la nouvelle image
//                     sh """
//                         sed -i 's|image: .*|image: ${DOCKER_IMAGE}:${DOCKER_TAG}|' k8s/deployment.yaml
//                         cat k8s/deployment.yaml | grep image
//                     """
                    
//                     // Configurer Git pour le commit
//                     sh '''
//                         git config user.email "jenkins@votre-domaine.sn"
//                         git config user.name "Jenkins CI"
//                     '''
                    
//                     // Commit et push des changements
//                     sh '''
//                         git add k8s/deployment.yaml
//                         git commit -m "chore(deploy): update image to ${DOCKER_TAG} [skip ci]"
//                         git push https://${GITHUB_CREDENTIALS}@github.com/votre-username/ticket-reservation-app.git HEAD:main
//                     '''
//                 }
//             }
//         }
        
//         // ÉTAPE 9: Vérification du déploiement (optionnel)
//         stage('Verify Deployment') {
//             steps {
//                 echo '✅ Vérification du déploiement...'
//                 // Vous pouvez ajouter des appels HTTP pour vérifier que l'app répond
//                 // sh 'curl -f http://ticket-reservation.votre-domaine.sn || exit 1'
//             }
//         }
//     }
    
//     // =========================================
//     // POST-BUILD ACTIONS
//     // =========================================
//     post {
//         // En cas de succès
//         success {
//             echo '🎉 Pipeline exécutée avec succès !'
            
//             // Envoyer une notification (optionnel)
//             // slackSend(
//             //     color: 'good',
//             //     message: "✅ Build ${env.BUILD_NUMBER} réussi ! Image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
//             // )
            
//             // Envoyer un email (optionnel)
//             // emailext(
//             //     to: 'equipe@votre-domaine.sn',
//             //     subject: "✅ Build réussi: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
//             //     body: "Le build est terminé avec succès.\nImage: ${DOCKER_IMAGE}:${DOCKER_TAG}"
//             // )
//         }
        
//         // En cas d'échec
//         failure {
//             echo '❌ La pipeline a échoué !'
            
//             // Notifications d'échec
//             // slackSend(
//             //     color: 'danger',
//             //     message: "❌ Build ${env.BUILD_NUMBER} échoué !"
//             // )
//         }
        
//         // En cas de changement de statut
//         changed {
//             echo '🔄 Le statut de la pipeline a changé'
//         }
        
//         // Toujours exécuté à la fin
//         always {
//             echo '🏁 Nettoyage...'
//             // Nettoyer les images Docker anciennes (optionnel)
//             // sh 'docker system prune -f'
//         }
//     }
// }