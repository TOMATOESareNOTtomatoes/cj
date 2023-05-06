<template>
   <p>理论课 系数表</p>
   <el-table :data="tableData1" stripe style="width: 100%">
      <el-table-column prop="classNumber" label="班级数" width="180" />
      <el-table-column label="系数" width="180">
         <template #default="scope">
            <el-input v-model="scope.row.coefficient" />
         </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="备注" /> -->
      <el-table-column label="Operations">
         <template #header>
            <!-- <el-button size="small" type="primary" @click="add1()">添加</el-button> -->
         </template>
         <template #default="scope">
            <el-button size="small" @click="revise1(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button size="small" @click="delete1(scope.$index, scope.row)">删除</el-button> -->
         </template>
      </el-table-column>
   </el-table>

   <p>实验课 系数表</p>
   <el-table :data="tableData2" stripe style="width: 100%">
      <el-table-column prop="classNumber" label="班级数" width="180" />
      <el-table-column label="系数" width="180">
         <template #default="scope">
            <el-input v-model="scope.row.coefficient" />
         </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="备注" /> -->
      <el-table-column label="Operations">
         <template #header>
            <!-- <el-button size="small" type="primary" @click="add2()">添加</el-button> -->
         </template>
         <template #default="scope">
            <el-button size="small" @click="revise2(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button size="small" @click="delete2(scope.$index, scope.row)">删除</el-button> -->
         </template>
      </el-table-column>
   </el-table>

   <p>上机课 系数表</p>
   <el-table :data="tableData3" stripe style="width: 100%">
      <el-table-column prop="classNumber" label="班级数" width="180" />
      <el-table-column label="系数" width="180">
         <template #default="scope">
            <el-input v-model="scope.row.coefficient" />
         </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="备注" /> -->
      <el-table-column label="Operations">
         <template #header>
            <!-- <el-button size="small" type="primary" @click="add3()">添加</el-button> -->
         </template>
         <template #default="scope">
            <el-button size="small" @click="revise3(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button size="small" @click="delete3(scope.$index, scope.row)">删除</el-button> -->
         </template>
      </el-table-column>
   </el-table>

   <p>特殊情况 系数表</p>

   <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="第一次授课" width="180">
         <template #default="scope">
            <el-input v-model="scope.row.isFirst" />
         </template>
      </el-table-column>
      <el-table-column label="双语授课" width="180">
         <template #default="scope">
            <el-input v-model="scope.row.isDoubleLanguage" />
         </template>
      </el-table-column>
      <el-table-column label="周末授课" width="180">
         <template #default="scope">
            <el-input v-model="scope.row.isWeekend" />
         </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="备注" /> -->
      <el-table-column label="Operations">
         <template #default="scope">
            <el-button size="small" @click="revise4(scope.$index, scope.row)">修改</el-button>
            <!-- <el-button size="small" @click="delete4(scope.$index, scope.row)">删除</el-button> -->
         </template>
      </el-table-column>
   </el-table>
</template>
 
<script lang="ts" setup>
import { computed, ref, onMounted, reactive } from 'vue'
import { getCoefficient ,ACoefficient ,CoefficientTheory ,CoefficientPractice ,CoefficientExperiment } from '@/api/admin.js'

interface additionalCoefficients {
   id: String,
   isFirst: String,
   isDoubleLanguage: String,
   isWeekend: String,
}

interface coefficientExperiments {
   id: String,
   classNumber: String,
   coefficient: String,
}

interface coefficientPractices {
   id: String,
   classNumber: String,
   coefficient: String,
}

interface coefficientTheories {
   id: String,
   classNumber: String,
   coefficient: String,
}

const tableData = ref<additionalCoefficients[]>([])
const tableData1 = ref<coefficientExperiments[]>([])
const tableData2 = ref<coefficientPractices[]>([])
const tableData3 = ref<coefficientTheories[]>([])

//修改
const revise1 = (index: number, row: coefficientExperiments) => {
  console.log('修改data:', row)
  CoefficientExperiment(row)
    .then(res => {
      if (res.code == 200) {
        console.log("修改成功")
      }
    })
}
//修改
const revise2 = (index: number, row: coefficientPractices) => {
  console.log('修改data:', row)
  CoefficientPractice(row)
    .then(res => {
      if (res.code == 200) {
        console.log("修改成功")
      }
    })
}
//修改
const revise3 = (index: number, row: coefficientTheories) => {
  console.log('修改data:', row)
  CoefficientTheory(row)
    .then(res => {
      if (res.code == 200) {
        console.log("修改成功")
      }
    })
}
//修改
const revise4 = (index: number, row: additionalCoefficients) => {
  console.log('修改data:', row)
  ACoefficient(row)
    .then(res => {
      if (res.code == 200) {
        console.log("修改成功")
      }
    })
}

//加载数据
onMounted(async () => {
   getCoefficient()
      .then(res => {
         tableData.value = res.data.additionalCoefficients//特殊情况的
         tableData1.value = res.data.coefficientExperiments//理论学时的
         tableData2.value = res.data.coefficientPractices//全实践课的
         tableData3.value = res.data.coefficientTheories//有理论课的实践部分
      })
})

</script>
 