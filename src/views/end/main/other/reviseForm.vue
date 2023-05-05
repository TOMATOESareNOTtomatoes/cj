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
         <el-button type="primary" @click="submitForm(ruleForm)">
            确认修改
         </el-button>
         <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </el-form-item>
   </el-form>
</template>
 
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { UserReviseDo } from '@/api/user.js'
import { useRouter, RouteLocationNormalized } from 'vue-router'

const formSize = ref('default')

const ruleFormRef = ref<FormInstance>()

const router = useRouter()

const ruleForm = reactive({
   uniqueNumber:'',
   teachName: '',
   className: '',
   classNumber: '',
   userId: '',
   isFirst: '',
   isDoubleLanguage: '',
   isWeekend: '',
   practicalHours: '',
   theoreticalHours: '',
   isSure: ''
})

console.log("接收到的参数：", ruleForm)

const rules = reactive<FormRules>({
   teachName: [
      { required: true, message: '请输入课程名称', trigger: 'blur' },
      { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
   ],

})

//提交按钮   isSure=3 则说明不存在特殊情况
const submitForm = (ruleFormRef) => {
   ruleFormRef.userId = sessionStorage.getItem("userId")
   console.log("提交的参数：",ruleFormRef)
   UserReviseDo(ruleFormRef)
      .then(ref => {
         console.log("返回结果：",ref)
      })
}

const resetForm = (formEl: FormInstance | undefined) => {
   if (!formEl) return
   formEl.resetFields()
   ruleForm.isFirst = 0
   ruleForm.isDoubleLanguage = 0
   ruleForm.isWeekend = 0
   ruleForm.isSure = 0
   //todo返回上一级
}

onMounted(async () => {
   //ruleForm.value = router.currentRoute.value.query
   ruleForm.teachName = router.currentRoute.value.query.teachName
   ruleForm.className = router.currentRoute.value.query.className
   ruleForm.classNumber = router.currentRoute.value.query.classNumber
   ruleForm.userId = ''
   ruleForm.isFirst = router.currentRoute.value.query.isFirst
   ruleForm.isDoubleLanguage = router.currentRoute.value.query.isDoubleLanguage
   ruleForm.isWeekend = router.currentRoute.value.query.isWeekend
   ruleForm.practicalHours = router.currentRoute.value.query.practicalHours
   ruleForm.theoreticalHours = router.currentRoute.value.query.theoreticalHours
   ruleForm.isSure = ''
   ruleForm.uniqueNumber=router.currentRoute.value.query.uniqueNumber
})

</script>
 