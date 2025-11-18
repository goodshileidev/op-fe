import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getMonthlySecurityCheck, updateMonthlySecurityCheck, createMonthlySecurityCheck} from "@/common/service/operation/monthly_security_check";
import {MonthlySecurityCheckType} from '@/common/data_type/operation/monthly_security_check'
import {MonthlySecurityCheckRules} from './monthly_security_check_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";




interface IMonthlySecurityCheckEditProps {
  monthlySecurityCheckId: string
  monthlySecurityCheckData?: MonthlySecurityCheckType
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

const MonthlySecurityCheckEdit: React.FC<IMonthlySecurityCheckEditProps> = ((props) => {
  const monthlySecurityCheckId = props.monthlySecurityCheckId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [monthlySecurityCheckForm] = Form.useForm();
  const isEdit = monthlySecurityCheckId !== undefined && monthlySecurityCheckId !=='' && monthlySecurityCheckId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [monthlySecurityCheckData, setMonthlySecurityCheckData] = useState<MonthlySecurityCheckType | any>(props.monthlySecurityCheckData)



  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getMonthlySecurityCheckDetail = async (monthlySecurityCheckId: string) => {
    const response = await getMonthlySecurityCheck(monthlySecurityCheckId);
    const {data, code} = response
    if (code === 200 && data) {
      monthlySecurityCheckForm.setFieldsValue({...data,})
      setMonthlySecurityCheckData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setMonthlySecurityCheckData(null);
    }
  }

  const createNewData:MonthlySecurityCheckType = () => {
    const newData:MonthlySecurityCheckType = {}

    return newData
  }

  useEffect(() => {
    console.debug("monthlySecurityCheckId", monthlySecurityCheckId)
    if (!props.monthlySecurityCheckData) {
      if (monthlySecurityCheckId && monthlySecurityCheckId!=="" && monthlySecurityCheckId!=="0") {
        getMonthlySecurityCheckDetail(monthlySecurityCheckId)
      } else {
        const newData:MonthlySecurityCheckType = createNewData()
        setMonthlySecurityCheckData(newData)
        monthlySecurityCheckForm.setFieldsValue(newData)
        monthlySecurityCheckForm.resetFields();
      }
    }
  }, [monthlySecurityCheckId, props.monthlySecurityCheckData, monthlySecurityCheckForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      monthlySecurityCheckForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      monthlySecurityCheckForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await monthlySecurityCheckForm.validateFields();
    const errors = monthlySecurityCheckForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && monthlySecurityCheckId && monthlySecurityCheckId!=='0') {
      values.monthlySecurityCheckId = monthlySecurityCheckId
      updateMonthlySecurityCheck(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('operation.monthly_security_check')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createMonthlySecurityCheck(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.monthlySecurityCheckId){
            response.data.monthlySecurityCheckId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('operation.monthly_security_check')}));
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
    monthlySecurityCheckForm.resetFields()
  }


  // // 编辑月度安全检查时候 获取月度安全检查数据失败
  // if (isEdit && monthlySecurityCheckId && (!monthlySecurityCheckData || !monthlySecurityCheckData.monthlySecurityCheckId)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('operation.monthly_security_check')}):t("common.title.add",{'entity':t('operation.monthly_security_check')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('operation.monthly_security_check')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('operation.monthly_security_check')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/operation/monthly_security_check/monthly_security_check_table')}>
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
  <Form.Item name="checkYearMonth" label={t("operation.monthly_security_check.check_year_month")}
    rules={MonthlySecurityCheckRules.checkYearMonth}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("operation.monthly_security_check.check_year_month")} />
  </Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="formName" label={t("operation.monthly_security_check.form_name")}
    rules={MonthlySecurityCheckRules.formName}
 >
 <Select
    options={
        codeList.MonthlyCheckForm
      }
    placeholder={t("operation.monthly_security_check.form_name")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="bizType" label={t("operation.monthly_security_check.biz_type")}
    rules={MonthlySecurityCheckRules.bizType}
    >
    <Input placeholder={t("operation.monthly_security_check.biz_type")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="operateStatus" label={t("operation.monthly_security_check.operate_status")}
    rules={MonthlySecurityCheckRules.operateStatus}
 >
 <Select
    options={
        codeList.OperateStatus
      }
    placeholder={t("operation.monthly_security_check.operate_status")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="turnGroup" label={t("operation.monthly_security_check.turn_group")}
    rules={MonthlySecurityCheckRules.turnGroup}
 >
 <Select
    options={
        codeList.OperationStatus
      }
    placeholder={t("operation.monthly_security_check.turn_group")} >
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
        form={monthlySecurityCheckForm}
        layout="vertical"
        initialValues={monthlySecurityCheckData}
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
export default MonthlySecurityCheckEdit;
