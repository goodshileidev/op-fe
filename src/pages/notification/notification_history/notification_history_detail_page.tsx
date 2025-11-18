import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin, Space} from 'antd'
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {getNotificationHistory} from '@/common/service/notification/notification_history'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import NotificationHistoryDetail from './components/notification_history_detail'

const NotificationHistoryDetailPage: React.FC = (() => {
  const {notificationHistoryId} = useParams<{notificationHistoryId: string}>()
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/notification/notification_history/notification_history_table/", { replace: true });
  }

  return (
    <Card title={t("common.title.detail",{'entity':t('notification.notification_history')})} bordered={true}>
      <NotificationHistoryDetail notificationHistoryId={notificationHistoryId} isOpen={true}/>
      <Space>
          <Button htmlType="button"
            onClick={handleBack}
            style={{marginLeft: 8}}>
            {t("common.button.back")}
           </Button>
      </Space>
    </Card>
  );
})

export default NotificationHistoryDetailPage;
