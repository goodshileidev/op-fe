import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {FormSectionRules} from './form_section_validate'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {useTranslation} from 'react-i18next';
import FormSectionEdit from './components/form_section_edit'

const FormSectionEditPage: React.FC = (() => {
  const {formSectionId} = useParams<{formSectionId: string}>()
  const isEdit = (formSectionId !== undefined && formSectionId !=='0');
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
    navigate("/form/form_section/form_section_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/form/form_section/form_section_table/", { replace: true });
  }


  return (
    <>
      <Card title={isEdit ? t("common.title.edit",{'entity':t('form.form_section')}) : t("common.title.add",{'entity':t('form.form_section')})} bordered={false} style={{width: "80%"}}>
        <FormSectionEdit
          formSectionId={formSectionId}
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

export default FormSectionEditPage;
