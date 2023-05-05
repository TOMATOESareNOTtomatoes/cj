<template>
  <div class="login">
    <Particles 
    id="tsparticles" 
    class="login__particles" 
    :options="options" 
    />
    <div class="loginPart">
      <h2>用户登录</h2>
      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px" class="demo-ruleForm"
        style="transform:translate(-30px);">
        <el-form-item label="账号：" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请输入账号" maxlength="20" clearable />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" maxlength="20" show-password
            clearable />
        </el-form-item>
        <!-- <el-form-item label="验证码：" prop="verifyCode">
                    <el-input style="width: 150px;" v-model="user.verifyCode" placeholder="请输入验证码" maxlength="4" clearable />
                    <img class="verifyCodeImg" :src="imgUrl" @click="resetImg">
                </el-form-item> -->
        <el-button class="btn" type="primary" @click="submitForm(ruleForm)">登录</el-button>
        <!-- <div style="text-align: right;transform:translate(0,30px);">
          <el-link type="warning" @click="changeRegist">没有账号？去注册</el-link>
        </div> -->
      </el-form>
    </div>

  </div>
</template>
   
<script setup lang="ts">
import { login } from '@/api/login.js';
import { ElNotification } from 'element-plus';
import { reactive, ref, onMounted } from 'vue'
import cookie from 'js-cookie'
import router from '@/router/index.js';


// 定义model
const ruleForm = ref({
  userName: "",
  password: ""
})


onMounted(() => {
  function created() {
    this.$emit('header', false);//隐藏通用头
    this.$emit('footer', false);
  }
})

const submitForm=(ruleForm)=> {
  console.log("form表单参数" + ruleForm.userName + ruleForm.password)
  login(ruleForm)
    .then(Response => {
      console.dir(Response)
      console.log("返回的token", Response.data.token)
      if (Response.code === 200) {
        // console.log("接收到的token",cookie.get("token"))
        cookie.set("token", Response.data.token)
        sessionStorage.setItem('userName', Response.data.userName)
        sessionStorage.setItem('userId', Response.data.userId)
        sessionStorage.setItem('faculty', Response.data.faculty)
        console.log("成功登录，跳转")
        router.push(Response.data.url)
        //location.reload()
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
      console.log("登录失败！！！")
    })
}

const options = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { // 开启鼠标点击的效果
        enable: true,
        mode: 'push'
      },
      onHover: { // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: { // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      grab: {
        distance: 200,
        duration: 0.4
      },
      attract: { // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5
      }
    }
  },
  particles: {
    color: {
      value: '#BA55D3' // 粒子点的颜色
    },
    links: {
      color: '#FFBBFF', // 线条颜色
      distance: 150,//线条距离
      enable: true,
      opacity: 0.4, // 不透明度
      width: 1.2 // 线条宽度
    },
    collisions: {
      enable: true
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 0.5, // 移动速度
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80//粒子数
    },
    opacity: {//粒子透明度
      value: 0.7
    },
    shape: {//粒子样式
      type: 'star'
    },
    size: {//粒子大小
      random: true,
      value: 3
    }
  },
  detectRetina: true
}

console.log(options)


</script>


<style scoped>
.login {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.login__particles {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('@/assets/0001.jpg');
  opacity: 0.9;
  position: fixed;
  pointer-events: none;
}

.loginPart {
  position: absolute;
  /*定位方式绝对定位absolute*/
  top: 50%;
  left: 80%;
  /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
  transform: translate(-50%, -50%);
  /*实现块元素百分比下居中*/
  width: 450px;
  padding: 50px;
  background: rgba(255, 204, 255, .3);
  /*背景颜色为黑色，透明度为0.8*/
  box-sizing: border-box;
  /*box-sizing设置盒子模型的解析模式为怪异盒模型，
    将border和padding划归到width范围内*/
  box-shadow: 0px 15px 25px rgba(0, 0, 0, .5);
  /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
  border-radius: 15px;
  /*边框圆角，四个角均为15px*/
}

h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
  /*文字居中*/
}

.btn {
  transform: translate(170px);
  width: 80px;
  height: 40px;
  font-size: 15px;
}
</style>