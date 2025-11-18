import React, {useEffect, useState} from 'react'
import {Space, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {Link} from 'umi'
import {listFormQuestionTemplate, deleteFormQuestionTemplate} from '@/common/service/template/form_question_template'
import FormQuestionTemplateSearch from './form_question_template_search'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IFormQuestionTemplateListProps {
    formTemplateId: string
    formSectionTemplateId: string

  onClose: any
}

const FormQuestionTemplateList: React.FC<IFormQuestionTemplateListProps> = Observer((props) => {
  const [formQuestionTemplateList, setFormQuestionTemplateList] = useState<FormQuestionTemplateType[]>([]);
  const [currentFormQuestionTemplate, setCurrentFormQuestionTemplate] = useState<FormQuestionTemplateType | any>({});
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

  const fetchFormQuestionTemplateList = async (params: any = {}) => {
    setLoading(true);

    const response = await getFormQuestionTemplateList(params);
    const {records, total, size, current} = response.data;
    setFormQuestionTemplateList(records);
    setLoading(false);
  }

  const handleSearch = (params: any) => {
    const conditions= JSON.parse(JSON.stringify(params))
    setCurrentConditions(conditions)
    fetchFormQuestionTemplateList(conditions);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const conditions= {formTemplateId: props.formTemplateId, formSectionTemplateId: props.formSectionTemplateId, }
    setCurrentConditions(conditions)
    fetchFormQuestionTemplateList(conditions);
  };

  const handleTableChange = () => {
    fetchFormQuestionTemplateList(currentConditions);
  };

  useEffect(() => {
    fetchFormQuestionTemplateList({formTemplateId: props.formTemplateId, formSectionTemplateId: props.formSectionTemplateId, })
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
          });
        }
      })
    }
  };

  const cancel = (e: any) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

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
 //
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

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: FormQuestionTemplateType, index: number) => (
        <Space size="middle">
          <Link to={`/template/form_question_template/form_question_template_detail/${row.formQuestionTemplateId}`}>
            <Button type="primary">{t("common.button.detail")}</Button>
          </Link>
          <Link to={`/template/form_question_template/form_question_template_edit/${row.formQuestionTemplateId}`}>
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
        <Card title={t("common.title.list",{'entity':t('template.form_question_template')})} bordered={true}>
          <Spin spinning={loading}>
            <Table columns={columns}
                   dataSource={formQuestionTemplateList}
                   rowKey="formQuestionTemplateId"
                   onChange={handleTableChange}/>
          </Spin>
        </Card>
      </div>
    )
})

export default FormQuestionTemplateList;
