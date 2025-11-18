import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {NotificationHistoryRules} from './notification_history_validate'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getNotificationHistory, updateNotificationHistory, createNotificationHistory} from "@/common/service/notification/notification_history";
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NotificationHistoryEdit from './components/notification_history_edit'

const NotificationHistoryEditPage: React.FC = (() => {
  const {notificationHistoryId} = useParams<{notificationHistoryId: string}>()
  const isEdit = (notificationHistoryId !== undefined && notificationHistoryId !=='0');
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = () => {
    navigate("/notification/notification_history/notification_history_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/notification/notification_history/notification_history_table/", { replace: true });
  }

  return (
   <>
    <Card title={isEdit ? t("common.title.edit",{'entity':t('notification.notification_history')}) : t("common.title.add",{'entity':t('notification.notification_history')})} bordered={false} style={{width: "80%"}}>
        <NotificationHistoryEdit notificationHistoryId={notificationHistoryId} isOpen={true} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}/>
      <Space>
          <Button type="primary" htmlType="submit"
           onClick={handleSubmit}>
            {t("common.button.save")}
          </Button>
          <Button htmlType="button"
            onClick={handleReset}
            style={{marginLeft: 8}}>
            {t("common.button.reset")}
          </Button>
          <Button htmlType="button"
            onClick={handleBack}
            style={{marginLeft: 8}}>
            {t("common.button.back")}
          </Button>
      </Space>
    </Card>
  </>
  )
})

export default NotificationHistoryEditPage;
