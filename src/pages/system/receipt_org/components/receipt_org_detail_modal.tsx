import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {useTranslation} from 'react-i18next';
import ReceiptOrgDetail from './receipt_org_detail'

interface IReceiptOrgDetailModalProps {
  isReceiptOrgDetailModalOpen?: boolean
  receiptOrgId: string

  onClose: any
}

const ReceiptOrgDetailModal: React.FC<IReceiptOrgDetailModalProps> = ((props) => {
  const receiptOrgId = props.receiptOrgId
  const { t } = useTranslation();
  let isOpen = props.isReceiptOrgDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.receipt_org')})}
          open={isOpen}
          okText={t("common.button.close")}
          onOk={handleClose}
          onCancel={handleClose}
          open={isOpen}
          okType={"primary"}
          footer={[
            <Button type={'primary'} onClick={() => {
             isOpen = false
             handleClose()
           }}>
           {t("common.button.close")}
          </Button>]}
        >
        <ReceiptOrgDetail receiptOrgId={props.receiptOrgId} isOpen={isOpen}
             />
    </Modal>
  );
})
export default ReceiptOrgDetailModal;
