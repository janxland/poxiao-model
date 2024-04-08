<template>
  <div id="MyExamIndex">
    <t-layout>
      <t-header class="menu-header">
        <t-head-menu value="item1" class="font-small" style="cursor:pointer;">
          <icon class="icon" name="chevron-left" color="#2F3CF4" style="margin-right: 24px;font-size: 40px;" />
          我的题库
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside class="myexam-left-side" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeSubject" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeSubject === subject.name }" :key="index" v-for="subject,index in subjects" :value="subject.name">
              <icon class="icon" name="folder-1" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
              <span>{{ subject.name }}</span>
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
                <t-list  :split="false" :title="examBox.name" :key="'exam-box'+index" v-for="examBox,index in examList">
                  <t-list-item :split="false">
                    <t-list-item-meta class="myexam-list-item-question" :title="examBox.name"></t-list-item-meta>
                  </t-list-item>
                  <t-list-item 
                  class="myexam-list-item"
                  :key="'myexam-list-item'+index2" 
                  v-for="examItem,index2 in examBox.exams"
                  >
                    <t-list-item-meta class="myexam-list-item-question" :image="imageUrl" :title="(index2+1)+'.'+ examItem.question"></t-list-item-meta>
                    <template #action>
                      <span class="myexam-list-item-answer" :key="'exam-item-answer'+index2+''+index3" v-for="answer,index3 in examItem.answer">
                        <div class="chose-icon" :class="{chosen:index3===examItem.correct}"> {{answerMap[index3]}} </div>
                        {{ answer }}
                      </span>
                    </template>
                  </t-list-item>
                </t-list>
              </t-space>
            </div>
          </t-content>
          <t-footer>Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer>
        </t-layout>
        <t-aside class="myexam-menu-side" style="border-top: 1px solid var(--component-border)">
          <div class="myexam-menu-side-item"><icon name="app" ></icon></div>
          <div class="myexam-menu-side-item"><icon name="app" ></icon></div>
          <div class="myexam-menu-side-item"><icon name="app" ></icon></div>
        </t-aside>
        <t-aside class="myexam-date-side" style="border-top: 1px solid var(--component-border)">
          
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
      activeSubject: '英语',
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
          exams: [
            {
              "question": "弗洛伊德的心理分析理论中，人格结构由哪三部分组成？",
              "answer": [
                "自我（Ego）、超我（Superego）、本我（Id）",
                "潜意识、前意识、意识",
                "认知、情感、行为",
                "大脑皮层、边缘系统、脑干"
              ],
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
        }
      ]
    }
  }
}
</script>

<style>
#MyExamIndex {
  height: 100vh;
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
}
#MyExamIndex .t-menu__item.t-is-active,
#MyExamIndex .t-menu__item:hover{
  color:#fff;
  opacity: 1;
  border-radius: 16px;
  background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
#MyExamIndex .t-menu__item.t-is-active .icon ,
#MyExamIndex .t-menu__item:hover .icon{
  color:#fff;
}
#MyExamIndex .myexam-left-side{
  left: 0px;
  width: 260px;
  opacity: 1;
  position: sticky;
  border-radius: 0px 32px 0px 0px;
  padding-top: 25px;
  min-height: 970px;
  background: rgba(255, 255, 255, 1);
}
#MyExamIndex  .myexam-main-content {
  background: #fff;
  margin-left: 50px;
  width: 1000px;
  height: 100%;
  padding: 30px 20px;
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
#MyExamIndex  .myexam-list-item .chose-icon.chosen {
  color:#fff;
  background:#4566FC;
}
#MyExamIndex .myexam-menu-side {
  background: none;
  position: sticky;
  top: 54vh;
  text-align: center;
  height: 256px;
  display: block;
}
#MyExamIndex .myexam-menu-side-item {
  border-radius:50%;
  background: #fff;
  width: 64px;
  margin: 20px 40px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
}
</style>