import React, {useState} from 'react'
import {Button, DatePicker, Form, Modal} from 'antd'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import FormSectionTemplateEdit from './form_section_template_edit'
import {FormTemplateType} from "@/common/data_type/template/form_template";

const {RangePicker} = DatePicker;

interface IFormSectionTemplateEditModalProps {
  isFormSectionTemplateEditModalOpen: boolean
  formSectionTemplateId: string
  formTemplateId: string
  formTemplate: FormTemplateType
  onClose: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormSectionTemplateEditModal: React.FC<IFormSectionTemplateEditModalProps> = ((props) => {
  const formSectionTemplateId = props.formSectionTemplateId
  const [formSectionTemplateForm] = Form.useForm();
  const isEdit = formSectionTemplateId !== undefined && formSectionTemplateId !== '' && formSectionTemplateId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [formSectionTemplateData, setFormSectionTemplateData] = useState<FormSectionTemplateType | any>({})
  const {t} = useTranslation();
  let isOpen = props.isFormSectionTemplateEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated: boolean, data: FormSectionTemplateType) => {
    console.debug("handleUpdate", data)
    props.onClose(updated, data)
    return true
  }

  const handleCancel = () => {
    props.onClose(false)
    return true
  }

  return (
    <Modal
      width={"80%"}
      title={isEdit ? t("common.title.edit", {'entity': t('template.form_section_template')}) : t("common.title.add", {'entity': t('template.form_section_template')})}
      open={isOpen}
      okText={t("common.button.save")}
      cancelText={t("common.button.cancel")}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okType={"primary"}
      footer={[
        <Button key="back" onClick={handleReset}>
          {t("common.button.reset")}
        </Button>,
        <Button key="cancel" onClick={handleCancel}>
          {t("common.button.cancel")}
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          {t("common.button.submit")}
        </Button>
      ]}
    >
      <FormSectionTemplateEdit
        formSectionTemplateId={props.formSectionTemplateId}
        onUpdate={handleUpdate}
        needReset={needReset} needSubmit={needSubmit}
        formTemplateId={props.formTemplateId}/>
    </Modal>
  )
})
export default FormSectionTemplateEditModal;
