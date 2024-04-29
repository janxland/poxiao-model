<template>
  <div id="MyIndex">
    <t-layout>
      <t-header class="menu-header">
        <t-head-menu value="item1" class="font-small" style="cursor:pointer;">
          <router-link to="index">
            <icon class="icon" name="chevron-left" color="#2F3CF4" style="margin-right: 24px;font-size: 40px;" />
          </router-link>
          个人中心
        </t-head-menu>
      </t-header>
      <t-layout class="header-layout">
          <t-content>
            <div class="user-header" :style="{'background-image': `url( ${userStore.user.background || 'https://mybox-1257251314.cos.ap-chengdu.myqcloud.com/www/image_2496.png'})`}"> 
              <div class="user-avatar">
                <t-image :src="userStore.user.avatar || iconUrl.defaultAvatar" shape="circle"></t-image>
              </div>
              <div class="user-info">
                <div class="user-name">{{ userStore.user.nickname || "未设置用户名" }}</div>
                <div class="user-desc">绑定手机号: {{ userStore.user.mobile }}</div>
              </div>
              <div class="absolute top-5 right-5 select-none" style="text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);">
                <span class="cursor-pointer"></span> <span class="mx-2">|</span> <span class="cursor-pointer" @click="toggleLogin">{{userStore.user.mobile ? "退出登录" : "立即登录"}}</span>
              </div>
              <div class="filter drop-shadow selcet-none flex absolute bottom-5 right-5 text-xl justify-around" style="width:150px">
                <t-badge  count="new">
                  <icon class="icon text-3xl" @click="visibles.mailBox1 = true" name="mail" color="#fff"  />
                </t-badge>
                <icon class="icon text-3xl" name="image" color="#fff" />
                <icon @click="()=>{ stateStore.setVisible('editProfile',true)}" class="icon text-3xl" name="edit-2" color="#fff"/>
              </div>
              <t-dialog :footer="false" :visible="visibles.mailBox2" :closeBtn="false">
                <div class="absolute select-none flex flex-row justify-between px-[20px] items-center w-[100%] text-center top-[24px] left-[0] text-[18px] text-[#000] leading-[24px]">
                  
                  <icon class="icon" @click="()=> {visibles.mailBox2 = false;visibles.mailBox1 = true}"  name="chevron-left" color="#000" style="font-size: 30px;" />
                  <p>详情</p>
                  <icon class="icon" @click="()=> { visibles.mailBox2 = false;}"  name="close" color="#000" style="font-size: 30px;" />
                </div>
                <div class="text-left py-[20px] leading-[20px]">
                  {{ mailObject?.content || "复习大师是一款通过使用大模型，能够为老师学生出题的学习小助手"}}
                </div>
              </t-dialog>
              <t-dialog header="收信箱" :footer="false" :visible="visibles.mailBox1" :onClose="()=> visibles.mailBox1 = false">
                <div slot="body">
                  <div class="text-left select-none">
                    <span class="text-xl text-black">未读</span>
                    <li @click="checkMail(0)" class="flex cursor-pointer justify-between p-2 my-2 border-2 border-blue-500 rounded-lg transition hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                      <span>请你给我出100道关于教师资格证考试...</span>
                      <span>24/04/19</span>
                    </li>
                  </div>
                  <div class="text-left ">
                    <span class="text-xl text-black">已读</span>
                    <li class="flex justify-between p-2 my-2 bg-gray-300 rounded-lg">
                      <span>请你给我出100道关于教师资格证考试...</span>
                      <span>24/04/19</span>
                    </li>
                  </div>
                </div>
              </t-dialog>
            </div>
          </t-content>
          <t-layout class="content-layout">
            <t-aside class="content-layout-left">
              <div class="flex justify-between text-[length:var(--td-size-7)] px-10 py-5">
                <span>积分充值</span>
                <span>当前积分剩余:<span style="color:#4566FC">{{ user.point }}</span></span>
              </div>
              <div class="chonzhi-content">
                <div  style="width:100%;position: relative;">
                  <t-image class="w-[100%] min-h-[400px]" lazy="true"  :src="iconUrl.jifenImage" style="width:100%;z-index:0"></t-image>
                  <div class="vip-list no-scrollbar">
                    <div class="vip-list-box flex overflow-auto no-scrollbar">
                      <li class="vip-list-item" :key="index" v-for="item,index in vipList" @click="()=>{stateStore.toggleVisible('deposit')}">
                        <div class="vip-list-item-name"><span style="font-size: var(--td-size-12);letter-spacing: 1.68px;">{{item.num}}</span>积分</div>
                        <div class="vip-list-item-price">¥ {{item.price}}</div>
                        <div class="vip-list-item-value">立减{{item.value - item.price}}</div>
                      </li>
                    </div>
                    <div class="w-20 h-100 flex justify-center">
                      <icon class="icon mt-14" name="chevron-right" color="#F2D7A0" style="font-size: 60px;" />
                    </div>
                  </div>
                  <img :src="iconUrl.vipTips" 
                  style="position: absolute;bottom:0;left:50%;transform: translate(-50%,50%);width: 40%;object-fit: cover;">
                </div>
              </div>
            </t-aside>
            <t-aside class="content-layout-right h-fit w-[400px] p-[20px] rounded-[32px] p-[10px]">
              <div class="content-item huodong-center">
                <span  class="text-[16px] leading-[28px]">活动中心</span>
                <div class="flex justify-center my-2.5 p-2.5 bg-[#F1F7FA] rounded-[10px]">
                  <img class="w-[100px] h-[100px]" :src="iconUrl.staying" alt="">
                </div>
              </div>
              <div class="content-item daily-task">
                <span class="text-[16px] leading-[28px]">每日任务</span>
                <div class="flex items-center py-[5px] justify-around rounded-[10px] text-center">
                  <div class="flex flex-col cursor-pointer items-center" @click="i.handle" v-for="i,index in dailyTask">
                    
                    <icon class="p-[18px]  rounded-[10px] shadow-[1px_1px_3px_#aaa] text-[72px] hover:bg-[#4566FC] hover:text-[#fff]" color="#4566FC" :name="i.icon"/>
 
                    <span class="leading-[28px]">{{i.name}}</span>
                    <span class="text-[#a6a6a6]">{{i.subtext}}</span>
                  </div>
                </div>
              </div>
              <div class="content-item invite-friends">
                <span class="text-[16px] leading-[28px]">邀请好友赚积分</span>
                <div>
                  <li class="flex flex-row items-center  py-[5px]">
                    <icon class="icon text-[40px] bg-[#0062E3] mr-2.5 p-2.5 rounded-[50%]" name="link-1" color="#fff" />
                    <div class="flex flex-col">
                      <span class="text-[14px] leading-[24px]">链接邀请</span>
                      <span class="text-[14px] leading-[24px]">好友通过此链接注册成功，双方均可获得积分</span>
                    </div>
                  </li>
                  <hr />
                  <li class="flex flex-row items-center py-[5px]">
                    <icon class="icon text-[40px] bg-[#00BAAD] mr-2.5 p-2.5 rounded-[50%]" name="code" color="#fff" />
                    <div class="flex flex-col">
                      <span class="text-[14px] leading-[24px]">邀请码邀请：{{user.inviteCode}}</span>
                      <span class="text-[14px] leading-[24px]">好友注册时填入该邀请码，双方均可获得积分</span>
                    </div>
                  </li>
                </div>
              </div>
            </t-aside>
          </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>
