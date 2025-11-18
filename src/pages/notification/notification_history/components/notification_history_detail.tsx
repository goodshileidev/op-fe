import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {getNotificationHistory} from '@/common/service/notification/notification_history'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface INotificationHistoryDetailProps {
  notificationHistoryId: string
  isOpen: boolean
}

const NotificationHistoryDetail: React.FC<INotificationHistoryDetailProps> = ((props) => {
  const notificationHistoryId = props.notificationHistoryId
  const [notificationHistoryData, setNotificationHistoryData] = useState<NotificationHistoryType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen





  const getNotificationHistoryDetail = async (notificationHistoryId: string) => {
    setLoading(true);
    const response = await getNotificationHistory(notificationHistoryId);
    setNotificationHistoryData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (notificationHistoryId && notificationHistoryId!=="" && notificationHistoryId!=="0") {
      getNotificationHistoryDetail(notificationHistoryId)
    }
  }, [notificationHistoryId, isOpen])

  //if (notificationHistoryData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  return (
    <>
      <Descriptions bordered column={2}>
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
            .filter((item:any) => (notificationHistoryData.notifiedPersonReceiptMethod).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("notification.notification_history.notification_datetime")}>
        {notificationHistoryData.notificationDatetime}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_history.notification_time_desc")}>
        {notificationHistoryData.notificationTimeDesc}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_history.notification_content")}>
        {notificationHistoryData.notificationContent}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_history.receipt_method")}>
        {codeList.ReceiptMethod
            .filter((item:any) => (notificationHistoryData.receiptMethod).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("notification.notification_history.receipt_time")}>
        {notificationHistoryData.receiptTime}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_history.receipt_content")}>
        {notificationHistoryData.receiptContent}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_history.is_receipt_required")}>
        {codeList.YesNo
            .filter((item:any) => (item.value===notificationHistoryData.isReceiptRequired))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>



      </Descriptions>

    </>
  );
})
export default NotificationHistoryDetail;
