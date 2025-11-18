import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {useTranslation} from 'react-i18next';
import UserHistoryDetail from './user_history_detail'

interface IUserHistoryDetailDrawerProps {
  isUserHistoryDetailDrawerOpen?: boolean
  userHistoryId: string

  onClose: any
}

const UserHistoryDetailDrawer: React.FC<IUserHistoryDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isUserHistoryDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user_history')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <UserHistoryDetail userHistoryId={props.userHistoryId} isOpen={isOpen}
             />
        </Drawer>
      </div>
    )
})

export default UserHistoryDetailDrawer;
