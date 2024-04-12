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
        <t-aside width="15%" class="myexam-left-side" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeSubject" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeSubject === subject.name }" :key="index" v-for="subject,index in subjects" :value="subject.name">
              <icon class="icon" name="folder-1" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
              <span style="flex: 1;">{{ subject.name }}</span>
              <icon class="icon edit-icon" :class="{ active:activeSubject === subject.name }" name="edit-2" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
            </t-menu-item>
            <t-menu-item class="subjects-item"  value="创建新题库">
              <icon class="icon" name="add-circle" color="#2F3CF4" style="margin: 0 10px;font-size: 20px;"/>
              <span>创建新题库</span></t-menu-item>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content>
            <div class="myexam-main-content">
              <t-space direction="vertical">
                <t-list  :split="false" :title="examBox.name" 
                  :key="'exam-box'+index" v-for="examBox,index in examList"
                >
                  <t-list-item :split="false">
                    <t-list-item-meta class="myexam-list-item-question" :title="examBox.name"></t-list-item-meta>
                  </t-list-item>
                  <t-list-item 
                    class="myexam-list-item"
                    :class="{row:examBox.row}"
                    :key="'myexam-list-item'+index2" 
                    v-for="examItem,index2 in examBox.exams"
                    >
                    <t-list-item-meta class="myexam-list-item-question" :image="imageUrl" :title="(index2+1)+'.'+ examItem.question"></t-list-item-meta>
                    <template #action>
                      <t-radio-group v-model="examList[index].exams[index2].ans" class="myexam-list-item-answer" :key="'exam-item-answer'+index2+''+index3" v-for="answer,index3 in examItem.answer">
                        <t-radio-button v-if="examBox.type === 1" class="chose-text" :class="{chosen:index3===examItem.ans}" :value="index3">
                          <div class="chose-icon" :class="{chosen:index3===examItem.ans}"> {{answerMap[index3]}} </div>
                          {{ answer }}
                        </t-radio-button>
                      </t-radio-group>
                      <div v-if="examBox.type === 2 " >
                        <span style="display: inline;">答案：</span>
                        <t-textarea  placeholder="在此输入你的作答内容"
                          v-model="examList[index].exams[index2].ans"
                          :autosize="{ minRows: 3}"
                          >
                        </t-textarea>
                      </div>
                      <t-radio-group v-if="examBox.type === 3" v-model="examList[index].exams[index2].ans" class="myexam-list-item-answer">
                        <t-radio-button  class="chose-text" :class="{chosen:0===examItem.ans}" :value="0">
                          <div class="chose-type-3-button">
                            <icon name="check"></icon>
                          </div>
                        </t-radio-button>
                        <t-radio-button class="chose-text" :class="{chosen:1===examItem.ans}" :value="1">
                          <div class="chose-type-3-button">
                            <icon name="close"></icon>
                          </div>
                        </t-radio-button>
                      </t-radio-group>
                    </template>
                  </t-list-item>
                </t-list>
              </t-space>
            </div>
          </t-content>
          <t-footer></t-footer>
        </t-layout>
        <t-aside class="myexam-menu-side" style="border-top: 1px solid var(--component-border)">
          <div title="出卷组题" class="myexam-menu-side-item"><icon title="出卷组题" name="article" ></icon></div>
          <div title="二级——所有迁移" class="myexam-menu-side-item"><icon title="二级——所有迁移" name="folder-import" ></icon></div>
          <div title="删除" class="myexam-menu-side-item"><icon title="删除" name="delete" ></icon></div>
        </t-aside>
        <t-aside class="myexam-date-side" width="15%" style="border-top: 1px solid var(--component-border)">
          <t-date-picker v-model="activeDate" clearable :prefix-icon="renderPrefixIcon"></t-date-picker>
        </t-aside>
      </t-layout>
    </t-layout>
  </div>
