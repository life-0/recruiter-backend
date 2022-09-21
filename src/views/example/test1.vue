<template>
  <div>
    <el-button @click="getPdf()">离线简历展示</el-button>
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
import {
  nextTick,
  onMounted,
  ref,
  watch,
  reactive
} from "vue";
import * as PdfJS from "pdfjs-dist/legacy/build/pdf"; // 引入PDFJS
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import axios from 'axios';
import {postFileDownload, postRequest, multiFilesDownload, multiFilesDownload} from "@/api";
import qs from 'qs';


// 引入workerSrc的地址
PdfJS.GlobalWorkerOptions.workerSrc = pdfjsWorker; //设置PDFJS.GlobalWorkerOptions.workerSrc的地址
let container = ref(null);
let renderContext: any = ref(null);
let pdfUrl = null;
let PDFBlob: any = ref(null); //处理文档流
let readerPdfDoc = null;
const PDFDialogVisible = ref(false)
let promiseArray = reactive([])

function toggle() {
  PDFDialogVisible.value = !PDFDialogVisible.value
}

const dataList: any = reactive([{
  url: "/file/downloadFile",
  data: {
    id: "1",
    fileName: "/firmAvatar/img.png"
  }
}, {
  url: "/file/downloadFile",
  data: {
    id: "2",
    fileName: "/firmAvatar/img_1.png"
  }
}, {
  url: "/file/downloadFile",
  data: {
    id: "3",
    fileName: "/firmAvatar/img_2.png"
  }
}]);

let test = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  responseType: 'arraybuffer',
})
test.defaults.transformRequest = [
  data => {
    // 转换成name=XX&age=XX格式 可对应后端的 @RequestParam
    return qs.stringify(data)
  }
];

async function print(data: any) {
  const response = await multiFilesDownload(data);

  let PDFBlob = new Blob([response]); //处理文档流
  let pdfUrl = window.URL.createObjectURL(PDFBlob)
  return pdfUrl;
  // return new Promise(function(resolve, reject) {
  // 	console.log(i);
  // 	resolve();
  // });
}

async function getPdf() {

  // dataList.forEach((value: any) => {
  // 	axios({
  // 			method: 'post',
  // 			data: qs.stringify(value.data),
  // 			headers: {
  // 				'Content-Type': 'application/x-www-form-urlencoded'
  // 			},
  // 			url: 'http://106.52.71.175:9090' + value.url,
  // 			responseType: 'arraybuffer'
  // 		})
  // 		.then(function(response) {
  // 			console.log("response", response.data);

  // 		});
  // })
  const popularUsersWithPublicRepoCount = await Promise.all(dataList.map(print));
  console.table(popularUsersWithPublicRepoCount);

}

// const data: any = reactive([{
// 	url: "/file/downloadFile",
// 	data: {
// 		id: "1",
// 		fileName: "/firmAvatar/img.png"
// 	}
// }, {
// 	url: "/file/downloadFile",
// 	data: {
// 		id: "2",
// 		fileName: "/firmAvatar/img_1.png"
// 	}
// }, {
// 	url: "/file/downloadFile",
// 	data: {
// 		id: "3",
// 		fileName: "/firmAvatar/img_2.png"
// 	}
// }]);


// data.forEach((value: any) => {
// 	axios({
// 			method: 'post',
// 			data: qs.stringify(value.data),
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			},
// 			url: 'http://106.52.71.175:9090'+value.url,
// 			responseType: 'arraybuffer'
// 		})
// 		.then(function(response) {
// 			console.log("response", response.data);

// 		});
// })
// axios({
// 		method: 'post',
// 		data: qs.stringify(value),
// 		headers: {
// 			'Content-Type': 'application/x-www-form-urlencoded'
// 		},
// 		url: 'http://106.52.71.175:9090/file/downloadFile',
// 		responseType: 'arraybuffer'
// 	})
// 	.then(function(response) {
// 		console.log("response", response.data);
// 		PDFBlob.value = new Blob([response.data]); //处理文档流
// 		pdfUrl = window.URL.createObjectURL(PDFBlob.value)
// 		PdfJS.getDocument(pdfUrl).promise.then((pdfDoc) => {
// 			// pdfPagesNum.value = pdfDoc.numPages * 10; // pdf的总条目数
// 			// console.log('pdfPagesNum.value', pdfPagesNum.value)
// 			//获取第pageNum页的数据
// 			readerPdfDoc = pdfDoc;
// 			console.log('pdfUrl', pdfUrl)
// 			// showPdf(pdfDoc, 1)
// 			// response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
// 		});
// 	});

// 	axios({
// 			method: 'post',
// 			data: qs.stringify({
// 				id: "1",
// 				fileName: "/userPDF/Java开发_卓越.pdf"
// 			}),
// 			headers: {
// 				'Content-Type': 'application/x-www-form-urlencoded'
// 			},
// 			url: 'http://106.52.71.175:9090/file/downloadFile',
// 			responseType: 'arraybuffer'
// 		})
// 		.then(function(response) {
// 			console.log("response", response.data);
// 			PDFBlob.value = new Blob([response.data]); //处理文档流
// 			pdfUrl = window.URL.createObjectURL(PDFBlob.value)
// 			PdfJS.getDocument(pdfUrl).promise.then((pdfDoc) => {
// 				// pdfPagesNum.value = pdfDoc.numPages * 10; // pdf的总条目数
// 				// console.log('pdfPagesNum.value', pdfPagesNum.value)
// 				//获取第pageNum页的数据
// 				readerPdfDoc = pdfDoc;
// 				showPdf(pdfDoc, 1)
// 				// response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
// 			});
// 		});

// 	//展开对话框
// 	toggle()


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
      scale: 1.8
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
  let fileName = "/test1"; // props.data.fileName;
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
// defineExpose({
// 	openOfflineResumeDialog() {
// 		getPdf()
// 	}
// })
onMounted(() => {
  getPdf()

})
</script>

<style>
</style>
