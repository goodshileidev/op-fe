import request from "@/common/axios";

/**
 *  用户菜单-查询数据
 */
export const requestSearchUserMenu = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userMenu/search',
    method: 'post',
    data: body
  })
}

/**
 *  用户菜单-新建数据
 */
export const requestCreateUserMenu = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userMenu/create',
    method: 'post',
    data: body
  })
}

/**
 *  用户菜单-更新数据
 */
export const requestUpdateUserMenu = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userMenu/update',
    method: 'post',
    data: body
  })
}

/**
 *  用户菜单-削除数据
 */
export const requestDeleteUserMenu = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/userMenu/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  用户菜单-取得数据
 */
export const requestGetUserMenu = (userMenuId: string) => {
  return request({
    url: '/system/userMenu/get/' + userMenuId,
    method: 'get',
  })
}
