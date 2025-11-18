import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DocumentTemplateRuleType} from '@/common/data_type/template/document_template_rule'
import {useTranslation} from 'react-i18next';
import DocumentTemplateRuleDetail from './document_template_rule_detail'

interface IDocumentTemplateRuleDetailDrawerProps {
  isDetailDrawerOpen?: boolean
  documentTemplateRuleId: string
  onClose: any
}

const DocumentTemplateRuleDetailDrawer: React.FC<IDocumentTemplateRuleDetailDrawerProps> = ((props) => {
  const documentTemplateRuleId = props.documentTemplateRuleId
  const { t } = useTranslation();
  let isOpen = props.isDetailDrawerOpen

  const handleClose = () => {
    props.onClose(true)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.document_template_rule')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <DocumentTemplateRuleDetail
          documentTemplateRuleId={props.documentTemplateRuleId}
          isOpen={isOpen}
          />
      </Drawer>
    </div>
  )
})
export default DocumentTemplateRuleDetailDrawer;
