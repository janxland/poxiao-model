import { defineStore } from 'pinia';
import { getUserInfo } from '@/api/user';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      isLogin: localStorage.getItem("token")?true:false,
      name:"未登录",
      nickname:'未登录',
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
      if(true || this.user.avatar){
        this.user.avatar = avatar[this.user.sex]
      }
    },
    init() {
      getUserInfo().then(res => {
        const { data } = res
        if(data.code === 200) {
          this.user = Object.assign({},this.user,data.data)
          const avatar = [require('@/assets/images/male.png'),require('@/assets/images/female.png'),]
          if(true || this.user.avatar){
            this.user.avatar = avatar[this.user.sex]
            this.user.isLogin = true
          }
        } 
      })
    },
    logout() {
      localStorage.removeItem("token");
      this.user = {
        isLogin: false,
        name:"未登录",
        nickname:'未登录',
        avatar:"",
        background:"",
        point: 458,
        sex:0,
        inviteCode:"TS13QUEEN"
      };
    }
  },
});