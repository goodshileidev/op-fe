import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {useTranslation} from 'react-i18next';
import NotificationConfigDetail from './notification_config_detail'

interface INotificationConfigDetailDrawerProps {
  isNotificationConfigDetailDrawerOpen?: boolean
  notificationConfigId: string

  onClose: any
}

const NotificationConfigDetailDrawer: React.FC<INotificationConfigDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isNotificationConfigDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('notification.notification_config')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <NotificationConfigDetail notificationConfigId={props.notificationConfigId} isOpen={isOpen}
             />
        </Drawer>
      </div>
    )
})

export default NotificationConfigDetailDrawer;
