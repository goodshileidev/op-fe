import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {useTranslation} from 'react-i18next';
import UserPermissionDetail from './user_permission_detail'

interface IUserPermissionDetailDrawerProps {
  isDetailDrawerOpen?: boolean
  userPermissionId: string
  onClose: any
}

const UserPermissionDetailDrawer: React.FC<IUserPermissionDetailDrawerProps> = ((props) => {
  const userPermissionId = props.userPermissionId
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
          title={t("common.title.detail",{'entity':t('system.user_permission')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <UserPermissionDetail
          userPermissionId={props.userPermissionId}
          isOpen={isOpen}
          />
      </Drawer>
    </div>
  )
})
export default UserPermissionDetailDrawer;
