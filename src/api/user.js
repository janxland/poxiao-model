import request from '@/utils/request'

//登录example（没有参考登录接口，后续与文档对齐）
export function login(data) {
  return request({
    url: '/sso/auth/sms/login',
    method: 'post',
    data
  })
}

//获取用户信息
export function getUserInfo() {
  return request({
    url: '/sso/user/info',
    method: 'get'
  })
}

//获取手机验证码
export function getSmsCode(mobile) {
  return request({
    url: '/sso/auth/sms/code',
    method: 'post',
    params:{
      mobile:mobile
    }
  })
}