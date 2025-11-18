import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {useTranslation} from 'react-i18next';
import UserHistoryDetail from './user_history_detail'

interface IUserHistoryDetailModalProps {
  isUserHistoryDetailModalOpen?: boolean
  userHistoryId: string

  onClose: any
}

const UserHistoryDetailModal: React.FC<IUserHistoryDetailModalProps> = ((props) => {
  const userHistoryId = props.userHistoryId
  const { t } = useTranslation();
  let isOpen = props.isUserHistoryDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user_history')})}
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
        <UserHistoryDetail userHistoryId={props.userHistoryId} isOpen={isOpen}
             />
    </Modal>
  );
})
export default UserHistoryDetailModal;
