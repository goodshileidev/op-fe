import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {useTranslation} from 'react-i18next';
import InternalOrgDetail from './internal_org_detail'

interface IInternalOrgDetailModalProps {
  isInternalOrgDetailModalOpen?: boolean
  internalOrgId: string

  onClose: any
}

const InternalOrgDetailModal: React.FC<IInternalOrgDetailModalProps> = ((props) => {
  const internalOrgId = props.internalOrgId
  const { t } = useTranslation();
  let isOpen = props.isInternalOrgDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.internal_org')})}
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
        <InternalOrgDetail internalOrgId={props.internalOrgId} isOpen={isOpen}
             />
    </Modal>
  );
})
export default InternalOrgDetailModal;
