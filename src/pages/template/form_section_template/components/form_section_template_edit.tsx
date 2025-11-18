import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Tabs
} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'

import {
  createFormSectionTemplate,
  getFormSectionTemplate,
  updateFormSectionTemplate
} from "@/common/service/template/form_section_template";
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {FormSectionTemplateRules} from './form_section_template_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

import TableColumnConfigFormEditor from '@/components/table_column_config/table_column_config_form_editor'

import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'

const {RangePicker} = DatePicker;


interface IFormSectionTemplateEditProps {
  formSectionTemplateId: string
  needReset: number
  needSubmit: number
  formTemplateId: string

  onUpdate: any
  isOpen: boolean
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormSectionTemplateEdit: React.FC<IFormSectionTemplateEditProps> = ((props) => {
  const formSectionTemplateId = props.formSectionTemplateId
  const formTemplateId = props.formTemplateId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formSectionTemplateForm] = Form.useForm();
  const isEdit = formSectionTemplateId !== undefined && formSectionTemplateId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formSectionTemplateData, setFormSectionTemplateData] = useState<FormSectionTemplateType | any>({})
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [isTableColumnListFormEditorVisible, setIsTableColumnListFormEditorVisible] = useState(false);

  const [isVarConfigListFormEditorVisible, setIsVarConfigListFormEditorVisible] = useState(false);


  const getFormSectionTemplateDetail = async (formSectionTemplateId: string) => {
    const response = await getFormSectionTemplate(formSectionTemplateId);
    const {data, code} = response
    if (code === 200 && data) {
      formSectionTemplateForm.setFieldsValue({...data,})
      setFormSectionTemplateData(data)
    } else {
      setFormSectionTemplateData(null);
    }
  }

