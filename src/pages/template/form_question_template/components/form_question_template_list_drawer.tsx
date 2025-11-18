import React, {useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormQuestionTemplateList from './form_question_template_list'

interface IFormQuestionTemplateListDrawerProps {
  isFormQuestionTemplateListDrawerOpen?: boolean
  formTemplateId: string
  formSectionTemplateId: string
  onClose: any
}


const FormQuestionTemplateListDrawer: React.FC<IFormQuestionTemplateListDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isFormQuestionTemplateListDrawerOpen
  const {t} = useTranslation();

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
        okType={"primary"}
        extra={
          <Space>
            <Button onClick={handleClose}>t("common.button.close")</Button>
            <Button onClick={handleClose} type="primary">
              t("common.button.ok")
            </Button>
          </Space>
        }
      >
        <FormQuestionTemplateList formTemplateId={props.formTemplateId}
                                  formSectionTemplateId={props.formSectionTemplateId}/>
      </Drawer>
    </div>
  )
})

export default FormQuestionTemplateListDrawer;
