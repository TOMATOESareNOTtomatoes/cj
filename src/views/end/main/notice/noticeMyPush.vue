<template>
  <div class="demo-collapse" id="abcd" v-show="!showEeee.showEeee">
    <div v-for="(announcement, index) in form.announcements" :key="index">
      <el-collapse @change="handleChange">
        <el-collapse-item name="{{ index }}">
          <template #title>
            <el-row :gutter="450">
              <el-col :span="10">
                <div style="width: 400px;height: 20px;">标题: {{ announcement.title }}</div>
              </el-col>
              <el-col :span="10">
                <div style="float: inline-end;width: 200px;">发布人:{{ announcement.userName }}</div>
              </el-col>
            </el-row>
          </template>

          <div>内容：{{ announcement.content }}</div>

          <div style="height: 40px"></div>

          <el-button type="success" round :disabled=announcement.publish @click="publish(announcement)">发布</el-button>

          <el-button type="warning" round @click="revise(announcement)">修改</el-button>

          <el-button type="warning" round :disabled=announcement.quash @click="quash(announcement)">撤销</el-button>

          <el-button type="danger" round  @click="deletem(announcement)">删除</el-button>

        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
  <div id="eeee" ref="eeee" v-show="showEeee.showEeee">
    <el-form :model="form1" label-width="120px">
      <el-form-item label="公告/通知标题：">
        <el-input v-model="form1.title" />
      </el-form-item>

      <el-form-item label="公告/通知内容：">
        <el-input v-model="form1.content" :rows="10" type="textarea" />
      </el-form-item>

      <el-form-item label="是否需要确认">
        <el-switch v-model="form1.isNeedSure"  active-value="0" inactive-value="1" />
      </el-form-item>

      <el-form-item label="立即发布">
        <el-switch v-model="form1.isCancel" active-value="0" inactive-value="1" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit(form1)">确认修改</el-button>
        <el-button @click="Cancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    
    
<script lang="ts" setup>

import { ref, reactive, onMounted } from 'vue'
import { myAnnouncements ,upAnnouncement, deleteAnnouncement} from '@/api/userPlus.js'


const user = ref({
  userId: "",
  faculty: ""
});

const showEeee=reactive({
  showEeee:false
})

const form1=ref({
  title: '',
  content: "",
  isNeedSure: '',
  isCancel:'',
  announcementId:''
})

interface Announcement {
  title: string,
  content: string,
  pushTime: string,
  isNeedSure: number,
  isAll: number,
  faculty: string,
  userId: string,
  userName: string,
  isCancel: number,

  publish: boolean,
  revise: boolean,
  quash: boolean,
}

const form = reactive({
  announcements: [] as Announcement[]
})

const handleChange = (val: string[]) => {
  console.log(val)
}

//发布按钮
const publish=(announcement)=>{
  announcement.isCancel=0
  upAnnouncement(announcement)
  .then(res=>{
    if(res.code==200){
      //成功提示todo：
      console.log("发布成功！")
    }
  })
}

//修改按钮
const revise=(announcement)=>{
  showEeee.showEeee= !showEeee.showEeee
  form1.value=announcement
  console.log("参数：",form1.value)
  upAnnouncement(announcement)
  .then(res=>{
    if(res.code==200){
      //成功提示todo：
      showEeee.showEeee= !showEeee.showEeee
    }
  })
}

//撤销按钮
const quash=(announcement)=>{
  announcement.isCancel=2
  upAnnouncement(announcement)
  .then(res=>{
    if(res.code==200){
      //成功提示todo：
      console.log("撤销成功！")
    }
  })
}

//删除按钮
const deletem=(announcement)=>{
  deleteAnnouncement(announcement)
  .then(res=>{
    if(res.code==200){
      //成功提示todo：
      console.log("删除成功！")
    }
  })
}


//提交按钮
const onSubmit=(form2)=>{
  console.log("提交的内容：",form2)
}

//取消提交
const Cancel=()=>{
  showEeee.showEeee= !showEeee.showEeee
}

onMounted(async () => {
  user.userId = sessionStorage.getItem("userId")
  user.faculty = sessionStorage.getItem("faculty")
  const data = await myAnnouncements(user)
  form.announcements = data.data.announcements
  form.announcements.forEach((Announcement)=>{
    Announcement.publish=Announcement.isCancel===0 ? true:false
    Announcement.quash=Announcement.isCancel===2 ? true:false
  })
})

</script>
    