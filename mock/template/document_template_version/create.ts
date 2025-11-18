import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "documentTemplateVersionId":  "@natural(100000,10000000)",
        "documentTemplateId": "@integer(10, 100)",
        "bizType":  "@pick(['1','2'])",
        "templateName": "模版名称@cword(3, 5)",
        "versionNo": "版本号@string('lower', 10)",
        "publishTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "publisherName": "发布人姓名@cword(3, 5)",
        "publisherId": "@sentence(3, 5)",
        "coverTemplateHtml": "@sentence(3, 5)",
        "recipientList":  "@pick(['1','2','3','4','5','6'])",
        "stepDefinition": "@sentence(3, 5)",
        "usageScenarioDescription": "@sentence(3, 5)",
        "submissionRecipientUnit": "@sentence(3, 5)",
        "submissionSettings":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/documentTemplateVersion/create': data,
};