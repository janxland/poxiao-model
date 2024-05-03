<template>
  <div v-if="!questionList?.length" class="text-2xl font-bold pt-10 text-gray-300">
    暂无数据
  </div>
  <div v-for="i, examIndex in questionList" :key="'examList' + examIndex" v-else >
    <div class="text-left">
      <span class="text-xl font-bold">{{ questionTypeMap.find(v=>i.type == v.value)?.label }}</span>
      <div v-for="item, index in i.questionVoList" :key="'exams' + index" class="mt-4">
        <div class="leading-relaxed" v-if="i.type != 35">
          {{ index + 1 + '.' + item.stem }}
        </div>
        <div class="leading-relaxed" v-if="i.type == 35">
          {{ index + 1 + '.'  }}<b>材料：</b>{{ JSON.parse(item.stem)?.materials_part}} <hr>
          <b>问题：</b>{{ JSON.parse(item.stem)?.question_part }}
        </div>
        <!-- 单选 -->
        <div v-if="i.type == 1">
          <t-radio-group v-model="item.ans" allow-uncheck class="!block" :readonly="onlyread">
            <t-radio-button :value="answer.prefix" v-for="answer, answerIndex in item.content"
              :key="'answer' + answerIndex" :disabled="disabled" class="!border-0 !block !h-10">
              <div class="answer" :class="checkAnswer(item, answer.prefix)">{{ answerMap[answerIndex] }}</div>{{ answer.content }}
            </t-radio-button>
          </t-radio-group>
        </div>
        <!-- 多选 -->
        <div v-else-if="i.type == 11">
          <t-checkbox-group v-model="item.ans" v-if="!disabled">
            <t-checkbox :key="'answer' + answerIndex" :label="answer.content" :value="answer.prefix" v-for="answer, answerIndex in item.content" />
          </t-checkbox-group>
          <t-checkbox-group :default-value="item.correctAnswer " v-else  :readonly="onlyread">
            <t-checkbox :key="'answer' + answerIndex" :label="answer.content" :value="answer.prefix" v-for="answer, answerIndex in item.content" />
          </t-checkbox-group>
        </div>
        <!-- 简答 -->
        <div v-else-if="i.type?.toString().startsWith('3') || i.type == 2" >
          <div class="my-4" v-if="disabled">
            答案：
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" :defaultValue="item.correctAnswer" disabled />
          </div>
          <div class="my-4">
            你的答案：
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" :defaultValue="item.answerContent" disabled v-if="disabled"/>
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" :readonly="onlyread" v-model="item.ans" :defaultValue="item.ans"  v-else/>
          </div>
        </div>
                <!-- 简答 -->
        <div v-else-if="i.type?.toString().startsWith('3') || i.type == 2" >
          <div class="my-4" v-if="disabled">
            答案：
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" :defaultValue="item.correctAnswer" disabled />
          </div>
          <div class="my-4">
            你的答案：
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" :defaultValue="item.answerContent" disabled v-if="disabled"/>
            <t-textarea placeholder="在此输入你的作答内容" :autosize="{ minRows: 3 }" :readonly="onlyread" v-model="item.ans" :defaultValue="item.ans"  v-else/>
          </div>
        </div>
        <!-- 判断 -->
        <div v-else-if="i.type == 4">
          <div>
            <t-radio-group v-model="item.ans" allow-uncheck :default-value="item.ans" class="!block" :readonly="onlyread">
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
        <div class="knowledge" v-if="disabled && !(i.type?.toString().startsWith('3'))">
          <div class="text-blue-600 text-md font-bold my-2">解题思路</div>
          <div>{{ item.analysis?.review_and_analysis || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">涉及知识点</div>
          <div>{{ item.analysis?.concept_analysis || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">最佳答案</div>
          <div>{{ item.analysis?.options_analysis || '暂无' }}</div>
        </div>
        <div class="knowledge" v-if="disabled && (i.type?.toString().startsWith('3'))">
          <div class="text-blue-600 text-md font-bold my-2">审题及分析</div>
          <div>{{ item.analysis?.review_and_analysis || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">解题思路</div>
          <div>{{ item.analysis?.questions_solving_ideas  || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">答题要点</div>
          <div>{{ item.analysis?.key_points_to_answer_the_question  || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">用户答案分析</div>
          <div>{{ item.analysis?.user_answer_analysis  || '暂无' }}</div>
          <div class="text-blue-600 text-md font-bold my-2">建议与总结</div>
          <div>{{ item.analysis?.suggestions_and_summary || '暂无' }}</div>
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
  onlyread: {
    type: Boolean,
    default: false
  },
})

const questionList = defineModel('questionList', {})
const answerMap = ref(["A", "B", "C", "D", "E"]);
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
const checkAnswer = ((item, answer) => {
  if (props.onlyread)  return ''
  if (!props.disabled) return item.ans == answer ? 'active-answer' : '';
  return item.correctAnswer?.toLowerCase() == answer ? 'correct-answer' : item.answerContent == answer ? 'err-answer' : ''
})
const formatter = (item,i) =>{
  return i.type == '2' ? JSON.parse(item.correctAnswer).map(i=> i.prefix + '：' + i.content).join(' ') : item.correctAnswer
}
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