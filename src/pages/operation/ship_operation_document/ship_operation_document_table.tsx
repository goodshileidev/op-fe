import React, {useEffect, useState} from 'react'
import {Button, Card, message, Spin, TableProps} from 'antd'
import {ShipOperationDocumentType} from '@/common/data_type/operation/ship_operation_document'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {
  deleteShipOperationDocument,
  searchShipOperationDocument,
  updateShipOperationDocument
} from '@/common/service/operation/ship_operation_document'
import ShipOperationDocumentSearch from './components/ship_operation_document_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {getPathParam} from "@/common/path_util";
import {PageContainer} from "@ant-design/pro-components";
import {renderDateTime2InRow} from "@/common/common_formatter";


const ShipOperationDocumentTablePage: React.FC = (() => {
  const [shipOperationDocumentList, setShipOperationDocumentList] = useState<ShipOperationDocumentType[]>([]);
  const [currentShipOperationDocumentId, setCurrentShipOperationDocumentId] = useState<string>('');
  const [currentShipOperationDocument, setCurrentShipOperationDocument] = useState<ShipOperationDocumentType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);
  const {bizType} = getPathParam(location.pathname, ['bizType']);

  const bizTypeDocumentTemplateNoMap = {
    meiyan: "RE-WHNBMT-04-004",
    huagong: "RE-WHNBMT-04-003"
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

  const fetchShipOperationDocumentList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    params.templateNoCondition = bizTypeDocumentTemplateNoMap[bizType]
    const response = await searchShipOperationDocument(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setShipOperationDocumentList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/operation/ship_operation_document/ship_operation_document_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchShipOperationDocumentList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchShipOperationDocumentList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchShipOperationDocumentList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchShipOperationDocumentList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchShipOperationDocumentList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      shipOperationDocumentId: currentShipOperationDocument.shipOperationDocumentId,
    }
    params[fieldName] = value
    updateShipOperationDocument(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('operation.ship_operation_document')}));
        currentShipOperationDocument[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchShipOperationDocumentList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "shipOperationDocumentId=" + row.shipOperationDocumentId);
    setCurrentShipOperationDocument(row)
    if (row.shipOperationDocumentId) {
      deleteShipOperationDocument({shipOperationDocumentId: row.shipOperationDocumentId}).then((response: any) => {
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


  const columns: TableProps<ShipOperationDocumentType>['columns'] = []

  // columns.push({
  //   align: "center",
  //   title: t("operation.ship_operation_document.operation_plan_id"),
  //   key: "operation_plan_id",
  //   dataIndex: "operationPlanId",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({
  //   align: "center",
  //   title: t("operation.ship_operation_document.turn_group"),
  //   key: "turn_group",
  //   dataIndex: "turnGroup",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({
  //   align: "center",
  //   title: t("operation.ship_operation_document.turn_no"),
  //   key: "turn_no",
  //   dataIndex: "turnNo",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })


  columns.push({
    align: "center",
    title: t("operation.ship_operation_document.berthing_time"),
    key: "berthing_time",
    dataIndex: "berthingTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTime2InRow
  })

  columns.push({
    align: "center",
    title: t("operation.ship_operation_document.ship_name"),
    key: "ship_name",
    dataIndex: "shipName",
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
    title: t("operation.ship_operation_document.voyage_no"),
    key: "voyage_no",
    dataIndex: "voyageNo",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("operation.ship_operation_document.cargo_name"),
    key: "cargo_name",
    dataIndex: "cargoName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  //
  // columns.push({align: "center",
  //   title: t("operation.ship_operation_document.platform_cargo_name"),
  //   key: "platform_cargo_name",
  //   dataIndex: "platformCargoName",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  columns.push({
    align: "center",
    title: t("operation.ship_operation_document.domestic_foreign_trade_type"),
    key: "domestic_foreign_trade_type",
    dataIndex: "domesticForeignTradeType",
    ellipsis: true,
    width: "100px",
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
    title: t("operation.ship_operation_document.operation_type"),
    key: "operation_type",
    dataIndex: "operationType",
    ellipsis: true,
    width: "100px",
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
    title: t("operation.ship_operation_document.operation_status"),
    key: "fillin_status",
    dataIndex: "fillinStatus",
    ellipsis: true,
    width: "100px",
    align: "center",
    className: " text_center ",
    render: (text: string, row: any, index: number) => {
      let color = "black"
      if (text === "填写中") {
        color = "red"
      } else if (text === "已完成") {
        color = "green"
      }
      return <span color={color} key={text}>{text}</span>
    }
  })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.port_name"),
//   key: "port_name",
//   dataIndex: "portName",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.net_tonnage"),
//   key: "net_tonnage",
//   dataIndex: "netTonnage",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.gross_tonnage"),
//   key: "gross_tonnage",
//   dataIndex: "grossTonnage",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.dead_weight_tonnage"),
//   key: "dead_weight_tonnage",
//   dataIndex: "deadWeightTonnage",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.load_unload"),
//   key: "load_unload",
//   dataIndex: "loadUnload",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.english_ship_name"),
//   key: "english_ship_name",
//   dataIndex: "englishShipName",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.ship_mmsi"),
//   key: "ship_mmsi",
//   dataIndex: "shipMmsi",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.planed_arriving_time"),
//   key: "planed_arriving_time",
//   dataIndex: "planedArrivingTime",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })
//
//
// columns.push({align: "center",
//   title: t("operation.ship_operation_document.departure_time"),
//   key: "departure_time",
//   dataIndex: "departureTime",
//   ellipsis: true,
//   width: "100px",
//   className: " text_center ",
// })

  columns.push({
    align: "center",
    title: t("common.button.operate"),
    align: "center", key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: ShipOperationDocumentType, index: number) => (
      <div>
        <Link
          to={`/document_detail_page/${row.documentId}`} target={"_blank"}>
          <Button size="small" type="link">{t("common.button.view")}</Button>
        </Link>
        {/*<Link*/}
        {/*  to={`/operation/ship_operation_document/ship_operation_document_edit_page/${row.shipOperationDocumentId}`}>*/}
        {/*  <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>*/}
        {/*</Link>*/}

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
      <ShipOperationDocumentSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                                   setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('operation.ship_operation_document')})}
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
            tableKey={"ship_operation_document_table"}
            columns={columns}
            dataSource={shipOperationDocumentList}
            rowKey="shipOperationDocumentId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>


    </PageContainer>
  )
})

export default ShipOperationDocumentTablePage;
