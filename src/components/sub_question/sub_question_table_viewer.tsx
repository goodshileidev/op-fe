import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SubQuestionType} from '@/common/data_type/template/sub_question'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import {FormVarValueType} from "@/common/data_type/template/form_var_value";

interface ISubQuestionTableViewerProps {
  subQuestionList: SubQuestionType[]
  formVarValueList: FormVarValueType[]
}

const SubQuestionTableViewer: React.FC<ISubQuestionTableViewerProps> = ((props) => {
  const {t} = useTranslation();
  const subQuestionList = props.subQuestionList
  console.debug("SubQuestionTableViewer->subQuestionList", props.subQuestionList)

  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete subQuestionList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []

  function createMarkup(html) {
    return {__html: html};
  }

  columns.push({align: "center",
    title: t("template.sub_question.title"),
    key: "title",
    dataIndex: "title",
    className: "column-title  text_center ",
  })

  columns.push({align: "center",
    title: t("template.sub_question.html"),
    key: "html",
    dataIndex: "html",
    className: " text_center ",
    render: (text, row, index) => {
      return <div dangerouslySetInnerHTML={createMarkup(text)}/>
    }
  })

  const operateColumn = {
    title: t("common.button.operate"),
    align: "center",key: 'action',
    render: (text: string, row: SubQuestionType, index: number) => (
      <Space size="middle">
        <Popconfirm
          title={t("common.row_delete_title")}
          description={t("common.row_delete_description")}
          onConfirm={(e) => confirm(e, row, index)}
          onCancel={cancel}
          okText={t("common.yes")}
          cancelText={t("common.no")}
        >
          <Button icon={<DeleteFilled/>} type="link">
            {t("common.button.delete")}
          </Button>
        </Popconfirm>
      </Space>
    ),
  }
  // for (const idx in props.subQuestionList) {
  //   const subQuestion = props.subQuestionList[idx]
  //   for (const idx2 in props.formVarValueList) {
  //     const formVarValue = props.formVarValueList[idx2]
  //     subQuestion.html = subQuestion.html.replace("{{" + formVarValue.varName + "}}", formVarValue.varValue)
  //   }
  // }

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.sub_question')})} bordered={true}>
        <>
          <Table
            style={{
              width: "100%"
            }}
            columns={columns}
            dataSource={props.subQuestionList}
            rowKey="subQuestionId"/>
        </>
      </Card>
    </div>
  )
})

export default SubQuestionTableViewer;