  useEffect(() => {
    if (formSectionTemplateId && formSectionTemplateId !== "" && formSectionTemplateId !== "0") {
      getFormSectionTemplateDetail(formSectionTemplateId)
    } else {
      setFormSectionTemplateData({})
      formSectionTemplateForm.resetFields();
    }
  }, [formSectionTemplateId, formSectionTemplateForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formSectionTemplateForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formSectionTemplateForm.submit();
    }
  }, [needSubmit])
  const handleReset = () => {
    formSectionTemplateForm.resetFields()
  }
  const handleSubmit = async () => {
    const values = await formSectionTemplateForm.validateFields();
    const errors = formSectionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    if (isSubmiting) {
      return false
    }
    setIsSubmiting(true)
    console.debug("handleSubmit", values)
    if (values.tableColumnList) {
      const num = new Date().getMilliseconds()
      for (let idx = 0; idx < values.tableColumnList.length; idx++) {
        const tableColumn = values.tableColumnList[idx]
        if (!tableColumn.columnKey) {
          tableColumn.columnKey = "columnKey" + (num + idx)
        }
      }
    }
    // 修改
    if (isEdit && formSectionTemplateId && formSectionTemplateId !== '0') {
      values.formSectionTemplateId = formSectionTemplateId
      updateFormSectionTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('template.form_section_template')}));
          response.data.formTemplateId = formTemplateId
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      }).finally(() => {
        setTimeout(() => {
          setIsSubmiting(false)
        }, 1000)
      });
      ;
    } else {
      // 新增
      values.formTemplateId = formTemplateId
      createFormSectionTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.formSectionTemplateId) {
            response.data.formSectionTemplateId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('template.form_section_template')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
          handleReset() // 创建成功之后重置表单，否则再次新增弹窗打开还有旧的数据
        } else {
          message.error(msg);
        }
      }).finally(() => {
        setTimeout(() => {
          setIsSubmiting(false)
        }, 1000)
      });
      ;
    }
  };


  // 编辑表单区块模版时候 获取表单区块模版数据失败
  // if (isEdit && formSectionTemplateId && (formSectionTemplateData === null || formSectionTemplateData.formSectionTemplateId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('template.form_section_template')}) : t("common.title.add", {'entity': t('template.form_section_template')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('template.form_section_template')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('template.form_section_template')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary"
  //                   onClick={() => history.push('/template/form_section_template/form_section_template_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }


  const onFieldsChange = (changedFields, allFields) => {
    console.debug("onFieldsChange", changedFields, allFields)
  }
  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.debug("onFinishFailed", values, errorFields)
  }
  const onValuesChange = (changedValues, allValues) => {
    console.debug("onValuesChange", changedValues, changedValues)
  }

  return (
    <>
      <Form form={formSectionTemplateForm}
            layout="vertical"
            initialValues={formSectionTemplateData}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        // style={{ maxWidth: 1920 }}
            disabled={formDisabled}
            onFieldsChange={onFieldsChange}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            onFinish={handleSubmit}>

        <Tabs
          defaultActiveKey="basic"
          items={[
            {
              label: '基本信息', key: 'basic', children: (
                <>
                  <Row gutter={[16, 24]}>
                    <Col className="gutter-row" span={8}>
                      <Form.Item name="sectionNo" label={t("template.form_section_template.section_no")}
                                 rules={FormSectionTemplateRules.sectionNo}
                      >
                        <Input placeholder={t("template.form_section_template.section_no")}/>
                      </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={8}>
                      <Form.Item name="sectionName" label={t("template.form_section_template.section_name")}
                                 rules={FormSectionTemplateRules.sectionName}
                      >
                        <Input placeholder={t("template.form_section_template.section_name")}/>
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={8}>
                      <Form.Item name="sortOrder" label={t("template.form_section_template.sort_order")}
                                 rules={FormSectionTemplateRules.sortOrder}
                      >
                        <InputNumber placeholder={t("template.form_section_template.sort_order")}/>
                      </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                      <Form.Item name="cargoNameList" label={t("template.form_section_template.cargo_name_list")}
                                 rules={FormSectionTemplateRules.cargoNameList}>
                        <Checkbox.Group
                          options={
                            codeList.CargoName
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={12}>
                      <Form.Item name="operationType" label={t("template.form_section_template.operation_type")}
                                 rules={FormSectionTemplateRules.operationType}
                      >
                        <Select
                          options={
                            codeList.OperationType
                          }
                          placeholder={t("template.form_section_template.operation_type")}>
                        </Select>
                      </Form.Item>
                    </Col>

                    <Col className="gutter-row" span={12}>
                      <Form.Item name="domesticForeignTradeType"
                                 label={t("template.form_section_template.domestic_foreign_trade_type")}
                                 rules={FormSectionTemplateRules.domesticForeignTradeType}
                      >
                        <Select
                          options={
                            codeList.DomesticForeignTradeType
                          }
                          placeholder={t("template.form_section_template.domestic_foreign_trade_type")}>
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col className="gutter-row" span={8}>
                    <Form.Item name="mainSubSectionType"
                               label={t("template.form_section_template.main_sub_section_type")}
                               rules={FormSectionTemplateRules.mainSubSectionType}
                    >
                      <Select
                        options={
                          codeList.MainSubSectionType
                        }
                        placeholder={t("template.form_section_template.main_sub_section_type")}>
                      </Select>
                    </Form.Item>
                  </Col> */}

                    {/* <Col className="gutter-row" span={8}>
                    <Form.Item name="sectionType" label={t("template.form_section_template.section_type")}
                               rules={FormSectionTemplateRules.sectionType}
                    >
                      <Select
                        options={
                          codeList.SectionType
                        }
                        placeholder={t("template.form_section_template.section_type")}>
                      </Select>
                    </Form.Item>
                  </Col> */}

                    <Col className="gutter-row" span={8}>
                      <Form.Item name="subSectionType" label={t("template.form_section_template.sub_section_type")}
                                 rules={FormSectionTemplateRules.subSectionType}
                      >
                        <Select
                          options={
                            codeList.SubSectionType
                          }
                          placeholder={t("template.form_section_template.sub_section_type")}>
                        </Select>
                      </Form.Item>
                    </Col>

                    {/*<Col className="gutter-row" span={24}>*/}
                    {/*  <Form.Item name="summary" label={t("template.form_section_template.summary")}*/}
                    {/*             rules={FormSectionTemplateRules.summary}*/}
                    {/*             style={{marginBottom: 60}}*/}
                    {/*  >*/}
                    {/*    <ReactQuill*/}
                    {/*      style={{*/}
                    {/*        height: 100*/}
                    {/*      }}*/}
                    {/*      theme="snow"/>*/}
                    {/*  </Form.Item>*/}
                    {/*</Col>*/}

                    {/*<Col className="gutter-row" span={24}>*/}
                    {/*  <Form.Item name="detailedContent" label={t("template.form_section_template.detailed_content")}*/}
                    {/*             rules={FormSectionTemplateRules.detailedContent}*/}
                    {/*             style={{marginBottom: 60}}*/}
                    {/*  >*/}
                    {/*    <ReactQuill*/}
                    {/*      style={{*/}
                    {/*        height: 100*/}
                    {/*      }}*/}
                    {/*      theme="snow"/>*/}
                    {/*  </Form.Item>*/}
                    {/*</Col>*/}
                  </Row>
                  <Row gutter={[16, 24]}>
                  </Row>
                  <Row gutter={[16, 24]}>
                  </Row>
                  <TableColumnConfigFormEditor
                    onUpdate={(data: any) => {
                      if (data !== null) {
                        formSectionTemplateData.tableColumnList = data
                      }
                    }}
                    fieldName="tableColumnList"
                    tableColumnConfigList={formSectionTemplateData.tableColumnList}/>
                  <FormVarConfigFormEditor
                    onUpdate={(data: any) => {
                      if (data !== null) {
                        formSectionTemplateData.varConfigList = data
                      }
                    }}
                    fieldTitle={t('template.section_var_config')}
                    fieldName="varConfigList"
                    formVarConfigList={formSectionTemplateData.varConfigList}/>
                </>)
            },
            // {
            //   label: '流转设置', key: 'flow', children: (
            //     <><Row gutter={[16, 24]}>
            //       <Col className="gutter-row" span={8}>
            //         <Form.Item name="viewerRoleList" label={t("template.form_section_template.viewer_role_list")}
            //                    valuePropName="checked"
            //                    rules={FormSectionTemplateRules.viewerRoleList}>
            //           <Checkbox.Group
            //             placeholder={t("template.form_section_template.viewer_role_list")}
            //             options={
            //               codeList.Role
            //             }
            //           />
            //         </Form.Item>
            //       </Col>


            //       <Col className="gutter-row" span={8}>
            //         <Form.Item name="editorRoleList" label={t("template.form_section_template.editor_role_list")}
            //                    valuePropName="checked"
            //                    rules={FormSectionTemplateRules.editorRoleList}>
            //           <Checkbox.Group
            //             placeholder={t("template.form_section_template.editor_role_list")}
            //             options={
            //               codeList.Role
            //             }
            //           />
            //         </Form.Item>
            //       </Col>


            //     </Row></>)
            // },
            // {
            //   label: '内容设计', key: 'content', children: (
            //     <><Row gutter={[16, 24]}>
            //       <Col className="gutter-row" span={24}>
            //         <Form.Item name="formatTemplateHtml"
            //                    label={t("template.form_section_template.format_template_html")}
            //                    rules={FormSectionTemplateRules.formatTemplateHtml}
            //                    style={{marginBottom: 60}}
            //         >
            //           <ReactQuill
            //             style={{
            //               height: 100
            //             }}
            //             theme="snow"/>
            //         </Form.Item>
            //       </Col>
            //     </Row>
            //     </>)
            // },

          ]}
        />


      </Form>
    </>
  )
})
export default FormSectionTemplateEdit;
