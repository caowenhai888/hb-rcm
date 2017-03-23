import  sendService from './sendService'
import  sendCtrl from './sendCtrl'

export default angular.module('app.send', ['ngMaterial'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('send', {
        url: '/send',
        templateUrl: 'template/send/index.html',
        controller: 'sendCtrl'
      })
  })
  .controller('sendCtrl', sendCtrl)
  .factory('$sendService', sendService)
  .filter('redPocketFilter', () => {
    return (status) => {
      let statusText = '';
      switch (status) {
        case 0:
          statusText = "拼手气红包";
          break;
        case 1:
          statusText = "普通红包";
          break;
        case 3:
          statusText = "私人红包";
          break;
        default:
          statusText = "--"
      }
      return statusText;
    }
  })
  .filter('statusFilter', () => {
    return (status) => {
      let statusText = '';
      switch (status) {
        case 0:
          statusText = "草稿";
          break;
        case 1:
          statusText = "未受理";
          break;
        case 2:
          statusText = "已受理";
          break;
        case 3:
          statusText = "已提现";
          break;
        default:
          statusText = "--"
      }
      return statusText;
    }
  })

