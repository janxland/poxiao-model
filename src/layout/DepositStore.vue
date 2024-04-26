<template>
    <div :class="{'dialog-hide':!stateStore.visible.deposit}" class="fixed z-[999] select-none justify-center items-center flex w-full h-full bg-[#0000008c] left-0 top-0">   
        <div class="relative flex p-[0px_32px] pt-[12px] flex-col justify-around w-[960px] h-[680px] bg-[#666] rounded-[32px]" style="  background: linear-gradient(
            35deg,
                rgba(59, 66, 90, 1) 0%,
                rgba(58, 65, 89, 1) 52.29%,
                rgba(230, 175, 80, 1) 100%
            );">
            <div @click="close" class="absolute z-[99] p-[4px] top-[32px] right-[32px] bg-[#00000055] rounded-[50%]">
                <icon class="icon" name="close" color="#fff" style="font-size: 24px;" />
            </div>
            <div class="flex flex-row items-center"> 
              <div class="w-[64px] h-[64px] bg-[#fff] mr-2.5 p-2.5 rounded-[50%]">
                <t-image :src="user.avatar"  shape="circle"></t-image>
              </div>
              <div class="flex flex-col text-left text-[#fff]">
                <div class="text-[20px] leading-[40px]">{{ user.name || "未设置用户名" }}</div>
                <div class="text-[16px] leading-[24px]">绑定手机号: {{ user.mobile }} <span class="text-[#F5C97C] pl-[100px]">剩余积分： {{ user.point }}</span> </div>
              </div>
            </div>
            <img class="absolute w-[154px] z-[1] height-[130px] top-[32px] right-[110px]" :src="iconUrl.diamon" ></img>
            <div class="  z-[2] text-[rgba(164,94,2,1)]">
                <img class="z-[2] m-auto" :src="iconUrl.DepositStoreInfo" />
                <div class="flex flex-row py-[20px] m-auto">
                    <div class="w-20 h-100 flex justify-center items-center">
                        <icon class="icon" name="chevron-left" color="#F2D7A0" style="font-size: 60px;" />
                    </div>
                    <div class="flex flex-1 justify-around w-[640px]">
                        <li class="flex cursor-pointer relative flex-col justify-center rounded-[24px] w-[150px] h-[150px]" :key="index" v-for="item,index in vipList" style="background: linear-gradient(213.8deg, rgba(255, 227, 199, 1) 0%, rgba(255, 235, 189, 1) 49.86%, rgba(255, 254, 250, 1) 100%);">
                            <div><span style="font-size: var(--td-size-12);letter-spacing: 1.68px;">{{item.num}}</span>积分</div>
                            <div class="text-[20px]">¥ {{item.price}}</div>
                            <div class="line-through text-[#aaa]">¥ {{item.value}}</div>
                            <div class="w-[80px] h-8 leading-8 text-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] absolute -translate-x-2/4 rounded-[20px] left-2/4 -bottom-5" style="  background: linear-gradient(90deg,rgba(255, 88, 51, 1) 0%,rgba(255, 147, 122, 1) 100%);">立减{{item.value - item.price}}</div>
                        </li>
                    </div>
                    <div class="w-20 h-100 flex justify-center items-center">
                        <icon class="icon" name="chevron-right" color="#F2D7A0" style="font-size: 60px;" />
                    </div>
                </div>
                <div class="flex flex-col h-[160px] justify-around items-center">
                    <div class="text-[#fff]">¥ <span class="text-[30px]">{{ activeItem ? activeItem.price : "49.8" }}</span></div>
                    <div class="text-[#000] text-[20px] rounded-[24px] p-[15px_70px]" style="background: linear-gradient(213.8deg, rgba(245, 198, 122, 1) 0%, rgba(250, 217, 150, 1) 50.14%, rgba(255, 225, 166, 1) 100%);">立即支付</div>
                    <div class="text-[#fff]"><input type="checkbox" value="1">同意并接受 个人订阅服务协议</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
import { useUserStore } from '@/store/user';
import { useStateStore } from '@/store/state';
const iconUrl = {
    diamon:require('@/assets/images/diamon.svg'),
    DepositStoreInfo:require('@/assets/images/DepositStoreInfo.png')
}
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
})
const user = ref({
})
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
}
])
const userStore = useUserStore();
const stateStore = useStateStore();
user.value = userStore.user;
const close = () => {
    stateStore.toggleVisible("deposit");
}
</script>

<style lang="scss" scoped>
.dialog-hide {
    display: none;
}
</style>