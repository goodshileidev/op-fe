import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Dropdown, Form, Input, InputNumber, MenuProps, Select, Space} from 'antd';
import {MinusCircleOutlined, PlusCircleOutlined, PlusOutlined} from '@ant-design/icons';

import {DynamicFormProps} from "@/common/data_type/common/dynamic_form.d.type";
import {useTranslation} from 'react-i18next';
import SuperRichTextEdit from '../text_editor/super_rich_text_editor';
import {codeList} from "@/common/code_list/code_list_static";

/**
 * 这个组件的参数输出为数组
 [
 { param1:v,param2:v2,param3:v3 },
 { param1:v,param2:v2,param3:v3 },
 ]
 * @constructor
 */
const DynamicForm: React.FC<DynamicFormProps> = (props) => {
  const form = Form.useFormInstance();
  const {t} = useTranslation();
  const [needUpdate, setNeedUpdate] = useState(0)
  const initData = props.initData
  const fieldName = props.fieldName
  const showAdd = (props.showAdd === undefined) ? true : props.showAdd
  console.debug("props.showAdd", props.showAdd)
  useEffect(() => {
    if (initData) {
      // 初始化值前数据要处理好
      form.setFieldsValue({[props.fieldName]: initData})
      console.debug("form.setFieldsValue", props.fieldName, initData)
    }
  }, [initData]);
  const handleSubmit = async () => {
    const values = await form.validateFields();
    // values是数组
    props.onUpdate(values)
  }
  const onValuesChange = async (changedValues, allValues) => {
    const values = await form.validateFields();
    console.debug("onValuesChange", changedValues[props.fieldName], allValues[props.fieldName], values[props.fieldName])
    props.onUpdate(values)
  }
//   "code_list.SubQuestionType.3"
// :
//   "带输入框的富文本",
//     "code_list.SubQuestionType.4"
// :
//   "刷卡签名",
//     "code_list.SubQuestionType.8"
// :
//   "手写签名",
//     "code_list.SubQuestionType.5"
// :
//   "签名时间",
//     "code_list.SubQuestionType.6"
// :
//   "图片上传",
//     "code_list.SubQuestionType.7"
// :
//   "文件上传",


  const inputTypeItems: MenuProps['items'] = [
    {
      key: '3',
      label: "带输入框的富文本",
    },
    // {
    //   key: '6',
    //   label: "图片上传",
    // },
    // {
    //   key: '7',
    //   label: "文件上传",
    // },
  ];
  return (
    <>
      <Form.List
        name={props.fieldName}
        style={{
          width: "100%"
        }}
      >
        {(fieldList, listOperation) => {
          const onAddMenuClick: MenuProps['onClick'] = ({key}) => {
            const newRow = {
              title: "",
              html: '',
              value: null,
              id: new Date().getUTCMilliseconds(),
              subQuestionType: key + ""
            }
            listOperation.add(newRow) // listOperation中内置的add方法
            console.debug("onAddMenuClick", key, newRow, listOperation)
          };
          console.debug("show-formList-rows-1:", fieldList, listOperation)
          return (
            <Space direction={"vertical"}>
              {
                // 行
                fieldList.map((formListfield) => {
                    const {key, name, ...restField} = formListfield
                    const uniqueId = `super_edit_${fieldName}_${key}`;
                    const formListFieldKey = key
                    const formListFieldName = name
                    console.debug(">>>>>>>>>>>>>>>>>>>>>>>>>>>>show-formList-row-2:", formListfield, key, name, restField, fieldList, listOperation)
                    let isHidden = false
                    props.fields?.map((field) => {
                      let componentType = field.componentType
                      const fieldValue = {title: "", value: ""}
                      if (form.getFieldValue(props.fieldName)) {
                        fieldValue.value = form.getFieldValue(props.fieldName)[key]
                      }
                      if (field.componentTypeSelector && fieldValue.value) {
                        componentType = field.componentTypeSelector(fieldValue.value)
                      }
                      if (componentType === "hidden") {
                        isHidden = true
                      }
                    })
                    return (
                      <Space key={formListFieldName}
                             style={{
                               display: isHidden ? 'none' : 'flex',
                               flexFlow: (props.displayDirection === "vertical") ? "column" : "row"
                             }}
                             direction={(props.displayDirection === "vertical") ? "vertical" : "horizontal"}
                             align="start">
                        {
                          // 字段渲染 暂时只支持 input,select 需要其他组件在这里扩展
                          props.fields?.map((fieldDef) => {
                            let componentType = fieldDef.componentType
                            let width = fieldDef.width ? fieldDef.width : "100%"
                            const fieldValueContainer = {title: ""}
                            if (form.getFieldValue(props.fieldName)) {
                              fieldValueContainer.value = form.getFieldValue(props.fieldName)[formListFieldName]
                            }
                            if (fieldDef.componentTypeSelector && fieldValueContainer.value) {
                              componentType = fieldDef.componentTypeSelector(fieldValueContainer.value)
                            }
                            if (componentType === "title" && fieldValueContainer.value) {
                              fieldValueContainer.title = fieldValueContainer.value[fieldDef.key]
                            }
                            let rules = [{required: true, message: 'Missing param1'}]
                            if (componentType === "title" || componentType === "picture") {
                              rules = []
                            }
                            const selectOptions = []
                            if (componentType === "select") {
                              if (fieldDef.optionLabelField || fieldDef.optionValueField) {
                                for (const idx in fieldDef.selectOptions) {
                                  const option = fieldDef.selectOptions[idx]
                                  const newOption = {}
                                  if (fieldDef.optionValueField) {
                                    if (option[fieldDef.optionValueField]) {
                                      newOption["value"] = option[fieldDef.optionValueField]
                                    } else {
                                      newOption["value"] = option.data[fieldDef.optionValueField]
                                    }
                                  }
                                  if (fieldDef.optionLabelField) {
                                    if (option[fieldDef.optionLabelField]) {
                                      newOption["label"] = option[fieldDef.optionLabelField]
                                    } else {
                                      newOption["label"] = option.data[fieldDef.optionLabelField]
                                    }
                                  }
                                  selectOptions.push(newOption)
                                }
                              } else {
                                for (const idx in fieldDef.selectOptions) {
                                  const option = fieldDef.selectOptions[idx]
                                  selectOptions.push(option)
                                }
                              }
                            }
                            return (
                              <>
                                <Form.Item
                                  {...restField}
                                  style={{
                                    width: width
                                  }}
                                  name={[name, fieldDef.dataIndex]}
                                >
                                  {((componentType === "input" || componentType === "text")) && (
                                    <Input placeholder={fieldDef.title} style={{width: 300}}/>
                                  )}
                                  {/* {((componentType === "title" || componentType === "label")) && (
                                    <span style={{width: 200, display: "block"}}>{fieldValueContainer.title}</span>
                                  )} */}
                                  {(componentType === "textarea") && (
                                    <Input.TextArea placeholder={fieldDef.title} style={{width: 300}}/>
                                  )}
                                  {(componentType === "file") && (
                                    <>
                                      <label>文件上传</label>
                                      <Input placeholder={fieldDef.title} style={{
                                        display: "none"
                                      }}
                                      />
                                    </>
                                  )}
                                  {(componentType === "picture") && (
                                    <>
                                      <label>图片上传</label>
                                      <Input placeholder={fieldDef.title} style={{
                                        display: "none"
                                      }}
                                      />
                                    </>
                                  )}
                                  {(componentType === "hidden") && (
                                    <div style={{
                                      display: "none"
                                    }}>
                                      <label>图片上传</label>
                                      <Input placeholder={fieldDef.title} style={{
                                        display: "none"
                                      }}
                                      />
                                    </div>
                                  )}
                                  {(componentType === "richedit") && (
                                    <>
                                      <SuperRichTextEdit
                                        key={uniqueId}
                                        editId={uniqueId}
                                        questionVarConfigList={props.questionVarConfigList}
                                        formVarConfigList={props.formVarConfigList}
                                        defaultFormVarConfigList={props.defaultFormVarConfigList}
                                        style={{
                                          width: '1200',
                                          minWidth: 500,
                                          height: 800,
                                          marginBottom: "40px",
                                          paddingBottom: "40px",
                                        }}
                                        theme="snow"/>
                                    </>

                                  )
                                  }
                                  {componentType === "number" && (
                                    <InputNumber placeholder={fieldDef.title} style={{width: 100}}/>
                                  )}
                                  {/*{componentType === "picture" && (*/}
                                  {/*  <>*/}
                                  {/*    <Image*/}
                                  {/*      width={200}*/}
                                  {/*      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"*/}
                                  {/*    />*/}
                                  {/*    <Input placeholder={field.title} style={{width: 300, display: "none"}} value={""}/>*/}
                                  {/*  </>*/}
                                  {/*)}*/}
                                  {componentType === "select" && (
                                    <Select placeholder={fieldDef.title}
                                            style={{
                                              width: width,
                                            }}
                                            onChange={(e) => {
                                              fieldValueContainer.value = form.getFieldValue(props.fieldName)[formListFieldName]
                                              console.debug("select on changed", fieldValueContainer)
                                              setNeedUpdate(new Date().getMilliseconds())
                                            }}
                                            options={selectOptions}/>
                                  )}
                                </Form.Item>
                                {fieldDef.dataIndex === "varInputType" && fieldValueContainer && fieldValueContainer.value && (["checkbox", "radio"].includes(fieldValueContainer.value.varInputType)) ? (
                                  <>
                                    <Form.Item name={[name, "optionValues"]}>
                                      <Input.TextArea placeholder={t("template.form_var_config.option_values")}
                                                      style={{width: 300}} rows={5}/>
                                    </Form.Item>
                                    <Form.Item name={[name, "alignment"]}>
                                      <Select placeholder={t("common.field.alignment")}
                                              options={codeList.Alignment}/>
                                    </Form.Item>
                                  </>) : <></>}
                                {fieldDef.dataIndex === "varInputType" && fieldValueContainer && fieldValueContainer.value && (["calc"].includes(fieldValueContainer.value.varInputType)) ? (
                                  <>
                                    <Form.Item name={[name, "expression"]}>
                                      <Input.TextArea placeholder={t("template.form_var_config.expression")}
                                                      style={{width: 300}} rows={5}/>
                                    </Form.Item>
                                  </>) : <></>}
                                {showAdd && componentType === "richedit" ? (
                                  <>
                                    <div style={{
                                      display: 'flex',
                                      flexDirection: 'column'
                                    }}>
                                      <Form.Item name={[name, "cargoNameList"]}
                                                 style={{
                                                   width: 300
                                                 }}
                                                 label={t("template.form_section_template.cargo_name_list")}>
                                        <Checkbox.Group
                                          options={
                                            codeList.CargoName
                                          }
                                        />
                                      </Form.Item>
                                      <Form.Item name={[name, "operationType"]}
                                                 style={{
                                                   width: 100
                                                 }}
                                                 label={t("template.form_question_template.operation_type")}>
                                        <Select
                                          allowClear={true}
                                          options={
                                            codeList.OperationType
                                          }
                                          placeholder={t("template.form_question_template.operation_type")}>
                                        </Select>
                                      </Form.Item>
                                      <Form.Item name={[name, "domesticForeignTradeType"]}
                                                 style={{
                                                   width: 100
                                                 }}
                                                 label={t("template.form_question_template.domestic_foreign_trade_type")}>
                                        <Select
                                          allowClear={true}
                                          options={
                                            codeList.DomesticForeignTradeType
                                          }
                                          placeholder={t("template.form_question_template.domestic_foreign_trade_type")}>
                                        </Select>
                                      </Form.Item>
                                      <Form.Item name={[name, "canDynamicAdd"]}
                                                 style={{
                                                   width: 100
                                                 }}
                                                 label={t("template.form_question_template.can_dynamic_add")}>
                                        <Select
                                          allowClear={true}
                                          options={
                                            codeList.YesNo
                                          }
                                          placeholder={t("template.form_question_template.can_dynamic_add")}>
                                        </Select>
                                      </Form.Item>
                                      <Form.Item name={[name, "bindToCargo"]}
                                                 style={{
                                                   width: 100
                                                 }}
                                                 label={t("template.form_question_template.bind_to_cargo")}>
                                        <Select
                                          allowClear={true}
                                          options={
                                            codeList.YesNo
                                          }
                                          placeholder={t("template.form_question_template.bind_to_cargo")}>
                                        </Select>
                                      </Form.Item>
                                      <Form.Item name={[name, "initalCount"]}
                                                 style={{
                                                   width: 100
                                                 }}
                                                 label={t("template.form_question_template.inital_count")}>
                                        <InputNumber placeholder={t("template.form_question_template.inital_count")}>
                                        </InputNumber>
                                      </Form.Item>
                                    </div>
                                  </>) : <></>}
                              </>
                            )
                          })
                        }
                        <MinusCircleOutlined
                          style={{
                            display: !showAdd ? 'none' : '',
                            width: 50
                          }}
                          onClick={() => {
                            console.debug("remove row", formListFieldKey, formListFieldName, restField)
                            listOperation.remove(formListFieldName)
                          }}/>

                        {fieldName == 'subQuestionTemplateHtml' ?
                          <PlusCircleOutlined
                            style={{
                              display: !showAdd ? 'none' : '',
                              width: 50
                            }}
                            onClick={() => {
                              const newData = {
                                title: "",
                                html: '<p></p>',
                                value: "",
                                id: new Date().getUTCMilliseconds(),
                                subQuestionType: "3"
                              }
                              console.debug("insert-row", formListFieldKey, formListFieldName, restField, newData)
                              listOperation.add(newData, formListFieldName + 1);
                              handleSubmit();
                            }}/>
                          : <></>

                        }
                      </Space>
                    )
                  }
                )
              }
              <>
                {(
                  <div style={{
                    width: "100%"
                  }}
                  >
                    <Space style={{
                      width: "100%"
                    }}
                    >
                      {!props.addButtonType || props.addButtonType === "normal" ? (
                        <Button style={{display: !showAdd ? 'none' : ''}} onClick={() => {
                          const newData = {}
                          console.debug("add new row-1", newData)
                          listOperation.add(newData)
                        }} type="dashed"
                                block icon={<PlusOutlined/>}>
                          {t("common.button.add")}
                        </Button>
                      ) : (
                        <Dropdown menu={{items: inputTypeItems, onClick: onAddMenuClick}} placement="bottomLeft">
                          <Button style={{display: !showAdd ? 'none' : ''}} type="dashed"
                                  block icon={<PlusOutlined/>}>
                            {t("common.button.add")}
                          </Button>
                        </Dropdown>
                      )}
                    </Space>
                  </div>
                )
                }
              </>
            </Space>)
        }}
      </Form.List>
    </>
  )
}

export default DynamicForm
