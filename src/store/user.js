import { defineStore,toRefs } from 'pinia';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
        name:"天女散花",
        nickname:'有小名' ,//防止触发创建小名
        avatar:"",
        background:"",
        point: 458,
        sex:0,
        inviteCode:"TS13QUEEN"
    }
  }),
  actions: {
    setUser(user) {
      this.user = Object.assign({}, this.user, user);
      const avatar = [require('@/assets/images/male.png'),require('@/assets/images/female.png'),]
      if(this.user.avatar){
        this.user.avatar = avatar[this.user.sex]
      }
    },
  },
  getters: {
    // 使用toRefs函数将user对象的属性转为响应式
    getUser() {
      return toRefs(this.user);
    }
  }
});