import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getReceiptOrg, updateReceiptOrg, createReceiptOrg} from "@/common/service/system/receipt_org";
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {ReceiptOrgRules} from './receipt_org_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import ReceiptOrgEdit from './receipt_org_edit'

interface IReceiptOrgEditModalProps {
  isReceiptOrgEditModalOpen?: boolean
  receiptOrgId: string

  onClose: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ReceiptOrgEditModal: React.FC<IReceiptOrgEditModalProps> = ((props) => {
  const receiptOrgId = props.receiptOrgId
  const [receiptOrgForm] = Form.useForm();
  const isEdit = receiptOrgId !== undefined && receiptOrgId !=='' && receiptOrgId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [receiptOrgData, setReceiptOrgData] = useState<ReceiptOrgType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isReceiptOrgEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated:boolean, data:ReceiptOrgType) => {
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
          title={isEdit?t("common.title.edit",{'entity':t('system.receipt_org')}):t("common.title.add",{'entity':t('system.receipt_org')})}
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
        <ReceiptOrgEdit receiptOrgId={props.receiptOrgId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
    </Modal>
  )
})
export default ReceiptOrgEditModal;
