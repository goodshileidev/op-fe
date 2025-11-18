import {
  requestSearchMonthlySecurityCheck,
  requestCreateMonthlySecurityCheck,
  requestUpdateMonthlySecurityCheck,
  requestDeleteMonthlySecurityCheck,
  requestGetMonthlySecurityCheck
} from "@/common/api/operation/monthly_security_check";
import {MonthlySecurityCheckType} from "@/common/data_type/operation/monthly_security_check";

/**
 *  月度安全检查-查询数据
 */
export const searchMonthlySecurityCheck = (data: MonthlySecurityCheckType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchMonthlySecurityCheck->param-converted", params)
  return requestSearchMonthlySecurityCheck(params).then((response) => {
    let data = response.data
    if (data) {
      data = data.list
      for (let idx = 0; idx < data.length; idx++) {
        let row = data[idx]
      }

    }
    console.debug("searchMonthlySecurityCheck->detail-converted", data)
    return response
  });
}

/**
 *  月度安全检查-新建数据
 */
export const createMonthlySecurityCheck = (data: MonthlySecurityCheckType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createMonthlySecurityCheck->param-converted", params)
  return requestCreateMonthlySecurityCheck(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("createMonthlySecurityCheck->detail-converted", data)
    return response
  });
}

/**
 *  月度安全检查-更新数据
 */
export const updateMonthlySecurityCheck = (data: MonthlySecurityCheckType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateMonthlySecurityCheck->param-converted", params)
  return requestUpdateMonthlySecurityCheck(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("updateMonthlySecurityCheck->detail-converted", data)
    return response
  });
}

/**
 *  月度安全检查-削除数据
 */
export const deleteMonthlySecurityCheck = (data: MonthlySecurityCheckType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteMonthlySecurityCheck->param-converted", params)
  return requestDeleteMonthlySecurityCheck(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteMonthlySecurityCheck->detail-converted", data)
    return response
  });
}

/**
 *  月度安全检查-取得数据
 */
export const getMonthlySecurityCheck = (monthlySecurityCheckId: string) => {
  return requestGetMonthlySecurityCheck(monthlySecurityCheckId).then((response) => {
    const data = response.data
    if (response.code === 200 && data) {

    }
    console.debug("getMonthlySecurityCheck->detail-converted", data)
    return response
  });
}
