import {
  requestCreateUser,
  requestDeleteUser,
  requestGetCurrentUser,
  requestGetUser,
  requestSearchUser,
  requestUpdateUser
} from "@/common/api/system/user";
import {UserType} from "@/common/data_type/system/user";
import CryptoJS from "crypto-js";

/**
 *  用户表-查询数据
 */
export const searchUser = (data: UserType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchUser->param-converted", params)
  return requestSearchUser(params).then((response) => {
    let data = response.data
    if (data) {
      data = data.list // search方法
      for (let idx = 0; idx < data.length; idx++) {
        let row = data[idx]
        if (row.menuCode) {
          row.menuCode = (row.menuCode).split(',')
        } else {
          row.menuCode = []
        }
      }
    }
    console.debug("searchUser->detail-converted", data)
    return response
  });
}

/**
 *
 * @param input
 */
const encrypt = (input: string): string => {
  return CryptoJS.MD5(input).toString();
};

/**
 *  用户表-新建数据
 *  md5.hexMD5(this.data.loginName + "&uni-66&" + this.data.password)
 */
export const createUser = (data: UserType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.password) {
    params.password = encrypt(params.employeeNumber + "&uni-66&" + params.password)
  }
  if (params.menuCode) {
    params.menuCode = (params.menuCode).join(',')
  }
  console.debug("createUser->param-converted", params)
  return requestCreateUser(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }
    }
    console.debug("createUser->detail-converted", data)
    return response
  });
}

/**
 *  用户表-更新数据
 */
export const updateUser = (data: UserType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.password) {
    params.password = encrypt(params.employeeNumber + "&uni-66&" + params.password)
  }
  if (params.menuCode) {
    params.menuCode = (params.menuCode).join(',')
  }
  console.debug("updateUser->param-converted", params)
  return requestUpdateUser(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }
    }
    console.debug("updateUser->detail-converted", data)
    return response
  });
}

/**
 *  用户表-削除数据
 */
export const deleteUser = (data: UserType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteUser->param-converted", params)
  return requestDeleteUser(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteUser->detail-converted", data)
    return response
  });
}

/**
 *  用户表-取得数据
 */
export const getUser = (userId: string) => {
  return requestGetUser(userId).then((response) => {
    let data = response.data
    if (response.code === 200 && data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }
    }
    console.debug("getUser->detail-converted", data)
    return response
  });
}


/**
 *  用户表-取得数据
 */
export const getCurrentUser = () => {
  return requestGetCurrentUser().then((response) => {
    let data = response.data
    if (response.code === 200 && data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }
    }
    console.debug("getUser->detail-converted", data)
    return response
  });
}
