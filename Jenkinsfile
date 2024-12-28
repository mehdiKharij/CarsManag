pipeline {
    agent any

    environment {
        // Variables d'environnement pour l'instance EC2 et SSH
        EC2_USER = 'ec2-user'
        EC2_HOST = '51.20.31.28'  // Remplace par l'adresse IP de ton EC2
        SSH_KEY_PATH = 'C:/users/user/eu-west-1.pem' // Remplace par le chemin correct de ta clé privée
        DEPLOY_DIR = '/home/ec2-user/app' // Répertoire sur EC2 où les fichiers seront déployés
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    // Cloner le dépôt Git
                    git 'https://github.com/mehdiKharij/CarsManag.git' // Remplace par l'URL de ton dépôt Git
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Construction des images Docker pour le frontend et le backend
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Push Docker Images to Docker Hub') {
            steps {
                script {
                    // Pousser les images Docker sur Docker Hub (si nécessaire)
                    sh 'docker-compose -f docker-compose.yml push'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                script {
                    // Copier le fichier docker-compose.yml et autres fichiers nécessaires sur EC2
                    sh "scp -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no docker-compose.yml ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}"
                    
                    // Copier les dossiers frontend et backend sur EC2 si nécessaire
                    sh "scp -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ./frontend ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}"
                    sh "scp -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ./backend ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}"

                    // Connecter à EC2 et exécuter Docker Compose pour déployer les services
                    sh """
                        ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} << 'EOF'
                            cd ${DEPLOY_DIR}
                            docker-compose down
                            docker-compose pull
                            docker-compose up -d
                        EOF
                    """
                }
            }
        }
    }

    post {
        always {
            // Actions après l'exécution, comme nettoyer les ressources
            echo 'Pipeline terminé'
        }
    }
}
