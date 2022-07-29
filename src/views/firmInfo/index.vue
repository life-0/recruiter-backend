<template>
  <div>
    <!--职位展示-->
    <el-scrollbar height="580px">
      <el-table :data="filterTableData.slice(startArrayIndex, endArrayIndex)" row-key="number"
        :expand-row-keys="appointExpandRow" @row-click="switchRows" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <!--企业信息框-->
            <el-row style="display: flex;
        flex-wrap: wrap; justify-content: center;padding: 10px 0;
        border: 1px solid #dadada;box-shadow: 0 0 10px #e8e5e5;">
              <!--个人框 end-->
              <!--个人头像行-->
              <el-col :span="8">
                <!--头像-->
                <img :src="props.row.firmAvatar" style="
                  width: 88px;height: 88px;
                  background: #ffffff;
                  border:  1px #a5a7a8;
                  transition: 0.3s;float: left;
                  margin-top: 5px;
                  " alt="..." />
              </el-col>
              <!--个人姓名行-->
              <el-col :span="14" style="color: #333">
                <!--个人姓名-->

                <div style="font-size: 20px;

                            padding: 9px">
                  {{ props.row.firmName }}
                </div>
                <!--公司官网链接-->
                <div style="margin-top: 15px">
                  <div style="">
                    企业官网:
                    <a :href="props.row.officialUrl" style=" display: inline-block;vertical-align: bottom;text-decoration:none;color: #6babda;white-space: nowrap;  overflow: hidden;
                              text-overflow: ellipsis;width: 50%">{{ props.row.officialUrl }}</a>
                  </div>
                </div>
                <!--公司官网链接 end-->
              </el-col>
            </el-row>
            <el-row style=" display: flex;
        flex-wrap: wrap; justify-content: center;padding: 10px 0;
        border: 1px solid #dadada;box-shadow: 0 0 10px #e8e5e5;">
              <el-col :span="22">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  企业基本信息:
                  <!--                  <span style="font-size: 16px;;float:right;margin-right: 10px"-->
                  <!--                        @click="toggleDialog()">-->
                  <!--            编辑-->
                  <!--            <el-icon><i-edit/></el-icon></span>-->
                  <ul class="wanna-title__list" style="display: flex;
                                    flex-wrap: wrap; justify-content: center;  overflow: hidden; list-style: none; ">
                    <li class="wanna-title__item" style="float: left;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      融资规模:
                      <span>{{ props.row.financingScale }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      企业人数:
                      <span>{{ props.row.firmNumber }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      企业领域:
                      <span>{{ props.row.field }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      成立时间:
                      <span>{{ props.row.established }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      法人代表:
                      <span>{{ props.row.legalPerson }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      注册资本:
                      <span>{{ props.row.registeredCapital }}</span>
                    </li>

                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      企业地址:
                      <span>{{ props.row.address }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 50%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      企业性质:
                      <span>{{ props.row.organizationType }}</span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px; width: 100%;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      企业信息:
                      <span> <a :href="props.row.officialUrl" style=" display: inline-block;vertical-align: bottom;text-decoration:none;color: #6babda;
                           white-space: nowrap;  overflow: hidden; text-overflow: ellipsis;width: 50%">
                          {{ props.row.infoUrl }}</a></span>
                    </li>
                    <li class="wanna-title__item" style="float: left; ;font-size: 14px;width: 100%;
               white-space: nowrap;  overflow: hidden; text-overflow: ellipsis;
                                          color: #666; line-height: 24px;margin-top: 10px">
                      企业福利:
                      <template v-for="(item, index) in props.row.welfare ">
                        <span>{{ item }}</span>
                        <span v-if="index !== props.row.welfare.length - 1">, </span>
                      </template>
                    </li>
                  </ul>
                </div>
              </el-col>
              <el-col :span="22" style="margin-top: 15px;">
                <div style="font-size: 18px;color: #333;letter-spacing: 1.21px;">
                  企业介绍:
                </div>
                <div v-html="props.row.introduction" style="overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 7;margin-top: 10px;
                      -webkit-box-orient: vertical;white-space: pre-wrap">
                </div>
              </el-col>
            </el-row>
            <!--企业信息框 end-->
          </template>
        </el-table-column>
        <el-table-column label="公司ID" prop="firmId" />
        <el-table-column label="number" prop="number" />
        <el-table-column label="公司名" prop="firmName" />
        <el-table-column label="目前状态" prop="state">
          <template #default="scope">
            <span v-if='scope.row.state'>目前可用</span>
            <span v-else>已失效</span>
          </template>
        </el-table-column>
        <el-table-column align="right" style="">
          <template #header>
            <el-input v-model="search" size="default" placeholder="数据搜索" />
          </template>
          <template #default="scope">
            <el-button size="default" @click="handleEditState(scope.$index, scope.row)">状态设置</el-button>
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
          :disabled="disabled" :background="background" hide-on-single-page layout="prev, pager, next, jumper"
          :total="totalSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </el-row>
    <!--分页 end-->

    <!-- 设置企业状态组件-->
    <el-dialog v-model="firmInfoStateDialogVisible" title="评估框" width="30%" center>
      <el-radio-group v-model="userState.state" style="display: flex;  flex-wrap: wrap; justify-content: center;">
        <el-radio :label=true>目前可用</el-radio>
        <el-radio :label=false>设为失效</el-radio>
      </el-radio-group>


      <template #footer>
        <span class="dialog-footer">
          <el-button @click="toggleFirmInfoSateDialog">取消</el-button>
          <el-button type="primary" @click="submitUserInfoResult">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!--设置企业状态组件 end-->
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { postJsonRequest, postRequest } from "@/api";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";
import { jobList } from "@/store/POJOInterface/jobList";
import { firmInfo } from "@/store/POJOInterface/firmInfo";



const currentPage = ref(1)  //当前页
const pageSize = ref(2) //每页显示条目个数
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
let form = reactive<firmInfo>({
  address: "",
  createTime: new Date,
  established: new Date(),
  field: "",
  financingScale: "",
  firmAvatar: "",
  firmId: 0,
  firmName: "",
  firmNumber: 0,
  infoUrl: "",
  introduction: "",
  legalPerson: "",
  number: "",
  officialUrl: "",
  organizationType: "",
  registeredCapital: "",
  state: true,
  updateTime: new Date(),
  welfare: ['']
})  //临时表单
const search = ref('')
let tableData: firmInfo[] = reactive([])
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
function switchRows(row: { number: string }) {
  //指定改行展开或者关闭
  //判断该行row-key指定的number值是否在展开数组appointExpandRow中,并返回索引值
  const index = appointExpandRow.indexOf(row.number)
  if (index > -1) {
    appointExpandRow.splice(index, 1)//根据索引删除元素
  } else {  //未发现
    appointExpandRow.push(row.number)
  }
}

/*修改组件显示方法*/
function toggleDialog() {
  dialogVisible.value = !dialogVisible.value;
}


//转换为前端数据
function ConvertToFrontData(arr: any) {
  tableData.length = 0  //响应式数组清空, 必须这样才能清空,否则tableData会失去响应式
  // console.log('ConvertToFrontDataArr', arr)
  arr.forEach((value: any) => {
    value.updateTime = new Date(value.updateTime)
    value.createTime = new Date(value.createTime)
    value.welfare = value.welfare.split(",")
    // console.log('arrKey', value)
  })

  tableData.push(...arr)
  //初始化分页数据
  totalSize.value = tableData.length
}

const firmInfoStateDialogVisible = ref(false)

function toggleFirmInfoSateDialog() {
  firmInfoStateDialogVisible.value = !firmInfoStateDialogVisible.value
}

//用户状态
let userState = reactive({
  firmId: 0,
  state: true
})

function handleEditState(index: number, row: { firmId: number, state: boolean }) {
  toggleFirmInfoSateDialog()
  // console.log('row', row)
  userState.firmId = row.firmId
  userState.state = row.state
}

async function submitUserInfoResult() {
  console.log(userState)
  const data = await postJsonRequest("/firm/updateFirmInfo", userState)
  const result = data.result
  console.log('data', data.result)
  tableData.forEach(value => {
    if (value.firmId === result.firmId) {
      value.state = result.state
    }
  })
  toggleFirmInfoSateDialog()
}


//初始化数据
async function InitialTableData() {
  const data = await postJsonRequest("/firm/getFirmInfo", {});
  const arr = data.result //获取数据
  console.log(arr)
  // tableData.length = 0  //响应式数组清空
  ConvertToFrontData(arr)
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
