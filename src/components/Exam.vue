<template>
  <div v-for="i, examIndex in questionList" :key="'examList' + examIndex">
    <div class="text-left px-12 py-5">
      <span class="text-xl font-bold">{{ questionTypeMap[Number(i.type)]?.label }}</span>
      <div v-for="item, index in i.questionVoList" :key="'exams' + index" class="mt-4">
        <div>
          {{ index + 1 + '.' + item.stem }}
        </div>
        <div v-if="i.type == 1">
          <t-radio-group v-model="item.ans" allow-uncheck :default-value="item.ans" class="!block">
            <t-radio-button :value="answerIndex" v-for="answer, answerIndex in item.content" :key="'answer' + answerIndex"
              :disabled="disabled" class="!border-0 !block !h-10">
              <div class="answer" :class="checkAnswer(item, answerIndex)">{{ answerMap[answerIndex] }}</div>{{
    answer.content }}
            </t-radio-button>
          </t-radio-group>
        </div>
        <div v-else-if="[2, 3, 5, 6, 7].includes(Number(i.type))">
          <div class="my-4">
            答案：
            <t-textarea placeholder="请输入你的答案" :autosize="{ minRows: 3 }" v-model="item.ans" :defaultValue="item.ans"
              :disabled="disabled" />
          </div>
          <div class="my-4">
            你的答案：
            <t-textarea placeholder="请输入你的答案" :autosize="{ minRows: 3 }" v-model="item.correct"
              :defaultValue="item.correct" :disabled="disabled" />
          </div>
        </div>
        <div v-else-if="i.type == 4">
          <div>
            <t-radio-group v-model="item.ans" allow-uncheck :default-value="item.ans" class="!block">
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
import { ref, defineProps,defineModel } from 'vue'
import { Icon } from 'tdesign-icons-vue-next';
const props = defineProps({
  // id: {
  //   type: String,
  //   required: true
  // },
  // 允许编辑题目
  disabled: {
    type: Boolean,
    default: false
  },
})
const questionList = defineModel('questionList',{
  type:Array,
  default:() => [
      {
        name: '选择题',
        type: 1,
        questionVoList: [
          {
            "stem": "弗洛伊德的心理分析理论中，人格结构由哪三部分组成？",
            "content": [
              {
                content: "自我（Ego）、超我（Superego）、本我（Id）"
              },
              {
                content: "潜意识、前意识、意识"
              },
              {
                content: "认知、情感、行为"
              },
              {
                content: "大脑皮层、边缘系统、脑干"
              }
            ],
            "ans": 0,
            "correct": 0
          },
          {
            "stem": "Choose the correct relative pronoun to complete the sentence: I visited the museum _______ my friend works as a curator. ",
            "content": [
              {
                content: "which"
              },
              {
                content: "whose"
              },
              {
                content: "where"
              },
              {
                content: "when"
              }
            ],
            "ans": 1,
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
            "correct": 1,
            "ans": 0
          }
        ]
      },
    ]
})
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
const checkAnswer = (item, answerIndex) => {
  if (!props.disabled) return item.ans == answerIndex ? 'active-answer' : '';
  return item.correct == answerIndex ? 'correct-answer' : item.ans == answerIndex ? 'err-answer' : ''
}
</script>
<style lang="scss" scoped>
.answer {
  @apply inline-block rounded-full h-[32px] w-[32px] text-center leading-[32px] bg-slate-200 mr-4
}

.active-answer {
  background: #3b83cf;
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