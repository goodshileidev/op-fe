export const FormQuestionTemplateRules = {
  formQuestionTemplateId: [
    {required: true, message: "必填项目"},

  ],
  formSectionTemplateId: [
    {required: true, message: "必填项目"},

  ],
  formTemplateId: [
    {required: true, message: "必填项目"},

  ],
  questionNo: [
    {required: true, message: "必填项目"},
    {max: 100, message: "长度应小于100个字符"},
  ],
  questionTitleList: [
    {required: true, message: "必填项目"},
    {max: 100, message: "长度应小于100个字符"},
  ],
  domesticForeignTradeType: [],
  subQuestionCount: [],
  subQuestionType: [
    {required: true, message: "必填项目"},
    {max: 10, message: "长度应小于10个字符"},
  ],
  inputControlType: [],
  variableNameList: [],
  varConfigList: [
    {max: 2000, message: "长度应小于2000个字符"},
  ],
  detailedDescription: [],
  cargoNameList: [],

  viewerRoleList: [],
  operationType: [],
  editorRoleList: [],
  operationMode: [
    {required: true, message: "必填项目"},

  ],
  subQuestionTemplateHtml: [],
  isPhotoEvidenceRequired: [
    {required: true, message: "必填项目"},

  ],
  isSignatureEvidenceRequired: [
    {required: true, message: "必填项目"},

  ],
  sortOrder: [
    {required: true, message: "必填项目"},
  ]
};