<script setup >
/* eslint-disable */
import {  ref,onMounted,watch  } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
import { useUserStore } from '@/store/user';
import { useStateStore } from '@/store/state';
import { getMessages,getMessageContent } from '@/api/user';
const userStore = useUserStore();
const stateStore = useStateStore();
const user  = userStore.user;
const iconUrl = {
  defaultAvatar: require("@/assets/images/头像.png"),
  staying:require("@/assets/images/敬请期待.svg"),
  jifenImage: require("@/assets/images/个人中心-积分权益.png"),
  vipTips:require("@/assets/images/过年不停学，充值享优惠.png"),
};
const visibles = ref({
  mailBox1: false,
  mailBox2: false,
  qiandao: false,
});

const dailyTask = ref([
  { 
    name: '每日签到',
    icon: 'user-1',
    subtext: '+5',
    status: false,
    handle: ()=>{
      
    }
  },
  { 
    name: '完成出题',
    icon: 'file-1',
    subtext: '待开发',
    status: false
  },
  { 
    name: '使用错题本',
    icon: 'file-1',
    subtext: '待开发',
    status: false
  },
  { 
    name: '获得S评级',
    icon: 'star',
    subtext: '待开发',
    status: false
  },
])
const vipList = ref([{
  name: '',
  num: 300,
  price: 5.8,
  value: 12
},
{
  name: '',
  num: 500,
  price: 9.9,
  value: 20
},
{
  name: '',
  num: 900,
  price: 16.8,
  value: 35
},
{
  name: '',
  num: 1600,
  price: 28.8,
  value: 60
},
{
  name: '',
  num: 2000,
  price: 38.8,
  value: 80
},
])
const mailObject = ref({
  "content": "",
	"messageId": 0,
	"sendTime": "",
	"sendUserName": "",
	"status": ""
})
const checkMail = (messageId) => {
  visibles.value.mailBox1 = false;
  visibles.value.mailBox2 = true;
  getMessageContent(messageId).then(res => {
    const { data } = res;
    mailObject.value = data.data;
  })
}
const toggleLogin = () =>{
  if(userStore.user.mobile) {
    localStorage.removeItem("token");
    userStore.logout();
  } else {
    stateStore.setVisible('loginByMobile',true)
  }
}
watch(userStore.user, (newVal) => {
  console.log(newVal);
})
</script>

