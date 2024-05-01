import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    visible:{
      deposit: false, //充值中心
      loginByMobile: false, // 验证码登录
      editProfile: false, // 修改个人信息
      messageList: false, // 收信箱
      messageView: false, // 收信箱
    }
  }),
  actions: {
    toggleVisible(name) {
      console.log(name,this.visible[name]);
      if(this.visible[name] != undefined){
        this.visible[name] = !this.visible[name];
      }
    },
    setVisible(name,value) {
      this.visible[name] = value;
    }
  },
});