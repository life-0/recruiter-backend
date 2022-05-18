<template>
  <div>
    <!--职位展示-->
    <el-scrollbar height="580px">
      <el-table :data="filterTableData" style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div style="padding: 10px">
              <p>应聘条件: {{ props.row.applicationConditions }}</p>
              <p>需求人数: {{ props.row.requireCount }}</p>
              <p>申请人数: {{ props.row.applicantCount }}</p>
              <p>更新时间: {{ dayjs(props.row.updateTime).format('YYYY-MM-DD') }}</p>
              <p>发布时间: {{ dayjs(props.row.createTime).format('YYYY-MM-DD') }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="职位" prop="position"/>
        <el-table-column label="薪资" prop="salary"/>
        <el-table-column label="地址" prop="address"/>
        <el-table-column label="是否发布" prop="state">
          <template #default="scope">
            <span v-if='scope.row.state'>是</span>
            <span v-else>否</span>
          </template>
        </el-table-column>
        <el-table-column align="right" style="">
          <template #header>
            <el-input v-model="search" size="default" placeholder="数据搜索"/>
          </template>
          <template #default="scope">
            <el-button size="default" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="default" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!--职位展示 end-->
    <!--分页-->
    <el-row>
      <div class="demo-pagination-block" style="width: 100%;display: flex; flex-wrap: wrap; justify-content: center;">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :pager-count="pagerCount"
            :disabled="disabled"
            :background="background"
            hide-on-single-page
            layout="prev, pager, next, jumper"
            :total="totalSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <!--分页 end-->
    <!--修改组件-->
    <div>
      <el-dialog
          v-model="dialogVisible"
          title="编辑组件">
        <!--编辑表单-->
        <el-form :model="form" :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-col :span="11" style="margin-bottom: 10px">
              <label style="width:65px;margin-right: 5px">职位 :</label>
              <el-input v-model="form.position" style="width: auto"/>
            </el-col>
            <el-col :span="11" style="margin-bottom: 10px">
              <label style="width:65px;margin-right: 5px">公司地址 :</label>
              <el-input v-model="form.address" style="width: auto"/>
            </el-col>
            <el-col :span="16" style="margin-bottom: 10px">
              <label style="width:65px;margin-right: 5px">薪资 :</label>
              <el-input v-model="form.salary[0]" style="width: 26%"/>
              <span class="text-gray-500"> -- </span>
              <el-input v-model="form.salary[1]" style="width: 26%"/>
              <span class="text-gray-500"> / 月</span>
            </el-col>
            <el-col :span="6" style="margin-bottom: 10px"></el-col>
            <el-col :span="6" style="margin-bottom: 10px">
              <label style="width:65px;margin-right: 5px">需求人数 :</label>
              <el-input v-model="form.requireCount" style="width: 30%"/>
            </el-col>
            <el-col :span="8" style="margin-bottom: 10px">
              <label style="width:100px;margin-right: 5px">目前申请人数 :</label>
              <span>{{ form.requireCount }}</span>
            </el-col>
            <el-col :span="8" style="margin-bottom: 10px">
              <label style="width:65px;margin-right: 5px">是否发布 :</label>
              <el-radio-group v-model="form.state">
                <el-radio :label=true>是</el-radio>
                <el-radio :label=false>否</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
          <el-form-item style="width: 100%">
            <el-col :span="23" style="margin-bottom: 10px">
              <label style="width:65px;margin-right: 5px">应聘条件 :</label>
              <el-input
                  v-model="form.applicationConditions"
                  :autosize="{ minRows: 4, maxRows: 8}"
                  type="textarea"
                  placeholder="Please input"
              />
            </el-col>

          </el-form-item>

          <el-form-item style="width: 98%">
            <el-col :span="23" style="display: flex; flex-wrap: wrap; justify-content: center;">
              <el-button @click="toggleDialog">取消</el-button>
              <el-button type="primary" @click="submit">提交</el-button>
            </el-col>
          </el-form-item>
        </el-form>
        <!--编辑表单 end-->

      </el-dialog>
    </div>
    <!--修改组件 end-->
  </div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue'
import {postJsonRequest, postRequest} from "@/api";
import dayjs from "dayjs";

interface job {
  announcerId: number,
  education: string,
  firmId: number,
  nature: string,
  technologyStack: string[],
  workExperience: string,
  number: string,
  position: string,
  salary: number[],
  address: string,
  applicationConditions: string,
  requireCount: number,
  applicantCount: number,
  updateTime: Date,
  createTime: Date,
  state: boolean

}


const currentPage = ref(1)  //当前页
const pageSize = ref(7) //每页显示条目个数
const background = ref(true)  //打开背景色
const disabled = ref(false) //分页是否禁用
const totalSize = 100;  // 总条目数
const pagerCount = 5  //显示按钮个数
const handleSizeChange = (val: number) => {
  console.log(`${val}`, ' items per page')
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

const dialogVisible = ref(false)  //对话框默认不显示
// const id = store.state.user.profile.id  //获取id
let form = reactive<job>({
  announcerId: 0,
  education: "",
  firmId: 0,
  nature: "",
  technologyStack: [''],
  workExperience: "",
  number: '',
  position: '',
  salary: [],
  address: '',
  applicationConditions: ' ',
  requireCount: 0,
  applicantCount: 0,
  updateTime: new Date(),
  createTime: new Date(),
  state: true
})  //临时表单
const search = ref('')
let tableData: job[] = reactive([])
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

/*修改组件显示方法*/
function toggleDialog() {
  dialogVisible.value = !dialogVisible.value;
}

// 提交
async function submit() {
  form.salary = JSON.stringify(form.salary)
  const result = await postJsonRequest(URL.value, form);
  const arr = result.result;
  //转换为前端数据
  ConvertToFrontData(arr)
  //关闭对话框
  toggleDialog()
}


//转换为前端数据
function ConvertToFrontData(arr: any) {
  tableData.length = 0  //响应式数组清空, 必须这样才能清空,否则tableData会失去响应式
  console.log('ConvertToFrontDataArr', arr)
  for (let arrKey in arr) {
    arr[arrKey].salary = JSON.parse(arr[arrKey].salary)
    // value.time.push(tempTime)
  }
  tableData.push(...arr)
}

// 单个编辑
const handleEdit = (index: number, row: { [x: string]: any; }) => {
  toggleDialog()
  for (let rowKey in row) {
    form[rowKey] = row[rowKey]
  }
  URL.value = "/jobList/updateJobList"  //修改路径
}
// 单个删除
const handleDelete = (index: number, row: { number: any; announcerId: number }) => {
  let temp = ref({id: row.announcerId, number: row.number})
  handleDel(temp) //删除操作,获取数据

  console.log('arr', arr)
  ConvertToFrontData(arr) //转换为前端数据
}

// 删除职位信息
async function handleDel(param: {}) {
  const data = await postRequest("/jobList/delJobList", param.value)
  console.log('data.result.result', data.result.result)
  const result = data.result.result //获取数据
  ConvertToFrontData(result)
}

async function InitialTableData() {
  const data = await postJsonRequest("/jobList/getJobList", {});
  const arr = data.result //获取数据
  console.log(arr)
  // tableData.length = 0  //响应式数组清空
  ConvertToFrontData(arr)
}

onMounted(() => {
  InitialTableData()
})

</script>

<style lang="less" scoped>
:deep(.cell) {
  padding: 10px;
}
</style>
