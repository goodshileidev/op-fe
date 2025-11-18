import request from "@/common/axios";

/**
 *  用户表-查询数据
 */
export const requestSearchUser = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/user/search',
    method: 'post',
    data: body
  })
}

/**
 *  用户表-新建数据
 */
export const requestCreateUser = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/user/create',
    method: 'post',
    data: body
  })
}

/**
 *  用户表-更新数据
 */
export const requestUpdateUser = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/user/update',
    method: 'post',
    data: body
  })
}

/**
 *  用户表-削除数据
 */
export const requestDeleteUser = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/user/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  用户表-取得数据
 */
export const requestGetUser = (UserId: string) => {
  return request({
    url: '/system/user/get/' + UserId,
    method: 'get',
  })
}


/**
 *  用户表-取得数据
 */
export const requestGetCurrentUser = () => {
  return request({
    url: '/system/user/getByAccount',
    method: 'get',
  })
}
