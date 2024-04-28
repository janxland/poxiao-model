<template>
    <ReviewMain></ReviewMain>
    <DepositStore :visible="stateStore.visible.deposit"></DepositStore>
</template>

<script setup>
import ReviewMain from './layout/ReviewMain.vue'
import DepositStore from './layout/DepositStore.vue'
import {  ref,onMounted,watch  } from 'vue'
import { useUserStore } from '@/store/user';
import { useStateStore } from '@/store/state';

const userStore = useUserStore();
const stateStore = useStateStore();
onMounted(() => {
  //初始化用户信息
  // userStore.init()
})


</script>

<style>
:root{
  --td-font-family: "MiSans VF", serif !important;
}
::-webkit-scrollbar {
  background-color: rgba(52, 85, 212, 0.16);
  width: 5px;
  height: 2px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(52, 85, 212,0.8);
  border-radius: 10px;
}
html,
body,
#app {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: auto;
}
#app {
  font-family: "MiSans VF", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}



</style>
