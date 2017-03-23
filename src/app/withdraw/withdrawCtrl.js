import constant from '../constant';
import moment from 'moment';
export default ($scope, $withdrawService, $mdDialog, $mdToast) => {

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
  $scope.withdrawSource = constant.withdrawSource;
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
    $withdrawService.getWithdrawList(copyForm).then((res) => {
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
  $scope.clear = () => {
    $scope.searchOptions = {
      page: 1,
      count: 10,
      search_startTime: moment().subtract(30, 'days').toDate(),
      search_endTime: moment().toDate()
    };
    $scope.getPageData();
  };

  $scope.showUpdateDialog = (data) => {
    const confirm = $mdDialog.confirm()
      .title('确定受理？')
      .ok('确认操作')
      .cancel('取消');
    $scope.showConfirm(confirm, () => {
      $withdrawService.updateStatus({ id: data }).then((res) => {
        if (res.data.code === 0) {
          $scope.getPageData()
        } else {
          $mdToast.show($mdToast.simple().textContent(res.data.msg));
        }
      }, (err) => {
        $mdToast.show($mdToast.simple().textContent(err.msg || '操作失败！'))
      })
    })
  };

  $scope.showConfirm = (confirm, callback) => {
    $mdDialog.show(confirm).then(() => {
      callback();
    }, () => {
      $mdToast.show($mdToast.simple().textContent('取消操作'));
    });
  };

  $scope.getPageData();
};
