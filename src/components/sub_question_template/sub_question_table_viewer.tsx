import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {SubQuestionType} from '@/common/data_type/template/sub_question'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import {codeList} from "@/common/code_list/code_list_static";

interface ISubQuestionTableViewerProps {
  subQuestionList: SubQuestionType[]
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

  columns.push({align: "center",
    title: t("template.sub_question.cargo_name_list"),
    key: "cargo_name_list",
    dataIndex: "cargoNameList",
    className: " text_center ",
    render: (text, row, index) => {
      return <>  {codeList.CargoName
        .filter((item: any) => (row && row.cargoNameList && row.cargoNameList.includes(item.value)))
        .map((item: any) => (<span color="green" key={item.value}>{item.label}&nbsp;</span>))}</>
    }
  })


  columns.push({align: "center",
    title: t("template.sub_question.operation_type"),
    key: "operation_type",
    dataIndex: "operationType",
    className: " text_center ",
    render: (text, row, index) => {
      return <div dangerouslySetInnerHTML={createMarkup(text)}/>
    }
  })


  columns.push({align: "center",
    title: t("template.sub_question.domestic_foreign_trade_type"),
    key: "domestic_foreign_trade_type",
    dataIndex: "domesticForeignTradeType",
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

