import dayjs from "dayjs";

export function renderDateInRow(text: string, row: any, index: number) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("YYYY-MM-DD");
}

export function renderTimeInRow(text: string, row: any, index: number) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("HH:mm:ss");
}

export function renderTime2InRow(text: string, row: any, index: number) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("HH:mm");
}

export function renderDateTimeInRow(text: string, row: any, index: number) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("YYYY-MM-DD HH:mm:ss");
}

export function renderDateTime2InRow(text: string, row: any, index: number) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("YYYY-MM-DD HH:mm");
}


export function renderYearMonthInRow(text: string, row: any, index: number) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("YYYY-MM");
}

export function renderDateTime(text: string) {
  if (!text) {
    return <></>
  }
  const result = new Date(text)
  return dayjs(result).format("YYYY-MM-DD HH:mm:ss");
}
