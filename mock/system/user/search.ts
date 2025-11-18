import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const listData = mockjs.mock({
      'list|1-100': [
        {
        "userId":  "@natural(100000,10000000)",
        "userName": "姓名@cword(3, 5)",
        "employeeNumber": "@sentence(3, 5)",
        "userType":  "@pick(['1','2','4','5','6'])",
        "signatureFile": "@sentence(3, 5)",
        "avatarUrl": "@sentence(3, 5)",
        "password": "@sentence(3, 5)",
        "signatureImageUrl": "@sentence(3, 5)",
        "stampImageUrl": "@sentence(3, 5)",
        "userStatus":  "@pick(['1','2','3','4','5'])",

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
  'POST /api/system/user/search': data
};