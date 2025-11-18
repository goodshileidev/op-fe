import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SendHistoryType} from '@/common/data_type/form/send_history'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ISendHistoryTableViewerProps {
  sendHistoryList: SendHistoryType[]
}

const SendHistoryTableViewer: React.FC<ISendHistoryTableViewerProps> = ((props) => {
  const {t} = useTranslation();
  const sendHistoryList = props.sendHistoryList
  console.debug("SendHistoryTableViewer->sendHistoryList", props.sendHistoryList)


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete sendHistoryList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []


  columns.push({align: "center",
    title: t("form.send_history.send_time"),
    key: "send_time",
    dataIndex: "sendTime",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("form.send_history.receipt_org_name"),
    key: "receipt_org_name",
    dataIndex: "receiptOrgName",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("form.send_history.receipt_org_no"),
    key: "receipt_org_no",
    dataIndex: "receiptOrgNo",
    className: " text_center ",
  })

  const operateColumn = {
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
  }

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('form.send_history')})} bordered={true}>
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

export default SendHistoryTableViewer;

