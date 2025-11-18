import React, {useEffect, useState} from 'react'
import {Button, Card, message, Popconfirm, Spin, TableProps} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {DocumentTemplateRuleType} from '@/common/data_type/template/document_template_rule'
import {useLocation, useSearchParams} from 'umi'
import {
  deleteDocumentTemplateRule,
  searchDocumentTemplateRule,
  updateDocumentTemplateRule
} from '@/common/service/template/document_template_rule'
import DocumentTemplateRuleDetailModal from './components/document_template_rule_detail_modal'
import DocumentTemplateRuleEditModal from './components/document_template_rule_edit_modal'
import DocumentTemplateRuleDetailDrawer from './components/document_template_rule_detail_drawer'
import DocumentTemplateRuleEditDrawer from './components/document_template_rule_edit_drawer'

import DocumentTemplateRuleSearch from './components/document_template_rule_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {PageContainer} from "@ant-design/pro-components";


const DocumentTemplateRuleTablePage: React.FC = (() => {
  const [documentTemplateRuleList, setDocumentTemplateRuleList] = useState<DocumentTemplateRuleType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentDocumentTemplateRuleId, setCurrentDocumentTemplateRuleId] = useState('');
  const [currentDocumentTemplateRule, setCurrentDocumentTemplateRule] = useState<DocumentTemplateRuleType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);


  const [codeListDocumentTemplate, setCodeListDocumentTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListDocumentTemplate({}).then((DocumentTemplateCodeList) => {
      setCodeListDocumentTemplate(DocumentTemplateCodeList)
      console.debug("DocumentTemplateCodeList", DocumentTemplateCodeList)
    })
  }, [])


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchDocumentTemplateRuleList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchDocumentTemplateRule(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setDocumentTemplateRuleList(records);
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
    const newDocumentTemplateRule: DocumentTemplateRuleType = {documentTemplateRuleId: '0'}
    setCurrentDocumentTemplateRuleId('0')
    setCurrentDocumentTemplateRule(newDocumentTemplateRule)
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchDocumentTemplateRuleList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchDocumentTemplateRuleList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchDocumentTemplateRuleList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchDocumentTemplateRuleList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchDocumentTemplateRuleList(currentConditions);
  };
  const handleShowDetail = (row: DocumentTemplateRuleType) => {
    setCurrentDocumentTemplateRule(row)
    setCurrentDocumentTemplateRuleId(row.documentTemplateRuleId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose = () => {
    setIsDetailDrawerOpen(false)
  }

  const handleShowEdit = (row: DocumentTemplateRuleType) => {
    setCurrentDocumentTemplateRule(row)
    setCurrentDocumentTemplateRuleId(row.documentTemplateRuleId)
    setIsEditModalOpen(true)
    // setIsEditDrawerOpen(true)
  }
  const handleEditModalClose = (updated: boolean) => {
    setIsEditModalOpen(false)
    if (updated) {
      handleTableChange(pagination)
    }
  }
  const handleEditDrawerClose = (updated: boolean) => {
    setIsEditDrawerOpen(false)
    if (updated) {
      handleTableChange(pagination)
    }
  }

  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      documentTemplateRuleId: currentDocumentTemplateRule.documentTemplateRuleId,
    }
    params[fieldName] = value
    updateDocumentTemplateRule(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('template.document_template_rule')}));
        currentDocumentTemplateRule[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchDocumentTemplateRuleList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentDocumentTemplateRule(row)
    if (row.documentTemplateRuleId) {
      deleteDocumentTemplateRule({documentTemplateRuleId: row.documentTemplateRuleId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchDocumentTemplateRuleList({
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


  const detail_show_type = 'modal'
  const edit_show_type = 'modal'

  const columns: TableProps<DocumentTemplateRuleType>['columns'] = []

  columns.push({align: "center",
    title: t("template.document_template_rule.document_template_name"),
    key: "document_template_name",
    dataIndex: "documentTemplateName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  columns.push({align: "center",
    title: t("template.document_template_rule.document_template_no"),
    key: "document_template_no",
    dataIndex: "documentTemplateNo",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })
  //
  // columns.push({align: "center",
  //   title: t("template.document_template_rule.cargo_name"),
  //   key: "cargo_name",
  //   dataIndex: "cargoName",
  //   ellipsis: true,
  //   width: "100px",
  //   selectOptions: codeList.CargoName,
  //   render: (text: string, row: any, index: number) => (
  //     <div>
  //       {codeList.CargoName.filter((item) => (item.value === row.cargoName)).map((item) => (
  //         <span color="green" key={item.value}>{item.label}</span>))}
  //     </div>
  //   ),
  //   className: " text_center ",
  // })

  columns.push({align: "center",
    title: t("template.document_template_rule.biz_type"),
    key: "biz_type",
    dataIndex: "bizType",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.BizType,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.BizType.filter((item) => (item.value === row.bizType)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })
  columns.push({align: "center",
    title: t("template.document_template_rule.operation_type"),
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

  columns.push({align: "center",
    title: t("template.document_template_rule.domestic_foreign_trade_type"),
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

  columns.push({align: "center",
    title: t("common.button.operate"),
    align: "center",key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: DocumentTemplateRuleType, index: number) => (
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
          <Button size="small" icon={<DeleteFilled/>} type="link">
            {t("common.button.delete")}
          </Button>
        </Popconfirm>

      </div>
    ),
  })

  return (
    <PageContainer>
      <DocumentTemplateRuleSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                                  setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('template.document_template_rule')})}
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
            tableKey={"document_template_rule_table"}
            columns={columns}
            dataSource={documentTemplateRuleList}
            rowKey="documentTemplateRuleId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>
      <DocumentTemplateRuleEditModal
        isDocumentTemplateRuleEditModalOpen={isEditModalOpen}
        documentTemplateRuleId={currentDocumentTemplateRuleId}
        onClose={handleEditModalClose}/>
      <DocumentTemplateRuleDetailModal
        isDocumentTemplateRuleDetailModalOpen={isDetailModalOpen}
        documentTemplateRuleId={currentDocumentTemplateRuleId}
        onClose={handleDetailModalClose}/>
      <DocumentTemplateRuleEditDrawer
        isEditDrawerOpen={isEditDrawerOpen}
        documentTemplateRuleId={currentDocumentTemplateRuleId}
        onClose={handleEditDrawerClose}/>
      <DocumentTemplateRuleDetailDrawer
        isDetailDrawerOpen={isDetailDrawerOpen}
        documentTemplateRuleId={currentDocumentTemplateRuleId}
        onClose={handleDetailDrawerClose}/>

    </PageContainer>
  )
})

export default DocumentTemplateRuleTablePage;
