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
import TurnGroupScheduleEdit from './turn_group_schedule_edit'


interface ITurnGroupScheduleEditModalProps {
  isTurnGroupScheduleEditModalOpen?: boolean
  turnGroupScheduleId: string

  onClose: any
}

const TurnGroupScheduleEditModal: React.FC<ITurnGroupScheduleEditModalProps> = ((props) => {
  const turnGroupScheduleId = props.turnGroupScheduleId
  const isEdit = turnGroupScheduleId !== undefined && turnGroupScheduleId !=='' && turnGroupScheduleId !=='0';
  const [turnGroupScheduleForm] = Form.useForm();
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [turnGroupScheduleData, setTurnGroupScheduleData] = useState<TurnGroupScheduleType | any>({})

  const { t } = useTranslation();
  let isOpen = props.isTurnGroupScheduleEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated:boolean, data:TurnGroupScheduleType) => {
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
          title={isEdit?t("common.title.edit",{'entity':t('system.turn_group_schedule')}):t("common.title.add",{'entity':t('system.turn_group_schedule')})}
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
        <TurnGroupScheduleEdit
          turnGroupScheduleId={props.turnGroupScheduleId}
          isOpen={isOpen}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          
          />
    </Modal>
  )
})
export default TurnGroupScheduleEditModal;
