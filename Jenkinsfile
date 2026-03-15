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
                withCredentials([usernamePassword(
                    credentialsId: 'docker-hub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        export PATH=$PATH:/opt/homebrew/bin
                        echo "Test de connexion avec le token..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        echo "Connexion réussie."
                        docker push sasow/ticket-reservation-app:${BUILD_NUMBER}
                        docker push sasow/ticket-reservation-app:latest
                    '''
                }
            }
        }

        stage('Update Kubernetes Manifests') {
            steps {
                withCredentials([gitUsernamePassword(credentialsId: 'github-credentials')]) {
                    sh '''
                        # Se synchroniser d'abord
                        git pull --rebase origin main
                        
                        # Modifier le manifest
                        sed -i.bak "s|image:.*|        image: sasow/ticket-reservation-app:${BUILD_NUMBER}|" k8s/deployment.yaml
                        
                        # Commit avec [skip ci] (obligatoire !)
                        git add k8s/deployment.yaml
                        git commit -m "chore(deploy): update image to ${BUILD_NUMBER} [skip ci]"
                        
                        # Push
                        git push origin HEAD:main
                    '''
                }
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