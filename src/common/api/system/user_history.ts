import request from "@/common/axios";

/**
 *  用户变更记录-查询数据
 */
export const requestSearchUserHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userHistory/search',
    method: 'post',
    data: body
  })
}

/**
 *  用户变更记录-新建数据
 */
export const requestCreateUserHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userHistory/create',
    method: 'post',
    data: body
  })
}

/**
 *  用户变更记录-更新数据
 */
export const requestUpdateUserHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userHistory/update',
    method: 'post',
    data: body
  })
}

/**
 *  用户变更记录-削除数据
 */
export const requestDeleteUserHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userHistory/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  用户变更记录-取得数据
 */
export const requestGetUserHistory = (UserHistoryId: string) => {
  return request({
    url: '/system/userHistory/get/' + UserHistoryId,
    method: 'get',
  })
}
