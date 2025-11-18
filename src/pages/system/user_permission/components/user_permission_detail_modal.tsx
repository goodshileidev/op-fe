import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {useTranslation} from 'react-i18next';
import UserPermissionDetail from './user_permission_detail'

interface IUserPermissionDetailModalProps {
  isUserPermissionDetailModalOpen?: boolean
  userPermissionId: string
  onClose: any
}

const UserPermissionDetailModal: React.FC<IUserPermissionDetailModalProps> = ((props) => {
  const userPermissionId = props.userPermissionId
  const { t } = useTranslation();
  let isOpen = props.isUserPermissionDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user_permission')})}
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
        <UserPermissionDetail
          userPermissionId={props.userPermissionId}
          isOpen={isOpen}
          />
    </Modal>
  );
})
export default UserPermissionDetailModal;
