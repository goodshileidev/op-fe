import React, {useEffect, useState} from 'react'
import {Card} from 'antd'
import {DocumentStepType} from '@/common/data_type/system/document_step'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DynamicForm from "@/components/common/dynamic_form"
import {codeList} from "@/common/code_list/code_list_static";

interface IDocumentStepFormEditorProps {
  fieldName: string
  fieldLabel: string
  documentStepList: DocumentStepType[]
  onUpdate: any
}

const DocumentStepFormEditor: React.FC<IDocumentStepFormEditorProps> = ((props) => {
  const {t} = useTranslation();

  const [codeListFormTemplate, setCodeListFormTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListFormTemplate({publishStatusCondition: "2"}).then((FormTemplateCodeList) => {
      setCodeListFormTemplate(FormTemplateCodeList)
      console.debug("FormTemplateCodeList", FormTemplateCodeList)
    })
  }, [])


  const fields = [
    {
      title: t("system.document_step.form_no"),
      key: "form_no",
      componentType: "select",
      dataIndex: "formTemplateNo",
      selectOptions: codeListFormTemplate,
      optionValueField: "formTemplateNo",
      optionLabelField: "formTemplateName",
      width: "300px",
      className: " text_center ",
    },
    {
      title: t("system.document_step.fillin_order"),
      key: "fillin_order",
      componentType: "number",
      dataIndex: "fillinOrder",
      width: 150,
      render: (text: string, row: DocumentStepType, index: number) => (
        <InputNumber
          value={row.fillinOrder}
          step={1}
          placeholder={t("system.document_step.fillin_order")}/>
      ),
      className: " text_center ",
    },
    {
      title: t("system.document_step.shared_in_miniapp"),
      key: "shared_in_miniapp",
      componentType: "select",
      width: 150,
      selectOptions: codeList.YesNo,
      dataIndex: "sharedInMiniapp",
    },

  ]

  return (
    <div>
      <Card title={t("common.title.list", {"entity": props.fieldLabel})} bordered={true}>
        <DynamicForm
          title={t("common.title.edit")}
          initData={props.documentStepList}
          fields={fields}
          fieldName={props.fieldName}
          onUpdate={props.onUpdate}
        />
      </Card>
    </div>
  )
})

export default DocumentStepFormEditor;

