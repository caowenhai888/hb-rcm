/**
 * Created by victor on 2016/12/20.
 */
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
    login(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/login', searchParams);
    },
    logout(searchParams){
      return this.generatePostHttp(CONFIG.BASE_API + '/hb/logout', searchParams);
    }
  };
};
