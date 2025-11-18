import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
      'list|1-100': [
        {
        "internalOrgId":  "@natural(100000,10000000)",
        "orgNo": "单位编号@string('lower', 10)",
        "orgName": "单位名称@cword(3, 5)",
        "orgType":  "@pick(['1','2','3','4'])",
        "orgLogoUrl": "@sentence(3, 5)",

        }
      ],
      'code': 200,
      'success': true
    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/system/internalOrg/list': data
};