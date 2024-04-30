<template>
  <div>
    <div>
      <div class="w-[100%]">
        <div class="w-[100%] flex flex-row">
          <div class="sticky z-[2] h-[100vh] top-[0] select-none text-white w-[200px]" :class="{ 'hiddenNav': route.meta.hiddenNav }">
            <div class="h-[100%] w-[200px]">
              <div class="h-[100%] flex flex-col justify-between items-center" style="background:linear-gradient(-210deg, rgb(57, 76, 200), rgb(61, 101, 191), rgb(43, 72, 146))">
                <div class="mt-[32px]">
                  <div class="flex flex-row justify-center items-center">
                    <t-image class="bg-[transparent] w-[32px] h-[32px] mr-[10px]" :src="logo"></t-image>
                    <router-link class="text-[20px]" :to="{ path: '/' }">复习大师</router-link>
                  </div>

                </div>
                <div class="m-lf-layout-content cursor-pointer  transition">
                  <div class="m-lf-layout-row" @click="router.push('/myexam')">
                    <icon name="book" size="20px" class="w-[30px] h-[30px] mr-4" />
                    我的题库
                  </div>
                  <div class="m-lf-layout-row" @click="router.push('/incorrect')">
                    <icon name="system-log" size="20px" class="w-[30px] h-[30px] mr-4" />
                    错题本
                  </div>
                  <div class="m-lf-layout-row" @click.stop="recordShow = !recordShow"
                    :class="recordShow ? 'bg-record_bg' : ''">
                    <icon name="time" size="20px" class="w-[30px] h-[30px] mr-4" />
                    历史记录
                  </div>
                  <div class="absolute h-[50vh] w-[20vw] top-[20vh] left-[200px] z-[9999] rounded-2xl p-4"
                    v-show="recordShow" id="record" style="background-color: rgba(26, 71, 126, 1);" @click.stop="">
                    <div class="text-left ">历史记录</div>
                    <div class="flex items-center mt-2">
                      <t-input placeholder="搜索历史出题记录" v-model="search" class="flex-1 *:bg-record_bg  *:border-0 " @blur="searchRecord" @enter="searchRecord">
                        <template #suffixIcon>
                          <icon name="search" style="cursor: pointer;" color="white"></icon>
                        </template>
                      </t-input>
                      <div class="w-9 h-9 leading-9 bg-record_bg rounded-full ml-2" @click="clearSearch">
                        <icon name="delete" size="20" color="white"></icon>
                      </div>
                    </div>
                    <div class="mt-4">
                      <div class="flex flex-nowrap" >
                        <div v-for="i, index in recordTypeList"
                          class="w-1/2 text-gray-300 cursor-pointer transition-all duration-300 transform" :class="activeRecord == index ? 'text-green-400' : ''" :key="'recordList' + index"
                          @click="activeRecord = index">
                          {{ i }}
                          <div class="h-1  transition-all duration-300 transform"
                            :class="activeRecord == index ? 'bg-green-400' : 'bg-slate-700'"></div>
                        </div>
                      </div>
                    </div>
                    <div class="h-[300px] mt-4 overflow-auto"  v-loading="recordLoading">
                      <div
                        @click="recordClick(i)" v-for="i, index in recordList?.filter(i=>i?.qustionsStatus == activeRecord)"
                        class="rounded-2xl text-left px-4 py-2 flex items-center justify-between my-1 cursor-pointer"
                        :key="'recordListData' + index" :class="i.examId == route.query.id ? 'bg-blue-500/90 ':'bg-record_bg/75'">
                        <div class="w-5/6 text-ellipsis text-nowrap overflow-hidden">{{ i?.qustionsContent }}</div>
                        <div class="h-[25px] w-[25px] rounded-full "
                          :style="{ background: +i?.qustionsStatus == 1 ? 'rgba(67, 207, 124, 1)' : 'rgba(255, 87, 51, 1)' }">
                          <icon :name="+i?.qustionsStatus == 1 ? 'check' : 'error'" color="white" size="25"></icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Foot info  -->
                <div class="flex p-[10px] flex-col h-[200px] justify-around text-white">
                  <div class="flex flex-row justify-center items-center">
                    <t-avatar class="w-[32px] h-[32px] mr-[10px]" :image="userStore.user.avatar" :hide-on-load-failed="false" />
                    <router-link :to="{ path: '/myindex' }"> {{ userStore.user.nickname || "学生" }} </router-link>
                  </div>
                  <div>在线客服</div>
                  <div class="text-[12px]">版本：V1.29</div>
                  <div class="text-[12px]">《复习大师用户协议》|《复习大师隐私策略》</div>
                </div>
              </div>

            </div>

          </div>
          <div class="flex-1" @click="recordShow = false">
            <!-- <t-layout class="fill-layout"> -->
            <router-view></router-view>
            <!-- </t-layout> -->
          </div>
        </div>
      </div>

    </div>


    <!-- 弹出框---登录1 -->

    <!-- 弹出框 end---登录1 -->

    <!-- 弹出框---登录2 -->

    <!-- 弹出框 end---登录2 -->


    <!-- 弹出框---兴趣选项 -->

    <!-- 弹出框 end---兴趣选项 -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
