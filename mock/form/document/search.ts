import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const listData = mockjs.mock({
      'list|1-100': [
        {
        "documentId":  "@natural(100000,10000000)",
        "documentTemplateId": "@integer(10, 100)",
        "documentTemplateVersionId": "@integer(10, 100)",
        "dataDate": "@sentence(3, 5)",
        "shipType": "@sentence(3, 5)",
        "documentNo": "一体化表单编号@string('lower', 10)",
        "stepDefinition": "@sentence(3, 5)",
        "currentStep": "@sentence(3, 5)",
        "fillinStatus":  "@pick(['1','2'])",
        "recipientList":  "@pick(['1','2','3','4','5','6'])",
        "viewerList": "@sentence(3, 5)",
        "editorList": "@sentence(3, 5)",
        "inputStartTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "inputFinishTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "submissionRecipientUnit": "@sentence(3, 5)",
        "submissionStatus":  "@pick(['1','2'])",
        "submissionFinishTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "submissionSettings":  "[]" ,
        "submissionHistory":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,
        "varValueList":  "[]" ,

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
  'POST /api/form/document/search': data
};