<template>
    <ReviewMain></ReviewMain>
    <DepositStore></DepositStore>
    <Login></Login>
    <FloatStatus></FloatStatus>
    <MessageView></MessageView>
</template>

<script setup>
import ReviewMain from './layout/ReviewMain.vue'
import DepositStore from './layout/DepositStore.vue'
import Login from './components/Login.vue'
import FloatStatus from './components/FloatStatus.vue'
import MessageView from './components/MessageView.vue'
import {  ref,onMounted,watch  } from 'vue'
import { useUserStore } from '@/store/user';
import { useStateStore } from '@/store/state';

const userStore = useUserStore();
const stateStore = useStateStore();
onMounted(() => {
  if(localStorage.getItem("token")) userStore.init()
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
.no-scrollbar::-webkit-scrollbar {
    width: 0 !important; /* 隐藏滚动条 */
    height: 0 !important;
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
