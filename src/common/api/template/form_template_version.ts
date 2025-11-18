import request from "@/common/axios";

/**
 *  表单模版版本-查询数据
 */
export const requestSearchFormTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplateVersion/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版版本-新建数据
 */
export const requestCreateFormTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplateVersion/create',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版版本-更新数据
 */
export const requestUpdateFormTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplateVersion/update',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版版本-削除数据
 */
export const requestDeleteFormTemplateVersion = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/template/formTemplateVersion/delete',
    method: 'post',
    data: body
  })
}

/**
 *  表单模版版本-取得数据
 */
export const requestGetFormTemplateVersion = (FormTemplateVersionId: string) => {
  return request({
    url: '/template/formTemplateVersion/get/' + FormTemplateVersionId,
    method: 'get',
  })
}
