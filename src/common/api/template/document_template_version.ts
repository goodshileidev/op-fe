import request from "@/common/axios";

/**
 *  一体化表单模版版本-查询数据
 */
export const requestSearchDocumentTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateVersion/search',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版版本-新建数据
 */
export const requestCreateDocumentTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateVersion/create',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版版本-更新数据
 */
export const requestUpdateDocumentTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateVersion/update',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版版本-削除数据
 */
export const requestDeleteDocumentTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateVersion/delete',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版版本-取得数据
 */
export const requestGetDocumentTemplateVersion = (DocumentTemplateVersionId: string) => {
  return request({
    url: '/template/documentTemplateVersion/get/' + DocumentTemplateVersionId,
    method: 'get',
  })
}
