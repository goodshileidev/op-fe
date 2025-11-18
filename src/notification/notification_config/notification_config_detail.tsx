import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {getNotificationConfig} from '@/common/service/notification/notification_config'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';


interface INotificationConfigDetailProps {
  isNotificationConfigDetailModalVisible?: boolean
  notificationConfigId: string
  onClose: any
}

const NotificationConfigDetail: React.FC<INotificationConfigDetailProps> = ((props) => {
  const notificationConfigId = props.notificationConfigId
  const [notificationConfigData, setNotificationConfigData] = useState<NotificationConfigType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  let isVisible = props.isNotificationConfigDetailModalVisible




  const getNotificationConfigDetail = async (notificationConfigId: string) => {
    setLoading(true);
    const response = await getNotificationConfig(notificationConfigId);
    setNotificationConfigData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (notificationConfigId) {
      getNotificationConfigDetail(notificationConfigId)
    }
  }, [notificationConfigId])

  //if (notificationConfigData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  
  // const data = []
  const handleClose = () => {
    props.onClose(false)
  }
  return (
        <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('notification.notification_config')})}
          open={isVisible}
          okText={t("common.close")}
          onOk={handleClose}
          onCancel={handleClose}
          open={isVisible}
          okType={"primary"}
          footer={[
            <Button type={'primary'} onClick={() => {
             isVisible = false
             handleClose()
           }}>
           {t("common.button.close")}
          </Button>]}
        >
          <Spin spinning={loading}>
            <Descriptions bordered column={1}>
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
            .filter((item:any) => (item.value===notificationConfigData.notifiedPersonReceiptMethod))
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
            .filter((item:any) => (item.value===notificationConfigData.receiptMethod))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
      </Descriptions.Item>



            </Descriptions>

          </Spin>
        </Modal>
  );
})
export default NotificationConfigDetail;
