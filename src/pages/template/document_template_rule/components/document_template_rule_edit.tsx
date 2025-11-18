import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Col, DatePicker, Form, message, Radio, Row, Select} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {
  createDocumentTemplateRule,
  getDocumentTemplateRule,
  updateDocumentTemplateRule
} from "@/common/service/template/document_template_rule";
import {DocumentTemplateRuleType} from '@/common/data_type/template/document_template_rule'
import {DocumentTemplateRuleRules} from './document_template_rule_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

const {RangePicker} = DatePicker;


interface IDocumentTemplateRuleEditProps {
  documentTemplateRuleId: string
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

const DocumentTemplateRuleEdit: React.FC<IDocumentTemplateRuleEditProps> = ((props) => {
  const documentTemplateRuleId = props.documentTemplateRuleId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [documentTemplateRuleForm] = Form.useForm();
  const isEdit = documentTemplateRuleId !== undefined && documentTemplateRuleId !== '' && documentTemplateRuleId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [documentTemplateRuleData, setDocumentTemplateRuleData] = useState<DocumentTemplateRuleType | any>({})


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const [codeListDocumentTemplate, setCodeListDocumentTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListDocumentTemplate({}).then((DocumentTemplateCodeList) => {
      setCodeListDocumentTemplate(DocumentTemplateCodeList)
      console.debug("DocumentTemplateCodeList", DocumentTemplateCodeList)
    })
  }, [])


  const getDocumentTemplateRuleDetail = async (documentTemplateRuleId: string) => {
    const response = await getDocumentTemplateRule(documentTemplateRuleId);
    const {data, code} = response
    if (code === 200 && data) {
      documentTemplateRuleForm.setFieldsValue({...data,})
      setDocumentTemplateRuleData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setDocumentTemplateRuleData(null);
    }
  }

  const createNewData: DocumentTemplateRuleType = () => {
    const newData: DocumentTemplateRuleType = {}
    newData.cargoName = []
    newData.operationType = []

    return newData
  }

  useEffect(() => {
    console.debug("documentTemplateRuleId", documentTemplateRuleId)
    if (documentTemplateRuleId && documentTemplateRuleId !== "" && documentTemplateRuleId !== "0") {
      getDocumentTemplateRuleDetail(documentTemplateRuleId)
    } else {
      const newData: DocumentTemplateRuleType = createNewData()
      setDocumentTemplateRuleData(newData)
      documentTemplateRuleForm.setFieldsValue(newData)
      documentTemplateRuleForm.resetFields();
    }
  }, [documentTemplateRuleId, documentTemplateRuleForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      documentTemplateRuleForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      documentTemplateRuleForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await documentTemplateRuleForm.validateFields();
    const errors = documentTemplateRuleForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && documentTemplateRuleId && documentTemplateRuleId !== '0') {
      values.documentTemplateRuleId = documentTemplateRuleId
      updateDocumentTemplateRule(values).then((response: any) => {
          const {code, msg} = response;
          if (code === 200) {
            message.success(t("common.save_success", {'entity': t('template.document_template_rule')}));
            props.onUpdate(true, response.data)
          } else {
            message.error(msg);
          }
        }
      )
      ;
    } else {
      // 新增
      createDocumentTemplateRule(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.documentTemplateRuleId) {
            response.data.documentTemplateRuleId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('template.document_template_rule')}));
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
    documentTemplateRuleForm.resetFields()
  }


// // 编辑一体化表单创建规则时候 获取一体化表单创建规则数据失败
//   if (isEdit && documentTemplateRuleId && (documentTemplateRuleData === null || documentTemplateRuleData.documentTemplateRuleId == null)) {
//     return (
//       <Card
//         title={isEdit ? t("common.title.edit", {'entity': t('template.document_template_rule')}) : t("common.title.add", {'entity': t('template.document_template_rule')})}
//         bordered={true}>
//         <Alert
//           message={t("common.load_failed", {'entity': t('template.document_template_rule')})}
//           description={t("common.load_failed_please_retry", {'entity': t('template.document_template_rule')})}
//           type="error"
//           showIcon
//           action={
//             <Button size="small" type="primary"
//                     onClick={() => history.push('/template/document_template_rule/document_template_rule_table')}>
//               {t("common.button.return_list")}
//             </Button>
//           }
//         />
//       </Card>
//     );
//   }

  const createBasicItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="documentTemplateNo" label={t("template.document_template_rule.document_template_no")}
                   rules={DocumentTemplateRuleRules.documentTemplateNo}
        >
          <Select
            options={
              codeListDocumentTemplate
            }
            placeholder={t("template.document_template_rule.document_template_no")}>
          </Select>
        </Form.Item>
      </Col>
    ))
    //
    // items.push((
    //   <Col className="gutter-row" span={12}>
    //     <Form.Item name="cargoName" label={t("template.document_template_rule.cargo_name")}
    //                rules={DocumentTemplateRuleRules.cargoName}>
    //       <Radio.Group
    //         placeholder={t("template.document_template_rule.cargo_name")}
    //         options={
    //           codeList.CargoName
    //         }
    //       />
    //     </Form.Item>
    //   </Col>
    //
    // ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="operationType" label={t("template.document_template_rule.operation_type")}
                   rules={DocumentTemplateRuleRules.operationType}>
          <Radio.Group
            placeholder={t("template.document_template_rule.operation_type")}
            options={
              codeList.OperationType
            }
          />
        </Form.Item>
      </Col>

    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="bizType" label={t("template.document_template_rule.biz_type")}
                   rules={DocumentTemplateRuleRules.bizType}
        >
          <Radio.Group
            options={
              codeList.BizType
            }
            placeholder={t("template.document_template_rule.biz_type")}>
          </Radio.Group>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="domesticForeignTradeType"
                   label={t("template.document_template_rule.domestic_foreign_trade_type")}
                   rules={DocumentTemplateRuleRules.domesticForeignTradeType}
        >
          <Radio.Group
            options={
              codeList.DomesticForeignTradeType
            }
            placeholder={t("template.document_template_rule.domestic_foreign_trade_type")}>
          </Radio.Group>
        </Form.Item>
      </Col>
    ))
    return items;
  }


  const createInputFields = (conditionValue: string) => {
    const items = []
    items.push((<><Row gutter={[16, 24]}>
      {createBasicItems()}
    </Row>
    </>));

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
        form={documentTemplateRuleForm}
        layout="vertical"
        initialValues={documentTemplateRuleData}
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
export default DocumentTemplateRuleEdit;
