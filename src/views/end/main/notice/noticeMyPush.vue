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
                <el-button type="success" round :disabled=announcement.haveSure
                  @click="handleConfirmation(announcement)">发布</el-button>

                  <el-button type="warning" round :disabled=announcement.haveSure
                  @click="handleConfirmation1(announcement)">撤销</el-button>

                  <el-button type="danger" round :disabled=announcement.haveSure
                  @click="handleConfirmation2(announcement)">删除</el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </template>
    
    
    <script lang="ts" setup>
    
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
    
    
    const handleChange = (val: string[]) => {
      console.log(val)
    }
    </script>
    