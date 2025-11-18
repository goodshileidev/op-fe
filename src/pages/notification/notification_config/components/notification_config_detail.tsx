import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {getNotificationConfig} from '@/common/service/notification/notification_config'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface INotificationConfigDetailProps {
  notificationConfigId: string
  isOpen: boolean
}

const NotificationConfigDetail: React.FC<INotificationConfigDetailProps> = ((props) => {
  const notificationConfigId = props.notificationConfigId
  const [notificationConfigData, setNotificationConfigData] = useState<NotificationConfigType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen





  const getNotificationConfigDetail = async (notificationConfigId: string) => {
    setLoading(true);
    const response = await getNotificationConfig(notificationConfigId);
    setNotificationConfigData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (notificationConfigId && notificationConfigId!=="" && notificationConfigId!=="0") {
      getNotificationConfigDetail(notificationConfigId)
    }
  }, [notificationConfigId, isOpen])

  //if (notificationConfigData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  

  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("notification.notification_config.document_id")}>
        {notificationConfigData.documentId}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_config.document_no")}>
        {notificationConfigData.documentNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_config.notified_person_type")}>
        {codeList.TifiedPersonType
            .filter((item:any) => (item.value===notificationConfigData.notifiedPersonType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("notification.notification_config.notified_person_receipt_method")}>
        {codeList.TifiedPersonReceiptMethod
            .filter((item:any) => (notificationConfigData.notifiedPersonReceiptMethod).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("notification.notification_config.notify_timing")}>
        {notificationConfigData.notifyTiming}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_config.notification_timing_business_description")}>
        {notificationConfigData.notificationTimingBusinessDescription}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_config.notification_detailed_content_template")}>
        {notificationConfigData.notificationDetailedContentTemplate}
  </Descriptions.Item>

  <Descriptions.Item label={t("notification.notification_config.is_receipt_record_required")}>
        {codeList.YesNo
            .filter((item:any) => (item.value===notificationConfigData.isReceiptRecordRequired))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("notification.notification_config.receipt_method")}>
        {codeList.ReceiptMethod
            .filter((item:any) => (notificationConfigData.receiptMethod).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>



      </Descriptions>

    </>
  );
})
export default NotificationConfigDetail;
