import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {useTranslation} from 'react-i18next';
import ReceiptOrgDetail from './receipt_org_detail'

interface IReceiptOrgDetailDrawerProps {
  isReceiptOrgDetailDrawerOpen?: boolean
  receiptOrgId: string

  onClose: any
}

const ReceiptOrgDetailDrawer: React.FC<IReceiptOrgDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isReceiptOrgDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

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
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <ReceiptOrgDetail receiptOrgId={props.receiptOrgId} isOpen={isOpen}
             />
        </Drawer>
      </div>
    )
})

export default ReceiptOrgDetailDrawer;
