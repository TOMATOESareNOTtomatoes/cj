<template>
      <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="userName" label="姓名" width="120" />
            <el-table-column prop="teachName" label="课程名称" width="180" />
            <el-table-column prop="className" label="班级名称" width="220" />
            <el-table-column prop="isFirst" label="第一次授课" width="100" />
            <el-table-column prop="isDoubleLanguage" label="双语授课" width="80" />
            <el-table-column prop="isWeekend" label="周末授课" width="80" />
            <el-table-column align="right" width="120">
                  <template #default="scope">
                        <el-button type="primary" size="small" @click="passClick(scope.$index, scope.row)">通过</el-button>
                        <el-button type="primary" size="small" @click="unPassClick(scope.$index, scope.row)">不同意</el-button>
                  </template>
            </el-table-column>
      </el-table>
</template>
    
<script lang="ts" setup>

import { computed, ref, onMounted, reactive } from 'vue'
import { getAdditionalSure, AdditionalSureA, AdditionalUnSureA } from '@/api/admin.js'


interface AdditionalSure {
      teachName: String,
      className: String,
      userName: String,
      isFirst: String,
      isDoubleLanguage: String,
      isWeekend: String,
      additionalId: String
      isSure: String
}

const tableData = ref<AdditionalSure[]>([])

const user = ref({
      userId: "",
      faculty: ""
});

//加载数据
onMounted(async () => {
      user.userId = sessionStorage.getItem("userId")
      user.faculty = sessionStorage.getItem("faculty")
      getAdditionalSure(user)
            .then(res => {
                  tableData.value = res.data.AdditionalSure
            })
})

const returnInfo=ref({
      sole:"",
      userId:"",
      faculty:""
})

//通过
const passClick = (index: number, row: AdditionalSure) => {
      console.log('data:', row)
      returnInfo.sole=row.additionalId
      returnInfo.userId=user.userId
      console.log('data:', returnInfo)
      AdditionalSureA(returnInfo)
            .then(res => {
                  if (res.code == 200) {
                        console.log("同意成功！")
                  }
            })
      onMounted;
}

//不同意。
const unPassClick = (index: number, row: AdditionalSure) => {
      AdditionalUnSureA(row)
            .then(res => {
                  if (res.code == 200) {
                        console.log("不同意成功！")
                  }
            })
}



</script>
    