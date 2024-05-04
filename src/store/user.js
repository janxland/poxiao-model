import { defineStore } from 'pinia';
import { getUserInfo } from '@/api/user';
export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id:0, 
      isLogin: localStorage.getItem("token")?true:false,
      name:"未登录",
      nickname:'未登录',
      avatar:"",
      background:"",
      point: 458,
      dailyPoint: 0,
      sex:0,
      invitationCode:""
    }
  }),
  actions: {
    setUser(user) {
      this.user = Object.assign({}, this.user, user);
      this.user.isLogin = localStorage.getItem("token") ? true : false;
      const avatar = [require('@/assets/images/male.png'),require('@/assets/images/female.png'),]
      this.user.invitationCode = this.user.id;
      this.user.dailyPoint = user.boxPoint;
      if(true || this.user.avatar) {
        this.user.avatar = avatar[this.user.sex]
      }
    },
    init() {
      getUserInfo().then(res => {
        const { data } = res
        if(data.code === 200) {
          this.setUser(data.data)
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
        invitationCode:"TS13QUEEN"
      };
    }
  },
});