import { useRoute, useRouter } from 'vue-router';
import { getQuestionList } from '@/api/question'
import { useUserStore } from '@/store/user';
import { MessagePlugin } from 'tdesign-vue-next';
const userStore = useUserStore();
// 获取当前路由对象  
const route = useRoute();
const router = useRouter()
const isLogin2 = ref(false);
localStorage.getItem("token") ? isLogin2.value = true : isLogin2.value = false;

const logo = require("@/assets/images/logo.png");
const visible = ref(false);
// 对话框2
const visible2 = ref(false);

//出题记录
const recordList = ref([])
const recordTypeList = ref(['知识点出题','文件出题'])
const activeRecord = ref(0)
const recordShow = ref(false)
const recordLoading = ref(true)
const getRecordList = (str) => {
  let params = {}
  if(str){
    params.title = str
  }
  getQuestionList(params).then(res => {
    recordList.value = res.data.data
    recordLoading.value = false
    console.log(res.data.data,11)
  })
}
const recordClick = (i) =>{
  if(i.examStatus == 1){
    MessagePlugin.warning('正在出题中')
  }
  else if(i.examStatus == 2 || i.examStatus == 3){
    router.push('/examPage?id='+ i?.examId)
  }
  else if(i.examStatus == 4 || i.examStatus == 5){
    MessagePlugin.warning('判卷中')
  }
  else if(i.examStatus == 6){
    router.push('/judgment?id='+ i?.examId)
  }
  else if(i.examStatus == -1 ){
    MessagePlugin.warning('后台错题，请联系管理员')
  }
}
getRecordList()
const search = ref('')
const searchRecord = (str) =>{
  if(str != ''){
    recordLoading.value = true
    getRecordList(str)
  }  
}
const clearSearch = () =>{
  if(search.value != ''){
    search.value = ''
    recordLoading.value = true
    getRecordList()
  } 
}

watch(() => route.fullPath, () => {
  recordShow.value = false
})
// 对话框3
const interestList = [
  {
    name: '小学', code: '10001', children: [
      { name: '语文', code: '1000101' },
      { name: '数学', code: '1000102' },
      { name: '英语', code: '1000103' },
      { name: '美术', code: '1000104' },
      { name: '科学', code: '1000105' }
    ]
  },
  {
    name: '中学', code: '10002', children: [
      { name: '语文', code: '1000201' },
      { name: '数学', code: '1000202' },
      { name: '英语', code: '1000203' },
      { name: '物理', code: '1000204' },
      { name: '化学', code: '1000205' },
      { name: '政治', code: '1000206' },
      { name: '生物', code: '1000207' },
      { name: '地理', code: '1000208' },
      { name: '历史', code: '1000209' },
    ]
  },
  {
    name: '大学', code: '10003', children: [
      { name: '哲学', code: '1000301' },
      { name: '经济学', code: '1000302' },
      { name: '财政学', code: '1000303' },
      { name: '金融学', code: '1000304' },
      { name: '经济与贸易', code: '1000305' },
      { name: '法学', code: '1000306' },
      { name: '政治学', code: '1000307' },
      { name: '社会学', code: '1000308' },
      { name: '民族学', code: '1000309' },
    ]
  }
];
</script>
<style lang="scss" scoped>
@import './mytheme.css';

::v-deep #record .t-input__inner {
  color: white !important;
  ;
}

::v-deep #record .t-input__inner::placeholder {
  color: rgba(166, 166, 166, 1) !important;
}

::v-deep #record .t-input .t-input__suffix>.t-icon {
  color: rgba(166, 166, 166, 1) !important;
}

.t-space {
  width: 100%;
}

header {
  background-color: var(--td-success-color-5);
}

/* main,section{
  background-color: white; 
} */
aside {
  /* background-color: var(--td-success-color-5); */
}

.fill-layout {
  height: 100%;
}

#root,
body,
html,
aside,
content {
  height: 100%;
}

.t-skeleton-demo-paragraph {
  line-height: 25px;
}

.hiddenNav {
  width: 0;
  overflow: hidden;
  transition: .3s
}

.main-menu-aside section {
  width: 200px;
}

</style>