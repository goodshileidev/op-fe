import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {InternalOrgType} from '@/common/data_type/system/internal_org'
import {useTranslation} from 'react-i18next';
import InternalOrgDetail from './internal_org_detail'

interface IInternalOrgDetailDrawerProps {
  isInternalOrgDetailDrawerOpen?: boolean
  internalOrgId: string

  onClose: any
}

const InternalOrgDetailDrawer: React.FC<IInternalOrgDetailDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { t } = useTranslation();
  let isOpen = props.isInternalOrgDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

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
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <InternalOrgDetail internalOrgId={props.internalOrgId} isOpen={isOpen}
             />
        </Drawer>
      </div>
    )
})

export default InternalOrgDetailDrawer;
