import moment from 'moment';
export default ($scope, $userConfigService, $mdDialog, $mdToast) => {

  $scope.pageData = {
    totalElements: 0,
    list: []
  };
  $scope.searchOptions = {
    page: 1,
    count: 10,
    search_startTime: moment().subtract(30, 'days').toDate(),
    search_endTime: moment().toDate()
  };

  $scope.getPageData = () => {
    $scope.isLoading = true;
    let copyForm = Object.assign({}, $scope.searchOptions);
    for (let [key,value] of Object.entries(copyForm)) {
      if (!value) {
        delete copyForm[key];
      }
    }
    if (copyForm.search_startTime) {
      copyForm.search_startTime = moment(copyForm.search_startTime).format('YYYY-MM-DD');
    }
    if (copyForm.search_endTime) {
      copyForm.search_endTime = moment(copyForm.search_endTime).format('YYYY-MM-DD');
    }
    $userConfigService.getUserList($scope.searchOptions).then((res) => {
      $scope.isLoading = false;
      if (res.data.code === 0) {
        $scope.pageData = {
          totalElements: res.data.data.page.totalElements,
          list: res.data.data.page.content
        }
      } else {
        $mdToast.show($mdToast.simple().textContent(res.data.msg));
      }
    })
  };

  $scope.updateUser = (updateInfo) => {
    if (Object.values(updateInfo).filter(item => !item.toString()).length > 0) {
      $mdToast.show($mdToast.simple().textContent('数据不完整'));
      return;
    }
    $scope.isLoading = true;
    $userConfigService.updateUser(updateInfo).then((res) => {
      $scope.isLoading = false;
      if (res.data.code === 0) {
        $mdToast.show($mdToast.simple().textContent('更新成功'));
      } else {
        $mdToast.show($mdToast.simple().textContent('更新失败'));
      }
      $scope.getPageData();
    })
  };

  $scope.showCreateDialog = () => {
    $mdDialog.show({
      controller: createDialogController,
      templateUrl: 'template/dialog/user.config.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true
    }).then(createData => {
      $scope.isLoading = true;
      $userConfigService.createUser(createData).then((res) => {
        $scope.isLoading = false;
        if (res.data.code === 0) {
          $mdToast.show($mdToast.simple().textContent('创建成功'));
        } else {
          $mdToast.show($mdToast.simple().textContent('创建失败'));
        }
        $scope.getPageData();
      })
    }, () => {
    });
  };

  $scope.showUpdateDialog = (data) => {
    $mdDialog.show({
      controller: updateDialogController,
      templateUrl: 'template/dialog/user.config.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        data: data
      }
    }).then(updateData => {
      updateData.id = data.id;
      $scope.updateUser(updateData);
    }, () => {
    });
  };

  $scope.disableConfig = (data) => {
    $scope.updateUser({
      id: data.id,
      loginName: data.loginName,
      name: data.name,
      status: data.status === '1' ? '0' : '1'
    });
  };

  function updateDialogController($scope, $mdDialog, data) {
    $scope.updateData = {
      loginName: data.loginName,
      plainPassword: data.plainPassword,
      name: data.name,
      status: data.status,
      email: data.email,
      mobile: data.mobile,
      phone: data.phone
    };
    $scope.hide = () => {
      $mdDialog.hide();
    };

    $scope.cancel = () => {
      $mdDialog.cancel();
    };

    $scope.submit = () => {
      if (Object.values($scope.updateData).filter(item => !item.toString()).length > 0) {
        $mdToast.show($mdToast.simple().textContent('数据不完整'));
      }
      $mdDialog.hide($scope.updateData);
    };
  }

  function createDialogController($scope, $mdDialog) {
    $scope.updateData = {
      loginName: '',
      plainPassword: '',
      name: '',
      status: '1',
      email: '',
      mobile: '',
      phone: '',
    };
    $scope.hide = () => {
      $mdDialog.hide();
    };

    $scope.cancel = () => {
      $mdDialog.cancel();
    };

    $scope.submit = () => {
      if (Object.values($scope.updateData).filter(item => !item.toString()).length > 0) {
        $mdToast.show($mdToast.simple().textContent('数据不完整'));
      }
      $mdDialog.hide($scope.updateData);
    };
  }

  $scope.getPageData();
};
