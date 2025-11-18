import React, {useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, message, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import DocumentTemplateDetail from './components/document_template_detail'
import {cancelPublishDocumentTemplate, publishDocumentTemplate} from "@/common/service/template/document_template";
import {PageContainer} from "@ant-design/pro-components";
import {DocumentTemplateType} from "@/common/data_type/template/document_template";


const DocumentTemplateDetailPage: React.FC = (() => {
  const {documentTemplateId} = useParams<{ documentTemplateId: string }>()
  const [documentTemplateData, setDocumentTemplateData] = useState<DocumentTemplateType>({})

  const {t} = useTranslation();
  const navigate = useNavigate();
  const onGetData = (data: DocumentTemplateType) => {
    setDocumentTemplateData(data)
  }
  const handleBack = () => {
    navigate("/template/document_template/document_template_table/", {replace: true});
  }
  const handlePublish = () => {
    publishDocumentTemplate({documentTemplateId: documentTemplateId}).then((response) => {
      console.debug("handlePublish", documentTemplateId)
      message.success(t("common.execute_success", {'method': t('template.document_template.publish')}));
    })
  }

  const handleCancelPublish = () => {
    cancelPublishDocumentTemplate({documentTemplateId: documentTemplateId}).then((response) => {
      console.debug("handleCancelPublish", documentTemplateId)
      message.success(t("common.execute_success", {'method': t('template.document_template.cancel_publish')}));
    })
  }


  return (
    <PageContainer>
      <Card title={t("common.title.detail", {'entity': t('template.document_template')})} bordered={true}>
        <DocumentTemplateDetail
          documentTemplateId={documentTemplateId}
          isOpen={true}
          onGetData={onGetData}
        />

        <Space>
          <Button htmlType="button"
                  onClick={handleBack}
                  style={{marginLeft: 8}}>
            {t("common.button.back")}
          </Button>
          {documentTemplateData.publishStatus === "1" ? (<>
              <Button htmlType="button" onClick={handlePublish} style={{marginLeft: 8}}>
                {t("template.document_template.publish")}
              </Button>
            </>) :
            <Button htmlType="button" onClick={handleCancelPublish} style={{marginLeft: 8}}>
              {t("template.document_template.cancel_publish")}
            </Button>
          }
        </Space>
      </Card>
    </PageContainer>
  );
})

export default DocumentTemplateDetailPage;
