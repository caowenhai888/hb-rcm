export default (CONFIG, $http) => {
  return {
    generatePostHttp(url, params){
      return $http({
        method: 'POST',
        url,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: function (obj) {
          var str = [];
          for (var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: params
      })
    },
    getList(searchParams){
      return $http.get(CONFIG.BASE_API + '/hb/hbStat/list', {
        params: searchParams
      })
    },
  };
};
