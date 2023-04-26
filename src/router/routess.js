
const routess = [


    {
        path: '/',
        name: '登录页面',
        component: () => import('../views/login/myLogin.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/login',
        name: '登录',
        component: () => import('@/views/login/myLogin.vue'),
        meta: { requiresAuth: false }
    },


    {
        path: '/home',
        name: '主页',
        component: () => import('@/views/end/Home.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '/from',
                NamedNodeMap: "待定",
                component: () => import('@/views/end/main/from.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/table',
                NamedNodeMap: "用户管理页面",
                component: () => import('@/views/end/main/admin/table.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/upload',
                NamedNodeMap: "上传统计数据页面",
                component: () => import('@/views/end/main/upload.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/tableAllDo',
                NamedNodeMap: "工作量总表",
                component: () => import('@/views/end/main/tableAllDo.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/additionalTable',
                NamedNodeMap: "院长确认特殊情况表",
                component: () => import('@/views/end/main/userPlus/additionalTable.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/userDotable',
                NamedNodeMap: "用戶個人工作量情況顯示頁面",
                component: () => import('@/views/end/main/userDotable.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/noticeA',
                NamedNodeMap: "管理员发布公告",
                component: () => import('@/views/end/main/notice/notice.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/notice',
                NamedNodeMap: "普通用户查看公告",
                component: () => import('@/views/end/main/notice/home.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/myNotice',
                NamedNodeMap: "查看自己发布的公告",
                component: () => import('@/views/end/main/notice/noticeMyPush.vue'),
                meta: { requiresAuth: true },
            },


        ]
    },

    {
        path: '/:pathMatch(.*)*',
        redirect: '/login'
      }

];


export default routess
