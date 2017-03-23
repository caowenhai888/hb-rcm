import  receivedService from './receivedService'
import  receivedCtrl from './receivedCtrl'

export default angular.module('app.received', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('received', {
        url: '/received',
        templateUrl: 'template/received/index.html',
        controller: 'receivedCtrl'
      })
  })
  .controller('receivedCtrl', receivedCtrl)
  .factory('$receivedService', receivedService)

