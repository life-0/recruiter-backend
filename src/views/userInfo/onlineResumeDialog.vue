<template>
  <!--简历展示组件-->
  <el-dialog v-model="resumeDialogVisible" style="padding: 10px" center>
    <div id="pdfDom">
      <div style="display: flex; flex-wrap: wrap; justify-content: center;width: 100%">
        {{ resumeInfo.userInfo.name }}
      </div>
      <el-row style="width: 96%;height: 58%;padding: 10px 0;">
        <el-col :span="23" style="margin-bottom: 15px">
          <div style="font-size: 18px;color: #333;letter-spacing: 1px;
                  border-bottom: 2px #0a0a0a ; border-bottom-style:  solid">
            基本信息:
          </div>
          <ul class="wanna-title__list" style="display: flex;
                                    flex-wrap: wrap; justify-content: center;  overflow: hidden; list-style: none; ">
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              意向职位:
              <span style="color: #0a0a0a">{{ resumeInfo.jobHuntingInfo.position }}</span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              意向城市:
              <span style="color: #0a0a0a">
                <template v-for="(item, index) in resumeInfo.jobHuntingInfo.expectCity ">
                  {{ item }}
                  <template v-if="index !== resumeInfo.jobHuntingInfo.expectCity.length - 1">
                    ,
                  </template>
                </template>
                <!--                {{ resumeInfo.jobHuntingInfo.expectCity }}-->
              </span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              电话:
              <span style="color: #0a0a0a">{{ resumeInfo.userInfo.iphone }}</span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              邮箱:
              <span style="color: #0a0a0a">{{ resumeInfo.userInfo.email }}</span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 100%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              微信:
              <span style="color: #0a0a0a">{{ resumeInfo.userInfo.vx }}</span>
            </li>
          </ul>
        </el-col>
        <el-col :span="23" style="margin-bottom: 15px">
          <div style="font-size: 18px;color: #333;letter-spacing: 1px;
                  border-bottom: 2px #0a0a0a ; border-bottom-style:  solid">
            教育经历:
          </div>
          <ul class="wanna-title__list" style="display: flex;
                flex-wrap: wrap; justify-content: center;
                overflow: hidden; list-style: none; ">
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #000000; line-height: 24px;margin-top: 10px">
              毕业院校:
              <span style="color: #0a0a0a">{{ resumeInfo.jobHuntingInfo.colleges }}</span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              学历:
              <span style="color: #0a0a0a">{{ resumeInfo.jobHuntingInfo.education }}</span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              专业:
              <span style="color: #0a0a0a">{{ resumeInfo.jobHuntingInfo.profession }}</span>
            </li>
            <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
              学年:
              <span style="color: #0a0a0a">
                <!--                  <template v-for="(item,index) in  (resumeInfo.jobHuntingInfo.academicYear.split(',') )">-->
                <template v-for="(item, index) in  (resumeInfo.jobHuntingInfo.academicYear)">
                  <!--                    {{ timestampFormat(item, 'yyyy-MM-dd') }}~-->
                  <!--                    {{ new Date((parseInt(item))).format('yyyy-MM-dd') }}-->
                  {{ dayjs(item).format("YYYY-MM-DD") }}
                  <template v-if="index !== (resumeInfo.jobHuntingInfo.academicYear.length - 1)">
                    ~
                  </template>
                </template>

              </span>
            </li>
          </ul>
        </el-col>
        <el-col :span="23" style="margin-bottom: 15px">
          <div style="font-size: 18px;color: #333;letter-spacing: 1px;
                  border-bottom: 2px #0a0a0a ; border-bottom-style:  solid">
            专业技能:
          </div>
          <ul class="" style=" overflow: hidden;white-space: pre-wrap; ">
            <li class="wanna-title__item"
                style="float: left;font-size: 14px; width: 100%; color: #000000; line-height: 24px;margin-top: 10px">
              {{ resumeInfo.jobHuntingInfo.professionalSkill }}
            </li>

          </ul>
        </el-col>
        <el-col :span="23" style="margin-bottom: 15px">
          <div style="font-size: 18px;color: #333;letter-spacing: 1px;
                  border-bottom: 2px #0a0a0a ; border-bottom-style:  solid">
            作品:
          </div>
          <ul class="" style=" overflow: hidden; white-space: pre-wrap;">
            <li class="wanna-title__item"
                style="float: left;font-size: 14px; width: 100%; color: #000000; line-height: 24px;margin-top: 10px">
              {{ resumeInfo.jobHuntingInfo.works }}
            </li>

          </ul>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <el-col :span="23" style="margin-top: 10px;display: flex; flex-wrap: wrap; justify-content: center;">
        <el-button>取消</el-button>
        <el-button type="primary"
                   @click="exportPDF(resumeInfo.jobHuntingInfo.position + '_' + resumeInfo.userInfo.name)">
          导出PDF
        </el-button>
      </el-col>
    </el-row>
  </el-dialog>
  <!--简历展示组件 end-->
</template>

<script setup lang="ts">
import {nextTick, onMounted, reactive, ref, watch} from "vue";
import {getPdf} from '@/utils/htmlToPdf.js'
import dayjs from 'dayjs'

const resumeDialogVisible = ref(false)  //简历展示框 默认不显示

//子组件获得上层父组件值
const props = defineProps({  //获取传参的数据
  resumeInfo: {
    type: Object,
    default: {
      resumeInfo: {
        jobHuntingInfo: {
          type: Object,
          default: {
            academicYear: ["1570032000000,1688572800000"],
            appendix: "",
            colleges: "",
            education: "",
            expectCity: "",
            expectIndustry: "",
            id: 0,
            jobNature: "",
            jobStatus: "",
            number: "",
            position: "",
            profession: "",
            salaryMax: 0,
            salaryMin: 0,
            state: true,
            updateTime: "2022-04-30",
            works: "",
          }
        },
        resumeDelivery: {
          type: Object,
          default: {
            createTime: '',
            firmId: 0,
            isOnlineResume: true,
            jobNumber: "",
            number: "",
            result: 1,
            state: null,
            updateTime: null,
            userId: 0
          }
        },
        userInfo: {
          type: Object,
          default: {
            address: "",
            age: 0,
            createTime: "2021-11-20T18:47:22.000+00:00",
            email: "",
            firmId: 0,
            gender: true,
            id: 0,
            imgPath: "",
            introduction: '',
            iphone: "",
            name: "",
            number: "",
            position: "",
            state: true,
            updateTime: "",
            vx: ""
          }
        },
      },
    }
  }
})

//向父组件传递子组件的值和方法
defineExpose({
  openOnlineResumeDialog() {
    console.log('props.resumeInfo', props.resumeInfo)
    toggle()
  }
})

function toggle() {
  resumeDialogVisible.value = !resumeDialogVisible.value
}

// 下载pdf文件 分页
function exportPDF(title: string) {
  getPdf(title)
}

onMounted(() => {
  console.log('props.resumeInfo', props.resumeInfo)
})

</script>

<style scoped>
</style>
