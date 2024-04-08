<template>
  <div id="MyExamIndex">
    <t-layout>
      <t-header class="menu-header">
        <t-head-menu value="item1">
          <icon/>
          我的题库
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside class="myexam-left-side" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeSubject" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeSubject === subject.name }" :key="index" v-for="subject,index in subjects" :value="subject.name"> <icon/>{{ subject.name }}</t-menu-item>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content>
            <div>Content</div>
          </t-content>
          <t-footer>Copyright @ 2019-{{ new Date().getFullYear() }} Tencent. All Rights Reserved</t-footer>
        </t-layout>
      </t-layout>
    </t-layout>
  </div>
</template>
<script>

export default {
  /* 罗进兴 */
  name: 'MyExamIndex',
  props: {
    msg: String
  },
  data() {
    return {
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
      ]
    }
  }
}
</script>

<style>
#MyExamIndex .t-menu__item {
  user-select: none;
  color:#000;
  height:53px;
  font-size: 20px;
  margin: 12.5px 0;
  border: solid 1px  #4566FC;
  border-radius: 16px;
}
#MyExamIndex .menu-header{
  height: 82px;
  font-size: 24px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
#MyExamIndex .menu-header .t-menu {
  font-size: 24px;
}
#MyExamIndex .t-menu__item.t-is-active,
#MyExamIndex .t-menu__item:hover{
  color:#fff;
  opacity: 1;
  border-radius: 16px;
  background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
#MyExamIndex .myexam-left-side{
  left: 0px;
  width: 260px;
  height: 970px;
  opacity: 1;
  border-radius: 0px 44px 0px 0px;
  background: rgba(255, 255, 255, 1);
}

</style>