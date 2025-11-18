import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getFormTemplateVersion, updateFormTemplateVersion, createFormTemplateVersion} from "@/common/service/template/form_template_version";
import {FormTemplateVersionType} from '@/common/data_type/template/form_template_version'
import {FormTemplateVersionRules} from './form_template_version_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";

import SendConfigFormEditor from '@/components/send_config/send_config_form_editor'
    
import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'
    

interface IFormTemplateVersionEditProps {
  formTemplateVersionId: string
  needReset: number
  needSubmit: number

  onUpdate: any
  isOpen: boolean
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormTemplateVersionEdit: React.FC<IFormTemplateVersionEditProps> = ((props) => {
  const formTemplateVersionId = props.formTemplateVersionId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formTemplateVersionForm] = Form.useForm();
  const isEdit = formTemplateVersionId !== undefined && formTemplateVersionId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formTemplateVersionData, setFormTemplateVersionData] = useState<FormTemplateVersionType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isOpen


  const [isSubmissionSettingsFormEditorVisible, setIsSubmissionSettingsFormEditorVisible] = useState(false);
    
  const [isVarConfigListFormEditorVisible, setIsVarConfigListFormEditorVisible] = useState(false);
    



  const getFormTemplateVersionDetail = async (formTemplateVersionId: string) => {
    const response = await getFormTemplateVersion(formTemplateVersionId);
    const {data, code} = response
    if (code === 200 && data) {
      formTemplateVersionForm.setFieldsValue({...data,})
      setFormTemplateVersionData(data)
    } else {
      setFormTemplateVersionData(null);
    }
  }

  useEffect(() => {
    if (formTemplateVersionId && formTemplateVersionId!=="" && formTemplateVersionId!=="0") {
      getFormTemplateVersionDetail(formTemplateVersionId)
    } else {
      setFormTemplateVersionData({})
      formTemplateVersionForm.resetFields();
    }
  }, [formTemplateVersionId, formTemplateVersionForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formTemplateVersionForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formTemplateVersionForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await formTemplateVersionForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && formTemplateVersionId && formTemplateVersionId!=='0') {
      values.formTemplateVersionId = formTemplateVersionId
      updateFormTemplateVersion(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('template.form_template_version')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createFormTemplateVersion(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.formTemplateVersionId){
            response.data.formTemplateVersionId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('template.form_template_version')}));
          if (props.onUpdate){
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    }
  };

  const handleReset = () => {
    formTemplateVersionForm.resetFields()
  }


