import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {useTranslation} from 'react-i18next';
import TurnGroupScheduleDetail from './turn_group_schedule_detail'

interface ITurnGroupScheduleDetailDrawerProps {
  isDetailDrawerOpen?: boolean
  turnGroupScheduleId: string
  onClose: any
}

const TurnGroupScheduleDetailDrawer: React.FC<ITurnGroupScheduleDetailDrawerProps> = ((props) => {
  const turnGroupScheduleId = props.turnGroupScheduleId
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
          title={t("common.title.detail",{'entity':t('system.turn_group_schedule')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <TurnGroupScheduleDetail
          turnGroupScheduleId={props.turnGroupScheduleId}
          isOpen={isOpen}
          />
      </Drawer>
    </div>
  )
})
export default TurnGroupScheduleDetailDrawer;
