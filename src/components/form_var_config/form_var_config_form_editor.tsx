import React from 'react'
import {Collapse, Input} from 'antd'
import {FormVarConfigType} from '@/common/data_type/template/form_var_config'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"

interface IFormVarConfigFormEditorProps {
  fieldName: string
  fieldTitle: string
  formVarConfigList: FormVarConfigType[]
  onUpdate: any
}

const FormVarConfigFormEditor: React.FC<IFormVarConfigFormEditorProps> = ((props) => {
  const {t} = useTranslation();

  console.debug("fieldTitle", props.fieldTitle)
  const fields = [
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
    // {
    //   title: t("template.form_var_config.var_key"),
    //   key: "var_key",
    //   componentType: "text",
    //   dataIndex: "varKey",
    //   render: (text: string, row: FormVarConfigType, index: number) => (
    //     <Input placeholder={t("template.form_var_config.var_key")}
    //            value={row.varKey}
    //     />
    //   ),
    //   className: " text_center ",
    // },
    // {
    //   title: t("template.form_var_config.var_data_type"),
    //   key: "var_data_type",
    //   componentType: "select",
    //   dataIndex: "varDataType",
    //   selectOptions: codeList.VarDataType,
    //   render: (text: string, row: FormVarConfigType, index: number) => (
    //     <div>
    //       {codeList.VarDataType.filter((item) => (item.value === rowData.varDataType)).map((item) => (
    //         <span color="green" key={item.value}>{item.label}</span>))}
    //     </div>
    //
    //   ),
    //   className: " text_center ",
    // },
    {
      title: t("template.form_var_config.required"),
      key: "required",
      componentType: "select",
      dataIndex: "required",
      selectOptions: codeList.VarRequired,
      width: "200px",
      render: (text: string, row: FormVarConfigType, index: number) => (
        <div>
          {codeList.VarRequired.filter((item) => (item.value === row.varInputType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>
      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_config.var_input_type"),
      key: "var_input_type",
      componentType: "select",
      dataIndex: "varInputType",
      selectOptions: codeList.VarInputType,
      width: "200px",
      render: (text: string, row: FormVarConfigType, index: number) => (
        <div>
          {codeList.VarInputType.filter((item) => (item.value === row.varInputType)).map((item) => (
            <span color="green" key={item.value}>{item.label}</span>))}
        </div>

      ),
      className: " text_center ",
    },
    {
      title: t("template.form_var_config.var_default_value"),
      key: "var_default_value",
      componentType: "textarea",
      dataIndex: "varDefaultValue",
      width: "300px",
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
                      style={{
                        width: "100%"
                      }}
                      title={t("common.title.edit")}
                      initData={props.formVarConfigList}
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

export default FormVarConfigFormEditor;

