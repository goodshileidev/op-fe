import {requestSearchYuancangOperaton,requestCreateYuancangOperaton,requestUpdateYuancangOperaton,requestDeleteYuancangOperaton,requestGetYuancangOperaton} from "@/common/api/operation/yuancang_operaton";
import {YuancangOperatonType} from "@/common/data_type/operation/yuancang_operaton";

/**
 *  圆仓作业表单-查询数据
 */
export const searchYuancangOperaton = (data: YuancangOperatonType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchYuancangOperaton->param-converted", params)
  return requestSearchYuancangOperaton(params).then((response) => {
    let data = response.data
    if (data) {
data = data.list
  for (let idx=0;idx<data.length;idx++) {
  let row=data[idx]
}

    }
    console.debug("searchYuancangOperaton->detail-converted", data)
    return response
  });
}

/**
 *  圆仓作业表单-新建数据
 */
export const createYuancangOperaton = (data: YuancangOperatonType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createYuancangOperaton->param-converted", params)
  return requestCreateYuancangOperaton(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("createYuancangOperaton->detail-converted", data)
    return response
  });
}

/**
 *  圆仓作业表单-更新数据
 */
export const updateYuancangOperaton = (data: YuancangOperatonType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateYuancangOperaton->param-converted", params)
  return requestUpdateYuancangOperaton(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("updateYuancangOperaton->detail-converted", data)
    return response
  });
}

/**
 *  圆仓作业表单-削除数据
 */
export const deleteYuancangOperaton = (data: YuancangOperatonType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteYuancangOperaton->param-converted", params)
  return requestDeleteYuancangOperaton(params).then((response) => {
    let data = response.data
    if (data) {

    }
    console.debug("deleteYuancangOperaton->detail-converted", data)
    return response
  });
}

/**
 *  圆仓作业表单-取得数据
 */
export const getYuancangOperaton = (yuancangOperatonId: string) => {
  return requestGetYuancangOperaton(yuancangOperatonId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getYuancangOperaton->detail-converted", data)
    return response
  });
}
