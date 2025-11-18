import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {NotificationHistoryType} from '@/common/data_type/notification/notification_history'
import {Link, useNavigate} from 'umi'
import {searchNotificationHistory, deleteNotificationHistory, updateNotificationHistory } from '@/common/service/notification/notification_history'
import NotificationHistorySearch from './components/notification_history_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const NotificationHistoryTablePage: React.FC = (() => {
  const [notificationHistoryList, setNotificationHistoryList] = useState<NotificationHistoryType[]>([]);
  const [currentNotificationHistory, setCurrentNotificationHistory] = useState<NotificationHistoryType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const fetchNotificationHistoryList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchNotificationHistory(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setNotificationHistoryList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }
  const handleAdd = (params: any) => {
    navigate("/notification/notification_history/notification_history_edit/0", { replace: true });
  }
  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchNotificationHistoryList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchNotificationHistoryList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchNotificationHistoryList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchNotificationHistoryList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchNotificationHistoryList(currentConditions);
  };


  const handleUpdateJson= (value: any, fieldName: string)=> {
     const params = {
        notificationHistoryId:currentNotificationHistory.notificationHistoryId,
     }
     params[fieldName] = value
     updateNotificationHistory(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('notification.notification_history')}));
          currentNotificationHistory[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchNotificationHistoryList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "notificationHistoryId="+row.notificationHistoryId);
    setCurrentNotificationHistory(row)
    if (row.notificationHistoryId) {
      deleteNotificationHistory({notificationHistoryId: row.notificationHistoryId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          handleSearch({
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

 const columns: TableProps<NotificationHistoryType>['columns'] = []

    columns.push({align: "center",
      title: t("notification.notification_history.document_id"),
      key: "document_id",
      dataIndex: "documentId",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.document_no"),
      key: "document_no",
      dataIndex: "documentNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.notified_person_name"),
      key: "notified_person_name",
      dataIndex: "notifiedPersonName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.notified_person_id"),
      key: "notified_person_id",
      dataIndex: "notifiedPersonId",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.notified_person_receipt_method"),
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
      title: t("notification.notification_history.notification_datetime"),
      key: "notification_datetime",
      dataIndex: "notificationDatetime",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.notification_time_desc"),
      key: "notification_time_desc",
      dataIndex: "notificationTimeDesc",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.receipt_method"),
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
      title: t("notification.notification_history.receipt_time"),
      key: "receipt_time",
      dataIndex: "receiptTime",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("notification.notification_history.is_receipt_required"),
      key: "is_receipt_required",
      dataIndex: "isReceiptRequired",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.YesNo,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.YesNo.filter((item) => (item.value===row.isReceiptRequired)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      width: '250px',
      align: "center",key: 'action',
      render: (text: string, row: NotificationHistoryType, index: number) => (
        <div>
          <Link to={`/notification/notification_history/notification_history_detail/${row.notificationHistoryId}`}>
            <Button size="small" type="link">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/notification/notification_history/notification_history_edit/${row.notificationHistoryId}`}>
            <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
          </Link>
          <Popconfirm
                title={t("common.row_delete_title")}
                description={t("common.row_delete_description")}
                onConfirm={(e)=>confirm(e, row)}
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
        <NotificationHistorySearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('notification.notification_history')})}
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
              tableKey={"notification_history"}
              columns={columns}
              dataSource={notificationHistoryList}
              rowKey="notificationHistoryId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>

     </div>
   )
})

export default NotificationHistoryTablePage;
