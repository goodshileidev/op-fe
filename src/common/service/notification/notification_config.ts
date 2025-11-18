import {requestSearchNotificationConfig,requestCreateNotificationConfig,requestUpdateNotificationConfig,requestDeleteNotificationConfig,requestGetNotificationConfig} from "@/common/api/notification/notification_config";
import {NotificationConfigType} from "@/common/data_type/notification/notification_config";

/**
 *  通知定义-查询数据
 */
export const searchNotificationConfig = (data: NotificationConfigType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchNotificationConfig->param-converted", params)
  return requestSearchNotificationConfig(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchNotificationConfig->detail-converted", data)
    return response
  });
}

/**
 *  通知定义-新建数据
 */
export const createNotificationConfig = (data: NotificationConfigType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.notifiedPersonReceiptMethod){
    params.notifiedPersonReceiptMethod = (params.notifiedPersonReceiptMethod).join(',')
  }
  if (params.receiptMethod){
    params.receiptMethod = (params.receiptMethod).join(',')
  }

  console.debug("createNotificationConfig->param-converted", params)
  return requestCreateNotificationConfig(params).then((response) => {
    const data = response.data
    if (data) {
    if (data.notifiedPersonReceiptMethod){
      data.notifiedPersonReceiptMethod = (data.notifiedPersonReceiptMethod).split(',')
    }else{
      data.notifiedPersonReceiptMethod =[]
    }
    if (data.receiptMethod){
      data.receiptMethod = (data.receiptMethod).split(',')
    }else{
      data.receiptMethod =[]
    }

    }
    console.debug("createNotificationConfig->detail-converted", data)
    return response
  });
}

/**
 *  通知定义-更新数据
 */
export const updateNotificationConfig = (data: NotificationConfigType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.notifiedPersonReceiptMethod){
    params.notifiedPersonReceiptMethod = (params.notifiedPersonReceiptMethod).join(',')
  }
  if (params.receiptMethod){
    params.receiptMethod = (params.receiptMethod).join(',')
  }

  console.debug("updateNotificationConfig->param-converted", params)
  return requestUpdateNotificationConfig(params).then((response) => {
    const data = response.data
    if (data) {
    if (data.notifiedPersonReceiptMethod){
      data.notifiedPersonReceiptMethod = (data.notifiedPersonReceiptMethod).split(',')
    }else{
      data.notifiedPersonReceiptMethod =[]
    }
    if (data.receiptMethod){
      data.receiptMethod = (data.receiptMethod).split(',')
    }else{
      data.receiptMethod =[]
    }

    }
    console.debug("updateNotificationConfig->detail-converted", data)
    return response
  });
}

/**
 *  通知定义-削除数据
 */
export const deleteNotificationConfig = (data: NotificationConfigType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteNotificationConfig->param-converted", params)
  return requestDeleteNotificationConfig(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteNotificationConfig->detail-converted", data)
    return response
  });
}

/**
 *  通知定义-取得数据
 */
export const getNotificationConfig = (notificationConfigId: string) => {
  return requestGetNotificationConfig(notificationConfigId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){
    if (data.notifiedPersonReceiptMethod){
      data.notifiedPersonReceiptMethod = (data.notifiedPersonReceiptMethod).split(',')
    }else{
      data.notifiedPersonReceiptMethod =[]
    }
    if (data.receiptMethod){
      data.receiptMethod = (data.receiptMethod).split(',')
    }else{
      data.receiptMethod =[]
    }

    }
    console.debug("getNotificationConfig->detail-converted", data)
    return response
  });
}
