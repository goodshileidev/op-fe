import React, {useEffect, useState} from 'react'
import {Card, Spin, TableProps} from 'antd'
import {FormType} from '@/common/data_type/form/form'
import {searchForm} from '@/common/service/form/form'
import {useTranslation} from 'react-i18next';
import SuperTable from "@/components/common/super-table";
import {PageContainer} from "@ant-design/pro-components";
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
  })

  columns.push({
    align: "left",
    title: "访问地址",
    key: "access_link",
    dataIndex: "access_link",
    width: "400px",
    render: (text: string, row: SubQuestionType, index: number) => (
      <a href={location.protocol + "//" + location.host + location.pathname + "#/viewForm/" + row.formUuid}
         target={"_blank"}>
        {location.protocol}//{location.host + location.pathname} #/viewForm/{row.formUuid}
      </a>)
  })

  return (
    <PageContainer>
      <Card title={t("common.title.list", {'entity': t('form.form')})}
            bordered={true}
            style={{}}
      >
        <Spin spinning={loading}>
          <SuperTable
            style={{
              width: "100%"
            }}
            tableKey={"form_table"}
            columns={columns}
            dataSource={formList}
            pagination={false}
            rowKey="formId"
          />
        </Spin>
      </Card>
    </PageContainer>
  )
})

export default SharedFormTablePage;
