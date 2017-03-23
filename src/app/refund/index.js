import  refundService from './refundService'
import  refundCtrl from './refundCtrl'

export default angular.module('app.refund', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('refund', {
        url: '/refund',
        templateUrl: 'template/refund/index.html',
        controller: 'refundCtrl'
      })
  })
  .controller('refundCtrl', refundCtrl)
  .factory('$refundService', refundService)

