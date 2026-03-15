pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'sasow/ticket-reservation-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_PASSWORD = credentials('docker-hub-credentials')
    }
    
    triggers {
        pollSCM('')
    }
    
    // UN SEUL BLOC stages !
    stages {
        stage('Check if triggered by Jenkins') {
            when {
                expression {
                    sh(script: 'git log -1 --pretty=%B | grep -q "\\[skip ci\\]"', returnStatus: true) != 0
                }
            }
            steps {
                echo "Build déclenché par un vrai commit"
            }
        }
        
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
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
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
                        git pull --rebase origin main
                        sed -i.bak "s/\\(image:.*:\\)[0-9]*/\\1${BUILD_NUMBER}/" k8s/deployment.yaml
                        rm -f k8s/deployment.yaml.bak
                        git add k8s/deployment.yaml
                        git commit -m "chore: update image tag to ${BUILD_NUMBER} [skip ci]"
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