import mockjs from 'mockjs'

const data = (req, res) => {
  const listData = mockjs.mock({
    'list|1-100': [
      {
        "formSectionId": "@natural(100000,10000000)",
        "parentSectionId": "@integer(10, 100)",
        "formId": "@sentence(3, 5)",
        "documentId": "@integer(10, 100)",
        "formQuestionTemplateId": "@integer(10, 100)",
        "formTemplateId": "@integer(10, 100)",
        "documentTemplateVersionId": "@integer(10, 100)",
        "documentTemplateId": "@integer(10, 100)",
        "sectionNo": "区块编号@string('lower', 10)",
        "sectionName": "区块名称@cword(3, 5)",
        "mainSubSectionType": "@pick(['1','2'])",
        "sectionType": "@sentence(3, 5)",
        "subSectionType": "2",
        "contentType": "@pick(['1','2','3','4','5'])",
        "viewerRoleList": "@pick(['1','2'])",
        "editorRoleList": "@pick(['1','2'])",
        "summary": "@sentence(3, 5)",
        "detailedContent": "@sentence(3, 5)",
        "currentStep": "@sentence(3, 5)",
        "fillinStatus": "@pick(['1','2'])",
        "formatTemplateHtml": "@sentence(3, 5)",
        "totalColumnCount": "@integer(10, 100)",
        "tableColumnList": "[{\"columnTitle\":\"序号\",\"columnKey\":\"no\",\"columnSpan\":1,\"subQuestionType\":\"1\"},{\"columnTitle\":\"问题\",\"columnKey\":\"question\",\"columnSpan\":2,\"subQuestionType\":\"3\"}]",
        "variableNameList": "@sentence(3, 5)",
        "varConfigList": "[{\"varName\":\"问题\",\"varKey\":\"question\",\"varDataType\":\"string\",\"varInputType\":\"text\"}]",
        "varValueList": "[{\"varName\":\"问题\",\"varKey\":\"question\",\"varDataType\":\"string\",\"varInputType\":\"text\"}]",

      }
    ]
  })

  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': {
      'list': listData.list,
      'pageInfo': {
        'pageNo': req.body.pageNo || 1,
        'pageSize': req.body.pageSize || 1,
        'totalSize': listData.list.length,
        'totalPage': Math.ceil(listData.list.length / (req.body.pageSize || 1))
      },
      'code': 200,
      'success': true
    }
  }
  res.status(200).json(data)
}

export default {
  'POST /api/form/formSection/search': data
};
