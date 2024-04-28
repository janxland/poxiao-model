<template>
  <div>
    <div>

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

      <div class="w-[100%]">
        <div class="w-[100%] flex flex-row">
          <div class="sticky z-[2] h-[100vh] top-[0] select-none text-white w-[200px]" :class="{ 'hiddenNav': route.meta.hiddenNav }">
            <div class="h-[100%] w-[200px]">
              <div class="h-[100%] flex flex-col justify-between items-center" style="background:linear-gradient(-210deg, rgb(57, 76, 200), rgb(61, 101, 191), rgb(43, 72, 146))">
                <div class="mt-[32px]">
                  <div class="flex flex-row justify-center items-center">
                    <t-image class="bg-[transparent] w-[32px] h-[32px] mr-[10px]" :src="logo"></t-image>
                    <router-link class="text-[20px]" :to="{ path: '/' }">复习大师</router-link>
                  </div>

                </div>
                <div class="m-lf-layout-content cursor-pointer  transition">
                  <div class="m-lf-layout-row" @click="router.push('/myexam')">
                    <icon name="book" size="20px" class="w-[30px] h-[30px] mr-4" />
                    <!-- <router-link :to="{path:'/incorrect'}">错题本</router-link> -->
                    我的题库
                  </div>
                  <!-- <div class="m-lf-layout-row">
                    <t-image :src="imgurl" fit="fill" :style="{ width: '30px', height: '30px',borderRadius:'100%' }"></t-image>
                    <router-link :to="{path:'/knowledge'}">知识图谱</router-link>
                  </div> -->
                  <div class="m-lf-layout-row" @click="router.push('/incorrect')">
                    <icon name="system-log" size="20px" class="w-[30px] h-[30px] mr-4" />
                    <!-- <router-link :to="{path:'/incorrect'}">错题本</router-link> -->
                    错题本
                  </div>
                  <div class="m-lf-layout-row" @click.stop="recordShow = !recordShow"
                    :class="recordShow ? 'bg-record_bg' : ''">
                    <icon name="time" size="20px" class="w-[30px] h-[30px] mr-4" />
                    历史记录
                  </div>
                  <div class="absolute h-[50vh] w-[20vw] top-[20vh] left-[200px] z-[9999] rounded-2xl p-4"
                    v-show="recordShow" id="record" style="background-color: rgba(26, 71, 126, 1);" @click.stop="">
                    <div class="text-left ">历史记录</div>
                    <div class="flex items-center mt-2">
                      <t-input placeholder="搜索历史出题记录" class="flex-1 *:bg-record_bg  *:border-0 ">
                        <template #suffixIcon>
                          <icon name="search" style="cursor: pointer;" color="white"></icon>
                        </template>
                      </t-input>
                      <div class="w-9 h-9 leading-9 bg-record_bg rounded-full ml-2">
                        <icon name="delete" size="20" color="white"></icon>
                      </div>
                    </div>
                    <div class="mt-4">
                      <div class="flex flex-nowrap">
                        <div v-for="i, index in recordTypeList"
                          class="w-1/2 text-gray-300 cursor-pointer transition-all duration-300 transform" :class="activeRecord == index ? 'text-green-400' : ''" :key="'recordList' + index"
                          @click="activeRecord = index">
                          {{ i }}
                          <div class="h-1  transition-all duration-300 transform"
                            :class="activeRecord == index ? 'bg-green-400' : 'bg-slate-700'"></div>
                        </div>
                      </div>
                    </div>
                    <div class="h-[350px] mt-4 overflow-auto">
                      <div
                        class="bg-record_bg rounded-2xl text-left px-4 py-2 flex items-center justify-between my-1 cursor-pointer"
                        @click="router.push('/examPage?id='+i.examId)" v-for="i, index in recordList.filter(i=>i.type == recordTypeList[activeRecord])"
                        :key="'recordListData' + index">
                        <div class="w-5/6 text-ellipsis text-nowrap overflow-hidden">{{ i.qustionsContent }}</div>
                        <div class="h-[25px] w-[25px] rounded-full "
                          :style="{ background: +i.examStatus == 2 ? 'rgba(67, 207, 124, 1)' : 'rgba(255, 87, 51, 1)' }">
                          <icon :name="+i.examStatus == 2 ? 'check' : 'error'" color="white" size="25"></icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Foot info  -->
                <div class="flex p-[10px] flex-col h-[200px] justify-around text-white">
                  <div class="flex flex-row justify-center items-center">
                    <t-avatar class="w-[32px] h-[32px] mr-[10px]" :image="userStore.user.avatar" :hide-on-load-failed="false" />
                    <router-link :to="{ path: '/myindex' }">{{userStore.user.nickname}}</router-link>
                  </div>
                  <div>在线客服</div>
                  <div class="text-[12px]">版本：V1.29</div>
                  <div class="text-[12px]">《复习大师用户协议》|《复习大师隐私策略》</div>
                </div>
              </div>

            </div>

          </div>
          <div class="flex-1" @click="recordShow = false">
            <!-- <t-layout class="fill-layout"> -->
            <router-view></router-view>
            <!-- </t-layout> -->
          </div>
        </div>
      </div>

    </div>


    <!-- 弹出框---登录1 -->
    <t-space v-if="!isLogin">
      <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
      <t-dialog v-model:visible="visible" header="对话框标题" width="36%" placement="center" :closeOnOverlayClick="false"
        showOverlay mode="model" showInAttachedElement destroyOnClose :footer="false" :confirm-on-enter="true"
        :on-cancel="onCancel" :on-esc-keydown="onEscKeydown" :on-close-btn-click="onCloseBtnClick"
        :on-overlay-click="onOverlayClick" :on-close="close" :on-confirm="onConfirmAnother">
        <template #header>
          <t-row class="login-header-main">
            <t-col class="login-header-bg">
              <t-image @click="headerImageClick1" :src="phone_icon" fit="fill"
                :style="{ width: '100px', height: '100px', borderTopLeftRadius: '30px' }"></t-image>
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
              <div class="login-barcode-image">
                <t-image :src="barcode" fit="fill"
                  :style="{ width: '180px', height: '180px', margin: '6px 6px' }"></t-image>
              </div>
            </div>
            <div class="login-type">
              <div class="login-type-item">
                <t-image :src="xl_icon" fit="fill"
                  :style="{ width: '40px', height: '40px', borderRadius: '50%' }"></t-image>
              </div>
              <div class="login-type-item">
                <t-image :src="qq_icon" fit="fill"
                  :style="{ width: '40px', height: '40px', borderRadius: '50%' }"></t-image>
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
    <div v-if="!isLogin2">
      <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
      <t-dialog v-model:visible="visible2" header="对话框标题" width="36%" placement="center" :closeOnOverlayClick="false"
        showOverlay mode="model" showInAttachedElement destroyOnClose :footer="false" :confirm-on-enter="true"
        :on-cancel="onCancel2" :on-esc-keydown="onEscKeydown2" :on-close-btn-click="onCloseBtnClick2"
        :on-overlay-click="onOverlayClick2" :on-close="close2" :on-confirm="onConfirmAnother2">
        <template #header>
          <t-row class="login-header-main">
            <t-col class="login-header-bg">
              <t-image @click="headerImageClick2" :src="barcode" fit="fill"
                :style="{ width: '100px', height: '100px', borderTopLeftRadius: '30px' }"></t-image>
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
                <div class="login-barcode-input">
                  <!-- <t-image :src="barcode" fit="fill" :style="{ width: '200px', height: '200px',margin:'6px 6px'}"></t-image> -->
                  <t-space direction="vertical">
                    <t-row>

                      <t-input v-model="userLogin3Input.phone" placeholder="请输入手机号码(+86)" maxlength="11">
                        <template #suffixIcon>
                          <t-button class="t-input-button" :disable="userLogin3Input.stayTime != 0"
                            @click="getSmsCodeHandler">{{ userLogin3Input.stayTime != 0 ? `验证码已发送 (
                            ${userLogin3Input.stayTime} s)` : "获取验证码" }}</t-button>
                        </template>
                      </t-input>
                    </t-row>
                    <t-row>
                      <t-input v-model="userLogin3Input.smsCode" placeholder="请输入收到的短信验证码" clearable></t-input>
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
                <t-button @click="login3Handler" type="button" size="large" style="border-radius:12px;">登录</t-button>
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
    </div>
    <!-- 弹出框 end---登录2 -->


    <!-- 弹出框---兴趣选项 -->
    <div v-if="!isLogin3">
      <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
      <t-dialog v-model:visible="visible3" header="对话框标题" width="36%" placement="center" :closeOnOverlayClick="false"
        showOverlay mode="model" showInAttachedElement destroyOnClose :footer="false" :confirm-on-enter="true"
        :on-cancel="onCancel3" :on-esc-keydown="onEscKeydown3" :on-close-btn-click="onCloseBtnClick3"
        :on-overlay-click="onOverlayClick3" :on-close="close3" :on-confirm="onConfirmAnother3">
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
                <div class="interest-input">
                  <t-space direction="vertical">

                    <t-row v-for="item in interestList" :key="item.code" :index=index>
                      <t-space direction="vertical">
                        <div class="interest-list-title">{{ item.name }}</div>
                        <div class="interest-list">
                          <div class="interest-list-item" v-for="(child, index1) in item.children" :key="child.code"
                            :index=index1>
                            <t-check-tag @click="this.checked = true" :checked="index1 % 3 == 0 ? true : false"
                              shape="round" size="medium">{{ child.name }} </t-check-tag>
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
    </div>
    <!-- 弹出框 end---兴趣选项 -->

    <div v-if="!isLogin4">
      <!-- <t-button theme="primary" @click="onClick">基础确认对话框</t-button> -->
      <t-dialog v-model:visible="visible4" header=" " width="36%" placement="center" :closeOnOverlayClick="false"
      showOverlay mode="model" showInAttachedElement destroyOnClose :footer="false" :confirm-on-enter="true">
        
        <template #body>
          <t-row justify="center">
            <div class="title-text">
              完善您的个人信息
            </div>
          </t-row>
          <div class="gender-selection">
            <label class="gender-option" for="male">
              <input type="radio" id="male" value="male" v-model="selectedGender" name="gender">
              <t-image
                :src="avatar.male"
                :style="{ width: '100px', height: '100px' }"
                shape="circle"
                fit="cover"
              />
              <span :class="{ 'selected': selectedGender === 'male' }">男</span>
            </label>
            <label class="gender-option" for="female">
              <input type="radio" id="female" value="female" v-model="selectedGender" name="gender">
              <t-image
                :src="avatar.female"
                :style="{ width: '100px', height: '100px'}"
                shape="circle"
                fit="cover"
              />
              <span :class="{ 'selected': selectedGender === 'female' }">女</span>
            </label>
          </div>
          <t-row justify="center">
            <div class="nickname-input">
              <span>创建昵称:</span>
              <t-input
              placeholder="支持英文字母、汉字、数字，长度不超过8个字符" 
              clearable 
              :style="{ width: '320px', borderRadius: '10px'}"
              ></t-input>
              <t-image
                :src="availableIcon"
                shape="circle"
                fit="cover"
                :style="{ marginLeft: '10px', marginRight: '5px'}"
              />
              <span :style="{ color: isAvailable ? 'green' : 'red' }">
                {{ isAvailable ? '该昵称可用' : '该昵称不可用' }}
              </span>
            </div>
          </t-row>
          <t-row justify="center">
            <t-button 
            :style="{ width: '389px', borderRadius: '15px', height: '37px'}">
              下一步
            </t-button>
          </t-row>
          
          
        </template>
      </t-dialog>
    </div>

  </div>
