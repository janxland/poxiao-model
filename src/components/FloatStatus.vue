<template>
  <div>
    <div class="fixed select-none top-[32px] right-[300px] z-[999] w-[200px] h-[40px] bg-[#fff] rounded-[20px] shadow
    hover:h-[unset] overflow-hidden" ref="dragElement">
      <!-- <input type="text" placeholder="查找状态" class="w-full p-[5px] rounded-[10px] border-[1px] border-[#ccc]"> -->
      <div v-for="i,index in ExamRecords" @click="clickHandle(i)" :key="i?.qustionsContent" class="flex flex-row items-center h-[40px] px-[10px] justify-between cursor-pointer transition 
      hover:bg-[#f5f5f5] hover:text-[#0052d9]">
      <t-tooltip placement="right"  :content="i?.qustionsContent+' '+checkStatus(i).name">
        <div class="w-5/6 text-left whitespace-nowrap overflow-hidden text-ellipsis max-w-[160px] overflow-hidden flex-1">{{ i?.qustionsContent }}</div>
      </t-tooltip>
        <t-tooltip placement="right" :content="checkStatus(i).name">
          <div class="h-[25px] w-[25px] rounded-full ">
            <icon :name="checkStatus(i).icon" :color="checkStatus(i).color" size="25"></icon>
          </div>
        </t-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, onUnmounted } from 'vue';
import { getQuestionList } from '@/api/question'
import { Icon } from 'tdesign-icons-vue-next';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
  
});
const isDragging = ref(false);
const dragElement = ref();
const ExamRecords = ref([
  {
    "examId": 0,
    "qustions": "30,31,32,33,34,35,38,39,40",
    "examStatus": "1",
    "qustionsContent": localStorage.getItem("token") ? "正在获取状态..." : "你还没有登录",
    "qustionsStatus": "0"
  }
])
// 设置自动轮播的定时器
let autoplayInterval;
//出题状态1=出题中,2=已出题,3=考试中,4=已交卷,5=判卷中,6=已判卷，-1=异常退出
const statusMap = ref([{
  id:1,
  name:"出题中",
  icon:"loading",
  color:"#0052d9"
},{
  id:2,
  name:"已出题",
  icon:"check",
  color:"#0052d9"
},{
  id:3,
  name:"考试中",
  icon:"loading",
  color:"#0052d9"
},{
  id:4,
  name:"已交卷",
  icon:"check",
  color:"green"//绿色
},{
  id:5,
  name:"判卷中",
  icon:"loading"
},{
  id:6,
  name:"已判卷",
  icon:"check",
  color:"green"//绿色
},{
  id:-1,
  name:"异常退出",
  icon:"error",
  color:"red"//红色
}])
const clickHandle = (i) =>{
  if (isDragging.value) return;
  // 已出题 和 考试中跳转
  if(i?.examStatus == 2 || i?.examStatus == 3 ){
    router.push('/examPage?id='+i?.examId)
  }
  // 已判卷跳转
  if(i?.examStatus == 6){
    router.push('/incorrect?id='+i?.examId)
  }
}
const checkStatus = (i) => {
  return statusMap.value.find(item => item.id === +i?.examStatus)
}
const startAutoplay = () => {
  clearInterval(autoplayInterval)
  autoplayInterval = setInterval(() => {
    if(localStorage.getItem("token")){
      getQuestionList().then(res => {
        const { data } = res 
        if(data.code === 200) {
          if(data.data.length > 0) {
            ExamRecords.value = data.data;
          } else {
            ExamRecords.value.qustionsContent = "暂无出题及考试记录"
          }
        }
      })
    } else {
      ExamRecords.value.qustionsContent = "你还没有登录..."
    }
  }, 5000);
};

onMounted(() => {
  startAutoplay();
});

const bindDraggle = (el)=> {
  let setPos = {
    x: 0,
    y: 0
  };
  let lastPos = {
    x: 0,
    y: 0
  };
  
  function move(curPos) {
    const d = {
      dX: curPos.x - lastPos.x,
      dY: curPos.y - lastPos.y
    };
    setPos.x += d.dX;
    setPos.y += d.dY;
    el.style.transform = `translate(${setPos.x}px,${setPos.y}px)`;
    lastPos.x = curPos.x;
    lastPos.y = curPos.y;
  }

  el.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    document.body.style.userSelect = 'none';
    lastPos.x = e.clientX;
    lastPos.y = e.clientY;
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });

  function mouseMove(e) {
    isDragging.value = true;
    e.stopPropagation();
    const curPos = {
      x: e.clientX,
      y: e.clientY
    };
    move(curPos);
  }

  function mouseUp(e) {
    e.stopPropagation();
    setTimeout(() => {
      isDragging.value = false;
    }, 100);
    const curPos = {
      x: e.clientX,
      y: e.clientY
    };
    move(curPos);
    document.body.style.userSelect = '';
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener('mouseup', mouseUp);
  }
}
onMounted(() => {
  bindDraggle(dragElement.value)
})
</script>

<style scoped>
</style>