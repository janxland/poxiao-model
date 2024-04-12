<template>
  <div id="KnowledgeIndex">
    <t-layout>
      <t-header class="menu-header">
        <t-head-menu value="item1" class="font-small" style="cursor:pointer;">
          <router-link to="index">
            <icon class="icon" name="chevron-left" color="#2F3CF4" style="margin-right: 24px;font-size: 40px;" />
          </router-link>
          知识图谱
        </t-head-menu>
      </t-header>
      <t-layout>
        <t-aside width="15%" class="myexam-left-side" style="border-top: 1px solid var(--component-border)">
          <t-menu v-model="activeAreas" class="myexam-subjects-items" theme="light" value="dashboard" style="margin-right: 74px;width:100%;border-radius: 0px 32px 0px 0px;">
            <t-menu-item class="subjects-item" :class="{ active:activeAreas === areas.areasName }" :key="index" v-for="areas,index in atlasData" :value="areas.areasName">
              <icon class="icon" name="folder-1" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
              <span style="flex: 1;">{{ areas.areasName }}</span>
              <icon class="icon edit-icon" :class="{ active:activeAreas === areas.areasName }" name="edit-2" color="#2F3CF4" style="margin:0 10px;font-size: 20px;" />
            </t-menu-item>
            <t-menu-item class="subjects-item"  value="创建新题库">
              <icon class="icon" name="add-circle" color="#2F3CF4" style="margin: 0 10px;font-size: 20px;"/>
              <span>创建新题库</span></t-menu-item>
          </t-menu>
        </t-aside>
        <t-layout>
          <t-content>
            {{ contentData }}
          </t-content>
          <t-footer></t-footer>
        </t-layout>
        <t-aside class="myexam-menu-side" style="border-top: 1px solid var(--component-border)">
          <div title="出卷组题" class="myexam-menu-side-item"><icon title="出卷组题" name="article" ></icon></div>
          <div title="二级——所有迁移" class="myexam-menu-side-item"><icon title="二级——所有迁移" name="folder-import" ></icon></div>
          <div title="删除" class="myexam-menu-side-item"><icon title="删除" name="delete" ></icon></div>
        </t-aside>
        <t-aside class="myexam-date-side" width="15%" style="border-top: 1px solid var(--component-border)">
          
        </t-aside>
      </t-layout>
    </t-layout>
  </div>
</template>
<script setup>
import {  ref,onMounted,watch  } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';

// const answerMap = ["A", "B", "C", "D", "E"];
const atlasData = ref([]);
const activeAreas = ref('英语');

const contentData = ref({});
const fetchApiData = async () => {
  try {
    const response = await fetch('/api/reviewmaster/atlas/list');
    const data = await response.json();
    if(data.code === 200) {
      atlasData.value = data.data;
    }
    console.log(data);
  } catch (error) {
    console.error('Error fetching API data:', error);
  }
};
watch(activeAreas, (newValue) => {
  console.log('activeAreas changed:', newValue);
  contentData.value = atlasData.value.find(item => item.areasName === newValue);
});
onMounted(() => {
  fetchApiData()
})

</script>

<style>
.t-icon {
  cursor: pointer;
}
#KnowledgeIndex {

}
#KnowledgeIndex .menu-header{
  height: 82px;
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}
#KnowledgeIndex .menu-header .t-menu {
  font-size: var(--td-size-7);
}
#KnowledgeIndex .t-menu__item {
  user-select: none;
  color:#000;
  height:53px;
  font-size: var(--td-size-6);
  margin: 12.5px 0;
  border: solid 1px  #4566FC;
  border-radius: 16px;
  transition: .3s;
}
#KnowledgeIndex .t-menu__item .t-menu__content {
  display: flex;
  width:100%;
  align-items: center;
}
#KnowledgeIndex .t-menu__item.t-is-active,
#KnowledgeIndex .t-menu__item:hover{
  transition: .3s;
  color:#fff;
  opacity: 1;
  border-radius: 16px;
  background: linear-gradient(110.93deg, rgba(58, 71, 252, 0.9) 0%, rgba(43, 141, 252, 1) 100%);
}
#KnowledgeIndex .t-menu__item.t-is-active .icon ,
#KnowledgeIndex .t-menu__item:hover .icon{
  color:#fff;
}
#KnowledgeIndex .t-menu__item.t-is-active .edit-icon {
  display: inline-block;
}
#KnowledgeIndex  .edit-icon {
  display: none;
}
#KnowledgeIndex .myexam-left-side{
  left: 0px;
  opacity: 1;
  position: sticky;
  border-radius: 0px 32px 0px 0px;
  padding-top: 25px;
  min-height: 100vh;
  background: rgba(255, 255, 255, 1);
}
#KnowledgeIndex  .myexam-main-content {
  background: #fff;
  margin-left: 80px;
  height: 100%;
  padding: 20px 20px;
  border-radius: 32px 32px 0px 0px;
}
#KnowledgeIndex  .myexam-list-item .t-list-item-main{
  align-items:start;
  display: flex;
  flex-direction: column;
}
#KnowledgeIndex  .myexam-list-item .t-list-item__meta-title {
  text-align: left;
  line-height: var(--td-size-10);
}
#KnowledgeIndex  .myexam-list-item .t-list-item__action {
  text-align: left;
  display: flex;
  flex-direction: column;
  line-height: var(--td-size-12);
  align-items: start;
  color:#000;
}
#KnowledgeIndex  .myexam-list-item.row .t-list-item__action{
  text-align: left;
  display: flex;
  flex-direction: row;
  line-height: var(--td-size-12);
  justify-content: space-between;
  width: 100%;
  color:#000;
}
#KnowledgeIndex  .myexam-list-item .myexam-list-item-answer {
  margin: 2px 0;
}
#KnowledgeIndex  .myexam-list-item .myexam-list-item-answer label{
  border: none;
}
#KnowledgeIndex  .myexam-list-item .myexam-list-item-answer:hover .chose-icon,
#KnowledgeIndex  .myexam-list-item-answer .chosen .chose-icon{
  background:#4566FC;
  color:#fff;
}
#KnowledgeIndex  .myexam-list-item .t-textarea{
  vertical-align: text-top;
  display: inline-block;
  width:380px;
}
#KnowledgeIndex  .myexam-list-item .chose-icon {
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
#KnowledgeIndex  .myexam-list-item .chose-type-3-button {
  width: 48px;
  height: 48px;
  margin-top:5px;
  font-size: var(--td-size-10);
  background-color: #EBEEF0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#KnowledgeIndex .chosen .chose-type-3-button ,
#KnowledgeIndex .chose-type-3-button:hover{
  background:#4566FC;
  color:#fff;
}
#KnowledgeIndex .myexam-menu-side {
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
#KnowledgeIndex .myexam-menu-side-item {
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

#KnowledgeIndex  .myexam-date-side {
  border-radius: 32px 0px 0px 0px;
}
</style>