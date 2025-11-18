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
        "formTemplateId":  "@natural(100000,10000000)",
        "formName": "表单名称@cword(3, 5)",
        "formNo": "表单编号@string('lower', 10)",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "printTemplate": "@sentence(3, 5)",
        "recipientList":  "@pick(['1','2','3','4','5','6'])",
        "operationMode":  "@pick(['1','2','3'])",
        "displayPosition":  "@pick(['1','2'])",
        "editableTimeOnMiniProgram": "{}",
        "publishStatus":  "@pick(['1','2'])",
        "previewHtml": "@sentence(3, 5)",
        "reminderSettings": "@sentence(3, 5)",
        "isSignatureRequired":  "@pick(['1','2'])",
        "isStampSignatureRequired":  "@pick(['1','2'])",
        "submissionRecipientUnit": "@sentence(3, 5)",
        "submissionSettings":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,

        }
      ],
      'code': 200,
      'success': true
    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/formTemplate/list': data
};