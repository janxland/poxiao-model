import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { commitExam } from '@/api/question'
//获取一份考卷数据，监测是否变化，变化则定时保存，同时暴露主动保存方法
//1代表定时上传，0代表主动上传
export default function useCommitExam(source,examId){
    //判断是否页面切换导致数据变化
    let flag = true
    const route = useRoute()
    const router = useRouter()
    watch(()=>[route.fullPath,examId.value],((newVal,old)=>{
        flag = false
    }),{immediate:true})
    let timer
    watch(source,()=>{
        if(flag){
            //防抖
            if(timer)
            clearTimeout(timer)
            timer = setTimeout(()=>{submit(1)},1500)
        }
    flag = true
    },{deep:true})
    const submit = (flag = 0)=>{
        let params = {
          examId:examId.value,
          flag
        }
        console.log(source.value)
        params.answerList = source.value.reduce((pre,cur)=>{
          return [
            ...pre,
            ...cur.questionVoList.map(question=>
              ({questionId: question.questionId ,
              answerContent: Array.isArray(question.ans) ? question.ans.join(',') : (question.ans || '' ) ,
              answerType:cur.type}))
            ]
        },[])
        commitExam(params).then(res=>{
          if(res.code == 200){
            MessagePlugin.success('提交成功')
            localStorage.removeItem(`exam${examId.value}`)
            router.push('/')
          }
        }).catch(err=>{
          console.log(err)
        })
        
      }
    return {
        submit
    }
}
