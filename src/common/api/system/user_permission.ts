import request from "@/common/axios";

/**
 *  用户权限-查询数据
 */
export const requestSearchUserPermission = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userPermission/search',
    method: 'post',
    data: body
  })
}

/**
 *  用户权限-新建数据
 */
export const requestCreateUserPermission = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userPermission/create',
    method: 'post',
    data: body
  })
}

/**
 *  用户权限-更新数据
 */
export const requestUpdateUserPermission = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userPermission/update',
    method: 'post',
    data: body
  })
}

/**
 *  用户权限-削除数据
 */
export const requestDeleteUserPermission = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userPermission/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  用户权限-取得数据
 */
export const requestGetUserPermission = (userPermissionId: string) => {
  return request({
    url: '/system/userPermission/get/' + userPermissionId,
    method: 'get',
  })
}
