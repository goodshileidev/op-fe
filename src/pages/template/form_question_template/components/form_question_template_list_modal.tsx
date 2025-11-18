import React, {useEffect, useState} from 'react'
import {Space,Modal, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormQuestionTemplateList from './form_question_template_list'

interface IFormQuestionTemplateListModalProps {
  isFormQuestionTemplateListModalOpen?: boolean
    FormTemplateId: string
    FormSectionTemplateId: string

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const FormQuestionTemplateListModal: React.FC<IFormQuestionTemplateListModalProps> = Observer((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let isOpen = props.isFormQuestionTemplateListModalOpen
  const { t } = useTranslation();

  return (
      <div>
        <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.form_question_template')})}
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
        <FormQuestionTemplateList FormTemplateId= {props.FormTemplateId} FormSectionTemplateId= {props.FormSectionTemplateId}  />
        </Modal>
      </div>
    )
})

export default FormQuestionTemplateListModal;
