import  withdrawConfigService from './withdrawConfigService'
import  withdrawConfigCtrl from './withdrawConfigCtrl'

export default angular.module('app.withdrawConfig', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('withdrawConfig', {
        url: '/withdrawConfig',
        templateUrl: 'template/withdrawConfig/index.html',
        controller: 'withdrawConfigCtrl'
      })
  })
  .controller('withdrawConfigCtrl', withdrawConfigCtrl)
  .factory('$withdrawConfigService', withdrawConfigService)

