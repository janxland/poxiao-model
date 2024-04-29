<template>
  <div class="common-layout h-[100vh]">
    <t-layout class="fill-layout">
      <t-content>
        <t-layout class="flex flex-col justify-between h-[100vh]">
          <t-content class="flex-1">
              <div class="main-content"> 
                <div class="main-content-head">
                  <div class="main-content-icon">
                    <t-image :src="userIcon" fit="fill" :style="{ width: '60px', height: '60px'}"></t-image>
                  </div>
                  <div class="main-content-title main-content-font-large main-content-font-bold">欢迎来到复习大师</div>
                  <div class="main-content-desc">我能理解人类语言、针对你的学习计划和学习状况为你生成个性化题目，帮助你更好地学习。</div>
                </div>

                
                <div class="main-content-itemlist-group">
                  <div class="main-content-itemlist">
                      <div class="main-content-itemlist-title  main-content-font-middle main-content-font-bold">
                        你可以试试这样问我:
                      </div>
                  </div>
                  
                  <div class="main-content-itemlist">
                      <div class="main-content-itemlist-title  main-content-font-middle main-content-font-bold">
                        知识点出题 
                      </div>
                      <div class="main-content-itemary">
                          <div class="main-content-item">
                            <t-link theme="primary"> 请给我出关于教资<弗洛伊德的心理分析理论>这一章节的题目 </t-link>
                          </div>
                          <div class="main-content-item">
                            <t-link theme="primary"> 请围绕教资<教育观法律观基本知识>这一知识点给我出题 </t-link>
                            </div>
                          <div class="main-content-item">
                            <t-link theme="primary"> 我需要关于教资<学生的权利与保护>这一知识点的题目 </t-link>
                            </div>
                      </div>
                  </div>

                  <div class="main-content-itemlist">
                      <div class="main-content-itemlist-title  main-content-font-middle main-content-font-bold">
                        文件出题
                      </div>
                      <div class="main-content-itemary">
                          <div class="main-content-item">
                            <t-link theme="primary"> 请根据文档内容给我出关于教资<教育促进社会生产力发展>的题目 </t-link>
                            </div>
                          <div class="main-content-item">
                            <t-link theme="primary"> 结合我上传的文档内容给我出教资的写作题 </t-link>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
            
          </t-content>
          <t-footer id="id_main-content-footer" class="mx-5 p-[8px_0]">
              <div class="main-content-footer"> 
                <t-layout>
                  <t-content class="main-content-footer-content !flex-1">
                    <div class="search-input">
                      <!-- <t-input disabled placeholder="从此处检索你要提问的科目"></t-input> -->
                    </div>
                    <t-tabs :default-value="1"  class="main-content-footer-tabs flex-1">
                      <t-tab-panel :value="1" label="知识点出题">
                        <div class="footer-tabs-first-input-p">
                          <div class="footer-tabs-first-input-c">
                            <t-textarea  
                              
                              placeholder="从这里输入你的问题 "
                              name="description" 
                              :style="{height:'100%'}" 
                            />
                          </div>
                        </div>
                          
                      </t-tab-panel>
                      <t-tab-panel :value="2" label="文件出题" id="id-main-content-footer-tab-panel">

                                  <!-- <t-space direction="vertical"> -->
                                    <div v-if="files && files.length" class="list-custom">
                                      <div class="file-list-group" v-for="(item, index) in files" :key="index" >
                                          <div class="file-list-item">
                                              <div class="file-list-item-ns">
                                                <div>{{ item.name }}</div>
                                                <div>{{ item.size }}</div>
                                              </div>
                                              <div class="file-list-item-del">
                                              <icon name="delete-1"></icon>
                                              </div>
                                          </div> 
                                      </div>
                                      
                                      
                                      <!-- <ul style="padding: 0">
                                        <li v-for="(item, index) in files" :key="index" style="list-style-type: none">{{ item.name }}</li>
                                      </ul> -->
                                    </div>
                                    <div class="upload-layout-box">
                                      <!-- <t-text @click="none">{{ uploadTips }}</t-text>  -->
                                      <t-upload
                                        v-model="files"
                                        action="https://service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
                                        
                                        theme="custom"
                                        :before-upload="beforeUpload"
                                        multiple
                                        @select-change="handleSelectChange"
                                        @fail="handleFail"
                                        @success="handleSuccess"
                                      > 
                                        <div class="upload-layout" >
                                          
                                          <t-button theme="primary">继续上传</t-button>
                                        </div>  
                                      </t-upload>  
                                    </div> 
                                    <div class="upload-layout-textarea">
                                      <t-textarea placeholder="从这里输入你的基于该文件的出题要求" ></t-textarea>
                                    </div> 
                                  <!-- </t-space> -->
                                  

                      </t-tab-panel>
                      
                      
                    </t-tabs>
                  </t-content>
                  <t-aside class="!w-[500px]">  
                      <t-layout id="id-t-layout-quick-conf">
                        <t-content id="id-t-content-quick-conf"  > 
                          <div class="quick-conf-item-list"  >  
                            <div class="quick-conf-item-list-box"  :class="id ==quick_conf_input_index?'quick-conf-item-list-box-active':''" v-for="(iconItem,id) in quick_conf_icon_data" :key="id" :index="id">
                              <div class="quick-conf-item-list-title" v-if="quick_conf_input_ary[id]==0 &&id !=quick_conf_input_index">
                                <t-image :src="iconItem.icon_path" @click="quick_conf_click_enter(id,$event)" fit="fill" :style="{ width: '30px', height: '30px'}"></t-image>
                              </div> 
                              <div @click="quick_conf_click_enter(id,$event)" class="quick-conf-item-list-title-active" v-else-if="id !=quick_conf_input_index">
                                <span>{{ quick_conf_input_ary[id] }}</span>
                              </div>  
                              <div v-if="id !=quick_conf_input_index" :class="quick_conf_input_ary[id]==0?'quick-conf-item-list-desc':'quick-conf-item-list-desc-active'">
                                {{iconItem.q_name}}
                                <!-- <t-button variant="text" shape="square">
                                  判断0 
                                </t-button> -->
                                <!-- <t-popconfirm theme="default" content="确认删除订单吗">
                                  <t-button>删除订单c</t-button>
                                </t-popconfirm> -->
                              </div>
                              <!-- 1、点击图标，隐藏本身。显示编辑框
                                    2、输入数值，点击确定或取消。更新数值，隐藏本身，显示图标 
                                  3、数组保存选项值，显示进行遍历-->
                              <div v-if="id ==quick_conf_input_index " class="quick-conf-item-list-upd"> 
                                <t-row>
                                  <t-input v-model="quick_conf_input_0" ></t-input>
                                </t-row> 
                                <t-row>  
                                  <t-button class="quick-conf-item-list-upd-cancel"  @click="quick_conf_click_cancel">取消</t-button>
                                  <t-button class="quick-conf-item-list-upd-sure"  @click="quick_conf_click_sure(id,$event)">确定</t-button>
                                </t-row>
                              </div>
                            </div>
                            
                            
                          </div>
                            
                        </t-content>
                        <t-aside  width="30%" id="id-t-aside-footer-operation">
                          <div class="footer-operation">
                            <t-image :src="quickItemIShareIcon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius: '50%'}"></t-image>
                          </div> 
                            
                        </t-aside>
                      </t-layout>
                  </t-aside>
                </t-layout>
                
              </div>
          </t-footer>
        </t-layout>
      </t-content>
      <t-aside width="240px">
                <t-row class="t-row--head--title1">
                  <t-avatar :image="userIcon" :hide-on-load-failed="false" />
                  <router-link :to="{path:'/'}">个性化使用指南</router-link>
                </t-row>
                
                <t-row class="t-row--head--content">
                  让复习大师更快、更好助你学习
                </t-row>

                <t-row>
                  <t-space direction="vertical">  
                    <!-- <t-switch v-model="loading" class="mb-20"></t-switch> -->

                    <t-skeleton :loading="loading" theme="tab">
                      <div class="t-skeleton-demo-paragraph">
                        <t-row>
                          
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
  </div>
  
