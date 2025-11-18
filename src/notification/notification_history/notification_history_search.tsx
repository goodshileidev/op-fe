import React, {useEffect, useState} from 'react'
import {Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface INotificationHistorySearchProps {
  onReloadTable: any,
  onAdd: any,
  pagination?: any
}

const NotificationHistorySearch: React.FC<INotificationHistorySearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchDocumentNo, setSearchDocumentNo] = useState();
  const [searchNotifiedPersonReceiptMethod, setSearchNotifiedPersonReceiptMethod] = useState();
  const [searchNotificationDatetime, setSearchNotificationDatetime] = useState();
  const [searchNotificationContent, setSearchNotificationContent] = useState();
  const [searchReceiptMethod, setSearchReceiptMethod] = useState();
  const [searchReceiptTime, setSearchReceiptTime] = useState();
  const [searchReceiptContent, setSearchReceiptContent] = useState();




  const handleAdd = () => {
    props.onAdd()
  };

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    const params=Object.assign({}, values, {
      pageNo: 1,
     pageSize:pagination.pageSize,
    })
    props.onReloadTable(params);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const params=Object.assign({}, {
      pageNo: 1,
     pageSize:pagination.pageSize,
    })
    props.onReloadTable(params);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportNotificationHistory({
      pageNo: 1,
     pageSize:pagination.pageSize,
      documentNo: searchDocumentNo,
      notifiedPersonReceiptMethod: searchNotifiedPersonReceiptMethod,
      notificationDatetime: searchNotificationDatetime,
      notificationContent: searchNotificationContent,
      receiptMethod: searchReceiptMethod,
      receiptTime: searchReceiptTime,
      receiptContent: searchReceiptContent,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
            }}>
    <div>
      <Form
        form={searchForm}
        layout="vertical"
        initialValues={searchData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFinish={handleSearch}>
<Form.Item name="documentNoCondition" label={t("notification.notification_history.document_no")}   style={{maxWidth:300}}>
    <Input placeholder={t("notification.notification_history.document_no")}
     />
</Form.Item>
<Form.Item name="notifiedPersonReceiptMethodCondition" label={t("notification.notification_history.notified_person_receipt_method")}  valuePropName="checked" style={{maxWidth:300}}>
  <Checkbox.Group
    placeholder={t("notification.notification_history.notified_person_receipt_method")}
    options={
      codeList.TifiedPersonReceiptMethod
    }
  />
</Form.Item>

<Form.Item name="notificationDatetimeStartCondition" label={t("notification.notification_history.notification_datetime")}  style={{maxWidth:300}}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("notification.notification_history.notification_datetime")}
    />
</Form.Item>
<Form.Item name="notificationDatetimeEndCondition" label={t("notification.notification_history.notification_datetime")}  style={{maxWidth:300}}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("notification.notification_history.notification_datetime")}
    />
</Form.Item>
<Form.Item name="notificationContentCondition" label={t("notification.notification_history.notification_content")}   style={{maxWidth:300}}>
    <Input placeholder={t("notification.notification_history.notification_content")}
     />
</Form.Item>
<Form.Item name="receiptMethodCondition" label={t("notification.notification_history.receipt_method")}  valuePropName="checked" style={{maxWidth:300}}>
  <Checkbox.Group
    placeholder={t("notification.notification_history.receipt_method")}
    options={
      codeList.ReceiptMethod
    }
  />
</Form.Item>

<Form.Item name="receiptTimeStartCondition" label={t("notification.notification_history.receipt_time")}  style={{maxWidth:300}}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("notification.notification_history.receipt_time")}
    />
</Form.Item>
<Form.Item name="receiptTimeEndCondition" label={t("notification.notification_history.receipt_time")}  style={{maxWidth:300}}>
    <DatePicker format="YYYY-MM-DD" placeholder={t("notification.notification_history.receipt_time")}
    />
</Form.Item>
<Form.Item name="receiptContentCondition" label={t("notification.notification_history.receipt_content")}   style={{maxWidth:300}}>
    <Input placeholder={t("notification.notification_history.receipt_content")}
     />
</Form.Item>

        </Form>
     </div>
     <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
        <Space>
          <Button type="primary" onClick={handleSearch}>{t("common.button.search")}</Button>
          <Button type="primary" onClick={handleResetSearch}>{t("common.button.reset")}</Button>
          <Button type="primary" onClick={handleImport}>{t("common.button.import")}</Button>
          <Button type="primary" onClick={handleExport}>{t("common.button.export")}</Button>
        </Space>
        <Space>
          <Button type="primary" onClick={handleAdd}>{t("common.button.add")}</Button>
        </Space>
      </div>
    </div>
  )
})

export default NotificationHistorySearch;