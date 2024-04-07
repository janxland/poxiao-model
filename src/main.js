import { createApp } from 'vue'
import App from './App.vue'

// 引入路由
// import VueRouter from "vue-router";
import routes from './router'

import TDesign from 'tdesign-vue-next';

// 引入组件库的少量全局样式变量
import 'tdesign-vue-next/es/style/index.css';



const vue = createApp(App).use(routes).use(TDesign).mount('#app')
console.info(vue)
