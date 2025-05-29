import axios from "axios"
import { fileURLToPath } from 'node:url';
import path from 'node:path'
import CryptoJS from "crypto-js"
import { leancloudApi, appId, appKey, marsterKey } from "./constant.cjs"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NetWorkAction = axios.create({
  baseURL: leancloudApi,
});

NetWorkAction.interceptors.request.use((config) => {

  const md5Fn = (str) => CryptoJS.MD5(str)

  const dd = Date.now();
  const tempInfo = !config.headers.autoWell ? { "X-LC-Sign": `${md5Fn(dd + appKey)},${dd}` }
    : { "X-LC-key": `${md5Fn(dd + marsterKey)},${dd},master` }
  config.headers = {
    ...config.headers,
    ...tempInfo,
    "X-LC-Id": appId,
  }
  return config
}, (err) => {
  return Promise.reject(err)
})


export default NetWorkAction