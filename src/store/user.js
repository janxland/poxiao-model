import { defineStore } from 'pinia';

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
  },
});