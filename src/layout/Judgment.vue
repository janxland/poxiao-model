<template>
    <div class=" bg-primary p-10 pb-0 h-[100vh]">
        <div class="bg-white rounded-xl p-2 h-[calc(100vh-50px)] overflow-auto">
            <div class="header">
                <div class="text-black text-xl font-semibold pt-4">恭喜完成作答，您的考试评价为:</div>
                <div class="">
                    <img :src="checkScore()?.label" class="m-auto w-[100px] h-[100px]">
                </div>
            </div>
            <div class="flex justify-between pt-2 h-10 bg- items-end subHeader">
                <div class="w-[20vw] flex justify-around ">
                    <div class="cursor-pointer  p-2" @click="all=true;" :class="all?' font-extrabold':''">所有题目</div>
                    <div class="cursor-pointer  p-2" @click="all=false;" :class="!all?' font-extrabold':''">只看错题</div>
                </div>
                <div class="text-sm text-gray-400">题目已自动保存至我的题库，错题已自动归纳至错题本</div>
            </div> 
            <div class="px-4 py-2" v-if="all">
                <div>
                    <div v-for="question,index in questionList" :key="index">
                        <div class="questionType" v-if="question.type == '1'">
                            题型{{ index + 1 }}：选择题
                            <span>({{ getIndex(question).join('') }})</span>
                            <div class="flex p-4 flex-wrap">
                                <div v-for="(i,index) in question.questionVoList" class="text-center text-black">
                                    <div class="w-8 h-8 rounded-full mx-4 leading-[32px] " :class="checkAnswer(question,i)">{{ i.correctAnswer.toUpperCase() }}</div>
                                    {{ index + 1 }}
                                </div>
                            </div>
                        </div>
                        <div class="questionType" v-if="question.type == 2">
                            题型{{ index + 1 }}：填空题
                            <span>({{getIndex(question).join('')}})</span>
                            <div class="flex p-4 flex-wrap">
                                <div v-for="(i,index) in question.questionVoList" class="text-center text-black flex items-center m-2">
                                    <div class="w-8 h-8 rounded-full  mx-2 leading-[32px]"  :class="checkAnswer(question,i)">{{ getIndex(question)[0] + index }}</div>
                                    <div class="flex-1">{{ i.correctAnswer }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="questionType" v-if="question.type == 4">
                            题型{{ index + 1 }}：判断题
                            <span>({{ getIndex(question).join('') }})</span>
                            <div class="flex p-4 flex-wrap">
                                <div v-for="(i,index) in question.questionVoList" class="text-center text-black flex items-center m-2">
                                    <div class="flex flex-col">
                                        <div class="w-8 h-8 rounded-full mx-2 leading-[32px]" :class="checkAnswer(question,i)">
                                            <icon name="check" v-if="i.answerContent == i.correctAnswer.toLowerCase()" size="30"></icon>
                                            <icon name="close" v-else size="30"></icon>
                                        </div>
                                        <div>{{ getIndex(question)[0] + index }}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <!-- <div class="text-left">
                        跳转入口：
                        <span v-for="i in extraIndex" class="text-blue-600 hover:underline cursor-pointer">
                            {{ `题型${i.index + i.label}` }}
                        </span>
                    </div> -->
                </div>
                <div class="mt-10 border-dash pt-4">
                    <Exam :questionList="questionList" disabled></Exam>
                </div>
            </div>
            <div v-else>
                <Exam :questionList="questionErrList" disabled></Exam>
            </div>
        </div>
       
        
    </div>
</template>

<script setup>
import Exam from '@/components/Exam.vue';
import { Icon } from 'tdesign-icons-vue-next';
import { getIncorrectList,getResult } from '@/api/question'
import { useRoute } from 'vue-router'
import { ref,watch } from 'vue'
const questionTypeMap = ref([
  { label: "NAN", value: "0" },
  { label: "单选题", value: "1" },
  { label: "填空题", value: "2" },
  { label: "简答题", value: "3" },
  { label: "判断题", value: "4" },
  { label: "多选题", value: "11" },
  { label: "写作题", value: "32" },
  { label: "论述题", value: "33" },
  { label: "课程设计题", value: "34" },
  { label: "材料分析题", value: "35" },
  { label: "名词解释题", value: "36" }
]);

const route = useRoute()
const examLoading = ref(true)
const all = ref(true)
const questionList = ref([])
const questionErrList = ref([])
const extraIndex = ref([])
const countScore = () =>{
    let totalScore = 0
    let userScore = 0
    questionList.value.forEach(i=>{
        totalScore += i.totalScore;
        i.questionVoList.forEach(n=>{
            userScore += n.userScore
        })
    })
    console.log(userScore,totalScore)
    let score = (userScore/totalScore*100).toFixed(2)
    return score
}
const scoreMap = ref([
    {
        label:require("@/assets/images/score/S.png"),
        value1:100,
        value2:90
    },
    {
        label:require("@/assets/images/score/A.png"),
        value1:89,
        value2:70
    },
    {
        label:require("@/assets/images/score/B.png"),
        value1:69,
        value2:60
    },
    {
        label:require("@/assets/images/score/C.png"),
        value1:59,
        value2:30
    },
    {
        label:require("@/assets/images/score/D.png"),
        value1:29,
        value2:0
    }
])
const checkScore = ()=>{
    let score = countScore()
    let scoreValue = scoreMap.value.find(i => i.value1 >= score && i.value2 <= score)
    console.log(score,scoreValue);
    return scoreValue
}
const getExamData = (id)=>{
    let params = {}
    if(id) params.examId = id;
    getResult(params).then(res=>{
        examLoading.value = false
        questionList.value = res?.data?.data.map(res=>{
        res.questionVoList = res.questionVoList.map(i=>{
            
                i.content = JSON.parse(i?.content)
                if(res.type == '11')
                i.correctAnswer = i.correctAnswer ? JSON.parse(i.correctAnswer) : []
                i.analysis = JSON.parse(i.analysis)
                return i
            })
        return res
        })  
        countScore();
        questionTypeMap.value.forEach(i=>{
            if(i.value.startsWith('3')){
                let index =  questionList.value.findIndex(n=>n.type == i.value)
                if(index!=-1){
                    extraIndex.value.push({
                        label:i.label,
                        index:index+1
                    })
                }
            }
            
        })
    }).catch(err=>{
        console.log(err)
    })
}
const getErrorData = (id) =>{
    let params = {}
    if(id) params.examId = id;
    getIncorrectList(params).then(res=>{
        examLoading.value = false
        questionErrList.value = res?.data?.data.map(res=>{
        res.questionVoList = res.questionVoList.map(i=>{
            
            i.content = JSON.parse(i?.content)
            if(res.type == '11')
            i.correctAnswer = i.correctAnswer ? JSON.parse(i.correctAnswer) : []
            i.analysis = JSON.parse(i.analysis)
            return i
        })
      return res
    })  
    // countScore();
    questionTypeMap.value.forEach(i=>{
        if(i.value.startsWith('3')){
            let index =  questionErrList.value.findIndex(n=>n.type == i.value)
            if(index!=-1){
                extraIndex.value.push({
                    label:i.label,
                    index:index+1
                })
            }
        }
        
    })
    }).catch(err=>{
        console.log(err)
    })
}
watch(route,(newVal,oldVal)=>{
    if(newVal.query.id){
        all.value = true
        getExamData(newVal.query.id)
    }else{
        all.value = false
        getErrorData()
    }
})
watch(all,(newVal,oldVal)=>{
    if(newVal){
        getExamData(route.query.id)
    }else{
        getErrorData(route.query.id)
    }
})
getExamData(route.query.id)
const checkAnswer = (question,i) =>{
    return i.answerContent == i.correctAnswer.toLowerCase() ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
}
const getIndex = (question) => {
    let i = 1
    let arr = []
    if(question.type == 1)
    arr = [i,'-', question.questionNum]
    else if(question.type == 2){
        let n = i + (questionList.value.find(i=>i.type == '1')?.questionNum || 0)
        arr = [n,'-',n + question.questionNum - 1]
    }
    else if(question.type == 4){
        let n = i + (questionList.value.find(i=>i.type == '1')?.questionNum || 0) + (questionList.value.find(i=>i.type == '2')?.questionNum || 0)
        arr = [n,'-',n + question.questionNum - 1]
    }
    return arr[0] == arr[2] ? arr.slice(0,1) : arr
}
</script>

<style lang="scss" scoped>
.questionType{
    @apply text-blue-600 text-left  font-bold
}
.header{
    // background: linear-gradient(-210deg, rgb(57, 76, 200), rgb(61, 101, 191), rgb(43, 72, 146));
    background-color: rgba(241, 247, 250, 1);
    border-radius: 10px
}
.subHeader{
    background: rgba(241, 247, 250, 1)
}
.border-dash{
    width: 100%;
    height: 1px;
    background-image: linear-gradient(to right, #ccc 0%, #ccc 50%, transparent 50%);
    background-size: 30px 1px;
    background-repeat: repeat-x;
}
</style>