import React, {useEffect, useRef, useState} from 'react'
import {Card, Spin, Table, TablePaginationConfig, TableProps} from 'antd'
import {DocumentType} from '@/common/data_type/form/document'
import {searchDocument} from '@/common/service/form/document'
import {useTranslation} from 'react-i18next';
import {renderDateTime2InRow} from "@/common/common_formatter";
import {PageContainer} from "@ant-design/pro-components";
import DocumentFormList from "@/pages/form/form/components/document_form_list";
import {FormType} from "@/common/data_type/form/form";
import {doCreatePdf, getVarValueMap} from "@/pages/form/form/form_utils";

const SharableFormTablePage: React.FC = (() => {
  const [documentList, setDocumentList] = useState<DocumentType[]>([]);
  const [formUuidList, setFormUuidList] = useState<string[]>([]);
  const [printedFormUuidList, setPrintedFormUuidList] = useState<string[]>([]);
  const [toPrintFormList, setToPrintFormList] = useState<FormType[]>([]);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const [documentFormListMap, setDocumentFormListMap] = useState<Record<number, string[]>>({});

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 50,
    total: 0,
    showSizeChanger: true,
    showTotal: false,
    size: 'small',
    pageSizeOptions: [50, 100, 200]
  });


  const fetchDocumentList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    // params.fillinStatusCondition = "'未填写'"
    params.templateNoInCondition = "'RE-WHNBMT-04-003','RE-WHNBMT-04-004'"
    const response = await searchDocument(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setDocumentList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true,
      size: 'small',
      pageSizeOptions: [50, 100, 200]
    });
    for (let i = 0; i < records.length; i++) {
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchDocumentList()
  }, []);

  const creatingPdfFormRef = useRef(null)

  const toPrintFormListRef = useRef(toPrintFormList)

  const printedFormUuidListRef = useRef(printedFormUuidList)

  const clearTask = (form: FormType) => {
    let toPrintFormList = toPrintFormListRef.current
    toPrintFormList = toPrintFormList.slice(1)
    if (!printedFormUuidListRef.current.includes(form.formUuid)) {
      printedFormUuidListRef.current.push(form.formUuid)
    }
    toPrintFormListRef.current = toPrintFormList
    setToPrintFormList(toPrintFormListRef.current)
    // setPrintedFormUuidList(printedFormUuidList)
    creatingPdfFormRef.current = null
  }

  let downloadPdfInterval = null;

  useEffect(() => {
    if (downloadPdfInterval === null) {
      downloadPdfInterval = setInterval(() => {
        const formData = creatingPdfFormRef.current
        // 在列表里面的，都是需要打印的
        if (!formData) {
          const toPrintFormList = toPrintFormListRef.current
          if (toPrintFormList.length > 0) {
            const toPrintForm = toPrintFormList[0]
            if (!printedFormUuidListRef.current.includes(toPrintForm.formUuid)) {
              creatingPdfFormRef.current = toPrintForm
              doCreatePdf(toPrintForm, false, false, null, clearTask, clearTask)
            } else {
              console.debug("表单PDF已生成，无需重新生成-3", toPrintForm, downloadPdfInterval)
              clearTask(toPrintForm)
            }
          } else {
            console.debug("没有需要打印的PDF, 等待1秒后重试", downloadPdfInterval)
          }
        } else {
          console.debug("PDF正在打印中, 等待1秒后重试", formData, downloadPdfInterval)
        }
      }, 1000)
    }

  }, [])


  const handleTableChange = (pagination: any) => {
    const currentConditions = {}
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchDocumentList(currentConditions);
  };

  const documentColumns: TableProps<DocumentType>['columns'] = []

  documentColumns.push({
    align: "left",
    title: t("form.document.document_no"),
    key: "document_no",
    dataIndex: "documentNo",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
  })
  documentColumns.push({
    align: "left",
    title: t("form.document.template_name"),
    key: "template_name",
    dataIndex: "templateName",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
  })
  documentColumns.push({
    align: "center",
    title: t("form.document.ship_name"),
    key: "ship_name",
    dataIndex: "shipName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  documentColumns.push({
    align: "center",
    title: t("form.document.berthing_time"),
    key: "berthing_time",
    dataIndex: "berthingTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
    render: renderDateTime2InRow
  })


  const onSelectedDocumentForm = (documentId, formUuidList, formData: FormType) => {
    documentFormListMap[documentId] = formUuidList;
    setDocumentFormListMap(documentFormListMap)
    let allFormUuidList = []
    for (let documentId in documentFormListMap) {
      allFormUuidList = allFormUuidList.concat(documentFormListMap[documentId])
    }
    setFormUuidList(allFormUuidList)
    let {updateTime, createdPdfTime, pdfUrl} = getVarValueMap(formData);
    if (!printedFormUuidList.includes(formData.formUuid)) {
      const now = new Date().getTime()
      // PDF超出5天，重新创建
      if (!(createdPdfTime && updateTime < createdPdfTime && (now < createdPdfTime + 1000 * 60 * 60 * 24 * 5)  && pdfUrl && pdfUrl.indexOf("http") !== -1)) {
        const newToPrintFormList = [...toPrintFormList]
        newToPrintFormList.push(formData)
        setToPrintFormList(newToPrintFormList)
        toPrintFormListRef.current = newToPrintFormList
      } else {
        console.debug("表单PDF已生成，无需重新生成-1", formData)
      }
    } else {
      console.debug("表单PDF已生成，无需重新生成-2", formData)
    }
  }

  const documentRowRender = (record, index, indent, expanded) => {
    console.debug(record, index, indent, expanded)
    return <DocumentFormList
      documentId={record.documentId}
      onSelected={onSelectedDocumentForm}
      selectedRowKeys={formUuidList}>

    </DocumentFormList>
  };

  return (
    <PageContainer style={{height: '100%'}}>
      <Card title={t("common.title.list", {'entity': t('form.document')})}
            bordered={true}
            style={{}}
      >
        <Spin spinning={loading}>
          <Table<DocumentType>
            style={{
              width: "100%",
              height: "calc(100vh - 250px)",
              overflowY: "scroll"
            }}
            scroll={{y: "calc(100vh - 250px)"}}
            expandable={{
              expandedRowRender: documentRowRender,
              expanded: true,
              defaultExpandAllRows: true,
              showExpandColumn: true
            }}
            dataSource={documentList}
            tableKey={"document_table"}
            columns={documentColumns}
            pagination={pagination}
            onChange={handleTableChange}
            rowKey="documentId"/>
        </Spin>
      </Card>
      {formUuidList.length > 0 ?
        <Card title={"分享链接"}
              bordered={true}
              style={{height: 200, overflowY: "scroll", padding: 10}}>
          <a
            href={location.protocol + "//" + location.host + location.pathname + "#/sharedFormTable/" + formUuidList.join(",")}
            target={"_blank"}>
            {location.protocol}//{location.host + location.pathname}#/sharedFormTable/{formUuidList.join(",")}
          </a>
        </Card>
        : <></>
      }
    </PageContainer>
  )
})

export default SharableFormTablePage;