</template>
<script>
import { Icon } from 'tdesign-icons-vue-next';
export default {
  /* 罗进兴 */
  components: {
    Icon
  },
  name: 'MyExamIndex',
  props: {
    msg: String
  },
  data() {
    return {
      answerMap:["A","B","C","D","E"],
      activeDate: '2024-04-01',
      activeSubject: '英语',
      //练习日期
      examDates: [
        {
          date: '2024-04-01',
        },
        {
          date: '2024-04-02',
        }
      ],
      subjects: [
        {
          name: '英语',
          id: '1'
        },
        {
          name: '语文',
          id: '2'
        },
        {
          name: '数学',
          id: '3'
        }
      ],
      examList: [
        {
          name: '选择题',
          type: 1,
          exams: [
            {
              "question": "弗洛伊德的心理分析理论中，人格结构由哪三部分组成？",
              "answer": [
                "自我（Ego）、超我（Superego）、本我（Id）",
                "潜意识、前意识、意识",
                "认知、情感、行为",
                "大脑皮层、边缘系统、脑干"
              ],
              "ans":0,
              "correct": 0
            },
            {
              "question": "Choose the correct relative pronoun to complete the sentence: I visited the museum _______ my friend works as a curator. ",
              "answer": [
                "which",
                "whose",
                "where",
                "when"
              ],
              "ans":0,
              "correct": 0
            }
          ]
        },
        {
          name: '填空题',
          type: 2,
          exams: [
            {
              "question": "在心理学中，____ 是指个体对其所处环境的感知、认识和解释，这一过程是主观的，并且受个体先前的经验、信念和情绪状态的影响。",
              "correct": ""
            }
          ]
        },
        {
          name: '判断题',
          type: 3,
          exams: [
            {
              "question": "在心理学中，认知失调理论表明，当个体在两个相互冲突的信念或行为之间经历了内在的不一致或冲突时，他们会感到不适，并且会采取行动来减少这种不一致或冲突。",
              "correct": 0
            },
            {
              "question": "Choose the correct relative pronoun to complete the sentence: I visited the museum _______ my friend works as a curator. ",
              "answer": [
                "which",
                "whose",
                "where",
                "when"
              ],
              "correct": 0
            }
          ]
        },
      ]
    }
  }
}
</script>

<style>
.t-icon {
  cursor: pointer;
}
#MyExamIndex {

}
#MyExamIndex .menu-header{
  height: 82px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
#MyExamIndex .menu-header .t-menu {
  font-size: var(--td-size-7);
}
#MyExamIndex .t-menu__item {
  user-select: none;
  color:#000;
  height:53px;
  font-size: var(--td-size-6);
  margin: 12.5px 0;
  border: solid 1px  #4566FC;
  border-radius: 16px;
  transition: .3s;
}
#MyExamIndex .t-menu__item .t-menu__content {
  display: flex;
  width:100%;
  align-items: center;
}
#MyExamIndex .t-menu__item.t-is-active,
#MyExamIndex .t-menu__item:hover{
  transition: .3s;
  color:#fff;
  opacity: 1;
  border-radius: 16px;
  background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
#MyExamIndex .t-menu__item.t-is-active .icon ,
#MyExamIndex .t-menu__item:hover .icon{
  color:#fff;
}
#MyExamIndex .t-menu__item.t-is-active .edit-icon {
  display: inline-block;
}
#MyExamIndex  .edit-icon {
  display: none;
}
#MyExamIndex .myexam-left-side{
  left: 0px;
  opacity: 1;
  position: sticky;
  border-radius: 0px 32px 0px 0px;
  padding-top: 25px;
  background: rgba(255, 255, 255, 1);
}
#MyExamIndex  .myexam-main-content {
  background: #fff;
  margin-left: 80px;
  padding: 20px 20px;
  border-radius: 32px 32px 0px 0px;
}
#MyExamIndex  .myexam-list-item .t-list-item-main{
  align-items:start;
  display: flex;
  flex-direction: column;
}
#MyExamIndex  .myexam-list-item .t-list-item__meta-title {
  text-align: left;
  line-height: var(--td-size-10);
}
#MyExamIndex  .myexam-list-item .t-list-item__action {
  text-align: left;
  display: flex;
  flex-direction: column;
  line-height: var(--td-size-12);
  align-items: start;
  color:#000;
}
#MyExamIndex  .myexam-list-item.row .t-list-item__action{
  text-align: left;
  display: flex;
  flex-direction: row;
  line-height: var(--td-size-12);
  justify-content: space-between;
  width: 100%;
  color:#000;
}
#MyExamIndex  .myexam-list-item .myexam-list-item-answer {
  margin: 2px 0;
}
#MyExamIndex  .myexam-list-item .myexam-list-item-answer label{
  border: none;
}
#MyExamIndex  .myexam-list-item .myexam-list-item-answer:hover .chose-icon,
#MyExamIndex  .myexam-list-item-answer .chosen .chose-icon{
  background:#4566FC;
  color:#fff;
}
#MyExamIndex  .myexam-list-item .t-textarea{
  vertical-align: text-top;
  display: inline-block;
  width:380px;
}
#MyExamIndex  .myexam-list-item .chose-icon {
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
#MyExamIndex  .myexam-list-item .chose-type-3-button {
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
#MyExamIndex .chosen .chose-type-3-button ,
#MyExamIndex .chose-type-3-button:hover{
  background:#4566FC;
  color:#fff;
}
#MyExamIndex .myexam-menu-side {
  background: none;
  position: sticky;
  top: 54vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 340px;
  width: 100px;
  display: flex;
}
#MyExamIndex .myexam-menu-side-item {
  border-radius:50%;
  background: #fff;
  color: #575B66;
  width: 64px;
  font-size: var(--td-size-9);
  margin: 20px 40px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
}

#MyExamIndex  .myexam-date-side {
  border-radius: 32px 0px 0px 0px;
}
</style>