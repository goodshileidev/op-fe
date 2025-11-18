import React, {useEffect, useState} from 'react'
import {Space,Modal, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormType} from '@/common/data_type/form/form'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import FormList from './form_list'


interface IFormListModalProps {
  isListModalOpen?: boolean

  showButtons?:string[]
  onSelect: any
  onClose: any
}

const FormListModal: React.FC<IFormListModalProps> = ((props) => {
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
          title={t("common.title.list",{'entity':t('form.form')})}
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
        <FormList
          isOpen={isOpen}
          onSelect={props.onSelect}
          
          showButtons={props.showButtons}
          />
        </Modal>
      </div>
    )
})

export default FormListModal;
