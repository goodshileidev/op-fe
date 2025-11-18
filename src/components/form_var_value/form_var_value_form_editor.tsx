import React from 'react'
import {Collapse, Input} from 'antd'
import {FormVarValueType} from '@/common/data_type/template/form_var_value'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"

interface IFormVarValueFormEditorProps {
  fieldName: string
  fieldTitle?: string
  formVarValueList?: []
  onUpdate: any
}

const FormVarValueFormEditor: React.FC<IFormVarValueFormEditorProps> = ((props) => {
  const {t} = useTranslation();

  const fields = [
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
    // {
    //   title: t("template.form_var_value.var_data_type"),
    //   key: "var_data_type",
    //   componentType: "select",
    //   dataIndex: "varDataType",
    //   selectOptions: codeList.VarDataType,
    //   render: (text: string, row: FormVarValueType, index: number) => (
    //     <div>
    //       {codeList.VarDataType.filter((item) => (item.value === rowData.varDataType)).map((item) => (
    //         <span color="green" key={item.value}>{item.label}</span>))}
    //     </div>
    //
    //   ),
    //   className: " text_center ",
    // },
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

  ]

  function onCollapseChange(key: string | string[]) {
    console.debug("onCollapseChange", key)
  }

  return (
    <Collapse className={`question-card-draggable_${props.fieldName}`}
              items={[
                {
                  key: t("common.title.list", {'entity': props.fieldName}),
                  label: t("common.title.list", {'entity': props.fieldTitle}),
                  style: {margin: '16px'},
                  children: <>
                    <DynamicForm
                      title={t("common.title.edit")}
                      initData={props.formVarValueList}
                      fields={fields}
                      fieldName={props.fieldName}
                      onUpdate={props.onUpdate}
                    />
                  </>
                }
              ]}
              defaultActiveKey={[]}
              onChange={onCollapseChange}/>
  )
})

export default FormVarValueFormEditor;

