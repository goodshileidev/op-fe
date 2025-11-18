import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {useTranslation} from 'react-i18next';
import TurnGroupScheduleDetail from './turn_group_schedule_detail'

interface ITurnGroupScheduleDetailModalProps {
  isTurnGroupScheduleDetailModalOpen?: boolean
  turnGroupScheduleId: string
  onClose: any
}

const TurnGroupScheduleDetailModal: React.FC<ITurnGroupScheduleDetailModalProps> = ((props) => {
  const turnGroupScheduleId = props.turnGroupScheduleId
  const { t } = useTranslation();
  let isOpen = props.isTurnGroupScheduleDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.turn_group_schedule')})}
          open={isOpen}
          okText={t("common.button.close")}
          onOk={handleClose}
          onCancel={handleClose}
          open={isOpen}
          okType={"primary"}
          footer={[
            <Button type={'primary'} onClick={() => {
             isOpen = false
             handleClose()
           }}>
           {t("common.button.close")}
          </Button>]}
        >
        <TurnGroupScheduleDetail
          turnGroupScheduleId={props.turnGroupScheduleId}
          isOpen={isOpen}
          />
    </Modal>
  );
})
export default TurnGroupScheduleDetailModal;
