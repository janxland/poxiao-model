<template>
<div class="m-8 px-8 py-4 bg-white rounded-lg">
    <div class="text-left flex items-center font-bold my-2">
        <div class="w-10 h-10 rounded-full bg-record_bg flex items-center justify-center mr-4">
            <t-image :src="logo" :style="{ width: '30px', height: '30px', 'background-color': 'transparent' }"></t-image>
        </div>
        题目已智能生成，请你开始作答：
    </div>
    <div class="ml-6 min-h-[50vh]" v-loading="examLoading">
      <Exam v-model:questionList="questionList"/>
    </div>
    <div class="my-4">
      <t-button shape="round" size="large" @click="openDialog">立即提交</t-button>
    </div>
</div>
<t-dialog
      v-model:visible="visible"
      header="提交答卷"
      width="40%"
    >
    <div>
      <icon name="certificate-1" size="100" color="#4d4d4d"></icon>
    </div>
    <div>
      已用时{{ time + '分钟' }}<br/>
      您可以选择：
    </div>
    <template #footer>
      <div class="flex justify-evenly items-center">
        <t-button shape="round" class="w-2/5" variant="outline" @click="visible = false">我再想想</t-button>
        <t-button shape="round" class="w-2/5" @click="submit(0)">立即评卷</t-button>
      </div>
    </template>
    </t-dialog>
</template>

<script setup>
import Exam from '@/components/Exam.vue';
import { Icon } from 'tdesign-icons-vue-next';
import { getMyExamList,getResult } from '@/api/question'
import { useRoute } from 'vue-router'
import { ref,watch } from 'vue'
import useCommitExam from '@/hooks/useCommitExam'
const route = useRoute()
const logo = require("@/assets/images/logo.png");
const examLoading = ref(true)
const questionList = ref([])
const activeRecord = ref()
const { submit } = useCommitExam(questionList,activeRecord)
if(route.query.type == 3){

}
else{

}
const getExamData = ()=>{
  getMyExamList(route.query.id).then(res=>{
    console.log(res.data)
    examLoading.value = false
    questionList.value = res.data.data.map(res=>{
      res.questionVoList = res.questionVoList.map(i=>{
        i.content = JSON.parse(i?.content)
        // 初始化多选题答案
        if(res.type == '11')
        i.ans = Array.isArray(i.ans) ? i.ans : []
        return i
      })
      return res
    })
  })
}
const getExamStoreData = () =>{
    getResult(route.query.id).then(res=>{
        examLoading.value = false
        questionList.value = res.data.data.map(res=>{
        res.questionVoList = res.questionVoList.map(i=>{
            if(i.content)
            i.content = JSON.parse(i?.content)
            i.ans = i.answerContent
            // 初始化多选题答案
            if(res.type == '11' )
            i.ans = i.answerContent ? JSON.parse(i.answerContent) : []
            
            return i
        })
        return res
        })
    })
}
const time = ref('')
if(!localStorage.getItem(`exam${route.query.id}`))
localStorage.setItem(`exam${route.query.id}`,Date.now())
const openDialog = () =>{
  time.value = ((Date.now() - localStorage.getItem(`exam${route.query.id}`))/1000/60).toFixed(2)
  visible.value = true
}
watch(()=>route.query.id,()=>{
    examLoading.value = true
    activeRecord.value = route.query.id
    if(route.query.type == 3){
        getExamStoreData()
    }
    else{
        getExamData()
    }
    
},{immediate:true})

const visible = ref(false)

</script>

<style lang="scss" scoped>

</style>