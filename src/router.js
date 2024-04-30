import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/index',
    component: ()=>import('./layout/ReviewIndex.vue')
  },
  {
    path: '/index',
    component: ()=>import('./layout/ReviewIndex.vue')
  },
  {
    path: '/myexam',
    component: ()=>import('./layout/MyExamIndex.vue'),
    meta: {  
      hiddenNav: true // 对应的左侧菜单项应该被平滑隐藏  
    }  
  },{
    path: '/myindex',
    component: ()=>import('./layout/MyIndex.vue'),
    meta: {  
      hiddenNav: true // 对应的左侧菜单项应该被平滑隐藏
    }  
  },{
    path: '/incorrect',
    component: ()=>import('./layout/IncorrectIndex.vue'),
    meta: {  
        hiddenNav: true // 对应的菜单项应该被隐藏  
    }
  },{
    path: '/examPage',
    component: ()=>import('./layout/ExamPage.vue'),
  },{
    path: '/knowledge',
    component: ()=>import('./layout/KnowledgeIndex.vue')
  },{
    path: '/judgment',
    component: ()=>import('./layout/Judgment')
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})