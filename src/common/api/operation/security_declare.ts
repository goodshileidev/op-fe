import request from "@/common/axios";

/**
 *  保安声明表单-查询数据
 */
export const requestSearchSecurityDeclare = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/search',
    method: 'post',
    data: body
  })
}

/**
 *  保安声明表单-新建数据
 */
export const requestCreateSecurityDeclare = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/create',
    method: 'post',
    data: body
  })
}

/**
 *  保安声明表单-更新数据
 */
export const requestUpdateSecurityDeclare = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/update',
    method: 'post',
    data: body
  })
}

/**
 *  保安声明表单-削除数据
 */
export const requestDeleteSecurityDeclare = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/delete',
    method: 'post',
    data: body
  })
}

/**
 *  保安声明表单-取得数据
 */
export const requestGetSecurityDeclare = (securityDeclareId: string) => {
  return request({
    url: '/form/form/get/' + securityDeclareId,
    method: 'get',
  })
}
