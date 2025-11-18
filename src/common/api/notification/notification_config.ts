import request from "@/common/axios";

/**
 *  通知定义-查询数据
 */
export const requestSearchNotificationConfig = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationConfig/search',
    method: 'post',
    data: body
  })
}

/**
 *  通知定义-新建数据
 */
export const requestCreateNotificationConfig = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationConfig/create',
    method: 'post',
    data: body
  })
}

/**
 *  通知定义-更新数据
 */
export const requestUpdateNotificationConfig = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationConfig/update',
    method: 'post',
    data: body
  })
}

/**
 *  通知定义-削除数据
 */
export const requestDeleteNotificationConfig = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationConfig/delete',
    method: 'post',
    data: body
  })
}

/**
 *  通知定义-取得数据
 */
export const requestGetNotificationConfig = (NotificationConfigId: string) => {
  return request({
    url: '/notification/notificationConfig/get/' + NotificationConfigId,
    method: 'get',
  })
}
