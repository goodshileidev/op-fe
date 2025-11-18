import React, {useEffect, useState} from 'react'
import {Space, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {Link} from 'umi'
import {listFormSection, deleteFormSection} from '@/common/service/form/form_section'
import FormSectionSearch from './form_section_search'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import FormSectionDetailModal from './form_section_detail_modal'
import FormSectionEditModal from './form_section_edit_modal'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";


import {FormType} from '@/common/data_type/form/form'


interface IFormSectionListProps {
    formId: string
    formData?: FormType

  formSectionList: FormSectionType[]
  showButtons?:string[]
  onSelect?: any
  onClose?: any
}

const FormSectionList: React.FC<IFormSectionListProps> = ((props) => {
  const [formSectionList, setFormSectionList] = useState<FormSectionType[]>([]);
  const [currentFormSectionId, setCurrentFormSectionId] = useState<string>('');
  const [currentFormSection, setCurrentFormSection] = useState<FormSectionType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const showButtons = props.showButtons?props.showButtons:[]
    const formId= props.formId
    const formData = props.formData

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

  const fetchFormSectionList = async (params: any = {}) => {
    setLoading(true);
    const response = await listFormSection(params);
    const list = response.data;
    setFormSectionList(list);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    console.debug("handleSearch", params)
    const conditions= JSON.parse(JSON.stringify(params))
    setCurrentConditions(conditions)
    fetchFormSectionList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {formId: props.formId, }
    setCurrentConditions(conditions)
    fetchFormSectionList(conditions);
  };

  const handleTableChange = () => {
    fetchFormSectionList(currentConditions);
  };

  useEffect(() => {
    if (props.formSectionList){
      setFormSectionList(props.formSectionList)
    } else {
      fetchFormSectionList({formId: props.formId, })
    }
  }, [props.formSectionList]);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: FormSectionType) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentFormSection(row)
    if (row.formSectionId) {
      deleteFormSection({formSectionId: row.formSectionId}).then((response: any) => {
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

  const handleShowDetail =(row: FormSectionType) => {
    console.debug("handleShowDetail", row)
    setCurrentFormSection(row)
    setCurrentFormSectionId(row.formSectionId)
    setIsDetailModalOpen(true)
  }

  const handleDetailModalClose=()=>{
    setIsDetailModalOpen(false)
  }

  const handleAdd = (params: any) => {
    console.debug("handleAdd", params)
    const newFormSection: FormSectionType = {formSectionId: '0'}
    setCurrentFormSectionId('0')
    setCurrentFormSection(newFormSection)
    setIsEditModalOpen(true)
  }

  const handleShowEdit =(row: FormSectionType) => {
    console.debug("handleShowEdit", row)
    setCurrentFormSection(row)
    setCurrentFormSectionId(row.formSectionId)
    setIsEditModalOpen(true)
  }

  const handleEditModalClose= (updated: boolean, data: FormSectionType) => {
    console.debug("handleEditModalClose", data)
    if (updated){
      handleTableChange()
    }
    setIsEditModalOpen(false)
  }

  const handleClose = () => {
    console.debug("handleClose")
    props.onClose(true)
    return true
  }

  const handleSelect = (data: FormSectionType) => {
    console.debug("handleSelect", data)
    if (props.onSelect) {
      props.onSelect(data)
    }
    return true
  }

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
      render: (text: string, row: FormSectionType, index: number) => (
        <div size="middle">
        {(showButtons.length>0&&!showButtons.includes("select"))?(<></>):(
          <Button size="small" type="link"
            onClick={() => handleSelect(row)}>{t("common.button.select")}</Button>)}
        {(showButtons.length>0&&!showButtons.includes("detail"))?(<></>):(
          <Button size="small" type="link"
            onClick={() => handleShowDetail(row)}>{t("common.button.detail")}</Button>)}
        {(showButtons.length>0&&!showButtons.includes("edit"))?(<></>):(
          <Button size="small" type="link" icon={<EditFilled/>}
            onClick={() => handleShowEdit(row)}>{t("common.button.edit")}</Button>)}
        {(showButtons.length>0&&!showButtons.includes("delete"))?(<></>):(
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
           </Popconfirm>)}

        </div>
      ),
    })

  return (
      <div>
        <Card title={t("common.title.list",{'entity':t('form.form_section')})}
            bordered={true}
            extra={[
            (showButtons.length>0&&!showButtons.includes("add"))?(<></>):
            (<Button onClick={()=>{
                handleAdd(true)
          }}>{t("common.button.add")}</Button>)]}
          >
          <Spin spinning={loading}>
            <Table columns={columns}
                   dataSource={formSectionList}
                   rowKey="formSectionId"
                   onChange={handleTableChange}/>
          </Spin>
        </Card>
        <FormSectionEditModal
formId= {props.formId} formData = {props.formData}
            isFormSectionEditModalOpen={isEditModalOpen}
            formSectionId={currentFormSectionId}
            onClose={handleEditModalClose}/>
        <FormSectionDetailModal
            isFormSectionDetailModalOpen={isDetailModalOpen}
            formSectionId={currentFormSectionId}
            onClose={handleDetailModalClose}/>

      </div>
)})

export default FormSectionList;
