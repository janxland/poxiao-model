<template>
    <div :class="{'dialog-hide':!stateStore.visible.deposit}" class="transition fixed z-[999] select-none justify-center items-center flex w-full h-full bg-[#0000008c] left-0 top-0">   
        <div class="relative flex p-[0px_32px] pt-[12px] flex-col justify-around w-[960px] h-[680px] bg-[#666] rounded-[32px]" style="  background: linear-gradient(
            35deg,
                rgba(59, 66, 90, 1) 0%,
                rgba(58, 65, 89, 1) 52.29%,
                rgba(230, 175, 80, 1) 100%
            );">
            <div @click="close" class="absolute z-[99] p-[4px] top-[32px] right-[32px] bg-[#00000055] rounded-[50%]">
                <icon class="icon" name="close" color="#fff" style="font-size: 24px;" />
            </div>
            <div class="flex flex-row items-center" @click="()=>{if(!userStore.user.isLogin)stateStore.toggleVisible('loginByMobile')}"> 
              <div class="w-[64px] h-[64px] bg-[#fff] mr-2.5 p-2.5 rounded-[50%]">
                <t-image :src="userStore.user.avatar"  shape="circle"></t-image>
              </div>
              <div class="flex flex-col text-left text-[#fff]">
                <div class="text-[20px] leading-[40px]">{{ userStore.user.nickname || "未设置用户名" }}</div>
                <div class="text-[16px] leading-[24px]">绑定手机号: {{ userStore.user.mobile }} <span class="text-[#F5C97C] pl-[100px]">剩余积分： {{ userStore.user.point }}</span> </div>
              </div>
            </div>
            <img class="absolute w-[154px] z-[1] height-[130px] top-[32px] right-[110px]" :src="iconUrl.diamon" ></img>
            <div class="  z-[2] text-[rgba(164,94,2,1)]">
                <img class="z-[2] m-auto" :src="iconUrl.DepositStoreInfo" />
                <div class="flex flex-row py-[20px] m-auto">
                    <div class="w-20 h-100 flex justify-center items-center">
                        <icon @click="scrollTo('left')" class="icon" name="chevron-left" color="#F2D7A0" style="font-size: 60px;" />
                    </div>
                    <div ref="scrollContainer" class="flex flex-1 w-[640px] overflow-x-scroll  no-scrollbar">
                        <!-- <li @click="selectProduct(item)" class="flex cursor-pointer relative flex-col justify-center rounded-[24px] w-[150px] h-[150px]" :key="index" v-for="item,index in vipList" style="background: linear-gradient(213.8deg, rgba(255, 227, 199, 1) 0%, rgba(255, 235, 189, 1) 49.86%, rgba(255, 254, 250, 1) 100%);">
                            <div><span style="font-size: var(--td-size-12);letter-spacing: 1.68px;">{{item.name?.match(/\d+/g)?.[0]}}</span>积分</div>
                            <div class="text-[20px]">¥ {{item.price}}</div>
                            <div class="line-through text-[#aaa]">¥ {{item.value}}</div>
                            <div class="w-[80px] h-8 leading-8 text-white shadow-[0px_2px_4px_rgba(0,0,0,0.25)] absolute -translate-x-2/4 rounded-[20px] left-2/4 -bottom-5" style="  background: linear-gradient(90deg,rgba(255, 88, 51, 1) 0%,rgba(255, 147, 122, 1) 100%);">立减{{item.value - item.price}}</div>
                        </li> -->
                        <li @click="selectProduct(item)" ref="refProductElements" :key="item.id" class="flex cursor-pointer relative flex-col justify-center rounded-[24px]  mx-[10px] w-[160px] h-[168px]" v-for="item,index in vipList">
                            <img class="w-[154px] max-w-[154px]" :src="item.picUrl" alt="">
                        </li>
                    </div>
                    <div class="w-20 h-100 flex justify-center items-center">
                        <icon @click="scrollTo('right')" class="icon" name="chevron-right" color="#F2D7A0" style="font-size: 60px;" />
                    </div>
                </div>
                <div class="flex flex-col h-[160px] justify-around items-center">
                    <div class="text-[#fff]">¥ <span class="text-[30px]">{{ activeProduct.price }}</span></div>
                    <div @click="payHandle" class="text-[#000] text-[20px] rounded-[24px] p-[15px_70px]" style="background: linear-gradient(213.8deg, rgba(245, 198, 122, 1) 0%, rgba(250, 217, 150, 1) 50.14%, rgba(255, 225, 166, 1) 100%);">立即支付</div>
                    <div class="text-[#fff] cursor-pointer"><input type="checkbox" v-model="payState.isAgree">同意并接受 个人订阅服务协议</div>
                </div>
            </div>
        </div>
        <t-dialog :onClose="()=>{payState.status = -1}" showOverlay :footer="false"  :visible.sync="payState.status !== -1" header="扫码付款">
            <img class="m-auto" :src="payState.qrCodeUrl" alt="">
            <p>请及时扫码付款</p>
        </t-dialog>
        <t-notification class="absolute z-[9999]" v-if="payState.status == 1" theme="success" :duration="3000" title="成功通知" content="这是一条成功的消息通知" />
    </div>
