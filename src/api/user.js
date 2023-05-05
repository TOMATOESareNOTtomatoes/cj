import serviceAxios from '@/utils/http/axiosZ.js'

//   import {   } from '@/api/user.js'

//根据用户的token请求获取用户的权限信息
export const getPermissions=()=>{
      return serviceAxios({
            url:"/manage/privileges-user/Info",
            method:"get",
      });
}

//用户确认课程工作量信息
export const UserSureDo=(userDoInfo)=>{
      return serviceAxios({
            url:"/manage/main/UserSureDo",
            method:"post",
            data:userDoInfo,
      });
}


//用户自己添加特殊情况系数
export const addAdditional=(userDoInfo)=>{
      return serviceAxios({
            url:"/manage/main/addAdditional",
            method:"post",
            data:userDoInfo,
      });
}

//根据用户id查询用户课程信息 
export const getUserDoInfo=(userId)=>{
      return serviceAxios({
            url:"/manage/main/getUserDoInfo",
            method:"post",
            data:{userId:userId}
      });
}

//根据token返回用户信息
export const getUserforToken=()=>{
      return serviceAxios({
            url:"/manage/user/getMemberInfo",
            method:"get",
      });
}

//获取通知/公告
export const getAnnouncements=(userCheckParam)=>{
      return serviceAxios({
            url:"/notice/announcement/getAnnouncements",
            method:"post",
            data: userCheckParam
      });
}

//确认 通知
export const SureAnnouncement=(announcement)=>{
      return serviceAxios({
            url:"/notice/announcement/SureAnnouncement",
            method:"post",
            data: announcement
      });
}

// 添加 课程 
export const addmain=(announcement)=>{
      return serviceAxios({
            url:"/manage/main/addMain",
            method:"post",
            data: announcement
      });
}

// 添加 课程 
export const UserReviseDo=(userDoInfo)=>{
      return serviceAxios({
            url:"/manage/main/UserReviseDo",
            method:"post",
            data: userDoInfo
      });
}