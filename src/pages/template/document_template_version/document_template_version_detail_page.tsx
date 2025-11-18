import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin, Space} from 'antd'
import {DocumentTemplateVersionType} from '@/common/data_type/template/document_template_version'
import {getDocumentTemplateVersion} from '@/common/service/template/document_template_version'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import DocumentTemplateVersionDetail from './components/document_template_version_detail'

const DocumentTemplateVersionDetailPage: React.FC = (() => {
  const {documentTemplateVersionId} = useParams<{documentTemplateVersionId: string}>()
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/template/document_template_version/document_template_version_table/", { replace: true });
  }

  return (
    <Card title={t("common.title.detail",{'entity':t('template.document_template_version')})} bordered={true}>
      <DocumentTemplateVersionDetail documentTemplateVersionId={documentTemplateVersionId} isOpen={true}/>
      <Space>
          <Button htmlType="button"
            onClick={handleBack}
            style={{marginLeft: 8}}>
            {t("common.button.back")}
           </Button>
      </Space>
    </Card>
  );
})

export default DocumentTemplateVersionDetailPage;
