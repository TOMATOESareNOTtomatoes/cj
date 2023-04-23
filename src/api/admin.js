import serviceAxios from '@/utils/http/axiosZ.js'

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