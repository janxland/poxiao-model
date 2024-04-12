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
                    <!-- <router-link :to="{path:'/incorrect'}">错题本</router-link> -->
                    <router-link to="/incorrect">错题本</router-link>
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
            <!-- <t-layout class="fill-layout"> -->
            <router-view></router-view>
            <!-- </t-layout> -->
          </t-content>
        </t-layout>
      </div>

    </t-space>


    <!-- 弹出框---登录1 -->
    <t-space v-if="!isLogin">
    <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
    <t-dialog 
      v-model:visible="visible"
      header="对话框标题"
      width="36%"
      placement="center"

      :closeOnOverlayClick="false"
      showOverlay
      mode="model"
      showInAttachedElement
      destroyOnClose
      :footer="false"

      :confirm-on-enter="true"
      :on-cancel="onCancel"
      :on-esc-keydown="onEscKeydown"
      :on-close-btn-click="onCloseBtnClick"
      :on-overlay-click="onOverlayClick"
      :on-close="close"
      :on-confirm="onConfirmAnother"
    >
        <template #header>
          <t-row class="login-header-main"> 
            <t-col class="login-header-bg">
              <t-image  @click="headerImageClick1" :src="phone_icon" fit="fill" :style="{ width: '100px', height: '100px',borderTopLeftRadius:'30px' }"></t-image>
            </t-col> 
            <!-- <t-col><t-image :src="imgurl" fit="fill" :style="{ width: '20px', height: '20px',borderRadius:'100%' }"></t-image></t-col> -->
            <t-col>
              <t-row>
                <t-col>
                  
                </t-col>
                <t-col class="login-header-info">
                  <icon name="arrow-left" color="blue" size="17px" /> 
                  <span class="login-header-info-phone">手机验证码登录</span>
                </t-col>
              </t-row>
            </t-col>
          </t-row>
        </template>
        <template #body>
          <div class="login-zone">
          <!-- <t-space direction="vertical" style="width: 100%"> -->
            <div class="login-title">
              微信扫码一键登录
            </div> 
            <div class="login-subtitle">
              未注册的微信号将自动注册账户
            </div>
            <div class="login-barcode">
              <div class="login-barcode-image" > 
                <t-image :src="barcode" fit="fill" :style="{ width: '180px', height: '180px',margin:'6px 6px'}"></t-image>
              </div>
            </div>
            <div class="login-type">
                <div class="login-type-item"> 
                  <t-image :src="xl_icon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius:'50%'}"></t-image>
                </div>
                <div class="login-type-item">
                  <t-image :src="qq_icon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius:'50%'}"></t-image>
                </div>
            </div>
              
              
            <div class="login-info">
              <p>登录即代表同意用户服务协议</p>
            </div>
            <!-- <t-pagination v-model="current" v-model:pageSize="pageSize" :total="30" /> -->
          <!-- </t-space> -->
        </div>
      </template>
      
    </t-dialog>
  </t-space>
  <!-- 弹出框 end---登录1 -->

   <!-- 弹出框---登录2 -->
   <t-space v-if="!isLogin2">
    <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
    <t-dialog 
      v-model:visible="visible2"
      header="对话框标题"
      width="36%"
      placement="center"

      :closeOnOverlayClick="false"
      showOverlay
      mode="model"
      showInAttachedElement
      destroyOnClose
      :footer="false"

      :confirm-on-enter="true"
      :on-cancel="onCancel2"
      :on-esc-keydown="onEscKeydown2"
      :on-close-btn-click="onCloseBtnClick2"
      :on-overlay-click="onOverlayClick2"
      :on-close="close2"
      :on-confirm="onConfirmAnother2"
    >
        <template #header>
          <t-row class="login-header-main"> 
            <t-col class="login-header-bg">
              <t-image @click="headerImageClick2" :src="barcode" fit="fill" :style="{ width: '100px', height: '100px',borderTopLeftRadius:'30px' }"></t-image>
            </t-col> 
            <!-- <t-col><t-image :src="imgurl" fit="fill" :style="{ width: '20px', height: '20px',borderRadius:'100%' }"></t-image></t-col> -->
            <t-col>
              <t-row>
                <t-col>
                  
                </t-col>
                <t-col class="login-header-info">
                  <icon name="arrow-left" color="blue" size="17px" /> 
                  <span class="login-header-info-phone">手机扫码登录</span>
                </t-col>
              </t-row>
            </t-col>
          </t-row>
        </template>
        <template #body>
          <div class="login-zone">
          <!-- <t-space direction="vertical" style="width: 100%"> -->
            <div class="login-title">
              短信验证码登录
            </div> 
            <div class="login-subtitle">
              未注册的微信号将自动注册账号
            </div>

            <form>
            <div class="login-barcode"> 
              <div class="login-barcode-input" >  
                <!-- <t-image :src="barcode" fit="fill" :style="{ width: '200px', height: '200px',margin:'6px 6px'}"></t-image> -->
                <t-space direction="vertical">
                <t-row>
                    
                  <t-input placeholder="请输入手机号码(+86)"   maxlength="11">
                    <template #suffixIcon>
                      <t-button class="t-input-button">获取验证码</t-button>
                    </template>
                  </t-input>
                  </t-row>
                  <t-row>
                    <t-input placeholder="请输入收到的短信验证码" clearable></t-input>
                  </t-row>
                </t-space>  
              </div>
            </div>
            <div class="login-type">
                <!-- <div class="login-type-item"> 
                  <t-image :src="xl_icon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius:'50%'}"></t-image>
                </div>
                <div class="login-type-item">
                  <t-image :src="qq_icon" fit="fill" :style="{ width: '40px', height: '40px',borderRadius:'50%'}"></t-image>
                </div> -->
                <t-button type="submit" size="large" style="border-radius:12px;">登录</t-button>
            </div>
            </form>
              
            <div class="login-info">
              <p>登录即代表同意用户服务协议</p>
            </div>
            <!-- <t-pagination v-model="current" v-model:pageSize="pageSize" :total="30" /> -->
          <!-- </t-space> -->
        </div>
      </template>
      
    </t-dialog>
  </t-space>
  <!-- 弹出框 end---登录2 -->


  <!-- 弹出框---兴趣选项 -->
  <t-space v-if="!isLogin3" class="">
    <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
    <t-dialog 
      v-model:visible="visible3"
      header="对话框标题"
      width="36%"
      placement="center"

      :closeOnOverlayClick="false"
      showOverlay
      mode="model"
      showInAttachedElement
      destroyOnClose
      :footer="false"

      :confirm-on-enter="true"
      :on-cancel="onCancel3"
      :on-esc-keydown="onEscKeydown3"
      :on-close-btn-click="onCloseBtnClick3"
      :on-overlay-click="onOverlayClick3"
      :on-close="close3"
      :on-confirm="onConfirmAnother3"
    >
        <template #header>
          <t-row class="login-header-main"> 
             
            
          </t-row>
        </template>
        <template #body>
          <div class="login-zone">
          <!-- <t-space direction="vertical" style="width: 100%"> -->
            <div class="login-title">
              选择您感兴趣的复习领域
            </div>

            <form>
            <div class="login-barcode"> 
              <div class="interest-input" >  
                <t-space direction="vertical">
                  
                  <t-row v-for="item in interestList" :key="item.code" :index=index>
                    <t-space direction="vertical">
                    <div class="interest-list-title">{{ item.name }}</div>
                    <div class="interest-list">
                      <div class="interest-list-item" v-for="(child,index1) in item.children"  :key="child.code" :index=index1>
                        <t-check-tag @click="this.checked=true" :checked="index1%3==0?true:false" shape="round" size="medium" >{{ child.name }} </t-check-tag>
                      </div>
                    </div>
                    <!-- <t-divider /> -->
                  </t-space>
                  </t-row>
                </t-space>  
              </div> 
            </div>
            <div class="login-type">
                <t-button style="border-radius:999px;" type="submit" size="large">开始体验</t-button>
            </div> 
            </form>
        </div>
      </template>
      
    </t-dialog>
  </t-space>
  <!-- 弹出框 end---兴趣选项 -->

  </div>
