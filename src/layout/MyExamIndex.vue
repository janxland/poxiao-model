<template>
  <div id="MyExamIndex">
    <t-layout>
      <t-header class="menu-header">
        <t-head-menu value="item1" class="font-small" style="cursor:pointer;">
          <router-link to="index">
            <icon class="icon" name="chevron-left" color="#2F3CF4" style="margin-right: 24px;font-size: 40px;" />
          </router-link>
          我的题库
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside class="myexam-left-side select-none" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeExamId" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeExamId === ExamRecord.examId }" :key="index" v-for="ExamRecord,index in ExamRecords" :value="ExamRecord.examId">
              <icon class="icon" name="folder-1" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
              <span style="flex: 1;">{{ ExamRecord.qustionsContent }}</span>
              <icon class="icon edit-icon" :class="{ active:activeExamId === ExamRecord.examId }" name="edit-2" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
            </t-menu-item>
            <!-- <t-menu-item class="subjects-item"  value="创建新题库" @click="$router.push('/')">
              <icon class="icon" name="add-circle" color="#2F3CF4" style="margin: 0 10px;font-size: 20px;"/>
              <span>创建新题库</span>
            </t-menu-item>
              <div class="mt-8">
                <span class="cursor-pointer hover:text-blue-300">删除</span>
                |
                <span class="cursor-pointer hover:text-blue-300">合并</span>
              </div> -->
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content>
            <div class="myexam-main-content">
              <t-space direction="vertical">
                <Exam :questionList="questionList" ></Exam>
              </t-space>
            </div>
          </t-content>
          <t-footer>
            <div class="myFooter">
              <div class="icp">
                <a href="http://beian.miit.gov.cn" target="_blank">---------这里是底线-------</a>
              </div>
            </div>
          </t-footer>
        </t-layout>
        <t-aside class="myexam-menu-side" style="border-top: 1px solid var(--component-border)">
          <!-- <div title="出卷组题" class="myexam-menu-side-item"><icon title="出卷组题" name="article" ></icon></div> -->
          <div @click="visibleMenu.transformQuestion = !visibleMenu.transformQuestion" title="迁移" class="myexam-menu-side-item"><icon title="二级——所有迁移" name="folder-import" ></icon></div>
          <t-popconfirm placement="left" :visible="visibleMenu.deleteQuestion" content="确认删除吗">
            <div @click="visibleMenu.deleteQuestion = !visibleMenu.deleteQuestion" title="删除" class="myexam-menu-side-item"><icon title="删除" name="delete" ></icon></div>
          </t-popconfirm>
        </t-aside>
        <t-drawer :visible="visibleMenu.transformQuestion"  @close="visibleMenu.transformQuestion = !visibleMenu.transformQuestion" :closeBtn="true" header="选择要迁移到的题库">
            <p>This is a Drawer</p>
            <img :src="require('@/assets/images/敬请期待.svg')" shape="circle">
        </t-drawer>
        <!-- <t-aside class="myexam-date-side" width="15%" style="border-top: 1px solid var(--component-border)">
          <t-date-picker v-model="activeDate" clearable :prefix-icon="renderPrefixIcon"></t-date-picker>
        </t-aside> -->
      </t-layout>
    </t-layout>
  </div>
</template>
<script setup>  
/* eslint-disable */
import { ref,onMounted,watch } from 'vue';  
import { Icon } from 'tdesign-icons-vue-next';  
import { useRoute, useRouter } from 'vue-router';  
import { getQuestionList } from '@/api/question';
import Exam from '@/components/Exam.vue';
// 获取当前路由对象  
const route = useRoute();  
  
// 获取路由实例  
const router = useRouter();  
// 定义响应式数据  
const answerMap = ref(["A", "B", "C", "D", "E"]);
const questionTypeMap = ref([
  { label: "NAN", value: "0" },
  { label: "选择题", value: "1" },
  { label: "填空题", value: "2" },
  { label: "简答题", value: "3" },
  { label: "判断题", value: "4" },
  { label: "作文", value: "5" },
  { label: "论述", value: "6" },
  { label: "课程设计", value: "7" }
]);

