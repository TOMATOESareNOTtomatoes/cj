import serviceAxios from '@/utils/http/axiosZ.js'

export const login=({userName, password })=>{
      return serviceAxios({
            url:"/manage/user/login",
            method:"post",
            data:{                
                  userName:userName,
                  password:password              
            },
            headers: {
                  'content-type': 'application/json'
            }
      });
}