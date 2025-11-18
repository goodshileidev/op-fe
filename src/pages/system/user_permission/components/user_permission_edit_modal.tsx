import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import UserPermissionEdit from './user_permission_edit'


interface IUserPermissionEditModalProps {
  isUserPermissionEditModalOpen?: boolean
  userPermissionId: string

  onClose: any
}

const UserPermissionEditModal: React.FC<IUserPermissionEditModalProps> = ((props) => {
  const userPermissionId = props.userPermissionId
  const isEdit = userPermissionId !== undefined && userPermissionId !=='' && userPermissionId !=='0';
  const [userPermissionForm] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [userPermissionData, setUserPermissionData] = useState<UserPermissionType | any>({})

  const { t } = useTranslation();
  let isOpen = props.isUserPermissionEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated:boolean, data:UserPermissionType) => {
    console.debug("handleUpdate", data)
    props.onClose(updated, data)
    return true
  }

  const handleCancel = () => {
      props.onClose(false)
      return true
  }

  return (
    <Modal
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('system.user_permission')}):t("common.title.add",{'entity':t('system.user_permission')})}
          open={isOpen}
          okText={t("common.button.save")}
          cancelText={t("common.button.cancel")}
          onOk={handleSubmit}
          onCancel={handleCancel}
          okType={"primary"}
          footer={[
              <Button key="cancel" onClick={handleCancel}>
                {t("common.button.cancel")}
              </Button>,
              <Button key="back" onClick={handleReset}>
                {t("common.button.reset")}
              </Button>,
              <Button key="submit" type="primary" onClick={handleSubmit}>
                {t("common.button.submit")}
              </Button>
            ]}
        >
        <UserPermissionEdit
          userPermissionId={props.userPermissionId}
          isOpen={isOpen}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          
          />
    </Modal>
  )
})
export default UserPermissionEditModal;
