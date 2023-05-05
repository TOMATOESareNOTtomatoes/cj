<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column prop="userName" label="姓名" width="" />
    <el-table-column prop="isSure" label="学院" width="" />
    <el-table-column prop="teachName" label="课程名称" width="" />
    <el-table-column prop="className" label="班级名称" width="" />
    <el-table-column prop="theoreticalHours" label="理论学时" width="" />
    <el-table-column prop="practicalHours" label="实验学时" width="" />
    <el-table-column prop="special" label="其他" />
    <el-table-column align="right" width="120">
      <template #default="scope">
        <el-button type="primary" size="small" @click="passClick(scope.$index, scope.row)">通过</el-button>
        <el-button type="primary" size="small" @click="unPassClick(scope.$index, scope.row)">不同意</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
     
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import { getAddMain, sureAddMainA } from '@/api/admin.js'

interface User {
  userName: string
  className: string
  theoreticalHours: string
  practicalHours: string
  special: string

  uniqueNumber: string

  isSure: String

  isFirst: number
  isDoubleLanguage: number
  isWeekend: number
}

const tableData = ref<User[]>([])

const Info = ref({
  sole: '',
  userId: '',
  faculty: ''
})

onMounted(async () => {
  const response = await getAddMain()
  console.log("获取工作量列表：", response)
  tableData.value = response.data.userDoInfoList
})

//通过
const passClick = (index: number, row: User) => {
  console.log('data:', row)
  Info.sole = row.uniqueNumber
  Info.userId = sessionStorage.getItem("userId")
  sureAddMainA(Info)
    .then(res => {
      if (res.code == 200) {
        console.log("同意成功！")
      }
    })
}

//修改
const unPassClick = (index: number, row: User) => {
  //直接返回弹出公告。info
}

</script>
     