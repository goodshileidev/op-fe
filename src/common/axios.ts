import type {AxiosInstance} from 'axios'
import axios from "axios";
import {message} from 'antd'
import Cookies from 'js-cookie';
import escapeAuthCheckList from "@/escape_authcheck";

const {REACT_APP_ENV = 'test'} = process.env;

let proxyUrl = '/api'
if (location.hostname.indexOf("66yunlian") === -1 && location.hostname.indexOf("192") === -1) {
  proxyUrl = 'http://localhost:6800/api';
} else if (location.hostname.indexOf("yunliantest") > -1) {
  proxyUrl = 'https://gw.66yunliantest.cn/form-backend/api';
} else if (location.hostname.indexOf("yunlian") > -1) {
  proxyUrl = 'https://gw.66yunlian.cn/form-backend/api';
}

console.debug(">>>>>>>>REACT_APP_ENV", REACT_APP_ENV)
console.debug(">>>>>>>>proxyUrl", proxyUrl)

export const baseUrl = proxyUrl;


const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 600000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
})
instance.interceptors.request.use((request: any) => {
  // 在请求发送之前做一些处理，比如token
  let token = Cookies.get("token")
  if (!token) {
    console.debug("1.无法从Cookie获取Token")
    token = localStorage.getItem("token")
  }
  if (!token) {
    console.debug("2.无法从获取Token")
    token = "test"
  }
  request.headers['token'] = token
  console.debug("before request", request)
  const currentUser = localStorage.getItem("current_login_user")
  if (!token && !currentUser && currentUser === "{}") {
    console.debug("3.无法获取Token与当前登录用户, token:", token, currentUser)
    let needAuthCheck = true
    let matched = ""
    for (const idx in escapeAuthCheckList) {
      const escapeKeyword = escapeAuthCheckList[idx]
      if (location.href.indexOf(escapeKeyword) > -1) {
        needAuthCheck = false;
        matched = escapeKeyword
        break
      }
    }
    if (needAuthCheck && request.url !== "'/system/user/getByAccount'") {
      message.error("请先登录系统")
      return Promise.reject({data: {msg: "请先登录系统"}})
    }
  }
  if (currentUser && currentUser !== "undefined" && currentUser !== "[object Object]") {
    const currentUserInfo = JSON.parse(currentUser)
    if (request.url.indexOf("create") > -1) {
      request.data.creatorId = currentUserInfo.userId
      request.data.creatorName = currentUserInfo.userName
      request.data.creatorCode = currentUserInfo.userName
    }
    if (!(request.url.indexOf("get") > -1
      || request.url.indexOf("list") > -1
      || request.url.indexOf("search") > -1)) {
      request.data.updaterId = currentUserInfo.userId
      request.data.updaterName = currentUserInfo.userName
      request.data.updaterCode = currentUserInfo.userName
    }
  }

  return request
}, (error: any) => {
  // 处理错误
  return Promise.reject(error)
})

/**
 * 在响应返回之前做一些处理
 */
instance.interceptors.response.use((response: any) => {
  console.debug("before response succeed, response:", response)
  // 弹出显示info
  if (response.data && response.data.message && response.data.message !== '') {
    let token = response.data.token
    // 从response取token并保存
    localStorage.setItem("token", token)
    if (response.data.code !== 200 || response.data.hasOwnProperty("success") && !response.data.success) {
      message.error(response.data.message)
      return Promise.reject(response)
    }
  } else if (response.data && response.data.msg && response.data.msg !== '') {
    let token = response.data.token
    // 从response取token并保存
    localStorage.setItem("token", token)
    if (response.data.code !== 200 && response.data.code !== 104 || response.data.hasOwnProperty("success") && !response.data.success) {
      message.error(response.data.msg)
      return Promise.reject(response)
    }
  }
  if (response.data.code === 104) {
    response.data.data = {}
  }
  // TODO 成功弹框不能放这里，放到页面ui部分
  // message.success(response.data.msg)
  return response
}, (commit: any) => {
  const response = commit.response
  console.debug("before response failed-1, comm", commit)
  // 处理错误
  if (response.status !== 200) {
    message.error(response.status + ":" + response.statusText)
  }
  let token = response.data.token
  // 从response取token并保存
  localStorage.setItem("token", token)
  console.debug("before response failed-2, token:", token)
  return Promise.reject(response)
})

// 异常token过期 重定向到 login
export default (req: any) => {
  return instance(req).then((res: any) => {
    return res.data
  })
}
