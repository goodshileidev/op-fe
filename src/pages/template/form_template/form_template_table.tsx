import React, {useEffect, useState} from 'react'
import {Button, Card, message, Modal, Popconfirm, Spin, TableProps} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormTemplateType} from '@/common/data_type/template/form_template'
import {Link, useLocation, useNavigate, useSearchParams} from 'umi'
import {deleteFormTemplate, searchFormTemplate, updateFormTemplate} from '@/common/service/template/form_template'
import FormTemplateSearch from './components/form_template_search'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import Preview from '@/pages/preview/preview'
import {PageContainer} from "@ant-design/pro-components";


const FormTemplateTablePage: React.FC = (() => {
  const [formTemplateList, setFormTemplateList] = useState<FormTemplateType[]>([]);
  const [currentFormTemplateId, setCurrentFormTemplateId] = useState<string>('');
  const [currentFormTemplate, setCurrentFormTemplate] = useState<FormTemplateType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const {t} = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);


  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchFormTemplateList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchFormTemplate(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setFormTemplateList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/template/form_template/form_template_edit_page/0", {replace: true});
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormTemplateList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormTemplateList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormTemplateList({
      pageNo: 1,
      pageSize: pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormTemplateList(currentConditions);
  };


  const handleUpdateJson = (value: any, fieldName: string) => {
    const params = {
      formTemplateId: currentFormTemplate.formTemplateId,
    }
    params[fieldName] = value
    updateFormTemplate(params).then((response: any) => {
      const {code, msg} = response;
      if (code === 200) {
        message.success(t("common.save_success", {'entity': t('template.form_template')}));
        currentFormTemplate[fieldName] = value
      }
    });
  }

  useEffect(() => {
    fetchFormTemplateList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "formTemplateId=" + row.formTemplateId);
    setCurrentFormTemplate(row)
    if (row.formTemplateId) {
      deleteFormTemplate({formTemplateId: row.formTemplateId}).then((response: any) => {
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


  const columns: TableProps<FormTemplateType>['columns'] = []

  columns.push({
    align: "center",
    title: t("template.form_template.form_template_name"),
    key: "form_template_name",
    dataIndex: "formTemplateName",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.form_template_no"),
    key: "form_template_no",
    dataIndex: "formTemplateNo",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  //    columns.push({align: "center",
  //      title: t("template.form_template.operation_mode"),
  //      key: "operation_mode",
  //      dataIndex: "operationMode",
  //      ellipsis: true,
  //      width: "100px",
  //      selectOptions:codeList.OperationMode,
  //      render:(text:string, row:any, index: number ) => (
  //        <div>
  //         {codeList.OperationMode.filter((item) => (item.value===row.operationMode)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
  //        </div>
  // ),
  //       className:" text_center ",
  //    })

  columns.push({
    align: "center",
    title: t("template.form_template.display_position"),
    key: "display_position",
    dataIndex: "displayPosition",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.DisplayPosition,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.DisplayPosition.filter((item) => (row.displayPosition && row.displayPosition.includes(item.value))).map((item) => (<>
          <span color="green" key={item.value}>{item.label}</span><br/></>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.publish_status"),
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
  //
  // columns.push({align: "center",
  //   title: t("template.form_template.is_signature_required"),
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
  //   title: t("template.form_template.is_stamp_signature_required"),
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
  //   title: t("template.form_template.variable_name_list"),
  //   key: "variable_name_list",
  //   dataIndex: "variableNameList",
  //   ellipsis: true,
  //   width: "100px",
  //   className: " text_center ",
  // })

  function handleCreateTestForm(row: FormTemplateType) {
    console.debug("handleCreateTestForm", row)
  }

  const showPreviewModal = (obj: { row: FormTemplateType }) => {
    setCurrentFormTemplateId(obj.row.formTemplateId);
    setIsPreviewOpen(true);
  }

  const closePreviewModal = () => {
    setIsPreviewOpen(false);
  }

  columns.push({
    align: "center",
    title: t("common.button.operate"),
    align: "center", key: 'action',
    width: '250px',
    fixed: 'right',
    render: (text: string, row: FormTemplateType, index: number) => (
      <div>
        <Button size="small" type="link" onClick={() => showPreviewModal({row})}>{t("common.button.preview")}</Button>
        <Link to={`/template/form_template/form_template_detail_page/${row.formTemplateId}`}>
          <Button size="small" type="link">{t("common.button.detail")}</Button>
        </Link>
        <Link to={`/template/form_template/form_template_edit_page/${row.formTemplateId}`}>
          <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
        </Link>
        {!row.publishStatus || row.publishStatus === "1" ? <>
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
        </> : <></>}
        {/*<Button htmlType="button"*/}
        {/*        type={"primary"}*/}
        {/*        onClick={() => {*/}
        {/*          handleCreateTestForm(row)*/}
        {/*        }}*/}
        {/*        style={{marginLeft: 8, width: '100%'}}>*/}
        {/*  {t("common.button.edit_type", {"entity": "区块"})}*/}
        {/*</Button>*/}

      </div>
    ),
  })

  return (
    <PageContainer>
      <FormTemplateSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination}
                          setCurrentConditions={setCurrentConditions}/>
      <Card title={t("common.title.list", {'entity': t('template.form_template')})}
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
            tableKey={"form_template_table"}
            columns={columns}
            dataSource={formTemplateList}
            rowKey="formTemplateId"
            pagination={pagination}
            onChange={handleTableChange}/>
        </Spin>
      </Card>

      <Modal title="预览" width={400} height={750} open={isPreviewOpen} forceRender={true} mask={true} footer={null}
             onCancel={closePreviewModal} onClose={closePreviewModal} onOk={closePreviewModal}>
        <Preview formTemplateId={currentFormTemplateId}></Preview>
      </Modal>
    </PageContainer>
  )
})

export default FormTemplateTablePage;
