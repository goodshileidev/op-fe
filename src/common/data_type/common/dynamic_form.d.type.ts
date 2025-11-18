import {FormVarConfigType} from "@/common/data_type/template/form_var_config";

export interface SelectDataOption {
  value: string,
  label: string,
}

export interface DynamicFormField {
  title: string,
  key: string,
  dataIndex: string,
  componentType: "input" | "select" | "textarea" | "text" | "number" | "richedit" | "radio" | "checkbox" | "file" | "picture" | "updateTime" | "title" | "label" | "hidden",
  selectOptions?: SelectDataOption[],
  optionLabelField?: string
  optionValueField?: string
  width?: string
  render?: (text: string, row: any, index: number) => JSX.Element;
  componentTypeSelector?: (value: any) => string
}


export interface DynamicFormProps {
  title: string
  initData?: any
  formQuestionTemplateId?: any
  displayDirection: "horizontal" | "vertical"
  fields?: DynamicFormField[]
  fieldName: string
  addButtonType: "normal"
  onUpdate: any
  showAdd: true
  defaultFormVarConfigList?: FormVarConfigType[]
  formVarConfigList?: FormVarConfigType[]
  questionVarConfigList?: FormVarConfigType[],
}
