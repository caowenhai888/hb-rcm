//js
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import material from 'angular-material';
import aria from 'angular-aria';
import animate from 'angular-animate';
import cookies from 'angular-cookies';
import mdDataTable from 'angular-material-data-table';
import loadingBar from 'angular-loading-bar';
import purse from './purse';
import analyze from './analyze';
import send from './send';
import received from './received';
import refund from './refund';
import withdrawConfig from './withdrawConfig';
import withdraw from './withdraw';
import userConfig from './userConfig';
import common from './common';
import nav from './nav';
import login from './login';

//style
import '../style/main.scss';
import 'angular-material/angular-material.css'
import 'angular-material-data-table/dist/md-data-table.css'

//inject
const MODULE_NAME = 'app';
angular.module(MODULE_NAME, [
  'ui.router',
  'ngMaterial',
  'ngAria',
  'ngCookies',
  'ngAnimate',
  'md.data.table',
  'angular-loading-bar',
  'app.withdrawConfig',
  'app.withdraw',
  'app.common',
  'app.purse',
  'app.send',
  'app.received',
  'app.analyze',
  'app.refund',
  'app.nav',
  'app.userConfig',
  'app.login'
]).config(($httpProvider, $urlRouterProvider) => {
    $httpProvider.defaults.withCredentials = true;
    $urlRouterProvider.when('', '/purse');
    $httpProvider.interceptors.push(($q, $rootScope) => {
      return {
        'responseError': function (response) {
          if (response.data.code >= 10001 && response.data.code <= 10010) {
            $rootScope.$broadcast('unauthorized');
          }
          return $q.reject(response);
        }
      };
    });
  }
).run(function ($rootScope, $state, $loginService, $cookies, $location) {
  // $cookies.put('snowx_crm_token', 'res.data.data');
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    const token = $cookies.get('token_local');
    if (!token && toState.name !== "login") {
      $state.go("login");
      event.preventDefault();
    }
    return;
  });
});

export default MODULE_NAME;

