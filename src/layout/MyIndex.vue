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
            <div class="user-header" :style="{'background-image': `url(${image||'https://mybox-1257251314.cos.ap-chengdu.myqcloud.com/www/image_2496.png'})`}"> 
              <div class="user-avatar">
                <t-image src="https://tdesign.gtimg.com/site/avatar.jpg"></t-image>
              </div>
              <div class="user-info">
                <div class="user-name">用户名</div>
                <div class="user-desc">绑定手机号: 123456789</div>
              </div>
            </div>
          </t-content>
          <t-layout class="content-layout">
            <t-aside class="content-layout-left">
              <div style="display: flex;
                justify-content: space-between;
                padding: 20px 40px;
                font-size: var(--td-size-7);">
                <span>积分充值</span>
                <span>当前积分剩余:<span style="color:#4566FC">435</span></span>
              </div>
              <div class="chonzhi-content">
                <div  style="width:100%;position: relative;">
                  <t-image  :src="iconUrl.jifenImage" style="width:100%;z-index:0"></t-image>

                  <div class="vip-list">
                    <div class="vip-list-item" :key="index" v-for="item,index in vipList">
                      <div class="vip-list-item-name"><span style="font-size: var(--td-size-14);letter-spacing: 2px;">{{item.num}}</span>积分</div>
                      <div class="vip-list-item-price">¥ {{item.price}}</div>
                      <div class="vip-list-item-value">立减{{item.value - item.price}}</div>
                    </div>
                  </div>
                  <img :src="iconUrl.vipTips" 
                  style="position: absolute;bottom:0;left:50%;transform: translate(-50%,50%);width: 40%;object-fit: cover;">
                </div>
              </div>
            </t-aside>
            <t-aside class="content-layout-right">
              <div class="content-item huodong-center">
                <span>活动中心</span>
                <div style="display: flex;justify-content: center;">
                  <img style="width:100px;height:100px;margin:auto" :src="iconUrl.staying" alt="">
                </div>
              </div>
              <div class="content-item daily-task">
                <span>每日任务</span>
                <div style="display: flex;justify-content: center;">
                  <img style="width:100px;height:100px;margin:auto" :src="iconUrl.staying" alt="">
                </div>
              </div>
              <div class="content-item invite-friends">
                <span>邀请好友赚积分</span>
                <div>
                  <t-list :split="true">
                    <t-list-item>
                      <t-list-item-meta :image="imageUrl" title="链接邀请" description="好友通过此链接注册成功，双方均可获得积分"></t-list-item-meta>
                    </t-list-item>
                    <t-list-item>
                      <t-list-item-meta :image="imageUrl" title="邀请码邀请：TS13QUEEN" description="好友注册时填入该邀请码，双方均可获得积分"></t-list-item-meta>
                    </t-list-item>
                  </t-list>
                </div>
              </div>
            </t-aside>
          </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>
<script setup>
/* eslint-disable */
import {  ref,onMounted,watch  } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
const iconUrl = {
  staying:require("@/assets/images/敬请期待.svg"),
  jifenImage: require("@/assets/images/个人中心-积分权益.png"),
  vipTips:require("@/assets/images/过年不停学，充值享优惠.png"),
};
const user = ref({});
const contentData = ref({});
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
])
const fetchApiData = async () => {
  try {
    const response = await fetch('/api/reviewmaster/atlas/list');
    const data = await response.json();
    if(data.code === 200) {
      contentData.value = data.data;
    }
  } catch (error) {
    console.error('Error fetching API data:', error);
  }
};
watch(contentData, (newValue) => {
  console.log(newValue);
});
onMounted(() => {
  fetchApiData()
})

</script>

<style lang="scss">
.t-icon {
  cursor: pointer;
}
#MyIndex {
  height: 100vh;
  overflow-y: scroll;
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
  width: 80%;
  margin:auto;
  display: flex;
  flex-direction: row;
  color:#fff;
  position: relative;
  padding: 50px 0 50px 60px;
  border-radius: 32px;
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
  width: 80%;
  min-height: 600px;
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
  top:50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width:100%;
  height:160px;
  .vip-list-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 16.8%;
    height: 168px;
    margin:10px;
    opacity: 1;
    cursor: pointer;
    position: relative;
    border-radius: 20px;
    background: linear-gradient(213.8deg, rgba(255, 227, 199, 1) 0%, rgba(255, 235, 189, 1) 49.86%, rgba(255, 254, 250, 1) 100%);
    .vip-list-item-name,.vip-list-item-price{
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
#MyIndex .content-layout-right{
  border-radius: 32px;
}
#MyIndex .content-layout-right .content-item {
  text-align: left;
  padding: 20px 20px;
  flex: 1;
}
</style>