</template>

<script setup>
// import { computed, reactive, ref } from 'vue'
import { ref, onMounted, watch } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
// import { MessagePlugin } from 'tdesign-vue-next';
// import { Delete1Icon } from 'tdesign-icons-vue-next';
// import { ThumbUpIcon, ChatIcon, ShareIcon } from 'tdesign-icons-vue-next';

// const loading = ref(false);
import { useRoute, useRouter } from 'vue-router';
import { login, getSmsCode } from '@/api/user';
import { getQuestionList } from '@/api/question'
import { useUserStore } from '@/store/user';
const userStore = useUserStore();
// 获取当前路由对象  
const route = useRoute();
const router = useRouter()
const isLogin = ref(true);
const isLogin2 = ref(false);
localStorage.getItem("token") ? isLogin2.value = true : isLogin2.value = false;
const isLogin3 = ref(true);
const isLogin4 = ref(false);
const imgurl = require("@/assets/images/头像.png");
const userIcon = require("@/assets/images/R-C.jpg");
// const quickItemIcon=require("@/assets/images/icon-2-42.png");
// const quickItemIconSelect=require("@/assets/images/icon-2-42-select.png");
// const quickItemIShareIcon=require("@/assets/images/分享.png");

const logo = require("@/assets/images/logo.png");
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
const headerImageClick1 = () => {
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
const headerImageClick2 = () => {
  visible2.value = false;
  visible.value = true;
}

//出题记录
const recordList = ref([
  {
    examId: 8,
    examStatus: "1",
    qustions: "30,31,32,33,34,35,38,39,40",
    qustionsContent: "小学数学选择题",
    type: '文件出题'
  }, {
    type: '知识点出题',
    examId: 9,
    examStatus: "1",
    qustions: "30,31,32,33,34,35,38,39,40",
    qustionsContent: "英语考研题"
  }])
const recordTypeList = ref(['知识点出题','文件出题'])
const activeRecord = ref(0)
const recordShow = ref(false)
const getRecordList = () => {
  getQuestionList({}).then(res => {
    // recordList.value = res.data.data
    console.log(res.data.data)
  })
}
watch(() => route.fullPath, () => {
  recordShow.value = false
})
// getRecordList()
// 对话框3
const interestList = [
  {
    name: '小学', code: '10001', children: [
      { name: '语文', code: '1000101' },
      { name: '数学', code: '1000102' },
      { name: '英语', code: '1000103' },
      { name: '美术', code: '1000104' },
      { name: '科学', code: '1000105' }
    ]
  },
  {
    name: '中学', code: '10002', children: [
      { name: '语文', code: '1000201' },
      { name: '数学', code: '1000202' },
      { name: '英语', code: '1000203' },
      { name: '物理', code: '1000204' },
      { name: '化学', code: '1000205' },
      { name: '政治', code: '1000206' },
      { name: '生物', code: '1000207' },
      { name: '地理', code: '1000208' },
      { name: '历史', code: '1000209' },
    ]
  },
  {
    name: '大学', code: '10003', children: [
      { name: '哲学', code: '1000301' },
      { name: '经济学', code: '1000302' },
      { name: '财政学', code: '1000303' },
      { name: '金融学', code: '1000304' },
      { name: '经济与贸易', code: '1000305' },
      { name: '法学', code: '1000306' },
      { name: '政治学', code: '1000307' },
      { name: '社会学', code: '1000308' },
      { name: '民族学', code: '1000309' },
    ]
  }
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


//对话框4
const visible4 = ref(true);
const selectedGender = ref('');
const availableIcon = require('@/assets/images/right.png')
const isAvailable = ref(true);

const avatar = {
  male: require('@/assets/images/male.png'),
  female: require('@/assets/images/female.png'),
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
//登录逻辑
const userLogin3Input = ref({
  stayTime: 0,
  phone: "",
  smsCode: ""
});
// 短信验证码登录
const getSmsCodeHandler = () => {
  const phoneNumberRegex = /^1[3-9]\d{9}$/;
  if (phoneNumberRegex.test(userLogin3Input.value.phone)) {
    getSmsCode(userLogin3Input.value.phone).then(res => {
      const { data } = res;
      if (data.code == 200) {
        userLogin3Input.value.stayTime = 60;
        const interval = setInterval(() => {
          userLogin3Input.value.stayTime--;
          if (userLogin3Input.value.stayTime <= 0) {
            userLogin3Input.value.stayTime = 0
            clearInterval(interval);
          }
        }, 1000)
      }
    })
  }
}
const login3Handler = () => {
  if (userLogin3Input.value.phone && userLogin3Input.value.smsCode) {
    login({
      mobile: userLogin3Input.value.phone,
      smsCode: userLogin3Input.value.smsCode
    }).then(res => {
      const { data } = res;
      if (data.code == 200) {
        isLogin3.value = false;
        localStorage.setItem("token", data.data.token);
        isLogin2.value = true;
      }
    })
  }
}

// 生命周期钩子
onMounted(() => {
  // console.log(`The initial count is ${visible2.value}.`)
  visible.value = false;
  visible2.value = false;
  visible3.value = false;
  visible4.value = false;
})

</script>
<style lang="scss" scoped>
@import './mytheme.css';

::v-deep #record .t-input__inner {
  color: white !important;
  ;
}

::v-deep #record .t-input__inner::placeholder {
  color: rgba(166, 166, 166, 1) !important;
}

::v-deep #record .t-input .t-input__suffix>.t-icon {
  color: rgba(166, 166, 166, 1) !important;
}

