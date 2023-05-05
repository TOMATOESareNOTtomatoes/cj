<template>
   <div id="table" ref="table" style="display: block">
      <el-table :data="tableData" style="width: 100%" border :row-class-name="tableRowClassName">
         <el-table-column prop="teachName" label="课程名称" width="180" />
         <el-table-column prop="className" label="任课班级" width="180" />
         <el-table-column prop="userName" label="姓名" width="90" />
         <el-table-column prop="classNumber" label="人数" width="60" />
         <el-table-column prop="theoreticalHours" label="理论学时" width="60" />
         <el-table-column prop="practicalHours" label="实验学时" width="60" />
         <el-table-column prop="coefficientL" label="理论系数" width="60" />
         <el-table-column prop="coefficientS" label="实验系数" width="60" />
         <el-table-column prop="isFirst" label="新课系数" width="60" />
         <el-table-column prop="isDoubleLanguage" label="双语系数" width="60" />
         <el-table-column prop="isWeekend" label="周末系数" width="60" />
         <el-table-column prop="add" label="合计" width="60" />
         <el-table-column align="right" style="20%">
            <template #default="scope">
               <el-button size="small" @click="application(scope.$index, scope.row)">同意</el-button>
               <el-button size="small" type="danger" @click="isSureDO(scope.$index, scope.row)">不同意</el-button>
            </template>
         </el-table-column>
      </el-table>
   </div>
   
</template>

<script lang="ts" setup>

import { computed, ref, onMounted, reactive } from 'vue'
import { UserSureDo, addAdditional, getUserforToken, getUserDoInfo } from '@/api/user.js'
import { ElMessage } from 'element-plus';

interface classInfo {
   teachName: 'defaut',
   className: 'defaut',
   userName: 'defaut',
   uniqueNumber: 'defaut',
   classNumber: 0,
   theoreticalHours: 0,
   practicalHours: 0,
   coefficientL: 0,
   coefficientS: 0,
   isFirst: 0,
   isDoubleLanguage: 0,
   isWeekend: 0,
   isSure: 0
}

const UserInfo = reactive({
   uniqueNumber: '',
   userName: '',
   teachName: '',
   className: '',
   isFirst: 0.0,
   isDoubleLanguage: 0.0,
   isWeekend: 0.0
})

const tableData = ref<classInfo[]>([])

//跟据用户是否确认给表添加不同的样式
const tableRowClassName = ({ row, rowIndex }:
   { row, rowIndex }) => {
   console.log("样式参数：", row)
   if (row.isSure === 0) {
      return 'error-row'
   } else if (row.isSure === 1) {
      return 'success-row'
   } else if (row.isSure === 2) {
      return 'warning-row'
   }
   return ''
}

onMounted(async () => {
   const userId = sessionStorage.getItem('userId')
   getUserDoInfo(userId)
      .then(res => {
         console.log("用户课程信息：", res),
            tableData.value = res.data.userDoInfo
      })

})


//
const application = (index: number, row: classInfo) => {

}

//确认按钮
const isSureDO = (index: number, row: classInfo) => {
   console.log('确认课程信息信息：', row)
   UserSureDo(row)
      .then(res => {
         console.log("确认返回结果：", res)
         if (res.code === 200) {
            ElMessage.success('确认成功');
         } else {
            ElMessage.error('确认失败');
         }
      })
}


</script>



<style>
.el-table .error-row {
   --el-table-tr-bg-color: var(--el-color-error-light-9);
}

.el-table .warning-row {
   --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
   --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
 