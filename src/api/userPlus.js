import serviceAxios from '@/utils/http/axiosZ.js'

//     import { getUserDo  } from '@/api/userPlus.js'

//获得用户工作量统计表，未确认的
export const getUserDo=()=>{
      return serviceAxios({
            url:"/manage/main/getUserDo",
            method:"get",
      });
}

//返回 新添加的 课程信息 用于确认
export const getAddMain=(userCheckParam)=>{
      return serviceAxios({
            url:"/manage/main/getAddMainList",
            method:"post",    
            data:userCheckParam     
      });
}

//确认 新课
export const sureAddMain=(userCheckParam)=>{
      return serviceAxios({
            url:"/manage/main/sureAddMain",
            method:"post",    
            data:userCheckParam     
      });
}

//返回特殊情况确认列表
export const getAdditionalSure=(userCheckParam)=>{
      return serviceAxios({
            url:"/manage/main/getAdditionalListByF",
            method:"post",    
            data:userCheckParam     
      });
}

//同意 / 通过特殊情况申请
export const AdditionalSure=(acSure)=>{
      return serviceAxios({
            url:"/manage/main/AdditionalSure",
            method:"post",         
            data:acSure,
      });
}

//  不  通过特殊情况申请
export const AdditionalUnSure=(acSure)=>{
      return serviceAxios({
            url:"/manage/main/AdditionalUnSure",
            method:"post",      
            data:acSure   
      });
}

//  发布新的公告。
export const addAnnouncement=(announcement)=>{
      return serviceAxios({
            url:"/notice/announcement/addAnnouncement",
            method:"post",
            data:announcement
      });
}

//查看自己发布的公告
export const myAnnouncements=(userCheckParam)=>{
      return serviceAxios({
            url:"/notice/announcement/myAnnouncements",
            method:"post",
            data:userCheckParam
      });
}

// 跟 新 / 修 改 自己发布的公告
export const upAnnouncement=(announcement)=>{
      return serviceAxios({
            url:"/notice/announcement/upAnnouncement",
            method:"post",
            data:announcement
      });
}

// 跟 新/修 改 自己发布的公告
export const deleteAnnouncement=(announcement)=>{
      return serviceAxios({
            url:"/notice/announcement/deleteAnnouncement",
            method:"delete",
            data:announcement
      });
}