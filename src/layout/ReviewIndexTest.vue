<template>
  <div class="demo">
     index .vue

     <el-button>我是 ElButton</el-button>

     <div class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </div>


  <div>
    <el-button :icon="Search" circle />
    <el-button type="primary" :icon="Edit" circle />
    <el-button type="success" :icon="Check" circle />
    <el-button type="info" :icon="Message" circle />
    <el-button type="warning" :icon="Star" circle />
    <el-button type="danger" :icon="Delete" circle />
  </div>

  <el-row>
   <el-button icon="el-icon-search" circle></el-button>
   <el-button type="primary" icon="el-icon-edit" circle></el-button>
   <el-button type="success" icon="el-icon-check" circle></el-button>
   <el-button type="info" icon="el-icon-message" circle></el-button>
   <el-button type="warning" icon="el-icon-star-off" circle></el-button>
   <el-button type="danger" icon="el-icon-delete" circle></el-button>
 </el-row>




  </div>
</template>

<script>
import { ElButton } from 'element-plus'
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
console.info(Check)
console.info(Delete)
console.info(Edit)
console.info(Message)
console.info(Search)
console.info(Star)

export default {
  components: { ElButton },
  // data(){
  //   return {Check,
  //     Delete,
  //     Edit,
  //     Message,
  //     Search,
  //     Star}
  // }
}
</script>

<style scoped>
.demo{
  /* background-color: green; */
}
</style>