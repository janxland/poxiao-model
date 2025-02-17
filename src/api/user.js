import request from '@/utils/request'
/**
 * 
 * @returns
	"content": "",
	"messageId": 0,
	"sendTime": "",
	"sendUserName": "",
	"status": ""
 */
export function getMessages() {
  return request({
    url: '/sso/sms/list',
    method: 'get'
  })
}
/**
 * 
 * @returns
	{
	"content": "",
	"messageId": 0,
	"sendTime": "",
	"sendUserName": "",
	"status": ""
}
 */
  export function getMessageContent(messageId) {
    return request({
      url: '/sso/sms/view',
      method: 'POST',
      params:{
        messageId:messageId,
      }
    })
  }

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
/**
 * {
  "avatar": "",
  "birthday": "",
  "nickname": "",
  "sex": 0
}
 */
export function setUserProfile(data) {
  return request({
    url: '/sso/user/update',
    method: 'put',
    data:{
        "avatar": data.avatar,
        "birthday": data.birthday,
        "nickname": data.nickname,
        "sex": data.sex
    }
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