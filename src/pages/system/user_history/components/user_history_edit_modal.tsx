import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getUserHistory, updateUserHistory, createUserHistory} from "@/common/service/system/user_history";
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {UserHistoryRules} from './user_history_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import UserHistoryEdit from './user_history_edit'

interface IUserHistoryEditModalProps {
  isUserHistoryEditModalOpen?: boolean
  userHistoryId: string

  onClose: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UserHistoryEditModal: React.FC<IUserHistoryEditModalProps> = ((props) => {
  const userHistoryId = props.userHistoryId
  const [userHistoryForm] = Form.useForm();
  const isEdit = userHistoryId !== undefined && userHistoryId !=='' && userHistoryId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [userHistoryData, setUserHistoryData] = useState<UserHistoryType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isUserHistoryEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated:boolean, data:UserHistoryType) => {
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
          title={isEdit?t("common.title.edit",{'entity':t('system.user_history')}):t("common.title.add",{'entity':t('system.user_history')})}
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
        <UserHistoryEdit userHistoryId={props.userHistoryId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
    </Modal>
  )
})
export default UserHistoryEditModal;
