<template>
   <el-button type="primary" round @click="exportClick">导出表格</el-button>
   <el-table id="outcome" :data="filterTableData" style="width: 100%">
      <el-table-column label="工号" prop="userId" />
      <el-table-column label="姓名" prop="userName" />
      <el-table-column label="院系" prop="faculty" />
      <el-table-column label="总工作量" prop="caseload" />
      <el-table-column align="right">
         <template #header>
            <el-input v-model="search" size="small" placeholder="查询" />
         </template>
         <!-- <template #default="scope">
         <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
           >Edit</el-button
         >
         <el-button
           size="small"
           type="danger"
           @click="handleDelete(scope.$index, scope.row)"
           >Delete</el-button
         >
       </template> -->
      </el-table-column>
   </el-table>
</template>
 
<script lang="ts" setup>

import { computed, ref, onMounted, reactive } from 'vue'
import { simpleAllDo } from '@/api/admin.js'
import FileSaver from 'file-saver'
import * as XLSX from 'xlsx';

interface User {
   userId: string
   userName: string
   faculty: string
   caseload: string
}

const search = ref('')

const filterTableData = computed(() =>
   tableData.value.filter(
      (data) =>
         !search.value ||
         data.userId?.toLowerCase().includes(search.value.toLowerCase()) ||
         data.userName?.toLowerCase().includes(search.value.toLowerCase()) ||
         data.faculty?.toLowerCase().includes(search.value.toLowerCase())
   )
)
//  const handleEdit = (index: number, row: User) => {
//    console.log(index, row)
//  }
//  const handleDelete = (index: number, row: User) => {
//    console.log(index, row)
//  }


const tableData = ref<User[]>([])
//加载数据
onMounted(async () => {
   simpleAllDo()
      .then(res => {
         tableData.value = res.data.simpleAllDo
      })
})


const exportClick = () => {
   var wb = XLSX.utils.table_to_book(document.querySelector('#outcome'));//关联dom节点
   var wbout = XLSX.write(wb, {
      bookType: 'xlsx',
      bookSST: true,
      type: 'array'
   })
   try {
      FileSaver.saveAs(new Blob([wbout], {
         type: 'application/octet-stream'
      }), '简单的工作量统计总表.xlsx')//自定义文件名
   } catch (e) {
      if (typeof console !== 'undefined') console.log(e, wbout);
   }
   return wbout
};

</script>
 