</template>

<script setup>
// import { computed, reactive, ref } from 'vue'
import {  ref,onMounted  } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
// import { MessagePlugin } from 'tdesign-vue-next';
// import { Delete1Icon } from 'tdesign-icons-vue-next';
// import { ThumbUpIcon, ChatIcon, ShareIcon } from 'tdesign-icons-vue-next';

// const loading = ref(false);
const isLogin= ref(true);
const isLogin2= ref(true);
const isLogin3= ref(true);
const imgurl=require("@/assets/images/头像.png");
const userIcon=require("@/assets/images/R-C.jpg");
// const quickItemIcon=require("@/assets/images/icon-2-42.png");
// const quickItemIconSelect=require("@/assets/images/icon-2-42-select.png");
// const quickItemIShareIcon=require("@/assets/images/分享.png");

const logo=require("@/assets/images/logo.png"); 
// const tipsWords=[
//       {"id":'1001',"title":'大头兵1',"counts":'11.2w',"content":'1依赖发送到水电费时代峰峻欧舒丹1依赖发送到水电费时代峰峻欧舒丹'},
//       {"id":'1002',"title":'大头兵2',"counts":'13.2w',"content":'2依赖发送到水电费时代峰峻欧舒丹'},
//       {"id":'1003',"title":'大头兵3',"counts":'10.2w',"content":'3依赖发送到水电费时代峰峻欧舒丹3依赖发送到水电费时代峰峻欧舒丹3依赖发送到水电费时代峰峻欧舒丹3依赖发送到水电费时代峰峻欧舒丹'},
//       {"id":'1004',"title":'大头兵4',"counts":'9.2w',"content":'4依赖发送到水电费时代峰峻欧舒丹'},
//     ];
// const computeContentLength = (val)=>{
//   return val;
// }


