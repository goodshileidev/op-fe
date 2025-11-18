import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "formSectionId":  "@natural(100000,10000000)",
        "parentSectionId": "@integer(10, 100)",
        "formId": "@sentence(3, 5)",
        "documentId": "@integer(10, 100)",
        "formQuestionTemplateId": "@integer(10, 100)",
        "formTemplateId": "@integer(10, 100)",
        "documentTemplateVersionId": "@integer(10, 100)",
        "documentTemplateId": "@integer(10, 100)",
        "sectionNo": "区块编号@string('lower', 10)",
        "sectionName": "区块名称@cword(3, 5)",
        "mainSubSectionType":  "@pick(['1','2'])",
        "sectionType": "@sentence(3, 5)",
        "contentType":  "@pick(['1','2','3','4','5'])",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "summary": "@sentence(3, 5)",
        "detailedContent": "@sentence(3, 5)",
        "currentStep": "@sentence(3, 5)",
        "fillinStatus":  "@pick(['1','2'])",
        "formatTemplateHtml": "@sentence(3, 5)",
        "totalColumnCount": "@integer(10, 100)",
        "tableColumnList":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,
        "varValueList":  "[]" ,

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/form/formSection/create': data,
};