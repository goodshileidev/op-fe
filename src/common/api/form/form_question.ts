import request from "@/common/axios";

/**
 *  表单问题-查询数据
 */
export const requestSearchFormQuestion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formQuestion/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题-新建数据
 */
export const requestCreateFormQuestion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formQuestion/create',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题-更新数据
 */
export const requestUpdateFormQuestion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formQuestion/update',
    method: 'post',
    data: body
  })
}


/**
 *  表单问题-削除数据
 */
export const requestDeleteFormQuestion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formQuestion/delete',
    method: 'post',
    data: body
  })
}


/**
 *  表单问题-更新表单问题变量
 */
export const requestUpdateFormQuestionVar = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formQuestion/update',
    method: 'post',
    contentType: "application/json;charset-utf-8",
    data: body
  })
}

export const requestUploadFile = (body: any) => {
  return request({
    url: '/file/upload/',
    method: 'post',
    data: body
  })
}

/**
 *  表单问题-取得数据
 */
export const requestGetFormQuestion = (FormQuestionId: string) => {
  return request({
    url: '/form/formQuestion/get/' + FormQuestionId,
    method: 'get',
  })
}

/**
 *  表单问题-查询数据列表
 */
export const requestListFormQuestion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formQuestion/list',
    method: 'post',
    data: body
  })
}
