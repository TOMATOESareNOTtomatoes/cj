import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import axios from '@/utils/http/axiosZ.js'
import router from './router/index.js'
import Particles from 'particles.vue3'

const app = createApp(App)
//引入element图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }

// 全局ctx(this) 上挂载 $axios
app.config.globalProperties.$api = axios

app.use(ElementPlus)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(Particles)
app.mount('#app')