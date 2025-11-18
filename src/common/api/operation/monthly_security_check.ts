import request from "@/common/axios";

/**
 *  月度安全检查-查询数据
 */
export const requestSearchMonthlySecurityCheck = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/form/search',
    method: 'post',
    data: body
  })
}

/**
 *  月度安全检查-新建数据
 */
export const requestCreateMonthlySecurityCheck = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/create',
    method: 'post',
    data: body
  })
}

/**
 *  月度安全检查-更新数据
 */
export const requestUpdateMonthlySecurityCheck = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/update',
    method: 'post',
    data: body
  })
}

/**
 *  月度安全检查-削除数据
 */
export const requestDeleteMonthlySecurityCheck = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/delete',
    method: 'post',
    data: body
  })
}

/**
 *  月度安全检查-取得数据
 */
export const requestGetMonthlySecurityCheck = (monthlySecurityCheckId: string) => {
  return request({
    url: '/form/form/get/' + monthlySecurityCheckId,
    method: 'get',
  })
}
