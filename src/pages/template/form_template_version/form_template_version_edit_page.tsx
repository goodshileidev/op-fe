import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {FormTemplateVersionRules} from './form_template_version_validate'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getFormTemplateVersion, updateFormTemplateVersion, createFormTemplateVersion} from "@/common/service/template/form_template_version";
import {FormTemplateVersionType} from '@/common/data_type/template/form_template_version'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormTemplateVersionEdit from './components/form_template_version_edit'

const FormTemplateVersionEditPage: React.FC = (() => {
  const {formTemplateVersionId} = useParams<{formTemplateVersionId: string}>()
  const isEdit = (formTemplateVersionId !== undefined && formTemplateVersionId !=='0');
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
    navigate("/template/form_template_version/form_template_version_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/template/form_template_version/form_template_version_table/", { replace: true });
  }

  return (
   <>
    <Card title={isEdit ? t("common.title.edit",{'entity':t('template.form_template_version')}) : t("common.title.add",{'entity':t('template.form_template_version')})} bordered={false} style={{width: "80%"}}>
        <FormTemplateVersionEdit formTemplateVersionId={formTemplateVersionId} isOpen={true} onUpdate={handleUpdate} needReset={needReset} needSubmit={needSubmit}/>
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
            onClick={handleBack}
            style={{marginLeft: 8}}>
            {t("common.button.back")}
          </Button>
      </Space>
    </Card>
  </>
  )
})

export default FormTemplateVersionEditPage;
