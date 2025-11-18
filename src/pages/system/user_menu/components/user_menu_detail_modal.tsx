import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {UserMenuType} from '@/common/data_type/system/user_menu'
import {useTranslation} from 'react-i18next';
import UserMenuDetail from './user_menu_detail'

interface IUserMenuDetailModalProps {
  isUserMenuDetailModalOpen?: boolean
  userMenuId: string
  userMenuData?: UserMenuType
  onClose: any
}

const UserMenuDetailModal: React.FC<IUserMenuDetailModalProps> = ((props) => {
  const userMenuId = props.userMenuId
  const { t } = useTranslation();
  let isOpen = props.isUserMenuDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user_menu')})}
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
        <UserMenuDetail
          userMenuId={props.userMenuId}
          userMenuData={props.userMenuData}
          isOpen={isOpen}
          />
    </Modal>
  );
})
export default UserMenuDetailModal;
