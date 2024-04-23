import request from '@/utils/request'
/**
 * 获取用户题库列表
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
      examId : data
    }
  })
}