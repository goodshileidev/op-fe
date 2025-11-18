import React, {useEffect, useState} from 'react'
import {Space,Modal, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormSectionList from './form_section_list'
import {FormType} from '@/common/data_type/form/form'


interface IFormSectionListModalProps {
  isListModalOpen?: boolean
    formId: string
    formIdData?: FormType

  showButtons?:string[]
  onSelect: any
  onClose: any
}

const FormSectionListModal: React.FC<IFormSectionListModalProps> = ((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let isOpen = props.isListModalOpen
  const { t } = useTranslation();

  const handleClose = () => {
    props.onClose(true)
    return true
  }
  return (
      <div>
        <Modal
          width={"80%"}
          title={t("common.title.list",{'entity':t('form.form_section')})}
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
        <FormSectionList
          isOpen={isOpen}
          onSelect={props.onSelect}
          formId= {props.formId} formIdData = {props.formIdData} 
          showButtons={props.showButtons}
          />
        </Modal>
      </div>
    )
})

export default FormSectionListModal;