// 对话框1
const visible = ref(false);
const barcode = require("@/assets/images/QRcode_A1.jpg");
const qq_icon = require("@/assets/images/QQ-circle-fill.png");
const xl_icon = require("@/assets/images/xinlang-2x.png");
const phone_icon = require("@/assets/images/手机.png");
// const current = ref(1);
// const pageSize = ref(10);
// const onClick = (context) => {
//   console.log('点击了确认按钮，弹出弹窗 onClick', context);
//   visible.value = true;
// };
const onConfirmAnother = (context) => {
  console.log('点击了确认按钮 onConfirmAnother', context);
  visible.value = false;
};
const close = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发 close', context);
};
const onCancel = (context) => {
  console.log('点击了取消按钮 onCancel', context);
};
const onEscKeydown = (context) => {
  console.log('按下了ESC onEscKeydown', context);
};
const onCloseBtnClick = (context) => {
  console.log('点击了关闭按钮 onCloseBtnClick', context);
};
const onOverlayClick = (context) => {
  console.log('点击了蒙层 onOverlayClick', context);
  visible.value = true;
};
const headerImageClick1=()=>{
  visible.value = false;
  visible2.value = true;
}

// 对话框2
const visible2 = ref(false);
const onConfirmAnother2 = (context) => {
  console.log('点击了确认按钮 onConfirmAnother', context);
  visible2.value = false;
};
const close2 = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发 close', context);
};
const onCancel2 = (context) => {
  console.log('点击了取消按钮 onCancel', context);
};
const onEscKeydown2 = (context) => {
  console.log('按下了ESC onEscKeydown', context);
};
const onCloseBtnClick2 = (context) => {
  console.log('点击了关闭按钮 onCloseBtnClick', context);
};
const onOverlayClick2 = (context) => {
  console.log('点击了蒙层 onOverlayClick', context);
  visible2.value = true;
};
const headerImageClick2=()=>{
  visible2.value = false;
  visible.value = true;
}


