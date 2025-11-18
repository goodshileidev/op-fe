import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {UserMenuType} from '@/common/data_type/system/user_menu'
import {useTranslation} from 'react-i18next';
import UserMenuDetail from './user_menu_detail'

interface IUserMenuDetailDrawerProps {
  isDetailDrawerOpen?: boolean
  userMenuId: string
  userMenuData?: UserMenuType
  onClose: any
}

const UserMenuDetailDrawer: React.FC<IUserMenuDetailDrawerProps> = ((props) => {
  const userMenuId = props.userMenuId
  const { t } = useTranslation();
  let isOpen = props.isDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.user_menu')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <UserMenuDetail
          userMenuId={props.userMenuId}
          userMenuData={props.userMenuData}
          isOpen={isOpen}
          />
      </Drawer>
    </div>
  )
})
export default UserMenuDetailDrawer;
