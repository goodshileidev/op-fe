import React, {useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import FormTemplateEdit from './components/form_template_edit'

const FormTemplateEditPage: React.FC = (() => {
  const {formTemplateId} = useParams<{ formTemplateId: string }>()
  const isEdit = (formTemplateId !== undefined && formTemplateId !== '0');
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)

  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = () => {
    navigate("/template/form_template/form_template_table/", {replace: true});
  }

  const handleBack = () => {
    navigate("/template/form_template/form_template_table/", {replace: true});
  }

  return (
    <>
      <Card
        title={isEdit ? t("common.title.edit", {'entity': t('template.form_template')}) : t("common.title.add", {'entity': t('template.form_template')})}
        bordered={false} style={{width: "100%"}}>
        <FormTemplateEdit formTemplateId={formTemplateId} isOpen={true} onUpdate={handleUpdate} needReset={needReset}
                          needSubmit={needSubmit}/>
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

export default FormTemplateEditPage;
