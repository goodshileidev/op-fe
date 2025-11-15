export interface FormType {
  formId: string;
  formTemplateId: number;
  formTemplateVersionId: number;
  documentId: number;
  dataDate: string;
  formNo: string;
  formUuid: string
  formName: string

  // 保留的高频字段（强类型）
  shipName: string;
  cargoName: string;
  berthingTime: string;

  // v3.0: 新增行业字段
  industryType?: 'PORT' | 'MEDICAL' | 'MANUFACTURING';
  industryFields?: Record<string, any>;

  // 向后兼容：保留原有字段（这些字段已在后端合并到industryFields JSON中）
  domesticForeignTradeType?: string;
  departureTime?: string;
  platformCargoName?: string;
  bizType?: string;
  operationType?: string;
  portName?: string;
  voyageNo?: string;
  netTonnage?: string;
  grossTonnage?: string;
  deadWeightTonnage?: string;
  loadUnload?: string;
  englishShipName?: string;
  shipMmsi?: string;
  planedArrivingTime?: string;
  turnGroup?: string;
  turnNo?: string;

  inputPersonName: string;
  inputBy: string;
  inputStartTime: string;
  inputFinishTime: string;
  currentStep: string;
  fillinStatus: string;
  viewerRoleList: string;
  editorRoleList: string;
  recipientList: string;
  displayPosition: string[]
  operationMode: string;
  reminderSettings: string;
  signatureImageUrl: string;
  stampImageUrl: string;
  submissionRecipientUnit: string;
  submissionFinishTime: string;
  submissionSettings: string;
  submissionHistory: string;
  variableNameList: string;
  varConfigList: string;
  varValueList: string;
  publishStatus: string
  accessCode: string
}

/**
 * 行业字段配置接口
 */
export interface IndustryFieldConfig {
  code: string;           // 字段代码（如 portName）
  name: string;           // 字段名称（如 泊位名称）
  type: 'STRING' | 'NUMBER' | 'DATE' | 'SELECT' | 'TEXTAREA';
  required?: boolean;     // 是否必填
  options?: Array<{ label: string; value: string }>;  // 下拉选项
  placeholder?: string;   // 占位符
  maxLength?: number;     // 最大长度
  disabled?: boolean;     // 是否禁用
}

/**
 * 行业配置接口
 */
export interface IndustryConfig {
  code: string;           // 行业代码（PORT/MEDICAL/MANUFACTURING）
  name: string;           // 行业名称（港口航运/医疗健康/制造业）
  fields: IndustryFieldConfig[];  // 字段配置列表
}
