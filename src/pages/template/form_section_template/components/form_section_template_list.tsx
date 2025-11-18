import React, {useEffect, useState} from 'react'
import {Space, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {Link} from 'umi'
import {listFormSectionTemplate, deleteFormSectionTemplate} from '@/common/service/template/form_section_template'
import FormSectionTemplateSearch from './form_section_template_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IFormSectionTemplateListProps {
    formTemplateId: string

  onClose: any
}

const FormSectionTemplateList: React.FC<IFormSectionTemplateListProps> = Observer((props) => {
  const [formSectionTemplateList, setFormSectionTemplateList] = useState<FormSectionTemplateType[]>([]);
  const [currentFormSectionTemplate, setCurrentFormSectionTemplate] = useState<FormSectionTemplateType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();



  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions:[10, 50, 100]
  });

  const fetchFormSectionTemplateList = async (params: any = {}) => {
    setLoading(true);

    const response = await getFormSectionTemplateList(params);
    const {records, total, size, current} = response.data;
    setFormSectionTemplateList(records);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    setCurrentConditions(conditions)
    fetchFormSectionTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {formTemplateId: props.formTemplateId, }
    setCurrentConditions(conditions)
    fetchFormSectionTemplateList(conditions);
  };

  const handleTableChange = () => {
    fetchFormSectionTemplateList(currentConditions);
  };

  useEffect(() => {
    fetchFormSectionTemplateList({formTemplateId: props.formTemplateId, })
  }, []);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentFormSectionTemplate(row)
    if (row.formSectionTemplateId) {
      deleteFormSectionTemplate({formSectionTemplateId: row.formSectionTemplateId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchFormSectionTemplateList({
            pageNo: pagination.current,
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

 const columns: TableProps<FormSectionTemplateType>['columns'] = []

    columns.push({align: "center",
      title: t("template.form_section_template.section_no"),
      key: "section_no",
      dataIndex: "sectionNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_section_template.section_name"),
      key: "section_name",
      dataIndex: "sectionName",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_section_template.main_sub_section_type"),
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
      title: t("template.form_section_template.section_type"),
      key: "section_type",
      dataIndex: "sectionType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.SectionType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.SectionType.filter((item) => (item.value===row.sectionType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_section_template.sub_section_type"),
      key: "sub_section_type",
      dataIndex: "subSectionType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.SubSectionType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.SubSectionType.filter((item) => (item.value===row.subSectionType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_section_template.summary"),
      key: "summary",
      dataIndex: "summary",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_section_template.total_column_count"),
      key: "total_column_count",
      dataIndex: "totalColumnCount",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_section_template.variable_name_list"),
      key: "variable_name_list",
      dataIndex: "variableNameList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: FormSectionTemplateType, index: number) => (
        <Space size="middle">
          <Link to={`/template/form_section_template/form_section_template_detail/${row.formSectionTemplateId}`}>
            <Button type="primary">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/template/form_section_template/form_section_template_edit/${row.formSectionTemplateId}`}>
            <Button type="primary" icon={<EditFilled/>}>{t("common.button.edit")}</Button>
          </Link>
          <Popconfirm
                title={t("common.row_delete_title")}
                description={t("common.row_delete_description")}
                onConfirm={(e)=>confirm(e, row)}
                onCancel={cancel}
                okText={t("common.yes")}
                cancelText={t("common.no")}
              >
              <Button icon={<DeleteFilled/>}  type="link">
                {t("common.button.delete")}
              </Button>
           </Popconfirm>
        </Space>
      )
    })

  return (
      <div>
        <Card title={t("common.title.list",{'entity':t('template.form_section_template')})} bordered={true}>
          <Spin spinning={loading}>
            <Table columns={columns}
                   dataSource={formSectionTemplateList}
                   rowKey="formSectionTemplateId"
                   onChange={handleTableChange}/>
          </Spin>
        </Card>
      </div>
    )
})

export default FormSectionTemplateList;
