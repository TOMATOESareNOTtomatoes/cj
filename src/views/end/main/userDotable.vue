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
                              <el-button size="small" @click="application(scope.$index, scope.row)">申请</el-button>
                              <el-button size="small" type="danger" @click="isSureDO(scope.$index, scope.row)">确认</el-button>
                        </template>
                  </el-table-column>
            </el-table>
      </div>
      <div ref="boxx" id="boxx" style="display:none">
            <el-form ref="ruleFormRef" :model="UserInfo" status-icon label-width="120px" class="demo-ruleForm">
                  <el-form-item label="姓名" prop="userName">
                        <el-input v-model="UserInfo.userName" type="text" readonly="readonly" />
                  </el-form-item>

                  <el-form-item label="课程名称" prop="teachName">
                        <el-input v-model="UserInfo.teachName" type="text" />
                  </el-form-item>

                  <el-form-item label="班级名称" prop="className">
                        <el-input v-model="UserInfo.className" />
                  </el-form-item>

                  <div>
                        <el-checkbox v-model="UserInfo.isFirst" label="是否第一次授课" true-label="0.1" false-label="0" size="large"
                              border />
                        <el-checkbox v-model="UserInfo.isDoubleLanguage" label="是否双语" true-label="1.5" false-label="0"
                              size="large" border />
                        <el-checkbox v-model="UserInfo.isWeekend" label="是否周末" true-label="1.1" false-label="0" size="large"
                              border />
                  </div>

                  <el-form-item>
                        <el-button type="primary" @click="submitForm(UserInfo)">提交</el-button>
                        <el-button @click="resetForm()">取消</el-button>
                        <el-button type="danger" @click="errorIDo()">课程信息有误</el-button>
                  </el-form-item>
            </el-form>
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

let userId = ''
getUserforToken()
      .then(res => {
            if (res.code === 200) {
                  //console.log("获取用户信息通过用户的token：", res),
                  userId = res.data.userInfo.userId,
                        console.log("user:", userId)
                  getUserDoInfo(userId)
                        .then(res => {
                              console.log("用户课程信息：", res),
                                    tableData.value = res.data.userDoInfo
                        })
            }
      })

//申请特殊情况方法
const application = (index: number, row: classInfo) => {
      document.getElementById("boxx").style.display = "block";// 不占位
      document.getElementById("table").style.display = "none";
      console.log("课程信息：", row)
      UserInfo.teachName = row.teachName,
            UserInfo.userName = row.userName,
            UserInfo.className = row.className,
            UserInfo.uniqueNumber = row.uniqueNumber,
            UserInfo.isFirst = row.isFirst,
            UserInfo.isDoubleLanguage = row.isDoubleLanguage,
            UserInfo.isWeekend = row.isWeekend
}

//提交特殊情况
const submitForm = (UserInfo) => {
      console.log('提交特殊情况参数：', UserInfo)
      addAdditional(UserInfo)
            .then(res => {
                  if (res.code === 200) {
                        document.getElementById("boxx").style.display = "none";// 不占位
                        document.getElementById("table").style.display = "block";
                        // 刷新tableData数据
                        getUserforToken();
                  }
            })
}
//取消提交
const resetForm = () => {
      document.getElementById("boxx").style.display = "none";// 不占位
      document.getElementById("table").style.display = "block";
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
    