// 导出页面为PDF格式
import html2Canvas from 'html2canvas';
import jsPDF from "jspdf";
// 下载pdf文件 分页
export function getPdf(htmlTitle) {
    const title = htmlTitle;
    // @ts-ignore
    html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true,
        useCORS: true
    }).then(function (canvas) {
        let contentWidth = canvas.width;
        let contentHeight = canvas.height;
        let pageHeight = contentWidth / 592.28 * 841.89;
        let leftHeight = contentHeight;
        let position = 0;
        let imgWidth = 595.28;
        let imgHeight = 580.28 / contentWidth * contentHeight;
        let pageData = canvas.toDataURL('image/jpeg', 1.0);
        // @ts-ignore
        let PDF = new jsPDF('', 'pt', 'a4');
        if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
        }
        else {
            while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                leftHeight -= pageHeight;
                position -= 841.89;
                if (leftHeight > 0) {
                    PDF.addPage();
                }
            }
        }
        PDF.save(title + '.pdf');
    });
}
//# sourceMappingURL=htmlToPdf.js.map