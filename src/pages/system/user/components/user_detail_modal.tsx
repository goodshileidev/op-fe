import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {UserType} from '@/common/data_type/system/user'
import {useTranslation} from 'react-i18next';
import UserDetail from './user_detail'

interface IUserDetailModalProps {
  isUserDetailModalOpen?: boolean
  userId: string

  onClose: any
}

const UserDetailModal: React.FC<IUserDetailModalProps> = ((props) => {
  const userId = props.userId
  const { t } = useTranslation();
  let isOpen = props.isUserDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user')})}
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
        <UserDetail userId={props.userId} isOpen={isOpen}
             />
    </Modal>
  );
})
export default UserDetailModal;
