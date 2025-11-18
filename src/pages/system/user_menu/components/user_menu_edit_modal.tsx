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
import {UserMenuType} from '@/common/data_type/system/user_menu'
import UserMenuEdit from './user_menu_edit'


interface IUserMenuEditModalProps {
  isUserMenuEditModalOpen?: boolean
  userMenuId: string
  userMenuData?: UserMenuType

  onClose: any
}

const UserMenuEditModal: React.FC<IUserMenuEditModalProps> = ((props) => {
  const userMenuId = props.userMenuId
  const isEdit = userMenuId !== undefined && userMenuId !=='' && userMenuId !=='0';
  const [userMenuForm] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [userMenuData, setUserMenuData] = useState<UserMenuType | any>({})

  const { t } = useTranslation();
  let isOpen = props.isUserMenuEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated:boolean, data:UserMenuType) => {
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
          title={isEdit?t("common.title.edit",{'entity':t('system.user_menu')}):t("common.title.add",{'entity':t('system.user_menu')})}
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
        <UserMenuEdit
          userMenuId={props.userMenuId}
          userMenuData={props.userMenuData}
          isOpen={isOpen}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          
          />
    </Modal>
  )
})
export default UserMenuEditModal;
