<template>
  <div class="demo-collapse">
    <div v-for="(announcement, index) in form.announcements" :key="index">
      <el-collapse @change="handleChange">
        <el-collapse-item name="{{ index }}">
          <template #title>
            <el-row :gutter="450">
              <el-col :span="100">
                <div style="width: 110px;">标题:{{ announcement.title }}</div>
              </el-col>
              <el-col :span="60">
                <div style="float: inline-end;">发布人:{{ announcement.userName }}</div>
              </el-col>
            </el-row>
          </template>
          <div>
            内容：{{ announcement.content }}
          </div>
          <div style="height: 40px">
          </div>

          <div v-if="announcement.isNeedSure">
            <el-button type="success" round :disabled=announcement.haveSure
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
  haveSure: string
}

const form = reactive({
  announcements: [] as Announcement[]
})

const handleConfirmation = (announcement: Announcement) => {
  console.log("确认按钮的参数：", announcement)
  SureAnnouncement(announcement)
    .then((res) => {
      console.log("确认结果：", res)
    })
}


onMounted(() => {
  getUserforToken()
    .then((data) => {
      console.log('获取到的用户数据：', data)
      if (data.code == 200) {
        // user.userName = data.data.userInfo.userName
        user.userId = data.data.userInfo.userId
        user.faculty = data.data.userInfo.faculty
        console.log("user:", user)
        getAnnouncements(user)
          .then((data) => {
            console.log('获取到的公告数据：', data)
            form.announcements = data.data.announcements
            form.announcements.forEach((announcement) => {
              announcement.userId = user.userId
              announcement.isNeedSure = announcement.isNeedSure === 0 ? true : false
              if (announcement.isNeedSure) {
                announcement.isNeedSure = '0'
                isSureAnnouncement(announcement)
                  .then((res) => {
                    console.log("是否确认：", res.data.unSure.isSure)
                    announcement.haveSure = res.data.unSure.isSure === 0 ? false : true
                    announcement.isNeedSure = announcement.isNeedSure === '0' ? true : false
                  })
              }
            })
          })
      }
    })
})

const handleChange = (val: string[]) => {
  console.log(val)
}
</script>
