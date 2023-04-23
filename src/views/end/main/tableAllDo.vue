<template>
  <el-button @click="resetDateFilter">reset date filter</el-button>
  <el-button @click="clearFilter">reset all filters</el-button>
  <el-table ref="tableRef" row-key="date" :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="学期" sortable width="" column-key="date" :filters="[
      { text: '2016-05-01', value: '2016-05-01' }
    ]" :filter-method="filterHandler" />

    <el-table-column prop="name" label="姓名" width="" />
    <el-table-column prop="name" label="课程名称" width="" />
    <el-table-column prop="name" label="班级名称" width="" />
    <el-table-column prop="name" label="理论学时" width="" />
    <el-table-column prop="name" label="实验学时" width="" />

    <el-table-column prop="address" label="其他" :formatter="formatter" />
    <el-table-column prop="tag" label="合计学时" width="100" :filters="[
      { text: 'Home', value: 'Home' },
      { text: 'Office', value: 'Office' },
    ]" :filter-method="filterTag" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
    
<script lang="ts" setup>
import { ref } from 'vue'
import type { TableColumnCtx, TableInstance } from 'element-plus'

interface User {
  date: string
  name: string
  address: string
  tag: string
}

const tableRef = ref<TableInstance>()

const resetDateFilter = () => {
  tableRef.value!.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const clearFilter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  tableRef.value!.clearFilter()
}
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address
}
const filterTag = (value: string, row: User) => {
  return row.tag === value
}
const filterHandler = (
  value: string,
  row: User,
  column: TableColumnCtx<User>
) => {
  const property = column['property']
  return row[property] === value
}

const tableData: User[] = [
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
]
</script>
    