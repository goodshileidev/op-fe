import React, {useEffect, useState} from 'react'
import {Button, Card, message, Spin, TableProps} from 'antd'
import {MonthlySecurityCheckType} from '@/common/data_type/operation/monthly_security_check'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {
  deleteMonthlySecurityCheck,
  searchMonthlySecurityCheck,
  updateMonthlySecurityCheck
} from '@/common/service/operation/monthly_security_check'
import MonthlySecurityCheckSearch from './components/monthly_security_check_search'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {getPathParam} from "@/common/path_util";
import {PageContainer} from "@ant-design/pro-components";
import {renderYearMonthInRow} from "@/common/common_formatter";


const MonthlySecurityCheckTablePage: React.FC = (() => {
  const [monthlySecurityCheckList, setMonthlySecurityCheckList] = useState<MonthlySecurityCheckType[]>([]);
  const [currentMonthlySecurityCheckId, setCurrentMonthlySecurityCheckId] = useState<string>('');
  const [currentMonthlySecurityCheck, setCurrentMonthlySecurityCheck] = useState<MonthlySecurityCheckType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);

  const {bizType} = getPathParam(location.pathname, ['bizType']);

  const bizTypeFormTemplateNoMap = {
    meiyan: "RE-WHNBMT-04-210",
    huagong: "RE-WHNBMT-04-100"
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchMonthlySecurityCheckList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    params.templateNoCondition = bizTypeFormTemplateNoMap[bizType]
    const response = await searchMonthlySecurityCheck(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setMonthlySecurityCheckList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/operation/monthly_security_check/monthly_security_check_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchMonthlySecurityCheckList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchMonthlySecurityCheckList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchMonthlySecurityCheckList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchMonthlySecurityCheckList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchMonthlySecurityCheckList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      monthlySecurityCheckId: currentMonthlySecurityCheck.monthlySecurityCheckId,
    }
    params[fieldName] = value
    updateMonthlySecurityCheck(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('operation.monthly_security_check')}));
        currentMonthlySecurityCheck[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchMonthlySecurityCheckList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "monthlySecurityCheckId=" + row.monthlySecurityCheckId);
    setCurrentMonthlySecurityCheck(row)
    if (row.monthlySecurityCheckId) {
      deleteMonthlySecurityCheck({monthlySecurityCheckId: row.monthlySecurityCheckId}).then((response: any) => {
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


  const columns: TableProps<MonthlySecurityCheckType>['columns'] = []

  columns.push({
    align: "center",
    title: t("operation.monthly_security_check.check_year_month"),
    key: "data_date",
    dataIndex: "dataDate",
    ellipsis: true,
    width: "100px",
    render: renderYearMonthInRow,
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("operation.monthly_security_check.form_name"),
    key: "form_name",
    dataIndex: "formName",
    ellipsis: true,
    width: "100px",
    className: " text_left ",
  })

  columns.push({
    align: "center",
    title: t("operation.monthly_security_check.operate_status"),
    key: "fillin_status",
    dataIndex: "fillinStatus",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  // columns.push({align: "center",
  //   title: t("operation.monthly_security_check.turn_group"),
  //   key: "turn_group",
  //   dataIndex: "turnGroup",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.OperationStatus,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.OperationStatus.filter((item) => (item.value === row.turnGroup)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
  //   className: " text_center ",
  // })

  columns.push({
    align: "center",
    title: t("common.button.operate"),
    align: "center", key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: MonthlySecurityCheckType, index: number) => (
      <div>
        {/*<Link to={`/operation/monthly_security_check/monthly_security_check_detail_page/${row.monthlySecurityCheckId}`}>*/}
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
      <MonthlySecurityCheckSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                                  setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('operation.monthly_security_check')})}
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
            tableKey={"monthly_security_check_table"}
            columns={columns}
            dataSource={monthlySecurityCheckList}
            rowKey="monthlySecurityCheckId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>


    </PageContainer>
  )
})

export default MonthlySecurityCheckTablePage;
