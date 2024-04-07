<template>
  <div>
    <t-space direction="vertical">

      <!-- <div>
        <t-layout>
          <t-header>Header</t-header>
          <t-layout>
            <t-aside>Aside</t-aside>
            <t-content>Content</t-content>
          </t-layout>
          <t-footer>Footer</t-footer>
        </t-layout>
      </div> 


      <div>
        <t-layout>
          <t-aside>
            <t-layout class="fill-layout fill-lf-bg-color">
              <t-header  >Header</t-header>
              <t-content>
                <t-space direction="vertical">

                  <router-link :to="{path:'/myexam'}">我的题库</router-link>
                  <router-link :to="{path:'/knowledge'}">知识图谱</router-link>
                  <router-link :to="{path:'/incorrect'}">错题本</router-link>
                </t-space>


              </t-content>
              <t-footer>Footer</t-footer>
            </t-layout>

          </t-aside>
          <t-content>
            <t-layout class="fill-layout">
              <t-content>
                <router-view></router-view>
              </t-content>
              <t-aside>
                aside
                <t-space direction="vertical">

                  <t-button>aaas</t-button>
                  <t-button>aaas</t-button>
                  <t-button>aaas</t-button>
                  <t-button>aaas</t-button>
                  <t-button>aaas</t-button>
                </t-space>
                
              </t-aside>
            </t-layout>
          </t-content>
          
        </t-layout>
      </div>
-->




      <!-- test -->

      <div>
        <t-layout>
          <t-aside>
            <t-layout class="fill-layout">
              <div class="fill-lf-bg-color lf-bg-layout">
                <!-- TOP info -->
                <div class="m-lf-layout-top">
                  <div class="m-lf-layout-row">
                    <t-image :src="logo" fit="fill" :style="{ width: '30px', height: '30px'}"></t-image>
                    <router-link :to="{path:'/'}">复习大师</router-link>
                  </div>

                </div>
                <!-- Middle info -->
                <div class="m-lf-layout-content">
                  <div class="m-lf-layout-row">
                    <t-image :src="imgurl" fit="fill" :style="{ width: '30px', height: '30px',borderRadius:'100%' }"></t-image>
                    <router-link :to="{path:'/myexam'}">我的题库</router-link>
                  </div>
                  <div class="m-lf-layout-row">
                    <t-image :src="imgurl" fit="fill" :style="{ width: '30px', height: '30px',borderRadius:'100%' }"></t-image>
                    <router-link :to="{path:'/knowledge'}">知识图谱</router-link>
                  </div>
                  <div class="m-lf-layout-row">
                    <t-image :src="imgurl" fit="fill" :style="{ width: '30px', height: '30px',borderRadius:'100%' }"></t-image>
                    <router-link :to="{path:'/incorrect'}">错题本</router-link>
                  </div>
                  
                  
                </div>
                <!-- Foot info  -->
                <div class="m-lf-layout-foot">
                  <div>
                    <t-row class="t-row--center t-row--head--title">
                      <t-avatar :image="userIcon" :hide-on-load-failed="false" />
                      <router-link :to="{path:'/'}">天女散花</router-link>
                    </t-row>
                    <t-row class="t-row--center font-small">在线客服</t-row>
                    <t-row class="t-row--center font-small">版本：V1.29</t-row>
                    <t-row class="t-row--center font-small">《复习大师用户协议》|《复习大师隐私策略》</t-row>
                  </div>
                  
                </div>
              </div>
              
            </t-layout>

          </t-aside>
          <t-content>
            <t-layout class="fill-layout">
              <!-- Content info -->
              <t-content>
                <router-view></router-view>
              </t-content>

              <t-aside width="320px">
                <t-row class="t-row--head--title1">
                  <t-avatar :image="userIcon" :hide-on-load-failed="false" />
                  <router-link :to="{path:'/'}">个性化推荐</router-link>
                  <t-avatar :image="userIcon" :hide-on-load-failed="false" />
                </t-row>
                <t-row class="t-row--head--subtitle">
                  现在开始复习考研英语吧
                </t-row>
                <t-row class="t-row--head--content">
                  以下是基于AI算法为你生成的个性化内容
                </t-row>

                <t-row>
                  <t-space direction="vertical">
                    <t-switch v-model="loading" class="mb-20"></t-switch>

                    <t-skeleton :loading="loading" theme="tab">
                      <div class="t-skeleton-demo-paragraph">
                        <!-- <p>
                          骨架屏组件，是指当网络较慢时，在页面真实数据加载之前，给用户展示出页面的大致结构。
                          一方面让用户对页面有一定的心理预期，另一方面可以改善长期停留在空白屏给用户带来的枯燥和不适感。它可以为用户提供更好视觉效果和使用体验。
                        </p> -->

                        <t-row>
                          <div class="sg-content">
                            <div class="sg-item-box">
                              <div class="sg-item">
                                <t-row class="sg-item-title">语法知识111s</t-row>
                                <t-row class="sg-item-viewer">
                                  <!-- <icon name="circle" style="color: red" />
                                  <icon name="bamboo-shoot" color="green" /> -->
                                  <t-image :src="imgurl" fit="fill" :style="{ width: '20px', height: '20px',borderRadius:'100%' }"></t-image>
                                  12.2w
                                  <icon name="bamboo-shoot" color="green" />
                                </t-row>
                                <t-row class="sg-item-content">11学会撰写不同类型学会撰写不同类型的文章的文章</t-row>
                              </div>

                              <!-- <t-skeleton :loading="loading" theme="tab"> -->
                                <div class="sg-item"  v-for="item in tipsWords" :key="item.id" :index=index>
                                  <div>
                                    <t-row class="sg-item-title">{{ item.title }}
                                      <!-- <t-input type="input" :value="leftLength+item.content.length"></t-input> -->
                                    </t-row>
                                    <t-row class="sg-item-viewer">
                                      <t-image :src="imgurl" fit="fill" :style="{ width: '20px', height: '20px',borderRadius:'100%' }"></t-image>
                                      {{ item.counts }}
                                      <!-- <icon name="bamboo-shoot" color="green" /> -->
                                    </t-row>
                                    <t-row class="sg-item-content">{{ computeContentLength(item.content) }}</t-row>
                                  </div>
                                </div>
                              <!-- </t-skeleton> -->
                            </div>
                            
                            <div class="sg-item-box" >
                              <div class="sg-item" v-for="item in tipsWords" :key="item.id" :index=index>
                                <div>
                                  <t-row class="sg-item-title">{{ item.title }}
                                    <!-- <t-input type="input" :value="leftLength+item.content.length"></t-input> -->
                                  </t-row>
                                  <t-row class="sg-item-viewer">
                                    <t-image :src="imgurl" fit="fill" :style="{ width: '20px', height: '20px',borderRadius:'100%' }"></t-image>
                                    {{ item.counts }}
                                    <!-- <icon name="bamboo-shoot" color="green" /> -->
                                  </t-row>
                                  <t-row class="sg-item-content">{{ computeContentLength(item.content) }}</t-row>
                                </div>

                                
                              </div>
                          </div>

                          </div>
                        </t-row>
                      </div>
                    </t-skeleton>
                  </t-space>
                </t-row>
                
                



                <!-- <t-row>
                  <t-col :span="6">
                    <t-space direction="vertical">
                      <t-text>adsfsdf</t-text>
                    </t-space>
                  </t-col>
                  <t-col :span="6">
                    <t-space direction="vertical">
                      <t-text>adfsfdfsdfadfsfdfsdfsdfsadfsfdfsdfsdfssdfs</t-text>
                    </t-space>
                    <t-space direction="vertical">
                      <t-text>adsfsdf</t-text>
                    </t-space>
                  </t-col>
                </t-row> -->
                
              </t-aside>
            </t-layout>


          </t-content>
          
        </t-layout>
      </div>

    </t-space>


    
  </div>
