pipeline {
    agent any

    environment {
        DOCKER_PATH = "C:\\Programmes\\Docker\\cli-plugins"
        PATH = "${DOCKER_PATH}:${PATH}"
       
        NODEJS_PATH = "C:\\Programmes (x86)\\nodejs"
        SONAR_SCANNER_HOME = "C:\\Program Files\\sonar-scanner-5.0.1.3006-windows"
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }
         stage('SonarQube Analysis') {
            steps {
                // Exécuter l'analyse SonarQube
                withSonarQubeEnv('sonarquabe') {
                    bat '"C:\\Program Files\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner" -Dsonar.projectKey=microservices-security'
                }
            }
        }
        stage('Build and Rename Docker Image') {
            steps {
                script {
                    // Construire l'image Docker (ajustez la commande selon vos besoins)
                    bat 'docker build -t nahladhouibi/securite:%BUILD_ID% .'
                    // Installer les dépendances et exécuter les tests
                    bat 'npm install'

                    // Renommer l'image Docker
                    bat "docker tag nahladhouibi/securite:%BUILD_ID% nahladhouibi/securite:latest"
                }
            }
        }
       
    }
}
