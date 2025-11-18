import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserType} from '@/common/data_type/system/user'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import UserEdit from './user_edit'
interface IUserEditDrawerProps {
  isUserEditDrawerOpen?: boolean
  userId: string

  onClose: any
}

const UserEditDrawer: React.FC<IUserEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const userId = props.userId
  const isEdit = userId !== undefined && userId !=='' && userId !=='0';
  let isOpen = props.isUserEditDrawerOpen
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

  const handleUpdate = (updated:boolean, data:UserType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('system.user')}):t("common.title.add",{'entity':t('system.user')})}
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
        <UserEdit userId={userId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
        </Drawer>
      </div>
    )
})

export default UserEditDrawer;
