<!--suppress TypeScriptUnresolvedVariable -->
<template>
  <div>
    <!--    <el-button @click="getPdf">离线简历展示</el-button>-->
    <!-- 评估组件-->
    <el-dialog v-model="PDFDialogVisible" title="附件简历展示" width="60%" center>
      <el-row style="width: 100%">
        <canvas ref="renderContext"></canvas>
      </el-row>
      <template #footer>
				<span class="dialog-footer">
					<el-button @click="PDFDialogVisible = false">关闭</el-button>
					<el-button type="primary" @click="exportPDF">导出</el-button>
				</span>
      </template>
    </el-dialog>
    <!--评估组件 end-->
  </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, ref, watch} from "vue";
import * as PdfJS from "pdfjs-dist/legacy/build/pdf"; // 引入PDFJS
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import {
  postFileDownload,
  postRequest
} from "@/api";

//子组件获得上层父组件值
const props = defineProps({ //获取传参的数据
  data: {
    type: Object,
    default: {
      fileName: "",
      id: "",
      openDialog: false,
    }
  }
})
// 引入workerSrc的地址
PdfJS.GlobalWorkerOptions.workerSrc = pdfjsWorker; //设置PDFJS.GlobalWorkerOptions.workerSrc的地址
let container = ref(null);
let renderContext: any = ref(null);
let pdfUrl = null;
let PDFBlob: any = ref(null); //处理文档流
let readerPdfDoc = null;
const PDFDialogVisible = ref(false)

function toggle() {
  PDFDialogVisible.value = !PDFDialogVisible.value
}

function getPdf() {
  if (props.data.fileName != null && props.data.id !== 0) {
    postFileDownload('/file/downloadFile', {
      fileName: props.data.fileName,
      id: props.data.id,
      path: "/userPDF/"
    }).then((response: BlobPart) => {
      console.log("response", response)
      // const blob = new Blob([response]);//处理文档流
      PDFBlob.value = new Blob([response]); //处理文档流
      pdfUrl = window.URL.createObjectURL(PDFBlob.value)
      // getPdf(pdfUrl, 1)
      PdfJS.getDocument(pdfUrl).promise.then((pdfDoc) => {
        // pdfPagesNum.value = pdfDoc.numPages * 10; // pdf的总条目数
        // console.log('pdfPagesNum.value', pdfPagesNum.value)
        //获取第pageNum页的数据
        readerPdfDoc = pdfDoc;
        showPdf(pdfDoc, 1)
      });
    }).catch((err: { response: any; }) => {
      //请求失败
      let {response} = err
      let resJson = response.json()
      console.log("err", err)
      console.log("response", response)
      console.log("response.json()", resJson)
    })
    //展开对话框
    toggle()
  }
}

//展示PDF
function showPdf(pdfDoc: any, pageNum: number) {
  pdfDoc.getPage(pageNum).then((page: {
    getViewport: (arg0: {
      scale: number;
    }) => any; render: (arg0: {
      canvasContext: any; viewport: any;
    }) => void;
  }) => {
    // 设置canvas相关的属性
    const canvas = renderContext.value;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const bsr =
        ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio ||
        1;
    const ratio = dpr / bsr;
    const viewport = page.getViewport({
      scale: 1.2
    });
    canvas.width = viewport.width * ratio;
    canvas.height = viewport.height * ratio;
    canvas.style.width = viewport.width + "px";
    canvas.style.height = viewport.height + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const context = {
      canvasContext: ctx,
      viewport: viewport,
    };
    // 数据渲染到canvas画布上
    page.render(context);
  });
}

//导出PDF
function exportPDF() {
  let fileName = props.data.fileName;
  fileName = fileName.slice(fileName.lastIndexOf('/') + 1) //获取文件名
  const elink = document.createElement('a');
  elink.download = fileName;
  elink.style.display = 'none';
  // elink.href = URL.createObjectURL(blob);
  elink.href = URL.createObjectURL(PDFBlob.value);
  document.body.appendChild(elink);
  elink.click();
  URL.revokeObjectURL(elink.href); // 释放URL 对象
  document.body.removeChild(elink);
}

//向父组件传递子组件的值和方法
defineExpose({
  openOfflineResumeDialog() {
    getPdf()
  }
})
onMounted(() => {
  // getPdf()
  console.log(props.data)
})
</script>
<style lang="less">
</style>
