import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {Link} from 'umi'
import {useTranslation} from 'react-i18next';
import InternalOrgList from './internal_org_list'
interface IInternalOrgListDrawerProps {
  isInternalOrgListDrawerOpen?: boolean

  onClose: any
}

const handleClose = () => {
    props.onClose(true)
    return true
}

const InternalOrgListDrawer: React.FC<IInternalOrgListDrawerProps> = Observer((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  let isOpen = props.isInternalOrgListDrawerOpen
  const { t } = useTranslation();

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('system.internal_org')})}
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
        <InternalOrgList  />
        </Drawer>
      </div>
    )
})

export default InternalOrgListDrawer;
