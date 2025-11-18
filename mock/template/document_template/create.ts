import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "documentTemplateId":  "@natural(100000,10000000)",
        "bizType":  "@pick(['1','2'])",
        "shipType":  "@pick(['1','2','3','4','5','6','7'])",
        "templateName": "模版名称@cword(3, 5)",
        "templateNo": "模板编号@string('lower', 10)",
        "currentVersion": "@pick(['1','2','3','4','5','6','7'])",
        "coverTemplateHtml": "@sentence(3, 5)",
        "editorRoleList":  "@pick(['1','2'])",
        "publishTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "publisherName": "发布人姓名@cword(3, 5)",
        "publisherId": "@sentence(3, 5)",
        "recipientList":  "@pick(['1','2','3','4','5','6'])",
        "publishStatus":  "@pick(['1','2'])",
        "stepDefinition": "@sentence(3, 5)",
        "usageScenarioDescription": "@sentence(3, 5)",
        "submissionSettings":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/documentTemplate/create': data,
};