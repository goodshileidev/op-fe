export const FormTemplateRules = {
  formTemplateId: [
    {required: true, message: "必填项目"},

  ],
  formTemplateName: [
    {required: true, message: "必填项目"},
    {max: 100, message: "长度应小于100个字符"},
  ],
  formTemplateNo: [
    {required: true, message: "必填项目"},
    {max: 100, message: "长度应小于100个字符"},
  ],
  formTemplatePlatformNo: [
    {required: true, message: "必填项目"},
  ],
  documentType: [
    {max: 100, message: "长度应小于100个字符"},
  ],
  documentTwoPart: [
    {max: 100, message: "长度应小于100个字符"},
  ],
  operationDemand: [
    {max: 100, message: "长度应小于100个字符"},
  ],
  interactiveStatus: [
    {max: 100, message: "长度应小于100个字符"},
  ],
  documentDescription: [
    {max: 100, message: "长度应小于100个字符"},
  ],
  sortOrder: [
    {required: true, message: "必填项目"},
  ],
  viewerRoleList: [],
  editorRoleList: [],
  printTemplate: [],
  recipientList: [],
  operationMode: [
    {required: true, message: "必填项目"},

  ],
  displayPosition: [
    {required: true, message: "必填项目"},

  ],
  editableTimeOnMiniProgram: [
    {max: 1000, message: "长度应小于1000个字符"},
  ],
  publishStatus: [
    {required: true, message: "必填项目"},

  ],
  previewHtml: [],
  reminderSettings: [
    {max: 30, message: "长度应小于30个字符"},
  ],
  isSignatureRequired: [
    {required: true, message: "必填项目"},

  ],
  isStampSignatureRequired: [
    {required: true, message: "必填项目"},

  ],
  submissionRecipientUnit: [
    {max: 30, message: "长度应小于30个字符"},
  ],
  submissionSettings: [],
  variableNameList: [
    {max: 2000, message: "长度应小于2000个字符"},
  ],
  varConfigList: [
    {max: 2000, message: "长度应小于2000个字符"},
  ], cargoNameList: [],
  operationType: [],
  domesticForeignTradeType: []

};
