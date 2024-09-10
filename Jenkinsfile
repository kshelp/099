pipeline {
  agent any
  stages {
    stage('git scm update') {
      steps {
        git url: 'https://github.com/kshelp/099', branch: 'master'
      }
    }
    stage('docker build and push') {
      steps {
        sh '''
        docker build --no-cache -t 192.168.1.10:8443/react-app .
        docker push 192.168.1.10:8443/react-app
        '''
      }
    }
    stage('deploy kubernetes') {
      steps {
        sh '''
        kubectl delete service react-app
        kubectl delete deployment react-app
        kubectl create deployment react-app --image=192.168.1.10:8443/react-app --replicas=2
        kubectl expose deployment react-app --type=LoadBalancer --port=80 \
                                               --target-port=80 --name=react-app
        '''
      }
      
    }
  }
}