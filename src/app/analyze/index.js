import  analyzeService from './analyzeService'
import  analyzeCtrl from './analyzeCtrl'

export default angular.module('app.analyze', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('analyze', {
        url: '/analyze',
        templateUrl: 'template/analyze/index.html',
        controller: 'analyzeCtrl'
      })
  })
  .controller('analyzeCtrl', analyzeCtrl)
  .factory('$analyzeService', analyzeService)

