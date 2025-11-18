import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import UserHistoryEdit from './user_history_edit'
interface IUserHistoryEditDrawerProps {
  isUserHistoryEditDrawerOpen?: boolean
  userHistoryId: string

  onClose: any
}

const UserHistoryEditDrawer: React.FC<IUserHistoryEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const userHistoryId = props.userHistoryId
  const isEdit = userHistoryId !== undefined && userHistoryId !=='' && userHistoryId !=='0';
  let isOpen = props.isUserHistoryEditDrawerOpen
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

  const handleUpdate = (updated:boolean, data:UserHistoryType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('system.user_history')}):t("common.title.add",{'entity':t('system.user_history')})}
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
        <UserHistoryEdit userHistoryId={userHistoryId} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}
           />
        </Drawer>
      </div>
    )
})

export default UserHistoryEditDrawer;
