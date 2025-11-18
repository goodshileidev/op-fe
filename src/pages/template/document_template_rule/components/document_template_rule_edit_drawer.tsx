import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {DocumentTemplateRuleType} from '@/common/data_type/template/document_template_rule'
import {useTranslation} from 'react-i18next';
import DocumentTemplateRuleEdit from './document_template_rule_edit'


interface IDocumentTemplateRuleEditDrawerProps {
  isEditDrawerOpen?: boolean
  documentTemplateRuleId: string

  onClose: any
}

const DocumentTemplateRuleEditDrawer: React.FC<IDocumentTemplateRuleEditDrawerProps> = ((props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)
  const documentTemplateRuleId = props.documentTemplateRuleId
  const isEdit = documentTemplateRuleId !== undefined && documentTemplateRuleId !=='' && documentTemplateRuleId !=='0';

  const { t } = useTranslation();
  let isOpen = props.isEditDrawerOpen

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleClose = () => {
    props.onClose(false)
    return false
  }

  const handleUpdate = (updated:boolean, data:DocumentTemplateRuleType) => {
    console.debug("handleUpdate", data)
    //props.onClose(true, data)
    return true
  }

  return (
      <div>
        <Drawer
          width={"80%"}
          title={isEdit?t("common.title.edit",{'entity':t('template.document_template_rule')}):t("common.title.add",{'entity':t('template.document_template_rule')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
            <Button onClick={handleReset}>
              {t("common.button.reset")}
            </Button>
            <Button onClick={handleSubmit} type="primary">
              {t("common.button.save")}
            </Button>
          </Space>
        }
        >
        <DocumentTemplateRuleEdit
          documentTemplateRuleId={documentTemplateRuleId}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          
          />
        </Drawer>
      </div>
  )
})
export default DocumentTemplateRuleEditDrawer;
