import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "formQuestionTemplateId":  "@natural(100000,10000000)",
        "formSectionTemplateId": "@integer(10, 100)",
        "formTemplateId": "@integer(10, 100)",
        "questionNo": "问题编号@string('lower', 10)",
        "questionTitleList": "@sentence(3, 5)",
        "subQuestionCount": "@integer(10, 100)",
        "subQuestionType": "@sentence(3, 5)",
        "inputControlType":  "@pick(['1','2','3','4'])",
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,
        "detailedDescription": "@sentence(3, 5)",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "operationMode":  "@pick(['1','2','3'])",
        "subQuestionTemplateHtml":  "[]" ,
        "isPhotoEvidenceRequired":  "@pick(['1','2'])",
        "isSignatureEvidenceRequired":  "@pick(['1','2'])",

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/formQuestionTemplate/update': data
};