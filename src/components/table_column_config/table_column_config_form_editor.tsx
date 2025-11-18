import React from 'react'
import {Card, Input} from 'antd'
import {TableColumnConfigType} from '@/common/data_type/template/table_column_config'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"

interface ITableColumnConfigFormEditorProps {
  fieldName: string
  tableColumnConfigList: array
  onUpdate: any
}

const TableColumnConfigFormEditor: React.FC<ITableColumnConfigFormEditorProps> = ((props) => {
  const {t} = useTranslation();


  const fields = [
    {
      title: t("template.table_column_config.column_title"),
      key: "column_title",
      componentType: "text",
      width: "300px",
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
    //   width: "300px",
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
      width: "300px",
      selectOptions: codeList.SubQuestionType,
      render: (text: string, row: TableColumnConfigType, index: number) => (
        <div>
          {codeList.SubQuestionType.filter((item) => (item.value === rowData.subQuestionType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>

      ),
      className: " text_center ",
    },

  ]

  return (
    <div>
      <Card title={t("common.title.list", {'entity': t('template.table_column_config')})} bordered={true}>
        <DynamicForm
          title={t("common.title.edit")}
          initData={props.tableColumnConfigList}
          fields={fields}
          fieldName={props.fieldName}
          onUpdate={props.onUpdate}
        />
      </Card>
    </div>
  )
})

export default TableColumnConfigFormEditor;

