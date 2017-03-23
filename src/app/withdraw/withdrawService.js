export default (CONFIG, $http) => {
  return {
    generatePostHttp(url, params){
      return $http({
        method: 'POST',
        url,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: params
      })
    },
    updateStatus(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/userWithdraw/accept', searchParams)
    },
    getWithdrawList(searchParams){
      return $http.get(CONFIG.BASE_API + '/hb/userWithdraw/list', {
        params: searchParams
      })
    },
  };
};
