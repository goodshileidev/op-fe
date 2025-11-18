import {FormType} from "@/common/data_type/form/form";
import {createPdf} from "@/common/service/common";
import {message} from "antd";

export function getVarValueMap(formData: FormType) {
  const varValueList = (formData).varValueList// JSON.parse(data.varValueList)
  const updateTime = formData.updateTime
  let createdPdfTime = null;
  let pdfUrl = null;
  let uploadedFileList = null;
  for (const varValue of varValueList) {
    if (varValue) {
      if (varValue.varName === "uploadFileList") {
        uploadedFileList = varValue.value
        console.debug("uploadedFileList", varValue.value)
      } else if (varValue.varName === "createdPdfTime") {
        createdPdfTime = varValue.value
      } else if (varValue.varName === "pdfUrl") {
        pdfUrl = (varValue.value)
      }
    }
  }
  console.debug("setFileListByData", varValueList)
  console.debug("createdPdfTime", createdPdfTime)
  console.debug("updateTime", updateTime)
  console.debug("pdfUrl", pdfUrl)
  return {updateTime, createdPdfTime, pdfUrl, uploadedFileList};
}


export function getFormGroupName(varConfigs) {
  let formGroupName = ""
  for (let j = 0; j < varConfigs.length; j++) {
    let varConfig = varConfigs[j];
    if (varConfig.varName === '表单分组') {
      formGroupName = varConfig.varDefaultValue;
      break;
    }
  }
  return formGroupName;
}


export function doCreatePdf(formData: FormType, showLoading: boolean, autoDownload: boolean, onStartCallback: any, onFinishCallback: any, onFailCallback: any, forceGenerate: false) {
  onStartCallback && onStartCallback(formData, showLoading)
  console.info("开始打印表单:" + formData?.formName)
  const params = {
    formId: formData.formId,
    pageName: formData?.formName,
    forceGenerate: forceGenerate,
    url: location.protocol + "//" + location.host + location.pathname + "/#/printForm/" + formData.formId
  }
  console.debug("onCreatePdf", params)
  return createPdf(params).then((url) => {
    if (url && url.indexOf("http") === -1) {
      message.error("创建PDF文件失败")
      return
    }
    console.info("创建PDF成功" + formData?.formName)
    formData.pdfUrl = url
    onFinishCallback && onFinishCallback(formData, url, autoDownload)
    return formData
  }).catch((e) => {
    console.error("创建PDF失败: " + formData?.formName, e)
    onFailCallback && onFailCallback(formData)
    return formData
  })
}
