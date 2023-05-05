
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
                path: '',
                NamedNodeMap: "查看公告，默认加载页面",
                component: () => import('@/views/end/main/notice/home.vue'),
                meta: { requiresAuth: true },
            },

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
                path: '/additionalAdmin',
                NamedNodeMap: "管理员查看特殊情况申请页面",
                component: () => import('@/views/end/main/admin/additionalTable.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/sureAddMain',
                NamedNodeMap: "管理员查看新课申请页面",
                component: () => import('@/views/end/main/admin/sureAddMain.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/upload',
                NamedNodeMap: "上传统计数据页面",
                component: () => import('@/views/end/main/admin/upload.vue'),
                meta: { requiresAuth: true },
            },

            // plus

            {
                path: '/userDo',
                NamedNodeMap: "院长确认课程信息表",
                component: () => import('@/views/end/main/userPlus/userDo.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/tableAllDo',
                NamedNodeMap: "工作量总表",
                component: () => import('@/views/end/main/userPlus/tableAllDo.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/additionalTable',
                NamedNodeMap: "院长确认特殊情况表",
                component: () => import('@/views/end/main/userPlus/additionalTable.vue'),
                meta: { requiresAuth: true },
            },
    

            {
                path: '/noticeA',
                NamedNodeMap: "发布公告",
                component: () => import('@/views/end/main/notice/notice.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/myNotice',
                NamedNodeMap: "查看自己发布的公告",
                component: () => import('@/views/end/main/notice/noticeMyPush.vue'),
                meta: { requiresAuth: true },
            },
 
            //user
            {
                path: '/userDotable',
                NamedNodeMap: "用戶個人工作量情況顯示頁面",
                component: () => import('@/views/end/main/user/userDotable.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/add',
                NamedNodeMap: "用户自己添加",
                component: () => import('@/views/end/main/user/add.vue'),
                meta: { requiresAuth: true },
            },

            {
                path: '/todo',
                NamedNodeMap: "todo",
                component: () => import('@/views/end/main/todo.vue'),
                meta: { requiresAuth: true },
            },

            //notice
            {
                path: '/notice',
                NamedNodeMap: "普通用户查看公告",
                component: () => import('@/views/end/main/notice/home.vue'),
                meta: { requiresAuth: true },
            },

            //other
            {
                path: '/reviseForm',
                NamedNodeMap: "普通用户查看公告",
                component: () => import('@/views/end/main/other/reviseForm.vue'),
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
