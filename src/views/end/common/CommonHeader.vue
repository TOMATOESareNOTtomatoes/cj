<template>
  <el-page-header @back="onBack" :icon="null">
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

<script setup lang="ts">

import { ElMessage as notify } from 'element-plus'
import cookie from 'js-cookie'
import { reactive } from 'vue'

const onBack = () => {
  notify('Back')
}

const token = cookie.get('token')

const user = reactive({
  userName: "",
  userId: "",
  faculty: ""
})

user.userName = sessionStorage.getItem('userName')


</script>