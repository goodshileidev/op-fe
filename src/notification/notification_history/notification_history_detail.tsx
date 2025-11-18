import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin} from 'antd'
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {getNotificationHistory} from '@/common/service/notification/notification_history'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


const NotificationHistoryDetail: React.FC = (() => {
  const {notificationHistoryId} = useParams<{notificationHistoryId: string}>()
  const [notificationHistoryData, setNotificationHistoryData] = useState<NotificationHistoryType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();




  const getNotificationHistoryDetail = async (notificationHistoryId: string) => {
    setLoading(true);
    const response = await getNotificationHistory(notificationHistoryId);
    setNotificationHistoryData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (notificationHistoryId) {
      getNotificationHistoryDetail(notificationHistoryId)
    }
  }, [notificationHistoryId])

  //if (notificationHistoryData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  const handleBack = () => {
    navigate("/notification/notification_history/notification_history_table/", { replace: true });
  }

  return (
    <Card title={t("common.title.detail",{'entity':t('notification.notification_history')})} bordered={true}>
      <Spin spinning={loading}>
        <Descriptions bordered column={1}>
      <Descriptions.Item label={t("notification.notification_history.document_id")}>
        {notificationHistoryData.documentId}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.document_no")}>
        {notificationHistoryData.documentNo}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.notified_person_name")}>
        {notificationHistoryData.notifiedPersonName}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.notified_person_id")}>
        {notificationHistoryData.notifiedPersonId}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.notified_person_receipt_method")}>
        {codeList.TifiedPersonReceiptMethod
            .filter((item:any) => (item.value===notificationHistoryData.notifiedPersonReceiptMethod))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.notification_datetime")}>
        {notificationHistoryData.notificationDatetime}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.notification_time_desc")}>
        {notificationHistoryData.notificationTimeDesc}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.receipt_method")}>
        {codeList.ReceiptMethod
            .filter((item:any) => (item.value===notificationHistoryData.receiptMethod))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.receipt_time")}>
        {notificationHistoryData.receiptTime}
      </Descriptions.Item>


      <Descriptions.Item label={t("notification.notification_history.is_receipt_required")}>
        {notificationHistoryData.isReceiptRequired}
      </Descriptions.Item>



        </Descriptions>

      </Spin>
      <Button htmlType="button"
        onClick={handleBack}
        style={{marginLeft: 8}}>
        {t("common.button.back")}
       </Button>
    </Card>
  );
})

export default NotificationHistoryDetail;
