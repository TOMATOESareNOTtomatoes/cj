<template>
      <el-table :data="tableData" stripe style="width: 100%" height="450">
            <el-table-column prop="userName" label="姓名" width="120" />
            <el-table-column prop="teachName" label="课程名称" width="180" />
            <el-table-column prop="classNames" label="班级名称" width="220" />
            <el-table-column prop="isFirst" label="第一次授课" width="100" />
            <el-table-column prop="isDoubleLanguage" label="双语授课" width="80" />
            <el-table-column prop="isWeekend" label="周末授课" width="80" />
            <el-table-column fixed="right" label="Operations" width="120">
                  <template #default>
                        <el-button link type="primary" size="small" @click="handleClick">通过</el-button>
                        <el-button link type="primary" size="small">取消</el-button>
                  </template>
            </el-table-column>
      </el-table>
</template>
    
<script lang="ts" setup>

import { computed, ref, onMounted, reactive } from 'vue'
import { getAdditionalSure } from '@/api/userPlus.js'


const handleClick = () => {
      console.log('click')
}

interface AdditionalSure {
      teachName: String,
      classNames: String,
      userName:String,
      isFirst: number,
      isDoubleLanguage: number,
      isWeekend: number,
      additionalId: String
}

const tableData = ref<AdditionalSure[]>([])

//加载数据
onMounted(async () => {
  const data = await getAdditionalSure()
  tableData.value = data.data.AdditionalSure
})



</script>
    