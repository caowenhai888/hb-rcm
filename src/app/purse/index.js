import  purseService from './purseService'
import  purseCtrl from './purseCtrl'

export default angular.module('app.purse', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('purse', {
        url: '/purse',
        templateUrl: 'template/purse/index.html',
        controller: 'purseCtrl'
      })
  })
  .controller('purseCtrl', purseCtrl)
  .factory('$purseService', purseService)
  .filter('purseTypeFilter', () => {
    return (status) => {
      let statusText = '';
      switch (status) {
        case 1:
          statusText = "提现到微信";
          break;
        case 2:
          statusText = "充值";
          break;
        case 3:
          statusText = "发红包";
          break;
        case 4:
          statusText = "抢红包";
          break;
        case 5:
          statusText = "购物";
          break;
        case 6:
          statusText = "退款";
          break;
        default:
          statusText = "--"
      }
      return statusText;
    }
  })
