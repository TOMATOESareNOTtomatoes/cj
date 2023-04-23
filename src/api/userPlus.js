import serviceAxios from '@/utils/http/axiosZ.js'

//返回特殊情况确认列表
export const getAdditionalSure=()=>{
      return serviceAxios({
            url:"/manage/main/getAdditionalSure",
            method:"get",         
      });
}

//院长发布新的公告。
export const addAnnouncement=(announcement)=>{
      return serviceAxios({
            url:"/notice/announcement/addAnnouncement",
            method:"post",
            data:{announcement:announcement}
      });
}