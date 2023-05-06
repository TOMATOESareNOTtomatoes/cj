<template>
  <el-menu @open="handleOpen" @close="handleClose" 
  unique-opened="1"
  default-active="/notice"
  :router="true">

    <el-sub-menu index="1" id="admin">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>综合服务</span>
      </template>

      <!-- <el-menu-item-group>
        <el-menu-item index="/from">from表单</el-menu-item>
      </el-menu-item-group> -->

      <el-menu-item-group>
        <el-menu-item index="/table">用户管理</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/additionalManage">系数管理</el-menu-item>
      </el-menu-item-group>


      <el-menu-item-group>
        <el-menu-item index="/sureAddMain">课程信息确认</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/additionalAdmin">特殊情况申请表</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/outcome">工作量统计结果</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/upload">上传统计数据</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="2" id="isUserPlus">

      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>统计结果</span>
      </template>

      <el-menu-item-group>
        <el-menu-item index="/tableAllDo">教师添加的课程</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/additionalTable">特殊情况申请表</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/noticeA">发布公告</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/myNotice">查看已发布公告</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>个人中心</span>
      </template>

      <el-menu-item-group>
        <el-menu-item index="/userDotable">工作量情況</el-menu-item>
      </el-menu-item-group>

      <el-menu-item-group>
        <el-menu-item index="/add">添加课程</el-menu-item>
      </el-menu-item-group>

    </el-sub-menu>

    <el-menu-item index="/notice">
      <el-icon><Bell /></el-icon>
          <span>公告</span>
        </el-menu-item>

  </el-menu>
</template>


<script>

import { getPermissions } from '@/api/user.js'

export default {
  data() {
    return {
      isAdmin: true,
      isUser: true,
      isUserP: true
    }
  },
  mounted() {
    this.loadMenu()
  },
  methods: {
    loadMenu() {
      const adminEl = document.getElementById("admin");
      if (adminEl) {
        adminEl.style.display = "none";
      }
      // document.getElementById("admin").style.display = "none";// 不占位
      // document.getElementById("isUserPlus").style.display = "none";// 不占位
      const isUserPlusEl = document.getElementById("isUserPlus");
      if (isUserPlusEl) {
        isUserPlusEl.style.display = "none";
      }
      // 从后台获取用户信息，包括用户角色和权限信息  
      let roles = ['user', 'admin']
      getPermissions()
        .then(res => {
          console.log("权限请求结果：", res)
          if (res.code === 200) {
            roles = res.data.userInfo.privilegesId.split(',')
            console.log("权限请求结果：", roles)
            this.isAdmin = roles.includes('2')
            this.isUserP = roles.includes('1')
            this.isUser = roles.includes('0')
            if (this.isAdmin) {
              document.getElementById("admin").style.display = "block";
              document.getElementById("isUserPlus").style.display = "block";
            }
            else if (this.isUserP) {
              document.getElementById("isUserPlus").style.display = "block";
            }
            console.log(this.isAdmin, this.isUser, this.isUserP)
          }
        }).catch(error => {
          // 处理错误信息
          console.error(error);
        })
    },
    handleOpen() {
      console.log('handleOpen')
    },
    handleClose() {
      console.log('handleClose')
    }
  }
}
</script>