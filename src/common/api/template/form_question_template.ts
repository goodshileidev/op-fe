import request from "@/common/axios";

/**
 *  表单问题模版-查询数据
 */
export const requestSearchFormQuestionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formQuestionTemplate/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题模版-新建数据
 */
export const requestCreateFormQuestionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formQuestionTemplate/create',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题模版-更新数据
 */
export const requestUpdateFormQuestionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formQuestionTemplate/update',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题模版-削除数据
 */
export const requestDeleteFormQuestionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formQuestionTemplate/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题模版-取得数据
 */
export const requestGetFormQuestionTemplate = (FormQuestionTemplateId: string) => {
  return request({
    url: '/template/formQuestionTemplate/get/' + FormQuestionTemplateId + "?t=" + Math.random(),
    method: 'get',
  })
}

export const requestGetVarConfigList = (FormQuestionTemplateId: string) => {
  return request({
    url: '/template/formQuestionTemplate/get-var-config-list/' + FormQuestionTemplateId + "?t=" + Math.random(),
    method: 'get',
  })
}

/**
 *  表单问题模版-查询数据列表
 */
export const requestListFormQuestionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formQuestionTemplate/list',
    method: 'post',
    data: body
  })
}


/**
 *  表单问题模版-查询数据列表
 */
export const requestChangeOrderFormQuestionTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formQuestionTemplate/changeOrder',
    method: 'post',
    data: body
  })
}
