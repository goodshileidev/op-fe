import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Col, DatePicker, Form, Input, message, Row, Select, Tabs} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'
import {
  createDocumentTemplate,
  getDocumentTemplate,
  updateDocumentTemplate
} from "@/common/service/template/document_template";
import {DocumentTemplateType} from '@/common/data_type/template/document_template'
import {DocumentTemplateRules} from './document_template_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import DocumentStepFormEditor from '@/components/document_step/document_step_form_editor'

import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'

const {RangePicker} = DatePicker;


interface IDocumentTemplateEditProps {
  documentTemplateId: string
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

const DocumentTemplateEdit: React.FC<IDocumentTemplateEditProps> = ((props) => {
  const documentTemplateId = props.documentTemplateId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [documentTemplateForm] = Form.useForm();
  const isEdit = documentTemplateId !== undefined && documentTemplateId !== '' && documentTemplateId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [documentTemplateData, setDocumentTemplateData] = useState<DocumentTemplateType | any>({})


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getDocumentTemplateDetail = async (documentTemplateId: string) => {
    const response = await getDocumentTemplate(documentTemplateId);
    const {data, code} = response
    if (code === 200 && data) {
      documentTemplateForm.setFieldsValue({...data,})
      setDocumentTemplateData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setDocumentTemplateData(null);
    }
  }

  const createNewData: DocumentTemplateType = () => {
    const newData: DocumentTemplateType = {}
    newData.shipType = []
    newData.varConfigList = []
    newData.editorRoleList = []
    newData.recipientList = []

    return newData
  }

  useEffect(() => {
    console.debug("documentTemplateId", documentTemplateId)
    if (documentTemplateId && documentTemplateId !== "" && documentTemplateId !== "0") {
      getDocumentTemplateDetail(documentTemplateId)
    } else {
      const newData: DocumentTemplateType = createNewData()
      setDocumentTemplateData(newData)
      documentTemplateForm.setFieldsValue(newData)
      documentTemplateForm.resetFields();
    }
  }, [documentTemplateId, documentTemplateForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      documentTemplateForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      documentTemplateForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await documentTemplateForm.validateFields();
    const errors = documentTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && documentTemplateId && documentTemplateId !== '0') {
      values.documentTemplateId = documentTemplateId
      updateDocumentTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('template.document_template')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createDocumentTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.documentTemplateId) {
            response.data.documentTemplateId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('template.document_template')}));
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
    documentTemplateForm.resetFields()
  }


  // // 编辑一体化表单模版时候 获取一体化表单模版数据失败
  // if (isEdit && documentTemplateId && (documentTemplateData === null || documentTemplateData.documentTemplateId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('template.document_template')}) : t("common.title.add", {'entity': t('template.document_template')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('template.document_template')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('template.document_template')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary"
  //                   onClick={() => history.push('/template/document_template/document_template_table')}>
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
        <Form.Item name="bizType" label={t("template.document_template.biz_type")}
                   rules={DocumentTemplateRules.bizType}
        >
          <Select
            options={
              codeList.BizType
            }
            placeholder={t("template.document_template.biz_type")}>
          </Select>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="templateName" label={t("template.document_template.template_name")}
                   rules={DocumentTemplateRules.templateName}
        >
          <Input placeholder={t("template.document_template.template_name")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="templateNo" label={t("template.document_template.template_no")}
                   rules={DocumentTemplateRules.templateNo}
        >
          <Input placeholder={t("template.document_template.template_no")}/>
        </Form.Item>
      </Col>
    ))

    return items;
  }
  const createBasicComplexItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={24}>
        <Form.Item name="usageScenarioDescription" label={t("template.document_template.usage_scenario_description")}
                   rules={DocumentTemplateRules.usageScenarioDescription}
                   style={{marginBottom: 60}}
        >
          <ReactQuill
            style={{
              height: 100
            }}
            theme="snow"/>
        </Form.Item>
      </Col>
    ))
    return items;
  }
  const createContentComplexItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={24}>
        <Form.Item name="coverTemplateHtml" label={t("template.document_template.cover_template_html")}
                   rules={DocumentTemplateRules.coverTemplateHtml}
                   style={{marginBottom: 60}}
        >
          <ReactQuill
            style={{
              height: 100
            }}
            theme="snow"/>
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
          {
            label: '基本信息', key: 'basic', children: (
              <>
                <Row>
                  {createBasicBasicItems()}
                </Row>
                <Row>
                  {createBasicComplexItems()}
                </Row>
              </>)
          },
          {
            label: '内容设计', key: 'content', children: (
              <>
                <Row>
                  {createContentComplexItems()}
                </Row>
              </>)
          },
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
        form={documentTemplateForm}
        layout="vertical"
        initialValues={documentTemplateData}
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
          fieldName="stepDefinition"
          fieldLabel={t("template.document_template.step_definition")}
          documentStepList={documentTemplateData.stepDefinition}/>

        {/*<SendConfigFormEditor*/}
        {/*  fieldName="submissionSettings"*/}
        {/*  fieldLabel={t("template.document_template.submission_settings")}*/}
        {/*  sendConfigList={documentTemplateData.submissionSettings}/>*/}

        <FormVarConfigFormEditor
          fieldName="varConfigList"
          fieldLabel={t("template.document_template.var_config_list")}
          formVarConfigList={documentTemplateData.varConfigList}/>

      </Form>
    </>
  )
})
export default DocumentTemplateEdit;
