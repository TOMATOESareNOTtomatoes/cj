<template>
      <el-form :model="form" label-width="120px">
            <el-form-item label="公告/通知标题：">
                  <el-input v-model="form.title" />
            </el-form-item>

            <el-form-item label="公告/通知内容：">
                  <el-input v-model="form.content" :rows="8" type="textarea" />
            </el-form-item>

            <!-- <el-form-item label="发布时间">
                  <el-col :span="11">
                        <el-date-picker v-model="form.pushTime" start-placeholder="now" type="date" placeholder="Pick a date" style="width: 100%" />
                  </el-col>
            </el-form-item> -->

            <el-form-item label="是否需要确认">
                  <el-switch v-model="form.isNeedSure" active-value="0" inactive-value="1" />
            </el-form-item>

            <el-form-item label="立即发布">
                  <el-switch v-model="form.isCancel" active-value="0" inactive-value="1" />
            </el-form-item>

            <!-- <el-form-item label="接收人群">
                  <el-radio-group v-model="form.isAll">
                        <el-radio label="0">全部</el-radio>
                        <el-radio label="1">本学院</el-radio>
                  </el-radio-group>
            </el-form-item> -->


            <el-form-item>
                  <el-button type="primary" @click="onSubmit(form)">发布公告</el-button>
                  <el-button>取消发布</el-button>
            </el-form-item>
      </el-form>
</template>
    

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { addAnnouncement } from '@/api/admin.js';
import { getUserforToken } from '@/api/user.js';


const form = ref({
      title: "",
      content: "",
      pushTime: "",
      isNeedSure: "",
      isAll: 0,
      faculty: "",
      userId: "",
      userName: "",
      isCancel:''
})

const onSubmit = (form) => {
      form.userId = sessionStorage.getItem("userId")
      form.userName = sessionStorage.getItem("userName")
      form.faculty = sessionStorage.getItem("faculty")
      console.log("form",form)
      addAnnouncement(form)
      .then((data) => {
            console.log("announcement added", data);
            if(data.code==200){
                  form.value = null;
                  //todo;信息提示
            }
      });
};

</script>
    