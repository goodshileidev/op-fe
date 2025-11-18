import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "formId":  "@natural(100000,10000000)",
        "formTemplateId": "@integer(10, 100)",
        "formTemplateVersionId": "@integer(10, 100)",
        "documentId": "@integer(10, 100)",
        "dataDate": "@sentence(3, 5)",
        "formNo": "表单编号@string('lower', 10)",
        "shipName": "船名@cword(3, 5)",
        "cargoName": "货名@cword(3, 5)",
        "domesticForeignTradeType":  "@pick(['1','2'])",
        "berthingTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "departureTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "inputPersonName": "录入人姓名@cword(3, 5)",
        "inputBy": "@sentence(3, 5)",
        "inputStartTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "inputFinishTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "currentStep": "@sentence(3, 5)",
        "fillinStatus":  "@pick(['1','2'])",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "recipientList":  "@pick(['1','2','3','4','5','6'])",
        "operationMode":  "@pick(['1','2','3'])",
        "reminderSettings": "@sentence(3, 5)",
        "signatureImageUrl": "@sentence(3, 5)",
        "stampImageUrl": "@sentence(3, 5)",
        "submissionRecipientUnit": "@sentence(3, 5)",
        "submissionFinishTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "submissionSettings":  "[]" ,
        "submissionHistory":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,
        "varValueList":  "[]" ,

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/form/form/create': data,
};