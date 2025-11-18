import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "documentRuleId": "@integer(10, 100)",
        "documentTemplateNo": "一体化表单模版编号@string('lower', 10)",
        "documentTemplateName": "一体化表单模版名称@cword(3, 5)",
        "cargoName":  "@pick([''])",
        "operationType":  "@pick([''])",
        "bizType":  "@pick(['1','2'])",
        "domesticForeignTradeType":  "@pick(['1','2'])",

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/documentTemplateRule/create': data,
};