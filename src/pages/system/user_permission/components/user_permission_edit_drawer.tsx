import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {useTranslation} from 'react-i18next';
import UserPermissionEdit from './user_permission_edit'


interface IUserPermissionEditDrawerProps {
  isEditDrawerOpen?: boolean
  userPermissionId: string

  onClose: any
}

const UserPermissionEditDrawer: React.FC<IUserPermissionEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const userPermissionId = props.userPermissionId
  const isEdit = userPermissionId !== undefined && userPermissionId !=='' && userPermissionId !=='0';

  const { t } = useTranslation();
  let isOpen = props.isEditDrawerOpen

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

  const handleUpdate = (updated:boolean, data:UserPermissionType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('system.user_permission')}):t("common.title.add",{'entity':t('system.user_permission')})}
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
        <UserPermissionEdit
          userPermissionId={userPermissionId}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          
          />
        </Drawer>
      </div>
  )
})
export default UserPermissionEditDrawer;
