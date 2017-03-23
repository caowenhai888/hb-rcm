export default (CONFIG, $http) => {
  return {
    getUserList(searchParams){
      return $http.get(CONFIG.BASE_API + '/hb//account/user/list', {
        params: searchParams
      })
    },
    updateUser(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/account/user/update', searchParams)
    },
    createUser(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/account/user/create', searchParams)
    },
    deleteUser(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/account/user/delete', searchParams)
    },
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
  };
};
