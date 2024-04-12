import { createRouter, createWebHashHistory } from 'vue-router'
import ReviewIndex from '@/layout/ReviewIndex.vue'
import MyExamIndex from '@/layout/MyExamIndex.vue'
import IncorrectIndex from '@/layout/IncorrectIndex.vue'
import KnowledgeIndex from '@/layout/KnowledgeIndex.vue'

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
    component: MyExamIndex
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