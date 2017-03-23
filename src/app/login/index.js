/**
 * Created by victor on 2016/12/20.
 */
import LoginCtrl from './loginCtrl';
import LoginService from './loginService';
export default angular.module('app.login', [])
  .config(function ($stateProvider) {
    $stateProvider.state('login', {
      url: '/',
      templateUrl: 'template/login/index.html',
      controller: 'LoginCtrl'
    });
  })
  .controller('LoginCtrl', LoginCtrl)
  .factory('$loginService', LoginService)
