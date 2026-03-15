pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS-22'
    }
    
    environment {
        DOCKER_IMAGE = 'sasow/ticket-reservation-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_CREDENTIALS = 'docker-hub-credentials'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh """
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                """
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                script {
                    // Définir le chemin absolu de Docker
                    env.PATH = "/opt/homebrew/bin:${env.PATH}"
                    
                    docker.withRegistry("https://${DOCKER_REGISTRY}", DOCKER_CREDENTIALS) {
                        docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
                        docker.image("${DOCKER_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        // ✅ NOUVEAU STAGE : Mise à jour des manifests pour ArgoCD
        // stage('Update Kubernetes Manifests') {
        //     steps {
        //         sh """
        //             sed -i 's|image:.*|image: ${DOCKER_IMAGE}:${DOCKER_TAG}|' k8s/deployment.yaml
        //             git config user.email "jenkins@votre-domaine.sn"
        //             git config user.name "Jenkins CI"
        //             git add k8s/deployment.yaml
        //             git commit -m "chore(deploy): update image to ${DOCKER_TAG}"
        //             git push https://github.com/SalifAbdoulSow18/ticket-reservation-app.git HEAD:main
        //         """
        //     }
        // }
    }
    
    post {
        success {
            echo '🎉 Pipeline exécutée avec succès !'
        }
        failure {
            echo '❌ La pipeline a échoué !'
        }
    }
}