</template>

<script setup>
import {  ref,onMounted  } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'; 
import { Icon } from 'tdesign-icons-vue-next';
// import Carousel from '@/components/swiper.vue';
const quickItemIShareIcon=require("@/assets/images/分享.png");
const userIcon=require("@/assets/images/book.jpg");
const loading = ref(false);
// const imgurl=require("@/assets/images/头像.png");
// const swiperIcon = {
//   knowledgeIcon:require("@/assets/images/knowledgeIcon.png"),
//   fileIcon: require("@/assets/images/fileIcon.png"),
//   IncorrectIcon: require("@/assets/images/IncorrectIcon.png")
// }
const size = 0
function splitArray(array) {
  const middle = Math.ceil(array.length / 2);
  return [array.slice(0, middle), array.slice(middle)];
}
const tipsWords=[
      {"id":'1001',"title":'线性代数出题',"counts":'11.2w',"content":'出题线性代数选择题及填空题，难度中等，涉及知识点：行列式定义及性质、矩阵概念以及矩阵运算'},
      {"id":'1002',"title":'四级英语',"counts":'13.2w',"content":'帮我出四级英语阅读理解题，要求题目简单，易于学生理解，涉及知识点：单词、语法、句子结构、逻辑推理、主旨理解等'},
      {"id":'1003',"title":'小学语文',"counts":'10.2w',"content":'给我出小学语文题，要求激发学生对汉字的兴趣，提高学生汉字书写能力，培养学生汉字阅读能力'},
      {"id":'1004',"title":'小学数学',"counts":'12.2w',"content":'帮我出小学数学题，要求题目简单，易于学生理解，涉及知识点：加减法、乘除法、分数、小数、方程、函数、统计图表等'},
    ];
