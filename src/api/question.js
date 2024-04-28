import request from '@/utils/request'
/**
 * 获取用户出题列表
 * @returns 
 */
export function getQuestionList() {
  return request({
    url: '/reviewmaster/question/records',
    method: 'get'
  })
}
/**
 * 根据 examId 获取题库列表
 * @param {examId} data 
 * @returns 
 */
export function getExamQuestions(data) {
  return request({
    url: '/reviewmaster/question/record/questions',
    method: 'get',
    params: {
      examId: data
    }
  })
}
/**
 * 提交答案
 * @param {Object} examRMAnswerReq
 * @param {Array} examRMAnswerReq.answerList
 * @param {Number} examRMAnswerReq.examId
 * @param {Number} examRMAnswerReq.flag -区分提交和定时保存 0是提交 1是定时保存
 * @returns
 */
export function commitExam(data) {
  return request({
    url: '/api/reviewmaster/question/commitExam',
    method: 'post',
    data
  })
}