<template>
    <div class="h-[82px] flex items-center bg-white">
        <t-head-menu value="item1" style="cursor:pointer;">
            <router-link to="index">
                <icon name="chevron-left" color="#2F3CF4" class="mr-6 text-4xl icon" />
            </router-link>
            错题本
        </t-head-menu>
    </div>
    <div class="h-full bg-primary flex pt-[32px] relative justify-between flex-nowrap overflow-auto">
        <div class="w-[15vw] bg-white rounded-xl p-4">
            <div v-for="i, index in atlasData" :key="i.id" class="menu-item group"
                :class="activeArea == index ? 'active-menu-item' : ''" @click="activeArea = index">
                <icon class="icon mx-3 text-xl group-hover:text-white" name="folder-1"
                    :color="activeIcon" />
                <span class="flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{{ i.areasName
                    }}</span>
                <icon class="icon edit-icon mx-3 text-xl group-hover:text-white" name="edit-2"
                    :color="activeIcon" v-show="activeArea == index" />
            </div>
            <div class="menu-item group">
                <icon class="icon mx-3 text-xl group-hover:text-white" name="add-circle"
                    :color="activeIcon" />
                <span class="flex-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">创建新题库</span>
            </div>
            <!-- <div class="mt-4">
                <span class="cursor-pointer hover:text-blue-300">删除</span>
                |
                <span class="cursor-pointer hover:text-blue-300">合并</span>
            </div> -->
        </div>
        <div class="bg-white w-[70vw] mr-[10vw] rounded-xl p-6">
            <Exam v-model:questionList="questionList" disabled></Exam>
        </div>
        <div class="fixed bottom-20 right-0 mr-2">
            <div class="flex items-start flex-col">
                <div class="flex items-center my-2 hover:bg-slate-300 p-1 cursor-pointer" @click="reExam">
                    <div class="w-10 h-10 rounded-full bg-white text-center leading-10 mr-2"><icon name="rollback" size="20"></icon></div>
                    重做错题
                </div>
                <div class="flex items-center my-2 hover:bg-slate-300 p-1 cursor-pointer" @click="reExam">
                    <div class="w-10 h-10 rounded-full bg-white text-center leading-10 mr-2"><icon name="task" size="20"></icon></div>
                    根据错题出题
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from 'tdesign-icons-vue-next';
import Exam from '@/components/Exam.vue';
import { ref } from 'vue'
const atlasData = ref([{
    areasName: '英语错题本'
}, {
    areasName: '数学错题本'
}])
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
const activeIcon = (index)=>activeArea == index ? '#ffffff' : '#2F3CF4'
const activeArea = ref(0)

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