  // 编辑表单模版版本时候 获取表单模版版本数据失败
  // if (isEdit && formTemplateVersionId && (formTemplateVersionData === null || formTemplateVersionData.formTemplateVersionId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('template.form_template_version')}):t("common.title.add",{'entity':t('template.form_template_version')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('template.form_template_version')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('template.form_template_version')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/template/form_template_version/form_template_version_table')}>
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
      <Form form={formTemplateVersionForm}
                layout="vertical"
                initialValues={formTemplateVersionData}
                // labelCol={{ span: 4 }}
                // wrapperCol={{ span: 14 }}
                // style={{ maxWidth: 1920 }}
                disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
                onFinish={handleSubmit}>
        <Row gutter={[16, 24]}>
<Col className="gutter-row" span={12}>
<Form.Item name="versionNo" label={t("template.form_template_version.version_no")}
    rules={FormTemplateVersionRules.versionNo}
    >
    <Input placeholder={t("template.form_template_version.version_no")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="publishTime" label={t("template.form_template_version.publish_time")}
    rules={FormTemplateVersionRules.publishTime}
    >
    <Input placeholder={t("template.form_template_version.publish_time")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="formName" label={t("template.form_template_version.form_name")}
    rules={FormTemplateVersionRules.formName}
    >
    <Input placeholder={t("template.form_template_version.form_name")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="formNo" label={t("template.form_template_version.form_no")}
    rules={FormTemplateVersionRules.formNo}
    >
    <Input placeholder={t("template.form_template_version.form_no")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
  <Form.Item name="viewerRoleList" label={t("template.form_template_version.viewer_role_list")} valuePropName="checked"
    rules={FormTemplateVersionRules.viewerRoleList}>
    <Checkbox.Group
    placeholder={t("template.form_template_version.viewer_role_list")}
    options={
      codeList.Role
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={12}>
  <Form.Item name="editorRoleList" label={t("template.form_template_version.editor_role_list")} valuePropName="checked"
    rules={FormTemplateVersionRules.editorRoleList}>
    <Checkbox.Group
    placeholder={t("template.form_template_version.editor_role_list")}
    options={
      codeList.Role
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={24}>
<Form.Item name="printTemplate" label={t("template.form_template_version.print_template")}
   rules={FormTemplateVersionRules.printTemplate}
   style={{marginBottom: 60}}
   >
    <ReactQuill
        style={{
          height:100
        }}
        theme="snow" />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
  <Form.Item name="recipientList" label={t("template.form_template_version.recipient_list")} valuePropName="checked"
    rules={FormTemplateVersionRules.recipientList}>
    <Checkbox.Group
    placeholder={t("template.form_template_version.recipient_list")}
    options={
      codeList.RecipientList
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={12}>
  <Form.Item name="operationMode" label={t("template.form_template_version.operation_mode")} valuePropName="checked"
    rules={FormTemplateVersionRules.operationMode}>
    <Checkbox.Group
    placeholder={t("template.form_template_version.operation_mode")}
    options={
      codeList.OperationMode
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={24}>
<Form.Item name="previewHtml" label={t("template.form_template_version.preview_html")}
   rules={FormTemplateVersionRules.previewHtml}
   style={{marginBottom: 60}}
   >
    <ReactQuill
        style={{
          height:100
        }}
        theme="snow" />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="reminderSettings" label={t("template.form_template_version.reminder_settings")}
    rules={FormTemplateVersionRules.reminderSettings}
    >
    <Input placeholder={t("template.form_template_version.reminder_settings")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
  <Form.Item name="isSignatureRequired" label={t("template.form_template_version.is_signature_required")} valuePropName="checked"
    rules={FormTemplateVersionRules.isSignatureRequired}>
    <Radio.Group
        options={
        codeList.YesNo
        }
        placeholder={t("template.form_template_version.is_signature_required")}
        optionType="button"
        buttonStyle="solid"
      />
  </Form.Item>
</Col>

<Col className="gutter-row" span={12}>
  <Form.Item name="isStampSignatureRequired" label={t("template.form_template_version.is_stamp_signature_required")} valuePropName="checked"
    rules={FormTemplateVersionRules.isStampSignatureRequired}>
    <Radio.Group
        options={
        codeList.YesNo
        }
        placeholder={t("template.form_template_version.is_stamp_signature_required")}
        optionType="button"
        buttonStyle="solid"
      />
  </Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="submissionRecipientUnit" label={t("template.form_template_version.submission_recipient_unit")}
    rules={FormTemplateVersionRules.submissionRecipientUnit}
    >
    <Input placeholder={t("template.form_template_version.submission_recipient_unit")} />
</Form.Item>
</Col>


        </Row>

      <SendConfigFormEditor 
        onUpdate={(data:any)=> {
          if (data!==null){
            formTemplateVersionData.submissionSettings= data
          } 
        }} 
        fieldName = "submissionSettings" 
        sendConfigList={formTemplateVersionData.submissionSettings} />
    
      <FormVarConfigFormEditor 
        onUpdate={(data:any)=> {
          if (data!==null){
            formTemplateVersionData.varConfigList= data
          } 
        }} 
        fieldName = "varConfigList" 
        formVarConfigList={formTemplateVersionData.varConfigList} />
    
      </Form>
    </>
  )
})
export default FormTemplateVersionEdit;
