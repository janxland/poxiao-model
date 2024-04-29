import request from '@/utils/request'
import { data } from 'autoprefixer'
/**
 * 获取用户出题列表
 * @param {object} data
 * @param {String} [data.title]
 * @param {String} [data.qustionsMethod]
 * @returns 
 * 出题状态1=出题中,2=已出题,3=考试中,4=已交卷,5=判卷中,6=已判卷，-1=异常退出
 */
export function getQuestionList(data) {
  return request({
    url: '/reviewmaster/question/records',
    method: 'get',
    params: data
  })
}
/**
 * 获取我的题库列表
 * @param {Number} examId
 * @returns 
 */
export function getMyExamList(examId) {
  return request({
    url: '/reviewmaster/question/list',
    method: 'get',
    params: {
      examId
    }
  })
}
// /**
//  * 根据 examId 获取题库列表
//  * @param {} data 
//  * @returns 
//  */
// export function getExamQuestions(data) {
//   return request({
//     url: '/reviewmaster/question/record/questions',
//     method: 'get',
//     params: {
//       examId: data
//     }
//   })
// }
/**
 * 提交答案
 * @param {Object} data
 * @param {Array} data.answerList
 * @param {Number} data.examId
 * @param {Number} data.flag -区分提交和定时保存 0是提交 1是定时保存
 * @returns
 */
export function commitExam(data) {
  return request({
    url: '/reviewmaster/question/commitExam',
    method: 'post',
    data
  })
}
/**
 * 获取错题列表
 * @param {Object} data
 * @param {Number} [data.examId]
 * @returns
 */
export function getIncorrectList(data) {
  return request({
    url: '/reviewmaster/question/errors',
    method: 'get',
    params: data
  })
}
