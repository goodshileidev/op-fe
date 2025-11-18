import request from "@/common/axios";

/**
 *  表单区块-查询数据
 */
export const requestSearchFormSection = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formSection/search',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块-新建数据
 */
export const requestCreateFormSection = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formSection/create',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块-更新数据
 */
export const requestUpdateFormSection = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formSection/update',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块-削除数据
 */
export const requestDeleteFormSection = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formSection/delete',
    method: 'post',
    data: body
  })
}

/**
 *  表单区块-取得数据
 */
export const requestGetFormSection = (FormSectionId: string) => {
  return request({
    url: '/form/formSection/get/' + FormSectionId,
    method: 'get',
  })
}

/**
 *  表单区块-查询数据列表
 */
export const requestListFormSection = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/form/formSection/list',
    method: 'post',
    data: body
  })
}
