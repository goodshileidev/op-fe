import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {Link} from 'umi'
import {searchUserHistory, deleteUserHistory, updateUserHistory} from '@/common/service/system/user_history'
import UserHistoryDetailModal from './components/user_history_detail_modal'
import UserHistoryEditModal from './components/user_history_edit_modal'
import UserHistoryDetailDrawer from './components/user_history_detail_drawer'
import UserHistoryEditDrawer from './components/user_history_edit_drawer'

import UserHistorySearch from './components/user_history_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const UserHistoryTablePage: React.FC = (() => {
  const [userHistoryList, setUserHistoryList] = useState<UserHistoryType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentUserHistoryId, setCurrentUserHistoryId] = useState('');
  const [currentConditions, setCurrentConditions] = useState({});
  const [currentUserHistory, setCurrentUserHistory] = useState<UserHistoryType | any>({});
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

  const fetchUserHistoryList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchUserHistory(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setUserHistoryList(records);
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
    const newUserHistory: UserHistoryType = {}
    let isEditModalOpen = true;
    setCurrentUserHistory(newUserHistory)
    setCurrentUserHistoryId('0')
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserHistoryList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserHistoryList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserHistoryList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserHistoryList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchUserHistoryList(currentConditions);
  };
  const handleShowDetail =(row: UserHistoryType) => {
    setCurrentUserHistory(row)
    setCurrentUserHistoryId(row.userHistoryId)
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
    const newUserHistory: UserHistoryType ={
    }
    setCurrentUserHistory(newUserHistory)
    // setCurrentUserHistoryId(row.userHistoryId)
    setIsEditModalOpen(true)
  }

  const handleShowEdit =(row: UserHistoryType) => {
    setCurrentUserHistory(row)
    setCurrentUserHistoryId(row.userHistoryId)
    // setIsEditModalOpen(true)
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
        userHistoryId:currentUserHistory.userHistoryId,
     }
     params[fieldName] = value
     updateUserHistory(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.user_history')}));
          currentUserHistory[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchUserHistoryList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentUserHistory(row)
    if (row.userHistoryId) {
      deleteUserHistory({userHistoryId: row.userHistoryId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchUserHistoryList({
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
 const columns: TableProps<UserHistoryType>['columns'] = []

    columns.push({align: "center",
      title: t("system.user_history.user_id"),
      key: "user_id",
      dataIndex: "userId",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.user_name"),
      key: "user_name",
      dataIndex: "userName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.employee_number"),
      key: "employee_number",
      dataIndex: "employeeNumber",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.user_type"),
      key: "user_type",
      dataIndex: "userType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.UserType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.UserType.filter((item) => (item.value===row.userType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.signature_file"),
      key: "signature_file",
      dataIndex: "signatureFile",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.avatar_url"),
      key: "avatar_url",
      dataIndex: "avatarUrl",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.password"),
      key: "password",
      dataIndex: "password",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.signature_image_url"),
      key: "signature_image_url",
      dataIndex: "signatureImageUrl",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.stamp_image_url"),
      key: "stamp_image_url",
      dataIndex: "stampImageUrl",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_history.user_status"),
      key: "user_status",
      dataIndex: "userStatus",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.UserStatus,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.UserStatus.filter((item) => (item.value===row.userStatus)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      render: (text: string, row: UserHistoryType, index: number) => (
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
        <UserHistorySearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('system.user_history')})}
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
              tableKey={"user_history"}
              columns={columns}
              dataSource={userHistoryList}
              rowKey="userHistoryId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <UserHistoryEditModal
            isUserHistoryEditModalOpen={isEditModalOpen}
            userHistoryId={currentUserHistoryId}
            onClose={handleEditModalClose}/>
        <UserHistoryDetailModal
            isUserHistoryDetailModalOpen={isDetailModalOpen}
            userHistoryId={currentUserHistoryId}
            onClose={handleDetailModalClose}/>
        <UserHistoryEditDrawer
            isUserHistoryEditDrawerOpen={isEditDrawerOpen}
            userHistoryId={currentUserHistoryId}
            onClose={handleEditDrawerClose}/>
        <UserHistoryDetailDrawer
            isUserHistoryDetailDrawerOpen={isDetailDrawerOpen}
            userHistoryId={currentUserHistoryId}
            onClose={handleDetailDrawerClose}/>

     </div>
   )
})

export default UserHistoryTablePage;
