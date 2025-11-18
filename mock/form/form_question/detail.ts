import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "formQuestionId":  "@natural(100000,10000000)",
        "formSectionId": "@sentence(3, 5)",
        "formId": "@sentence(3, 5)",
        "documentId": "@integer(10, 100)",
        "formQuestionTemplateId": "@integer(10, 100)",
        "formTemplateId": "@integer(10, 100)",
        "formTemplateVersionId": "@integer(10, 100)",
        "questionNo": "问题编号@string('lower', 10)",
        "questionTitleList": "@sentence(3, 5)",
        "subQuestionCount": "@integer(10, 100)",
        "subQuestionType":  "@pick(['1','2','3','3','4','5','6'])",
        "inputControlType":  "@pick(['1','2','3','4'])",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "detailedDescription": "@sentence(3, 5)",
        "subQuestionTemplateHtml":  "[]" ,
        "remark": "@sentence(3, 5)",
        "inputBy": "@sentence(3, 5)",
        "inputTime": "@datetime('yyyy-MM-dd HH:mm:ss')",
        "operationMode":  "@pick(['1','2','3'])",
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,
        "varValueList":  "[]" ,
        "variableHistory": "@sentence(3, 5)",
        "isPhotoEvidenceRequired":  "@pick(['1','2'])",
        "isSignatureEvidenceRequired":  "@pick(['1','2'])",
        "signatureImageUrl": "@sentence(3, 5)",
        "stampImageUrl": "@sentence(3, 5)",

    })
  }
  res.status(200).json(data)
}

export default {
  'GET /api/form/formQuestion/get/:formQuestionId': data
};