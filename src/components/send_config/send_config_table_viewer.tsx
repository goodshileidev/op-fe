import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SendConfigType} from '@/common/data_type/template/send_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ISendConfigTableViewerProps {
  sendConfigList: SendConfigType[]
}

const SendConfigTableViewer: React.FC<ISendConfigTableViewerProps> = ((props) => {
  const {t} = useTranslation();
  const sendConfigList = props.sendConfigList
  console.debug("SendConfigTableViewer->sendConfigList", props.sendConfigList)


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete sendConfigList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []


  columns.push({align: "center",
    title: t("template.send_config.send_timing"),
    key: "send_timing",
    dataIndex: "sendTiming",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("template.send_config.send_org_type"),
    key: "send_org_type",
    dataIndex: "sendOrgType",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("template.send_config.receipt_org_name"),
    key: "receipt_org_name",
    dataIndex: "receiptOrgName",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("template.send_config.receipt_org_no"),
    key: "receipt_org_no",
    dataIndex: "receiptOrgNo",
    className: " text_center ",
  })

  const operateColumn = {
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
  }

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.send_config')})} bordered={true}>
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

export default SendConfigTableViewer;

