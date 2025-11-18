import request from "@/common/axios";

/**
 *  表单模版-查询数据
 */
export const requestSearchFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版-新建数据
 */
export const requestCreateFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/create',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版-更新数据
 */
export const requestUpdateFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/update',
    method: 'post',
    data: body
  })
}


/**
 *  表单模版-更新数据
 */
export const requestCopyFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/copy',
    method: 'post',
    data: body
  })
}


/**
 *  表单模版-削除数据
 */
export const requestDeleteFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版-取得数据
 */
export const requestGetFormTemplate = (formTemplateId: string) => {
  return request({
    url: '/template/formTemplate/get/' + formTemplateId,
    method: 'get',
  })
}

/**
 *  表单模版-查询数据列表
 */
export const requestListFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/list',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版-发布
 */
export const requestPublishFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/publish',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版-取消发布
 */
export const requestCancelPublishFormTemplate = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplate/cancelPublish',
    method: 'post',
    data: body
  })
}
