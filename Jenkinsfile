pipeline {
    agent any
    environment {
        EC2_IP = '16.170.169.33'  // Remplace par l'adresse IP de ton instance EC2
        SSH_KEY_PATH = '/path/to/your/private-key.pem' // Remplace par le chemin de ta clé SSH privée
        SSH_USER = 'ec2-user'  // Remplace par l'utilisateur de ton instance EC2
    }
    stages {
        stage('Checkout Code') {
            steps {
                // Cloner le projet à partir du dépôt Git
                git branch: 'main', url: 'https://github.com/mehdiKharij/Devops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    // Construire les images Docker pour le frontend et le backend
                    echo 'Building Docker images...'
                    sh 'docker-compose build'
                }
            }
        }

        stage('Copy to EC2 and Deploy') {
            steps {
                script {
                    // Copier les fichiers vers l'instance EC2
                    echo 'Copying files to EC2...'
                    sh """
                        scp -i ${SSH_KEY_PATH} -r . ${SSH_USER}@${EC2_IP}:/home/${SSH_USER}/app
                    """
                }
            }
        }

        stage('Deploy on EC2') {
            steps {
                script {
                    // Connecter à l'instance EC2 et redémarrer Docker Compose
                    echo 'Deploying application on EC2...'
                    sh """
                        ssh -i ${SSH_KEY_PATH} ${SSH_USER}@${EC2_IP} '
                            cd /home/${SSH_USER}/app &&
                            docker-compose down &&
                            docker-compose up -d
                        '
                    """
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}
