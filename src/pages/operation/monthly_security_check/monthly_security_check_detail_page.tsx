import React from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import MonthlySecurityCheckDetail from './components/monthly_security_check_detail'


const MonthlySecurityCheckDetailPage: React.FC = (() => {
  const {monthlySecurityCheckId} = useParams<{ monthlySecurityCheckId: string }>()

  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/operation/monthly_security_check/monthly_security_check_table/", {replace: true});
  }


  return (
    <PageContainer>
      <Card title={t("common.title.detail", {'entity': t('operation.monthly_security_check')})} bordered={true}>
        <MonthlySecurityCheckDetail
          monthlySecurityCheckId={monthlySecurityCheckId}
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
    </PageContainer>
  );
})

export default MonthlySecurityCheckDetailPage;
