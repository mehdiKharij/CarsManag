pipeline {
    agent any
    environment {
        // Définir les variables d'environnement pour EC2 et la clé SSH
        EC2_USER = 'ec2-user'
        EC2_HOST = '13.60.191.174' // Remplace par l'adresse IP de ton instance EC2
        SSH_KEY_PATH = 'C:/users/user/eu-west-1.pem' // Chemin vers ta clé privée
        DEPLOY_DIR = '/home/ec2-user/app' // Répertoire où tu veux déployer sur EC2
    }
    stages {
        stage('Clone Repository') {
            steps {
                script
                    sh 'docker-compose -f docker-compose.yml build'
                }
            }
        }

        stage('Push Docker Images to EC2') {
            steps {
                script {
                    // Copier la clé SSH privée pour l'authentification
                    sh "chmod 400 ${SSH_KEY_PATH}"  // Assurer que les permissions de la clé SSH sont correctes
                    
                    // Copier le fichier docker-compose sur le serveur EC2
                    sh "scp -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no docker-compose.yml ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}"

                    // Copier les fichiers nécessaires pour le déploiement sur EC2
                    sh "scp -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ./frontend ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}"
                    sh "scp -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ./backend ${EC2_USER}@${EC2_HOST}:${DEPLOY_DIR}"

                    // SSH dans l'instance EC2 et démarrer le conteneur Docker
                    sh """
                        ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} <<EOF
                        cd ${DEPLOY_DIR}
                        docker-compose down
                        docker-compose up -d --build
                        EOF
                    """
                }
            }
        }

        stage('Verify Deployment') {
            steps {
                script {
                    // Vérifier si les services sont bien démarrés
                    sh "ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} 'docker ps'"
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
