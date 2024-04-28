import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 引入路由
// import VueRouter from "vue-router";
import routes from './router'
// 引入组件库的少量全局样式变量
import { LoadingDirective } from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css';
import './index.css'


const pinia = createPinia()
//解决pinia引入顺序问题
const app = createApp(App).use(routes).use(pinia)
app.directive('loading',LoadingDirective)
app.mount('#app')
