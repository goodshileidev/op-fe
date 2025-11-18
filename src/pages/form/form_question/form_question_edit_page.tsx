import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {FormQuestionRules} from './form_question_validate'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {useTranslation} from 'react-i18next';
import FormQuestionEdit from './components/form_question_edit'

const FormQuestionEditPage: React.FC = (() => {
  const {formQuestionId} = useParams<{formQuestionId: string}>()
  const isEdit = (formQuestionId !== undefined && formQuestionId !=='0');
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = () => {
    navigate("/form/form_question/form_question_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/form/form_question/form_question_table/", { replace: true });
  }


  return (
    <>
      <Card title={isEdit ? t("common.title.edit",{'entity':t('form.form_question')}) : t("common.title.add",{'entity':t('form.form_question')})} bordered={false} style={{width: "80%"}}>
        <FormQuestionEdit
          formQuestionId={formQuestionId}
          isOpen={true}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          style={{
            paddingBottom: 50
          }}
        />
        <Space>
          <Button type="primary" htmlType="submit"
           onClick={handleSubmit}>
            {t("common.button.save")}
          </Button>
          <Button htmlType="button"
            onClick={handleReset}
            style={{marginLeft: 8}}>
            {t("common.button.reset")}
          </Button>

          <Button htmlType="button"
            onClick={handleCloseWindow}
            style={{marginLeft: 8}}>
            {t("common.button.close")}
          </Button>
        </Space>
      </Card>
    </>
  )
})

export default FormQuestionEditPage;
