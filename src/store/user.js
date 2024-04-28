import { defineStore } from 'pinia';
import { getUserInfo } from '@/api/user';
export const useUserStore = defineStore('user', {
  state: () => ({
    user:{
        name:"天女散花",
        avatar:"",
        background:"",
        point: 458,
        inviteCode:"TS13QUEEN"
    }
  }),
  actions: {
    setUser(user) {
      this.user = Object.assign({}, this.user, user);
    },
    init() {
        getUserInfo().then(res => {
          const { data } = res
          if(data.code === 200) {
            this.user = Object.assign(this.user,data.data)
          } 
        })
    }
  },
});