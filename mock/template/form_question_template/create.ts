import mockjs from 'mockjs'

const data = (req, res) => {
  const data = {
    'code': 200,
    'msg': 'success',
    'success': true,
    'data': mockjs.mock({
      "formQuestionTemplateId": "@natural(100000,10000000)",
      "formSectionTemplateId": "@integer(10, 100)",
      "formTemplateId": "@integer(10, 100)",
      "questionNo": "问题编号@string('lower', 10)",
      "questionTitleList": "@sentence(3, 5)",
      "subQuestionCount": "@integer(10, 100)",
      "subQuestionType": "@sentence(3, 5)",
      "inputControlType": "@pick(['1','2','3','4'])",
      "variableNameList": "@sentence(3, 5)",
      "varConfigList": "[{\"varName\":\"问题\",\"varKey\":\"question\",\"varDataType\":\"string\",\"varInputType\":\"text\"}]",
      "detailedDescription": "@sentence(3, 5)",
      "viewerRoleList": "@pick(['1','2'])",
      "editorRoleList": "@pick(['1','2'])",
      "operationMode": "@pick(['1','2','3'])",
      "subQuestionTemplateHtml": "[{\"idx\":0,\"title\":\"序号\",\"html\":\"<p>sssss</p>\",\"subQuestionType\":\"1\"},{\"idx\":1,\"title\":\"问题\",\"html\":\"<p>ssssss</p>\",\"subQuestionType\":\"3\"},{\"idx\":2,\"title\":\"签名\",\"html\":\"<p>ssssss</p>\",\"subQuestionType\":\"4\"}]",
      "isPhotoEvidenceRequired": "@pick(['1','2'])",
      "isSignatureEvidenceRequired": "@pick(['1','2'])",

    })
  }
  res.status(200).json(data)
}

export default {
  'POST /api/template/formQuestionTemplate/create': data,
};