const activeExamId = ref(0);
const visibleMenu = ref({
  deleteQuestion : false,
  transformQuestion: false,
})
const ExamRecords = ref([  
  { qustionsContent: '英语', id: '1' },  
  { qustionsContent: '语文', id: '2' },  
  { qustionsContent: '数学', id: '3' }  
]);  
const questionList = ref([
        {
          name: '选择题',
          type: 1,
          questionVoList: [
            {
              "stem": "你的账号还没有创建题库哦？你知道怎么创建题库么？以下是创建题库的步骤",
              "content": [
                {content: "进入首页"},
                {content: "编辑题型及数量"},
                {content: "输入出题提示词，越详细越好"},
                {content: "提交出题！等待出题哦，完成了请到题库中查看"}
              ],
              "ans":0,
              "correct": 0
            },
            { 
              "stem": "Your account has not created a question bank yet? Do you know how to create a question bank? Here are the steps to create a question bank.",
              "content": [
                { "content": "Go to the homepage" },
                { "content": "Edit the question types and quantities" },
                { "content": "Provide detailed hints for the questions" },
                { "content": "Submit the questions! Wait for the questions to be reviewed. Once completed, check them in the question bank." }
              ],
              "ans": 0,
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
              "correct": 0
            }
          ]
        },
      ]);  
  const fetchExamRecords = async () => {
    getQuestionList(0).then(res => {
      const { data } = res 
      if(data.code === 200) {
        ExamRecords.value = data.data;
        activeExamId.value =  ExamRecords?.value[0]?.examId
      }
    })
  };
  const fetchExamQuestions = async (examId) => {
    getExamQuestions(examId).then(res => {
      const { data } = res 
      if(data.code === 200) {
        const targetIndex = data.data.findIndex(obj => obj.type === "1");
        if (targetIndex !== -1 && data.data[targetIndex].questionVoList) {
          data.data[targetIndex].questionVoList.forEach(question => {
            question.content = JSON.parse(question.content);
          });
        }
        if(data.data.length!=0) questionList.value = data.data;
        
      }
    })
  };
  watch(activeExamId, (newValue) => {
    fetchExamQuestions(newValue);
  });
  onMounted(() => {
    fetchExamRecords();
  })
</script>

<style lang="scss">
.t-icon {
  cursor: pointer;
}
#MyExamIndex  {
  .menu-header{
    height: 82px;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    .t-menu {
      font-size: var(--td-size-7);
    }
  }
  .myexam-left-side {
    width:240px;
    padding:8px;
    position: sticky;
    box-sizing: border-box;
    .t-menu__item {
      user-select: none;
      color:#000;
      height:53px;
      font-size: var(--td-size-6);
      margin: 10px 0;
      border: solid 1px  #4566FC;
      border-radius: 16px;
      transition: .3s;
    }
    .t-menu__item .t-menu__content {
      display: flex;
      width:100%;
      align-items: center;
    }
  }
  .t-menu__item.t-is-active,
  .t-menu__item:hover{
    transition: .3s;
    color:#fff;
    opacity: 1;
    border-radius: 16px;
    background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
  }
  .t-menu__item.t-is-active .icon ,
  .t-menu__item:hover .icon{
    color:#fff;
  }
  .t-menu__item.t-is-active .edit-icon {
    display: inline-block;
  }
   .edit-icon {
    display: none;
  }
  .myexam-left-side{
    left: 0px;
    opacity: 1;
    position: sticky;
    border-radius: 0px 32px 0px 0px;
    background: rgba(255, 255, 255, 1);
  }
   .myexam-main-content {
    background: #fff;
    margin-left: 80px;
    padding: 20px 20px;
    border-radius: 32px 32px 0px 0px;
  }
   .myexam-list-item .t-list-item-main{
    align-items:start;
    display: flex;
    flex-direction: column;
  }
   .t-list-item__meta-title {
    text-align: left;
    line-height: var(--td-size-8);
    font-weight: normal;
    padding:0;
  }
   .myexam-list-item .t-list-item__action {
    text-align: left;
    display: flex;
    flex-direction: column;
    line-height: var(--td-size-12);
    align-items: start;
    color:#000;
  }
   .myexam-list-item.row .t-list-item__action{
    text-align: left;
    display: flex;
    flex-direction: row;
    line-height: var(--td-size-12);
    justify-content: space-between;
    width: 100%;
    color:#000;
  }
   .myexam-list-item .myexam-list-item-answer {
    margin: 2px 0;
  }
   .myexam-list-item .myexam-list-item-answer label{
    border: none;
  }
   .myexam-list-item .myexam-list-item-answer:hover .chose-icon,
   .myexam-list-item-answer .chosen .chose-icon{
    background:#4566FC;
    color:#fff;
  }
   .myexam-list-item .t-textarea{
    vertical-align: text-top;
    display: inline-block;
    width:360px;
  }
   .myexam-list-item .chose-icon {
    display: inline-block;
    border-radius: 50%;
    background-color: #EBEEF0;
    color:#A6A6A6;
    height: var(--td-size-10);
    width: var(--td-size-10);
    line-height: var(--td-size-10);
    margin-right: var(--td-size-4);
    text-align: center;
  }
   .myexam-list-item .chose-type-3-button {
    width: 48px;
    height: 48px;
    margin-top:5px;
    font-size: var(--td-size-10);
    background-color: #EBEEF0;
    color:#A9A9A9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .chosen .chose-type-3-button ,
  .chose-type-3-button:hover{
    background:#4566FC;
    color:#fff;
  }
  .myexam-menu-side {
    background: none;
    position: sticky;
    top: 70vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 160px;
    width: 100px;
    display: flex;
    .myexam-menu-side-item {
      transition: .3s;
      border-radius:50%;
      background: #fff;
      color: #575B66;
      font-size: var(--td-size-9);
      margin: 10px 20px;
      width: 48px;
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
      &:hover {
        transition: .3s;
        background: #4566FC;
        color: #fff;
      }
    }
  }

   .myexam-date-side {
    border-radius: 32px 0px 0px 0px;
  }
}
.myFooter {
    margin-left: 80px;
    background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
    text-align: center;
    color: #fff;
    background-size: 300% 300%;
  }
</style>