import React, {useEffect, useState} from 'react'
import {Space,Modal, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import InternalOrgList from './internal_org_list'

interface IInternalOrgListModalProps {
  isInternalOrgListModalOpen?: boolean

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const InternalOrgListModal: React.FC<IInternalOrgListModalProps> = Observer((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let isOpen = props.isInternalOrgListModalOpen
  const { t } = useTranslation();

  return (
      <div>
        <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.internal_org')})}
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
        <InternalOrgList  />
        </Modal>
      </div>
    )
})

export default InternalOrgListModal;
