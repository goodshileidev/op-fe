import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "formTemplateVersionId":  "@natural(100000,10000000)",
        "formTemplateId": "@integer(10, 100)",
        "versionNo": "版本号@string('lower', 10)",
        "publishTime": "@sentence(3, 5)",
        "formName": "表单名称@cword(3, 5)",
        "formNo": "表单编号@string('lower', 10)",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "printTemplate": "@sentence(3, 5)",
        "recipientList":  "@pick(['1','2','3','4','5','6'])",
        "operationMode":  "@pick(['1','2','3'])",
        "previewHtml": "@sentence(3, 5)",
        "reminderSettings": "@sentence(3, 5)",
        "isSignatureRequired":  "@pick(['1','2'])",
        "isStampSignatureRequired":  "@pick(['1','2'])",
        "submissionRecipientUnit": "@sentence(3, 5)",
        "submissionSettings":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/formTemplateVersion/update': data
};