<template>
  <el-upload 
  v-model:file-list="fileList" 
  ref="uploadRef" class="upload-demo" :auto-upload="false" :http-request="myupload">
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>

    <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>

    <template #tip>
      <div  class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import type { UploadInstance } from 'element-plus'
import { upload } from '@/api/admin.js'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  const formData = new FormData()
  formData.append('file', uploadRef)
  upload(formData).then(console.log("调用成功！"))
}

const myupload = (file: any) => {
  console.log(file, 'filefilefilefilefile')
}

</script>
    