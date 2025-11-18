import React, {useEffect, useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {useTranslation} from 'react-i18next';
import FormQuestionTemplateEdit from './form_question_template_edit'
import {FormSectionTemplateType} from "@/common/data_type/template/form_section_template";
import {FormTemplateType} from "@/common/data_type/template/form_template";

interface IFormQuestionTemplateEditDrawerProps {
  isFormQuestionTemplateEditDrawerOpen: boolean
  formQuestionTemplateId: string
  formTemplateId: string
  formTemplate?: FormTemplateType
  formSectionTemplateId: string
  formSectionTemplate?: FormSectionTemplateType
  onClose: any
}

const FormQuestionTemplateEditDrawer: React.FC<IFormQuestionTemplateEditDrawerProps> = ((props) => {

  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const [formQuestionTemplateId, setFormQuestionTemplateId] = useState<string>(props.formQuestionTemplateId + "")
  const isEdit = props.formQuestionTemplateId !== undefined && props.formQuestionTemplateId !== '' && props.formQuestionTemplateId !== '0';
  let isOpen = props.isFormQuestionTemplateEditDrawerOpen
  const [updated, setUpdated] = useState<boolean>(false)
  const [updatedData, setUpdatedData] = useState<FormQuestionTemplateType>(null)
  const {t} = useTranslation();
  console.debug("formTemplateId", props.formTemplateId)
  console.debug("formSectionTemplateId", props.formSectionTemplateId)
  console.debug("formQuestionTemplateId", props.formQuestionTemplateId)
  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleClose = () => {
    handleReset();//关闭前reset，否则再次打开，老数据还存在
    if (props.onClose) {
      props.onClose(updated, updatedData)
    }
    return false
  }

  const handleUpdate = (updated: boolean, data: FormQuestionTemplateType) => {
    console.debug("handleUpdate", data)
    // props.onClose(true, data) 更新后不自动关闭
    setUpdated(true)
    setUpdatedData(data)
    return true
  }


  useEffect(() => {
    if (!props.formQuestionTemplateId || props.formQuestionTemplateId === "0") {
      handleReset()
    }
  }, [props.formQuestionTemplateId])


  return (
    <div>
      <Drawer
        width={"100%"}
        title={isEdit ? t("common.title.edit", {'entity': t('template.form_question_template')}) : t("common.title.add", {'entity': t('template.form_question_template')})}
        open={isOpen}
        onClose={handleClose}
        okType={"primary"}
        extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
            <Button onClick={handleReset}>
              {t("common.button.reset")}
            </Button>
            <Button onClick={handleSubmit} type="primary">
              {t("common.button.save")}
            </Button>
          </Space>
        }
      >
        <FormQuestionTemplateEdit
          formQuestionTemplateId={props.formQuestionTemplateId}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          formTemplateId={props.formTemplateId}
          formTemplate={props.formTemplate}
          formSectionTemplate={props.formSectionTemplate}
          formSectionTemplateId={props.formSectionTemplateId}
          isOpen={isOpen}/>
      </Drawer>
    </div>
  )
})

export default FormQuestionTemplateEditDrawer;
