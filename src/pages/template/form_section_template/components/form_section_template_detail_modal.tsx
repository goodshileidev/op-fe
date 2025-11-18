import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {useTranslation} from 'react-i18next';
import FormSectionTemplateDetail from './form_section_template_detail'

interface IFormSectionTemplateDetailModalProps {
  isFormSectionTemplateDetailModalOpen?: boolean
  formSectionTemplateId: string
    formTemplateId: string

  onClose: any
}

const FormSectionTemplateDetailModal: React.FC<IFormSectionTemplateDetailModalProps> = ((props) => {
  const formSectionTemplateId = props.formSectionTemplateId
  const { t } = useTranslation();
  let isOpen = props.isFormSectionTemplateDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.form_section_template')})}
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
        <FormSectionTemplateDetail formSectionTemplateId={props.formSectionTemplateId} isOpen={isOpen}
            formTemplateId= {props.formTemplateId}  />
    </Modal>
  );
})
export default FormSectionTemplateDetailModal;
