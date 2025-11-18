import React from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SendHistoryType} from '@/common/data_type/form/send_history'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ISendHistoryTableEditorProps {
  sendHistoryList: SendHistoryType[]
  onUpdate: any
}

const SendHistoryTableEditor: React.FC<ISendHistoryTableEditorProps> = ((props) => {
  const {t} = useTranslation();
  const sendHistoryList = props.sendHistoryList


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete sendHistoryList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = [
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

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: SendHistoryType, index: number) => (
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
      <Card title={t("common.title.list", {'entity': t('form.send_history')})} bordered={true}>
        <div>
          <Button type="primary" onClick={() => {
            const newRow: SendHistoryType = {}
            newRow.sendHistoryId = uuid()
            sendHistoryList.push(newRow)
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
            dataSource={props.sendHistoryList}
            rowKey="sendHistoryId"/>
        </>
      </Card>
    </div>
  )
})

export default SendHistoryTableEditor;

