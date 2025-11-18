import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const listData = mockjs.mock({
      'list|1-100': [
        {
        "documentRuleId": "@integer(10, 100)",
        "documentTemplateNo": "一体化表单模版编号@string('lower', 10)",
        "documentTemplateName": "一体化表单模版名称@cword(3, 5)",
        "cargoName":  "@pick([''])",
        "operationType":  "@pick([''])",
        "bizType":  "@pick(['1','2'])",
        "domesticForeignTradeType":  "@pick(['1','2'])",

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
  'POST /api/template/documentTemplateRule/search': data
};