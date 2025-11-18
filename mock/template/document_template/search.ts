import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const listData = mockjs.mock({
      'list|1-100': [
        {
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
  'POST /api/template/documentTemplate/search': data
};