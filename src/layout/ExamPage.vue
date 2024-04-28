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
      <t-button shape="round" size="large" @click="visible = true">立即提交</t-button>
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
      已用时xxxx <br/>
      您可以选择：
    </div>
    <template #footer>
      <div class="flex justify-evenly items-center">
        <t-button shape="round" class="w-2/5" variant="outline" @click="visible = false">我再想想</t-button>
        <t-button shape="round" class="w-2/5" @click="submit">立即评卷</t-button>
      </div>
    </template>
    </t-dialog>
</template>

<script setup>
import Exam from '@/components/Exam.vue';
import { Icon } from 'tdesign-icons-vue-next';
import { getExamQuestions,commitExam } from '@/api/question'
import { useRoute,useRouter } from 'vue-router'
import { ref,watch } from 'vue'
const route = useRoute()
const router = useRouter()
const logo = require("@/assets/images/logo.png");
const examLoading = ref(true)
const getExamData = ()=>{
    getExamQuestions(route.query.id).then(res=>{
    console.log(res.data.data)
    examLoading.value = false
    questionList.value = res.data.data.map(res=>{
      res.questionVoList = res.questionVoList.map(i=>{
        i.content = JSON.parse(i?.content)
        return i
      })
      return res
    })
  })
}
//判断页面是否为刚进入或刚切换
let flag = true
watch(()=>route.query.id,()=>{
    flag = false
    examLoading.value = true
    getExamData()
},{immediate:true})

const questionList = ref()
const visible = ref(false)
const answerValueMap = ["a", "b", "c", "d", "e"];
watch(questionList,(newVal,oldVal)=>{
  if(flag){
    submit(1)
  }
  flag = true
},{deep:true})
const submit = (flag = 0)=>{
  let params = {
    examId:route.query.id,
    flag
  }
  params.answerList = questionList.value.reduce((pre,cur)=>{
    return [
      ...pre,
      ...cur.questionVoList.map(question=>
        ({questionId: question.questionId ,
        answerContent: cur.type === '1' ? answerValueMap[question.ans] : question.ans ,
        answerType:cur.type}))
      ]
  },[])
  commitExam(params).then(res=>{
    console.log(res)
    // router.push('/')
  }).catch(err=>{
    console.log(err)
  })
  
}
</script>

<style lang="scss" scoped>

</style>