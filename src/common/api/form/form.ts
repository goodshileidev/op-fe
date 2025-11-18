import request from "@/common/axios";

/**
 *  表单-查询数据
 */
export const requestSearchForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单-新建数据
 */
export const requestCreateForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/create',
    method: 'post',
    data: body
  })
}


/**
 *  表单-验证安全码
 */
export const requestVerifyForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/verify',
    method: 'post',
    data: body
  })
}


/**
 *  表单-验证安全码
 */
export const requestSendEmail = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/sendEmail',
    method: 'post',
    data: body
  })
}


/**
 *  表单-验证安全码
 */
export const requestCreateTestForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/createTest',
    method: 'post',
    data: body
  })
}

/**
 *  表单-更新数据
 */
export const requestUpdateForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/update',
    method: 'post',
    data: body
  })
}

/**
 *  表单-削除数据
 */
export const requestDeleteForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/delete',
    method: 'post',
    data: body
  })
}


/**
 *  表单-削除数据
 */
export const requestDeleteUploadedFile = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/deleteUploadedFile',
    method: 'post',
    data: body
  })
}


/**
 *  表单-取得数据
 */
export const requestGetForm = (FormId: string) => {
  return request({
    url: '/form/form/get/' + FormId,
    method: 'get',
  })
}

/**
 *  表单-取得数据
 */
export const requestGetFormByUUID = (formUuid: string) => {
  return request({
    url: '/form/form/getByPO/',
    method: 'post',
    data: {
      formUuid: formUuid
    }
  })
}

export const requestGetQrCode = (FormId: string) => {
  return request({
    url: '/qr-code/get?formId=' + FormId + "&t=" + Math.random(),
    method: 'get'
  })
}
/**
 *  表单-查询数据列表
 */
export const requestListForm = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/list',
    method: 'post',
    data: body
  })
}
