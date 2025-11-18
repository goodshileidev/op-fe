import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getDocumentTemplateVersion, updateDocumentTemplateVersion, createDocumentTemplateVersion} from "@/common/service/template/document_template_version";
import {DocumentTemplateVersionType} from '@/common/data_type/template/document_template_version'
import {DocumentTemplateVersionRules} from './document_template_version_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";

import SendConfigFormEditor from '@/components/send_config/send_config_form_editor'
    
import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'
    

interface IDocumentTemplateVersionEditProps {
  documentTemplateVersionId: string
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
const DocumentTemplateVersionEdit: React.FC<IDocumentTemplateVersionEditProps> = ((props) => {
  const documentTemplateVersionId = props.documentTemplateVersionId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [documentTemplateVersionForm] = Form.useForm();
  const isEdit = documentTemplateVersionId !== undefined && documentTemplateVersionId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [documentTemplateVersionData, setDocumentTemplateVersionData] = useState<DocumentTemplateVersionType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isOpen


  const [isSubmissionSettingsFormEditorVisible, setIsSubmissionSettingsFormEditorVisible] = useState(false);
    
  const [isVarConfigListFormEditorVisible, setIsVarConfigListFormEditorVisible] = useState(false);
    

  const [codeListFormTemplate, setCodeListFormTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListFormTemplate({}).then((FormTemplateCodeList)=>{
      setCodeListFormTemplate(FormTemplateCodeList)
      console.debug("FormTemplateCodeList", FormTemplateCodeList)
    })
  }, [])



  const getDocumentTemplateVersionDetail = async (documentTemplateVersionId: string) => {
    const response = await getDocumentTemplateVersion(documentTemplateVersionId);
    const {data, code} = response
    if (code === 200 && data) {
      documentTemplateVersionForm.setFieldsValue({...data,})
      setDocumentTemplateVersionData(data)
    } else {
      setDocumentTemplateVersionData(null);
    }
  }

  useEffect(() => {
    if (documentTemplateVersionId && documentTemplateVersionId!=="" && documentTemplateVersionId!=="0") {
      getDocumentTemplateVersionDetail(documentTemplateVersionId)
    } else {
      setDocumentTemplateVersionData({})
      documentTemplateVersionForm.resetFields();
    }
  }, [documentTemplateVersionId, documentTemplateVersionForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      documentTemplateVersionForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      documentTemplateVersionForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await documentTemplateVersionForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && documentTemplateVersionId && documentTemplateVersionId!=='0') {
      values.documentTemplateVersionId = documentTemplateVersionId
      updateDocumentTemplateVersion(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('template.document_template_version')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createDocumentTemplateVersion(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.documentTemplateVersionId){
            response.data.documentTemplateVersionId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('template.document_template_version')}));
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
    documentTemplateVersionForm.resetFields()
  }


  // 编辑一体化表单模版版本时候 获取一体化表单模版版本数据失败
  // if (isEdit && documentTemplateVersionId && (documentTemplateVersionData === null || documentTemplateVersionData.documentTemplateVersionId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('template.document_template_version')}):t("common.title.add",{'entity':t('template.document_template_version')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('template.document_template_version')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('template.document_template_version')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/template/document_template_version/document_template_version_table')}>
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
      <Form form={documentTemplateVersionForm}
                layout="vertical"
                initialValues={documentTemplateVersionData}
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
<Form.Item name="bizType" label={t("template.document_template_version.biz_type")}
    rules={DocumentTemplateVersionRules.bizType}
 >
 <Select
    options={
        codeList.BizType
      }
    placeholder={t("template.document_template_version.biz_type")} >
 </Select>
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="templateName" label={t("template.document_template_version.template_name")}
    rules={DocumentTemplateVersionRules.templateName}
    >
    <Input placeholder={t("template.document_template_version.template_name")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="versionNo" label={t("template.document_template_version.version_no")}
    rules={DocumentTemplateVersionRules.versionNo}
    >
    <Input placeholder={t("template.document_template_version.version_no")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={24}>
<Form.Item name="coverTemplateHtml" label={t("template.document_template_version.cover_template_html")}
   rules={DocumentTemplateVersionRules.coverTemplateHtml}
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
  <Form.Item name="recipientList" label={t("template.document_template_version.recipient_list")} valuePropName="checked"
    rules={DocumentTemplateVersionRules.recipientList}>
    <Checkbox.Group
    placeholder={t("template.document_template_version.recipient_list")}
    options={
      codeList.RecipientList
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={24}>
<Form.Item name="usageScenarioDescription" label={t("template.document_template_version.usage_scenario_description")}
   rules={DocumentTemplateVersionRules.usageScenarioDescription}
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
<Form.Item name="submissionRecipientUnit" label={t("template.document_template_version.submission_recipient_unit")}
    rules={DocumentTemplateVersionRules.submissionRecipientUnit}
    >
    <Input placeholder={t("template.document_template_version.submission_recipient_unit")} />
</Form.Item>
</Col>


        </Row>

      <SendConfigFormEditor 
        onUpdate={(data:any)=> {
          if (data!==null){
            documentTemplateVersionData.submissionSettings= data
          } 
        }} 
        fieldName = "submissionSettings" 
        sendConfigList={documentTemplateVersionData.submissionSettings} />
    
      <FormVarConfigFormEditor 
        onUpdate={(data:any)=> {
          if (data!==null){
            documentTemplateVersionData.varConfigList= data
          } 
        }} 
        fieldName = "varConfigList" 
        formVarConfigList={documentTemplateVersionData.varConfigList} />
    
      </Form>
    </>
  )
})
export default DocumentTemplateVersionEdit;
