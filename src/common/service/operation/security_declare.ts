import {requestSearchSecurityDeclare,requestCreateSecurityDeclare,requestUpdateSecurityDeclare,requestDeleteSecurityDeclare,requestGetSecurityDeclare} from "@/common/api/operation/security_declare";
import {SecurityDeclareType} from "@/common/data_type/operation/security_declare";

/**
 *  保安声明表单-查询数据
 */
export const searchSecurityDeclare = (data: SecurityDeclareType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchSecurityDeclare->param-converted", params)
  return requestSearchSecurityDeclare(params).then((response) => {
    let data = response.data
    if (data) {
data = data.list
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
}

    }
    console.debug("searchSecurityDeclare->detail-converted", data)
    return response
  });
}

/**
 *  保安声明表单-新建数据
 */
export const createSecurityDeclare = (data: SecurityDeclareType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createSecurityDeclare->param-converted", params)
  return requestCreateSecurityDeclare(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("createSecurityDeclare->detail-converted", data)
    return response
  });
}

/**
 *  保安声明表单-更新数据
 */
export const updateSecurityDeclare = (data: SecurityDeclareType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateSecurityDeclare->param-converted", params)
  return requestUpdateSecurityDeclare(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("updateSecurityDeclare->detail-converted", data)
    return response
  });
}

/**
 *  保安声明表单-削除数据
 */
export const deleteSecurityDeclare = (data: SecurityDeclareType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteSecurityDeclare->param-converted", params)
  return requestDeleteSecurityDeclare(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteSecurityDeclare->detail-converted", data)
    return response
  });
}

/**
 *  保安声明表单-取得数据
 */
export const getSecurityDeclare = (securityDeclareId: string) => {
  return requestGetSecurityDeclare(securityDeclareId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getSecurityDeclare->detail-converted", data)
    return response
  });
}
