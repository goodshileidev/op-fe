import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getInternalOrg, updateInternalOrg, createInternalOrg} from "@/common/service/system/internal_org";
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {InternalOrgRules} from './internal_org_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";


interface IInternalOrgEditProps {
  internalOrgId: string
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
const InternalOrgEdit: React.FC<IInternalOrgEditProps> = ((props) => {
  const internalOrgId = props.internalOrgId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [internalOrgForm] = Form.useForm();
  const isEdit = internalOrgId !== undefined && internalOrgId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [internalOrgData, setInternalOrgData] = useState<InternalOrgType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getInternalOrgDetail = async (internalOrgId: string) => {
    const response = await getInternalOrg(internalOrgId);
    const {data, code} = response
    if (code === 200 && data) {
      internalOrgForm.setFieldsValue({...data,})
      setInternalOrgData(data)
    } else {
      setInternalOrgData(null);
    }
  }

  useEffect(() => {
    if (internalOrgId && internalOrgId!=="" && internalOrgId!=="0") {
      getInternalOrgDetail(internalOrgId)
    } else {
      setInternalOrgData({})
      internalOrgForm.resetFields();
    }
  }, [internalOrgId, internalOrgForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      internalOrgForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      internalOrgForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await internalOrgForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && internalOrgId && internalOrgId!=='0') {
      values.internalOrgId = internalOrgId
      updateInternalOrg(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.internal_org')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createInternalOrg(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.internalOrgId){
            response.data.internalOrgId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('system.internal_org')}));
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
    internalOrgForm.resetFields()
  }


  // // 编辑内部单位时候 获取内部单位数据失败
  // if (isEdit && internalOrgId && (internalOrgData === null || internalOrgData.internalOrgId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('system.internal_org')}):t("common.title.add",{'entity':t('system.internal_org')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('system.internal_org')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('system.internal_org')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/system/internal_org/internal_org_table')}>
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
      <Form form={internalOrgForm}
                layout="vertical"
                initialValues={internalOrgData}
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
<Form.Item name="orgNo" label={t("system.internal_org.org_no")}
    rules={InternalOrgRules.orgNo}
    >
    <Input placeholder={t("system.internal_org.org_no")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="orgName" label={t("system.internal_org.org_name")}
    rules={InternalOrgRules.orgName}
    >
    <Input placeholder={t("system.internal_org.org_name")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="orgType" label={t("system.internal_org.org_type")}
    rules={InternalOrgRules.orgType}
 >
 <Select
    options={
        codeList.OrgType
      }
    placeholder={t("system.internal_org.org_type")} >
 </Select>
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="orgLogoUrl" label={t("system.internal_org.org_logo_url")}
    rules={InternalOrgRules.orgLogoUrl}
    >
    <Input placeholder={t("system.internal_org.org_logo_url")} />
</Form.Item>
</Col>


        </Row>

      </Form>
    </>
  )
})
export default InternalOrgEdit;
