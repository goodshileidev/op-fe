import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {FormQuestionTemplateType} from '@/common/data_type/template/form_question_template'
import {useTranslation} from 'react-i18next';
import FormQuestionTemplateDetail from './form_question_template_detail'

interface IFormQuestionTemplateDetailModalProps {
  isFormQuestionTemplateDetailModalOpen?: boolean
  formQuestionTemplateId: string
    formTemplateId: string
    formSectionTemplateId: string

  onClose: any
}

const FormQuestionTemplateDetailModal: React.FC<IFormQuestionTemplateDetailModalProps> = ((props) => {
  const formQuestionTemplateId = props.formQuestionTemplateId
  const { t } = useTranslation();
  let isOpen = props.isFormQuestionTemplateDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('template.form_question_template')})}
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
        <FormQuestionTemplateDetail formQuestionTemplateId={props.formQuestionTemplateId} isOpen={isOpen}
            formTemplateId= {props.formTemplateId} formSectionTemplateId= {props.formSectionTemplateId}  />
    </Modal>
  );
})
export default FormQuestionTemplateDetailModal;
