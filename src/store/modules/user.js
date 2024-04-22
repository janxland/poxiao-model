import { defineStore } from 'pinia'
// import { ref } from 'vue'

export const useUserStore = defineStore(
  'cp-user',
  () => {
    

    return { }
  },
  {
    //创建 Store 时，将 persist 选项设置为 true。整个 Store 将使用默认持久化配置保存。
    persist: true
  }
)