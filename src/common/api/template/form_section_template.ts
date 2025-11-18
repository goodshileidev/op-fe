import request from "@/common/axios";

/**
 *  表单区块模版-查询数据
 */
export const requestSearchFormSectionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formSectionTemplate/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块模版-新建数据
 */
export const requestCreateFormSectionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formSectionTemplate/create',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块模版-更新数据
 */
export const requestUpdateFormSectionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formSectionTemplate/update',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块模版-削除数据
 */
export const requestDeleteFormSectionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formSectionTemplate/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块模版-取得数据
 */
export const requestGetFormSectionTemplate = (FormSectionTemplateId: string) => {
  return request({
    url: '/template/formSectionTemplate/get/' + FormSectionTemplateId,
    method: 'get',
  })
}

/**
 *  表单区块模版-查询数据列表
 */
export const requestListFormSectionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formSectionTemplate/list',
    method: 'post',
    data: body
  })
}



/**
 *  表单区块模版-查询数据列表
 */
export const requestChangeOrderFormSectionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formSectionTemplate/changeOrder',
    method: 'post',
    data: body
  })
}