const [tipsWords_1, tipsWords_2] = splitArray(tipsWords);
const computeContentLength = (val)=>{
  return val;
}



// 文件上传
const files = ref([]);

const handleFail = ({ file }) => {
  MessagePlugin.error(`文件 ${file.name} 上传失败`);
};

const beforeUpload = (file) => {
  if (file.size > 5 * 1024 * 1024) {
    MessagePlugin.warning('上传的文件不能大于5M');
    return false;
  }

  return true;
};
const uploadTips = ref('已上传'+files.value.length+'个文件，复习大师可以基于您上传的智能生成问题');

function handleSelectChange(files, context) {
  console.log('onSelectChange', files, context);
}

const handleSuccess = (params) => {
  console.log('success', params);
  MessagePlugin.success('上传成功');
};




// 树形组件 
// const allLevels = [2, 1];
function createTreeData() {
  let cacheIndex = 0;
  function getValue() {
    cacheIndex += 1;
    return `t${cacheIndex}`;
  }
  // function createNodes(items, level) {
  //   const count = allLevels[level];
  //   if (count) {
  //     let index = 0;
  //     for (index = 0; index < count; index += 1) {
  //       const value = getValue();
  //       const item = {
  //         label:'N_'+value,value:'V_'+value
  //       };
  //       items.push(item);
  //       if (allLevels[level + 1]) {
  //         item.children = [];
  //         createNodes(item.children, level + 1);
  //       }
  //     }
  //   }
  // }
  let items = [];
  items=[{
    label:'考研数学',value:'1',children:[
      {label:'选择题-3，材料分析题-5',value:'11',children:[]}
    ]
  },{
    label:'教师资格证科目2',value:'2',children:[
      {label:'作文题-3，判断题-15，论述题-1',value:'22',children:[]}
    ]
  }];
  // createNodes(items, 0);
  return {
    getValue,
    items,
  };
}
const virtualTree = createTreeData();
console.info(virtualTree)
const tree = ref();
const transition = ref(true);
// const textInsertCount = ref('1');
const showLine = ref(false);
// const showIcon = (h, node) => {
//   let name = 'file';
//   // node.children is undefined on some cases
//   if (node.getChildren && node.getChildren(false)) {
//     if (node.expanded) {
//       name = 'folder-open';
//       if (node.loading) {
//         name = 'loading';
//       }
//     } else {
//       name = 'folder';
//     }
//   }
//   return `<Icon name=${name} />`;
// };


const isCheckable = ref(false);
// const isOperateAble = ref(true);
const items = ref(virtualTree.items);
// const insertCount = computed(() => {
//   return parseInt(textInsertCount.value, 10) || 1;
// });
// const label = (h, node) => {
//   console.info(node)
//   return `${node.label}`;
// };
// const getInsertItem = () => {
//   const value = virtualTree.getValue();
//   return {
//     value,
//   };
// };
// const append = (node) => {
//   if (!node) {
//     for (let index = 0; index < insertCount.value; index += 1) {
//       const item = getInsertItem();
//       tree.value.appendTo('', item);
//     }
//   } else {
//     for (let index = 0; index < insertCount.value; index += 1) {
//       const item = getInsertItem();
//       tree.value.appendTo(node.value, item);
//     }
//   }
// };
// const remove = (node) => {
//   node.remove();
// };


