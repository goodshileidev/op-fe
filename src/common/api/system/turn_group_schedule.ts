import request from "@/common/axios";

/**
 *  排班-查询数据
 */
export const requestSearchTurnGroupSchedule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/turnGroupSchedule/search',
    method: 'post',
    data: body
  })
}

/**
 *  排班-新建数据
 */
export const requestCreateTurnGroupSchedule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/turnGroupSchedule/create',
    method: 'post',
    data: body
  })
}

/**
 *  排班-更新数据
 */
export const requestUpdateTurnGroupSchedule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/turnGroupSchedule/update',
    method: 'post',
    data: body
  })
}

/**
 *  排班-削除数据
 */
export const requestDeleteTurnGroupSchedule = (body: Record<string, string | number | null | undefined>) => {
  return request({
    url: '/system/turnGroupSchedule/deleteByPO',
    method: 'post',
    data: body
  })
}

/**
 *  排班-取得数据
 */
export const requestGetTurnGroupSchedule = (turnGroupScheduleId: string) => {
  return request({
    url: '/system/turnGroupSchedule/get/' + turnGroupScheduleId,
    method: 'get',
  })
}
