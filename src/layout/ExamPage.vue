<template>
<div class="m-8 px-8 py-4 bg-white rounded-lg">
    <div class="text-left flex items-center font-bold my-2">
        <div class="w-10 h-10 rounded-full bg-record_bg flex items-center justify-center mr-4">
            <t-image :src="logo" :style="{ width: '30px', height: '30px', 'background-color': 'transparent' }"></t-image>
        </div>
        题目已智能生成，请你开始作答：
    </div>
    <Exam v-model:questionList="questionList" />
</div>
</template>

<script setup>
import Exam from '@/components/Exam.vue';
const logo = require("@/assets/images/logo.png");
const questionList = [
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
            "ans": '',
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
            // "ans": 1,
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
            // "ans": 0
          }
        ]
      },
    ]

</script>

<style lang="scss" scoped>

</style>