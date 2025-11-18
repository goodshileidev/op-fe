import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormSectionTemplateList from './form_section_template_list'
interface IFormSectionTemplateListDrawerProps {
  isFormSectionTemplateListDrawerOpen?: boolean
    formTemplateId: string

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const FormSectionTemplateListDrawer: React.FC<IFormSectionTemplateListDrawerProps> = Observer((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isFormSectionTemplateListDrawerOpen
  const { t } = useTranslation();

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.form_section_template')})}
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
        <FormSectionTemplateList formTemplateId= {props.formTemplateId}  />
        </Drawer>
      </div>
    )
})

export default FormSectionTemplateListDrawer;
