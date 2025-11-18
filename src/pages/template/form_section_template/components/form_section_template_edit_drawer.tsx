import React, {useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {useTranslation} from 'react-i18next';
import FormSectionTemplateEdit from './form_section_template_edit'

interface IFormSectionTemplateEditDrawerProps {
  isFormSectionTemplateEditDrawerOpen?: boolean
  formSectionTemplateId: string
  formTemplateId: string

  onClose: any
}

const FormSectionTemplateEditDrawer: React.FC<IFormSectionTemplateEditDrawerProps> = ((props) => {
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const formSectionTemplateId = props.formSectionTemplateId
  const isEdit = formSectionTemplateId !== undefined && formSectionTemplateId !== '' && formSectionTemplateId !== '0';
  let isOpen = props.isFormSectionTemplateEditDrawerOpen
  const {t} = useTranslation();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleClose = () => {
    props.onClose(false)
    return false
  }

  const handleUpdate = (updated: boolean, data: FormSectionTemplateType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
    <div>
      <Drawer
        width={"80%"}
        title={isEdit ? t("common.title.edit", {'entity': t('template.form_section_template')}) : t("common.title.add", {'entity': t('template.form_section_template')})}
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
        <FormSectionTemplateEdit formSectionTemplateId={formSectionTemplateId} onUpdate={handleUpdate}
                                 needReset={needReset} needSubmit={needSubmit}
                                 formTemplateId={props.formTemplateId}/>
      </Drawer>
    </div>
  )
})

export default FormSectionTemplateEditDrawer;
