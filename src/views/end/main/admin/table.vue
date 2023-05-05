<template>
  <div id='table' ref="table">
    <el-table :data="filterTableData" style="width: 80%">
      <el-table-column label="工号" prop="userId" />
      <el-table-column label="姓名" prop="userName" />
      <el-table-column label="手机号" prop="number" />
      <el-table-column label="院系" prop="faculty" />
      <el-table-column label="权限" prop="permissions" />
      <el-table-column align="right" style="20%">
        <template #header>
          <el-button size="small" type="primary" @click="ggg()">添加</el-button>
          <el-input v-model="search" fixed="right" size="small" placeholder="查询" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleRevise(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div ref="boxx" id="boxx" style="display:none">
    <el-form ref="ruleFormRef" :model="UserInfo" status-icon label-width="120px" class="demo-ruleForm">
      <el-form-item label="工号" prop="userId">
        <el-input v-model="UserInfo.userId" type="text" readonly="readonly" />
      </el-form-item>

      <el-form-item label="姓名" prop="userName">
        <el-input v-model="UserInfo.userName" type="text" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="UserInfo.password" />
      </el-form-item>

      <el-form-item label="手机号" prop="number">
        <el-input v-model="UserInfo.number" />
      </el-form-item>

      <el-form-item label="院系" prop="faculty">
        <el-input v-model="UserInfo.faculty" />
      </el-form-item>

      <div class="mb-2 flex items-center text-sm">
        <el-radio-group v-model="UserInfo.permissions" class="ml-4">
          <el-radio label="admin" size="large">admin</el-radio>
          <el-radio label="UserPlus" size="large">userPlus</el-radio>
          <el-radio label="user" size="large">user</el-radio>
        </el-radio-group>
      </div>

      <el-form-item>
        <el-button type="primary" @click="submitForm(UserInfo)">修改</el-button>
        <el-button @click="resetForm()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import { computed, ref, onMounted, reactive } from 'vue'
import { delete1, table, revise } from '@/api/admin.js'

interface User {
  userId: string
  userName: string
  number: string
  faculty: string
  permissions: string
}

const UserInfo = reactive({
  userId: '',
  userName: '',
  number: '',
  faculty: '',
  password: '',
  permissions:''
})

const dialogVisible = ref(false)

const search = ref('')
const tableData = ref<User[]>([])

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value ||
      data.userName?.toLowerCase().includes(search.value.toLowerCase()) ||
      data.userId?.toLowerCase().includes(search.value.toLowerCase()) ||
      data.faculty?.toLowerCase().includes(search.value.toLowerCase()) ||
      data.number?.toLowerCase().includes(search.value.toLowerCase())
  )
)

const handleRevise = (index: number, row: User) => {
  document.getElementById("boxx").style.display = "block";// 不占位
  document.getElementById("table").style.display = "none";
  UserInfo.userId = row.userId,
    UserInfo.userName = row.userName,
    UserInfo.number = row.number,
    UserInfo.faculty = row.faculty,
    UserInfo.password = '',
    UserInfo.permissions=row.permissions
}

const handleDelete = (index: number, row: User) => {
  // TODO：删除确认
  console.log(index, row)
  if (window.confirm('确定要删除该用户吗？')) 
    delete1(row)
    .then(res=>{
      if (res.code === 200) {
         // 刷新tableData数据
         table().then(res => {
          console.log("table:", res)
          tableData.value = res.data.userInfo
        })
      }
    })
}


//提交 修改用户信息的方法
const submitForm = (UserInfo1) => {
  console.log("修改参数：", UserInfo1)
  console.log("修改权限：", UserInfo1.permissions)
  revise(UserInfo1)
    .then(res => {
      //成功校验
      if (res.code === 200) {
        document.getElementById("boxx").style.display = "none";// 不占位
        document.getElementById("table").style.display = "block";
         // 刷新tableData数据
         table().then(res => {
          console.log("table:", res)
          tableData.value = res.data.userInfo
        })
      }
      console.log("user:", res)
      document.getElementById("error-message").style.display = "block";
    })
    .catch(error => {
      console.log("请求失败：", error);
    });

}

const resetForm = () => {
  document.getElementById("boxx").style.display = "none";// 不占位
  document.getElementById("table").style.display = "block";
}

onMounted(async () => {
  try {
    table().then(res => {
      console.log("table:", res)
      tableData.value = res.data.userInfo
    })
  } catch (error) {
    console.error(error)
  }
})

</script>
