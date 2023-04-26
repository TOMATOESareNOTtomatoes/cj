<template>
  <div class="demo-collapse">
    <div v-for="(announcement, index) in form.announcements" :key="index">
      <el-collapse @change="handleChange">
        <el-collapse-item name="{{ index }}">
          <template #title>
            <el-row :gutter="450">
              <el-col :span="10">
                <div style="width: 400px;height: 15px;">标题:{{ announcement.title }}</div>
              </el-col>
              <el-col :span="10">
                <div style="float: inline-end;width: 200px;">发布人:{{ announcement.userName }}</div>
              </el-col>
            </el-row>
          </template>
          <div>
            内容：{{ announcement.content }}
          </div>
          <div style="height: 40px">
          </div>

          <div v-if="announcement.isNeedSure">
            <el-button type="success" round :disabled=announcement.hadSure
              @click="handleConfirmation(announcement)">确认</el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>


<script lang="ts" setup>

import { user } from '@/components/CommonHeader.vue'
import { ref, reactive, onMounted } from 'vue'
import { SureAnnouncement, isSureAnnouncement, getUserforToken, getAnnouncements } from '@/api/user.js';


const user = reactive({
  userId: "",
  faculty: ""
});


interface Announcement {
  title: string,
  content: string,
  pushTime: string,
  isNeedSure: string,
  isAll: number,
  faculty: string,
  userId: string,
  userName: string,
  hadSure: string
}

const form = reactive({
  announcements: [] as Announcement[]
})

const handleConfirmation = (announcement: Announcement) => {
  console.log("确认按钮的参数：", announcement)
  announcement.isNeedSure=0,//数据类型问题，修改的话，后台报错。
  SureAnnouncement(announcement)
    .then((res) => {
      console.log("确认结果：", res)
      announcement.isNeedSure=true
      onMounted;
    })
}

onMounted(() => {
  user.userId = sessionStorage.getItem("userId")
  user.faculty = sessionStorage.getItem("faculty")
  getAnnouncements(user)
    .then((data) => {
      console.log('获取到的公告数据：', data)
      form.announcements = data.data.announcementsAddSure
      form.announcements.forEach((announcement) => {
        announcement.isNeedSure = announcement.isNeedSure === 0 ? true : false  //
        announcement.hadSure = announcement.hadSure === 0 ? false : true   //
      })
    })
})

const handleChange = (val: string[]) => {
  console.log(val)
}
</script>
