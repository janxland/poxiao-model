import axios from 'axios'
// import { useUserStore } from '@/stores'

const service = axios.create({
  baseURL: '/api', // 基础地址
  timeout: 10000
})


//请求拦截器
service.interceptors.request.use((config) => {
  // const store = useUserStore()
  // if (store.user?.token && config.headers) {
  //   config.headers.Authorization = `Bearer ${store.user.token}`
  // }
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  
  return config
}, (error) => {
  return Promise.reject(error)
})


//响应拦截器
// service.interceptors.response.use((response) => {

// })

export default service