import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {Link} from 'umi'
import {searchTurnGroupSchedule, deleteTurnGroupSchedule, updateTurnGroupSchedule} from '@/common/service/system/turn_group_schedule'
import TurnGroupScheduleDetailModal from './components/turn_group_schedule_detail_modal'
import TurnGroupScheduleEditModal from './components/turn_group_schedule_edit_modal'
import TurnGroupScheduleDetailDrawer from './components/turn_group_schedule_detail_drawer'
import TurnGroupScheduleEditDrawer from './components/turn_group_schedule_edit_drawer'

import TurnGroupScheduleSearch from './components/turn_group_schedule_search'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import {useParams} from 'umi'
import {useSearchParams, useLocation } from 'umi';
import {getPathParam} from "@/common/path_util";
import SuperTable from "@/components/common/super-table";
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";





const TurnGroupScheduleTablePage: React.FC = (() => {
  const [turnGroupScheduleList, setTurnGroupScheduleList] = useState<TurnGroupScheduleType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentTurnGroupScheduleId, setCurrentTurnGroupScheduleId] = useState('');
  const [currentTurnGroupSchedule, setCurrentTurnGroupSchedule] = useState<TurnGroupScheduleType | any>({});
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

  const fetchTurnGroupScheduleList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchTurnGroupSchedule(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setTurnGroupScheduleList(records);
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
    const newTurnGroupSchedule: TurnGroupScheduleType = {turnGroupScheduleId: '0'}
    setCurrentTurnGroupScheduleId('0')
    setCurrentTurnGroupSchedule(newTurnGroupSchedule)
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchTurnGroupScheduleList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchTurnGroupScheduleList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchTurnGroupScheduleList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchTurnGroupScheduleList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchTurnGroupScheduleList(currentConditions);
  };
  const handleShowDetail =(row: TurnGroupScheduleType) => {
    setCurrentTurnGroupSchedule(row)
    setCurrentTurnGroupScheduleId(row.turnGroupScheduleId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose=()=>{
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose=()=>{
    setIsDetailDrawerOpen(false)
  }

  const handleShowEdit =(row: TurnGroupScheduleType) => {
    setCurrentTurnGroupSchedule(row)
    setCurrentTurnGroupScheduleId(row.turnGroupScheduleId)
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
        turnGroupScheduleId:currentTurnGroupSchedule.turnGroupScheduleId,
     }
     params[fieldName] = value
     updateTurnGroupSchedule(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.turn_group_schedule')}));
          currentTurnGroupSchedule[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchTurnGroupScheduleList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentTurnGroupSchedule(row)
    if (row.turnGroupScheduleId) {
      deleteTurnGroupSchedule({turnGroupScheduleId: row.turnGroupScheduleId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchTurnGroupScheduleList({
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

  const columns: TableProps<TurnGroupScheduleType>['columns'] = []

    columns.push({align: "center",
      title: t("system.turn_group_schedule.turn_group1"),
      key: "turn_group1",
      dataIndex: "turnGroup1",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.TurnGroup,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.TurnGroup.filter((item) => (item.value===row.turnGroup1)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.turn_group_schedule.turn_group2"),
      key: "turn_group2",
      dataIndex: "turnGroup2",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.TurnGroup,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.TurnGroup.filter((item) => (item.value===row.turnGroup2)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("system.turn_group_schedule.turn_group3"),
      key: "turn_group3",
      dataIndex: "turnGroup3",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.TurnGroup,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.TurnGroup.filter((item) => (item.value===row.turnGroup3)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      fixed: 'right',
      render: (text: string, row: TurnGroupScheduleType, index: number) => (
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

        }}>
        <TurnGroupScheduleSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('system.turn_group_schedule')})}
          bordered={true}
          style={{

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
              tableKey={"turn_group_schedule_table"}
              columns={columns}
              dataSource={turnGroupScheduleList}
              rowKey="turnGroupScheduleId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <TurnGroupScheduleEditModal
            isTurnGroupScheduleEditModalOpen={isEditModalOpen}
            turnGroupScheduleId={currentTurnGroupScheduleId}
            onClose={handleEditModalClose}/>
        <TurnGroupScheduleDetailModal
            isTurnGroupScheduleDetailModalOpen={isDetailModalOpen}
            turnGroupScheduleId={currentTurnGroupScheduleId}
            onClose={handleDetailModalClose}/>
        <TurnGroupScheduleEditDrawer
            isEditDrawerOpen={isEditDrawerOpen}
            turnGroupScheduleId={currentTurnGroupScheduleId}
            onClose={handleEditDrawerClose}/>
        <TurnGroupScheduleDetailDrawer
            isDetailDrawerOpen={isDetailDrawerOpen}
            turnGroupScheduleId={currentTurnGroupScheduleId}
            onClose={handleDetailDrawerClose}/>


     </div>
   )
})

export default TurnGroupScheduleTablePage;
