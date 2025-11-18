import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const listData = mockjs.mock({
      'list|1-100': [
        {
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

        }
      ]})

  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data':{
      'list': listData.list,
      'pageInfo': {
        'pageNo': req.body.pageNo||1,
        'pageSize': req.body.pageSize||1,
        'totalSize': listData.list.length,
        'totalPage': Math.ceil(listData.list.length / (req.body.pageSize||1))
      },
      'code': 200,
      'success': true
    }
  }
  res.status(200).json(data)
}

export default {
  'POST /api/notification/notificationConfig/search': data
};