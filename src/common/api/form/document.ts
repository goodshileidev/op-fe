import request from "@/common/axios";

/**
 *  一体化表单-查询数据
 */
export const requestSearchDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/search',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单-新建数据
 */
export const requestCreateDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/create',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单-更新数据
 */
export const requestUpdateDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/update',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单-削除数据
 */
export const requestDeleteDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/delete',
    method: 'post',
    data: body
  })
}

/**
 *  一体化表单-取得数据
 */
export const requestGetDocument = (DocumentId: string) => {
  return request({
    url: '/form/document/get/' + DocumentId,
    method: 'get',
  })
}
