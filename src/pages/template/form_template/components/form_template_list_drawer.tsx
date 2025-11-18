import React, {useState} from 'react'
import {Button, Drawer, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import FormTemplateList from './form_template_list'

interface IFormTemplateListDrawerProps {
  isFormTemplateListDrawerOpen?: boolean

  onClose: any
}

const handleClose = () => {
  props.onClose(true)
  return true
}

const FormTemplateListDrawer: React.FC<IFormTemplateListDrawerProps> = Observer((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isFormTemplateListDrawerOpen
  const {t} = useTranslation();

  return (
    <div>
      <Drawer
        width={"80%"}
        title={t("common.title.detail", {'entity': t('template.form_template')})}
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
        <FormTemplateList/>
      </Drawer>
    </div>
  )
})

export default FormTemplateListDrawer;
