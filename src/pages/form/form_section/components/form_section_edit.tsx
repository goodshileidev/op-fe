import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getFormSection, updateFormSection, createFormSection} from "@/common/service/form/form_section";
import {FormSectionType} from '@/common/data_type/form/form_section'
import {FormSectionRules} from './form_section_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";
import {FormType} from '@/common/data_type/form/form'



interface IFormSectionEditProps {
  formSectionId: string
  needReset: number
  needSubmit: number
    formId: string
    formData?: FormType

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

const FormSectionEdit: React.FC<IFormSectionEditProps> = ((props) => {
  const formSectionId = props.formSectionId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formSectionForm] = Form.useForm();
  const isEdit = formSectionId !== undefined && formSectionId !=='' && formSectionId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formSectionData, setFormSectionData] = useState<FormSectionType | any>({})

    const formId= props.formId
    const formData = props.formData


  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getFormSectionDetail = async (formSectionId: string) => {
    const response = await getFormSection(formSectionId);
    const {data, code} = response
    if (code === 200 && data) {
      formSectionForm.setFieldsValue({...data,})
      setFormSectionData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setFormSectionData(null);
    }
  }

  const createNewData:FormSectionType = () => {
    const newData:FormSectionType = {}

    return newData
  }

  useEffect(() => {
    console.debug("formSectionId", formSectionId)
    if (formSectionId && formSectionId!=="" && formSectionId!=="0") {
      getFormSectionDetail(formSectionId)
    } else {
      const newData:FormSectionType = createNewData()
      setFormSectionData(newData)
      formSectionForm.setFieldsValue(newData)
      formSectionForm.resetFields();
    }
  }, [formSectionId, formSectionForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formSectionForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formSectionForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await formSectionForm.validateFields();
    const errors = formSectionForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && formSectionId && formSectionId!=='0') {
      values.formSectionId = formSectionId
      updateFormSection(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('form.form_section')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      values.formId = formData.formId

      createFormSection(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.formSectionId){
            response.data.formSectionId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('form.form_section')}));
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
    formSectionForm.resetFields()
  }


  // // 编辑表单区块时候 获取表单区块数据失败
  // if (isEdit && formSectionId && (formSectionData === null || formSectionData.formSectionId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('form.form_section')}):t("common.title.add",{'entity':t('form.form_section')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('form.form_section')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('form.form_section')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/form/form_section/form_section_table')}>
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
<Form.Item name="sectionNo" label={t("form.form_section.section_no")}
    rules={FormSectionRules.sectionNo}
    >
    <Input placeholder={t("form.form_section.section_no")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="sectionName" label={t("form.form_section.section_name")}
    rules={FormSectionRules.sectionName}
    >
    <Input placeholder={t("form.form_section.section_name")} />
</Form.Item>
</Col>
    ))
  return items;
}
const createBasicComplexItems = () =>{
  const items = []

    items.push((
<Col className="gutter-row" span={24}>
<Form.Item name="summary" label={t("form.form_section.summary")}
   rules={FormSectionRules.summary}
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

    items.push((
<Col className="gutter-row" span={24}>
<Form.Item name="detailedContent" label={t("form.form_section.detailed_content")}
   rules={FormSectionRules.detailedContent}
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
<Row>
{createBasicComplexItems()}
</Row>
</>)},
{label: '流转设置',key: 'flow',children:(
  <>
</>)},
{label: '流转设置',key: 'content',children:(
  <>
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
        form={formSectionForm}
        layout="vertical"
        initialValues={formSectionData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFinish={handleSubmit}>
        {createInputFields()}

      </Form>
    </>
  )
})
export default FormSectionEdit;
