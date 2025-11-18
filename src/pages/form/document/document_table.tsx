import React, {useEffect, useState} from 'react'
import {Button, Card, message, Spin, TableProps} from 'antd'
import {DocumentType} from '@/common/data_type/form/document'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {deleteDocument, searchDocument, updateDocument} from '@/common/service/form/document'
import DocumentSearch from './components/document_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {renderDateTime2InRow} from "@/common/common_formatter";
import {PageContainer} from '@ant-design/pro-components'


const DocumentTablePage: React.FC = (() => {
  const [documentList, setDocumentList] = useState<DocumentType[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string>('');
  const [currentDocument, setCurrentDocument] = useState<DocumentType | any>({});
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

  const fetchDocumentList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchDocument(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setDocumentList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/form/document/document_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchDocumentList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchDocumentList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchDocumentList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchDocumentList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchDocumentList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      documentId: currentDocument.documentId,
    }
    params[fieldName] = value
    updateDocument(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('form.document')}));
        currentDocument[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchDocumentList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "documentId=" + row.documentId);
    setCurrentDocument(row)
    if (row.documentId) {
      deleteDocument({documentId: row.documentId}).then((response: any) => {
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


  const columns: TableProps<DocumentType>['columns'] = []
  columns.push({
    align: "center",
    title: t("form.document.document_no"),
    key: "document_no",
    dataIndex: "documentNo",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
  })
  columns.push({
    align: "center",
    title: t("form.document.document_name"),
    key: "document_name",
    dataIndex: "documentName",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.operation_plan_id"),
    key: "operation_plan_id",
    dataIndex: "operationPlanId",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: "靠泊次数",
    key: "berthing_number",
    dataIndex: "berthingNumber",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  
  columns.push({
    align: "center",
    title: t("form.document.ship_name"),
    key: "ship_name",
    dataIndex: "shipName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.cargo_name"),
    key: "cargo_name",
    dataIndex: "cargoName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.domestic_foreign_trade_type"),
    key: "domestic_foreign_trade_type",
    dataIndex: "domesticForeignTradeType",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.DomesticForeignTradeType,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.DomesticForeignTradeType.filter((item) => (item.value === row.domesticForeignTradeType)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.operation_type"),
    key: "operation_type",
    dataIndex: "operationType",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.OperationType,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.OperationType.filter((item) => (item.value === row.operationType)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.berthing_time"),
    key: "berthing_time",
    dataIndex: "berthingTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTime2InRow
  })

  columns.push({
    align: "center",
    title: t("form.document.departure_time"),
    key: "departure_time",
    dataIndex: "departureTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTime2InRow
  })

  columns.push({
    align: "center",
    title: t("form.document.template_name"),
    key: "template_name",
    dataIndex: "templateName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.template_no"),
    key: "template_no",
    dataIndex: "templateNo",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  //
  // columns.push({align: "center",
  //   title: t("form.document.current_version"),
  //   key: "current_version",
  //   dataIndex: "currentVersion",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  //
  // columns.push({align: "center",
  //   title: t("form.document.publish_time"),
  //   key: "publish_time",
  //   dataIndex: "publishTime",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.document.publisher_name"),
  //   key: "publisher_name",
  //   dataIndex: "publisherName",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.document.current_step"),
  //   key: "current_step",
  //   dataIndex: "currentStep",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })


  columns.push({
    align: "center",
    title: t("form.document.input_start_time"),
    key: "input_start_time",
    dataIndex: "inputStartTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.input_finish_time"),
    key: "input_finish_time",
    dataIndex: "inputFinishTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.document.fillin_status"),
    key: "fillin_status",
    dataIndex: "fillinStatus",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("common.button.operate"),
    align: "center", key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: DocumentType, index: number) => (
      <div>
        {/*<Link to={`/form/document/document_detail_page/${row.documentId}`} target={"_blank"}>*/}
        {/*  <Button size="small" type="link">{t("common.button.detail")}1</Button>*/}
        {/*</Link>*/}
        <Link to={`/form/document/document_detail_page/${row.documentId}`} target={"_blank"}>
          <Button size="small" type="link">{t("common.button.detail")}</Button>
        </Link>

        {/*<Link to={`/form/document/document_edit_page/${row.documentId}`}>*/}
        {/*  <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>*/}
        {/*</Link>*/}

        {/*<Popconfirm*/}
        {/*      title={t("common.row_delete_title")}*/}
        {/*      description={t("common.row_delete_description")}*/}
        {/*      onConfirm={(e)=>confirm(e, row)}*/}
        {/*      onCancel={cancel}*/}
        {/*      okText={t("common.yes")}*/}
        {/*      cancelText={t("common.no")}*/}
        {/*    >*/}
        {/*    <Button size="small" icon={<DeleteFilled/>}  type="link">*/}
        {/*      {t("common.button.delete")}*/}
        {/*    </Button>*/}
        {/* </Popconfirm>*/}

      </div>
    ),
  })

  return (
    <PageContainer>
      <DocumentSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                      setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('form.document')})}
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
            tableKey={"document_table"}
            columns={columns}
            dataSource={documentList}
            rowKey="documentId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>


    </PageContainer>
  )
})

export default DocumentTablePage;
