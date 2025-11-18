import React, {useEffect, useState} from 'react'
import {Space,Modal,Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {Link, useNavigate} from 'umi'
import {searchFormQuestion, deleteFormQuestion, updateFormQuestion } from '@/common/service/form/form_question'
import FormQuestionSearch from './components/form_question_search'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import {useParams} from 'umi'
import { useSearchParams, useLocation } from 'umi';
import {getPathParam} from "@/common/path_util";
import SuperTable from "@/components/common/super-table";
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";




const FormQuestionTablePage: React.FC = (() => {
  const [formQuestionList, setFormQuestionList] = useState<FormQuestionType[]>([]);
  const [currentFormQuestionId, setCurrentFormQuestionId] = useState<string>('');
  const [currentFormQuestion, setCurrentFormQuestion] = useState<FormQuestionType | any>({});
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

  const fetchFormQuestionList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current
    params.pageSize = params.pageSize || pagination.pageSize
    const response = await searchFormQuestion(params);
    const {list:records, pageInfo} = response.data;
    const { totalCount,pageNo,pageSize } = pageInfo
    setFormQuestionList(records);
    setPagination({
      current: pageNo,
      pageSize: pageSize,
      total: totalCount,
      showSizeChanger: true
    });
    setLoading(false);
  }

  const handleAdd = (params: any) => {
    navigate("/form/form_question/form_question_edit_page/0", { replace: true });
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormQuestionList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {}
    conditions['pageNo'] = 1
    conditions['pageSize'] = pagination.pageSize
    setCurrentConditions(conditions)
    fetchFormQuestionList(conditions);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormQuestionList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    fetchFormQuestionList({
      pageNo: 1,
     pageSize:pagination.pageSize,
    });
  };
  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current
    currentConditions['pageSize'] = pagination.pageSize
    fetchFormQuestionList(currentConditions);
  };


  const handleUpdateJson= (value: any, fieldName: string)=> {
     const params = {
        formQuestionId:currentFormQuestion.formQuestionId,
     }
     params[fieldName] = value
     updateFormQuestion(params).then((response:any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('form.form_question')}));
          currentFormQuestion[fieldName] = value
        }
      });
  }

  useEffect(() => {
    fetchFormQuestionList()
  }, []);

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any) => {
    console.log("PopconfirmProps['onConfirm']", e, row, "formQuestionId="+row.formQuestionId);
    setCurrentFormQuestion(row)
    if (row.formQuestionId) {
      deleteFormQuestion({formQuestionId: row.formQuestionId}).then((response: any) => {
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



 const columns: TableProps<FormQuestionType>['columns'] = []

    columns.push({align: "center",
      title: t("form.form_question.question_no"),
      key: "question_no",
      dataIndex: "questionNo",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.question_title_list"),
      key: "question_title_list",
      dataIndex: "questionTitleList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.sub_question_count"),
      key: "sub_question_count",
      dataIndex: "subQuestionCount",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.sub_question_type"),
      key: "sub_question_type",
      dataIndex: "subQuestionType",
      ellipsis: true,
      width: "100px",
      selectOptions:codeList.SubQuestionType,
      render:(text:string, row:any, index: number ) => (
        <div>
         {codeList.SubQuestionType.filter((item) => (item.value===row.subQuestionType)).map((item) => (<span color="green" key={item.value}>{item.label}</span>))}
        </div>
 ),
       className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.input_control_type"),
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
      title: t("form.form_question.variable_name_list"),
      key: "variable_name_list",
      dataIndex: "variableNameList",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.remark"),
      key: "remark",
      dataIndex: "remark",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.input_by"),
      key: "input_by",
      dataIndex: "inputBy",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

    columns.push({align: "center",
      title: t("form.form_question.input_time"),
      key: "input_time",
      dataIndex: "inputTime",
      ellipsis: true,
      width: "100px",
      className:" text_center ",
    })

 //    columns.push({align: "center",
 //      title: t("form.form_question.operation_mode"),
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
      title: t("form.form_question.is_photo_evidence_required"),
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
      title: t("form.form_question.is_signature_evidence_required"),
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
      render: (text: string, row: FormQuestionType, index: number) => (
        <div>
          <Link to={`/form/form_question/form_question_detail_page/${row.formQuestionId}`}>
            <Button size="small" type="link">{t("common.button.detail")}</Button>
          </Link>
          {/*<Link to={`/form/form_question/form_question_edit_page/${row.formQuestionId}`}>*/}
          {/*  <Button size="small" type="link" icon={<EditFilled/>}>{t("common.button.edit")}</Button>*/}
          {/*</Link>*/}

          {/*<Popconfirm*/}
          {/*      title={t("common.row_delete_title")}*/}
          {/*      description={t("common.row_delete_description")}*/}
          {/*      onConfirm={(e)=>confirm(e, row)}*/}
          {/*      onCancel={cancel}*/}
          {/*      okText={t("common.yes")}*/}
          {/*      cancelText={t("common.no")}*/}
          {/*    >*/}
          {/*    <Button size="small" icon={<DeleteFilled/>}  type="link">*/}
          {/*      {t("common.button.delete")}*/}
          {/*    </Button>*/}
          {/* </Popconfirm>*/}

        </div>
      ),
    })

  return (
      <div style={{
          display: 'grid',
          padding: '24px',

        }}>
        <FormQuestionSearch onAdd={handleAdd} onReloadTable={handleSearch} pagination={pagination} setCurrentConditions={setCurrentConditions}/>
        <Card title={t("common.title.list",{'entity':t('form.form_question')})}
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
              tableKey={"form_question_table"}
              columns={columns}
              dataSource={formQuestionList}
              rowKey="formQuestionId"
              pagination={pagination}
              onChange={handleTableChange}/>
          </Spin>
        </Card>


     </div>
   )
})

export default FormQuestionTablePage;
