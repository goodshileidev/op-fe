import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormSectionList from './form_section_list'
import {FormType} from '@/common/data_type/form/form'


interface IFormSectionListDrawerProps {
  isListDrawerOpen?: boolean
    formId: string
    formData?: FormType

  showButtons?:string[]
  onSelect: any
  onClose: any
}

const FormSectionListDrawer: React.FC<IFormSectionListDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isListDrawerOpen
  const { t } = useTranslation();

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.list",{'entity':t('form.form_section')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }
        >
        <FormSectionList
          isOpen={isOpen}
          onSelect={props.onSelect}
          formId= {props.formId} formData = {props.formData} 
          showButtons={props.showButtons}
          />
        </Drawer>
      </div>
    )})

export default FormSectionListDrawer;