import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Select, Checkbox, Col, DatePicker, Form, Input, message, Row, Tabs} from 'antd'
import {createFormTemplate, getFormTemplate, updateFormTemplate} from "@/common/service/template/form_template";
import {FormTemplateType} from '@/common/data_type/template/form_template'
import {FormTemplateRules} from './form_template_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';


import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'
import {codeList} from "@/common/code_list/code_list_static";

const {RangePicker} = DatePicker;


interface IFormTemplateEditProps {
  formTemplateId: string
  formTemplateData?: FormTemplateType
  needReset: number
  needSubmit: number

  onUpdate: any
  onGetData: any
  isOpen: boolean
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormTemplateEdit: React.FC<IFormTemplateEditProps> = ((props) => {
  const formTemplateId = props.formTemplateId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formTemplateForm] = Form.useForm();
  const isEdit = formTemplateId !== undefined && formTemplateId !== '' && formTemplateId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formTemplateData, setFormTemplateData] = useState<FormTemplateType | any>(props.formTemplateData)


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getFormTemplateDetail = async (formTemplateId: string) => {
    const response = await getFormTemplate(formTemplateId);
    const {data, code} = response
    if (code === 200 && data) {
      formTemplateForm.setFieldsValue({...data,})
      setFormTemplateData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setFormTemplateData(null);
    }
  }

  const createNewData:FormTemplateType = () => {
    const newData:FormTemplateType = {}
    newData.cargoNameList = []
    newData.viewerRoleList = []
    newData.editorRoleList = []
    newData.recipientList = []
    newData.operationMode = []
    newData.displayPosition = []
    newData.varConfigList = []

    return newData
  }

  useEffect(() => {
    console.debug("formTemplateId", formTemplateId)
    if (!props.formTemplateData) {
      if (formTemplateId && formTemplateId !== "" && formTemplateId !== "0") {
        getFormTemplateDetail(formTemplateId)
      } else {
        const newData: FormTemplateType = createNewData()
        setFormTemplateData(newData)
        formTemplateForm.setFieldsValue(newData)
        formTemplateForm.resetFields();
      }
    }
  }, [formTemplateId, props.formTemplateData, formTemplateForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formTemplateForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formTemplateForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await formTemplateForm.validateFields();
    const errors = formTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && formTemplateId && formTemplateId !== '0') {
      values.formTemplateId = formTemplateId
      updateFormTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('template.form_template')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createFormTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.formTemplateId) {
            response.data.formTemplateId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('template.form_template')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    }
  };

  const handleReset = () => {
    formTemplateForm.resetFields()
  }


  // // 编辑表单模版时候 获取表单模版数据失败
  // if (isEdit && formTemplateId && (!formTemplateData || !formTemplateData.formTemplateId)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('template.form_template')}) : t("common.title.add", {'entity': t('template.form_template')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('template.form_template')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('template.form_template')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary"
  //                   onClick={() => history.push('/template/form_template/form_template_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

