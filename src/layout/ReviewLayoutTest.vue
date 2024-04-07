<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" >Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
aside {
    background-color: red;
    /* --el-color-black: var(--el-color-primary-light-1);  */
    /* --el-popup-modal-background-color: var(--el-color-black);  */
  }
  el-main{
    --el-color-black: var(--el-color-primary-light-1);
  }
</style>