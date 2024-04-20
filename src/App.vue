<template>

    <ReviewMain></ReviewMain>
      <!-- <t-layout>
              <t-aside>
                <div>hel</div>
      <router-link :to="{path:'/knowledge'}">知识图谱</router-link>
      <router-link to="/incorrect">错题本</router-link>
                </t-aside>
                </t-layout>
      <div>
      
      <router-view>aaaa</router-view>
    </div>-->

  
</template>

<script>
import ReviewMain from './layout/ReviewMain.vue'

export default {
  name: 'app',
  components: {
    ReviewMain
  }
}
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
