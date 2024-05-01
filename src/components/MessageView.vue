<template>
    <div>
        <t-dialog :footer="false" :visible="stateStore.visible.messageView" :closeBtn="false">
            <div class="absolute select-none flex flex-row justify-between px-[20px] items-center w-[100%] text-center top-[24px] left-[0] text-[18px] text-[#000] leading-[24px]">
                
                <icon class="icon" @click="()=> { stateStore.setVisible('messageView',false); stateStore.setVisible('messageList',true)}"  name="chevron-left" color="#000" style="font-size: 30px;" />
                <p>详情</p>
                <icon class="icon" @click="()=> { stateStore.setVisible('messageView',false); }"  name="close" color="#000" style="font-size: 30px;" />
            </div>
            <div class="text-left py-[20px] leading-[20px]">
                {{ mailObject?.content || "复习大师是一款通过使用大模型，能够为老师学生出题的学习小助手"}}
            </div>
        </t-dialog>
        <t-dialog header="收信箱" :footer="false" :visible="stateStore.visible.messageList" :onClose="()=> stateStore.setVisible('messageList',false)">
            <div slot="body">
                <div class="text-left select-none">
                <span class="text-xl text-black">未读</span>
                <li @click="checkMail(i.messageId)" v-for="i,index in mailList.filter(obj => Number(obj.status) == 1)" :key="i.messageId" class="flex cursor-pointer justify-between p-2 my-2 border-2 border-blue-500 rounded-lg transition hover:text-white hover:bg-gradient-to-r from-cyan-500 to-blue-500">
                    <span>{{ i.content }}</span>
                    <span>{{ formatDateTime(i.sendTime) }}</span>
                </li>
                </div>
                <div class="text-left">
                <span class="text-xl text-black">已读</span>
                <li @click="checkMail(i.messageId)" v-for="i,index in mailList.filter(obj => Number(obj.status) == 2)" class="flex justify-between p-2 my-2 bg-gray-300 rounded-lg">
                    <span>{{ i.content }}</span>
                    <span>{{ formatDateTime(i.sendTime) }}</span>
                </li>
                </div>
            </div>
        </t-dialog>
        </div>
  </template>
  
<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue';
import { getMessages,getMessageContent } from '@/api/user';
import { Icon } from 'tdesign-icons-vue-next';
import { useStateStore } from '@/store/state';
const stateStore = useStateStore();
const mailList = ref([])
const mailObject = ref({
    "content": "",
    "messageId": 0,
    "sendTime": "",
    "sendUserName": "",
    "status": "0"
})
const checkMail = (messageId) => {
    stateStore.setVisible('messageView',true)
    stateStore.setVisible('messageList',false)
    getMessageContent(messageId).then(res => {
        const { data } = res;
        if(data.code==200) {
            mailObject.value = data.data;
        } else {
            mailObject.value = data.data;
        }
    })
}
const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const now = new Date();

  if (dateTime.toDateString() === now.toDateString()) {
    return dateTime.toLocaleTimeString();
  } else if (dateTime.getFullYear() === now.getFullYear()) {
    return dateTime.toLocaleDateString(undefined, { month: '2-digit', day: '2-digit' });
  } else {
    return dateTime.toLocaleDateString();
  }
}
onMounted(() => {
getMessages().then(res => {
    const { data } = res;
    console.log(data);
    mailList.value = data.data;
})
})
</script>

<style scoped>
</style>