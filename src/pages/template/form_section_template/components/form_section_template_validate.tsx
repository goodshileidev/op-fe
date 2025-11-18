export const FormSectionTemplateRules = {
  formSectionTemplateId: [
    {required: true, message: "必填项目"},

  ],
  formTemplateId: [
    {required: true, message: "必填项目"},

  ],
  sortOrder: [
    {required: true, message: "必填项目"},
  ],
  parentSectionTemplateId: [
    {required: true, message: "必填项目"},

  ],
  sectionNo: [
    {required: true, message: "必填项目"},
    {max: 100, message: "长度应小于100个字符"},
  ],
  domesticForeignTradeType: [],
  sectionName: [
    {required: true, message: "必填项目"},
    {max: 100, message: "长度应小于100个字符"},
  ],
  mainSubSectionType: [
    {required: true, message: "必填项目"},

  ],
  sectionType: [
    {required: true, message: "必填项目"},

  ],
  subSectionType: [
    {required: true, message: "必填项目"},

  ],
  operationType: [],
  cargoNameList: [],
  viewerRoleList: [],
  editorRoleList: [],
  summary: [],
  detailedContent: [
    {max: 2000, message: "长度应小于2000个字符"},
  ],
  formatTemplateHtml: [],
  totalColumnCount: [],
  tableColumnList: [
    {max: 1000, message: "长度应小于1000个字符"},
  ],
  variableNameList: [],
  varConfigList: [
    {max: 2000, message: "长度应小于2000个字符"},
  ],
};
