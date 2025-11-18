import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const listData = mockjs.mock({
      'list|1-100': [
        {
        "notificationHistoryId":  "@natural(100000,10000000)",
        "documentId": "@integer(10, 100)",
        "documentNo": "一体化表单编号@string('lower', 10)",
        "notifiedPersonName": "被通知人姓名@cword(3, 5)",
        "notifiedPersonId": "@sentence(3, 5)",
        "notifiedPersonReceiptMethod":  "@pick([''])",
        "notificationDatetime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "notificationTimeDesc": "@sentence(3, 5)",
        "notificationContent": "@sentence(3, 5)",
        "receiptMethod":  "@pick(['1','2','3','4'])",
        "receiptTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "receiptContent": "@sentence(3, 5)",
        "isReceiptRequired": "@sentence(3, 5)",

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
  'POST /api/notification/notificationHistory/search': data
};