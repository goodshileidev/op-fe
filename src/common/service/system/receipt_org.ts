import {requestSearchReceiptOrg,requestCreateReceiptOrg,requestUpdateReceiptOrg,requestDeleteReceiptOrg,requestGetReceiptOrg,requestListReceiptOrg} from "@/common/api/system/receipt_org";
import {ReceiptOrgType} from "@/common/data_type/system/receipt_org";

/**
 *  报送文件接收单位-查询数据
 */
export const searchReceiptOrg = (data: ReceiptOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchReceiptOrg->param-converted", params)
  return requestSearchReceiptOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchReceiptOrg->detail-converted", data)
    return response
  });
}

/**
 *  报送文件接收单位-新建数据
 */
export const createReceiptOrg = (data: ReceiptOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createReceiptOrg->param-converted", params)
  return requestCreateReceiptOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("createReceiptOrg->detail-converted", data)
    return response
  });
}

/**
 *  报送文件接收单位-更新数据
 */
export const updateReceiptOrg = (data: ReceiptOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateReceiptOrg->param-converted", params)
  return requestUpdateReceiptOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("updateReceiptOrg->detail-converted", data)
    return response
  });
}

/**
 *  报送文件接收单位-削除数据
 */
export const deleteReceiptOrg = (data: ReceiptOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteReceiptOrg->param-converted", params)
  return requestDeleteReceiptOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteReceiptOrg->detail-converted", data)
    return response
  });
}

/**
 *  报送文件接收单位-取得数据
 */
export const getReceiptOrg = (receiptOrgId: string) => {
  return requestGetReceiptOrg(receiptOrgId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getReceiptOrg->detail-converted", data)
    return response
  });
}

/**
 *  报送文件接收单位-查询数据列表
 */
export const listReceiptOrg = (data: ReceiptOrgType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("listReceiptOrg->param-converted", params)
  return requestListReceiptOrg(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("listReceiptOrg->detail-converted", data)
    return response
  });
}
