import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin, Space} from 'antd'
import {FormTemplateVersionType} from '@/common/data_type/template/form_template_version'
import {getFormTemplateVersion} from '@/common/service/template/form_template_version'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import FormTemplateVersionDetail from './components/form_template_version_detail'

const FormTemplateVersionDetailPage: React.FC = (() => {
  const {formTemplateVersionId} = useParams<{formTemplateVersionId: string}>()
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/template/form_template_version/form_template_version_table/", { replace: true });
  }

  return (
    <Card title={t("common.title.detail",{'entity':t('template.form_template_version')})} bordered={true}>
      <FormTemplateVersionDetail formTemplateVersionId={formTemplateVersionId} isOpen={true}/>
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

export default FormTemplateVersionDetailPage;
