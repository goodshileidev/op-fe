import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import ReceiptOrgEdit from './receipt_org_edit'
interface IReceiptOrgEditDrawerProps {
  isReceiptOrgEditDrawerOpen?: boolean
  receiptOrgId: string

  onClose: any
}

const ReceiptOrgEditDrawer: React.FC<IReceiptOrgEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const receiptOrgId = props.receiptOrgId
  const isEdit = receiptOrgId !== undefined && receiptOrgId !=='' && receiptOrgId !=='0';
  let isOpen = props.isReceiptOrgEditDrawerOpen
  const { t } = useTranslation();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleClose = () => {
    props.onClose(false)
    return false
  }

  const handleUpdate = (updated:boolean, data:ReceiptOrgType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('system.receipt_org')}):t("common.title.add",{'entity':t('system.receipt_org')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
            <Button onClick={handleReset}>
              {t("common.button.reset")}
            </Button>
            <Button onClick={handleSubmit} type="primary">
              {t("common.button.save")}
            </Button>
          </Space>
        }
        >
        <ReceiptOrgEdit receiptOrgId={receiptOrgId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
        </Drawer>
      </div>
    )
})

export default ReceiptOrgEditDrawer;
