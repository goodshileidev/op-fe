import React, {useEffect, useState} from 'react'
import {Button, Card, message, Popconfirm, Popover, Spin, Table, TableProps, Tabs, TabsProps,} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormType} from '@/common/data_type/form/form'
import {deleteForm, getQrCode, listForm} from '@/common/service/form/form'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import {Link} from "@@/exports";
import ShowAccessLinkModal from "@/pages/form/form/components/show_access_link_modal";
import {downloadUrl} from "@/common/service/common";
import SendMailModal from "@/pages/form/form/components/send_email_modal";
import {renderDateTimeInRow} from "@/common/common_formatter";
import {DocumentType} from '@/common/data_type/form/document';
import {doCreatePdf, getFormGroupName, getVarValueMap} from "@/pages/form/form/form_utils";


interface IFormListProps {
  documentId?: string
  formList?: FormType[]
  showButtons?: string[]
  onSelect?: any
  onClose?: any
  onGetList?: any
  documentData?: DocumentType
  style: "simple" | "basic"
}

const FormList: React.FC<IFormListProps> = ((props) => {
  const [formList, setFormList] = useState<FormType[]>([]);
  const [jihuaFormList, setJihuaFormList] = useState<FormType[]>([]);
  const [chuananFormList, setChuananFormList] = useState<FormType[]>([]);
  const [xianchangFormList, setXianchangFormList] = useState<FormType[]>([]);
  const [otherFormList, setOtherFormList] = useState<FormType[]>([]);
  const [currentFormId, setCurrentFormId] = useState<string>('');
  const [currentForm, setCurrentForm] = useState<FormType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showButtons = props.showButtons ? props.showButtons : []
  const [isShareInfoVisible, setIsShareInfoVisible] = useState(false);
  const [isSendMailVisible, setIsSendMailVisible] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [formGroupName, setFormGroupName] = useState<String>('计划');
  const [toPrintFormList, setToPrintFormList] = useState<FormType[]>([])
  // const [printedCount, setPrintedCount] = useState<number>(0)

  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 100,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });


  const fetchFormList = async (params: any = {}) => {
    setLoading(true);
    if (props.documentId) {
      params.documentId = props.documentId
    }
    const response = await listForm(params);
    const list = response.data;
    console.debug("props.documentData", props.documentData)
    console.debug("获取到表单列表", list)
    let jihuaList = new Array();
    let chuananList = new Array();
    let xianchangList = new Array();
    let otherList = new Array();
    const toPrintFormList = []
    for (let i = 0; i < list.length; i++) {
      const formData = list[i]
      let varConfigList = formData.varConfigList;
      let varConfigs = varConfigList;
      let formGroupName = getFormGroupName(varConfigs);
      if (formGroupName === '计划') {
        jihuaList.push(list[i]);
      } else if (formGroupName === '船岸') {
        chuananList.push(list[i]);
      } else if (formGroupName === '现场') {
        xianchangList.push(list[i]);
      } else {
        otherList.push(list[i]);
      }
      if (formGroupName === "计划" || formData.fillinStatus === "已完成") {
        // 未完成的计划，必须重新生成
        let {updateTime, createdPdfTime, pdfUrl} = getVarValueMap(formData);
        const now = new Date().getTime()
        // PDF超出5天，重新创建
        if (createdPdfTime && updateTime < createdPdfTime && (now < createdPdfTime + 1000 * 60 * 60 * 24 * 5) && pdfUrl && pdfUrl.indexOf("http") !== -1) {
          formData.pdfUrl = pdfUrl
        } else {
          toPrintFormList.push(formData)
        }
      }
    }
    setToPrintFormList(toPrintFormList)
    if (props.style === "basic") {
      setFormList(jihuaList);
    } else {
      setFormList(list)
    }
    setJihuaFormList(jihuaList);
    setChuananFormList(chuananList);
    setXianchangFormList(xianchangList);
    setOtherFormList(otherList);
    if (props.onGetList) {
      props.onGetList(jihuaList);
    }

    setLoading(false);
  }

  let printedCount = 0

  /**
   * 创建全部PDF
   * @param printedCount
   */
  function createAllPdfs() {
    if (toPrintFormList.length === 0) {
      console.debug("没有要打印的表单")
    } else {
      doCreatePdf(toPrintFormList[printedCount], false, false, null, null, null).then(() => {
        printedCount++
        if (printedCount !== toPrintFormList.length) {
          createAllPdfs()
        } else {
          console.info("全部打印完成", toPrintFormList.length)
          printedCount = 0
        }
      })
    }
  }

  useEffect(() => {
    console.debug("开始打印所有表单", toPrintFormList.length)
    printedCount = 0
    createAllPdfs()
  }, [toPrintFormList]);

  const showQrCode = async (row: any = {}) => {
    setLoading(true);
    const url = await getQrCode(row.formId);
    setQrCodeUrl(url);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    console.debug("handleSearch", params)
    const conditions = JSON.parse(JSON.stringify(params))
    if (props.documentId) {
      conditions.documentId = props.documentId
    }
    setCurrentConditions(conditions)
    fetchFormList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    if (props.documentId) {
      conditions.documentId = props.documentId
    }
    setCurrentConditions(conditions)
    fetchFormList(conditions);
  };

  const handleTableChange = () => {
    fetchFormList(currentConditions);
  };

  useEffect(() => {
    if (props.formList) {
      setFormList(props.formList)
    } else {
      fetchFormList({documentId: props.documentId})
    }
  }, [props.formList, props.documentId]);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: FormType) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentForm(row)
    if (row.formId) {
      deleteForm({formId: row.formId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取列表
          handleSearch({});
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const handleShowDetail = (row: FormType) => {
    console.debug("handleShowDetail", row)
    setCurrentForm(row)
    setCurrentFormId(row.formId)
    setIsDetailModalOpen(true)
  }

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false)
  }

  const handleAdd = (params: any) => {
    console.debug("handleAdd", params)
    const newForm: FormType = {formId: '0'}
    setCurrentFormId('0')
    setCurrentForm(newForm)
    setIsEditModalOpen(true)
  }

  const handleShowEdit = (row: FormType) => {
    console.debug("handleShowEdit", row)
    setCurrentForm(row)
    setCurrentFormId(row.formId)
    setIsEditModalOpen(true)
  }

  const handleEditModalClose = (updated: boolean, data: FormType) => {
    console.debug("handleEditModalClose", data)
    if (updated) {
      handleTableChange()
    }
    setIsEditModalOpen(false)
  }

  const handleClose = () => {
    console.debug("handleClose")
    props.onClose(true)
    return true
  }

  const handleSelect = (data: FormType) => {
    console.debug("handleSelect", data)
    if (props.onSelect) {
      props.onSelect(data)
    }
    return true
  }

  const columns: TableProps<FormType>['columns'] = []

  // columns.push({
  //   align: "center",
  //   title: t("form.form.form_no"),
  //   key: "form_no",
  //   dataIndex: "formNo",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  columns.push({
    align: "center",
    title: t("form.form.form_name"),
    key: "form_name",
    dataIndex: "formName",
    ellipsis: true,
    width: "300px",
    className: " text_left ",
  })

  if ("basic" === props.style) {
    columns.push({
      align: "center",
      title: t("form.form.document_type"),
      key: "document_type",
      dataIndex: "documentType",
      ellipsis: true,
      width: "100px",
      className: " text_center ",
    })

    columns.push({
      align: "center",
      title: t("form.form.document_two_part"),
      key: "document_two_part",
      dataIndex: "documentTwoPart",
      ellipsis: true,
      width: "100px",
      className: " text_center ",
    })

    columns.push({
      align: "center",
      title: t("form.form.operation_demand"),
      key: "operation_demand",
      dataIndex: "operationDemand",
      ellipsis: true,
      width: "100px",
      className: " text_center ",
    })

    columns.push({
      align: "center",
      title: t("form.form.interactive_status"),
      key: "fillin_status",
      dataIndex: "fillinStatus",
      ellipsis: true,
      width: "100px",
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

    columns.push({
      align: "center",
      title: t("form.form.document_description"),
      key: "document_description",
      dataIndex: "documentDescription",
      ellipsis: true,
      width: "100px",
      className: " text_center ",
    })
    if (!props.documentId) {
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
      })

      columns.push({
        align: "center",
        title: t("form.form.departure_time"),
        key: "departure_time",
        dataIndex: "departureTime",
        ellipsis: true,
        width: "100px",
        className: " text_center ",
      })
    }

  }
  // columns.push({align: "center",
  //   title: t("form.form.input_person_name"),
  //   key: "input_person_name",
  //   dataIndex: "inputPersonName",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("form.form.input_by"),
  //   key: "input_by",
  //   dataIndex: "inputBy",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })
  columns.push({
    align: "center",
    title: t("form.form.create_time"),
    key: "create_time",
    dataIndex: "createTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTimeInRow
  })
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
//
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
//   title: t("form.form.publish_status"),
//   key: "publish_status",
//   dataIndex: "publishStatus",
//   ellipsis: true,
//   width: "100px",
//   selectOptions: codeList.PublishStatus,
//   render: (text: string, row: any, index: number) => (
//     <div>
//       {codeList.PublishStatus.filter((item) => (item.value === row.publishStatus)).map((item) => (
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

  // columns.push({align: "center",
  //   title: t("form.form.fillin_status"),
  //   key: "fillin_status",
  //   dataIndex: "fillinStatus",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.FillinStatus,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.FillinStatus.filter((item) => (item.value === row.fillinStatus)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
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

  function onCreatePdf(formData: FormType) {
    if (formData.pdfUrl && formData.pdfUrl.indexOf("http") === 0) {
      downloadUrl(formData.pdfUrl, formData?.formName + ".pdf")
    } else {
      setLoading(true);
      const onFinishCallback = (form, url) => {
        downloadUrl(url, form?.formName + ".pdf")
        setLoading(false)
      }
      const onFailedCallback = (form) => {
        setLoading(false)
      }
      doCreatePdf(formData, true, true, null, onFinishCallback, onFailedCallback, true).catch((e) => {
        setLoading(false)
      })
    }
  }

  columns.push({
    title: t("common.button.operate"),
    align: "center",
    key: 'action',
    width: '200px',
    fixed: 'right',
    render: (text: string, row: FormType, index: number) => (
      <div size="middle">
        {props.style === "basic" ? <>
          <Link to={`/form_detail_page/${row.formId}`} target={"_blank"}>
            <Button size="small" type="link">{t("common.button.view")}</Button>
          </Link>
        </> : <></>}
        {props.style === "simple" ? <>
          <Link to={`/form_detail_page2/${row.formId}`} target={"_blank"}>
            <Button size="small" type="link">{t("common.button.view")}</Button>
          </Link>
        </> : <></>}
        {row.displayPosition.includes("1") ?
          <>
            <Popover content={<img src={qrCodeUrl} style={{width: '180px', height: '180px'}}></img>}
                     title={t("common.button.qr_code")} trigger="focus">
              <Button size="small" type="link" onFocus={() => showQrCode(row)}>{t("common.button.qr_code")}</Button>
            </Popover>

          </>
          : <></>
        }
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
        {props.style === "basic" ? <>
          <Link to={`/printForm/${row.formId}`} target={"_blank"}>
            <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.print_preview")}</Button>
          </Link>
        </> : <></>}
        {props.style === "simple" ? <>
          <Link to={`/printForm2/${row.formId}`} target={"_blank"}>
            <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.print_preview")}</Button>
          </Link>
        </> : <></>}
        <Button size="small" type="link"
                onClick={() => onCreatePdf(row)}>{t("common.button.create_pdf")}</Button>
        {(showButtons.length > 0 && !showButtons.includes("select")) ? (<></>) : (
          <Button size="small" type="link"
                  onClick={() => handleSelect(row)}>{t("common.button.select")}</Button>)}
        {(showButtons.length > 0 && !showButtons.includes("detail")) ? (<></>) : (
          <Button size="small" type="link"
                  onClick={() => handleShowDetail(row)}>{t("common.button.detail")}</Button>)}
        {(showButtons.length > 0 && !showButtons.includes("edit")) ? (<></>) : (
          <Button size="small" type="link" icon={<EditFilled/>}
                  onClick={() => handleShowEdit(row)}>{t("common.button.edit")}</Button>)}
        {(showButtons.length > 0 && !showButtons.includes("delete")) ? (<></>) : (
          <Popconfirm
            title={t("common.row_delete_title")}
            description={t("common.row_delete_description")}
            onConfirm={(e) => confirm(e, row)}
            onCancel={cancel}
            okText={t("common.yes")}
            cancelText={t("common.no")}
          >
            <Button size="small" icon={<DeleteFilled/>} type="link">
              {t("common.button.delete")}
            </Button>
          </Popconfirm>)}
      </div>
    ),
  })
  const onTabChange = (key: string) => {
    setFormGroupName(key);

    if (key === '计划') {
      setFormList(jihuaFormList);
    } else if (key === '船岸') {
      setFormList(chuananFormList);
    } else if (key === '现场') {
      setFormList(xianchangFormList);
    } else if (key === '其他') {
      setFormList(otherFormList);
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '计划',
      label: '计划',
    },
    {
      key: '船岸',
      label: '船岸',
    },
    {
      key: '现场',
      label: '现场'
    },
    // {
    //   key: '其他',
    //   label: '圆仓'
    // },
  ];
  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('form.form')})}
            bordered={true}
            extra={[
              (showButtons.length > 0 && !showButtons.includes("add")) ? (<></>) :
                (<Button onClick={() => {
                  handleAdd(true)
                }}>{t("common.button.add")}</Button>)]}
      >
        <Spin spinning={loading}>
          {
            props.documentData && props.documentData.shipName ?
              <Tabs defaultActiveKey="计划" items={items} onChange={onTabChange}/> : <></>
          }

          <Table columns={columns}
                 dataSource={formList}
                 pagination={false}
                 rowKey="formId"
                 onChange={handleTableChange}/>
        </Spin>
      </Card>
      <ShowAccessLinkModal
        style={props.style}
        onClose={onCloseShowAccessLinkModal}
        isVisible={isShareInfoVisible}
        formData={currentForm}></ShowAccessLinkModal>
      <SendMailModal
        style={props.style}
        onClose={onCloseSendMailModal}
        isVisible={isSendMailVisible}
        formData={currentForm}></SendMailModal>
    </div>
  )
})

export default FormList;
