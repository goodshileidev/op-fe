import React, {useEffect, useState} from 'react'
import {Button, message, Popconfirm, Space, Spin, Table, TableProps} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormTemplateType} from '@/common/data_type/template/form_template'
import {Link} from 'umi'
import {deleteFormTemplate, listFormTemplate} from '@/common/service/template/form_template'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

interface IFormTemplateListProps {

  onClose: any
}

const FormTemplateList: React.FC<IFormTemplateListProps> = Observer((props) => {
  const [formTemplateList, setFormTemplateList] = useState<FormTemplateType[]>([]);
  const [currentFormTemplate, setCurrentFormTemplate] = useState<FormTemplateType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();


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

    const response = await listFormTemplate(params);
    const {records, total, size, current} = response.data;
    setFormTemplateList(records);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params))
    setCurrentConditions(conditions)
    fetchFormTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions = {}
    setCurrentConditions(conditions)
    fetchFormTemplateList(conditions);
  };

  const handleTableChange = () => {
    fetchFormTemplateList(currentConditions);
  };

  useEffect(() => {
    fetchFormTemplateList({})
  }, []);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentFormTemplate(row)
    if (row.formTemplateId) {
      deleteFormTemplate({formTemplateId: row.formTemplateId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchFormTemplateList({
            pageNo: pagination.current,
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
  //
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
        {codeList.DisplayPosition.filter((item) => (item.value === row.displayPosition)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
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
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.PublishStatus.filter((item) => (item.value === row.publishStatus)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.reminder_settings"),
    key: "reminder_settings",
    dataIndex: "reminderSettings",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.is_signature_required"),
    key: "is_signature_required",
    dataIndex: "isSignatureRequired",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.YesNo,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.YesNo.filter((item) => (item.value === row.isSignatureRequired)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.is_stamp_signature_required"),
    key: "is_stamp_signature_required",
    dataIndex: "isStampSignatureRequired",
    ellipsis: true,
    width: "100px",
    selectOptions: codeList.YesNo,
    render: (text: string, row: any, index: number) => (
      <div>
        {codeList.YesNo.filter((item) => (item.value === row.isStampSignatureRequired)).map((item) => (
          <span color="green" key={item.value}>{item.label}</span>))}
      </div>
    ),
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.submission_recipient_unit"),
    key: "submission_recipient_unit",
    dataIndex: "submissionRecipientUnit",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  columns.push({
    align: "center",
    title: t("template.form_template.variable_name_list"),
    key: "variable_name_list",
    dataIndex: "variableNameList",
    ellipsis: true,
    width: "100px",
    className: " text_center ",
  })

  {
    title: t("common.button.operate"),
      align
  :
    "center", key
  :
    'action',
      render
  :
    (text: string, row: FormTemplateType, index: number) => (
      <Space size="middle">
        <Link to={`/template/form_template/form_template_detail/${row.formTemplateId}`}>
          <Button type="primary">{t("common.button.detail")}</Button>
        </Link>
        <Link to={`/template/form_template/form_template_edit/${row.formTemplateId}`}>
          <Button type="primary" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
        </Link>
        <Popconfirm
          title={t("common.row_delete_title")}
          description={t("common.row_delete_description")}
          onConfirm={(e) => confirm(e, row)}
          onCancel={cancel}
          okText={t("common.yes")}
          cancelText={t("common.no")}
        >
          <Button icon={<DeleteFilled/>} type="link">
            {t("common.button.delete")}
          </Button>
        </Popconfirm>
      </Space>
    )
  }
)

  return (
    <div>
      <Spin spinning={loading}>
        <Table columns={columns}
               dataSource={formTemplateList}
               rowKey="formTemplateId"
               onChange={handleTableChange}/>
      </Spin>
    </div>
  )
})

export default FormTemplateList;
