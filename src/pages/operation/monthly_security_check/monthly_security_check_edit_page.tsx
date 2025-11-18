import React, {useState} from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import MonthlySecurityCheckEdit from './components/monthly_security_check_edit'
import {PageContainer} from "@ant-design/pro-components";

const MonthlySecurityCheckEditPage: React.FC = (() => {
  const {monthlySecurityCheckId} = useParams<{ monthlySecurityCheckId: string }>()
  const isEdit = (monthlySecurityCheckId !== undefined && monthlySecurityCheckId !== '0');
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
    navigate("/operation/monthly_security_check/monthly_security_check_table/", {replace: true});
  }

  const handleBack = () => {
    navigate("/operation/monthly_security_check/monthly_security_check_table/", {replace: true});
  }


  return (
    <PageContainer>
      <Card
        title={isEdit ? t("common.title.edit", {'entity': t('operation.monthly_security_check')}) : t("common.title.add", {'entity': t('operation.monthly_security_check')})}
        bordered={false} style={{width: "80%"}}>
        <MonthlySecurityCheckEdit
          monthlySecurityCheckId={monthlySecurityCheckId}
          isOpen={true}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          style={{
            paddingBottom: 50
          }}
        />
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

export default MonthlySecurityCheckEditPage;
