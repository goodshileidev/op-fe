import {requestSearchUserPermission,requestCreateUserPermission,requestUpdateUserPermission,requestDeleteUserPermission,requestGetUserPermission} from "@/common/api/system/user_permission";
import {UserPermissionType} from "@/common/data_type/system/user_permission";

/**
 *  用户权限-查询数据
 */
export const searchUserPermission = (data: UserPermissionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchUserPermission->param-converted", params)
  return requestSearchUserPermission(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchUserPermission->detail-converted", data)
    return response
  });
}

/**
 *  用户权限-新建数据
 */
export const createUserPermission = (data: UserPermissionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createUserPermission->param-converted", params)
  return requestCreateUserPermission(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("createUserPermission->detail-converted", data)
    return response
  });
}

/**
 *  用户权限-更新数据
 */
export const updateUserPermission = (data: UserPermissionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateUserPermission->param-converted", params)
  return requestUpdateUserPermission(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("updateUserPermission->detail-converted", data)
    return response
  });
}

/**
 *  用户权限-削除数据
 */
export const deleteUserPermission = (data: UserPermissionType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteUserPermission->param-converted", params)
  return requestDeleteUserPermission(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteUserPermission->detail-converted", data)
    return response
  });
}

/**
 *  用户权限-取得数据
 */
export const getUserPermission = (userPermissionId: string) => {
  return requestGetUserPermission(userPermissionId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getUserPermission->detail-converted", data)
    return response
  });
}
