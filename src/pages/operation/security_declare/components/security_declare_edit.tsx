import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getSecurityDeclare, updateSecurityDeclare, createSecurityDeclare} from "@/common/service/operation/security_declare";
import {SecurityDeclareType} from '@/common/data_type/operation/security_declare'
import {SecurityDeclareRules} from './security_declare_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";




interface ISecurityDeclareEditProps {
  securityDeclareId: string
  securityDeclareData?: SecurityDeclareType
  needReset: number
  needSubmit: number

  onUpdate: any
  onGetData: any
  isOpen: boolean
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const SecurityDeclareEdit: React.FC<ISecurityDeclareEditProps> = ((props) => {
  const securityDeclareId = props.securityDeclareId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [securityDeclareForm] = Form.useForm();
  const isEdit = securityDeclareId !== undefined && securityDeclareId !=='' && securityDeclareId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [securityDeclareData, setSecurityDeclareData] = useState<SecurityDeclareType | any>(props.securityDeclareData)



  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getSecurityDeclareDetail = async (securityDeclareId: string) => {
    const response = await getSecurityDeclare(securityDeclareId);
    const {data, code} = response
    if (code === 200 && data) {
      securityDeclareForm.setFieldsValue({...data,})
      setSecurityDeclareData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setSecurityDeclareData(null);
    }
  }

  const createNewData:SecurityDeclareType = () => {
    const newData:SecurityDeclareType = {}

    return newData
  }

  useEffect(() => {
    console.debug("securityDeclareId", securityDeclareId)
    if (!props.securityDeclareData) {
      if (securityDeclareId && securityDeclareId!=="" && securityDeclareId!=="0") {
        getSecurityDeclareDetail(securityDeclareId)
      } else {
        const newData:SecurityDeclareType = createNewData()
        setSecurityDeclareData(newData)
        securityDeclareForm.setFieldsValue(newData)
        securityDeclareForm.resetFields();
      }
    }
  }, [securityDeclareId, props.securityDeclareData, securityDeclareForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      securityDeclareForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      securityDeclareForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await securityDeclareForm.validateFields();
    const errors = securityDeclareForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && securityDeclareId && securityDeclareId!=='0') {
      values.securityDeclareId = securityDeclareId
      updateSecurityDeclare(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('operation.security_declare')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createSecurityDeclare(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.securityDeclareId){
            response.data.securityDeclareId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('operation.security_declare')}));
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
    securityDeclareForm.resetFields()
  }


  // // 编辑保安声明表单时候 获取保安声明表单数据失败
  // if (isEdit && securityDeclareId && (!securityDeclareData || !securityDeclareData.securityDeclareId)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('operation.security_declare')}):t("common.title.add",{'entity':t('operation.security_declare')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('operation.security_declare')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('operation.security_declare')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/operation/security_declare/security_declare_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

const createBasicItems= () =>{
  const items = []

    items.push((
<Col className="gutter-row" span={12}>
  <Form.Item name="dataDate" label={t("operation.security_declare.data_date")}
    rules={SecurityDeclareRules.dataDate}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("operation.security_declare.data_date")} />
  </Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="formName" label={t("operation.security_declare.form_name")}
    rules={SecurityDeclareRules.formName}
 >
 <Select
    options={
        codeList.SecurityDeclareForm
      }
    placeholder={t("operation.security_declare.form_name")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="operateStatus" label={t("operation.security_declare.operate_status")}
    rules={SecurityDeclareRules.operateStatus}
 >
 <Select
    options={
        codeList.OperationStatus
      }
    placeholder={t("operation.security_declare.operate_status")} >
 </Select>
</Form.Item>
</Col>
    ))
  return items;
}


  const createInputFields = (conditionValue: string) => {
    const items = []
    items.push((<><Row gutter={[16, 24]}>
{ createBasicItems() }
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
        form={securityDeclareForm}
        layout="vertical"
        initialValues={securityDeclareData}
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
export default SecurityDeclareEdit;
