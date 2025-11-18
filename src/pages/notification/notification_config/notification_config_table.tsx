import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {NotificationConfigType} from '@/common/data_type/notification/notification_config'
import {Link} from 'umi'
import {searchNotificationConfig, deleteNotificationConfig, updateNotificationConfig} from '@/common/service/notification/notification_config'
import NotificationConfigDetailModal from './components/notification_config_detail_modal'
import NotificationConfigEditModal from './components/notification_config_edit_modal'
import NotificationConfigDetailDrawer from './components/notification_config_detail_drawer'
import NotificationConfigEditDrawer from './components/notification_config_edit_drawer'

import NotificationConfigSearch from './components/notification_config_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const NotificationConfigTablePage: React.FC = (() => {
  const [notificationConfigList, setNotificationConfigList] = useState<NotificationConfigType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentNotificationConfigId, setCurrentNotificationConfigId] = useState('');
  const [currentConditions, setCurrentConditions] = useState({});
  const [currentNotificationConfig, setCurrentNotificationConfig] = useState<NotificationConfigType | any>({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);




  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions:[10, 50, 100]
  });

  const fetchNotificationConfigList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchNotificationConfig(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setNotificationConfigList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    console.debug("handleAdd", params)
    const newNotificationConfig: NotificationConfigType = {}
    let isEditModalOpen = true;
    setCurrentNotificationConfig(newNotificationConfig)
    setCurrentNotificationConfigId('0')
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchNotificationConfigList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchNotificationConfigList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchNotificationConfigList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchNotificationConfigList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchNotificationConfigList(currentConditions);
  };
  const handleShowDetail =(row: NotificationConfigType) => {
    setCurrentNotificationConfig(row)
    setCurrentNotificationConfigId(row.notificationConfigId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose=()=>{
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose=()=>{
    setIsDetailDrawerOpen(false)
  }

  const handleShowAdd =() => {
    const newNotificationConfig: NotificationConfigType ={
    }
    setCurrentNotificationConfig(newNotificationConfig)
    // setCurrentNotificationConfigId(row.notificationConfigId)
    setIsEditModalOpen(true)
  }

  const handleShowEdit =(row: NotificationConfigType) => {
    setCurrentNotificationConfig(row)
    setCurrentNotificationConfigId(row.notificationConfigId)
    setIsEditModalOpen(true)
    // setIsEditDrawerOpen(true)
  }
  const handleEditModalClose= (updated: boolean) => {
    setIsEditModalOpen(false)
    if (updated){
      handleTableChange(pagination)
    }
  }
  const handleEditDrawerClose= (updated: boolean) => {
    setIsEditDrawerOpen(false)
    if (updated){
      handleTableChange(pagination)
    }
  }

  const handleUpdateJson= (value: any, fieldName: string)=> {
     const params = {
        notificationConfigId:currentNotificationConfig.notificationConfigId,
     }
     params[fieldName] = value
     updateNotificationConfig(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('notification.notification_config')}));
          currentNotificationConfig[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchNotificationConfigList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentNotificationConfig(row)
    if (row.notificationConfigId) {
      deleteNotificationConfig({notificationConfigId: row.notificationConfigId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchNotificationConfigList({
            pageNo: pagination.current,
           pageSize:pagination.pageSize
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const detail_show_type='modal'
  const edit_show_type='modal'
 const columns: TableProps<NotificationConfigType>['columns'] = []

    columns.push({align: "center",
      title: t("notification.notification_config.document_id"),
      key: "document_id",
      dataIndex: "documentId",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.document_no"),
      key: "document_no",
      dataIndex: "documentNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.notified_person_type"),
      key: "notified_person_type",
      dataIndex: "notifiedPersonType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.TifiedPersonType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.TifiedPersonType.filter((item) => (item.value===row.notifiedPersonType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.notified_person_receipt_method"),
      key: "notified_person_receipt_method",
      dataIndex: "notifiedPersonReceiptMethod",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.TifiedPersonReceiptMethod,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.TifiedPersonReceiptMethod.filter((item) => (item.value===row.notifiedPersonReceiptMethod)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.notify_timing"),
      key: "notify_timing",
      dataIndex: "notifyTiming",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.notification_timing_business_description"),
      key: "notification_timing_business_description",
      dataIndex: "notificationTimingBusinessDescription",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.is_receipt_record_required"),
      key: "is_receipt_record_required",
      dataIndex: "isReceiptRecordRequired",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.YesNo,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.YesNo.filter((item) => (item.value===row.isReceiptRecordRequired)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_config.receipt_method"),
      key: "receipt_method",
      dataIndex: "receiptMethod",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.ReceiptMethod,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.ReceiptMethod.filter((item) => (item.value===row.receiptMethod)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      render: (text: string, row: NotificationConfigType, index: number) => (
        <div size="middle">
          <Button size="small" type="link"
            onClick={() => handleShowDetail(row)}>{t("common.button.detail")}</Button>
          <Button size="small" type="link" icon={<EditFilled/>}
            onClick={() => handleShowEdit(row)}>{t("common.button.edit")}</Button>
          <Popconfirm
                title={t("common.row_delete_title")}
                description={t("common.row_delete_description")}
                onConfirm={(e) => confirm(e, row)}
                onCancel={cancel}
                okText={t("common.yes")}
                cancelText={t("common.no")}
              >
              <Button size="small" icon={<DeleteFilled/>}  type="link">
                {t("common.button.delete")}
              </Button>
           </Popconfirm>
        </div>
      ),
    })

  return (
      <div style={{
          'display': 'grid',

        }}>
        <NotificationConfigSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('notification.notification_config')})}
          bordered={true}
          extra={[<Button onClick={()=>{
                setIsColumnsSelectOpen(true)
          }}>{t("common.button.show_hide_column")}</Button>]}
          >
          <Spin spinning={loading}>
            <SuperTable
              style={{
                width: "100%"
              }}
              setIsColumnsOpen={setIsColumnsSelectOpen}
              isColumnsSelectOpen={isColumnsSelectOpen}
              tableKey={"notification_config"}
              columns={columns}
              dataSource={notificationConfigList}
              rowKey="notificationConfigId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <NotificationConfigEditModal
            isNotificationConfigEditModalOpen={isEditModalOpen}
            notificationConfigId={currentNotificationConfigId}
            onClose={handleEditModalClose}/>
        <NotificationConfigDetailModal
            isNotificationConfigDetailModalOpen={isDetailModalOpen}
            notificationConfigId={currentNotificationConfigId}
            onClose={handleDetailModalClose}/>
        <NotificationConfigEditDrawer
            isNotificationConfigEditDrawerOpen={isEditDrawerOpen}
            notificationConfigId={currentNotificationConfigId}
            onClose={handleEditDrawerClose}/>
        <NotificationConfigDetailDrawer
            isNotificationConfigDetailDrawerOpen={isDetailDrawerOpen}
            notificationConfigId={currentNotificationConfigId}
            onClose={handleDetailDrawerClose}/>

     </div>
   )
})

export default NotificationConfigTablePage;