// 智能生成---处理输入框
const quick_conf_icon_1=require("@/assets/images/1-填空.png");
const quick_conf_icon_2=require("@/assets/images/2-选择.png");
const quick_conf_icon_3=require("@/assets/images/3-作文.png");
const quick_conf_icon_4=require("@/assets/images/4-课程设计.png");
const quick_conf_icon_5=require("@/assets/images/5-论述.png");
const quick_conf_icon_6=require("@/assets/images/6-判断.png");
const quick_conf_icon_7=require("@/assets/images/7-名词解释.png");
const quick_conf_icon_8=require("@/assets/images/8-多选.png");
const quick_conf_icon_9=require("@/assets/images/9-材料分析.png");
const quick_conf_icon_10=require("@/assets/images/10-简答.png");

const quick_conf_icon_data=[
  {id:0,q_name:'填空',icon_path:quick_conf_icon_1},
{id:1,q_name:'选择',icon_path:quick_conf_icon_2},
{id:2,q_name:'作文',icon_path:quick_conf_icon_3},
{id:3,q_name:'课程设计',icon_path:quick_conf_icon_4},
{id:4,q_name:'论述',icon_path:quick_conf_icon_5},
{id:5,q_name:'判断',icon_path:quick_conf_icon_6},
{id:6,q_name:'名词解释',icon_path:quick_conf_icon_7},
{id:7,q_name:'多选',icon_path:quick_conf_icon_8},
{id:8,q_name:'材料分析',icon_path:quick_conf_icon_9},
{id:9,q_name:'简答',icon_path:quick_conf_icon_10}

];
// const quick_conf_icon_data=[
//   {id:0,q_name:'填空',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:1,q_name:'选择',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:2,q_name:'作文',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:3,q_name:'课程设计',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:4,q_name:'论述',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:5,q_name:'判断',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:6,q_name:'名词解释',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:7,q_name:'多选',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:8,q_name:'材料分析',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// {id:9,q_name:'简答',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect}
// ];


const quick_conf_input_0= ref(0);
const quick_conf_input_ary=ref([0,0,0,0,0,0,0,0,0,0]);
const quick_conf_input_index=ref(-1);
const quick_conf_click_enter=(id,e)=>{
  console.info(id,e)
  quick_conf_input_index.value=id;
  quick_conf_input_0.value=quick_conf_input_ary.value[id];
}
const quick_conf_click_sure=(id,e)=>{
  console.info(id,quick_conf_input_0.value,e)
  quick_conf_input_index.value=-1;
  let temp_value= quick_conf_input_0.value;
  quick_conf_input_ary.value.splice(id,1,temp_value);
  // console.info(quick_conf_input_ary)
  quick_conf_input_0.value=0;
}
const quick_conf_click_cancel=()=>{
  quick_conf_input_index.value=-1;
}

//轮播图
const imagePaths = [
                    '@/assets/images/knowledgeImg.png', 
                    '@/assets/images/fileImg.png', 
                    '@/assets/images/IncorrectImg.png', 
                  ];

const indicatorPaths = {
  normal: [
            '@/assets/images/knowledgeIcon.png', 
            '@/assets/images/fileIcon.png', 
            '@/assets/images/IncorrectIcon.png', 
  ],
  selected: [
              '@/assets/images/knowledgeIcon-selected.png', 
              '@/assets/images/fileIcon-selected.png', 
              '@/assets/images/IncorrectIcon-selected.png', 
  ]
};







// 生命周期钩子
onMounted(() => {
  console.log(`onMounted.`)
})

</script>

<style scoped>
@import './mytheme.css';
.t-space{
  width: 100%;
}
header{
  background-color: var(--td-success-color-5);
}
main,section{
  background-color: white; 
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

.swiperIcon {
  display: flex;
  margin-top: 20px;
  justify-content: center;
} 
.iconImage{
  margin-right: 40px;
}

/* 轮播图 */

</style>