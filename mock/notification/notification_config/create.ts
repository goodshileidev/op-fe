import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "notificationConfigId":  "@natural(100000,10000000)",
        "documentId": "@integer(10, 100)",
        "documentNo": "一体化表单编号@string('lower', 10)",
        "notifiedPersonType":  "@pick([''])",
        "notifiedPersonReceiptMethod":  "@pick([''])",
        "notifyTiming": "@sentence(3, 5)",
        "notificationTimingBusinessDescription": "@sentence(3, 5)",
        "notificationDetailedContentTemplate": "@sentence(3, 5)",
        "isReceiptRecordRequired":  "@pick(['1','2'])",
        "receiptMethod":  "@pick(['1','2','3','4'])",

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/notification/notificationConfig/create': data,
};