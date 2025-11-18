import { FormQuestionTemplateVarConfigType } from "./form_question_template_var_config";
export interface FormQuestionTemplateType {
  sectionName: String;
  formQuestionTemplateId: string;
  formSectionTemplateId: number;
  formTemplateId: number;
  questionNo: string;
  operationType: string;
  domesticForeignTradeType: string
  questionTitleList: string;
  subQuestionCount: number;
  subQuestionType: string;
  inputControlType: string;
  variableNameList: string;
  varConfigList: any;
  detailedDescription: string;
  viewerRoleList: string;
  editorRoleList: string;
  operationMode: string;
  subQuestionTemplateHtml: any;
  isPhotoEvidenceRequired: string;
  isSignatureEvidenceRequired: string;
  questionItems: [any],
  varConfigs: FormQuestionTemplateVarConfigType[]

}