</template>

<script>
// import { computed, reactive, ref } from 'vue'
import {  ref } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';


// let diffvalue = computed((val)=>{
//       console.info("diffvalue",this.leftLength-this.rightLength,val);
//       return this.leftLength-this.rightLength;
//     });

export default {
  components:{
    Icon
  },
  data(){
    let leftLength = ref(0);
    let rightLength = ref(0);
    const loading = ref(true);
    


    return {
     
    imgurl:require("@/assets/images/头像.png"),
    userIcon:require("@/assets/images/R-C.jpg"),
    logo:require("@/assets/images/logo.png"),
    tipsWords:[
      {"id":'1001',"title":'大头兵1',"counts":'11.2w',"content":'1依赖发送到水电费时代峰峻欧舒丹1依赖发送到水电费时代峰峻欧舒丹'},
      {"id":'1002',"title":'大头兵2',"counts":'13.2w',"content":'2依赖发送到水电费时代峰峻欧舒丹'},
      {"id":'1003',"title":'大头兵3',"counts":'10.2w',"content":'3依赖发送到水电费时代峰峻欧舒丹3依赖发送到水电费时代峰峻欧舒丹3依赖发送到水电费时代峰峻欧舒丹3依赖发送到水电费时代峰峻欧舒丹'},
      {"id":'1004',"title":'大头兵4',"counts":'9.2w',"content":'4依赖发送到水电费时代峰峻欧舒丹'},
    ],
    leftLength,
    rightLength,
    loading
    
    }
  },
  // computed:{
  //   diffval(){
  //     console.info("diffvalue",this.leftLength-this.rightLength);
  //     return this.leftLength-this.rightLength;
  //   }
  // },
  methods:{
    computeContentLength(val){
      // if(this.diffvalue>=0){
      //   this.leftLength.value=this.leftLength.value+val.length;
      // }else{
      //   this.rightLength.value=this.rightLength.value+val.length;
      // }
      return val;
    }
  }
 
}
</script>

<style scoped>
@import './mytheme.css';
.t-space{
  width: 100%;
}
header{
  background-color: var(--td-success-color-5);
}
main{
  background-color: var(--td-warning-color-1);
}
aside{
  /* background-color: var(--td-success-color-5); */
}
.fill-layout{
  height: 100%;
}

#root,body,html,aside,content {
  height: 100%;
}

.t-skeleton-demo-paragraph {
  line-height: 25px;
}
</style>