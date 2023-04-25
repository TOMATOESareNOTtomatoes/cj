<template>
  <!-- <el-button @click="resetDateFilter">reset date filter</el-button> -->
  <!-- <el-button @click="clearFilter">reset all filters</el-button> -->
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column prop="term" label="学期" sortable width="" column-key="date" />
    <el-table-column prop="userName" label="姓名" width="" />
    <el-table-column prop="teachName" label="课程名称" width="" />
    <el-table-column prop="className" label="班级名称" width="" />
    <el-table-column prop="theoreticalHours" label="理论学时" width="" />
    <el-table-column prop="practicalHours" label="实验学时" width="" />
    <el-table-column prop="special" label="其他" />
    <el-table-column prop="outcome" label="合计工作量" width="100"></el-table-column>
  </el-table>
</template>
    
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'
import { getUserDo } from '@/api/userPlus.js'

interface User {
  term: string
  userName: string
  className: string
  theoreticalHours: string
  practicalHours: string
  special: string
  outcome: string
}

const tableRef = ref<TableInstance>()
const tableData = ref<User[]>([])

//ref<classInfo[]>([])
const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter()
}

const filterHandler = (
  value: string,
  row: User,
  column: TableColumnCtx<User>
) => {
  const property = column['property']
  return row[property] === value
}

onMounted(async () => {
  const response = await getUserDo()
  console.log("获取工作量列表：", response)
  tableData.value = response.data.allUserDoNuSure
})


</script>
    