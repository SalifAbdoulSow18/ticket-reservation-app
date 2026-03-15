pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'sasow/ticket-reservation-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        // 👇 On récupère le password depuis les credentials
        DOCKER_PASSWORD = credentials('docker-hub-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Application') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh """
                    export PATH=\$PATH:/opt/homebrew/bin
                    docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                    docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                """
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                sh """
                    export PATH=\$PATH:/opt/homebrew/bin
                    
                    # Login avec password-stdin (sécurisé)
                    echo "${DOCKER_PASSWORD}" | docker login -u sasow --password-stdin
                    
                    # Push des images
                    docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    docker push ${DOCKER_IMAGE}:latest
                    
                    # Logout (bonne pratique)
                    docker logout
                """
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline terminée avec succès !'
        }
        failure {
            echo '❌ La pipeline a échoué.'
        }
    }
}