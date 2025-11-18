import React from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SendConfigType} from '@/common/data_type/template/send_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ISendConfigTableEditorProps {
  sendConfigList: SendConfigType[]
  onUpdate: any
}

const SendConfigTableEditor: React.FC<ISendConfigTableEditorProps> = ((props) => {
  const {t} = useTranslation();
  const sendConfigList = props.sendConfigList


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete sendConfigList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = [
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

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: SendConfigType, index: number) => (
        <Space size="middle">
          <Popconfirm
            title={t("common.row_delete_title")}
            description={t("common.row_delete_description")}
            onConfirm={(e) => confirm(e, row, index)}
            onCancel={cancel}
            okText={t("common.yes")}
            cancelText={t("common.no")}
          >
            <Button icon={<DeleteFilled/>} type="link">
              {t("common.button.delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.send_config')})} bordered={true}>
        <div>
          <Button type="primary" onClick={() => {
            const newRow: SendConfigType = {}
            newRow.sendConfigId = uuid()
            sendConfigList.push(newRow)
          }}>
            {t("common.button.add")}
          </Button>
        </div>
        <>
          <Table
            style={{
              width: "100%"
            }}
            columns={columns}
            dataSource={props.sendConfigList}
            rowKey="sendConfigId"/>
        </>
      </Card>
    </div>
  )
})

export default SendConfigTableEditor;

