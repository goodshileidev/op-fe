import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, InputNumber, message, Row, Select} from 'antd'

import {
  createFormQuestionTemplate,
  getFormQuestionTemplate,
  updateFormQuestionTemplate
} from "@/common/service/template/form_question_template";
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {FormQuestionTemplateRules} from './form_question_template_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

import FormVarConfigFormEditor from '@/components/form_var_config/form_var_config_form_editor'

import SubQuestionFormEditor from '@/components/sub_question_template/sub_question_form_editor'
import {FormSectionTemplateType} from "@/common/data_type/template/form_section_template";
import {FormTemplateType} from "@/common/data_type/template/form_template";
import {FormVarConfigType} from "@/common/data_type/form/form_var_config";
import ReactQuill from 'react-quill';
import {
  FormSectionTemplateRules
} from "@/pages/template/form_section_template/components/form_section_template_validate";
import {codeList} from "@/common/code_list/code_list_static";


const {RangePicker} = DatePicker;


interface IFormQuestionTemplateEditProps {
  formQuestionTemplateId: string
  needReset: number
  needSubmit: number
  formTemplateId: string
  formTemplate?: FormTemplateType
  formSectionTemplateId: string
  formSectionTemplate?: FormSectionTemplateType
  onUpdate: any
  isOpen: boolean
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const FormQuestionTemplateEdit: React.FC<IFormQuestionTemplateEditProps> = ((props) => {
  const [formQuestionTemplateId, setFormQuestionTemplateId] = useState<string>(props.formQuestionTemplateId)
  const formSectionTemplateId = props.formSectionTemplateId
  // const [formSectionTemplateId, setFormSectionTemplateId] = useState<string>('')
  const formTemplateId = props.formTemplateId
  const formSectionTemplate = props.formSectionTemplate
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [formQuestionTemplateForm] = Form.useForm();
  const [formQuestionTemplateData, setFormQuestionTemplateData] = useState<FormQuestionTemplateType | any>({})
  const varConfigList = Form.useWatch('varConfigList', {formQuestionTemplateForm, preserve: true});
  // const [isEdit, setIsEdit] = useState<boolean>(false);
  const isEdit = props.formQuestionTemplateId !== undefined && props.formQuestionTemplateId !== '0'

  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const {t} = useTranslation();
  const [formVarConfigList, setFormVarConfigList] = useState<FormVarConfigType[]>(null)
  const [questionVarConfigList, setQuestionVarConfigList] = useState<FormVarConfigType[]>(null)
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false)

  if (!formVarConfigList && props.formTemplate && props.formTemplate.varConfigList) {
    setFormVarConfigList(props.formTemplate?.varConfigList)
  }
  // 只有单问题行时，不需显示添加按钮
  const needShowAddSubQuestion = formSectionTemplate && formSectionTemplate.subSectionType === "2" ? false : true;
  const [showAddSubQuestion, setShowAddSubQuestion] = useState<boolean>(needShowAddSubQuestion)
  const addButtonType = formSectionTemplate && formSectionTemplate.subSectionType !== "2" ? "inputControl" : "normal"
  console.debug("FormQuestionTemplateEdit-init", formTemplateId, formSectionTemplateId, formQuestionTemplateId)
  console.debug("formTemplateId", props.formTemplateId)
  console.debug("formTemplate", props.formTemplate)
  console.debug("formSectionTemplateId", props.formSectionTemplateId)
  console.debug("formSectionTemplate", props.formSectionTemplate)
  console.debug("formQuestionTemplateId", formQuestionTemplateId)
  console.debug("isEdit", isEdit)

  const [isVarConfigListFormEditorVisible, setIsVarConfigListFormEditorVisible] = useState(false);
  const [isSubQuestionTemplateHtmlFormEditorVisible, setIsSubQuestionTemplateHtmlFormEditorVisible] = useState(false);

  const getFormQuestionTemplateDetail = async (formQuestionTemplateId: string | number) => {
    const response = await getFormQuestionTemplate(formQuestionTemplateId);
    const {data, code} = response
    if (code === 200 && data) {
      setFormQuestionTemplateData(data)
      setQuestionVarConfigList(data.varConfigList)
      formQuestionTemplateForm.setFieldsValue(data)
    } else {
      setFormQuestionTemplateData({});
    }
  }
  if (!isEdit) {
    //   const formQuestionTemplateData: FormQuestionTemplateType = {
    //     subQuestionTemplateHtml: [],
    //     varConfigList: [],
    //     editorRoleList: [],
    //     viewerRoleList: []
    //   }
    //   // SubSectionType: [
    //   //   {value: "1", label: "表头", i18nKey: "code_list.SubSectionType.1"},
    //   //   {value: "2", label: "单问题行", i18nKey: "code_list.SubSectionType.2"},
    //   //   {value: "3", label: "单行告知", i18nKey: "code_list.SubSectionType.3"},
    //   //   {value: "4", label: "单体表格", i18nKey: "code_list.SubSectionType.4"},
    //   //   {value: "5", label: "录入用整行", i18nKey: "code_list.SubSectionType.5"},
    //   //   {value: "6", label: "合计行-不跨列", i18nKey: "code_list.SubSectionType.6"},
    //   //   {value: "7", label: "合计行-整行合并", i18nKey: "code_list.SubSectionType.7"},
    //   //   {value: "8", label: "签字盖章", i18nKey: "code_list.SubSectionType.8"},
    //   // ],
    // if (formSectionTemplate && formSectionTemplate.subSectionType === "2") {
    //   setShowAddSubQuestion(false)
    //   // if (formSectionTemplate.tableColumnList) {
    //   //   for (let idx = 0; idx < formSectionTemplate.tableColumnList.length; idx++) {
    //   //     formQuestionTemplateData.subQuestionTemplateHtml.push({
    //   //       "idx": idx, "title": formSectionTemplate.tableColumnList[idx].columnTitle,
    //   //       "html": ""
    //   //     })
    //   //   }
    //   // }
    // }
    console.debug("createQuestionSectionTemplate->formSectionTemplate:", formSectionTemplate)
    console.debug("createQuestionSectionTemplate->formQuestionTemplateData:", formQuestionTemplateData)
  }

  const handleReset = () => {
    formQuestionTemplateForm.resetFields()
  }
  useEffect(() => {
    if (props.formQuestionTemplateId && props.formQuestionTemplateId !== 0 && props.formQuestionTemplateId !== "" && props.formQuestionTemplateId + "" !== "0") {
      // 编辑
      getFormQuestionTemplateDetail(props.formQuestionTemplateId)
    } else {
      // 新增
      const templateData: FormQuestionTemplateType = {
        questionNo: "",
        detailedDescription: '',
        subQuestionTemplateHtml: [],
        varConfigList: []
      }
      formQuestionTemplateForm.setFieldsValue(templateData)
      formQuestionTemplateForm.resetFields();
      if (formSectionTemplate && formSectionTemplate.subSectionType === "2") {
        setShowAddSubQuestion(false)
        if (formSectionTemplate.tableColumnList) {
          for (let idx = 0; idx < formSectionTemplate.tableColumnList.length; idx++) {
            const tableColumn = formSectionTemplate.tableColumnList[idx]
            templateData.subQuestionTemplateHtml.push({
              "idx": idx,
              "title": tableColumn.columnTitle,
              "html": "",
              "subQuestionType": tableColumn.subQuestionType
            })
          }
        }
      } else {
        setShowAddSubQuestion(true)
      }
      setFormQuestionTemplateData(templateData)
      formQuestionTemplateForm.setFieldsValue(templateData)
    }
  }, [props.formTemplateId, props.formSectionTemplateId, props.formQuestionTemplateId, props.formSectionTemplate, props.isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      formQuestionTemplateForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      formQuestionTemplateForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await formQuestionTemplateForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    if (isSubmiting) {
      return false
    }
    setIsSubmiting(true)
    if (values.varConfigList) {
      const num = new Date().getMilliseconds()
      for (let idx = 0; idx < values.varConfigList.length; idx++) {
        const varConfig = values.varConfigList[idx]
        if (!varConfig.varKey) {
          varConfig.varKey = "varKey" + (num + idx)
        }
      }
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && props.formQuestionTemplateId && props.formQuestionTemplateId !== '0' || formQuestionTemplateData && formQuestionTemplateData.formQuestionTemplateId) {
      const id = formQuestionTemplateData && formQuestionTemplateData.formQuestionTemplateId ? formQuestionTemplateData.formQuestionTemplateId : props.formQuestionTemplateId
      values.formQuestionTemplateId = id
      updateFormQuestionTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          response.data.formSectionTemplateId = formSectionTemplateId
          message.success(t("common.save_success", {'entity': t('template.form_question_template')}));
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
    } else {
      // 新增
      values.formSectionTemplateId = formSectionTemplateId
      values.formTemplateId = formTemplateId
      createFormQuestionTemplate(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.formQuestionTemplateId) {
            response.data.formQuestionTemplateId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          // setIsEdit(true)
          setFormQuestionTemplateId(response.data.formQuestionTemplateId)
          setFormQuestionTemplateData(response.data)
          message.success(t("common.add_success", {'entity': t('template.form_question_template')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
          // handleReset() // 创建成功之后重置表单，否则再次新增弹窗打开还有旧的数据
        } else {
          message.error(msg);
        }
      }).finally(() => {
        setTimeout(() => {
          setIsSubmiting(false)
        }, 1000)
      });
    }
  };

  // 编辑表单问题模版时候 获取表单问题模版数据失败
  // if (isEdit && formQuestionTemplateId && (formQuestionTemplateData === null || formQuestionTemplateData.formQuestionTemplateId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('template.form_question_template')}) : t("common.title.add", {'entity': t('template.form_question_template')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('template.form_question_template')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('template.form_question_template')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary"
  //                   onClick={() => history.push('/template/form_question_template/form_question_template_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }


  const onFieldsChange = (changedFields, allFields) => {
    console.debug("formQuestionTemplateForm->onFieldsChange", changedFields, allFields)
  }
  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.debug("formQuestionTemplateForm->onFinishFailed", values, errorFields)
  }
  const onValuesChange = (changedValues, allValues) => {
    console.debug("formQuestionTemplateForm->onValuesChange", changedValues, changedValues)
  }

  return (
    <>
      <Form form={formQuestionTemplateForm}
            layout="vertical"
            style={{
              width: "100%"
            }}
            initialValues={{
              questionNo: "",
              detailedDescription: '',
              subQuestionTemplateHtml: [],
              varConfigList: []
            }}
            disabled={formDisabled}
            onFieldsChange={onFieldsChange}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            onFinish={handleSubmit}>

        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="questionNo" label={t("template.form_question_template.question_no")}
                       rules={FormQuestionTemplateRules.questionNo}
            >
              <Input placeholder={t("template.form_question_template.question_no")}/>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="sortOrder" label={t("template.form_question_template.sort_order")}
                       rules={FormQuestionTemplateRules.sortOrder}
            >
              <InputNumber placeholder={t("template.form_question_template.sort_order")}/>
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
            <Form.Item name="operationType" label={t("template.form_question_template.operation_type")}
                       rules={FormQuestionTemplateRules.operationType}
            >
              <Select
                options={
                  codeList.OperationType
                }
                placeholder={t("template.form_question_template.operation_type")}>
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="domesticForeignTradeType"
                       label={t("template.form_question_template.domestic_foreign_trade_type")}
                       rules={FormQuestionTemplateRules.domesticForeignTradeType}
            >
              <Select
                options={
                  codeList.DomesticForeignTradeType
                }
                placeholder={t("template.form_question_template.domestic_foreign_trade_type")}>
              </Select>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={24}>
            <Form.Item name="detailedDescription" label={t("template.form_question_template.detailed_description")}
                       rules={FormQuestionTemplateRules.detailedDescription}
                       style={{marginBottom: 60}}
            >
              <ReactQuill
                style={{
                  height: 100
                }}
                theme="snow"/>
            </Form.Item>
          </Col>
        </Row>
        <FormVarConfigFormEditor
          onUpdate={(data: any) => {
            if (data !== null) {
              formQuestionTemplateData.varConfigList = data
              setFormQuestionTemplateData(formQuestionTemplateData)
              console.debug("FormVarConfigFormEditor->onupdate", data)
            }
          }}
          fieldName="varConfigList"
          fieldTitle={t('template.question_var_config')}
          formVarConfigList={formQuestionTemplateData.varConfigList}/>
        <Button size="small" type="primary"
                onClick={() => {
                  const varConfigListTemp = formQuestionTemplateForm.getFieldValue("varConfigList")
                  console.debug("varConfigListTemp", varConfigListTemp)
                  setQuestionVarConfigList(varConfigListTemp)
                }}>
          {t("common.button.refresh_var_config")}
        </Button>
        <SubQuestionFormEditor
          style={{
            width: "100%"
          }}
          showAdd={showAddSubQuestion}
          addButtonType={addButtonType}
          onUpdate={(data: any) => {
            if (data !== null) {
              formQuestionTemplateData.subQuestionTemplateHtml = data
            }
          }}
          questionVarConfigList={questionVarConfigList}
          formVarConfigList={formVarConfigList}
          fieldName="subQuestionTemplateHtml"
          subQuestionList={formQuestionTemplateData.subQuestionTemplateHtml}
          formQuestionTemplate={formQuestionTemplateData}
          formQuestionTemplateId={props.formQuestionTemplateId}/>
      </Form>
    </>
  )
})
export default FormQuestionTemplateEdit;
