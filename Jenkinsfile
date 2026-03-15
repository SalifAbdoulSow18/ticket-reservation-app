pipeline {
    agent any
    
    options {
        skipStagesAfterUnstable()
        timeout(time: 30, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    
    environment {
        DOCKER_IMAGE = 'sasow/ticket-reservation-app'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        DOCKER_PASSWORD = credentials('docker-hub-credentials')
    }
    
    triggers {
        pollSCM('')
    }
    
    stages {
        stage('Check Commit Author') {
            steps {
                script {
                    def commitMessage = sh(
                        script: 'git log -1 --pretty=%B', 
                        returnStdout: true
                    ).trim()
                    
                    echo "Message du commit: ${commitMessage}"
                    
                    if (commitMessage.contains('[skip ci]')) {
                        currentBuild.result = 'NOT_BUILT'
                        error("⏭️ Build ignoré car le commit contient [skip ci]")
                    }
                    
                    echo "✅ Build déclenché par un vrai commit"
                }
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
                    echo "🐳 Construction de l'image Docker..."
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
                        echo "🔑 Connexion à Docker Hub..."
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        echo "📤 Push des images..."
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
                        echo "🔄 Mise à jour des manifests Kubernetes..."
                        
                        # Se synchroniser
                        git pull --rebase origin main
                        
                        # Changer UNIQUEMENT le numéro de build (indentation préservée)
                        sed -i.bak "s/\\(image:.*:\\)[0-9]*/\\1${BUILD_NUMBER}/" k8s/deployment.yaml
                        rm -f k8s/deployment.yaml.bak
                        
                        # Afficher le changement
                        echo "Nouvelle image tag: ${BUILD_NUMBER}"
                        grep image k8s/deployment.yaml
                        
                        # Commit avec [skip ci] pour éviter la boucle
                        git add k8s/deployment.yaml
                        git commit -m "chore: update image tag to ${BUILD_NUMBER} [skip ci]"
                        
                        # Push
                        git push origin HEAD:main
                        
                        echo "✅ Manifests mis à jour sur GitHub"
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline terminée avec succès !'
            echo "📦 Image: ${DOCKER_IMAGE}:${DOCKER_TAG}"
        }
        failure {
            echo '❌ La pipeline a échoué. Vérifiez les logs ci-dessus.'
        }
        aborted {
            echo '⏸️ Pipeline annulée.'
        }
        unstable {
            echo '⚠️ Pipeline instable.'
        }
    }
}