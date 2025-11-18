import request from "@/common/axios";

/**
 *  船舶作业一体化表单-查询数据
 */
export const requestSearchShipOperationDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/search',
    method: 'post',
    data: body
  })
}

/**
 *  船舶作业一体化表单-新建数据
 */
export const requestCreateShipOperationDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/create',
    method: 'post',
    data: body
  })
}

/**
 *  船舶作业一体化表单-更新数据
 */
export const requestUpdateShipOperationDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/update',
    method: 'post',
    data: body
  })
}

/**
 *  船舶作业一体化表单-削除数据
 */
export const requestDeleteShipOperationDocument = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/document/delete',
    method: 'post',
    data: body
  })
}

/**
 *  船舶作业一体化表单-取得数据
 */
export const requestGetShipOperationDocument = (shipOperationDocumentId: string) => {
  return request({
    url: '/form/document/get/' + shipOperationDocumentId,
    method: 'get',
  })
}
