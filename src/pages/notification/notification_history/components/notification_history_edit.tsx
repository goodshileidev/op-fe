import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getNotificationHistory, updateNotificationHistory, createNotificationHistory} from "@/common/service/notification/notification_history";
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {NotificationHistoryRules} from './notification_history_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";


interface INotificationHistoryEditProps {
  notificationHistoryId: string
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
const NotificationHistoryEdit: React.FC<INotificationHistoryEditProps> = ((props) => {
  const notificationHistoryId = props.notificationHistoryId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [notificationHistoryForm] = Form.useForm();
  const isEdit = notificationHistoryId !== undefined && notificationHistoryId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [notificationHistoryData, setNotificationHistoryData] = useState<NotificationHistoryType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getNotificationHistoryDetail = async (notificationHistoryId: string) => {
    const response = await getNotificationHistory(notificationHistoryId);
    const {data, code} = response
    if (code === 200 && data) {
      notificationHistoryForm.setFieldsValue({...data,})
      setNotificationHistoryData(data)
    } else {
      setNotificationHistoryData(null);
    }
  }

  useEffect(() => {
    if (notificationHistoryId && notificationHistoryId!=="" && notificationHistoryId!=="0") {
      getNotificationHistoryDetail(notificationHistoryId)
    } else {
      setNotificationHistoryData({})
      notificationHistoryForm.resetFields();
    }
  }, [notificationHistoryId, notificationHistoryForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      notificationHistoryForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      notificationHistoryForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await notificationHistoryForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && notificationHistoryId && notificationHistoryId!=='0') {
      values.notificationHistoryId = notificationHistoryId
      updateNotificationHistory(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('notification.notification_history')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createNotificationHistory(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.notificationHistoryId){
            response.data.notificationHistoryId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('notification.notification_history')}));
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
    notificationHistoryForm.resetFields()
  }


  // // 编辑通知记录时候 获取通知记录数据失败
  // if (isEdit && notificationHistoryId && (notificationHistoryData === null || notificationHistoryData.notificationHistoryId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('notification.notification_history')}):t("common.title.add",{'entity':t('notification.notification_history')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('notification.notification_history')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('notification.notification_history')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/notification/notification_history/notification_history_table')}>
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
      <Form form={notificationHistoryForm}
                layout="vertical"
                initialValues={notificationHistoryData}
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
<Form.Item name="documentNo" label={t("notification.notification_history.document_no")}
    rules={NotificationHistoryRules.documentNo}
    >
    <Input placeholder={t("notification.notification_history.document_no")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="notifiedPersonName" label={t("notification.notification_history.notified_person_name")}
    rules={NotificationHistoryRules.notifiedPersonName}
    >
    <Input placeholder={t("notification.notification_history.notified_person_name")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="notifiedPersonId" label={t("notification.notification_history.notified_person_id")}
    rules={NotificationHistoryRules.notifiedPersonId}
    >
    <Input placeholder={t("notification.notification_history.notified_person_id")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
  <Form.Item name="notifiedPersonReceiptMethod" label={t("notification.notification_history.notified_person_receipt_method")} valuePropName="checked"
    rules={NotificationHistoryRules.notifiedPersonReceiptMethod}>
    <Checkbox.Group
    placeholder={t("notification.notification_history.notified_person_receipt_method")}
    options={
      codeList.TifiedPersonReceiptMethod
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={12}>
<Form.Item name="notificationTimeDesc" label={t("notification.notification_history.notification_time_desc")}
    rules={NotificationHistoryRules.notificationTimeDesc}
    >
    <Input placeholder={t("notification.notification_history.notification_time_desc")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
  <Form.Item name="receiptMethod" label={t("notification.notification_history.receipt_method")} valuePropName="checked"
    rules={NotificationHistoryRules.receiptMethod}>
    <Checkbox.Group
    placeholder={t("notification.notification_history.receipt_method")}
    options={
      codeList.ReceiptMethod
    }
  />
  </Form.Item>
</Col>


<Col className="gutter-row" span={12}>
  <Form.Item name="isReceiptRequired" label={t("notification.notification_history.is_receipt_required")} valuePropName="checked"
    rules={NotificationHistoryRules.isReceiptRequired}>
    <Radio.Group
        options={
        codeList.YesNo
        }
        placeholder={t("notification.notification_history.is_receipt_required")}
        optionType="button"
        buttonStyle="solid"
      />
  </Form.Item>
</Col>


        </Row>

      </Form>
    </>
  )
})
export default NotificationHistoryEdit;
