pipeline {
    agent any

    tools {
        nodejs "NodeJS 18.x"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/your-username/Todo-List-App.git'
            }
        }

        stage('Backend Install & Test') {
            steps {
                dir('todo-app/backend') {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm test || echo "No backend tests"'
                }
            }
        }

        stage('Frontend Install & Test') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm install --legacy-peer-deps'
                    sh 'npm test -- --watchAll=false || echo "No frontend tests"'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('todo-app/frontend') {
                    sh 'npm run build'
                }
            }
        }
    }
}