  const createBasicBasicItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="formTemplateName" label={t("template.form_template.form_template_name")}
                   rules={FormTemplateRules.formTemplateName}
        >
          <Input placeholder={t("template.form_template.form_template_name")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="formTemplateNo" label={t("template.form_template.form_template_no")}
                   rules={FormTemplateRules.formTemplateNo}
        >
          <Input placeholder={t("template.form_template.form_template_no")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="formTemplatePlatformNo" label={t("template.form_template.form_template_platform_no")}
                   rules={FormTemplateRules.formTemplatePlatformNo}
        >
          <Input.TextArea rows={2} placeholder={t("template.form_template.form_template_platform_no")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
  <Form.Item name="cargoNameList" label={t("template.form_template.cargo_name_list")}
    rules={FormTemplateRules.cargoNameList}>
    <Checkbox.Group
    placeholder={t("template.form_template.cargo_name_list")}
    options={
      codeList.CargoName
    }
  />
  </Form.Item>
</Col>

    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="operationType" label={t("template.form_template.operation_type")}
    rules={FormTemplateRules.operationType}
 >
 <Select
    options={
        codeList.OperationType
      }
    placeholder={t("template.form_template.operation_type")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="domesticForeignTradeType" label={t("template.form_template.domestic_foreign_trade_type")}
    rules={FormTemplateRules.domesticForeignTradeType}
 >
 <Select
    options={
        codeList.DomesticForeignTradeType
      }
    placeholder={t("template.form_template.domestic_foreign_trade_type")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="documentType" label={t("template.form_template.document_type")}
                   rules={FormTemplateRules.documentType}
        >
          <Input placeholder={t("template.form_template.document_type")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="documentTwoPart" label={t("template.form_template.document_two_part")}
                   rules={FormTemplateRules.documentTwoPart}
        >
          <Input placeholder={t("template.form_template.document_two_part")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="operationDemand" label={t("template.form_template.operation_demand")}
                   rules={FormTemplateRules.operationDemand}
        >
          <Input placeholder={t("template.form_template.operation_demand")}/>
        </Form.Item>
      </Col>
    ))

    // items.push((
    //   <Col className="gutter-row" span={12}>
    //     <Form.Item name="interactiveStatus" label={t("template.form_template.interactive_status")}
    //                rules={FormTemplateRules.interactiveStatus}
    //     >
    //       <Input placeholder={t("template.form_template.interactive_status")}/>
    //     </Form.Item>
    //   </Col>
    // ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="documentDescription" label={t("template.form_template.document_description")}
                   rules={FormTemplateRules.documentDescription}
        >
          <Input placeholder={t("template.form_template.document_description")}/>
        </Form.Item>
      </Col>
    ))
    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="displayPosition" label={t("template.form_template.display_position")}
                   rules={FormTemplateRules.displayPosition}>
          <Checkbox.Group
            placeholder={t("template.form_template.display_position")}
            options={
              codeList.DisplayPosition
            }
          />
        </Form.Item>
      </Col>

    ))

    return items;
  }
  // const createFlowBasicItems = () => {
  //     const items = []
  //
  //     items.push((
  //         <Col className="gutter-row" span={12}>
  //             <Form.Item name="viewerRoleList" label={t("template.form_template.viewer_role_list")}
  //                        valuePropName="checked"
  //                        rules={FormTemplateRules.viewerRoleList}>
  //                 <Checkbox.Group
  //                     placeholder={t("template.form_template.viewer_role_list")}
  //                     options={
  //                         codeList.Role
  //                     }
  //                 />
  //             </Form.Item>
  //         </Col>
  //
  //     ))
  //
  //     items.push((
  //         <Col className="gutter-row" span={12}>
  //             <Form.Item name="editorRoleList" label={t("template.form_template.editor_role_list")}
  //                        valuePropName="checked"
  //                        rules={FormTemplateRules.editorRoleList}>
  //                 <Checkbox.Group
  //                     placeholder={t("template.form_template.editor_role_list")}
  //                     options={
  //                         codeList.Role
  //                     }
  //                 />
  //             </Form.Item>
  //         </Col>
  //
  //     ))
  //
  //     items.push((
  //         <Col className="gutter-row" span={12}>
  //             <Form.Item name="recipientList" label={t("template.form_template.recipient_list")}
  //                        valuePropName="checked"
  //                        rules={FormTemplateRules.recipientList}>
  //                 <Checkbox.Group
  //                     placeholder={t("template.form_template.recipient_list")}
  //                     options={
  //                         codeList.RecipientList
  //                     }
  //                 />
  //             </Form.Item>
  //         </Col>
  //
  //     ))
  //     return items;
  // }
  // const createShowBasicItems = () => {
  //     const items = []
  //
  //     items.push((
  //         <Col className="gutter-row" span={12}>
  //             <Form.Item name="operationMode" label={t("template.form_template.operation_mode")}
  //                        valuePropName="checked"
  //                        rules={FormTemplateRules.operationMode}>
  //                 <Checkbox.Group
  //                     placeholder={t("template.form_template.operation_mode")}
  //                     options={
  //                         codeList.OperationMode
  //                     }
  //                 />
  //             </Form.Item>
  //         </Col>
  //
  //     ))
  //
  //     return items;
  // }
  // const createShowComplexItems = () => {
  //     const items = []
  //
  //     items.push((
  //         <Col className="gutter-row" span={24}>
  //             <Form.Item name="printTemplate" label={t("template.form_template.print_template")}
  //                        rules={FormTemplateRules.printTemplate}
  //                        style={{marginBottom: 60}}
  //             >
  //                 <ReactQuill
  //                     style={{
  //                         height: 100
  //                     }}
  //                     theme="snow"/>
  //             </Form.Item>
  //         </Col>
  //     ))
  //
  //     items.push((
  //         <Col className="gutter-row" span={24}>
  //             <Form.Item name="editableTimeOnMiniProgram"
  //                        label={t("template.form_template.editable_time_on_mini_program")}
  //                        rules={FormTemplateRules.editableTimeOnMiniProgram}>
  //                 <Editor
  //                     height={'200px'}
  //                     width={'100%'}
  //                     language={"json"}
  //                     defaultValue={"{}"}
  //                     theme="vs-dark"
  //                 />
  //             </Form.Item>
  //         </Col>
  //     ))
  //     return items;
  // }
  // const createContentBasicItems = () => {
  //     const items = []
  //
  //     items.push((
  //         <Col className="gutter-row" span={12}>
  //             <Form.Item name="isSignatureRequired" label={t("template.form_template.is_signature_required")}
  //                        valuePropName="checked"
  //                        rules={FormTemplateRules.isSignatureRequired}>
  //                 <Radio.Group
  //                     options={
  //                         codeList.YesNo
  //                     }
  //                     placeholder={t("template.form_template.is_signature_required")}
  //                     optionType="button"
  //                     buttonStyle="solid"
  //                 />
  //             </Form.Item>
  //         </Col>
  //     ))
  //
  //     items.push((
  //         <Col className="gutter-row" span={12}>
  //             <Form.Item name="isStampSignatureRequired"
  //                        label={t("template.form_template.is_stamp_signature_required")} valuePropName="checked"
  //                        rules={FormTemplateRules.isStampSignatureRequired}>
  //                 <Radio.Group
  //                     options={
  //                         codeList.YesNo
  //                     }
  //                     placeholder={t("template.form_template.is_stamp_signature_required")}
  //                     optionType="button"
  //                     buttonStyle="solid"
  //                 />
  //             </Form.Item>
  //         </Col>
  //     ))
  //     return items;
  // }
  // const createContentComplexItems = () => {
  //     const items = []
  //
  //     items.push((
  //         <Col className="gutter-row" span={24}>
  //             <Form.Item name="previewHtml" label={t("template.form_template.preview_html")}
  //                        rules={FormTemplateRules.previewHtml}
  //                        style={{marginBottom: 60}}
  //             >
  //                 <ReactQuill
  //                     style={{
  //                         height: 100
  //                     }}
  //                     theme="snow"/>
  //             </Form.Item>
  //         </Col>
  //     ))
  //     return items;
  // }


