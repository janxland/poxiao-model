import axios from 'axios'
// import { useUserStore } from '@/stores'

const service = axios.create({
  baseURL: 'http://47.95.6.197:18080/api', // 基础地址
  timeout: 10000
})


//请求拦截器
service.interceptors.request.use((config) => {
  // const store = useUserStore()
  // if (store.user?.token && config.headers) {
  //   config.headers.Authorization = `Bearer ${store.user.token}`
  // }
  // return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})


//响应拦截器
// service.interceptors.response.use((response) => {

// })

export default service