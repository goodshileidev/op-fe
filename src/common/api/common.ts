import request from "@/common/axios";

/**
 *  表单-查询数据
 */
export const requestCreatePdf = (body: Record<string, string | number | any | null | undefined>) => {
  return request({
    url: '/print/createPdf',
    method: 'post',
    data: body
  })
}

/**
 *  表单-查询数据
 */
export const requestCreatePdfs = (body: Record<string, string | number | any | null | undefined>) => {
  return request({
    url: '/print/createPdfs',
    method: 'post',
    data: body
  })
}
