import request from "@/common/axios";

/**
 *  一体化表单创建规则-查询数据
 */
export const requestSearchDocumentTemplateRule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateRule/search',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单创建规则-新建数据
 */
export const requestCreateDocumentTemplateRule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateRule/create',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单创建规则-更新数据
 */
export const requestUpdateDocumentTemplateRule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateRule/update',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单创建规则-削除数据
 */
export const requestDeleteDocumentTemplateRule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/documentTemplateRule/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单创建规则-取得数据
 */
export const requestGetDocumentTemplateRule = (documentTemplateRuleId: string) => {
  return request({
    url: '/template/documentTemplateRule/get/' + documentTemplateRuleId,
    method: 'get',
  })
}
