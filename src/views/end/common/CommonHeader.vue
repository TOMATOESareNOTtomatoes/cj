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
import { ElNotification as notify } from 'element-plus'
import cookie from 'js-cookie'
import { reactive } from 'vue'

const onBack = () => {
  notify('Back')
}

    
const token=cookie.get('token')

// Create a user object with userName, userId, and faculty properties
export const user = reactive({
userName: "",
userId: "",
faculty: ""
})

// Set the values for the user object properties
user.userName = 'John Doe';
user.userId = '12345';
user.faculty = 'Engineering'; 

// The user object now contains the specified properties and values.
     
</script>