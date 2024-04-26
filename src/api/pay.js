import request from '@/utils/request'

// 获取商品
export function getProducts() {
  return request({
    url: '/trade/product/list',
    method: 'post',
  })
}

// 微信支付码
export function getWechatPayCode(productId) {
  return request({
    url: '/trade/pay/nativePay',
    method: 'post',
    params:{
      productId:productId
    }
  })
}

//回调接口
export function getSmsCode() {
  return request({
    url: '/trade/pay/payNotify',
    method: 'get',
  })
}