import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// 引入路由
// import VueRouter from "vue-router";
import routes from './router'

import TDesign from 'tdesign-vue-next';

// 引入组件库的少量全局样式变量

import 'tdesign-vue-next/es/style/index.css';
import './index.css'


const pinia = createPinia()
//解决pinia引入顺序问题
const vue = createApp(App).use(routes).use(TDesign).use(pinia).mount('#app')
console.info(vue)
