import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'umi'
import {Card, Button, Tag, Alert, Descriptions, Image, Spin, Space, message} from 'antd'
import {SecurityDeclareType} from '@/common/data_type/operation/security_declare'
import {getSecurityDeclare} from '@/common/service/operation/security_declare'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import SecurityDeclareDetail from './components/security_declare_detail'


const SecurityDeclareDetailPage: React.FC = (() => {
  const {securityDeclareId} = useParams<{securityDeclareId: string}>()

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/operation/security_declare/security_declare_table/", { replace: true });
  }


  return (
    <Card title={t("common.title.detail",{'entity':t('operation.security_declare')})} bordered={true}>
      <SecurityDeclareDetail
        securityDeclareId={securityDeclareId}
        isOpen={true}
        />

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

export default SecurityDeclareDetailPage;
