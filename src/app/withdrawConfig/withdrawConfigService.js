export default (CONFIG, $http) => {
  return {
    getConfigList(searchParams){
      return $http.get(CONFIG.BASE_API + '/hb/businessConfig/list', {
        params: searchParams
      })
    },
    updateConfig(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/businessConfig/update', searchParams)
    },
    createConfig(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/businessConfig/create', searchParams)
    },
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
  };
};
