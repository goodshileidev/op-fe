import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {Link} from 'umi'
import {searchInternalOrg, deleteInternalOrg, updateInternalOrg} from '@/common/service/system/internal_org'
import InternalOrgDetailModal from './components/internal_org_detail_modal'
import InternalOrgEditModal from './components/internal_org_edit_modal'
import InternalOrgDetailDrawer from './components/internal_org_detail_drawer'
import InternalOrgEditDrawer from './components/internal_org_edit_drawer'

import InternalOrgSearch from './components/internal_org_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const InternalOrgTablePage: React.FC = (() => {
  const [internalOrgList, setInternalOrgList] = useState<InternalOrgType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentInternalOrgId, setCurrentInternalOrgId] = useState('');
  const [currentConditions, setCurrentConditions] = useState({});
  const [currentInternalOrg, setCurrentInternalOrg] = useState<InternalOrgType | any>({});
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

  const fetchInternalOrgList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchInternalOrg(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setInternalOrgList(records);
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
    const newInternalOrg: InternalOrgType = {}
    let isEditModalOpen = true;
    setCurrentInternalOrg(newInternalOrg)
    setCurrentInternalOrgId('0')
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchInternalOrgList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchInternalOrgList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchInternalOrgList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchInternalOrgList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchInternalOrgList(currentConditions);
  };
  const handleShowDetail =(row: InternalOrgType) => {
    setCurrentInternalOrg(row)
    setCurrentInternalOrgId(row.internalOrgId)
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
    const newInternalOrg: InternalOrgType ={
    }
    setCurrentInternalOrg(newInternalOrg)
    // setCurrentInternalOrgId(row.internalOrgId)
    setIsEditModalOpen(true)
  }

  const handleShowEdit =(row: InternalOrgType) => {
    setCurrentInternalOrg(row)
    setCurrentInternalOrgId(row.internalOrgId)
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
        internalOrgId:currentInternalOrg.internalOrgId,
     }
     params[fieldName] = value
     updateInternalOrg(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.internal_org')}));
          currentInternalOrg[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchInternalOrgList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentInternalOrg(row)
    if (row.internalOrgId) {
      deleteInternalOrg({internalOrgId: row.internalOrgId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchInternalOrgList({
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
 const columns: TableProps<InternalOrgType>['columns'] = []

    columns.push({align: "center",
      title: t("system.internal_org.org_no"),
      key: "org_no",
      dataIndex: "orgNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.internal_org.org_name"),
      key: "org_name",
      dataIndex: "orgName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.internal_org.org_type"),
      key: "org_type",
      dataIndex: "orgType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.OrgType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.OrgType.filter((item) => (item.value===row.orgType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.internal_org.org_logo_url"),
      key: "org_logo_url",
      dataIndex: "orgLogoUrl",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      render: (text: string, row: InternalOrgType, index: number) => (
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
        <InternalOrgSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('system.internal_org')})}
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
              tableKey={"internal_org"}
              columns={columns}
              dataSource={internalOrgList}
              rowKey="internalOrgId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <InternalOrgEditModal
            isInternalOrgEditModalOpen={isEditModalOpen}
            internalOrgId={currentInternalOrgId}
            onClose={handleEditModalClose}/>
        <InternalOrgDetailModal
            isInternalOrgDetailModalOpen={isDetailModalOpen}
            internalOrgId={currentInternalOrgId}
            onClose={handleDetailModalClose}/>
        <InternalOrgEditDrawer
            isInternalOrgEditDrawerOpen={isEditDrawerOpen}
            internalOrgId={currentInternalOrgId}
            onClose={handleEditDrawerClose}/>
        <InternalOrgDetailDrawer
            isInternalOrgDetailDrawerOpen={isDetailDrawerOpen}
            internalOrgId={currentInternalOrgId}
            onClose={handleDetailDrawerClose}/>

     </div>
   )
})

export default InternalOrgTablePage;
