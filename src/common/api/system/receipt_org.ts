import request from "@/common/axios";

/**
 *  报送文件接收单位-查询数据
 */
export const requestSearchReceiptOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/receiptOrg/search',
    method: 'post',
    data: body
  })
}

/**
 *  报送文件接收单位-新建数据
 */
export const requestCreateReceiptOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/receiptOrg/create',
    method: 'post',
    data: body
  })
}

/**
 *  报送文件接收单位-更新数据
 */
export const requestUpdateReceiptOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/receiptOrg/update',
    method: 'post',
    data: body
  })
}

/**
 *  报送文件接收单位-削除数据
 */
export const requestDeleteReceiptOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/receiptOrg/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  报送文件接收单位-取得数据
 */
export const requestGetReceiptOrg = (ReceiptOrgId: string) => {
  return request({
    url: '/system/receiptOrg/get/' + ReceiptOrgId,
    method: 'get',
  })
}

/**
 *  报送文件接收单位-查询数据列表
 */
export const requestListReceiptOrg = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/receiptOrg/list',
    method: 'post',
    data: body
  })
}
