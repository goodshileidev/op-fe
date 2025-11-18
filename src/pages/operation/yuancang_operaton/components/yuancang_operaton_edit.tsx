import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getYuancangOperaton, updateYuancangOperaton, createYuancangOperaton} from "@/common/service/operation/yuancang_operaton";
import {YuancangOperatonType} from '@/common/data_type/operation/yuancang_operaton'
import {YuancangOperatonRules} from './yuancang_operaton_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";




interface IYuancangOperatonEditProps {
  yuancangOperatonId: string
  yuancangOperatonData?: YuancangOperatonType
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

const YuancangOperatonEdit: React.FC<IYuancangOperatonEditProps> = ((props) => {
  const yuancangOperatonId = props.yuancangOperatonId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [yuancangOperatonForm] = Form.useForm();
  const isEdit = yuancangOperatonId !== undefined && yuancangOperatonId !=='' && yuancangOperatonId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [yuancangOperatonData, setYuancangOperatonData] = useState<YuancangOperatonType | any>(props.yuancangOperatonData)



  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getYuancangOperatonDetail = async (yuancangOperatonId: string) => {
    const response = await getYuancangOperaton(yuancangOperatonId);
    const {data, code} = response
    if (code === 200 && data) {
      yuancangOperatonForm.setFieldsValue({...data,})
      setYuancangOperatonData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setYuancangOperatonData(null);
    }
  }

  const createNewData:YuancangOperatonType = () => {
    const newData:YuancangOperatonType = {}

    return newData
  }

  useEffect(() => {
    console.debug("yuancangOperatonId", yuancangOperatonId)
    if (!props.yuancangOperatonData) {
      if (yuancangOperatonId && yuancangOperatonId!=="" && yuancangOperatonId!=="0") {
        getYuancangOperatonDetail(yuancangOperatonId)
      } else {
        const newData:YuancangOperatonType = createNewData()
        setYuancangOperatonData(newData)
        yuancangOperatonForm.setFieldsValue(newData)
        yuancangOperatonForm.resetFields();
      }
    }
  }, [yuancangOperatonId, props.yuancangOperatonData, yuancangOperatonForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      yuancangOperatonForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      yuancangOperatonForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await yuancangOperatonForm.validateFields();
    const errors = yuancangOperatonForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && yuancangOperatonId && yuancangOperatonId!=='0') {
      values.yuancangOperatonId = yuancangOperatonId
      updateYuancangOperaton(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('operation.yuancang_operaton')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createYuancangOperaton(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.yuancangOperatonId){
            response.data.yuancangOperatonId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('operation.yuancang_operaton')}));
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
    yuancangOperatonForm.resetFields()
  }


  // // 编辑圆仓作业表单时候 获取圆仓作业表单数据失败
  // if (isEdit && yuancangOperatonId && (!yuancangOperatonData || !yuancangOperatonData.yuancangOperatonId)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('operation.yuancang_operaton')}):t("common.title.add",{'entity':t('operation.yuancang_operaton')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('operation.yuancang_operaton')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('operation.yuancang_operaton')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/operation/yuancang_operaton/yuancang_operaton_table')}>
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
  <Form.Item name="dataDate" label={t("operation.yuancang_operaton.data_date")}
    rules={YuancangOperatonRules.dataDate}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("operation.yuancang_operaton.data_date")} />
  </Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="formName" label={t("operation.yuancang_operaton.form_name")}
    rules={YuancangOperatonRules.formName}
 >
 <Select
    options={
        codeList.YuancangForm
      }
    placeholder={t("operation.yuancang_operaton.form_name")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="operateStatus" label={t("operation.yuancang_operaton.operate_status")}
    rules={YuancangOperatonRules.operateStatus}
 >
 <Select
    options={
        codeList.OperationStatus
      }
    placeholder={t("operation.yuancang_operaton.operate_status")} >
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
        form={yuancangOperatonForm}
        layout="vertical"
        initialValues={yuancangOperatonData}
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
export default YuancangOperatonEdit;
