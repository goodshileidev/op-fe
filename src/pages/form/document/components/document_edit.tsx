import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getDocument, updateDocument, createDocument} from "@/common/service/form/document";
import {DocumentType} from '@/common/data_type/form/document'
import {DocumentRules} from './document_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";


import DocumentStepFormEditor from '@/components/document_step/document_step_form_editor'
    

interface IDocumentEditProps {
  documentId: string
  needReset: number
  needSubmit: number

  onUpdate: any
  isOpen: boolean
  onGetData: any
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const DocumentEdit: React.FC<IDocumentEditProps> = ((props) => {
  const documentId = props.documentId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [documentForm] = Form.useForm();
  const isEdit = documentId !== undefined && documentId !=='' && documentId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [documentData, setDocumentData] = useState<DocumentType | any>({})



  const { t } = useTranslation();
  let isOpen = props.isOpen


    



  const getDocumentDetail = async (documentId: string) => {
    const response = await getDocument(documentId);
    const {data, code} = response
    if (code === 200 && data) {
      documentForm.setFieldsValue({...data,})
      setDocumentData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setDocumentData(null);
    }
  }

  const createNewData:DocumentType = () => {
    const newData:DocumentType = {}
    newData.editorRoleList = []

    return newData
  }

  useEffect(() => {
    console.debug("documentId", documentId)
    if (documentId && documentId!=="" && documentId!=="0") {
      getDocumentDetail(documentId)
    } else {
      const newData:DocumentType = createNewData()
      setDocumentData(newData)
      documentForm.setFieldsValue(newData)
      documentForm.resetFields();
    }
  }, [documentId, documentForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      documentForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      documentForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await documentForm.validateFields();
    const errors = documentForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && documentId && documentId!=='0') {
      values.documentId = documentId
      updateDocument(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('form.document')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createDocument(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.documentId){
            response.data.documentId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('form.document')}));
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
    documentForm.resetFields()
  }


  // // 编辑一体化表单时候 获取一体化表单数据失败
  // if (isEdit && documentId && (documentData === null || documentData.documentId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('form.document')}):t("common.title.add",{'entity':t('form.document')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('form.document')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('form.document')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/form/document/document_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

const createBasicBasicItems = () =>{
  const items = []

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="bizType" label={t("form.document.biz_type")}
    rules={DocumentRules.bizType}
 >
 <Select
    options={
        codeList.BizType
      }
    placeholder={t("form.document.biz_type")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="dataDate" label={t("form.document.data_date")}
    rules={DocumentRules.dataDate}
    >
    <Input placeholder={t("form.document.data_date")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="templateName" label={t("form.document.template_name")}
    rules={DocumentRules.templateName}
    >
    <Input placeholder={t("form.document.template_name")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="templateNo" label={t("form.document.template_no")}
    rules={DocumentRules.templateNo}
    >
    <Input placeholder={t("form.document.template_no")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="currentVersion" label={t("form.document.current_version")}
    rules={DocumentRules.currentVersion}
    >
    <Input placeholder={t("form.document.current_version")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="documentNo" label={t("form.document.document_no")}
    rules={DocumentRules.documentNo}
    >
    <Input placeholder={t("form.document.document_no")} />
</Form.Item>
</Col>
    ))
  return items;
}
const createContentComplexItems = () =>{
  const items = []

    items.push((
<Col className="gutter-row" span={24}>
<Form.Item name="coverTemplateHtml" label={t("form.document.cover_template_html")}
   rules={DocumentRules.coverTemplateHtml}
   style={{marginBottom: 60}}
   >
    <ReactQuill
        style={{
          height:100
        }}
        theme="snow" />
</Form.Item>
</Col>
    ))
  return items;
}
const createFlowBasicItems = () =>{
  const items = []

    items.push((
<Col className="gutter-row" span={12}>
  <Form.Item name="editorRoleList" label={t("form.document.editor_role_list")} valuePropName="checked"
    rules={DocumentRules.editorRoleList}>
    <Checkbox.Group
    placeholder={t("form.document.editor_role_list")}
    options={
      codeList.Role
    }
  />
  </Form.Item>
</Col>

    ))
  return items;
}


  const createInputFields = (conditionValue: string) => {
    const items = []
    items.push((
<Tabs
    defaultActiveKey="basic"
    items={[
    {label: '基本信息',key: 'basic',children:(
  <>
<Row>
{createBasicBasicItems()}
</Row>
</>)},
{label: '内容设计',key: 'content',children:(
  <>
<Row>
{createContentComplexItems()}
</Row>
</>)},
{label: '流转设置',key: 'flow',children:(
  <>
<Row>
{createFlowBasicItems()}
</Row>
</>)},

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
        form={documentForm}
        layout="vertical"
        initialValues={documentData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFinish={handleSubmit}>
        {createInputFields()}

      <DocumentStepFormEditor
        fieldName = "stepDefinition"
        fieldLabel = {t("form.document.step_definition")} 
        documentStepList={documentData.stepDefinition} />
    
      </Form>
    </>
  )
})
export default DocumentEdit;
