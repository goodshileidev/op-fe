export interface DocumentType {
  documentId: string;
  documentTemplateId: number;
  documentTemplateVersionId: number;
  dataDate: string;
  shipType: string;
  templateNo: string
  templateName: string
  documentNo: string;
  documentUuid: string
  stepDefinition: string;
  currentStep: string;
  fillinStatus: string;
  recipientList: string;
  viewerList: string;
  editorList: string;
  inputStartTime: string;
  inputFinishTime: string;
  submissionRecipientUnit: string;
  submissionStatus: string;
  submissionFinishTime: string;
  submissionSettings: string;
  submissionHistory: string;
  variableNameList: string;
  varConfigList: string;
  varValueList: string;
  publishStatus: string
}
