const axios = require("axios")
console.log('axios',axios)
// const CryptoJS = require("crypto-js")
const { leancloudApi, appId, appKey, marsterKey } = require("./constant.js")


const NetWorkAction = axios.create({
 baseURL: leancloudApi,
});

NetWorkAction.interceptors.request.use((config) => {
//    const md5Fn = (str) => CryptoJS.MD5(str)
//  const dd = Date.now();
//  const tempInfo = !config?.headers?.autoWell ? { "X-LC-Sign": `${md5Fn(dd + appKey)},${dd}` }
//   : { "X-LC-key": `${md5Fn(dd + marsterKey)},${dd},master` }
//  config.headers = {
//   ...config.headers,
//   ...tempInfo,
//   "X-LC-Id": appId,
//  }
 return config
}, (err) => {
 return Promise.reject(err)
})


module.exports = NetWorkAction