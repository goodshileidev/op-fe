import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getReceiptOrg, updateReceiptOrg, createReceiptOrg} from "@/common/service/system/receipt_org";
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {ReceiptOrgRules} from './receipt_org_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";


interface IReceiptOrgEditProps {
  receiptOrgId: string
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
const ReceiptOrgEdit: React.FC<IReceiptOrgEditProps> = ((props) => {
  const receiptOrgId = props.receiptOrgId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [receiptOrgForm] = Form.useForm();
  const isEdit = receiptOrgId !== undefined && receiptOrgId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [receiptOrgData, setReceiptOrgData] = useState<ReceiptOrgType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getReceiptOrgDetail = async (receiptOrgId: string) => {
    const response = await getReceiptOrg(receiptOrgId);
    const {data, code} = response
    if (code === 200 && data) {
      receiptOrgForm.setFieldsValue({...data,})
      setReceiptOrgData(data)
    } else {
      setReceiptOrgData(null);
    }
  }

  useEffect(() => {
    if (receiptOrgId && receiptOrgId!=="" && receiptOrgId!=="0") {
      getReceiptOrgDetail(receiptOrgId)
    } else {
      setReceiptOrgData({})
      receiptOrgForm.resetFields();
    }
  }, [receiptOrgId, receiptOrgForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      receiptOrgForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      receiptOrgForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await receiptOrgForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && receiptOrgId && receiptOrgId!=='0') {
      values.receiptOrgId = receiptOrgId
      updateReceiptOrg(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.receipt_org')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createReceiptOrg(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.receiptOrgId){
            response.data.receiptOrgId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('system.receipt_org')}));
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
    receiptOrgForm.resetFields()
  }


  // // 编辑报送文件接收单位时候 获取报送文件接收单位数据失败
  // if (isEdit && receiptOrgId && (receiptOrgData === null || receiptOrgData.receiptOrgId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('system.receipt_org')}):t("common.title.add",{'entity':t('system.receipt_org')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('system.receipt_org')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('system.receipt_org')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/system/receipt_org/receipt_org_table')}>
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
      <Form form={receiptOrgForm}
                layout="vertical"
                initialValues={receiptOrgData}
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
<Form.Item name="orgNo" label={t("system.receipt_org.org_no")}
    rules={ReceiptOrgRules.orgNo}
    >
    <Input placeholder={t("system.receipt_org.org_no")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="orgName" label={t("system.receipt_org.org_name")}
    rules={ReceiptOrgRules.orgName}
    >
    <Input placeholder={t("system.receipt_org.org_name")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="orgType" label={t("system.receipt_org.org_type")}
    rules={ReceiptOrgRules.orgType}
 >
 <Select
    options={
        codeList.OrgType
      }
    placeholder={t("system.receipt_org.org_type")} >
 </Select>
</Form.Item>
</Col>


        </Row>

      </Form>
    </>
  )
})
export default ReceiptOrgEdit;
