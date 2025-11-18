import React, {useEffect, useState} from 'react'
import {Button, Card, message, Spin, TableProps} from 'antd'
import {FormType} from '@/common/data_type/form/form'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {deleteForm, searchForm, updateForm} from '@/common/service/form/form'
import FormSearch from './components/form_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {renderDateTimeInRow} from "@/common/common_formatter";
import ShowAccessLinkModal from "@/pages/form/form/components/show_access_link_modal";
import {EditFilled} from '@ant-design/icons'
import {PageContainer} from "@ant-design/pro-components";
import SendMailModal from "@/pages/form/form/components/send_email_modal";

const FormTablePage: React.FC = (() => {
  const [formList, setFormList] = useState<FormType[]>([]);
  const [currentFormId, setCurrentFormId] = useState<string>('');
  const [currentForm, setCurrentForm] = useState<FormType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);
  const [isShareInfoVisible, setIsShareInfoVisible] = useState(false);
  const [isSendMailVisible, setIsSendMailVisible] = useState(false);


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchFormList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchForm(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setFormList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/form/form/form_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      formId: currentForm.formId,
    }
    params[fieldName] = value
    updateForm(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('form.form')}));
        currentForm[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchFormList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "formId=" + row.formId);
    setCurrentForm(row)
    if (row.formId) {
      deleteForm({formId: row.formId}).then((response: any) => {
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


  const columns: TableProps<FormType>['columns'] = []

  columns.push({
    align: "center",
    title: t("form.form.form_no"),
    key: "form_no",
    dataIndex: "formNo",
    ellipsis: true,
    width: "300px",
    className: " text_left ",
  })

  columns.push({
    align: "center",
    title: t("form.form.form_name"),
    key: "form_name",
    dataIndex: "formName",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.form.ship_name"),
    key: "ship_name",
    dataIndex: "shipName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.form.cargo_name"),
    key: "cargo_name",
    dataIndex: "cargoName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("form.form.domestic_foreign_trade_type"),
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
    title: t("form.form.operation_type"),
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
    title: t("form.form.berthing_time"),
    key: "berthing_time",
    dataIndex: "berthingTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTimeInRow
  })

  columns.push({
    align: "center",
    title: t("form.form.departure_time"),
    key: "departure_time",
    dataIndex: "departureTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTimeInRow
  })
  //
  // columns.push({align: "center",
  //   title: t("form.form.input_person_name"),
  //   key: "input_person_name",
  //   dataIndex: "inputPersonName",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  columns.push({
    align: "center",
    title: t("form.form.input_start_time"),
    key: "input_start_time",
    dataIndex: "inputStartTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTimeInRow
  })

  columns.push({
    align: "center",
    title: t("form.form.input_finish_time"),
    key: "input_finish_time",
    dataIndex: "inputFinishTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTimeInRow
  })

  // columns.push({align: "center",
  //   title: t("form.form.display_position"),
  //   key: "display_position",
  //   dataIndex: "displayPosition",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.DisplayPosition,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.DisplayPosition.filter((item) => (item.value === row.displayPosition)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.form.fillin_order"),
  //   key: "fillin_order",
  //   dataIndex: "fillinOrder",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.form.current_step"),
  //   key: "current_step",
  //   dataIndex: "currentStep",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  columns.push({
    align: "center",
    title: t("form.form.fillin_status"),
    key: "fillin_status",
    dataIndex: "fillinStatus",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  //
  // columns.push({align: "center",
  //   title: t("form.form.operation_mode"),
  //   key: "operation_mode",
  //   dataIndex: "operationMode",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.OperationMode,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.OperationMode.filter((item) => (item.value === row.operationMode)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
  //   className: " text_center ",
  // })

  // columns.push({align: "center",
  //   title: t("form.form.is_signature_required"),
  //   key: "is_signature_required",
  //   dataIndex: "isSignatureRequired",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.YesNo,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.YesNo.filter((item) => (item.value === row.isSignatureRequired)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.form.is_stamp_signature_required"),
  //   key: "is_stamp_signature_required",
  //   dataIndex: "isStampSignatureRequired",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.YesNo,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.YesNo.filter((item) => (item.value === row.isStampSignatureRequired)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.form.signature_image_url"),
  //   key: "signature_image_url",
  //   dataIndex: "signatureImageUrl",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.form.stamp_image_url"),
  //   key: "stamp_image_url",
  //   dataIndex: "stampImageUrl",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  function showShareLink(text: string, row: FormType) {
    setCurrentForm(row)
    setIsShareInfoVisible(true);
  }


  function onCloseShowAccessLinkModal(text: string, row: FormType) {
    setIsShareInfoVisible(false);
  }

  function showSendMail(text: string, row: FormType) {
    setCurrentForm(row)
    setIsSendMailVisible(true);
  }


  function onCloseSendMailModal(text: string, row: FormType) {
    setIsSendMailVisible(false);
  }


  columns.push({
    align: "center",
    title: t("common.button.operate"),
    align: "center", key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: FormType, index: number) => (
      <div>
        <Link to={`/form/form/form_detail_page/${row.formId}`} target={"_blank"}>
          <Button size="small" type="link">{t("common.button.view")}</Button>
        </Link>
        <Link to={`/form/form/form_edit_page/${row.formId}`} target={"_blank"}>
          <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
        </Link>
        {row.displayPosition.includes("2") ?
          <Button size="small" type="link"
                  onClick={() => showShareLink(text, row)}>{t("common.button.show_share_link")}</Button>
          : <></>
        }
        {row.displayPosition.includes("2") ?
          <Button size="small" type="link"
                  onClick={() => showSendMail(text, row)}>{t("common.button.show_send_mail")}</Button>
          : <></>
        }
        {/*  <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.create_pdf")}</Button>*/}
        {/*</a>*/}
        <Link to={`/printForm/${row.formId}`} target={"_blank"}>
          <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.print_preview")}</Button>
        </Link>

        {/*<Popconfirm*/
        }
        {/*  title={t("common.row_delete_title")}*/
        }
        {/*  description={t("common.row_delete_description")}*/
        }
        {/*  onConfirm={(e) => confirm(e, row)}*/
        }
        {/*  onCancel={cancel}*/
        }
        {/*  okText={t("common.yes")}*/
        }
        {/*  cancelText={t("common.no")}*/
        }
        {/*>*/
        }
        {/*  <Button size="small" icon={<DeleteFilled/>} type="link">*/
        }
        {/*    {t("common.button.delete")}*/
        }
        {/*  </Button>*/
        }
        {/*</Popconfirm>*/
        }

      </div>
    ),
  })

  return (
    <PageContainer>
      <FormSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                  setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('form.form')})}
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
            tableKey={"form_table"}
            columns={columns}
            dataSource={formList}
            rowKey="formId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>
      <ShowAccessLinkModal
        onClose={onCloseShowAccessLinkModal}
        isVisible={isShareInfoVisible}
        style={"basic"}
        formData={currentForm}></ShowAccessLinkModal>
      <SendMailModal
        onClose={onCloseSendMailModal}
        isVisible={isSendMailVisible}
        formData={currentForm}></SendMailModal>

    </PageContainer>
  )
})

export default FormTablePage;
