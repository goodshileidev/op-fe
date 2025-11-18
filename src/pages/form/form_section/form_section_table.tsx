import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {Link, useNavigate} from 'umi'
import {searchFormSection, deleteFormSection, updateFormSection } from '@/common/service/form/form_section'
import FormSectionSearch from './components/form_section_search'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import {useParams} from 'umi'
import { useSearchParams, useLocation } from 'umi';
import {getPathParam} from "@/common/path_util";
import SuperTable from "@/components/common/super-table";
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";




const FormSectionTablePage: React.FC = (() => {
  const [formSectionList, setFormSectionList] = useState<FormSectionType[]>([]);
  const [currentFormSectionId, setCurrentFormSectionId] = useState<string>('');
  const [currentFormSection, setCurrentFormSection] = useState<FormSectionType | any>({});
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState({});
  const { t } = useTranslation();
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
    pageSizeOptions:[10, 50, 100]
  });

  const fetchFormSectionList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchFormSection(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setFormSectionList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/form/form_section/form_section_edit_page/0", { replace: true });
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormSectionList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormSectionList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormSectionList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormSectionList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormSectionList(currentConditions);
  };


  const handleUpdateJson= (value: any, fieldName: string)=> {
     const params = {
        formSectionId:currentFormSection.formSectionId,
     }
     params[fieldName] = value
     updateFormSection(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('form.form_section')}));
          currentFormSection[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchFormSectionList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "formSectionId="+row.formSectionId);
    setCurrentFormSection(row)
    if (row.formSectionId) {
      deleteFormSection({formSectionId: row.formSectionId}).then((response: any) => {
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



 const columns: TableProps<FormSectionType>['columns'] = []

    columns.push({align: "center",
      title: t("form.form_section.form_id"),
      key: "form_id",
      dataIndex: "formId",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.section_no"),
      key: "section_no",
      dataIndex: "sectionNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.section_name"),
      key: "section_name",
      dataIndex: "sectionName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.main_sub_section_type"),
      key: "main_sub_section_type",
      dataIndex: "mainSubSectionType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.MainSubSectionType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.MainSubSectionType.filter((item) => (item.value===row.mainSubSectionType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.section_type"),
      key: "section_type",
      dataIndex: "sectionType",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.content_type"),
      key: "content_type",
      dataIndex: "contentType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.ContentType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.ContentType.filter((item) => (item.value===row.contentType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.current_step"),
      key: "current_step",
      dataIndex: "currentStep",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.fillin_status"),
      key: "fillin_status",
      dataIndex: "fillinStatus",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.FillinStatus,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.FillinStatus.filter((item) => (item.value===row.fillinStatus)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.total_column_count"),
      key: "total_column_count",
      dataIndex: "totalColumnCount",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_section.variable_name_list"),
      key: "variable_name_list",
      dataIndex: "variableNameList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      fixed: 'right',
      render: (text: string, row: FormSectionType, index: number) => (
        <div>
          <Link to={`/form/form_section/form_section_detail_page/${row.formSectionId}`}>
            <Button size="small" type="link">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/form/form_section/form_section_edit_page/${row.formSectionId}`}>
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
          display: 'grid',
          padding: '24px',

        }}>
        <FormSectionSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('form.form_section')})}
          bordered={true}
          style={{

          }}
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
              tableKey={"form_section_table"}
              columns={columns}
              dataSource={formSectionList}
              rowKey="formSectionId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>


     </div>
   )
})

export default FormSectionTablePage;
