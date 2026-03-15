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
                        # Afficher l'état avant modification
                        echo "=== AVANT MODIFICATION ==="
                        cat k8s/deployment.yaml | grep image
                        
                        # Version compatible macOS/Linux pour sed
                        # On utilise sed -i.bak (crée un backup) puis on le supprime
                        sed -i.bak "s|image:.*|image: sasow/ticket-reservation-app:${BUILD_NUMBER}|" k8s/deployment.yaml
                        rm -f k8s/deployment.yaml.bak
                        
                        # Afficher l'état après modification
                        echo "=== APRÈS MODIFICATION ==="
                        cat k8s/deployment.yaml | grep image
                        
                        # Configurer Git
                        git config user.email "jenkins@local.host"
                        git config user.name "Jenkins CI"
                        
                        # Commit et push
                        git add k8s/deployment.yaml
                        git commit -m "chore(deploy): update image to ${BUILD_NUMBER}"
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