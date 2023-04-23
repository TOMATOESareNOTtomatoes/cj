<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <common-header></common-header>
        </el-header>
        <el-container>
          <el-aside width="180px">
            <common-aside></common-aside>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>

<script>
import CommonAside from "@/views/end/common/CommonAside.vue";//菜单栏
import CommonHeader from "@/views/end/common/CommonHeader.vue"
export default {
  components: {
      CommonAside,
      CommonHeader,
  }
}
</script>

