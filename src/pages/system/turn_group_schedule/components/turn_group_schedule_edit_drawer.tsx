import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {useTranslation} from 'react-i18next';
import TurnGroupScheduleEdit from './turn_group_schedule_edit'


interface ITurnGroupScheduleEditDrawerProps {
  isEditDrawerOpen?: boolean
  turnGroupScheduleId: string

  onClose: any
}

const TurnGroupScheduleEditDrawer: React.FC<ITurnGroupScheduleEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const turnGroupScheduleId = props.turnGroupScheduleId
  const isEdit = turnGroupScheduleId !== undefined && turnGroupScheduleId !=='' && turnGroupScheduleId !=='0';

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

  const handleUpdate = (updated:boolean, data:TurnGroupScheduleType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('system.turn_group_schedule')}):t("common.title.add",{'entity':t('system.turn_group_schedule')})}
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
        <TurnGroupScheduleEdit
          turnGroupScheduleId={turnGroupScheduleId}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          
          />
        </Drawer>
      </div>
  )
})
export default TurnGroupScheduleEditDrawer;
