import {
  requestCreateUserMenu,
  requestDeleteUserMenu,
  requestGetUserMenu,
  requestSearchUserMenu,
  requestUpdateUserMenu
} from "@/common/api/system/user_menu";
import {UserMenuType} from "@/common/data_type/system/user_menu";

/**
 *  用户菜单-查询数据
 */
export const searchUserMenu = (data: UserMenuType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchUserMenu->param-converted", params)
  return requestSearchUserMenu(params).then((response) => {
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
    console.debug("searchUserMenu->detail-converted", data)
    return response
  });
}

/**
 *  用户菜单-新建数据
 */
export const createUserMenu = (data: UserMenuType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.menuCode) {
    params.menuCode = (params.menuCode).join(',')
  }

  console.debug("createUserMenu->param-converted", params)
  return requestCreateUserMenu(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }

    }
    console.debug("createUserMenu->detail-converted", data)
    return response
  });
}

/**
 *  用户菜单-更新数据
 */
export const updateUserMenu = (data: UserMenuType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.menuCode) {
    params.menuCode = (params.menuCode).join(',')
  }

  console.debug("updateUserMenu->param-converted", params)
  return requestUpdateUserMenu(params).then((response) => {
    let data = response.data
    if (data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }

    }
    console.debug("updateUserMenu->detail-converted", data)
    return response
  });
}

/**
 *  用户菜单-削除数据
 */
export const deleteUserMenu = (data: UserMenuType | Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteUserMenu->param-converted", params)
  return requestDeleteUserMenu(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteUserMenu->detail-converted", data)
    return response
  });
}

/**
 *  用户菜单-取得数据
 */
export const getUserMenu = (userMenuId: string) => {
  return requestGetUserMenu(userMenuId).then((response) => {
    const data = response.data
    if (response.code === 200 && data) {
      if (data.menuCode) {
        data.menuCode = (data.menuCode).split(',')
      } else {
        data.menuCode = []
      }

    }
    console.debug("getUserMenu->detail-converted", data)
    return response
  });
}
