import {requestSearchInternalOrg,requestCreateInternalOrg,requestUpdateInternalOrg,requestDeleteInternalOrg,requestGetInternalOrg,requestListInternalOrg} from "@/common/api/system/internal_org";
import {InternalOrgType} from "@/common/data_type/system/internal_org";

/**
 *  内部单位-查询数据
 */
export const searchInternalOrg = (data: InternalOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchInternalOrg->param-converted", params)
  return requestSearchInternalOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchInternalOrg->detail-converted", data)
    return response
  });
}

/**
 *  内部单位-新建数据
 */
export const createInternalOrg = (data: InternalOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createInternalOrg->param-converted", params)
  return requestCreateInternalOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("createInternalOrg->detail-converted", data)
    return response
  });
}

/**
 *  内部单位-更新数据
 */
export const updateInternalOrg = (data: InternalOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateInternalOrg->param-converted", params)
  return requestUpdateInternalOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("updateInternalOrg->detail-converted", data)
    return response
  });
}

/**
 *  内部单位-削除数据
 */
export const deleteInternalOrg = (data: InternalOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteInternalOrg->param-converted", params)
  return requestDeleteInternalOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteInternalOrg->detail-converted", data)
    return response
  });
}

/**
 *  内部单位-取得数据
 */
export const getInternalOrg = (internalOrgId: string) => {
  return requestGetInternalOrg(internalOrgId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getInternalOrg->detail-converted", data)
    return response
  });
}

/**
 *  内部单位-查询数据列表
 */
export const listInternalOrg = (data: InternalOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listInternalOrg->param-converted", params)
  return requestListInternalOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("listInternalOrg->detail-converted", data)
    return response
  });
}
