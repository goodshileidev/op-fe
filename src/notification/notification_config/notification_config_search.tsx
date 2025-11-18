import React, {useEffect, useState} from 'react'
import {Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface INotificationConfigSearchProps {
  onReloadTable: any,
  onAdd: any,
  pagination?: any
}

const NotificationConfigSearch: React.FC<INotificationConfigSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchDocumentNo, setSearchDocumentNo] = useState();
  const [searchNotifiedPersonType, setSearchNotifiedPersonType] = useState();
  const [searchNotifiedPersonReceiptMethod, setSearchNotifiedPersonReceiptMethod] = useState();
  const [searchNotificationDetailedContentTemplate, setSearchNotificationDetailedContentTemplate] = useState();
  const [searchIsReceiptRecordRequired, setSearchIsReceiptRecordRequired] = useState();
  const [searchReceiptMethod, setSearchReceiptMethod] = useState();




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
    exportNotificationConfig({
      pageNo: 1,
     pageSize:pagination.pageSize,
      documentNo: searchDocumentNo,
      notifiedPersonType: searchNotifiedPersonType,
      notifiedPersonReceiptMethod: searchNotifiedPersonReceiptMethod,
      notificationDetailedContentTemplate: searchNotificationDetailedContentTemplate,
      isReceiptRecordRequired: searchIsReceiptRecordRequired,
      receiptMethod: searchReceiptMethod,

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
<Form.Item name="documentNoCondition" label={t("notification.notification_config.document_no")}   style={{maxWidth:300}}>
    <Input placeholder={t("notification.notification_config.document_no")}
     />
</Form.Item>
<Form.Item name="notifiedPersonTypeCondition" label={t("notification.notification_config.notified_person_type")}  style={{maxWidth:300}}>
 <Select
    options={
        codeList.TifiedPersonType
      }
    placeholder={t("notification.notification_config.notified_person_type")} >
 </Select>
</Form.Item>
<Form.Item name="notifiedPersonReceiptMethodCondition" label={t("notification.notification_config.notified_person_receipt_method")}  valuePropName="checked" style={{maxWidth:300}}>
  <Checkbox.Group
    placeholder={t("notification.notification_config.notified_person_receipt_method")}
    options={
      codeList.TifiedPersonReceiptMethod
    }
  />
</Form.Item>

<Form.Item name="notificationDetailedContentTemplateCondition" label={t("notification.notification_config.notification_detailed_content_template")}   style={{maxWidth:300}}>
    <Input placeholder={t("notification.notification_config.notification_detailed_content_template")}
     />
</Form.Item>
<Form.Item name="isReceiptRecordRequiredCondition" label={t("notification.notification_config.is_receipt_record_required")}  valuePropName="checked"  style={{maxWidth:300}}>
  <Radio.Group
        options={
        codeList.YesNo
        }
        placeholder={t("notification.notification_config.is_receipt_record_required")}
        optionType="button"
        buttonStyle="solid"
      />
 </Form.Item>     
<Form.Item name="receiptMethodCondition" label={t("notification.notification_config.receipt_method")}  valuePropName="checked" style={{maxWidth:300}}>
  <Checkbox.Group
    placeholder={t("notification.notification_config.receipt_method")}
    options={
      codeList.ReceiptMethod
    }
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

export default NotificationConfigSearch;