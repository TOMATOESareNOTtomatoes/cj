<template>
   <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="课程名称" prop="teachName">
         <el-input v-model="ruleForm.teachName" />
      </el-form-item>
      <el-form-item label="班级名称" prop="className">
         <el-input v-model="ruleForm.className" />
      </el-form-item>
      <el-form-item label="班级人数" prop="classNumber">
         <el-input v-model="ruleForm.classNumber" />
      </el-form-item>
      <el-form-item label="实践学时" prop="practicalHours">
         <el-input v-model="ruleForm.practicalHours" />
      </el-form-item>
      <el-form-item label="理论学时" prop="theoreticalHours">
         <el-input v-model="ruleForm.theoreticalHours" />
      </el-form-item>

      <el-form-item label="其他情况" prop="type">
         <el-checkbox v-model="ruleForm.isFirst" label="第一次授课" true-label="0.1" false-label="0" size="large" border />
         <el-checkbox v-model="ruleForm.isDoubleLanguage" label="是否双语" true-label="1.5" false-label="0" size="large"
            border />
         <el-checkbox v-model="ruleForm.isWeekend" label="是否周末" true-label="1.1" false-label="0" size="large" border />
         <el-checkbox v-model="ruleForm.isSure" label="无" prop="type" true-label="3" false-label="0" size="large" border />
      </el-form-item>

      <el-form-item>
         <el-button type="primary" @click="submitForm(ruleForm)">添加</el-button>
         <el-button @click="resetForm(ruleFormRef)">重置信息</el-button>
      </el-form-item>
   </el-form>
</template>
 
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { addmain  } from '@/api/user.js'

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
   teachName: '',
   className: '',
   classNumber: '',
   userId: '',
   isFirst: '',
   isDoubleLanguage: '',
   isWeekend: '',
   practicalHours: '',
   theoreticalHours: '',
   isSure:''
})

const rules = reactive<FormRules>({
   teachName: [
      { required: true, message: '请输入课程名称', trigger: 'blur' },
      { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
   ],


})

//提交按钮
const submitForm = (ruleFormRef) => {
   ruleFormRef.userId=sessionStorage.getItem("userId")
   addmain(ruleFormRef)
   .then(ref=>{
      
   })
   console.log('cshu:::',ruleFormRef)
}

const resetForm = (formEl: FormInstance | undefined) => {
   if (!formEl) return
   formEl.resetFields()
   ruleForm.isFirst = 0
   ruleForm.isDoubleLanguage = 0
   ruleForm.isWeekend = 0
   ruleForm.isSure = 0
}


</script>
 