</template>

<script setup>
import { ref, defineProps ,watch,computed } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
import { useUserStore } from '@/store/user';
import { useStateStore } from '@/store/state';
import { getProducts , getWechatPayCode, getOrderStatus } from '@/api/pay';
import { MessagePlugin } from 'tdesign-vue-next'; 
const iconUrl = {
    diamon:require('@/assets/images/diamon.svg'),
    DepositStoreInfo:require('@/assets/images/DepositStoreInfo.png')
}

const user = ref({
})
const vipList = ref([
  {
    "id": 1,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/300_20240502174554A009.png",
    "price": "5.80"
  },
  {
    "id": 2,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/500_20240502174900A010.png",
    "price": "0.01"
  },
  {
    "id": 3,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/900_20240502174908A011.png",
    "price": "0.01"
  },
  {
    "id": 4,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/1600_20240502174919A012.png",
    "price": "0.01"
  },
  {
    "id": 5,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/3000_20240502180238A013.png",
    "price": "0.01"
  },
  {
    "id": 6,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/4100_20240502180258A014.png",
    "price": "0.01"
  },
  {
    "id": 7,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/5600_20240502180311A015.png",
    "price": "0.01"
  },
  {
    "id": 8,
    "picUrl": "http://www.masterreview.com.cn:28080/prod-api/profile/upload/2024/05/02/6400_20240502180543A016.png",
    "price": "0.01"
  }
])
const scrollContainer = ref()
const scrollTo = (direction) => {
  const container = scrollContainer.value;
  const containerWidth = container.offsetWidth;
  const contentWidth = container.scrollWidth;
  const scrollLeft = container.scrollLeft;
  let targetScrollLeft;
  if (typeof direction === 'number') {
    targetScrollLeft = direction;
  }
  if (direction === 'right') {
    targetScrollLeft = scrollLeft + containerWidth;
    if (targetScrollLeft >= (contentWidth-20)) {
      targetScrollLeft = 0
    }
  }
  if (direction === 'left') {
    targetScrollLeft = scrollLeft - containerWidth;
    if (targetScrollLeft < (-containerWidth+20)) {
        console.log(scrollLeft - containerWidth,targetScrollLeft, contentWidth);
        targetScrollLeft = contentWidth - containerWidth;
    }
  }

  container.scrollTo({
    left: targetScrollLeft,
    behavior: 'smooth'
  });
}
const payState = ref({
    status: -1,//-1无支付 0正在支付 1已支付 ,
    orderId: 0,
    qrCodeUrl: 'http://www.masterreview.com.cn:18000/qrcodes/20240426/20240426220119373184504.png',
    isAgree:true,
})
const userStore = useUserStore();
const stateStore = useStateStore();
user.value = userStore.user;
const activeProduct = ref(vipList.value[0]); 
const refProductElements = ref()
watch(() => stateStore.transfer.activeProductId, (newProductId) => {
    activeProduct.value = vipList.value.find(item => item.id === newProductId);
    // 获取当前元素通过数组Index
    const index = vipList.value.findIndex(item => item.id === newProductId);
    const activeProductElement = refProductElements.value[index];
    scrollTo(activeProductElement?.offsetLeft - activeProductElement?.parentElement.offsetLeft)
});

const selectProduct = (item) => {
    activeProduct.value = item;
}
const handleOrderStatus = () => {
    if (payState.value.status != 0) { return false }
    getOrderStatus(payState.value.orderId).then(res=>{
        const { data } = res;
        if(data.code == 200) {
            if(data.data.payStatus == "SUCCESS") {
                payState.value.status = 1;
                setTimeout(() => {
                    payState.value.status = -1;
                }, 2000);
            }
        }
    })
}
const payHandle = () =>{
    if(!payState.value.isAgree){
        MessagePlugin.info({
            content:"请选择同意支付协议",
            placement:"bottom",
            duration:3000
        });
        return;
    }
    getWechatPayCode(activeProduct.value.id).then(res=>{
        const { data } = res;
        if(data.code == 200){
            payState.value = Object.assign({}, payState.value, data.data);
            payState.value.status = 0;
            console.log(payState.value);
            let getStatus = setInterval(() => {
               handleOrderStatus()
               if(payState.value.status == -1) clearInterval(getStatus);
            }, 1000);
        }
    })
}
getProducts().then(res=>{
    const { data } = res;
    if(data.code == 200){
        vipList.value = data.data;
    }
})
const close = () => {
    stateStore.toggleVisible("deposit");
}
// const componentDestory = ref(false);
// watch(() => stateStore.visible.deposit, (newVal) => {
//     if(!newVal) {
//         setTimeout(() => {
//             componentDestory.value = true;
//         }, 1000);
//     } else {
//         componentDestory.value = false;
//     }
// })
</script>

<style lang="scss" scoped>
.dialog-hide {
    transform: scale(0);
    opacity: 0;
    transition:.3s;
}
</style>