  const createInputFields = (conditionValue: string) => {
    const items = []
    items.push((
      <Tabs
        defaultActiveKey="basic"
        items={[
          {
            label: '基本信息', key: 'basic', children: (
              <>
                <Row>
                  {createBasicBasicItems()}
                </Row>
              </>)
          },
          // {
          //     label: '流转设置', key: 'flow', children: (
          //         <>
          //             <Row>
          //                 {createFlowBasicItems()}
          //             </Row>
          //         </>)
          // },
          // {
          //     label: '展示设置', key: 'show', children: (
          //         <>
          //             <Row>
          //                 {createShowBasicItems()}
          //             </Row>
          //             <Row>
          //                 {createShowComplexItems()}
          //             </Row>
          //         </>)
          // },
          // {
          //     label: '内容设计', key: 'content', children: (
          //         <>
          //             <Row>
          //                 {createContentBasicItems()}
          //             </Row>
          //             <Row>
          //                 {createContentComplexItems()}
          //             </Row>
          //         </>)
          // },

        ]}
      />
    ));

    return items;
  }

  const onFieldsChange = (changedFields, allFields) => {
    console.debug("onFieldsChange", changedFields, allFields)
  }
  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.debug("onFinishFailed", values, errorFields)
  }
  const onValuesChange = (changedValues, allValues) => {
    console.debug("onValuesChange", changedValues, allValues)
  }

  return (
    <>
      <Form
        form={formTemplateForm}
        layout="vertical"
        initialValues={formTemplateData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFinish={handleSubmit}>
        {createInputFields()}
        {formTemplateData ? <>

          <FormVarConfigFormEditor
            fieldName="varConfigList"
            fieldTitle={t("template.form_template.var_config_list")}
            formVarConfigList={formTemplateData.varConfigList}/>

        </> : <></>}
      </Form>
    </>
  )
})
export default FormTemplateEdit;