.t-space {
  width: 100%;
}

header {
  background-color: var(--td-success-color-5);
}

/* main,section{
  background-color: white; 
} */
aside {
  /* background-color: var(--td-success-color-5); */
}

.fill-layout {
  height: 100%;
}

#root,
body,
html,
aside,
content {
  height: 100%;
}

.t-skeleton-demo-paragraph {
  line-height: 25px;
}

.hiddenNav {
  width: 0;
  overflow: hidden;
  transition: .3s
}

.main-menu-aside section {
  width: 200px;
}


// 弹出层4



.title-text{
  font-size: 24px;
  font-weight: 900;
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 1px;
  margin-bottom: 20px
}
.gender-selection {
  display: inline-flex; /* 使用内联弹性盒子来居中选项并保持其行内特性 */
  justify-content: center; /* 水平居中选项 */
  align-items: center;
  margin-bottom: 15px;
}

.gender-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px; /* 在两个选项之间添加间距 */
  cursor: pointer;
}

.gender-selection input[type="radio"] {
  display: none;
}

//弹出层4
.gender-selection label {
  cursor: pointer;
  margin-right: 10px;
}

/* 动态绑定的class，当span被选中时变为蓝色 */
.selected {
  color: #3B59C3;
  font-weight: 600
}

.nickname-input {
  display: flex; /* 使用Flexbox布局 */
  align-items: center; /* 垂直居中 */
  margin-top: 10px; /* 根据需要调整间距 */
  margin-bottom: 20px;
  
}

.nickname-input span {
  margin-right: 10px; /* 根据需要调整间距 */
  white-space: nowrap; /* 防止换行 */
}
</style>