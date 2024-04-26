import { defineStore } from 'pinia';

export const useStateStore = defineStore('state', {
  state: () => ({
    visible:{
      deposit: false,
    }
  }),
  actions: {
    toggleVisible(name) {
      console.log(name,this.visible[name]);
      if(this.visible[name] != undefined){
        this.visible[name] = !this.visible[name];
      }
    },
  },
});