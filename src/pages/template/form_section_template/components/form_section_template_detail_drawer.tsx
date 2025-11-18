import React, {useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormSectionTemplateDetail from './form_section_template_detail'

interface IFormSectionTemplateDetailDrawerProps {
  isFormSectionTemplateDetailDrawerOpen?: boolean
  formSectionTemplateId: string
  formTemplateId: string

  onClose: any
}

const FormSectionTemplateDetailDrawer: React.FC<IFormSectionTemplateDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isFormSectionTemplateDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
    <div>
      <Drawer
        width={"80%"}
        title={t("common.title.detail", {'entity': t('template.form_section_template')})}
        open={isOpen}
        onClose={handleClose}
        okType={"primary"}
        extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <FormSectionTemplateDetail
          formSectionTemplateId={props.formSectionTemplateId} isOpen={isOpen}
          formTemplateId={props.formTemplateId}/>
      </Drawer>
    </div>
  )
})

export default FormSectionTemplateDetailDrawer;
