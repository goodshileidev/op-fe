import React from 'react'
import {Button, Card, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {TableColumnConfigType} from '@/common/data_type/template/table_column_config'
import {renderCodeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ITableColumnConfigTableViewerProps {
  tableColumnConfigList: TableColumnConfigType[]
}

const TableColumnConfigTableViewer: React.FC<ITableColumnConfigTableViewerProps> = ((props) => {
  const {t} = useTranslation();
  const tableColumnConfigList = props.tableColumnConfigList
  console.debug("TableColumnConfigTableViewer->tableColumnConfigList", props.tableColumnConfigList)


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete tableColumnConfigList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = []


  columns.push({align: "center",
    title: t("template.table_column_config.column_title"),
    key: "column_title",
    dataIndex: "columnTitle",
    className: " text_center ",
  })

  // columns.push({align: "center",
  //   title: t("template.table_column_config.column_key"),
  //   key: "column_key",
  //   dataIndex: "columnKey",
  //   className: " text_center ",
  // })
  //
  // columns.push({align: "center",
  //   title: t("template.table_column_config.column_span"),
  //   key: "column_span",
  //   dataIndex: "columnSpan",
  //   className: " text_center ",
  // })

  columns.push({align: "center",
    title: t("template.table_column_config.sub_question_type"),
    key: "sub_question_type",
    dataIndex: "subQuestionType",
    render: (index, row) => (
      <span>
          {renderCodeList(row.subQuestionType, 'SubQuestionType')}
         </span>
    ),
    className: " text_center ",
  })
  const operateColumn = {
    title: t("common.button.operate"),
    align: "center",key: 'action',
    render: (text: string, row: TableColumnConfigType, index: number) => (
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
      <Card title={t("common.title.list", {'entity': t('template.table_column_config')})} bordered={true}>
        <>
          <Table
            style={{
              width: "100%"
            }}
            columns={columns}
            dataSource={props.tableColumnConfigList}
            rowKey="tableColumnConfigId"/>
        </>
      </Card>
    </div>
  )
})

export default TableColumnConfigTableViewer;

