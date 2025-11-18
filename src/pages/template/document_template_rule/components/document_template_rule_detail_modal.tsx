import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {DocumentTemplateRuleType} from '@/common/data_type/template/document_template_rule'
import {useTranslation} from 'react-i18next';
import DocumentTemplateRuleDetail from './document_template_rule_detail'

interface IDocumentTemplateRuleDetailModalProps {
  isDocumentTemplateRuleDetailModalOpen?: boolean
  documentTemplateRuleId: string
  onClose: any
}

const DocumentTemplateRuleDetailModal: React.FC<IDocumentTemplateRuleDetailModalProps> = ((props) => {
  const documentTemplateRuleId = props.documentTemplateRuleId
  const { t } = useTranslation();
  let isOpen = props.isDocumentTemplateRuleDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.document_template_rule')})}
          open={isOpen}
          okText={t("common.button.close")}
          onOk={handleClose}
          onCancel={handleClose}
          open={isOpen}
          okType={"primary"}
          footer={[
            <Button type={'primary'} onClick={() => {
             isOpen = false
             handleClose()
           }}>
           {t("common.button.close")}
          </Button>]}
        >
        <DocumentTemplateRuleDetail
          documentTemplateRuleId={props.documentTemplateRuleId}
          isOpen={isOpen}
          />
    </Modal>
  );
})
export default DocumentTemplateRuleDetailModal;
