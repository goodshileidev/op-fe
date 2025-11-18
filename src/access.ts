import {UserType} from "@/common/data_type/system/user";

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: UserType } | undefined) {
  const {currentUser} = initialState ?? {};
  let menuCodes = []
  if (currentUser && currentUser.menuCode) {
    menuCodes = currentUser.menuCode
  }
  console.debug("access control", currentUser)
  return {
    /**
     * 也可以是函数，如果是函数，处理的入参是 route 对象
     */
    hasMeiyan: currentUser,// && (currentUser.userName === "admin" || currentUser.userName === "test" || menuCodes.includes("meiyan")) ,
    hasHuagong: currentUser,// && (currentUser.userName === "admin" || currentUser.userName === "test" || menuCodes.includes("huagong")) ,
    hasSystem: currentUser,//&& ( currentUser.userName === "admin" || currentUser.userName === "test" || menuCodes.includes("system")) ,
    hasTemplate: currentUser,// && (currentUser.userName === "admin" || currentUser.userName === "test" || menuCodes.includes("template")) ,
    hasForm: currentUser,// && (currentUser.userName === "admin" || currentUser.userName === "test" || menuCodes.includes("form")) ,
  };


}
