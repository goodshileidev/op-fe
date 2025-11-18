import React, {useEffect, useState} from 'react'
import {Button, Card, message, Popconfirm, Spin, TableProps} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {useLocation, useSearchParams} from 'umi'
import {deleteUserPermission, searchUserPermission, updateUserPermission} from '@/common/service/system/user_permission'
import UserPermissionDetailModal from './components/user_permission_detail_modal'
import UserPermissionEditModal from './components/user_permission_edit_modal'
import UserPermissionDetailDrawer from './components/user_permission_detail_drawer'
import UserPermissionEditDrawer from './components/user_permission_edit_drawer'

import UserPermissionSearch from './components/user_permission_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {PageContainer} from "@ant-design/pro-components";


const UserPermissionTablePage: React.FC = (() => {
  const [userPermissionList, setUserPermissionList] = useState<UserPermissionType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentUserPermissionId, setCurrentUserPermissionId] = useState('');
  const [currentUserPermission, setCurrentUserPermission] = useState<UserPermissionType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchUserPermissionList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchUserPermission(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setUserPermissionList(records);
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
    const newUserPermission: UserPermissionType = {userPermissionId: '0'}
    setCurrentUserPermissionId('0')
    setCurrentUserPermission(newUserPermission)
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserPermissionList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserPermissionList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserPermissionList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserPermissionList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchUserPermissionList(currentConditions);
  };
  const handleShowDetail = (row: UserPermissionType) => {
    setCurrentUserPermission(row)
    setCurrentUserPermissionId(row.userPermissionId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose = () => {
    setIsDetailDrawerOpen(false)
  }

  const handleShowEdit = (row: UserPermissionType) => {
    setCurrentUserPermission(row)
    setCurrentUserPermissionId(row.userPermissionId)
    setIsEditModalOpen(true)
    // setIsEditDrawerOpen(true)
  }
  const handleEditModalClose = (updated: boolean) => {
    setIsEditModalOpen(false)
    if (updated) {
      handleTableChange(pagination)
    }
  }
  const handleEditDrawerClose = (updated: boolean) => {
    setIsEditDrawerOpen(false)
    if (updated) {
      handleTableChange(pagination)
    }
  }

  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      userPermissionId: currentUserPermission.userPermissionId,
    }
    params[fieldName] = value
    updateUserPermission(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('system.user_permission')}));
        currentUserPermission[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchUserPermissionList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentUserPermission(row)
    if (row.userPermissionId) {
      deleteUserPermission({userPermissionId: row.userPermissionId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchUserPermissionList({
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };


  const detail_show_type = 'modal'
  const edit_show_type = 'modal'

  const columns: TableProps<UserPermissionType>['columns'] = []

  columns.push({align: "center",
    title: t("system.user_permission.user_name"),
    key: "user_name",
    dataIndex: "userName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("system.user_permission.user_biz_type"),
    key: "biz_type",
    dataIndex: "bizType",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.UserBizType,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.UserBizType.filter((item) => (item.value === row.bizType)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })
  columns.push({align: "center",
    title: t("system.user_permission.turn_group"),
    key: "turn_group",
    dataIndex: "turnGroup",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.TurnGroup,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.TurnGroup.filter((item) => (item.value === row.turnGroup)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("system.user_permission.position"),
    key: "position",
    dataIndex: "position",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.BizPosition,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.BizPosition.filter((item) => (item.value === row.position)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })


  columns.push({align: "center",
    title: t("system.user_permission.title"),
    key: "title",
    dataIndex: "title",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.BizTitle,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.BizTitle.filter((item) => (item.value === row.title)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: "column-title  text_center ",
  })

  columns.push({align: "center",
    title: t("common.button.operate"),
    align: "center",key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: UserPermissionType, index: number) => (
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
          <Button size="small" icon={<DeleteFilled/>} type="link">
            {t("common.button.delete")}
          </Button>
        </Popconfirm>

      </div>
    ),
  })

  return (
    <PageContainer>
      <UserPermissionSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                            setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('system.user_permission')})}
            bordered={true}
            extra={[<Button onClick={() => {
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
            tableKey={"user_permission_table"}
            columns={columns}
            dataSource={userPermissionList}
            rowKey="userPermissionId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>
      <UserPermissionEditModal
        isUserPermissionEditModalOpen={isEditModalOpen}
        userPermissionId={currentUserPermissionId}
        onClose={handleEditModalClose}/>
      <UserPermissionDetailModal
        isUserPermissionDetailModalOpen={isDetailModalOpen}
        userPermissionId={currentUserPermissionId}
        onClose={handleDetailModalClose}/>
      <UserPermissionEditDrawer
        isEditDrawerOpen={isEditDrawerOpen}
        userPermissionId={currentUserPermissionId}
        onClose={handleEditDrawerClose}/>
      <UserPermissionDetailDrawer
        isDetailDrawerOpen={isDetailDrawerOpen}
        userPermissionId={currentUserPermissionId}
        onClose={handleDetailDrawerClose}/>


    </PageContainer>
  )
})

export default UserPermissionTablePage;
