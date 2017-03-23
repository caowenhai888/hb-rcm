import moment from 'moment';
export default ($scope, $withdrawConfigService, $mdDialog, $mdToast) => {

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
    $withdrawConfigService.getConfigList($scope.searchOptions).then((res) => {
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

  $scope.updateConfig = (updateInfo) => {
    if (Object.values(updateInfo).filter(item => !item.toString()).length > 0) {
      $mdToast.show($mdToast.simple().textContent('数据不完整'));
    }
    if (updateInfo.monthWithdrawAmount) {
      updateInfo.monthWithdrawAmount *= 100;
    }
    if (updateInfo.dayWithdrawAmount) {
      updateInfo.dayWithdrawAmount *= 100;
    }
    $scope.isLoading = true;
    $withdrawConfigService.updateConfig(updateInfo).then((res) => {
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
      templateUrl: 'template/dialog/withdraw.config.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true
    }).then(createData => {
      $scope.isLoading = true;
      if (createData.monthWithdrawAmount) {
        createData.monthWithdrawAmount *= 100;
      }
      if (createData.dayWithdrawAmount) {
        createData.dayWithdrawAmount *= 100;
      }
      $withdrawConfigService.createConfig(createData).then((res) => {
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
      templateUrl: 'template/dialog/withdraw.config.tmpl.html',
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      locals: {
        data: data
      }
    }).then(updateData => {
      updateData.businessConfigId = data.businessConfigId;
      $scope.updateConfig(updateData);
    }, () => {
    });
  };

  $scope.disableConfig = (data) => {
    $scope.updateConfig({ businessConfigId: data.businessConfigId, enable: data.enable ? 0 : 1 });
  };

  function updateDialogController($scope, $mdDialog, data) {
    $scope.updateData = {
      configProject: data.configProject,
      monthWithdrawNum: data.monthWithdrawNum,
      monthWithdrawAmount: data.monthWithdrawAmount / 100,
      dayWithdrawNum: data.dayWithdrawNum,
      dayWithdrawAmount: data.dayWithdrawAmount / 100
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
      configProject: '',
      monthWithdrawNum: '',
      monthWithdrawAmount: '',
      dayWithdrawNum: '',
      dayWithdrawAmount: ''
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
