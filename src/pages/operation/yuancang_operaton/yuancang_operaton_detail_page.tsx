import React from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import YuancangOperatonDetail from './components/yuancang_operaton_detail'
import { PageContainer } from '@ant-design/pro-components';


const YuancangOperatonDetailPage: React.FC = (() => {
  const {yuancangOperatonId} = useParams<{ yuancangOperatonId: string }>()

  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/operation/yuancang_operaton/yuancang_operaton_table/", {replace: true});
  }


  return (
    <PageContainer>
      <Card title={t("common.title.detail", {'entity': t('operation.yuancang_operaton')})} bordered={true}>
        <YuancangOperatonDetail
          yuancangOperatonId={yuancangOperatonId}
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

export default YuancangOperatonDetailPage;
