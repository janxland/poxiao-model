import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    user:{
        name:"天女散花",
        nickName:'',
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
});