import React, {useState} from 'react'
import {Button, DatePicker, Form, Modal} from 'antd'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import FormQuestionTemplateEdit from './form_question_template_edit'

const {RangePicker} = DatePicker;

interface IFormQuestionTemplateEditModalProps {
  isFormQuestionTemplateEditModalOpen?: boolean
  formQuestionTemplateId: string
  formTemplateId: string
  formSectionTemplateId: string

  onClose: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormQuestionTemplateEditModal: React.FC<IFormQuestionTemplateEditModalProps> = ((props) => {
  const formQuestionTemplateId = props.formQuestionTemplateId
  const [formQuestionTemplateForm] = Form.useForm();
  const isEdit = formQuestionTemplateId !== undefined && formQuestionTemplateId !== '' && formQuestionTemplateId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [formQuestionTemplateData, setFormQuestionTemplateData] = useState<FormQuestionTemplateType | any>({})
  const {t} = useTranslation();
  let isOpen = props.isFormQuestionTemplateEditModalOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = (updated: boolean, data: FormQuestionTemplateType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  const handleCancel = () => {
    handleReset();//关闭前reset，否则再次打开，老数据还存在
    props.onClose(false)
    return true
  }

  return (
    <Modal
      width={"80%"}
      title={isEdit ? t("common.title.edit", {'entity': t('template.form_question_template')}) : t("common.title.add", {'entity': t('template.form_question_template')})}
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
      <FormQuestionTemplateEdit formQuestionTemplateId={props.formQuestionTemplateId} onUpdate={handleUpdate}
                                needReset={needReset} needSubmit={needSubmit}
                                formTemplateId={props.formTemplateId}
                                formSectionTemplateId={props.formSectionTemplateId}/>
    </Modal>
  )
})
export default FormQuestionTemplateEditModal;
