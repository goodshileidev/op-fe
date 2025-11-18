import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {Link} from 'umi'
import {searchFormQuestionTemplate, deleteFormQuestionTemplate, updateFormQuestionTemplate} from '@/common/service/template/form_question_template'
import FormQuestionTemplateDetailModal from './components/form_question_template_detail_modal'
import FormQuestionTemplateEditModal from './components/form_question_template_edit_modal'
import FormQuestionTemplateDetailDrawer from './components/form_question_template_detail_drawer'
import FormQuestionTemplateEditDrawer from './components/form_question_template_edit_drawer'

import FormQuestionTemplateSearch from './components/form_question_template_search'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import {useParams} from 'umi'
import {useSearchParams, useLocation } from 'umi';
import {getPathParam} from "@/common/path_util";
import SuperTable from "@/components/common/super-table";
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";





const FormQuestionTemplateTablePage: React.FC = (() => {
  const [formQuestionTemplateList, setFormQuestionTemplateList] = useState<FormQuestionTemplateType[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [currentFormQuestionTemplateId, setCurrentFormQuestionTemplateId] = useState('');
  const [currentFormQuestionTemplate, setCurrentFormQuestionTemplate] = useState<FormQuestionTemplateType | any>({});
  const [currentConditions, setCurrentConditions] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
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

  const fetchFormQuestionTemplateList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchFormQuestionTemplate(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setFormQuestionTemplateList(records);
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
    const newFormQuestionTemplate: FormQuestionTemplateType = {formQuestionTemplateId: '0'}
    setCurrentFormQuestionTemplateId('0')
    setCurrentFormQuestionTemplate(newFormQuestionTemplate)
    setIsEditModalOpen(true)
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormQuestionTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormQuestionTemplateList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormQuestionTemplateList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormQuestionTemplateList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormQuestionTemplateList(currentConditions);
  };
  const handleShowDetail =(row: FormQuestionTemplateType) => {
    setCurrentFormQuestionTemplate(row)
    setCurrentFormQuestionTemplateId(row.formQuestionTemplateId)
    setIsDetailModalOpen(true)
    setIsDetailDrawerOpen(true)
  }
  const handleDetailModalClose=()=>{
    setIsDetailModalOpen(false)
  }
  const handleDetailDrawerClose=()=>{
    setIsDetailDrawerOpen(false)
  }

  const handleShowEdit =(row: FormQuestionTemplateType) => {
    setCurrentFormQuestionTemplate(row)
    setCurrentFormQuestionTemplateId(row.formQuestionTemplateId)
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
        formQuestionTemplateId:currentFormQuestionTemplate.formQuestionTemplateId,
     }
     params[fieldName] = value
     updateFormQuestionTemplate(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('template.form_question_template')}));
          currentFormQuestionTemplate[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchFormQuestionTemplateList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row);
    setCurrentFormQuestionTemplate(row)
    if (row.formQuestionTemplateId) {
      deleteFormQuestionTemplate({formQuestionTemplateId: row.formQuestionTemplateId}).then((response: any) => {
        const {code} = response;
        if (code === 200) {
          message.success(t("common.delete_success"));
          // 成功删除后重新获取用户列表
          fetchFormQuestionTemplateList({
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

  const columns: TableProps<FormQuestionTemplateType>['columns'] = []

    columns.push({align: "center",
      title: t("template.form_question_template.question_no"),
      key: "question_no",
      dataIndex: "questionNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_question_template.question_title_list"),
      key: "question_title_list",
      dataIndex: "questionTitleList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_question_template.sub_question_count"),
      key: "sub_question_count",
      dataIndex: "subQuestionCount",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_question_template.sub_question_type"),
      key: "sub_question_type",
      dataIndex: "subQuestionType",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_question_template.input_control_type"),
      key: "input_control_type",
      dataIndex: "inputControlType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.InputControlType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.InputControlType.filter((item) => (item.value===row.inputControlType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_question_template.variable_name_list"),
      key: "variable_name_list",
      dataIndex: "variableNameList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

 //    columns.push({align: "center",
 //      title: t("template.form_question_template.operation_mode"),
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

    columns.push({align: "center",
      title: t("template.form_question_template.is_photo_evidence_required"),
      key: "is_photo_evidence_required",
      dataIndex: "isPhotoEvidenceRequired",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.YesNo,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.YesNo.filter((item) => (item.value===row.isPhotoEvidenceRequired)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("template.form_question_template.is_signature_evidence_required"),
      key: "is_signature_evidence_required",
      dataIndex: "isSignatureEvidenceRequired",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.YesNo,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.YesNo.filter((item) => (item.value===row.isSignatureEvidenceRequired)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

  columns.push({align: "center",
      title: t("common.button.operate"),
      align: "center",key: 'action',
      width: '250px',
      fixed: 'right',
      render: (text: string, row: FormQuestionTemplateType, index: number) => (
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
          display: 'grid',
          padding: '24px',

        }}>
        <FormQuestionTemplateSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('template.form_question_template')})}
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
              tableKey={"form_question_template_table"}
              columns={columns}
              dataSource={formQuestionTemplateList}
              rowKey="formQuestionTemplateId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>
        <FormQuestionTemplateEditModal
            isFormQuestionTemplateEditModalOpen={isEditModalOpen}
            formQuestionTemplateId={currentFormQuestionTemplateId}
            onClose={handleEditModalClose}/>
        <FormQuestionTemplateDetailModal
            isFormQuestionTemplateDetailModalOpen={isDetailModalOpen}
            formQuestionTemplateId={currentFormQuestionTemplateId}
            onClose={handleDetailModalClose}/>
        <FormQuestionTemplateEditDrawer
            isEditDrawerOpen={isEditDrawerOpen}
            formQuestionTemplateId={currentFormQuestionTemplateId}
            onClose={handleEditDrawerClose}/>
        <FormQuestionTemplateDetailDrawer
            isDetailDrawerOpen={isDetailDrawerOpen}
            formQuestionTemplateId={currentFormQuestionTemplateId}
            onClose={handleDetailDrawerClose}/>


     </div>
   )
})

export default FormQuestionTemplateTablePage;
