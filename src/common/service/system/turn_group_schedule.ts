import {requestSearchTurnGroupSchedule,requestCreateTurnGroupSchedule,requestUpdateTurnGroupSchedule,requestDeleteTurnGroupSchedule,requestGetTurnGroupSchedule} from "@/common/api/system/turn_group_schedule";
import {TurnGroupScheduleType} from "@/common/data_type/system/turn_group_schedule";

/**
 *  排班-查询数据
 */
export const searchTurnGroupSchedule = (data: TurnGroupScheduleType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("searchTurnGroupSchedule->param-converted", params)
  return requestSearchTurnGroupSchedule(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("searchTurnGroupSchedule->detail-converted", data)
    return response
  });
}

/**
 *  排班-新建数据
 */
export const createTurnGroupSchedule = (data: TurnGroupScheduleType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("createTurnGroupSchedule->param-converted", params)
  return requestCreateTurnGroupSchedule(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("createTurnGroupSchedule->detail-converted", data)
    return response
  });
}

/**
 *  排班-更新数据
 */
export const updateTurnGroupSchedule = (data: TurnGroupScheduleType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("updateTurnGroupSchedule->param-converted", params)
  return requestUpdateTurnGroupSchedule(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("updateTurnGroupSchedule->detail-converted", data)
    return response
  });
}

/**
 *  排班-削除数据
 */
export const deleteTurnGroupSchedule = (data: TurnGroupScheduleType| Record<string, string | number | null | undefined>) => {
  const params = JSON.parse(JSON.stringify(data))

  console.debug("deleteTurnGroupSchedule->param-converted", params)
  return requestDeleteTurnGroupSchedule(params).then((response) => {
    const data = response.data
    if (data) {

    }
    console.debug("deleteTurnGroupSchedule->detail-converted", data)
    return response
  });
}

/**
 *  排班-取得数据
 */
export const getTurnGroupSchedule = (turnGroupScheduleId: string) => {
  return requestGetTurnGroupSchedule(turnGroupScheduleId).then((response)=>{
    const data = response.data
    if (response.code===200 && data){

    }
    console.debug("getTurnGroupSchedule->detail-converted", data)
    return response
  });
}
