import {requestSearchUserHistory,requestCreateUserHistory,requestUpdateUserHistory,requestDeleteUserHistory,requestGetUserHistory} from "@/common/api/system/user_history";
import {UserHistoryType} from "@/common/data_type/system/user_history";

/**
 *  用户变更记录-查询数据
 */
export const searchUserHistory = (data: UserHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchUserHistory->param-converted", params)
  return requestSearchUserHistory(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchUserHistory->detail-converted", data)
    return response
  });
}

/**
 *  用户变更记录-新建数据
 */
export const createUserHistory = (data: UserHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createUserHistory->param-converted", params)
  return requestCreateUserHistory(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("createUserHistory->detail-converted", data)
    return response
  });
}

/**
 *  用户变更记录-更新数据
 */
export const updateUserHistory = (data: UserHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateUserHistory->param-converted", params)
  return requestUpdateUserHistory(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("updateUserHistory->detail-converted", data)
    return response
  });
}

/**
 *  用户变更记录-削除数据
 */
export const deleteUserHistory = (data: UserHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteUserHistory->param-converted", params)
  return requestDeleteUserHistory(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteUserHistory->detail-converted", data)
    return response
  });
}

/**
 *  用户变更记录-取得数据
 */
export const getUserHistory = (userHistoryId: string) => {
  return requestGetUserHistory(userHistoryId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getUserHistory->detail-converted", data)
    return response
  });
}
