import request from "@/common/axios";

/**
 *  一体化表单模版-查询数据
 */
export const requestSearchDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/search',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版-新建数据
 */
export const requestCreateDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/create',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版-更新数据
 */
export const requestUpdateDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/update',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版-削除数据
 */
export const requestDeleteDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版-取得数据
 */
export const requestGetDocumentTemplate = (documentTemplateId: string) => {
  return request({
    url: '/template/documentTemplate/get/' + documentTemplateId,
    method: 'get',
  })
}

/**
 *  一体化表单模版-查询数据列表
 */
export const requestListDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/list',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版-发布
 */
export const requestPublishDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/publish',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单模版-取消发布
 */
export const requestCancelPublishDocumentTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplate/cancelPublish',
    method: 'post',
    data: body
  })
}
