import React from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {TableColumnConfigType} from '@/common/data_type/template/table_column_config'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ITableColumnConfigTableEditorProps {
  tableColumnConfigList: TableColumnConfigType[]
  onUpdate: any
}

const TableColumnConfigTableEditor: React.FC<ITableColumnConfigTableEditorProps> = ((props) => {
  const {t} = useTranslation();
  const tableColumnConfigList = props.tableColumnConfigList


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete tableColumnConfigList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = [
    {
      title: t("template.table_column_config.column_title"),
      key: "column_title",
      componentType: "text",
      dataIndex: "columnTitle",
      render: (text: string, row: TableColumnConfigType, index: number) => (
        <Input placeholder={t("template.table_column_config.column_title")}
               value={row.columnTitle}
        />
      ),
      className: " text_center ",
    },
    // {
    //   title: t("template.table_column_config.column_key"),
    //   key: "column_key",
    //   componentType: "text",
    //   dataIndex: "columnKey",
    //   render: (text: string, row: TableColumnConfigType, index: number) => (
    //     <Input placeholder={t("template.table_column_config.column_key")}
    //            value={row.columnKey}
    //     />
    //   ),
    //   className: " text_center ",
    // },
    // {
    //   title: t("template.table_column_config.column_span"),
    //   key: "column_span",
    //   componentType: "number",
    //   dataIndex: "columnSpan",
    //   render: (text: string, row: TableColumnConfigType, index: number) => (
    //     <InputNumber
    //       value={row.columnSpan}
    //       step={1}
    //       placeholder={t("template.table_column_config.column_span")}/>
    //   ),
    //   className: " text_center ",
    // },
    {
      title: t("template.table_column_config.sub_question_type"),
      key: "sub_question_type",
      componentType: "select",
      dataIndex: "subQuestionType",
      selectOptions: codeList.SubQuestionType,
      render: (text: string, row: TableColumnConfigType, index: number) => (
        <div>
          {codeList.SubQuestionType.filter((item) => (item.value === rowData.subQuestionType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>

      ),
      className: " text_center ",
    },

    {
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
    },
  ]

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.table_column_config')})} bordered={true}>
        <div>
          <Button type="primary" onClick={() => {
            const newRow: TableColumnConfigType = {}
            newRow.tableColumnConfigId = uuid()
            tableColumnConfigList.push(newRow)
          }}>
            {t("common.button.add")}
          </Button>
        </div>
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

export default TableColumnConfigTableEditor;

