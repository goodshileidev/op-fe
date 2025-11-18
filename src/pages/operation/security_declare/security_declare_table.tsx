import React, {useEffect, useState} from 'react'
import {Button, Card, message, Spin, TableProps} from 'antd'
import {EditFilled} from '@ant-design/icons'
import {SecurityDeclareType} from '@/common/data_type/operation/security_declare'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {
  deleteSecurityDeclare,
  searchSecurityDeclare,
  updateSecurityDeclare
} from '@/common/service/operation/security_declare'
import SecurityDeclareSearch from './components/security_declare_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import {getPathParam} from "@/common/path_util";
import SuperTable from "@/components/common/super-table";


const SecurityDeclareTablePage: React.FC = (() => {
  const [securityDeclareList, setSecurityDeclareList] = useState<SecurityDeclareType[]>([]);
  const [currentSecurityDeclareId, setCurrentSecurityDeclareId] = useState<string>('');
  const [currentSecurityDeclare, setCurrentSecurityDeclare] = useState<SecurityDeclareType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);


  const {bizType} = getPathParam(location.pathname, ['bizType']);

  const bizTypeFormTemplateNoMap = {
    meiyan: "RE-WHNBMT-04-009-1",
    huagong: "RE-WHNBMT-04-009-2"
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

  const fetchSecurityDeclareList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    params.formTemplateNoCondition = "HG009"
    params.bizType = (bizType === "huagong") ? "1" : "2"
    const response = await searchSecurityDeclare(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setSecurityDeclareList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/operation/security_declare/security_declare_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchSecurityDeclareList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchSecurityDeclareList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchSecurityDeclareList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchSecurityDeclareList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchSecurityDeclareList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      securityDeclareId: currentSecurityDeclare.securityDeclareId,
    }
    params[fieldName] = value
    updateSecurityDeclare(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('operation.security_declare')}));
        currentSecurityDeclare[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchSecurityDeclareList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "securityDeclareId=" + row.securityDeclareId);
    setCurrentSecurityDeclare(row)
    if (row.securityDeclareId) {
      deleteSecurityDeclare({securityDeclareId: row.securityDeclareId}).then((response: any) => {
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


  const columns: TableProps<SecurityDeclareType>['columns'] = []
  columns.push({align: "center",
    title: t("operation.security_declare.data_date"),
    key: "data_date",
    dataIndex: "dataDate",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("operation.security_declare.ship_name"),
    key: "ship_name",
    dataIndex: "shipName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("operation.security_declare.operate_status"),
    key: "operate_status",
    dataIndex: "operateStatus",
    ellipsis: true,
    width: "100px",
    render: (text: string, row: any, index: number) => {
      const value = text ? text : "1"
      return <div>
        {codeList.OperationStatus.filter((item) => (item.value === value)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    },
    className: " text_center ",
  })

  columns.push({align: "center",
    title: t("common.button.operate"),
    align: "center",key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: SecurityDeclareType, index: number) => (
      <div>
        {/*<Link to={`/operation/security_declare/security_declare_detail_page/${row.securityDeclareId}`}>*/}
        {/*  <Button size="small" type="link">{t("common.button.detail")}</Button>*/}
        {/*</Link>*/}
        <Link to={`/form/form/form_detail_page/${row.formId}`} target={"_blank"}>
          <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.view")}</Button>
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
    <div style={{
      display: 'grid',
      padding: '24px',

    }}>
      <SecurityDeclareSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                             setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('operation.security_declare')})}
            bordered={true}
            style={{

            }}
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
            tableKey={"security_declare_table"}
            columns={columns}
            dataSource={securityDeclareList}
            rowKey="securityDeclareId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>


    </div>
  )
})

export default SecurityDeclareTablePage;
