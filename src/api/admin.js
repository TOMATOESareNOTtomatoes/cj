import serviceAxios from '@/utils/http/axiosZ.js'

//     import {   } from '@/api/admin.js'


//返回 新添加的 课程信息 用于确认
export const getAddMain=()=>{
      return serviceAxios({
            url:"/manage/main/getAddMainListA",
            method:"post",         
      });
}

//确认 新课  管理员
export const sureAddMainA=(userCheckParam)=>{
      return serviceAxios({
            url:"/manage/main/sureAddMainA",
            method:"post",    
            data:userCheckParam     
      });
}

//上传文件接口
export const upload=(formData)=>{
      return serviceAxios({
            url:"/manage/main/upload",
            method:"post",
            data:formData,
            headers: {
                  'content-type': 'multipart/form-data'
            }
            
      });
}

//用户信息管理接口，查看所有用户信息的
export const table=(formData)=>{
      return serviceAxios({
            url:"/manage/user/userInfo",
            method:"get",
            data:formData,
      });
}

//更新/修改用户的信息的
export const revise=(formData)=>{
      return serviceAxios({
            url:"/manage/user/updateUser",
            method:"post",
            data:formData,
      });
}

//删除用户的
export const delete1=(formData)=>{
      return serviceAxios({
            url:"/manage/user/deleteUser",
            method:"delete",
            data:formData,
      });
}

//查看全部教师的工作量的
export const getALLDO=()=>{
      return serviceAxios({
            url:"/manage/user/getAllDo",
            method:"get",
      });
}

//管理员发布新的公告。
export const addAnnouncement=(announcement)=>{
      return serviceAxios({
            url:"/notice/announcement/addAnnouncement",
            method:"post",
            data:announcement
      });
}

//返回特殊情况确认列表
export const getAdditionalSure=()=>{
      return serviceAxios({
            url:"/manage/main/getAdditionalSure",
            method:"get",        
      });
}

//同意 / 通过特殊情况申请
export const AdditionalSureA=(acSure)=>{
      return serviceAxios({
            url:"/manage/main/AdditionalSureA",
            method:"post",         
            data:acSure,
      });
}

//  不  通过特殊情况申请  管理员的 
export const AdditionalUnSureA=(acSure)=>{
      return serviceAxios({
            url:"/manage/main/AdditionalUnSureA",
            method:"post",      
            data:acSure   
      });
}


