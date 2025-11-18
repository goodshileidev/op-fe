import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Radio, Row, Tabs} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'
import {createForm, getForm, updateForm} from "@/common/service/form/form";
import {FormType} from '@/common/data_type/form/form'
import {FormRules} from './form_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";

const {RangePicker} = DatePicker;


interface IFormEditProps {
  formId: string
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

const FormEdit: React.FC<IFormEditProps> = ((props) => {
  const formId = props.formId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formForm] = Form.useForm();
  const isEdit = formId !== undefined && formId !== '' && formId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formData, setFormData] = useState<FormType | any>({})


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getFormDetail = async (formId: string) => {
    const response = await getForm(formId);
    const {data, code} = response
    if (code === 200 && data) {
      formForm.setFieldsValue({...data,})
      setFormData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setFormData(null);
    }
  }

  const createNewData: FormType = () => {
    const newData: FormType = {}
    newData.displayPosition = []

    return newData
  }

  useEffect(() => {
    console.debug("formId", formId)
    if (formId && formId !== "" && formId !== "0") {
      getFormDetail(formId)
    } else {
      const newData: FormType = createNewData()
      setFormData(newData)
      formForm.setFieldsValue(newData)
      formForm.resetFields();
    }
  }, [formId, formForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await formForm.validateFields();
    const errors = formForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && formId && formId !== '0') {
      values.formId = formId
      updateForm(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('form.form')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createForm(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.formId) {
            response.data.formId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('form.form')}));
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
    formForm.resetFields()
  }


  // // 编辑表单时候 获取表单数据失败
  // if (isEdit && formId && (formData === null || formData.formId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('form.form')}) : t("common.title.add", {'entity': t('form.form')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('form.form')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('form.form')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/form/form/form_table')}>
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
        <Form.Item name="formNo" label={t("form.form.form_no")}
                   rules={FormRules.formNo}
        >
          <Input placeholder={t("form.form.form_no")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="formName" label={t("form.form.form_name")}
                   rules={FormRules.formName}
        >
          <Input placeholder={t("form.form.form_name")}/>
        </Form.Item>
      </Col>
    ))
    return items;
  }
  const createShowBasicItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="displayPosition" label={t("form.form.display_position")} valuePropName="checked"
                   rules={FormRules.displayPosition}>
          <Checkbox.Group
            placeholder={t("form.form.display_position")}
            options={
              codeList.DisplayPosition
            }
          />
        </Form.Item>
      </Col>

    ))
    return items;
  }
  const createShowComplexItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={24}>
        <Form.Item name="printTemplate" label={t("form.form.print_template")}
                   rules={FormRules.printTemplate}
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
        <Form.Item name="editableTimeOnMiniProgram" label={t("form.form.editable_time_on_mini_program")}
                   rules={FormRules.editableTimeOnMiniProgram}>
          <Editor
            height={'200px'}
            width={'100%'}
            language={"json"}
            defaultValue={"{}"}
            theme="vs-dark"
          />
        </Form.Item>
      </Col>
    ))
    return items;
  }
  const createContentBasicItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="isSignatureRequired" label={t("form.form.is_signature_required")} valuePropName="checked"
                   rules={FormRules.isSignatureRequired}>
          <Radio.Group
            options={
              codeList.YesNo
            }
            placeholder={t("form.form.is_signature_required")}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="isStampSignatureRequired" label={t("form.form.is_stamp_signature_required")}
                   valuePropName="checked"
                   rules={FormRules.isStampSignatureRequired}>
          <Radio.Group
            options={
              codeList.YesNo
            }
            placeholder={t("form.form.is_stamp_signature_required")}
            optionType="button"
            buttonStyle="solid"
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
          {
            label: '基本信息', key: 'basic', children: (
              <>
                <Row>
                  {createBasicBasicItems()}
                </Row>
              </>)
          },
          {
            label: '展示设置', key: 'show', children: (
              <>
                <Row>
                  {createShowBasicItems()}
                </Row>
                <Row>
                  {createShowComplexItems()}
                </Row>
              </>)
          },
          {
            label: '流转设置', key: 'flow', children: (
              <>
              </>)
          },
          {
            label: '流转设置', key: 'content', children: (
              <>
                <Row>
                  {createContentBasicItems()}
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
        form={formForm}
        layout="vertical"
        initialValues={formData}
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
export default FormEdit;
