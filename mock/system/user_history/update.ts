import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "userHistoryId":  "@natural(100000,10000000)",
        "userId": "@integer(10, 100)",
        "userName": "姓名@cword(3, 5)",
        "employeeNumber": "@sentence(3, 5)",
        "userType":  "@pick(['1','2','4','5','6'])",
        "signatureFile": "@sentence(3, 5)",
        "avatarUrl": "@sentence(3, 5)",
        "password": "@sentence(3, 5)",
        "signatureImageUrl": "@sentence(3, 5)",
        "stampImageUrl": "@sentence(3, 5)",
        "userStatus":  "@pick(['1','2','3','4','5'])",

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/system/userHistory/update': data
};