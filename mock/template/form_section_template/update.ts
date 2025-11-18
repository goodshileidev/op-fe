import mockjs from 'mockjs'
import { v4 as uuid } from 'uuid'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
        "formSectionTemplateId":  "@natural(100000,10000000)",
        "formTemplateId": "@integer(10, 100)",
        "parentSectionTemplateId": "@integer(10, 100)",
        "sectionNo": "区块编号@string('lower', 10)",
        "sectionName": "区块名称@cword(3, 5)",
        "mainSubSectionType":  "@pick(['1','2'])",
        "sectionType":  "@pick(['1','2','3','4','5','6','7'])",
        "subSectionType":  "@pick(['1','2','3','4','5','6','7','8'])",
        "viewerRoleList":  "@pick(['1','2'])",
        "editorRoleList":  "@pick(['1','2'])",
        "summary": "@sentence(3, 5)",
        "detailedContent": "@sentence(3, 5)",
        "formatTemplateHtml": "@sentence(3, 5)",
        "totalColumnCount": "@integer(10, 100)",
        "tableColumnList":  "[]" ,
        "variableNameList": "@sentence(3, 5)",
        "varConfigList":  "[]" ,

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/formSectionTemplate/update': data
};