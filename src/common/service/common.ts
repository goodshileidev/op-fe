import {requestCreatePdf, requestCreatePdfs} from "@/common/api/common";

/**
 *  表单-查询数据
 */
export const createPdf = (data: Record<string, string | number | any | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("createPdf->", params)
  return requestCreatePdf(params).then((response) => {
    let data = response.data
    return data;
  })
}

/**
 *  表单-查询数据
 */
export const createPdfs = (data: Record<string, string | number | null | any | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  console.debug("createPdfs->", params)
  return requestCreatePdfs(params).then((response) => {
    let data = response.data
    console.debug("创建PDF成功", data)
    return data;
  })
}

export const downloadUrl = (url: string, fileName: string) => {
  // 非IE下载
  const elink = document.createElement('a')
  elink.href = url
  elink.target = "_blank"
  console.debug("开始下载文件->url", url, elink.href)
  elink.download = fileName
  elink.style.display = 'none'
  elink.target = "_blank";
  elink.click()
  setTimeout(() => {
    try {
      document.body.removeChild(elink)
    } catch (e) {
      console.debug("删除下载用Link失败", e)
    }
  }, 3000);

}
