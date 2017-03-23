/**
 * Created by victor on 2016/12/20.
 */
export default ($scope, $loginService, $mdDialog, $mdToast, $cookies, $state, $rootScope) => {
  $scope.user = {};
  $scope.login = () => {
    if (!$scope.user.username || !$scope.user.password) {
      return;
    }
    $loginService.login($scope.user).then(res => {
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);
      if (res.data.code === 0) {
        $cookies.put('token_local', res.data.data.token, {
          expires: expireDate,
        });
        $state.go('purse');
      } else {
        $mdToast.show($mdToast.simple().textContent(res.data.msg || '登录失败！'));
      }
    }, (err) => {
      $mdToast.show($mdToast.simple().textContent('登录失败！'));
    });
  };
  $rootScope.$on('unauthorized', function () {
    $cookies.remove('token_local');
    $state.go('login');
  });
};
