import React, {useEffect, useState} from 'react'
import {Button, Card, message, Spin, TableProps} from 'antd'
import {EditFilled} from '@ant-design/icons'
import {YuancangOperatonType} from '@/common/data_type/operation/yuancang_operaton'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {
  deleteYuancangOperaton,
  searchYuancangOperaton,
  updateYuancangOperaton
} from '@/common/service/operation/yuancang_operaton'
import YuancangOperatonSearch from './components/yuancang_operaton_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {PageContainer} from "@ant-design/pro-components";


const YuancangOperatonTablePage: React.FC = (() => {
  const [yuancangOperatonList, setYuancangOperatonList] = useState<YuancangOperatonType[]>([]);
  const [currentYuancangOperatonId, setCurrentYuancangOperatonId] = useState<string>('');
  const [currentYuancangOperaton, setCurrentYuancangOperaton] = useState<YuancangOperatonType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  const fetchYuancangOperatonList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    params.templateNoCondition = "RE-WHNBMT-04-006"
    const response = await searchYuancangOperaton(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setYuancangOperatonList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/operation/yuancang_operaton/yuancang_operaton_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchYuancangOperatonList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchYuancangOperatonList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchYuancangOperatonList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchYuancangOperatonList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchYuancangOperatonList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      yuancangOperatonId: currentYuancangOperaton.yuancangOperatonId,
    }
    params[fieldName] = value
    updateYuancangOperaton(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('operation.yuancang_operaton')}));
        currentYuancangOperaton[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchYuancangOperatonList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "yuancangOperatonId=" + row.documentId);
    setCurrentYuancangOperaton(row)
    if (row.yuancangOperatonId) {
      deleteYuancangOperaton({yuancangOperatonId: row.yuancangOperatonId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          handleSearch({
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


  const columns: TableProps<YuancangOperatonType>['columns'] = []
  columns.push({align: "center",
    title: t("operation.yuancang_operaton.data_date"),
    key: "data_date",
    dataIndex: "dataDate",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("operation.yuancang_operaton.document_name"),
    key: "document_name",
    dataIndex: "templateName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  columns.push({align: "center",
    title: t("operation.yuancang_operaton.turn_no"),
    key: "turn_no",
    dataIndex: "turnNo",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("operation.yuancang_operaton.turn_group"),
    key: "turn_group",
    dataIndex: "turnGroup",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })


  columns.push({align: "center",
    title: t("operation.yuancang_operaton.operate_status"),
    key: "fillin_status",
    dataIndex: "fillinStatus",
    ellipsis: true,
    width: "100px",
    className:
      " text_center ",
  })

  columns.push({align: "center",
    title: t("common.button.operate"),
    align: "center",key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: YuancangOperatonType, index: number) => (
      <div>
        {/*<Link to={`/operation/yuancang_operaton/yuancang_operaton_detail_page/${row.yuancangOperatonId}`}>*/}
        {/*  <Button size="small" type="link">{t("common.button.detail")}</Button>*/}
        {/*</Link>*/}
        <Link to={`/document_detail_page2/${row.documentId}`} target={"_blank"}>
          <Button size="small" type="link">{t("common.button.view")}</Button>
        </Link>

        {/*<Popconfirm*/}
        {/*  title={t("common.row_delete_title")}*/}
        {/*  description={t("common.row_delete_description")}*/}
        {/*  onConfirm={(e) => confirm(e, row)}*/}
        {/*  onCancel={cancel}*/}
        {/*  okText={t("common.yes")}*/}
        {/*  cancelText={t("common.no")}*/}
        {/*>*/}
        {/*  <Button size="small" icon={<DeleteFilled/>} type="link">*/}
        {/*    {t("common.button.delete")}*/}
        {/*  </Button>*/}
        {/*</Popconfirm>*/}

      </div>
    ),
  })

  return (
    <PageContainer>
      <YuancangOperatonSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                              setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('operation.yuancang_operaton')})}
            bordered={true}
            style={{}}
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
            tableKey={"yuancang_operaton_table"}
            columns={columns}
            dataSource={yuancangOperatonList}
            rowKey="yuancangOperatonId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>


    </PageContainer>
  )
})

export default YuancangOperatonTablePage;
