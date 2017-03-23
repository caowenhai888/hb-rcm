import  userConfigService from './userConfigService'
import  userConfigCtrl from './userConfigCtrl'

export default angular.module('app.userConfig', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('userConfig', {
        url: '/userConfig',
        templateUrl: 'template/userConfig/index.html',
        controller: 'userConfigCtrl'
      })
  })
  .controller('userConfigCtrl', userConfigCtrl)
  .factory('$userConfigService', userConfigService)

