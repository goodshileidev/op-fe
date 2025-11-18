import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getTurnGroupSchedule, updateTurnGroupSchedule, createTurnGroupSchedule} from "@/common/service/system/turn_group_schedule";
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {TurnGroupScheduleRules} from './turn_group_schedule_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";



interface ITurnGroupScheduleEditProps {
  turnGroupScheduleId: string
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

const TurnGroupScheduleEdit: React.FC<ITurnGroupScheduleEditProps> = ((props) => {
  const turnGroupScheduleId = props.turnGroupScheduleId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [turnGroupScheduleForm] = Form.useForm();
  const isEdit = turnGroupScheduleId !== undefined && turnGroupScheduleId !=='' && turnGroupScheduleId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [turnGroupScheduleData, setTurnGroupScheduleData] = useState<TurnGroupScheduleType | any>({})



  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getTurnGroupScheduleDetail = async (turnGroupScheduleId: string) => {
    const response = await getTurnGroupSchedule(turnGroupScheduleId);
    const {data, code} = response
    if (code === 200 && data) {
      turnGroupScheduleForm.setFieldsValue({...data,})
      setTurnGroupScheduleData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setTurnGroupScheduleData(null);
    }
  }

  const createNewData:TurnGroupScheduleType = () => {
    const newData:TurnGroupScheduleType = {}

    return newData
  }

  useEffect(() => {
    console.debug("turnGroupScheduleId", turnGroupScheduleId)
    if (turnGroupScheduleId && turnGroupScheduleId!=="" && turnGroupScheduleId!=="0") {
      getTurnGroupScheduleDetail(turnGroupScheduleId)
    } else {
      const newData:TurnGroupScheduleType = createNewData()
      setTurnGroupScheduleData(newData)
      turnGroupScheduleForm.setFieldsValue(newData)
      turnGroupScheduleForm.resetFields();
    }
  }, [turnGroupScheduleId, turnGroupScheduleForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      turnGroupScheduleForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      turnGroupScheduleForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await turnGroupScheduleForm.validateFields();
    const errors = turnGroupScheduleForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && turnGroupScheduleId && turnGroupScheduleId!=='0') {
      values.turnGroupScheduleId = turnGroupScheduleId
      updateTurnGroupSchedule(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.turn_group_schedule')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createTurnGroupSchedule(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.turnGroupScheduleId){
            response.data.turnGroupScheduleId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('system.turn_group_schedule')}));
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
    turnGroupScheduleForm.resetFields()
  }


  // // 编辑排班时候 获取排班数据失败
  // if (isEdit && turnGroupScheduleId && (turnGroupScheduleData === null || turnGroupScheduleData.turnGroupScheduleId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('system.turn_group_schedule')}):t("common.title.add",{'entity':t('system.turn_group_schedule')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('system.turn_group_schedule')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('system.turn_group_schedule')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/system/turn_group_schedule/turn_group_schedule_table')}>
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
<Form.Item name="dataDate" label={t("system.turn_group_schedule.data_date")}
    rules={TurnGroupScheduleRules.dataDate}
    >
    <Input placeholder={t("system.turn_group_schedule.data_date")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="turnGroup1" label={t("system.turn_group_schedule.turn_group1")}
    rules={TurnGroupScheduleRules.turnGroup1}
 >
 <Select
    options={
        codeList.TurnGroup
      }
    placeholder={t("system.turn_group_schedule.turn_group1")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="turnGroup2" label={t("system.turn_group_schedule.turn_group2")}
    rules={TurnGroupScheduleRules.turnGroup2}
 >
 <Select
    options={
        codeList.TurnGroup
      }
    placeholder={t("system.turn_group_schedule.turn_group2")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="turnGroup3" label={t("system.turn_group_schedule.turn_group3")}
    rules={TurnGroupScheduleRules.turnGroup3}
 >
 <Select
    options={
        codeList.TurnGroup
      }
    placeholder={t("system.turn_group_schedule.turn_group3")} >
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
        form={turnGroupScheduleForm}
        layout="vertical"
        initialValues={turnGroupScheduleData}
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
export default TurnGroupScheduleEdit;
