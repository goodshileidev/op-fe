import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {Link} from 'umi'
import {searchReceiptOrg, deleteReceiptOrg, updateReceiptOrg} from '@/common/service/system/receipt_org'
import ReceiptOrgDetailModal from './components/receipt_org_detail_modal'
import ReceiptOrgEditModal from './components/receipt_org_edit_modal'
import ReceiptOrgDetailDrawer from './components/receipt_org_detail_drawer'
import ReceiptOrgEditDrawer from './components/receipt_org_edit_drawer'

import ReceiptOrgSearch from './components/receipt_org_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const ReceiptOrgTablePage: React.FC = (() => {
  const [receiptOrgList, setReceiptOrgList] = useState<ReceiptOrgType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentReceiptOrgId, setCurrentReceiptOrgId] = useState('');
  const [currentConditions, setCurrentConditions] = useState({});
  const [currentReceiptOrg, setCurrentReceiptOrg] = useState<ReceiptOrgType | any>({});
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

  const fetchReceiptOrgList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchReceiptOrg(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setReceiptOrgList(records);
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
    const newReceiptOrg: ReceiptOrgType = {}
    let isEditModalOpen = true;
    setCurrentReceiptOrg(newReceiptOrg)
    setCurrentReceiptOrgId('0')
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchReceiptOrgList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchReceiptOrgList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchReceiptOrgList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchReceiptOrgList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchReceiptOrgList(currentConditions);
  };
  const handleShowDetail =(row: ReceiptOrgType) => {
    setCurrentReceiptOrg(row)
    setCurrentReceiptOrgId(row.receiptOrgId)
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
    const newReceiptOrg: ReceiptOrgType ={
    }
    setCurrentReceiptOrg(newReceiptOrg)
    // setCurrentReceiptOrgId(row.receiptOrgId)
    setIsEditModalOpen(true)
  }

  const handleShowEdit =(row: ReceiptOrgType) => {
    setCurrentReceiptOrg(row)
    setCurrentReceiptOrgId(row.receiptOrgId)
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
        receiptOrgId:currentReceiptOrg.receiptOrgId,
     }
     params[fieldName] = value
     updateReceiptOrg(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.receipt_org')}));
          currentReceiptOrg[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchReceiptOrgList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentReceiptOrg(row)
    if (row.receiptOrgId) {
      deleteReceiptOrg({receiptOrgId: row.receiptOrgId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchReceiptOrgList({
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
 const columns: TableProps<ReceiptOrgType>['columns'] = []

    columns.push({align: "center",
      title: t("system.receipt_org.org_no"),
      key: "org_no",
      dataIndex: "orgNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.receipt_org.org_name"),
      key: "org_name",
      dataIndex: "orgName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.receipt_org.org_type"),
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
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      render: (text: string, row: ReceiptOrgType, index: number) => (
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
        <ReceiptOrgSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('system.receipt_org')})}
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
              tableKey={"receipt_org"}
              columns={columns}
              dataSource={receiptOrgList}
              rowKey="receiptOrgId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <ReceiptOrgEditModal
            isReceiptOrgEditModalOpen={isEditModalOpen}
            receiptOrgId={currentReceiptOrgId}
            onClose={handleEditModalClose}/>
        <ReceiptOrgDetailModal
            isReceiptOrgDetailModalOpen={isDetailModalOpen}
            receiptOrgId={currentReceiptOrgId}
            onClose={handleDetailModalClose}/>
        <ReceiptOrgEditDrawer
            isReceiptOrgEditDrawerOpen={isEditDrawerOpen}
            receiptOrgId={currentReceiptOrgId}
            onClose={handleEditDrawerClose}/>
        <ReceiptOrgDetailDrawer
            isReceiptOrgDetailDrawerOpen={isDetailDrawerOpen}
            receiptOrgId={currentReceiptOrgId}
            onClose={handleDetailDrawerClose}/>

     </div>
   )
})

export default ReceiptOrgTablePage;
