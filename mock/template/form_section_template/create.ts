import mockjs from 'mockjs'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
      "formSectionTemplateId": "@natural(100000,10000000)",
      "formTemplateId": "@integer(10, 100)",
      "parentSectionTemplateId": "@integer(10, 100)",
      "sectionNo": "区块编号@string('lower', 10)",
      "sectionName": "区块名称@cword(3, 5)",
      "mainSubSectionType": "@pick(['1','2'])",
      "sectionType": "@pick(['1','2','3','4','5','6','7'])",
      "subSectionType": "2",
      "viewerRoleList": "@pick(['1','2'])",
      "editorRoleList": "@pick(['1','2'])",
      "summary": "@sentence(3, 5)",
      "detailedContent": "@sentence(3, 5)",
      "formatTemplateHtml": "@sentence(3, 5)",
      "totalColumnCount": "@integer(10, 100)",
      "tableColumnList": "[{\"columnTitle\":\"序号\",\"columnKey\":\"no\",\"columnSpan\":1,\"subQuestionType\":\"1\"},{\"columnTitle\":\"问题\",\"columnKey\":\"question\",\"columnSpan\":2,\"subQuestionType\":\"3\"},{\"columnTitle\":\"签名\",\"columnKey\":\"signature\",\"columnSpan\":2,\"subQuestionType\":\"4\"}]",
      "varConfigList": "[{\"varName\":\"问题\",\"varKey\":\"question\",\"varDataType\":\"string\",\"varInputType\":\"text\"}]",
      "varValueList": "[{\"varName\":\"问题\",\"varKey\":\"question\",\"varDataType\":\"string\",\"varInputType\":\"text\"}]",
      "variableNameList": "@sentence(3, 5)",

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/formSectionTemplate/create': data,
};
