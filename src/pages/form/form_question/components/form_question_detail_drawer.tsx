import React, {useEffect, useState} from 'react'
import {Space,Drawer, Popconfirm, Table, Tag, TableProps, Button, Card, message, Input, Spin} from 'antd'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {useTranslation} from 'react-i18next';
import FormQuestionDetail from './form_question_detail'

interface IFormQuestionDetailDrawerProps {
  isDetailDrawerOpen?: boolean
  formQuestionId: string
  formQuestionData?: FormQuestionType
  onClose: any
}

const FormQuestionDetailDrawer: React.FC<IFormQuestionDetailDrawerProps> = ((props) => {
  const formQuestionId = props.formQuestionId
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
          title={t("common.title.detail",{'entity':t('form.form_question')})}
          open={isOpen}
          onClose={handleClose}
          okType={"primary"}
          extra={
          <Space>
            <Button onClick={handleClose}>{t("common.button.close")}</Button>
          </Space>
        }>
        <FormQuestionDetail
          formQuestionId={props.formQuestionId}
          formQuestionData={props.formQuestionData}
          isOpen={isOpen}
          />
      </Drawer>
    </div>
  )
})
export default FormQuestionDetailDrawer;
