import {requestSearchNotificationHistory,requestCreateNotificationHistory,requestUpdateNotificationHistory,requestDeleteNotificationHistory,requestGetNotificationHistory} from "@/common/api/notification/notification_history";
import {NotificationHistoryType} from "@/common/data_type/notification/notification_history";

/**
 *  通知记录-查询数据
 */
export const searchNotificationHistory = (data: NotificationHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchNotificationHistory->param-converted", params)
  return requestSearchNotificationHistory(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchNotificationHistory->detail-converted", data)
    return response
  });
}

/**
 *  通知记录-新建数据
 */
export const createNotificationHistory = (data: NotificationHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.notifiedPersonReceiptMethod){
    params.notifiedPersonReceiptMethod = (params.notifiedPersonReceiptMethod).join(',')
  }
  if (params.receiptMethod){
    params.receiptMethod = (params.receiptMethod).join(',')
  }

  console.debug("createNotificationHistory->param-converted", params)
  return requestCreateNotificationHistory(params).then((response) => {
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
    console.debug("createNotificationHistory->detail-converted", data)
    return response
  });
}

/**
 *  通知记录-更新数据
 */
export const updateNotificationHistory = (data: NotificationHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))
  if (params.notifiedPersonReceiptMethod){
    params.notifiedPersonReceiptMethod = (params.notifiedPersonReceiptMethod).join(',')
  }
  if (params.receiptMethod){
    params.receiptMethod = (params.receiptMethod).join(',')
  }

  console.debug("updateNotificationHistory->param-converted", params)
  return requestUpdateNotificationHistory(params).then((response) => {
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
    console.debug("updateNotificationHistory->detail-converted", data)
    return response
  });
}

/**
 *  通知记录-削除数据
 */
export const deleteNotificationHistory = (data: NotificationHistoryType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteNotificationHistory->param-converted", params)
  return requestDeleteNotificationHistory(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteNotificationHistory->detail-converted", data)
    return response
  });
}

/**
 *  通知记录-取得数据
 */
export const getNotificationHistory = (notificationHistoryId: string) => {
  return requestGetNotificationHistory(notificationHistoryId).then((response)=>{
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
    console.debug("getNotificationHistory->detail-converted", data)
    return response
  });
}
