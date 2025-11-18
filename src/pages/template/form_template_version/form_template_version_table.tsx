import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormTemplateVersionType} from '@/common/data_type/template/form_template_version'
import {Link, useNavigate} from 'umi'
import {searchFormTemplateVersion, deleteFormTemplateVersion, updateFormTemplateVersion } from '@/common/service/template/form_template_version'
import FormTemplateVersionSearch from './components/form_template_version_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const FormTemplateVersionTablePage: React.FC = (() => {
  const [formTemplateVersionList, setFormTemplateVersionList] = useState<FormTemplateVersionType[]>([]);
  const [currentFormTemplateVersion, setCurrentFormTemplateVersion] = useState<FormTemplateVersionType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);





  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions:[10, 50, 100]
  });

  const fetchFormTemplateVersionList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchFormTemplateVersion(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setFormTemplateVersionList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }
  const handleAdd = (params: any) => {
    navigate("/template/form_template_version/form_template_version_edit/0", { replace: true });
  }
  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormTemplateVersionList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormTemplateVersionList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormTemplateVersionList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormTemplateVersionList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormTemplateVersionList(currentConditions);
  };


  const handleUpdateJson= (value: any, fieldName: string)=> {
     const params = {
        formTemplateVersionId:currentFormTemplateVersion.formTemplateVersionId,
     }
     params[fieldName] = value
     updateFormTemplateVersion(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('template.form_template_version')}));
          currentFormTemplateVersion[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchFormTemplateVersionList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "formTemplateVersionId="+row.formTemplateVersionId);
    setCurrentFormTemplateVersion(row)
    if (row.formTemplateVersionId) {
      deleteFormTemplateVersion({formTemplateVersionId: row.formTemplateVersionId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          handleSearch({
            pageNo: pagination.current,
            pageSize:pagination.pageSize
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

 const columns: TableProps<FormTemplateVersionType>['columns'] = []

    columns.push({align: "center",
      title: t("template.form_template_version.version_no"),
      key: "version_no",
      dataIndex: "versionNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.publish_time"),
      key: "publish_time",
      dataIndex: "publishTime",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.form_name"),
      key: "form_name",
      dataIndex: "formName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.form_no"),
      key: "form_no",
      dataIndex: "formNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.recipient_list"),
      key: "recipient_list",
      dataIndex: "recipientList",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.RecipientList,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.RecipientList.filter((item) => (item.value===row.recipientList)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.operation_mode"),
      key: "operation_mode",
      dataIndex: "operationMode",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.OperationMode,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.OperationMode.filter((item) => (item.value===row.operationMode)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.is_signature_required"),
      key: "is_signature_required",
      dataIndex: "isSignatureRequired",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.YesNo,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.YesNo.filter((item) => (item.value===row.isSignatureRequired)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.is_stamp_signature_required"),
      key: "is_stamp_signature_required",
      dataIndex: "isStampSignatureRequired",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.YesNo,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.YesNo.filter((item) => (item.value===row.isStampSignatureRequired)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.submission_recipient_unit"),
      key: "submission_recipient_unit",
      dataIndex: "submissionRecipientUnit",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_template_version.variable_name_list"),
      key: "variable_name_list",
      dataIndex: "variableNameList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      width: '250px',
      align: "center",key: 'action',
      render: (text: string, row: FormTemplateVersionType, index: number) => (
        <div>
          <Link to={`/template/form_template_version/form_template_version_detail/${row.formTemplateVersionId}`}>
            <Button size="small" type="link">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/template/form_template_version/form_template_version_edit/${row.formTemplateVersionId}`}>
            <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
          </Link>
          <Popconfirm
                title={t("common.row_delete_title")}
                description={t("common.row_delete_description")}
                onConfirm={(e)=>confirm(e, row)}
                onCancel={cancel}
                okText={t("common.yes")}
                cancelText={t("common.no")}
              >
              <Button size="small" icon={<DeleteFilled/>}  type="link">
                {t("common.button.delete")}
              </Button>
           </Popconfirm>
        </div>
      ),
    })

  return (
      <div style={{
          'display': 'grid',

        }}>
        <FormTemplateVersionSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('template.form_template_version')})}
          bordered={true}
          extra={[<Button onClick={()=>{
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
              tableKey={"form_template_version"}
              columns={columns}
              dataSource={formTemplateVersionList}
              rowKey="formTemplateVersionId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>

     </div>
   )
})

export default FormTemplateVersionTablePage;
