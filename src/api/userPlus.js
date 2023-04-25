import serviceAxios from '@/utils/http/axiosZ.js'

//     import { getUserDo  } from '@/api/userPlus.js'

//获得用户工作量统计表，未确认的
export const getUserDo=()=>{
      return serviceAxios({
            url:"/manage/main/getUserDo",
            method:"get",
      });
}


//返回特殊情况确认列表
export const getAdditionalSure=()=>{
      return serviceAxios({
            url:"/manage/main/getAdditionalSure",
            method:"get",         
      });
}

//同意/通过特殊情况申请
export const AdditionalSure=(ac)=>{
      return serviceAxios({
            url:"/manage/main/AdditionalSure",
            method:"post",         
            data:{ac:ac}
      });
}

//  不  通过特殊情况申请
export const AdditionalUnSure=(ac)=>{
      return serviceAxios({
            url:"/manage/main/AdditionalUnSure",
            method:"post",      
            data:ac   
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