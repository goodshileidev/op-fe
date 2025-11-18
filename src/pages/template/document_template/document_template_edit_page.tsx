import React, {useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import DocumentTemplateEdit from './components/document_template_edit'
import {PageContainer} from "@ant-design/pro-components";

const DocumentTemplateEditPage: React.FC = (() => {
  const {documentTemplateId} = useParams<{ documentTemplateId: string }>()
  const isEdit = (documentTemplateId !== undefined && documentTemplateId !== '0');
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
    navigate("/template/document_template/document_template_table/", {replace: true});
  }

  const handleBack = () => {
    navigate("/template/document_template/document_template_table/", {replace: true});
  }

  return (
    <PageContainer>
      <Card
        title={isEdit ? t("common.title.edit", {'entity': t('template.document_template')}) : t("common.title.add", {'entity': t('template.document_template')})}
        bordered={false} style={{width: "80%"}}>
        <DocumentTemplateEdit documentTemplateId={documentTemplateId} isOpen={true} onUpdate={handleUpdate}
                              needReset={needReset} needSubmit={needSubmit}/>
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
    </PageContainer>
  )
})

export default DocumentTemplateEditPage;
