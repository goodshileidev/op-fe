import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import ReceiptOrgList from './receipt_org_list'
interface IReceiptOrgListDrawerProps {
  isReceiptOrgListDrawerOpen?: boolean

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const ReceiptOrgListDrawer: React.FC<IReceiptOrgListDrawerProps> = Observer((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isReceiptOrgListDrawerOpen
  const { t } = useTranslation();

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.receipt_org')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>t("common.button.close")</Button>
            <Button onClick={handleClose} type="primary">
              t("common.button.ok")
            </Button>
          </Space>
        }
        >
        <ReceiptOrgList  />
        </Drawer>
      </div>
    )
})

export default ReceiptOrgListDrawer;
