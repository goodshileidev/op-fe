import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin, Space, message} from 'antd'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {getFormQuestion} from '@/common/service/form/form_question'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import FormQuestionDetail from './components/form_question_detail'


const FormQuestionDetailPage: React.FC = (() => {
  const {formQuestionId} = useParams<{formQuestionId: string}>()

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/form/form_question/form_question_table/", { replace: true });
  }


  return (
    <Card title={t("common.title.detail",{'entity':t('form.form_question')})} bordered={true}>
      <FormQuestionDetail
        formQuestionId={formQuestionId}
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

export default FormQuestionDetailPage;
