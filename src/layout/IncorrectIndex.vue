<template>
    <div class="h-[82px] flex items-center bg-white">
        <t-head-menu value="item1" style="cursor:pointer;">
            <router-link to="index">
                <icon name="chevron-left" color="#2F3CF4" class="mr-6 text-4xl icon" />
            </router-link>
            错题本
        </t-head-menu>
    </div>
    <div class="min-h-[calc(100vh-82px)] bg-primary flex py-10 relative justify-between flex-nowrap overflow-auto">
        <div class="w-[15vw] bg-white rounded-xl p-4" v-loading="loading.record">
            <ExamRecord @change="recordChange" :records="records"></ExamRecord>
        </div>
        <div class="bg-white w-[70vw] mr-[10vw] rounded-xl p-6" v-loading="loading.question">
            <Exam v-model:questionList="questionList" :disabled="route.query?.type !== 're'"></Exam>
            <t-button @click="submit(0)">立即提交</t-button>
        </div>
        <div class="fixed bottom-20 right-10 mr-2">
            <div class="flex items-start flex-col" v-if="activeRecord && route.query?.type !== 're'">
                <div class="flex items-center my-2 hover:bg-slate-200 p-1 cursor-pointer bg-slate-300" @click="reExam">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-center leading-10 mr-2"><icon name="rollback" size="20"></icon></div>
                    重做错题
                </div>
                <!-- <div class="flex items-center my-2 hover:bg-slate-300 p-1 cursor-pointer" @click="reExam">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-center leading-10 mr-2"><icon name="task" size="20"></icon></div>
                    根据错题出题
                </div> -->
            </div>
        </div>
    </div>
    <div>
    </div>
</template>

<script setup>
import { Icon } from 'tdesign-icons-vue-next';
import Exam from '@/components/Exam.vue';
import ExamRecord from '@/components/ExamRecord'
import { getIncorrectList,getQuestionList } from '@/api/question'
import { ref,reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import useCommitExam from '@/hooks/useCommitExam'
const router = useRouter()
const route = useRoute()
const loading = reactive({
    record:true,
    question:true
})
const records = ref([])
const questionList = ref([])
const activeRecord = ref()
const { submit } = useCommitExam(questionList,activeRecord)
getQuestionList().then(res => {
    loading.record = false
    records.value = [{
        qustionsContent:'全部错题'
    },
    ...res?.data?.data]
    console.log(res.data.data)
    getIncorrectData()
})

const recordChange = (e) =>{
    loading.question = true
    activeRecord.value = e.examId
    router.replace('/incorrect')
    getIncorrectData(e.examId)
}
const getIncorrectData = (id)=>{
    let params = {}
    if(id)
    params.id = id
    getIncorrectList(params).then(res=>{
        loading.question = false
        questionList.value = res?.data?.data.map(res=>{
        res.questionVoList = res.questionVoList.map(i=>{
            i.content = JSON.parse(i?.content)
            return i
        })
      return res
    })
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}

const reExam = () => {
    router.replace('/incorrect?type=re')
}

</script>

<style lang="scss">
.t-menu {
    font-size: var(--td-size-7);
}
.menu-item {
    @apply h-[52px] px-3 my-4 flex items-center justify-between border border-menu_border rounded-xl cursor-pointer hover:text-white relative transition duration-300;
    &:hover {
        background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
    }
}

.active-menu-item {
    @apply text-white;
    background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
</style>