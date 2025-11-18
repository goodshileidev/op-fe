import request from "@/common/axios";

/**
 *  通知记录-查询数据
 */
export const requestSearchNotificationHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationHistory/search',
    method: 'post',
    data: body
  })
}

/**
 *  通知记录-新建数据
 */
export const requestCreateNotificationHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationHistory/create',
    method: 'post',
    data: body
  })
}

/**
 *  通知记录-更新数据
 */
export const requestUpdateNotificationHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationHistory/update',
    method: 'post',
    data: body
  })
}

/**
 *  通知记录-削除数据
 */
export const requestDeleteNotificationHistory = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/notification/notificationHistory/delete',
    method: 'post',
    data: body
  })
}

/**
 *  通知记录-取得数据
 */
export const requestGetNotificationHistory = (NotificationHistoryId: string) => {
  return request({
    url: '/notification/notificationHistory/get/' + NotificationHistoryId,
    method: 'get',
  })
}