<style lang="scss">
.t-icon {
  cursor: pointer;
}
#MyIndex .header-layout{
  max-width: 1600px;
  min-width: 1400px;
  margin: auto;
}
#MyIndex .menu-header{
  height: 82px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
#MyIndex .menu-header .t-menu {
  font-size: var(--td-size-7);
}
#MyIndex .t-menu__item {
  user-select: none;
  color:#000;
  height:53px;
  font-size: var(--td-size-6);
  margin: 12.5px 0;
  border: solid 1px  #4566FC;
  border-radius: 16px;
  transition: .3s;
}
#MyIndex .t-menu__item .t-menu__content {
  display: flex;
  width:100%;
  align-items: center;
}
#MyIndex .t-menu__item.t-is-active,
#MyIndex .t-menu__item:hover{
  transition: .3s;
  color:#fff;
  opacity: 1;
  border-radius: 16px;
  background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
#MyIndex .t-menu__item.t-is-active .icon ,
#MyIndex .t-menu__item:hover .icon{
  color:#fff;
}
#MyIndex .t-menu__item.t-is-active .edit-icon {
  display: inline-block;
}
#MyIndex  .edit-icon {
  display: none;
}

#MyIndex .user-header {
  height:280px;
  width: 85%;
  margin:auto;
  display: flex;
  flex-direction: row;
  color:#fff;
  position: relative;
  padding: 50px 0 50px 60px;
  border-radius: 32px;
  background-color: #fff;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-sizing: border-box;
}
#MyIndex .user-info {
  z-index:1;
  margin-left: var(--td-size-5);
  margin-bottom: var(--td-size-5);
  text-shadow: 0px 0px 10px rgba(0, 0, 0);
}
#MyIndex .user-info .user-name {
  font-size: var(--td-size-8);
  font-weight: 500;
  margin-bottom: var(--td-size-5);
}
#MyIndex .user-header .user-avatar,#MyIndex .user-header .user-info{
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: start;
}
#MyIndex .user-header .user-avatar img{
  object-fit: cover;
  width: 96px;
  height: 96px;
  border-radius: 50%;
}
#MyIndex .content-layout {
  width: 85%;
  margin: 32px auto ;
}
#MyIndex .content-layout-left{
  flex: 1;
  margin: 0 32px 0 0;
  border-radius: 32px;
  height: 600px;
  width: unset;
}
.content-layout-left .vip-list{
  position: absolute;
  top: 48%;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  overflow-y: hidden;
  width: 100%;
  height: 200px;
  .vip-list-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 168px;
    height: 168px;
    margin:0 10px;
    opacity: 1;
    cursor: pointer;
    position: relative;
    border-radius: 20px;
    background: linear-gradient(213.8deg, rgba(255, 227, 199, 1) 0%, rgba(255, 235, 189, 1) 49.86%, rgba(255, 254, 250, 1) 100%);
    .vip-list-item-name,.vip-list-item-price{
      width:168px;
      color: rgba(164, 94, 2, 1);
      text-align: center;
      vertical-align: top;
      margin: 10px 0;
      letter-spacing: 1px;
      font-size: var(--td-size-8);
    }
    .vip-list-item-value {
      border-radius: 20px;
      width:80px;
      height: 40px;
      line-height:40px;
      color:#fff;
      background: linear-gradient(90deg, rgba(255, 88, 51, 1) 0%, rgba(255, 147, 122, 1) 100%);
      box-shadow: 0px 2px 4px  rgba(0, 0, 0, 0.25);
      position: absolute;
      bottom:-20px;
      left:50%;
      transform: translateX(-50%);
    }
  }
}
#MyIndex .content-layout-left .chonzhi-content {
  user-select: none;
  padding: 10px 20px;
}
#MyIndex .content-layout-right .content-item {
  text-align: left;
  flex: 1;
  .t-list-item__meta-title,.t-list-item__meta-description{
    margin:0
  }
}
</style>