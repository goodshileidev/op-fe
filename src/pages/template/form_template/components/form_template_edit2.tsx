import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Row} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'

import {createFormTemplate, getFormTemplate, updateFormTemplate} from "@/common/service/template/form_template";
import {FormTemplateType} from '@/common/data_type/template/form_template'
import {FormTemplateRules} from './form_template_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'

const {RangePicker} = DatePicker;


interface IFormTemplateEditProps {
  formTemplateId: string
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
const FormTemplateEdit: React.FC<IFormTemplateEditProps> = ((props) => {
  const formTemplateId = props.formTemplateId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formTemplateForm] = Form.useForm();
  const isEdit = formTemplateId !== undefined && formTemplateId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [formTemplateData, setFormTemplateData] = useState<FormTemplateType | any>({})
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [isSubmissionSettingsFormEditorVisible, setIsSubmissionSettingsFormEditorVisible] = useState(false);

  const [isVarConfigListFormEditorVisible, setIsVarConfigListFormEditorVisible] = useState(false);


  const getFormTemplateDetail = async (formTemplateId: string) => {
    const response = await getFormTemplate(formTemplateId);
    const {data, code} = response
    if (code === 200 && data) {
      formTemplateForm.setFieldsValue({...data,})
      setFormTemplateData(data)
    } else {
      setFormTemplateData(null);
    }
  }

  useEffect(() => {
    if (formTemplateId && formTemplateId !== "" && formTemplateId !== "0") {
      getFormTemplateDetail(formTemplateId)
    } else {
      setFormTemplateData({})
      formTemplateForm.resetFields();
    }
  }, [formTemplateId, formTemplateForm, isOpen])

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
          if (!response.data.formTemplateId) {
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


  // 编辑表单模版时候 获取表单模版数据失败
  if (isEdit && formTemplateId && (formTemplateData === null || formTemplateData.formTemplateId == null)) {
    return (
      <Card
        title={isEdit ? t("common.title.edit", {'entity': t('template.form_template')}) : t("common.title.add", {'entity': t('template.form_template')})}
        bordered={true}>
        <Alert
          message={t("common.load_failed", {'entity': t('template.form_template')})}
          description={t("common.load_failed_please_retry", {'entity': t('template.form_template')})}
          type="error"
          showIcon
          action={
            <Button size="small" type="primary"
                    onClick={() => history.push('/template/form_template/form_template_table')}>
              {t("common.button.return_list")}
            </Button>
          }
        />
      </Card>
    );
  }


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
      <Form form={formTemplateForm}
            colon={true}
            labelAlign={'right'}
            labelCol={{span: 6}}
            labelWrap={true}
            initialValues={formTemplateData}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        // style={{ maxWidth: 1920 }}
            disabled={formDisabled}
            onFieldsChange={onFieldsChange}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            onFinish={handleSubmit}>
        <Row gutter={[16, 24]} style={{rowGap: "0px"}}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="formTemplateName" label={t("template.form_template.form_template_name")}
                       rules={FormTemplateRules.formTemplateName}
            >
              <Input placeholder={t("template.form_template.form_template_name")}/>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item name="formTemplateNo" label={t("template.form_template.form_template_no")}
              // rules={FormTemplateRules.formTemplateNo}
            >
              <Input placeholder={t("template.form_template.form_template_no")}/>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="formTemplatePlatformNo" label={t("template.form_template.form_template_platform_no")}
              // rules={FormTemplateRules.formTemplateNo}
            >
              <Input placeholder={t("template.form_template.form_template_platform_no")}/>
            </Form.Item>
          </Col>

          {/* <Col className="gutter-row" span={8}>
            <Form.Item name="viewerRoleList" label={t("template.form_template.viewer_role_list")} valuePropName="checked"
              rules={FormTemplateRules.viewerRoleList}>
              <Checkbox.Group
                options={
                  codeList.Role
                }
              />
            </Form.Item>
          </Col> */}


          {/* <Col className="gutter-row" span={8}>
            <Form.Item name="editorRoleList" label={t("template.form_template.editor_role_list")} valuePropName="checked"
              rules={FormTemplateRules.editorRoleList}>
              <Checkbox.Group
                options={
                  codeList.Role
                }
              />
            </Form.Item>
          </Col> */}


          {/*<Col className="gutter-row" span={8}>*/}
          {/*  <Form.Item name="recipientList" label={t("template.form_template.recipient_list")} valuePropName="checked"*/}
          {/*             rules={FormTemplateRules.recipientList}>*/}
          {/*    <Checkbox.Group*/}
          {/*      options={*/}
          {/*        codeList.RecipientList*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}


          {/*<Col className="gutter-row" span={8}>*/}
          {/*  <Form.Item name="operationMode" label={t("template.form_template.operation_mode")} valuePropName="checked"*/}
          {/*             rules={FormTemplateRules.operationMode}>*/}
          {/*    <Checkbox.Group*/}
          {/*      options={*/}
          {/*        codeList.OperationMode*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}


          <Col className="gutter-row" span={12}>
            <Form.Item name="displayPosition" label={t("template.form_template.display_position")}
                       rules={FormTemplateRules.displayPosition}>
              <Checkbox.Group
                options={
                  codeList.DisplayPosition
                }
              />
            </Form.Item>
          </Col>


          {/* <Col className="gutter-row" span={8}>
            <Form.Item name="reminderSettings" label={t("template.form_template.reminder_settings")}
              rules={FormTemplateRules.reminderSettings}
            >
              <Input placeholder={t("template.form_template.reminder_settings")} />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={8}>
            <Form.Item name="isSignatureRequired" label={t("template.form_template.is_signature_required")} valuePropName="checked"
              rules={FormTemplateRules.isSignatureRequired}>
              <Radio.Group
                options={
                  codeList.YesNo
                }
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col> */}

          {/* <Col className="gutter-row" span={8}>
            <Form.Item name="isStampSignatureRequired" label={t("template.form_template.is_stamp_signature_required")} valuePropName="checked"
              rules={FormTemplateRules.isStampSignatureRequired}>
              <Radio.Group
                options={
                  codeList.YesNo
                }
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
          </Col> */}

          {/*<Col className="gutter-row" span={8}>*/}
          {/*  <Form.Item name="submissionRecipientUnit" label={t("template.form_template.submission_recipient_unit")}*/}
          {/*             rules={FormTemplateRules.submissionRecipientUnit}*/}
          {/*  >*/}
          {/*    <Input placeholder={t("template.form_template.submission_recipient_unit")}/>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}
          {/*<Col className="gutter-row" span={24}>*/}
          {/*  <Form.Item name="printTemplate" labelCol={{span: 2}} label={t("template.form_template.print_template")}*/}
          {/*             rules={FormTemplateRules.printTemplate}*/}
          {/*             style={{marginBottom: 60}}*/}
          {/*  >*/}
          {/*    <SuperRichTextEdit*/}
          {/*      formVarConfigList={formTemplateData.varConfigList}*/}
          {/*    />*/}
          {/* <ReactQuill
        style={{
          height:100
        }}
        modules={{
          toolbar: [
              ["bold", "italic", "underline", "strike"],       // 加粗 斜体 下划线 删除线
              ["blockquote", "code-block"],                    // 引用  代码块
              [{ list: "ordered" }, { list: "bullet" }],       // 有序、无序列表
              [{ indent: "-1" }, { indent: "+1" }],            // 缩进
              [{ size: ["small", false, "large", "huge"] }],   // 字体大小
              [{ header: [1, 2, 3, 4, 5, 6, false] }],         // 标题
              [{ color: [] }, { background: [] }],             // 字体颜色、字体背景颜色
              [{ align: [] }],                                 // 对齐方式
              ["clean"],                                       // 清除文本格式
              ["link", "image", "video"]                       // 链接、图片、视频
          ]
      }}
        theme="snow" /> */}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

          {/*<Col className="gutter-row" span={24}>*/}
          {/*  <Form.Item name="previewHtml" labelCol={{span: 2}} label={t("template.form_template.preview_html")}*/}
          {/*             rules={FormTemplateRules.previewHtml}*/}
          {/*             style={{marginBottom: 60}}>*/}
          {/*    <ReactQuill*/}
          {/*      style={{*/}
          {/*        height: 100*/}
          {/*      }}*/}
          {/*      theme="snow"/>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

        </Row>
        {/*<SendConfigFormEditor*/}
        {/*  onUpdate={(data: any) => {*/}
        {/*    if (data !== null) {*/}
        {/*      formTemplateData.submissionSettings = data*/}
        {/*    }*/}
        {/*  }}*/}
        {/*  fieldName="submissionSettings"*/}
        {/*  sendConfigList={formTemplateData.submissionSettings}/>*/}
        {/*<br/>*/}
        <FormVarConfigFormEditor
          onUpdate={(data: any) => {
            if (data !== null) {
              formTemplateData.varConfigList = data
            }
          }}
          fieldName="varConfigList"
          fieldTitle={t('template.form_var_config')}
          formVarConfigList={formTemplateData.varConfigList}/>
      </Form>
      <br/>
    </>
  )
})
export default FormTemplateEdit;
