<template>
  <div>
    <!--职位展示-->
    <el-scrollbar height="580px">
      <el-table :data="filterTableData.slice(startArrayIndex, endArrayIndex)" row-key="userInfo.number"
                :expand-row-keys="appointExpandRow" @row-click="switchRows" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <!--个人信息框-->
            <el-row style=" display: flex;
        flex-wrap: wrap; justify-content: center;padding: 10px 0;
        border: 1px solid #dadada;box-shadow: 0 0 10px #e8e5e5;">
              <el-col :span="22">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  目前状态:
                  <span style="font-size: 16px;;float:right;margin-right: 10px">
                    <!--@click="toggleDialog('userVisible')"-->
                    编辑
                    <el-icon>
                      <i-edit/>
                    </el-icon>
                  </span>
                  <ul class="wanna-title__list"
                      style="display: flex;
                                    flex-wrap: wrap; justify-content: center;  margin-top: 16px; overflow: hidden; list-style: none; ">
                    <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      现居住地:
                      <span>{{ props.row.userInfo.address }}</span>
                    </li>

                    <li class="wanna-title__item" style="float: left;;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      邮箱:
                      <span>{{ props.row.userInfo.email }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      公司ID:
                      <span>{{ props.row.userInfo.firmId }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;overflow: hidden;
                                          text-overflow: ellipsis;white-space: nowrap; ">
                      个人介绍:
                      <span>{{ props.row.userInfo.introduction }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      电话:
                      <span>{{ props.row.userInfo.iphone }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      微信:
                      <span>{{ props.row.userInfo.vx }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      更新时间:
                      <span>{{ dayjs(props.row.userInfo.updateTime).format('YYYY-MM-DD') }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      创建时间:
                      <span>{{ dayjs(props.row.userInfo.createTime).format('YYYY-MM-DD') }}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="22">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  求职意向:
                  <span style="font-size: 16px;;float:right;margin-right: 10px" @click="toggleDialog()">
                    编辑
                    <el-icon>
                      <i-edit/>
                    </el-icon>
                  </span>
                  <ul class="wanna-title__list"
                      style="display: flex;
                                    flex-wrap: wrap; justify-content: center;  margin-top: 16px; overflow: hidden; list-style: none; ">
                    <li class="wanna-title__item" style="float: left; font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      求职状态:
                      <span>{{ props.row.jobHuntingInfo.jobStatus }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      职位:
                      <span>{{ props.row.jobHuntingInfo.position }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      薪资要求:
                      <span>{{ props.row.jobHuntingInfo.salaryMin }} - {{
                          props.row.jobHuntingInfo.salaryMax
                        }} 元/月</span>
                    </li>
                    <li class="wanna-title__item" style="float: left;;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      期望城市:
                      <template v-for="(item, index) in props.row.jobHuntingInfo.expectCity">
                        <span>{{ item }}</span>
                        <span v-if="index !== props.row.jobHuntingInfo.expectCity.length - 1"> , </span>
                      </template>

                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      工作性质:
                      <span>{{ props.row.jobHuntingInfo.jobNature }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;">
                      期望行业:
                      <span>{{ props.row.jobHuntingInfo.expectIndustry }}</span>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="22">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  教育经历:
                  <ul class="edu-ul" style="margin-top: 16px; overflow: hidden; list-style: none;">
                    <li class="clearfix" style="width: 100%; display: flex; flex-wrap: wrap; justify-content:space-evenly;
                                        font-size: 14px; color: #666; line-height: 24px;">
                      <div class="edu-ul-title" style=" float: left;
                              text-overflow: ellipsis; overflow: hidden; vertical-align: middle;">
                        {{ props.row.jobHuntingInfo.colleges }}
                      </div>
                      <span title="学历" class="edu-ul-txt" style="">{{ props.row.jobHuntingInfo.education }}</span>
                      <span class="edu-ul-txt">{{ props.row.jobHuntingInfo.profession }}</span>
                      <template v-for="(item, index) in props.row.jobHuntingInfo.academicYear">
                        {{ dayjs(item).format("YYYY-MM-DD") }}
                        <template v-if="index !== props.row.jobHuntingInfo.academicYear.length - 1"> ~</template>
                      </template>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="22" style="margin-top: 15px;">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  专业技能:
                </div>
                <div v-html="props.row.jobHuntingInfo.professionalSkill" style="overflow: hidden;
                      text-overflow: ellipsis;  padding-left: 30px;
                      display: -webkit-box;
                      -webkit-line-clamp: 7;margin-top: 10px;
                      -webkit-box-orient: vertical;white-space: pre-wrap">
                </div>
              </el-col>
              <el-col :span="22" style="margin-top: 15px;">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  个人作品:
                </div>
                <div v-html="props.row.jobHuntingInfo.works" style="overflow: hidden;
                      padding-left: 30px;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 7;margin-top: 10px;
                      -webkit-box-orient: vertical;white-space: pre-wrap">
                </div>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="id" prop="userInfo.id"/>
        <el-table-column label="number" prop="userInfo.number"/>
        <el-table-column label="姓名" prop="userInfo.name"/>
        <el-table-column label="是否有效" prop="userInfo.state">
          <template #default="scope">
            <span v-if='scope.row.userInfo.state'>是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column label="简历查看">
          <template #default="scope">
            <!--在线简历按钮-->
            <el-button size="small" type="danger" @click="resumeView(scope.$index, scope.row)">
              在线简历查看
            </el-button>
            <!--离线简历按钮-->
            <el-button size="small" style="margin-top:5px;margin-left:0"
                       @click="offlineCVButton(scope.$index, scope.row)">
              附件简历查看
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="right" style="">
          <template #header>
            <el-input v-model="search" size="default" placeholder="数据搜索"/>
          </template>
          <template #default="scope">
            <el-button size="default" @click="handleEditState(scope.$index, scope.row.userInfo)">状态设置</el-button>
            <!--            <el-button size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <!--            <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!--职位展示 end-->
    <!--分页-->
    <el-row>
      <div class="demo-pagination-block" style="width: 100%;display: flex; flex-wrap: wrap; justify-content: center;">
        <el-pagination v-model:currentPage="currentPage" v-model:page-size="pageSize" :pager-count="pagerCount"
                       :disabled="disabled" :background="background" hide-on-single-page
                       layout="prev, pager, next, jumper"
                       :total="totalSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
      </div>
    </el-row>
    <!--分页 end-->
    <!--在线简历展示组件-->
    <div>
      <OnlineResumeDialog v-model:resumeInfo="form" ref="openOnlineResumeDialogRef"></OnlineResumeDialog>
    </div>
    <!--在线简历展示组件 end-->

    <!--离线简历展示组件-->
    <div>
      <OfflineResumeDialog v-model:data="content" ref="offlineResumeDialogRef"></OfflineResumeDialog>
    </div>
    <!--离线简历展示组件 end-->
    <!-- 设置用户状态组件-->
    <el-dialog v-model="userInfoStateDialogVisible" title="评估框" width="30%" center>

      <el-radio-group v-model="userState.state" style="display: flex;  flex-wrap: wrap; justify-content: center;">
        <el-radio :label=true>目前可用</el-radio>
        <el-radio :label=false>设为失效</el-radio>
      </el-radio-group>


      <template #footer>
        <span class="dialog-footer">
          <el-button @click="toggleUserInfoSateDialog">取消</el-button>
          <el-button type="primary" @click="submitUserInfoResult">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!--设置用户状态组件 end-->
  </div>
</template>

<script setup lang="ts">
import OfflineResumeDialog from './offlineResumeDialog.vue'
import OnlineResumeDialog from './onlineResumeDialog.vue'

import {computed, onMounted, reactive, ref} from 'vue'
import {postJsonRequest, postRequest} from "@/api";
import dayjs from "dayjs";
import {ElNotification} from "element-plus/es";

interface userTotalInfo {
  userInfo: {
    address: string,
    age: number,
    createTime: Date,
    email: string,
    firmId: number,
    gender: boolean,
    id: number,
    imgPath: string,
    introduction: string,
    iphone: string,
    name: string,
    number: string,
    position: string,
    state: boolean,
    updateTime: Date,
    vx: string,
  }
  jobHuntingInfo: {
    id: number,
    jobStatus: string,
    position: string,
    salaryMin: string,
    salaryMax: string,
    expectCity: string[],
    jobNature: string,
    expectIndustry: string,
    colleges: string,
    education: string,
    profession: string,
    appendix: string,
    works: string,
    professionalSkill: string,
    academicYear: Date[],
    updateTime: Date,
    state: boolean
  }
  resumeDelivery: {
    createTime: Date,
    firmId: number,
    isOnlineResume: boolean,
    jobNumber: string,
    number: string,
    result: number,
    state: boolean,
    updateTime: Date,
    userId: number,
  }
}


const currentPage = ref(1)  //当前页
const pageSize = ref(1) //每页显示条目个数
const background = ref(true)  //打开背景色
const disabled = ref(false) //分页是否禁用
const totalSize = ref(10);  // 总条目数
const pagerCount = 5  //显示按钮个数
const startArrayIndex = ref(0) //数组起始索引值
const endArrayIndex = ref(pageSize.value) //数组结尾索引值
const handleSizeChange = (val: number) => {
  console.log(`${val}`, ' items per page')
}
const handleCurrentChange = (val: number) => {
  startArrayIndex.value = pageSize.value * (val - 1)
  endArrayIndex.value = startArrayIndex.value + pageSize.value
  if (endArrayIndex.value >= totalSize.value) {
    endArrayIndex.value = totalSize.value
  }
  // console.log(' startArrayIndex.value', startArrayIndex.value)
  // console.log(' endArrayIndex.value', endArrayIndex.value)
  // console.log(`current page: ${val}`)
}


const dialogVisible = ref(false)  //对话框默认不显示
// const id = store.state.user.profile.id  //获取id
let form = reactive<userTotalInfo>({
  userInfo: {
    address: "",
    age: 0,
    email: "",
    firmId: 0,
    gender: false,
    id: 0,
    imgPath: '',
    introduction: '',
    iphone: "",
    name: "",
    number: "",
    position: '',
    state: true,
    updateTime: new Date(),
    createTime: new Date(),
    vx: "",
  },
  jobHuntingInfo: {
    academicYear: [],
    appendix: "",
    colleges: "",
    education: "",
    expectCity: [''],
    expectIndustry: "",
    id: 0,
    jobNature: "",
    jobStatus: "",
    position: "0",
    profession: "",
    professionalSkill: "",
    salaryMax: '',
    salaryMin: '',
    state: true,
    updateTime: new Date,
    works: "",
  },
  resumeDelivery: {
    createTime: new Date(),
    firmId: 0,
    isOnlineResume: false,
    jobNumber: "",
    number: "",
    result: 0,
    state: false,
    updateTime: new Date(),
    userId: 0,
  },
})  //临时表单
const search = ref('')
let tableData: userTotalInfo[] = reactive([])
let URL = ref<string>('')
//数据过滤集
const filterTableData = computed(() =>
    tableData.filter(
        (data) => {
          // return !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
          return !search.value || JSON.stringify(data).toLowerCase().includes(search.value.toLowerCase())
        }
    )
)
//打开或关闭某一行
let appointExpandRow: any = reactive([])//指定展开的行
function switchRows(row: { userInfo: { number: string } }) {
  //指定改行展开或者关闭
  //判断该行row-key指定的number值是否在展开数组appointExpandRow中,并返回索引值
  const index = appointExpandRow.indexOf(row.userInfo.number)
  if (index > -1) {
    appointExpandRow.splice(index, 1)//根据索引删除元素
  } else {  //未发现
    appointExpandRow.push(row.userInfo.number)
  }
}


/*修改组件显示方法*/
function toggleDialog() {
  dialogVisible.value = !dialogVisible.value;
}

// // 提交
// async function submit() {
//   // form.salary = JSON.stringify(form.salary) //转成字符串
//   const result = await postJsonRequest(URL.value, form);
//   const arr = result.result;
//   //转换为前端数据
//   ConvertToFrontData(arr)
//   //关闭对话框
//   toggleDialog()
// }


//转换为前端数据
function ConvertToFrontData(arr: any) {
  tableData.length = 0  //响应式数组清空, 必须这样才能清空,否则tableData会失去响应式
  // console.log('ConvertToFrontDataArr', arr)
  arr.forEach((value: any) => {
    value.userInfo.updateTime = new Date(value.userInfo.updateTime)
    value.userInfo.createTime = new Date(value.userInfo.createTime)
    value.jobHuntingInfo.academicYear = value.jobHuntingInfo.academicYear.split(',')
    value.jobHuntingInfo.expectCity = value.jobHuntingInfo.expectCity.split(',')
    value.jobHuntingInfo.updateTime = new Date(value.jobHuntingInfo.updateTime)
    value.resumeDelivery.updateTime = new Date(value.resumeDelivery.updateTime)
    value.resumeDelivery.createTime = new Date(value.resumeDelivery.createTime)
    // console.log('arrKey', value)
  })
  // for (let arrKey in arr) {
  //   console.log('arrKey',arrKey)
  // }
  tableData.push(...arr)
  //初始化分页数据
  totalSize.value = tableData.length
}

//
// // 单个编辑
// const handleEdit = (index: number, row: { [x: string]: any; }) => {
//   toggleDialog()
//   for (let rowKey in row) {
//     form[rowKey] = row[rowKey]
//   }
//   URL.value = "/jobList/updateJobList"  //修改路径
// }
// // 单个删除
// const handleDelete = (index: number, row: { number: any; announcerId: number }) => {
//   let temp = ref({id: row.announcerId, number: row.number})
//   handleDel(temp) //删除操作,获取数据
//
//   ConvertToFrontData(arr) //转换为前端数据
// }
//
// // 删除职位信息
// async function handleDel(param: {}) {
//   const data = await postRequest("/jobList/delJobList", param.value)
//   console.log('data.result.result', data.result.result)
//   const result = data.result.result //获取数据
//   ConvertToFrontData(result)
// }
const userInfoStateDialogVisible = ref(false)

function toggleUserInfoSateDialog() {
  userInfoStateDialogVisible.value = !userInfoStateDialogVisible.value
}

//用户状态
let userState = reactive({
  id: 0,
  state: true
})

function handleEditState(index: number, row: userInfo) {
  toggleUserInfoSateDialog()
  // console.log('row', row)
  userState.id = row.id
  userState.state = row.state

}

async function submitUserInfoResult() {
  console.log(userState)
  const data = await postJsonRequest("/userInfo/updateUserInfo", userState)
  const result = data.result[0]
  console.log('data', data.result[0])
  tableData.forEach(value => {
    if (value.userInfo.id === result.id) {
      value.userInfo.state = result.state
    }
  })
  toggleUserInfoSateDialog()
}

//初始化数据
async function InitialTableData() {
  const data = await postJsonRequest("/userInfo/getUserInfoJobHuntingInfo", {});
  //  const data = await postJsonRequest("/firm/getFirmInfo", {});
  const arr = data.result //获取数据
  // console.log("arr",arr)
  // tableData.length = 0  //响应式数组清空
  ConvertToFrontData(arr)
}

const openOnlineResumeDialogRef: any = ref(null) //在线简历展示框 默认不显示
//简历查看
const resumeView = (index: number, row: { jobHuntingInfo: any; userInfo: any; }) => {
  //初始化简历样式
  // resumeInfo.resumeDelivery = row.resumeDelivery
  form.jobHuntingInfo = row.jobHuntingInfo
  form.userInfo = row.userInfo
  console.log('resumeInfo.resumeDelivery.isOnlineResume', form.resumeDelivery.isOnlineResume,
      typeof form.resumeDelivery.isOnlineResume)
  openOnlineResumeDialogRef.value.openOnlineResumeDialog()  //打开组件,并初始化简历数据
  // console.log('resumeViewRow:', row)
  console.log('FatherResumeInfo', form)

}
//传给ResumeDialog的数据
let content = reactive({
  id: form.userInfo.id,
  fileName: 'xxx.pdf',
  openDialog: false
});
const offlineResumeDialogRef: any = ref(null) //离线简历展示框 默认不显示

//点击离线简历按钮
const offlineCVButton = (index: number, row: any) => {
  content.id = row.userInfo.id
  content.fileName = row.jobHuntingInfo.appendix
  content.openDialog = true
  console.log('content', content.fileName, typeof content.fileName)
  if (content.fileName == '' || content.fileName == null) {
    notification("无法打开!!", '该用户没有上传附件简历!!!')
  } else {
    offlineResumeDialogRef.value.openOfflineResumeDialog() //打开组件,并初始化简历数据
  }

}

onMounted(() => {
  InitialTableData()
})

//通知结果
function notification(title: string, message: string) {
  ElNotification({
    title: title,
    dangerouslyUseHTMLString: true,
    message: message,
    duration: 3000
  })
}
</script>

<style lang="less" scoped>
:deep(.cell) {
  padding: 10px;
}
</style>
