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
    stage('Build and Rename Docker Image') {
            steps {
                // Utiliser un conteneur Docker pour construire et renommer l'image
                script {
                    // Construire l'image Docker (ajustez la commande selon vos besoins)
                    bat 'docker build -t nahladhouibi/securite:%BUILD_ID% .'
                      // Install dependencies and run tests
                    bat 'npm install'
                  

                    // Renommer l'image Docker
                    bat "docker tag nahladhouibi/securite:%BUILD_ID% nahladhouibi/securite:latest"
                }
            }
        }
        

       stage('SonarQube Analysis') {
    steps {
        // Run SonarQube analysis
        withSonarQubeEnv('sonarquabe') {
            bat '"C:\\Program Files\\sonar-scanner-5.0.1.3006-windows\\bin\\sonar-scanner.bat"'
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
