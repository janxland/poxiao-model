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
        <t-aside class="myexam-left-side select-none min-h-[80vh]" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeExamId" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeExamId === index }" :key="index" v-for="ExamRecord,index in ExamRecords" :value="index">
              <icon class="icon" name="folder-1" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
              <t-tooltip :content="ExamRecord.qustionsContent">
              <span class="truncate flex-1">{{ ExamRecord.qustionsContent }}</span>
              </t-tooltip>
              <icon class="icon edit-icon" :class="{ active:activeExamId === index }" name="edit-2" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
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
            <div class="myexam-main-content min-h-[80vh] text-left">
              <t-space direction="vertical">
                <Exam :questionList="questionList" :onlyread="true"></Exam>
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
          <!-- <div title="出卷组题" class="myexam-menu-side-item"><icon title="出卷组题" name="article" ></icon></div>
          <div @click="visibleMenu.transformQuestion = !visibleMenu.transformQuestion" title="迁移" class="myexam-menu-side-item"><icon title="二级——所有迁移" name="folder-import" ></icon></div>
          <t-popconfirm placement="left" :visible="visibleMenu.deleteQuestion" content="确认删除吗">
            <div @click="visibleMenu.deleteQuestion = !visibleMenu.deleteQuestion" title="删除" class="myexam-menu-side-item"><icon title="删除" name="delete" ></icon></div>
          </t-popconfirm> -->
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
import { getQuestionList,getMyExamList } from '@/api/question';
import Exam from '@/components/Exam.vue';
  

const activeExamId = ref(0);
const visibleMenu = ref({
  deleteQuestion : false,
  transformQuestion: false,
})
const ExamRecords = ref([  
  { qustionsContent: '全部题库'}  
]);  
const questionList = ref([]);  
  const fetchExamRecords = () => {
    getQuestionList(0).then(res => {
      const { data } = res 
      if(data.code === 200) {
        ExamRecords.value.push(...data?.data.filter(i=>i.examStatus!=-1))
        // activeExamId.value =  ExamRecords?.value[0]?.examId
      }
    })
  };
  const fetchExamQuestions = (examId) => {
    getMyExamList(examId).then(res => {
      if(res.code != 500){
            questionList.value = res?.data?.data.map(res=>{
                res.questionVoList = res.questionVoList.map(i=>{
                    i.content = JSON.parse(i?.content)
                    if(res.type == '11')
                    i.ans = Array.isArray(i.ans) ? i.ans : []
                    return i
                })
            return res
        })
        }
    })
  };
  watch(activeExamId, (newValue) => {
    console.log(newValue,questionList)
    fetchExamQuestions(ExamRecords.value[newValue].examId);
  });
  onMounted(() => {
    fetchExamRecords();
    fetchExamQuestions()
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