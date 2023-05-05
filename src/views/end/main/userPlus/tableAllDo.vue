<template>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column prop="userName" label="姓名" width="" />
    <el-table-column prop="teachName" label="课程名称" width="" />
    <el-table-column prop="className" label="班级名称" width="" />
    <el-table-column prop="classNumber" label="班级人数" width="" />
    <el-table-column prop="theoreticalHours" label="理论学时" width="" />
    <el-table-column prop="practicalHours" label="实验学时" width="" />
    <el-table-column prop="special" label="其他" />
    <el-table-column align="right" width="120">
      <template #default="scope">
        <el-button type="primary" size="small" @click="passClick(scope.$index, scope.row)">通过</el-button>
        <el-button type="primary" size="small" @click="unPassClick(scope.$index, scope.row)">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
    
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import { getAddMain, sureAddMain } from '@/api/userPlus.js'
import { useRouter } from 'vue-router'

const router = useRouter()

interface User {
  userName: string
  className: string
  classNumber:string
  teachName:string
  theoreticalHours: string
  practicalHours: string
  special: string
  uniqueNumber: string
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
  Info.userId = sessionStorage.getItem("userId")
  Info.faculty = sessionStorage.getItem("faculty")
  const response = await getAddMain(Info)
  console.log("获取工作量列表：", response)
  tableData.value = response.data.userDoInfoList
})

//通过
const passClick = (index: number, row: User) => {
  console.log('data:', row)
  Info.sole = row.uniqueNumber
  sureAddMain(Info)
    .then(res => {
      if (res.code == 200) {
        console.log("同意成功！")
      }
    })
}

//修改
const unPassClick = (index: number, row: User) => {
  console.log('要修改的课程信息：', row)
      router.push({
            path: '/reviseForm',
            // name: 'home',
            query: {
                  teachName: row.teachName,
                  className: row.className,
                  userName: row.userName,
                  uniqueNumber: row.uniqueNumber,
                  classNumber: row.classNumber,
                  theoreticalHours: row.theoreticalHours,
                  practicalHours: row.practicalHours,
                  // coefficientL: row.coefficientL,
                  // coefficientS: row.coefficientS,
                  isFirst: row.isFirst,
                  isDoubleLanguage: row.isDoubleLanguage,
                  isWeekend: row.isWeekend,
                  //isSure: row.isSure
            }
      })
}

</script>
    