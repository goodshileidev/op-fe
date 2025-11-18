import React, {useEffect, useState} from 'react'
import {Button, Card, message, Popconfirm, Spin, TableProps} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {DocumentTemplateType} from '@/common/data_type/template/document_template'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {
  deleteDocumentTemplate,
  searchDocumentTemplate,
  updateDocumentTemplate
} from '@/common/service/template/document_template'
import DocumentTemplateSearch from './components/document_template_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {PageContainer} from '@ant-design/pro-components'


const DocumentTemplateTablePage: React.FC = (() => {
  const [documentTemplateList, setDocumentTemplateList] = useState<DocumentTemplateType[]>([]);
  const [currentDocumentTemplateId, setCurrentDocumentTemplateId] = useState<string>('');
  const [currentDocumentTemplate, setCurrentDocumentTemplate] = useState<DocumentTemplateType | any>({});
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

  const fetchDocumentTemplateList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchDocumentTemplate(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setDocumentTemplateList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/template/document_template/document_template_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchDocumentTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchDocumentTemplateList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchDocumentTemplateList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchDocumentTemplateList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchDocumentTemplateList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      documentTemplateId: currentDocumentTemplate.documentTemplateId,
    }
    params[fieldName] = value
    updateDocumentTemplate(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('template.document_template')}));
        currentDocumentTemplate[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchDocumentTemplateList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "documentTemplateId=" + row.documentTemplateId);
    setCurrentDocumentTemplate(row)
    if (row.documentTemplateId) {
      deleteDocumentTemplate({documentTemplateId: row.documentTemplateId}).then((response: any) => {
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


  const columns: TableProps<DocumentTemplateType>['columns'] = []

  columns.push({
    align: "center",
    title: t("template.document_template.template_name"),
    key: "template_name",
    dataIndex: "templateName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.document_template.template_no"),
    key: "template_no",
    dataIndex: "templateNo",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.document_template.current_version"),
    key: "current_version",
    dataIndex: "currentVersion",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.document_template.publish_time"),
    key: "publish_time",
    dataIndex: "publishTime",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.document_template.publisher_name"),
    key: "publisher_name",
    dataIndex: "publisherName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.document_template.publish_status"),
    key: "publish_status",
    dataIndex: "publishStatus",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.PublishStatus,
    render: (text: string, row: any, index: number) => {
      const publishStatus = row.publishStatus ? row.publishStatus : "1"
      return <div>
        {codeList.PublishStatus.filter((item) => (item.value === publishStatus)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    },
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("common.button.operate"),
    align: "center", key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: DocumentTemplateType, index: number) => (
      <div>
        <Link to={`/template/document_template/document_template_detail_page/${row.documentTemplateId}`}>
          <Button size="small" type="link">{t("common.button.detail")}</Button>
        </Link>
        <Link to={`/template/document_template/document_template_edit_page/${row.documentTemplateId}`}>
          <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
        </Link>

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
        </Popconfirm>

      </div>
    ),
  })

  return (
    <PageContainer>
      <DocumentTemplateSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                              setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('template.document_template')})}
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
            tableKey={"document_template_table"}
            columns={columns}
            dataSource={documentTemplateList}
            rowKey="documentTemplateId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>
    </PageContainer>
  )
})

export default DocumentTemplateTablePage;
