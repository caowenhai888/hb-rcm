import constant from '../constant';
import moment from 'moment';
export default ($scope, $receivedService, $mdDialog, $mdToast) => {

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
  $scope.list = constant.withdrawSource;
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
    $receivedService.getList(copyForm).then((res) => {
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

  $scope.getPageData();
};