// 对话框3
const interestList=[
  {name:'小学',code:'10001',children:[
    {name:'语文',code:'1000101'},
    {name:'数学',code:'1000102'},
    {name:'英语',code:'1000103'},
    {name:'美术',code:'1000104'},
    {name:'科学',code:'1000105'}
  ]},
  {name:'中学',code:'10002',children:[
    {name:'语文',code:'1000201'},
    {name:'数学',code:'1000202'},
    {name:'英语',code:'1000203'},
    {name:'物理',code:'1000204'},
    {name:'化学',code:'1000205'},
    {name:'政治',code:'1000206'},
    {name:'生物',code:'1000207'},
    {name:'地理',code:'1000208'},
    {name:'历史',code:'1000209'},
  ]},
  {name:'大学',code:'10003',children:[
    {name:'哲学',code:'1000301'},
    {name:'经济学',code:'1000302'},
    {name:'财政学',code:'1000303'},
    {name:'金融学',code:'1000304'},
    {name:'经济与贸易',code:'1000305'},
    {name:'法学',code:'1000306'},
    {name:'政治学',code:'1000307'},
    {name:'社会学',code:'1000308'},
    {name:'民族学',code:'1000309'},
  ]}
];
const visible3 = ref(false);
const onConfirmAnother3 = (context) => {
  console.log('点击了确认按钮 onConfirmAnother', context);
  visible3.value = false;
};
const close3 = (context) => {
  console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发 close', context);
};
const onCancel3 = (context) => {
  console.log('点击了取消按钮 onCancel', context);
};
const onEscKeydown3 = (context) => {
  console.log('按下了ESC onEscKeydown', context);
};
const onCloseBtnClick3 = (context) => {
  console.log('点击了关闭按钮 onCloseBtnClick', context);
};
const onOverlayClick3 = (context) => {
  console.log('点击了蒙层 onOverlayClick', context);
  visible3.value = true;
};


// 文件上传
// const files = ref([]);

// const handleFail = ({ file }) => {
//   MessagePlugin.error(`文件 ${file.name} 上传失败`);
// };

// const beforeUpload = (file) => {
//   if (file.size > 5 * 1024 * 1024) {
//     MessagePlugin.warning('上传的文件不能大于5M');
//     return false;
//   }

//   return true;
// };
// const uploadTips = ref('已上传'+files.value.length+'个文件，复习大师可以基于您上传的智能生成问题');

// function handleSelectChange(files, context) {
//   console.log('onSelectChange', files, context);
// }

// const handleSuccess = (params) => {
//   console.log('success', params);
//   MessagePlugin.success('上传成功');
// };

// 多文件上传，一个文件一个请求场景，每个文件也会单独触发上传成功的事件
// const onOneFileSuccess = (params) => {
//   console.log('onOneFileSuccess', params);
// };

// const formatResponse = (res) => {
//   console.log('formatResponse', res);
//   return res;
//   // return { error: '上传失败，请重试' };
  
// };



// // 树形组件 
// // const allLevels = [2, 1];
// function createTreeData() {
//   let cacheIndex = 0;
//   function getValue() {
//     cacheIndex += 1;
//     return `t${cacheIndex}`;
//   }
//   // function createNodes(items, level) {
//   //   const count = allLevels[level];
//   //   if (count) {
//   //     let index = 0;
//   //     for (index = 0; index < count; index += 1) {
//   //       const value = getValue();
//   //       const item = {
//   //         label:'N_'+value,value:'V_'+value
//   //       };
//   //       items.push(item);
//   //       if (allLevels[level + 1]) {
//   //         item.children = [];
//   //         createNodes(item.children, level + 1);
//   //       }
//   //     }
//   //   }
//   // }
//   let items = [];
//   items=[{
//     label:'考研数学',value:'1',children:[
//       {label:'选择题-3，材料分析题-5',value:'11',children:[]}
//     ]
//   },{
//     label:'教师资格证科目2',value:'2',children:[
//       {label:'作文题-3，判断题-15，论述题-1',value:'22',children:[]}
//     ]
//   }];
//   // createNodes(items, 0);
//   return {
//     getValue,
//     items,
//   };
// }
// const virtualTree = createTreeData();
// console.info(virtualTree)
// const tree = ref();
// const transition = ref(true);
// // const textInsertCount = ref('1');
// const showLine = ref(false);
// // const showIcon = (h, node) => {
// //   let name = 'file';
// //   // node.children is undefined on some cases
// //   if (node.getChildren && node.getChildren(false)) {
// //     if (node.expanded) {
// //       name = 'folder-open';
// //       if (node.loading) {
// //         name = 'loading';
// //       }
// //     } else {
// //       name = 'folder';
// //     }
// //   }
// //   return `<Icon name=${name} />`;
// // };


