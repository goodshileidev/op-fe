import React from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Popconfirm, Space, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {FormVarConfigType} from '@/common/data_type/template/form_var_config'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface IFormVarConfigTableEditorProps {
  formVarConfigList: FormVarConfigType[]
  onUpdate: any
}

const FormVarConfigTableEditor: React.FC<IFormVarConfigTableEditorProps> = ((props) => {
  const {t} = useTranslation();
  const formVarConfigList = props.formVarConfigList


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete formVarConfigList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const columns = [
    {
      title: t("template.form_var_config.var_name"),
      key: "var_name",
      componentType: "text",
      dataIndex: "varName",
      render: (text: string, row: FormVarConfigType, index: number) => (
        <Input placeholder={t("template.form_var_config.var_name")}
               value={row.varName}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_config.var_key"),
      key: "var_key",
      componentType: "text",
      dataIndex: "varKey",
      render: (text: string, row: FormVarConfigType, index: number) => (
        <Input placeholder={t("template.form_var_config.var_key")}
               value={row.varKey}
        />
      ),
      className: " text_center ",
    },
    // {
    //   title: t("template.form_var_config.var_data_type"),
    //   key: "var_data_type",
    //   componentType: "select",
    //   dataIndex: "varDataType",
    //   selectOptions: codeList.VarDataType,
    //   render: (text: string, row: FormVarConfigType, index: number) => (
    //     <div>
    //       {codeList.VarDataType.filter((item) => (item.value === row.varDataType)).map((item) => (
    //         <span color="green" key={item.value}>{item.label}</span>))}
    //     </div>
    //
    //   ),
    //   className: " text_center ",
    // },
    {
      title: t("template.form_var_config.var_input_type"),
      key: "var_input_type",
      componentType: "select",
      dataIndex: "varInputType",
      selectOptions: codeList.VarInputType,
      render: (text: string, row: FormVarConfigType, index: number) => (
        <div>
          {codeList.VarInputType.filter((item) => (item.value === row.varInputType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>

      ),
      className: " text_center ",
    },

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: FormVarConfigType, index: number) => (
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
      <Card title={t("common.title.list", {'entity': t('template.form_var_config')})} bordered={true}>
        <div>
          <Button type="primary" onClick={() => {
            const newRow: FormVarConfigType = {}
            newRow.formVarConfigId = uuid()
            newRow.required= false
            formVarConfigList.push(newRow)
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
            dataSource={props.formVarConfigList}
            rowKey="formVarConfigId"/>
        </>
      </Card>
    </div>
  )
})

export default FormVarConfigTableEditor;

