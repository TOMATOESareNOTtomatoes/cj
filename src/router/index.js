//router文件夹下新建index.js文件
import { createRouter, createWebHashHistory } from 'vue-router'
import cookie from 'js-cookie'

//注册路由 具体路径放另一个文件了
import routess from "./routess";

const router = createRouter({
// createWebHashHistory()是使用hash模式路由
// createWebHistory()是使用history模式路由
    history:createWebHashHistory(),
    routes:routess
});

router.beforeEach((to, from) => {
    const token = cookie.get('token')
    console.log("token:",token)
    if (to.meta.requiresAuth && (token===null)) { // 如果 requiresAuth 为 true，但是没有 token 则跳转到登录页面
        console.log("拦截成功")
        return {
            path:'/login',
            query:{redirect:to.fullPath},
        }
    } else {
        console.log("没有拦截")
    }
  })

export default router;