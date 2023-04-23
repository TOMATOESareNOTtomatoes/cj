<template>
  <el-upload v-model:file-list="fileList" class="upload-demo" 
  action="#" 
  multiple
    :on-preview="handlePreview" :on-remove="handleRemove" 
    :before-remove="beforeRemove" :limit="3"
    :on-exceed="handleExceed" 
    :http-request="myupload"
    >
    <el-button type="primary">Click to upload</el-button>
    <template #tip>
      <div class="el-upload__tip">
        支持xls、xlsx等格式文件，最多上传3份文件
      </div>
    </template>
  </el-upload>
</template>


<script lang="ts" setup>

import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { upload } from '@/api/admin.js'

const fileList = ref<UploadUserFile[]>([
])
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${files.length + uploadFiles.length
    } totally`
  )
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfert of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  )
}

const myupload = (file: any) => {
  //console.log(file, 'filefilefilefilefile')
  let formData = new FormData()
  let ff=file.file
  formData.append("file",ff)
  console.log("foooooooo:",file.file)
  console.log("formdata:",formData)
  upload(formData).then((Response) => {
    if(Response.code===200){
      ElMessage('数据录入成功！')
    }
    console.log("成功发送请求！",Response)
  }).catch((error) => {
    console.log("发送请求失败！", error)
  })
}

</script>
    