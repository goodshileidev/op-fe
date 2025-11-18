import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import NotificationConfigEdit from './notification_config_edit'
interface INotificationConfigEditDrawerProps {
  isNotificationConfigEditDrawerOpen?: boolean
  notificationConfigId: string

  onClose: any
}

const NotificationConfigEditDrawer: React.FC<INotificationConfigEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const notificationConfigId = props.notificationConfigId
  const isEdit = notificationConfigId !== undefined && notificationConfigId !=='' && notificationConfigId !=='0';
  let isOpen = props.isNotificationConfigEditDrawerOpen
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

  const handleUpdate = (updated:boolean, data:NotificationConfigType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('notification.notification_config')}):t("common.title.add",{'entity':t('notification.notification_config')})}
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
        <NotificationConfigEdit notificationConfigId={notificationConfigId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
        </Drawer>
      </div>
    )
})

export default NotificationConfigEditDrawer;
