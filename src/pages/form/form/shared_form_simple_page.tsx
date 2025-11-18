import React, {useEffect, useState} from 'react'
import {Table, TableProps} from 'antd'
import {FormType} from '@/common/data_type/form/form'
import {searchForm} from '@/common/service/form/form'
import {useTranslation} from 'react-i18next';
import {SubQuestionType} from "@/common/data_type/template/sub_question";
import {useNavigate, useParams} from "umi";

const SharedFormTablePage: React.FC = (() => {
  const {sharedFormUuidList} = useParams<{ sharedFormUuidList: string | any }>()
  const sharedFormUuidArr = sharedFormUuidList.split(",")
  console.debug("sharedFormUuidList", sharedFormUuidList, sharedFormUuidArr)
  const [formList, setFormList] = useState<FormType[]>([]);
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  const navigate = useNavigate();

  const fetchFormList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = 1
    params.pageSize = 10000
    params.formUuidInCondition = sharedFormUuidArr
    const response = await searchForm(params);
    const {list: records, pageInfo} = response.data;
    const {totalCount, pageNo, pageSize} = pageInfo
    setLoading(false);
    setFormList(records);
  }

  useEffect(() => {
    fetchFormList()
  }, []);


  const columns: TableProps<FormType>['columns'] = []

//   columns.push({
//     align: "center",
//     title: t("form.form.form_no"),
//     key: "form_no",
//     dataIndex: "formNo",
//     ellipsis: true,
//     width: "300px",
//     className: " text_left ",
//   })

  columns.push({
    align: "center",
    title: t("form.form.form_name"),
    key: "form_name",
    dataIndex: "formName",
    ellipsis: true,
    width: "200px",
    className: " text_center ",
    render: (text: string, row: SubQuestionType, index: number) => (
      <div style={{
        textAlign: "left"
      }}>
        <a href={location.protocol + "//" + location.host + location.pathname + "#/printForm/" + row.formId}
           target={"_blank"}>
          {text}
        </a>
      </div>
    )
  })

  return (
    <Table
      style={{
        width: "100%",
        padding: 0,
        margin: 0
      }}
      tableKey={"form_table"}
      columns={columns}
      dataSource={formList}
      pagination={false}
      rowKey="formId"
    />
  )
})

export default SharedFormTablePage;
