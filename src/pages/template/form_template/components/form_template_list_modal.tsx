import React, {useEffect, useState} from 'react'
import {Space,Modal, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormTemplateType} from '@/common/data_type/template/form_template'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormTemplateList from './form_template_list'

interface IFormTemplateListModalProps {
  isFormTemplateListModalOpen?: boolean

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const FormTemplateListModal: React.FC<IFormTemplateListModalProps> = Observer((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let isOpen = props.isFormTemplateListModalOpen
  const { t } = useTranslation();

  return (
      <div>
        <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.form_template')})}
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
        <FormTemplateList  />
        </Modal>
      </div>
    )
})

export default FormTemplateListModal;