// const isCheckable = ref(false);
// // const isOperateAble = ref(true);
// const items = ref(virtualTree.items);
// // const insertCount = computed(() => {
// //   return parseInt(textInsertCount.value, 10) || 1;
// // });
// // const label = (h, node) => {
// //   console.info(node)
// //   return `${node.label}`;
// // };
// // const getInsertItem = () => {
// //   const value = virtualTree.getValue();
// //   return {
// //     value,
// //   };
// // };
// // const append = (node) => {
// //   if (!node) {
// //     for (let index = 0; index < insertCount.value; index += 1) {
// //       const item = getInsertItem();
// //       tree.value.appendTo('', item);
// //     }
// //   } else {
// //     for (let index = 0; index < insertCount.value; index += 1) {
// //       const item = getInsertItem();
// //       tree.value.appendTo(node.value, item);
// //     }
// //   }
// // };
// // const remove = (node) => {
// //   node.remove();
// // };


// // 智能生成---处理输入框
// const quick_conf_icon_1=require("@/assets/images/1-填空.png");
// const quick_conf_icon_2=require("@/assets/images/2-选择.png");
// const quick_conf_icon_3=require("@/assets/images/3-作文.png");
// const quick_conf_icon_4=require("@/assets/images/4-课程设计.png");
// const quick_conf_icon_5=require("@/assets/images/5-论述.png");
// const quick_conf_icon_6=require("@/assets/images/6-判断.png");
// const quick_conf_icon_7=require("@/assets/images/7-名词解释.png");
// const quick_conf_icon_8=require("@/assets/images/8-多选.png");
// const quick_conf_icon_9=require("@/assets/images/9-材料分析.png");
// const quick_conf_icon_10=require("@/assets/images/10-简答.png");

// const quick_conf_icon_data=[
//   {id:0,q_name:'填空',icon_path:quick_conf_icon_1},
// {id:1,q_name:'选择',icon_path:quick_conf_icon_2},
// {id:2,q_name:'作文',icon_path:quick_conf_icon_3},
// {id:3,q_name:'课程设计',icon_path:quick_conf_icon_4},
// {id:4,q_name:'论述',icon_path:quick_conf_icon_5},
// {id:5,q_name:'判断',icon_path:quick_conf_icon_6},
// {id:6,q_name:'名词解释',icon_path:quick_conf_icon_7},
// {id:7,q_name:'多选',icon_path:quick_conf_icon_8},
// {id:8,q_name:'材料分析',icon_path:quick_conf_icon_9},
// {id:9,q_name:'简答',icon_path:quick_conf_icon_10}

// ];
// // const quick_conf_icon_data=[
// //   {id:0,q_name:'填空',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:1,q_name:'选择',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:2,q_name:'作文',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:3,q_name:'课程设计',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:4,q_name:'论述',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:5,q_name:'判断',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:6,q_name:'名词解释',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:7,q_name:'多选',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:8,q_name:'材料分析',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect},
// // {id:9,q_name:'简答',icon_path:quickItemIcon,icon_path_select:quickItemIconSelect}
// // ];


// const quick_conf_input_0= ref(0);
// const quick_conf_input_ary=ref([0,0,0,0,0,0,0,0,0,0]);
// const quick_conf_input_index=ref(-1);
// const quick_conf_click_enter=(id,e)=>{
//   console.info(id,e)
//   quick_conf_input_index.value=id;
//   quick_conf_input_0.value=quick_conf_input_ary.value[id];
// }
// const quick_conf_click_sure=(id,e)=>{
//   console.info(id,quick_conf_input_0.value,e)
//   quick_conf_input_index.value=-1;
//   let temp_value= quick_conf_input_0.value;
//   quick_conf_input_ary.value.splice(id,1,temp_value);
//   // console.info(quick_conf_input_ary)
//   quick_conf_input_0.value=0;
// }
// const quick_conf_click_cancel=()=>{
//   quick_conf_input_index.value=-1;
// }

// 生命周期钩子
onMounted(() => {
  // console.log(`The initial count is ${visible2.value}.`)
  visible.value = true;
  visible2.value = true;
  visible3.value = true;
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
</style>