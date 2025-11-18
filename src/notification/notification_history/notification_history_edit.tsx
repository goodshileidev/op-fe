import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Modal, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {NotificationHistoryRules} from './notification_history_validate'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getNotificationHistory, updateNotificationHistory, createNotificationHistory} from "@/common/service/notification/notification_history";
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";


const {TextArea} = Input;

const NotificationHistoryEdit: React.FC = (() => {
  const {notificationHistoryId} = useParams<{notificationHistoryId: string}>()
  const [notificationHistoryForm] = Form.useForm();
  const isEditing = (notificationHistoryId !== undefined && notificationHistoryId !=='0');
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [notificationHistoryData, setNotificationHistoryData] = useState<NotificationHistoryType | any>({})
  const { t } = useTranslation();
  const navigate = useNavigate();




  const getNotificationHistoryDetail = async (notificationHistoryId: string) => {
    const response = await getNotificationHistory((notificationHistoryId));
    const {data, code} = response
    if (code === 200 && data) {
      notificationHistoryForm.setFieldsValue({...data,})
      setNotificationHistoryData(data)
    } else {
      setNotificationHistoryData(null);
    }
  }


  useEffect(() => {
    if (isEdit && notificationHistoryId && notificationHistoryId!=='0') {
      getNotificationHistoryDetail(notificationHistoryId)
    }
  }, [notificationHistoryId, notificationHistoryForm])


  const handleSubmit = async () => {
    const values = await notificationHistoryForm.validateFields();
    // 修改
    if (isEditing && notificationHistoryId && notificationHistoryId!=='0') {
      values.notificationHistoryId = notificationHistoryId
      updateNotificationHistory(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(msg);
          history.push('/notification/notification_history/notification_history_list');
        }
      });
    } else {
      // 新增
      createNotificationHistory(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.add_success",{'entity':t('notification.notification_history')}));
          history.push('/notification/notification_history/notification_history_list');
        } else {
          message.error(msg);
        }
      });
    }
  };

  const handleReset = () => {
    notificationHistoryForm.resetFields()
  }

  const handleBack = () => {
    navigate("/notification/notification_history/notification_history_table/", { replace: true });
  }

  // // 编辑用户时候 获取用户数据失败
  // if (isEditing && notificationHistoryId && (notificationHistoryData === null || notificationHistoryData.notificationHistoryId == null)) {
  //   return (
  //     <Card title={isEditing?t("common.title.edit",{'entity':t('notification.notification_history')}):t("common.title.add",{'entity':t('notification.notification_history')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('notification.notification_history')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('notification.notification_history')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/notification/notification_history/notification_history_list')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

  return (
 <>
    <Card title={isEditing ? t("common.title.edit",{'entity':t('notification.notification_history')}) : t("common.add",{'entity':t('notification.notification_history')})} bordered={false} style={{width: "80%"}}>
      <Form
        form={notificationHistoryForm}
        layout="vertical"
        initialValues={notificationHistoryData}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFinish={handleSubmit}>
<Form.Item name="documentNo" label={t("notification.notification_history.document_no")}
    rules={NotificationHistoryRules.documentNo}
    >
    <Input placeholder={t("notification.notification_history.document_no")} />
</Form.Item>

<Form.Item name="notifiedPersonName" label={t("notification.notification_history.notified_person_name")}
    rules={NotificationHistoryRules.notifiedPersonName}
    >
    <Input placeholder={t("notification.notification_history.notified_person_name")} />
</Form.Item>

<Form.Item name="notifiedPersonId" label={t("notification.notification_history.notified_person_id")}
    rules={NotificationHistoryRules.notifiedPersonId}
    >
    <Input placeholder={t("notification.notification_history.notified_person_id")} />
</Form.Item>

<Form.Item name="notifiedPersonReceiptMethod" label={t("notification.notification_history.notified_person_receipt_method")} valuePropName="checked"
  rules={NotificationHistoryRules.notifiedPersonReceiptMethod}
  >
  <Checkbox.Group
    placeholder={t("notification.notification_history.notified_person_receipt_method")}
    options={
      codeList.TifiedPersonReceiptMethod
    }
  />
</Form.Item>


<Form.Item name="notificationDatetime" label={t("notification.notification_history.notification_datetime")}
    rules={NotificationHistoryRules.notificationDatetime}

 >
    <DatePicker format="YYYY-MM-DD" placeholder={t("notification.notification_history.notification_datetime")} />
</Form.Item>

<Form.Item name="notificationTimeDesc" label={t("notification.notification_history.notification_time_desc")}
    rules={NotificationHistoryRules.notificationTimeDesc}
    >
    <Input placeholder={t("notification.notification_history.notification_time_desc")} />
</Form.Item>

<Form.Item name="receiptMethod" label={t("notification.notification_history.receipt_method")} valuePropName="checked"
  rules={NotificationHistoryRules.receiptMethod}
  >
  <Checkbox.Group
    placeholder={t("notification.notification_history.receipt_method")}
    options={
      codeList.ReceiptMethod
    }
  />
</Form.Item>


<Form.Item name="receiptTime" label={t("notification.notification_history.receipt_time")}
    rules={NotificationHistoryRules.receiptTime}

 >
    <DatePicker format="YYYY-MM-DD" placeholder={t("notification.notification_history.receipt_time")} />
</Form.Item>

<Form.Item name="isReceiptRequired" label={t("notification.notification_history.is_receipt_required")}
    rules={NotificationHistoryRules.isReceiptRequired}
    >
    <Input placeholder={t("notification.notification_history.is_receipt_required")} />
</Form.Item>





        <Form.Item>
          <Button type="primary" htmlType="submit">
            {t("common.button.save")}
          </Button>
          <Button htmlType="button"
            onClick={handleReset}
            style={{marginLeft: 8}}>
            {t("common.button.reset")}
          </Button>
          <Button htmlType="button"
            onClick={handleBack}
            style={{marginLeft: 8}}>
            {t("common.button.back")}
          </Button>
        </Form.Item>
      </Form>
    </Card>
</>
  )
})

export default NotificationHistoryEdit;
