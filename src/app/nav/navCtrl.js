export default ($scope, $rootScope, $cookies, $state, $loginService) => {
  $scope.hideNav = false;
  $rootScope.$on('$stateChangeStart', (event, toState, fromState) => {
    const token = $cookies.get('token_local');
    if (token) {
      $scope.hideNav = false;
    } else {
      if (toState.name !== "login") {
        $state.go("login");
        $scope.hideNav = true;
        event.preventDefault();
      }
    }
  });
  $scope.logout = () => {
    $loginService.logout().then(() => {
      $cookies.remove('token_local');
      $state.go('login');
    });
  };
  $scope.menu = [
    {
      label: '零钱交易记录',
      url: '#/purse',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '提现设置',
      url: '#/withdrawConfig',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '提现管理',
      url: '#/withdraw',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '发红包记录',
      url: '#/send',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '收红包记录',
      url: '#/received',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '退还红包记录',
      url: '#/refund',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '红包统计',
      url: '#/analyze',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }, {
      label: '用户管理',
      url: '#/userConfig',
      main: true,
      iconClasses: 'fa fa-apple',
      children: []
    }
  ];
  $scope.toggleSection = function (item, index) {
    var golItem, i, j, len, len1, ref, ref1;
    if (item.main === true && item.children.length > 0) {
      ref = $scope.menu;
      for (i = 0, len = ref.length; i < len; i++) {
        golItem = ref[i];
        if (item !== golItem) {
          golItem.toggled = false;
        }
      }
      return item.toggled = !item.toggled;
    } else if (item.main === true && !item.children.length > 0) {
      ref1 = $scope.menu;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        golItem = ref1[j];
        if (item !== golItem) {
          golItem.toggled = false;
        }
      }
      item.toggled = !item.toggled;
      $scope.resetActive($scope.menu);
      return item.active = true;
    } else {
      $scope.resetActive($scope.menu);
      return item.active = true;
    }
  };
  $scope.resetActive = function (menu) {
    var i, item, len, results;
    results = [];
    for (i = 0, len = menu.length; i < len; i++) {
      item = menu[i];
      if (item.active === true) {
        item.active = false;
      }
      if (item.children) {
        results.push($scope.resetActive(item.children));
      } else {
        results.push(void 0);
      }
    }
    return results;
  };
};
