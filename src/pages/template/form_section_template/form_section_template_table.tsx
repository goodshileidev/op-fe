import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {Link} from 'umi'
import {searchFormSectionTemplate, deleteFormSectionTemplate, updateFormSectionTemplate} from '@/common/service/template/form_section_template'
import FormSectionTemplateDetailModal from './components/form_section_template_detail_modal'
import FormSectionTemplateEditModal from './components/form_section_template_edit_modal'
import FormSectionTemplateDetailDrawer from './components/form_section_template_detail_drawer'
import FormSectionTemplateEditDrawer from './components/form_section_template_edit_drawer'

import FormSectionTemplateSearch from './components/form_section_template_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";



const FormSectionTemplateTablePage: React.FC = (() => {
  const [formSectionTemplateList, setFormSectionTemplateList] = useState<FormSectionTemplateType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentFormSectionTemplateId, setCurrentFormSectionTemplateId] = useState('');
  const [currentConditions, setCurrentConditions] = useState({});
  const [currentFormSectionTemplate, setCurrentFormSectionTemplate] = useState<FormSectionTemplateType | any>({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
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

  const fetchFormSectionTemplateList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchFormSectionTemplate(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setFormSectionTemplateList(records);
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
    const newFormSectionTemplate: FormSectionTemplateType = {}
    let isEditModalOpen = true;
    setCurrentFormSectionTemplate(newFormSectionTemplate)
    setCurrentFormSectionTemplateId('0')
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormSectionTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormSectionTemplateList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormSectionTemplateList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormSectionTemplateList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormSectionTemplateList(currentConditions);
  };
  const handleShowDetail =(row: FormSectionTemplateType) => {
    setCurrentFormSectionTemplate(row)
    setCurrentFormSectionTemplateId(row.formSectionTemplateId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose=()=>{
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose=()=>{
    setIsDetailDrawerOpen(false)
  }

  const handleShowAdd =() => {
    const newFormSectionTemplate: FormSectionTemplateType ={
    }
    setCurrentFormSectionTemplate(newFormSectionTemplate)
    // setCurrentFormSectionTemplateId(row.formSectionTemplateId)
    setIsEditModalOpen(true)
  }

  const handleShowEdit =(row: FormSectionTemplateType) => {
    setCurrentFormSectionTemplate(row)
    setCurrentFormSectionTemplateId(row.formSectionTemplateId)
    setIsEditModalOpen(true)
    setIsEditDrawerOpen(true)
  }
  const handleEditModalClose= (updated: boolean) => {
    setIsEditModalOpen(false)
    if (updated){
      handleTableChange(pagination)
    }
  }
  const handleEditDrawerClose= (updated: boolean) => {
    setIsEditDrawerOpen(false)
    if (updated){
      handleTableChange(pagination)
    }
  }

  const handleUpdateJson= (value: any, fieldName: string)=> {
     const params = {
        formSectionTemplateId:currentFormSectionTemplate.formSectionTemplateId,
     }
     params[fieldName] = value
     updateFormSectionTemplate(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('template.form_section_template')}));
          currentFormSectionTemplate[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchFormSectionTemplateList()
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
           pageSize:pagination.pageSize
          });
        }
      })
    }
  };


  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const detail_show_type='modal'
  const edit_show_type='modal'
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

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      render: (text: string, row: FormSectionTemplateType, index: number) => (
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
        <FormSectionTemplateSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('template.form_section_template')})}
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
              tableKey={"form_section_template"}
              columns={columns}
              dataSource={formSectionTemplateList}
              rowKey="formSectionTemplateId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <FormSectionTemplateEditModal
            isFormSectionTemplateEditModalOpen={isEditModalOpen}
            formSectionTemplateId={currentFormSectionTemplateId}
            onClose={handleEditModalClose}/>
        <FormSectionTemplateDetailModal
            isFormSectionTemplateDetailModalOpen={isDetailModalOpen}
            formSectionTemplateId={currentFormSectionTemplateId}
            onClose={handleDetailModalClose}/>
        <FormSectionTemplateEditDrawer
            isFormSectionTemplateEditDrawerOpen={isEditDrawerOpen}
            formSectionTemplateId={currentFormSectionTemplateId}
            onClose={handleEditDrawerClose}/>
        <FormSectionTemplateDetailDrawer
            isFormSectionTemplateDetailDrawerOpen={isDetailDrawerOpen}
            formSectionTemplateId={currentFormSectionTemplateId}
            onClose={handleDetailDrawerClose}/>

     </div>
   )
})

export default FormSectionTemplateTablePage;
