import navCtrl from './navCtrl';
export default angular.module('app.nav', [])
  .config(function ($stateProvider) {
    $stateProvider.state('nav', {
      url: '/',
      templateUrl: 'template/nav/nav.html',
      controller: 'navCtrl'
    });
  })
  .controller('navCtrl', navCtrl);
