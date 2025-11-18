import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {useTranslation} from 'react-i18next';
import NotificationConfigDetail from './notification_config_detail'

interface INotificationConfigDetailModalProps {
  isNotificationConfigDetailModalOpen?: boolean
  notificationConfigId: string

  onClose: any
}

const NotificationConfigDetailModal: React.FC<INotificationConfigDetailModalProps> = ((props) => {
  const notificationConfigId = props.notificationConfigId
  const { t } = useTranslation();
  let isOpen = props.isNotificationConfigDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('notification.notification_config')})}
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
        <NotificationConfigDetail notificationConfigId={props.notificationConfigId} isOpen={isOpen}
             />
    </Modal>
  );
})
export default NotificationConfigDetailModal;
