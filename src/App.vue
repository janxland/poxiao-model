<template>
    <ReviewMain></ReviewMain>
    <DepositStore :visible="visible.deposit"></DepositStore>
</template>

<script setup>
import ReviewMain from './layout/ReviewMain.vue'
import DepositStore from './layout/DepositStore.vue'
import {  ref,onMounted,watch  } from 'vue'
import { useUserStore } from '@/store/user';
import { getUserInfo } from '@/api/user';
const userStore = useUserStore();
onMounted(() => {
  fetchUserInfo()
})

const visible = ref({
  deposit: false,
})
const fetchUserInfo = async () => {
  getUserInfo().then(res => {
    const { data } = res
    if(data.code === 200) {
      console.log(userStore);
      userStore.setUser(data.data)
      console.log("这里",userStore.user);
    } 
  } );
};

</script>

<style>
:root{
  --td-font-family: "MiSans VF", serif !important;
}
::-webkit-scrollbar {
  background-color: rgba(52, 85, 212, 0.16);
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(52, 85, 212,0.8);
  border-radius: 10px;
}
body,html{
  margin:0px 0px;
  padding: 0px 0px;
  /* --td-font-family: "MiSans VF", serif; */
}
#app {
  font-family: "MiSans VF", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width:100%;
  height: 100%;
  overflow: hidden;
  /* margin-top: 60px; */
}



</style>
