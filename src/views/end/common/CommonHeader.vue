<template>
  <el-page-header :icon="null" @back="logout" title="退出登录">
    <template #content>
      <div class="flex items-center">
        <el-tag>欢迎来到工作量系统</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        {{ user.userName }}
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts">

import { ElMessage as notify } from 'element-plus'
import cookie from 'js-cookie'
import { reactive } from 'vue'

function logout() {
  cookie.set("token", null)
  window.sessionStorage.clear()
  this.$router.push('login')
}

export default {
  methods: {
    logout
  },
  setup() {
    return {
      user
    }
  }
}

const user = reactive({
  userName: sessionStorage.getItem('userName'),
  userId: "",
  faculty: ""
})


</script>