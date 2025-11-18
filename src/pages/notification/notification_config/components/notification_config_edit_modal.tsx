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
import NotificationConfigEdit from './notification_config_edit'

interface INotificationConfigEditModalProps {
  isNotificationConfigEditModalOpen?: boolean
  notificationConfigId: string

  onClose: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const NotificationConfigEditModal: React.FC<INotificationConfigEditModalProps> = ((props) => {
  const notificationConfigId = props.notificationConfigId
  const [notificationConfigForm] = Form.useForm();
  const isEdit = notificationConfigId !== undefined && notificationConfigId !=='' && notificationConfigId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [notificationConfigData, setNotificationConfigData] = useState<NotificationConfigType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isNotificationConfigEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated:boolean, data:NotificationConfigType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  const handleCancel = () => {
      props.onClose(false)
      return true
  }

  return (
    <Modal
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('notification.notification_config')}):t("common.title.add",{'entity':t('notification.notification_config')})}
          open={isOpen}
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
        <NotificationConfigEdit notificationConfigId={props.notificationConfigId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
    </Modal>
  )
})
export default NotificationConfigEditModal;
