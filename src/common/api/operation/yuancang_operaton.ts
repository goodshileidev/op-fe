import request from "@/common/axios";

/**
 *  圆仓作业表单-查询数据
 */
export const requestSearchYuancangOperaton = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/search',
    method: 'post',
    data: body
  })
}

/**
 *  圆仓作业表单-新建数据
 */
export const requestCreateYuancangOperaton = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/create',
    method: 'post',
    data: body
  })
}

/**
 *  圆仓作业表单-更新数据
 */
export const requestUpdateYuancangOperaton = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/update',
    method: 'post',
    data: body
  })
}

/**
 *  圆仓作业表单-削除数据
 */
export const requestDeleteYuancangOperaton = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/delete',
    method: 'post',
    data: body
  })
}

/**
 *  圆仓作业表单-取得数据
 */
export const requestGetYuancangOperaton = (yuancangOperatonId: string) => {
  return request({
    url: '/form/document/get/' + yuancangOperatonId,
    method: 'get',
  })
}
