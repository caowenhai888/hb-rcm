import  withdrawService from './withdrawService'
import  withdrawCtrl from './withdrawCtrl'

export default angular.module('app.withdraw', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('withdraw', {
        url: '/withdraw',
        templateUrl: 'template/withdraw/index.html',
        controller: 'withdrawCtrl'
      })
  })
  .controller('withdrawCtrl', withdrawCtrl)
  .factory('$withdrawService', withdrawService)

