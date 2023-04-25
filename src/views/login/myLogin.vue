<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="账号" prop="username">
      <el-input v-model="ruleForm.userName" />
    </el-form-item>

    <el-form-item label="密码" prop="pass">
      <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item label="再输入密码" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重新输入</el-button>
    </el-form-item>
  </el-form>

</template>
   
<script>
import { login } from '@/api/login.js';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import cookie from 'js-cookie'

// 定义model
const ruleForm = ref({
  userName: "",
  password: "",
  checkPass: ''
})

export default {
  name: 'login1',
  components: {
  },
  data() {
    return {
      ruleForm: {
        userName: '',
        password: '',
        checkPass: ''

      }
    }
  },
  methods: {
    submitForm(ruleForm) {
      console.log("form表单参数" + ruleForm.userName + ruleForm.password)
      login(this.ruleForm)
        .then(Response => {
          //console.dir(Response)
          console.log("返回的token", Response.data.token)
          if (Response.code === 200) {
            // console.log("接收到的token",cookie.get("token"))
            cookie.set("token", Response.data.token)
            sessionStorage.setItem('userName', Response.data.userName)
            sessionStorage.setItem('userId', Response.data.userId)
            sessionStorage.setItem('faculty', Response.data.faculty)
            let userName = JSON.parse(sessionStorage.getItem('user'))
            if (userName) {
             console.log("存储的用户名字：",userName)
            }
            // console.log("成功登录，跳转")
            this.$router.push(Response.data.url)
          }
          else {
            ElNotification({
              title: 'Success',
              message: Response.code,
              type: 'warning',
            })
          }

        })
        .catch(error => {

        })
    }
  },

  created: function () {
    this.$emit('header', false);//隐藏通用头
    this.$emit('footer', false);
  }
}
</script>