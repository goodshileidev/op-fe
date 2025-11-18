import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin} from 'antd'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {useTranslation} from 'react-i18next';
import FormQuestionDetail from './form_question_detail'

interface IFormQuestionDetailModalProps {
  isFormQuestionDetailModalOpen?: boolean
  formQuestionId: string
  formQuestionData?: FormQuestionType
  onClose: any
}

const FormQuestionDetailModal: React.FC<IFormQuestionDetailModalProps> = ((props) => {
  const formQuestionId = props.formQuestionId
  const { t } = useTranslation();
  let isOpen = props.isFormQuestionDetailModalOpen

  const handleClose = () => {
    props.onClose(false)
  }

  return (
    <Modal
          width={"80%"}
          title={t("common.title.detail",{'entity':t('form.form_question')})}
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
        <FormQuestionDetail
          formQuestionId={props.formQuestionId}
          formQuestionData={props.formQuestionData}
          isOpen={isOpen}
          />
    </Modal>
  );
})
export default FormQuestionDetailModal;
