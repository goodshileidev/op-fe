import React, {useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormQuestionTemplateDetail from './form_question_template_detail'

interface IFormQuestionTemplateDetailDrawerProps {
  isFormQuestionTemplateDetailDrawerOpen?: boolean
  formQuestionTemplateId: string
  formTemplateId: string
  formSectionTemplateId: string
  onClose: any
}

const FormQuestionTemplateDetailDrawer: React.FC<IFormQuestionTemplateDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isFormQuestionTemplateDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
    <div>
      <Drawer
        width={"80%"}
        title={t("common.title.detail", {'entity': t('template.form_question_template')})}
        open={isOpen}
        onClose={handleClose}
        extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <FormQuestionTemplateDetail
          formQuestionTemplateId={props.formQuestionTemplateId} isOpen={isOpen}
          formTemplateId={props.formTemplateId}
          formSectionTemplateId={props.formSectionTemplateId}/>
      </Drawer>
    </div>
  )
})

export default FormQuestionTemplateDetailDrawer;
