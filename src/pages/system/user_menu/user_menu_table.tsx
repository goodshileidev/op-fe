import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserMenuType} from '@/common/data_type/system/user_menu'
import {Link} from 'umi'
import {searchUserMenu, deleteUserMenu, updateUserMenu} from '@/common/service/system/user_menu'
import UserMenuDetailModal from './components/user_menu_detail_modal'
import UserMenuEditModal from './components/user_menu_edit_modal'
import UserMenuDetailDrawer from './components/user_menu_detail_drawer'
import UserMenuEditDrawer from './components/user_menu_edit_drawer'

import UserMenuSearch from './components/user_menu_search'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import {useParams} from 'umi'
import {useSearchParams, useLocation } from 'umi';
import {getPathParam} from "@/common/path_util";
import SuperTable from "@/components/common/super-table";
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";





const UserMenuTablePage: React.FC = (() => {
  const [userMenuList, setUserMenuList] = useState<UserMenuType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentUserMenuId, setCurrentUserMenuId] = useState('');
  const [currentUserMenu, setCurrentUserMenu] = useState<UserMenuType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
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
    pageSizeOptions:[10, 50, 100]
  });

  const fetchUserMenuList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchUserMenu(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setUserMenuList(records);
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
    const newUserMenu: UserMenuType = {userMenuId: '0'}
    setCurrentUserMenuId('0')
    setCurrentUserMenu(newUserMenu)
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserMenuList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchUserMenuList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserMenuList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchUserMenuList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchUserMenuList(currentConditions);
  };
  const handleShowDetail =(row: UserMenuType) => {
    setCurrentUserMenu(row)
    setCurrentUserMenuId(row.userMenuId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose=()=>{
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose=()=>{
    setIsDetailDrawerOpen(false)
  }

  const handleShowEdit =(row: UserMenuType) => {
    setCurrentUserMenu(row)
    setCurrentUserMenuId(row.userMenuId)
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
        userMenuId:currentUserMenu.userMenuId,
     }
     params[fieldName] = value
     updateUserMenu(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.user_menu')}));
          currentUserMenu[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchUserMenuList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentUserMenu(row)
    if (row.userMenuId) {
      deleteUserMenu({userMenuId: row.userMenuId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchUserMenuList({
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

  const columns: TableProps<UserMenuType>['columns'] = []

    columns.push({align: "center",
      title: t("system.user_menu.user_id"),
      key: "user_id",
      dataIndex: "userId",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.user_menu.menu_code"),
      key: "menu_code",
      dataIndex: "menuCode",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.MenuCode,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.MenuCode.filter((item) => (row.menuCode && row.menuCode.includes(item.value))).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      fixed: 'right',
      render: (text: string, row: UserMenuType, index: number) => (
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
          display: 'grid',
          padding: '24px',
          maxWidth: '1200px'
        }}>
        <UserMenuSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('system.user_menu')})}
          bordered={true}
          style={{
              maxWidth: '1200px'
          }}
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
              tableKey={"user_menu_table"}
              columns={columns}
              dataSource={userMenuList}
              rowKey="userMenuId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <UserMenuEditModal
            isUserMenuEditModalOpen={isEditModalOpen}
            userMenuId={currentUserMenuId}
            onClose={handleEditModalClose}/>
        <UserMenuDetailModal
            isUserMenuDetailModalOpen={isDetailModalOpen}
            userMenuId={currentUserMenuId}
            onClose={handleDetailModalClose}/>
        <UserMenuEditDrawer
            isEditDrawerOpen={isEditDrawerOpen}
            userMenuId={currentUserMenuId}
            onClose={handleEditDrawerClose}/>
        <UserMenuDetailDrawer
            isDetailDrawerOpen={isDetailDrawerOpen}
            userMenuId={currentUserMenuId}
            onClose={handleDetailDrawerClose}/>


     </div>
   )
})

export default UserMenuTablePage;
