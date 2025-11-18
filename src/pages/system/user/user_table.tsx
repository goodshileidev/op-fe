import React, {useEffect, useState} from 'react'
import {Button, Card, Image, message, Popconfirm, Spin, TableProps} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserType} from '@/common/data_type/system/user'
import {deleteUser, searchUser, updateUser} from '@/common/service/system/user'
import UserDetailModal from './components/user_detail_modal'
import UserEditModal from './components/user_edit_modal'
import UserDetailDrawer from './components/user_detail_drawer'
import UserEditDrawer from './components/user_edit_drawer'

import UserSearch from './components/user_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {PageContainer} from "@ant-design/pro-components";
import UserMenuEditModal from "@/pages/system/user_menu/components/user_menu_edit_modal";
import UserMenuEditDrawer from "@/pages/system/user_menu/components/user_menu_edit_drawer";


const UserTablePage: React.FC = (() => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');
  const [currentConditions, setCurrentConditions] = useState({});
  const [currentUser, setCurrentUser] = useState<UserType | any>({});
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
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

  const fetchUserList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchUser(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setUserList(records);
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
    const newUser: UserType = {}
    let isEditModalOpen = true;
    setCurrentUser(newUser)
    setCurrentUserId('0')
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchUserList(currentConditions);
  };
  const handleShowDetail = (row: UserType) => {
    setCurrentUser(row)
    setCurrentUserId(row.userId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose = () => {
    setIsDetailDrawerOpen(false)
  }

  const handleShowAdd = () => {
    const newUser: UserType = {}
    setCurrentUser(newUser)
    // setCurrentUserId(row.userId)
    setIsEditModalOpen(true)
  }

  const handleShowEdit = (row: UserType) => {
    setCurrentUser(row)
    setCurrentUserId(row.userId)
    // setIsEditModalOpen(true)
    setIsEditDrawerOpen(true)
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
      userId: currentUser.userId,
    }
    params[fieldName] = value
    updateUser(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('system.user')}));
        currentUser[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchUserList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentUser(row)
    if (row.userId) {
      deleteUser({userId: row.userId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchUserList({
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
  const columns: TableProps<UserType>['columns'] = []

  columns.push({align: "center",
    title: t("system.user.user_name"),
    key: "user_name",
    dataIndex: "userName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("system.user.employee_number"),
    key: "employee_number",
    dataIndex: "employeeNumber",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("system.user.user_type"),
    key: "user_type",
    dataIndex: "userType",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.UserType,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.UserType.filter((item) => (item.value === row.userType)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })
  //
  // columns.push({align: "center",
  //   title: t("system.user.signature_file"),
  //   key: "signature_file",
  //   dataIndex: "signatureFile",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  columns.push({align: "center",
    title: t("system.user.avatar_url"),
    key: "avatar_url",
    dataIndex: "avatarUrl",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: (text: string, row: any, index: number) => {
      return text && text !== "" ? <Image src={text}/> : <></>;
    }
  })

  columns.push({align: "center",
    title: t("system.user.signature_image_url"),
    key: "signature_image_url",
    dataIndex: "signatureImageUrl",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: (text: string, row: any, index: number) => {
      return text && text !== "" ? <Image src={text}/> : <></>;
      //return <Image src={text}/>
    }
  })

  // columns.push({align: "center",
  //   title: t("system.user.stamp_image_url"),
  //   key: "stamp_image_url",
  //   dataIndex: "stampImageUrl",
  //   ellipsis: true,
  //   width: "100px",
  //   className:" text_center ",
  // })

  columns.push({align: "center",
    title: t("system.user.user_status"),
    key: "user_status",
    dataIndex: "userStatus",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.UserStatus,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.UserStatus.filter((item) => (item.value === row.userStatus)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("common.button.operate"),
    align: "center",key: 'action',
    width: '250px',
    render: (text: string, row: UserType, index: number) => (
      <div size="middle">
        <Button size="small" type="link"
                onClick={() => handleShowDetail(row)}>{t("common.button.detail")}</Button>
        <Button size="small" type="link" icon={<EditFilled/>}
                onClick={() => handleShowEdit(row)}>{t("common.button.edit")}</Button>
        {/*<Button size="small" type="link" icon={<EditFilled/>}*/}
        {/*        onClick={() => handleShowEditMenu(row)}>{t("common.button.edit_menu")}</Button>*/}
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
      <UserSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                  setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('system.user')})}
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
            tableKey={"user"}
            columns={columns}
            dataSource={userList}
            rowKey="userId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>
      <UserEditModal
        isUserEditModalOpen={isEditModalOpen}
        userId={currentUserId}
        onClose={handleEditModalClose}/>
      <UserDetailModal
        isUserDetailModalOpen={isDetailModalOpen}
        userId={currentUserId}
        onClose={handleDetailModalClose}/>
      <UserEditDrawer
        isUserEditDrawerOpen={isEditDrawerOpen}
        userId={currentUserId}
        onClose={handleEditDrawerClose}/>
      <UserDetailDrawer
        isUserDetailDrawerOpen={isDetailDrawerOpen}
        userId={currentUserId}
        onClose={handleDetailDrawerClose}/>
      {/*<UserMenuEditModal*/}
      {/*  isUserMenuEditModalOpen={isEditModalOpen}*/}
      {/*  userId={currentUserId}*/}
      {/*  onClose={handleEditModalClose}/>*/}
      {/*<UserMenuEditDrawer*/}
      {/*  isEditDrawerOpen={isEditDrawerOpen}*/}
      {/*  userId={currentUserId}*/}
      {/*  onClose={handleEditDrawerClose}/>*/}

    </PageContainer>
  )
})

export default UserTablePage;
