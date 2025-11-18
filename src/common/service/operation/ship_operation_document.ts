import {requestSearchShipOperationDocument,requestCreateShipOperationDocument,requestUpdateShipOperationDocument,requestDeleteShipOperationDocument,requestGetShipOperationDocument} from "@/common/api/operation/ship_operation_document";
import {ShipOperationDocumentType} from "@/common/data_type/operation/ship_operation_document";

/**
 *  船舶作业一体化表单-查询数据
 */
export const searchShipOperationDocument = (data: ShipOperationDocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchShipOperationDocument->param-converted", params)
  return requestSearchShipOperationDocument(params).then((response) => {
    let data = response.data
    if (data) {
data = data.list // search方法
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
}

    }
    console.debug("searchShipOperationDocument->detail-converted", data)
    return response
  });
}

/**
 *  船舶作业一体化表单-新建数据
 */
export const createShipOperationDocument = (data: ShipOperationDocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createShipOperationDocument->param-converted", params)
  return requestCreateShipOperationDocument(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("createShipOperationDocument->detail-converted", data)
    return response
  });
}

/**
 *  船舶作业一体化表单-更新数据
 */
export const updateShipOperationDocument = (data: ShipOperationDocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateShipOperationDocument->param-converted", params)
  return requestUpdateShipOperationDocument(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("updateShipOperationDocument->detail-converted", data)
    return response
  });
}

/**
 *  船舶作业一体化表单-削除数据
 */
export const deleteShipOperationDocument = (data: ShipOperationDocumentType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteShipOperationDocument->param-converted", params)
  return requestDeleteShipOperationDocument(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteShipOperationDocument->detail-converted", data)
    return response
  });
}

/**
 *  船舶作业一体化表单-取得数据
 */
export const getShipOperationDocument = (shipOperationDocumentId: string) => {
  return requestGetShipOperationDocument(shipOperationDocumentId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getShipOperationDocument->detail-converted", data)
    return response
  });
}
