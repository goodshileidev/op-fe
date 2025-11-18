import React from 'react'
import {Card, Input} from 'antd'
import {SendHistoryType} from '@/common/data_type/form/send_history'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"

interface ISendHistoryFormEditorProps {
  fieldName: string
  sendHistoryList: array
  onUpdate: any
}

const SendHistoryFormEditor: React.FC<ISendHistoryFormEditorProps> = ((props) => {
  const {t} = useTranslation();


  const fields = [
    {
      title: t("form.send_history.send_time"),
      key: "send_time",
      componentType: "datetime",
      dataIndex: "sendTime",
      render: (text: string, row: SendHistoryType, index: number) => (
        <DatePicker
          value={row.sendTime}
          format="YYYY-MM-DD"
          placeholder={t("form.send_history.send_time")}/>
      ),
      className: " text_center ",
    },
    {
      title: t("form.send_history.receipt_org_name"),
      key: "receipt_org_name",
      componentType: "text",
      dataIndex: "receiptOrgName",
      render: (text: string, row: SendHistoryType, index: number) => (
        <Input placeholder={t("form.send_history.receipt_org_name")}
               value={row.receiptOrgName}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("form.send_history.receipt_org_no"),
      key: "receipt_org_no",
      componentType: "text",
      dataIndex: "receiptOrgNo",
      render: (text: string, row: SendHistoryType, index: number) => (
        <Input placeholder={t("form.send_history.receipt_org_no")}
               value={row.receiptOrgNo}
        />
      ),
      className: " text_center ",
    },

  ]

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('form.send_history')})} bordered={true}>
        <DynamicForm
          title={t("common.title.edit")}
          initData={props.sendHistoryList}
          fields={fields}
          fieldName={props.fieldName}
          onUpdate={props.onUpdate}
        />
      </Card>
    </div>
  )
})

export default SendHistoryFormEditor;

