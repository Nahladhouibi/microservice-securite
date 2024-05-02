pipeline {
    agent any

    environment {
        DOCKER_HOME = 'C:\\Programmes\\Docker\\docker.exe'
        SONAR_SCANNER_HOME = 'C:\\SonarScanner'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build Docker image
                    bat "${DOCKER_HOME} build -t securite:latest ."

                    // Install dependencies and run tests
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                // Run SonarQube analysis
                withSonarQubeEnv('sonarquabe') {
                    bat "${SONAR_SCANNER_HOME}\\bin\\sonar-scanner.bat"
                }
            }
        }

       // stage('Deploy') {
           // steps {
                // Push Docker image to registry or deploy to Kubernetes, etc.
                //script {
                   // docker.withRegistry('https://votre-registry.com', 'credentials-id-pour-le-registry') {
                        //docker.image('nom-de-votre-image:latest').push('latest')
                    }
                }
            //}
       // }
   // }

    post {
        always {
            // Clean up Docker resources
            cleanWs()
            docker.image('securite:latest').remove()
        }
    }
//}
