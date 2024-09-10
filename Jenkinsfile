pipeline {
  agent any
  stages {
    stage('git pull') {
      steps {
        git url: 'https://github.com/kshelp/099', branch: 'master'
      }
    }
    stage('Build') {
      steps {
        sh 'docker build --no-cache -t react-app .'
        sh 'docker tag react-app 192.168.1.10:8443/react-app'
        sh 'docker push 192.168.1.10:8443/react-app'
      }
    }
    stage('k8s deploy'){
      steps {
        kubernetesDeploy(kubeconfigId: 'kubeconfig',
                         configs: '*.yaml')
      }
    }
  }
}
