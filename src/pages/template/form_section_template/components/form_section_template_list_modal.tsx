import React, {useEffect, useState} from 'react'
import {Space,Modal, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormSectionTemplateList from './form_section_template_list'

interface IFormSectionTemplateListModalProps {
  isFormSectionTemplateListModalOpen?: boolean
    FormTemplateId: string

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const FormSectionTemplateListModal: React.FC<IFormSectionTemplateListModalProps> = Observer((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let isOpen = props.isFormSectionTemplateListModalOpen
  const { t } = useTranslation();

  return (
      <div>
        <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.form_section_template')})}
          open={isOpen}
          okText={t("common.close")}
          onOk={handleClose}
          okType={"primary"}
          // footer={[<Button type={'primary'} onClick={() => {
          //   isOpen = false
          //   console.debug("isOpen", isOpen)
          // }
          // }></Button>,
          //   <Button onClick={() => {
          //     isOpen = false
          //     console.debug("isOpen", isOpen)
          //   }
          //   }>
          //   </Button>]}
        >
        <FormSectionTemplateList FormTemplateId= {props.FormTemplateId}  />
        </Modal>
      </div>
    )
})

export default FormSectionTemplateListModal;
