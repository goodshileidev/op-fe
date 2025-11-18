import React from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {FormVarValueType} from '@/common/data_type/template/form_var_value'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface IFormVarValueTableEditorProps {
  formVarValueList: FormVarValueType[]
  onUpdate: any
}

const FormVarValueTableEditor: React.FC<IFormVarValueTableEditorProps> = ((props) => {
  const {t} = useTranslation();
  const formVarValueList = props.formVarValueList


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete formVarValueList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = [
    {
      title: t("template.form_var_value.var_name"),
      key: "var_name",
      componentType: "text",
      dataIndex: "varName",
      render: (text: string, row: FormVarValueType, index: number) => (
        <Input placeholder={t("template.form_var_value.var_name")}
               value={row.varName}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_value.var_key"),
      key: "var_key",
      componentType: "text",
      dataIndex: "varKey",
      render: (text: string, row: FormVarValueType, index: number) => (
        <Input placeholder={t("template.form_var_value.var_key")}
               value={row.varKey}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_value.var_data_type"),
      key: "var_data_type",
      componentType: "select",
      dataIndex: "varDataType",
      selectOptions: codeList.VarDataType,
      render: (text: string, row: FormVarValueType, index: number) => (
        <div>
          {codeList.VarDataType.filter((item) => (item.value === rowData.varDataType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>

      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_value.var_input_type"),
      key: "var_input_type",
      componentType: "select",
      dataIndex: "varInputType",
      selectOptions: codeList.VarInputType,
      render: (text: string, row: FormVarValueType, index: number) => (
        <div>
          {codeList.VarInputType.filter((item) => (item.value === rowData.varInputType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>

      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_value.var_value"),
      key: "var_value",
      componentType: "text",
      dataIndex: "varValue",
      render: (text: string, row: FormVarValueType, index: number) => (
        <Input placeholder={t("template.form_var_value.var_value")}
               value={row.varValue}
        />
      ),
      className: " text_center ",
    },

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: FormVarValueType, index: number) => (
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
      <Card title={t("common.title.list", {'entity': t('template.form_var_value')})} bordered={true}>
        <div>
          <Button type="primary" onClick={() => {
            const newRow: FormVarValueType = {}
            newRow.formVarValueId = uuid()
            formVarValueList.push(newRow)
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
            dataSource={props.formVarValueList}
            rowKey="formVarValueId"/>
        </>
      </Card>
    </div>
  )
})

export default FormVarValueTableEditor;

