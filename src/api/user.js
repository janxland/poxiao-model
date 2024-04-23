import request from '@/utils/request'

//登录example（没有参考登录接口，后续与文档对齐）
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

//获取用户信息
export function getUserInfo() {
  return request({
    url: '/sso/auth/user',
    method: 'get'
  })
}