import React from 'react'
import {Card, Input} from 'antd'
import {SendConfigType} from '@/common/data_type/template/send_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"

interface ISendConfigFormEditorProps {
  fieldName: string
  sendConfigList: array
  onUpdate: any
}

const SendConfigFormEditor: React.FC<ISendConfigFormEditorProps> = ((props) => {
  const {t} = useTranslation();


  const fields = [
    {
      title: t("template.send_config.send_timing"),
      key: "send_timing",
      componentType: "text",
      dataIndex: "sendTiming",
      render: (text: string, row: SendConfigType, index: number) => (
        <Input placeholder={t("template.send_config.send_timing")}
               value={row.sendTiming}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("template.send_config.send_org_type"),
      key: "send_org_type",
      componentType: "text",
      dataIndex: "sendOrgType",
      render: (text: string, row: SendConfigType, index: number) => (
        <Input placeholder={t("template.send_config.send_org_type")}
               value={row.sendOrgType}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("template.send_config.receipt_org_name"),
      key: "receipt_org_name",
      componentType: "text",
      dataIndex: "receiptOrgName",
      render: (text: string, row: SendConfigType, index: number) => (
        <Input placeholder={t("template.send_config.receipt_org_name")}
               value={row.receiptOrgName}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("template.send_config.receipt_org_no"),
      key: "receipt_org_no",
      componentType: "text",
      dataIndex: "receiptOrgNo",
      render: (text: string, row: SendConfigType, index: number) => (
        <Input placeholder={t("template.send_config.receipt_org_no")}
               value={row.receiptOrgNo}
        />
      ),
      className: " text_center ",
    },

  ]

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.send_config')})} bordered={true}>
        <DynamicForm
          title={t("common.title.edit")}
          initData={props.sendConfigList}
          fields={fields}
          fieldName={props.fieldName}
          onUpdate={props.onUpdate}
        />
      </Card>
    </div>
  )
})

export default SendConfigFormEditor;

