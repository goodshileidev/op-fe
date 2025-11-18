import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getNotificationConfig, updateNotificationConfig, createNotificationConfig} from "@/common/service/notification/notification_config";
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {NotificationConfigRules} from './notification_config_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";


const {TextArea} = Input;
interface INotificationConfigEditProps {
  isNotificationConfigEditModalVisible?: boolean
  notificationConfigId: string
  onClose: any
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const NotificationConfigEdit: React.FC<INotificationConfigEditProps> = ((props) => {
  const notificationConfigId = props.notificationConfigId
  const [notificationConfigForm] = Form.useForm();
  const isEditing = notificationConfigId !== undefined && notificationConfigId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [notificationConfigData, setNotificationConfigData] = useState<NotificationConfigType | any>({})
  const { t } = useTranslation();
  let isVisible = props.isNotificationConfigEditModalVisible





  const getNotificationConfigDetail = async (notificationConfigId: string) => {
    const response = await getNotificationConfig(notificationConfigId);
    const {data, code} = response
    if (code === 200 && data) {
      notificationConfigForm.setFieldsValue({...data,})
      setNotificationConfigData(data)
    } else {
      setNotificationConfigData(null);
    }
  }

  useEffect(() => {
    if (notificationConfigId) {
      getNotificationConfigDetail(notificationConfigId)
    }
  }, [notificationConfigId, notificationConfigForm])


  const handleSubmit = async () => {
    const values = await notificationConfigForm.validateFields();
    // 修改
    if (isEditing && notificationConfigId && notificationConfigId!=='0') {
      values.notificationConfigId = notificationConfigId
      updateNotificationConfig(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('notification.notification_config')}));
          isVisible=false
          props.onClose(true)
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createNotificationConfig(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.add_success",{'entity':t('notification.notification_config')}));
          isVisible=false
          props.onClose(true)
        } else {
          message.error(msg);
        }
      });
    }
  };

  const handleReset = () => {
    notificationConfigForm.resetFields()
  }

  const handleCancel = () => {
      props.onClose(false)
      return true
  }

  // // 编辑通知定义时候 获取通知定义数据失败
  // if (isEditing && notificationConfigId && (notificationConfigData === null || notificationConfigData.notificationConfigId == null)) {
  //   return (
  //     <Card title={isEditing?t("common.title.edit",{'entity':t('notification.notification_config')}):t("common.title.add",{'entity':t('notification.notification_config')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('notification.notification_config')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('notification.notification_config')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/notification/notification_config/notification_config_list')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

  return (
        <Modal
          width={"80%"}
          title={isEditing?t("common.title.edit",{'entity':t('notification.notification_config')}):t("common.title.add",{'entity':t('notification.notification_config')})}
          open={isVisible}
          okText={t("common.button.save")}
          cancelText={t("common.button.cancel")}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okType={"primary"}
            footer={[
              <Button key="back" onClick={handleReset}>
                {t("common.button.reset")}
              </Button>,
              <Button key="cancel" onClick={handleCancel}>
                {t("common.button.cancel")}
              </Button>,
              <Button key="submit" type="primary" onClick={handleSubmit}>
                {t("common.button.submit")}
              </Button>
            ]}
        >
              <Form
                form={notificationConfigForm}
                layout="vertical"
                initialValues={notificationConfigData}
                // labelCol={{ span: 4 }}
                // wrapperCol={{ span: 14 }}
                // style={{ maxWidth: 1920 }}
                disabled={formDisabled}
                onFinish={handleSubmit}>
<Form.Item name="documentNo" label={t("notification.notification_config.document_no")}
    rules={NotificationConfigRules.documentNo}
    >
    <Input placeholder={t("notification.notification_config.document_no")} />
</Form.Item>

<Form.Item name="notifiedPersonType" label={t("notification.notification_config.notified_person_type")}
    rules={NotificationConfigRules.notifiedPersonType}
 >
 <Select
    options={
        codeList.TifiedPersonType
      }
    placeholder={t("notification.notification_config.notified_person_type")} >
 </Select>
</Form.Item>

<Form.Item name="notifiedPersonReceiptMethod" label={t("notification.notification_config.notified_person_receipt_method")} valuePropName="checked"
  rules={NotificationConfigRules.notifiedPersonReceiptMethod}
  >
  <Checkbox.Group
    placeholder={t("notification.notification_config.notified_person_receipt_method")}
    options={
      codeList.TifiedPersonReceiptMethod
    }
  />
</Form.Item>


<Form.Item name="notifyTiming" label={t("notification.notification_config.notify_timing")}
    rules={NotificationConfigRules.notifyTiming}
    >
    <Input placeholder={t("notification.notification_config.notify_timing")} />
</Form.Item>

<Form.Item name="notificationTimingBusinessDescription" label={t("notification.notification_config.notification_timing_business_description")}
    rules={NotificationConfigRules.notificationTimingBusinessDescription}
    >
    <Input placeholder={t("notification.notification_config.notification_timing_business_description")} />
</Form.Item>

<Form.Item name="notificationDetailedContentTemplate" label={t("notification.notification_config.notification_detailed_content_template")}
   rules={NotificationConfigRules.notificationDetailedContentTemplate}
   style={{marginBottom: 60}}
   >
    <ReactQuill
        style={{
          height:100
        }}
        theme="snow" />
</Form.Item>

<Form.Item name="isReceiptRecordRequired" label={t("notification.notification_config.is_receipt_record_required")} valuePropName="checked"
    rules={NotificationConfigRules.isReceiptRecordRequired}>
  <Radio.Group
        options={
        codeList.YesNo
        }
        placeholder={t("notification.notification_config.is_receipt_record_required")}
        optionType="button"
        buttonStyle="solid"
      />
 </Form.Item>     

<Form.Item name="receiptMethod" label={t("notification.notification_config.receipt_method")} valuePropName="checked"
  rules={NotificationConfigRules.receiptMethod}
  >
  <Checkbox.Group
    placeholder={t("notification.notification_config.receipt_method")}
    options={
      codeList.ReceiptMethod
    }
  />
</Form.Item>



              </Form>

           </Modal>
  )
})
export default NotificationConfigEdit;
