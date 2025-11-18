import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {UserType} from '@/common/data_type/system/user'
import {useTranslation} from 'react-i18next';
import UserDetail from './user_detail'

interface IUserDetailDrawerProps {
  isUserDetailDrawerOpen?: boolean
  userId: string

  onClose: any
}

const UserDetailDrawer: React.FC<IUserDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isUserDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <UserDetail userId={props.userId} isOpen={isOpen}
             />
        </Drawer>
      </div>
    )
})

export default UserDetailDrawer;
