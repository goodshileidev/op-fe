import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Col, DatePicker, Form, message, Row, Tabs} from 'antd'
import {createFormQuestion, getFormQuestion, updateFormQuestion} from "@/common/service/form/form_question";
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {FormQuestionRules} from './form_question_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {FormType} from '@/common/data_type/form/form'
import {FormSectionType} from '@/common/data_type/form/form_section'
import FormVarValueFormEditor from "@/components/form_var_value/form_var_value_form_editor";

const {RangePicker} = DatePicker;


interface IFormQuestionEditProps {
  formQuestionId: string
  needReset: number
  needSubmit: number
  formId: string
  formData?: FormType
  formSectionId: string
  formSectionData?: FormSectionType

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

const FormQuestionEdit: React.FC<IFormQuestionEditProps> = ((props) => {
  const formQuestionId = props.formQuestionId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formQuestionForm] = Form.useForm();
  const isEdit = formQuestionId !== undefined && formQuestionId !== '' && formQuestionId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formQuestionData, setFormQuestionData] = useState<FormQuestionType | any>({})

  const formId = props.formId
  const formData = props.formData
  const formSectionId = props.formSectionId
  const formSectionData = props.formSectionData


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getFormQuestionDetail = async (formQuestionId: string) => {
    const response = await getFormQuestion(formQuestionId);
    const {data, code} = response
    if (code === 200 && data) {
      formQuestionForm.setFieldsValue({...data,})
      setFormQuestionData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setFormQuestionData(null);
    }
  }

  const createNewData: FormQuestionType = () => {
    const newData: FormQuestionType = {}

    return newData
  }

  useEffect(() => {
    console.debug("formQuestionId", formQuestionId)
    if (formQuestionId && formQuestionId !== "" && formQuestionId !== "0") {
      getFormQuestionDetail(formQuestionId)
    } else {
      const newData: FormQuestionType = createNewData()
      setFormQuestionData(newData)
      formQuestionForm.setFieldsValue(newData)
      formQuestionForm.resetFields();
    }
  }, [formQuestionId, formQuestionForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formQuestionForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formQuestionForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await formQuestionForm.validateFields();
    const errors = formQuestionForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && formQuestionId && formQuestionId !== '0') {
      values.formQuestionId = formQuestionId
      updateFormQuestion(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('form.form_question')}));
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
      values.formSectionId = formSectionData.formSectionId

      createFormQuestion(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.formQuestionId) {
            response.data.formQuestionId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('form.form_question')}));
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
    formQuestionForm.resetFields()
  }


  // // 编辑表单问题时候 获取表单问题数据失败
  // if (isEdit && formQuestionId && (formQuestionData === null || formQuestionData.formQuestionId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('form.form_question')}) : t("common.title.add", {'entity': t('form.form_question')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('form.form_question')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('form.form_question')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/form/form_question/form_question_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

  const createBasicComplexItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={24}>
        <Form.Item name="detailedDescription" label={t("form.form_question.detailed_description")}
                   rules={FormQuestionRules.detailedDescription}
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

    items.push((
      <Col className="gutter-row" span={24}>
        <Form.Item name="remark" label={t("form.form_question.remark")}
                   rules={FormQuestionRules.remark}
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
                  {createBasicComplexItems()}
                </Row>
              </>)
          },
          {
            label: '内容设计', key: 'content', children: (
              <>
              </>)
          },
          {
            label: '内容设计', key: 'flow', children: (
              <>
              </>)
          },
          {
            label: '内容设计', key: 'show', children: (
              <>
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
        form={formQuestionForm}
        layout="vertical"
        initialValues={formQuestionData}
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
      <FormVarValueFormEditor
        fieldName="varDataList"
        fieldLabel={t("form.form_question.var_data_list")}
        formVarConfigList={formQuestionData.varDataList}/>
    </>
  )
})
export default FormQuestionEdit;
