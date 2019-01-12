// 配置API接口地址
var root = 'http://localhost:3003/'
// 引用axios
var axios = require('axios')

export default {
  get: function (url, success) {
    return axios.get(root + url)
      .then(function (response) {
        console.log(response.status)
        if (response.status === 200) {
          success(response.data)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
