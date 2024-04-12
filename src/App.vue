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
body{
  margin:0px 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}



</style>
