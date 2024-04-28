<template>
  <div v-for="i, examIndex in questionList" :key="'examList' + examIndex">
    <div class="text-left">
      <span class="text-xl font-bold">{{ questionTypeMap[Number(i.type)]?.label }}</span>
      <div v-for="item, index in i.questionVoList" :key="'exams' + index" class="mt-4">
        <div class="leading-relaxed">
          {{ index + 1 + '.' + item.stem }}
        </div>
        <div v-if="i.type == 1">
          <t-radio-group v-model="item.ans" allow-uncheck :default-value="item.ans" class="!block" @change="change">
            <t-radio-button :value="answerIndex" v-for="answer, answerIndex in item.content" :key="'answer' + answerIndex"
              :disabled="disabled" class="!border-0 !block !h-10">
              <div class="answer" :class="checkAnswer(item, answerIndex)">{{ answerMap[answerIndex] }}</div>{{ answer.content }}
            </t-radio-button>
          </t-radio-group>
        </div>
        <div v-else-if="[2, 3, 5, 6, 7].includes(Number(i.type))">
          <div class="my-4" v-if="disabled">
            答案：
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" v-model="item.correct" :defaultValue="item.correct" :disabled="disabled" />
          </div>
          <div class="my-4">
            你的答案：
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" v-model="item.ans" :defaultValue="item.ans" :disabled="disabled" />
          </div>
        </div>
        <div v-else-if="i.type == 4">
          <div>
            <t-radio-group v-model="item.ans" allow-uncheck :default-value="item.ans" class="!block" @change="change">
              <t-radio-button value="0" :disabled="disabled" class="!border-0 !h-10 !w-8 mr-4">
                <div class="answer" :class="checkAnswer(item, 0)">
                  <icon name="check"></icon>
                </div>
              </t-radio-button>
              <t-radio-button value="1" :disabled="disabled" class="!border-0 !h-10 !w-8 mr-4">
                <div class="answer" :class="checkAnswer(item, 1)">
                  <icon name="close"></icon>
                </div>
              </t-radio-button>
            </t-radio-group>
          </div>
        </div>
        <div class="knowledge" v-if="disabled">
          <div class="text-blue-600 text-md font-bold my-2">涉及知识点</div>
          <div>{{ item.knowledge?.about || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">解题思路</div>
          <div>{{ item.knowledge?.think || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">最佳答案</div>
          <div>{{ item.knowledge?.answer || '暂无' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineModel, } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
const props = defineProps({
  // 允许编辑题目,true为错题界面
  disabled: {
    type: Boolean,
    default: false
  },
  isExam: {
    type: Boolean,
    default: true
  }
})

const change = (n)=>{
  console.log(questionList,n)
}
const questionList = defineModel('questionList',{})
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
const checkAnswer =((item, answerIndex) => {
  if (!props.disabled) return item.ans == answerIndex ? 'active-answer' : '';
  return item.correct == answerIndex ? 'correct-answer' : item.ans == answerIndex ? 'err-answer' : ''
})
</script>
<style lang="scss" scoped>
.answer {
  @apply inline-block rounded-full h-[32px] w-[32px] text-center leading-[32px] bg-slate-200 mr-4
}

.active-answer {
  background: #4566FC;
  @apply text-white
}

.correct-answer {
  background: rgba(67, 207, 124, 1);
  @apply text-white
}

.err-answer {
  background: rgba(255, 87, 51, 1);
  @apply text-white
}

.knowledge {
  background: rgba(241, 247, 250, 1);
  @apply px-4 rounded-md my-2 py-2
}

::v-deep .t-is-disabled {
  color: black !important;
  background: white !important;
}
</style>