<template>
    <div class="h-[82px] flex items-center bg-white">
    <div class="h-[82px] flex items-center bg-white">
        <t-head-menu value="item1" style="cursor:pointer;">
            <router-link to="index">
                <icon name="chevron-left" color="#2F3CF4" class="mr-6 text-4xl icon" />
            </router-link>
            错题本
        </t-head-menu>
    </div>
    <div class="min-h-[calc(100vh-82px)] bg-primary flex pt-10 relative justify-between flex-nowrap overflow-auto">
        <div class="w-[15vw] bg-white rounded-xl p-4" v-loading="loading.record">
            <ExamRecord @change="recordChange" :records="records"></ExamRecord>
        </div>
        <div class="bg-white w-[70vw] mr-[10vw] rounded-xl p-6" v-loading="loading.question">
            <Exam v-model:questionList="questionList" disabled></Exam>
        </div>
        <div class="fixed bottom-20 right-0 mr-2">
            <div class="flex items-start flex-col">
                <div class="flex items-center my-2 hover:bg-slate-300 p-1 cursor-pointer" @click="reExam">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-center leading-10 mr-2"><icon name="rollback" size="20"></icon></div>
                    重做错题
                </div>
                <div class="flex items-center my-2 hover:bg-slate-300 p-1 cursor-pointer" @click="reExam">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-center leading-10 mr-2"><icon name="task" size="20"></icon></div>
                    根据错题出题
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'tdesign-icons-vue-next';
import Exam from '@/components/Exam.vue';
import ExamRecord from '@/components/ExamRecord'
import { getIncorrectList,getQuestionList } from '@/api/question'
import { ref,reactive } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()

const loading = reactive({
    record:true,
    question:true
})
const records = ref([])
const questionList = ref([
    {
        name: '选择题',
        type: 1,
        questionVoList: [
            {
                "stem": "弗洛伊德的心理分析理论中，人格结构由哪三部分组成？",
                "content": [
                    {
                        content: "自我（Ego）、超我（Superego）、本我（Id）"
                    },
                    {
                        content: "潜意识、前意识、意识"
                    },
                    {
                        content: "认知、情感、行为"
                    },
                    {
                        content: "大脑皮层、边缘系统、脑干"
                    }
                ],
                "ans": 0,
                "correct": 0
            },
            {
                "stem": "Choose the correct relative pronoun to complete the sentence: I visited the museum _______ my friend works as a curator. ",
                "content": [
                    {
                        content: "which"
                    },
                    {
                        content: "whose"
                    },
                    {
                        content: "where"
                    },
                    {
                        content: "when"
                    }
                ],
                "ans": 1,
                "correct": 0
            }
        ]
    },
    {
        name: '填空题',
        type: 3,
        questionVoList: [
            {
                "stem": "在心理学中，____ 是指个体对其所处环境的感知、认识和解释，这一过程是主观的，并且受个体先前的经验、信念和情绪状态的影响。",
                "correct": ""
            }
        ]
    },
    {
        name: '判断题',
        type: 4,
        questionVoList: [
            {
                "stem": "在心理学中，认知失调理论表明，当个体在两个相互冲突的信念或行为之间经历了内在的不一致或冲突时，他们会感到不适，并且会采取行动来减少这种不一致或冲突。",
                "correct": 0
            },
            {
                "stem": "Choose the correct relative pronoun to complete the sentence: I visited the museum _______ my friend works as a curator. ",
                "content": [
                    "which",
                    "whose",
                    "where",
                    "when"
                ],
                "correct": 1,
                "ans": 0
            }
        ]
    },
])
getQuestionList().then(res => {
    loading.record = false
    records.value = [{
        examId:0,
        qustionsContent:'全部错题'
    },
    ...res?.data?.data]
    console.log(res.data.data)
    getIncorrectData(records.value[0].examId)
})

const recordChange = (e) =>{
    loading.question = true
    getIncorrectData(e.examId)
}
const getIncorrectData = (id)=>{
    getIncorrectList(id).then(res=>{
        loading.question = false
        questionList.value = res?.data?.data
        console.log(res)
    }).catch(err=>{
        console.log(err)
    })
}

const reExam = () => {

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