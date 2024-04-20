import { createRouter, createWebHashHistory } from 'vue-router'
import ReviewIndex from '@/layout/ReviewIndex.vue'
import MyExamIndex from '@/layout/MyExamIndex.vue'
import IncorrectIndex from '@/layout/IncorrectIndex.vue'
import KnowledgeIndex from '@/layout/KnowledgeIndex.vue'
import MyIndex from './layout/MyIndex.vue'

const routes = [
  {
    path: '/',
    component: ReviewIndex,
    // children: [{ path: 'home', component: Home }],
  },{
    path: '/index',
    component: ReviewIndex,
    // children: [{ path: 'home', component: Home }],
  },{
    path: '/myexam',
    component: MyExamIndex,
    meta: {  
      hiddenNav: true // 对应的菜单项应该被隐藏  
    }  
  },{
    path: '/myindex',
    component: MyIndex,
    meta: {  
      hiddenNav: true // 对应的菜单项应该被隐藏  
    }  
  },{
    path: '/incorrect',
    component: IncorrectIndex
  },{
    path: '/knowledge',
    component: KnowledgeIndex
  }
]

export default createRouter({
history: createWebHashHistory(),
routes,
})