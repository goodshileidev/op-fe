import request from "@/common/axios";

/**
 *  内部单位-查询数据
 */
export const requestSearchInternalOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/internalOrg/search',
    method: 'post',
    data: body
  })
}

/**
 *  内部单位-新建数据
 */
export const requestCreateInternalOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/internalOrg/create',
    method: 'post',
    data: body
  })
}

/**
 *  内部单位-更新数据
 */
export const requestUpdateInternalOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/internalOrg/update',
    method: 'post',
    data: body
  })
}

/**
 *  内部单位-削除数据
 */
export const requestDeleteInternalOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/internalOrg/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  内部单位-取得数据
 */
export const requestGetInternalOrg = (InternalOrgId: string) => {
  return request({
    url: '/system/internalOrg/get/' + InternalOrgId,
    method: 'get',
  })
}

/**
 *  内部单位-查询数据列表
 */
export const requestListInternalOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/internalOrg/list',
    method: 'post',
    data: body
  })
}
