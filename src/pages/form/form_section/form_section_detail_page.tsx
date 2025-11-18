import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin, Space, message} from 'antd'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {getFormSection} from '@/common/service/form/form_section'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import FormSectionDetail from './components/form_section_detail'


const FormSectionDetailPage: React.FC = (() => {
  const {formSectionId} = useParams<{formSectionId: string}>()

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/form/form_section/form_section_table/", { replace: true });
  }


  return (
    <Card title={t("common.title.detail",{'entity':t('form.form_section')})} bordered={true}>
      <FormSectionDetail
        formSectionId={formSectionId}
        isOpen={true}
        />

      <Space>
          <Button htmlType="button"
            onClick={handleCloseWindow}
            style={{marginLeft: 8}}>
            {t("common.button.close")}
           </Button>

      </Space>
    </Card>
  );
})

export default FormSectionDetailPage;
