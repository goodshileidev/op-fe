/**
 * Tiger Cloud v4.0 - 行业配置详情页面
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'umi';
import { Button, Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import IndustryConfigDetail from './components/industry_config_detail';
import { IndustryConfigType } from '@/common/data_type/config/industry_config';
import { PageContainer } from '@ant-design/pro-components';

const IndustryConfigDetailPage: React.FC = () => {
  const { configId } = useParams<{ configId: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [configData, setConfigData] = useState<IndustryConfigType>({});

  const handleBack = () => {
    navigate('/config/industry_config/industry_config_table/', { replace: true });
  };

  const handleEdit = () => {
    navigate(`/config/industry_config/industry_config_edit_page/${configId}`, { replace: true });
  };

  return (
    <PageContainer>
      <Card
        title={`行业配置详情${configData.industryName ? ` - ${configData.industryName}` : ''}`}
        bordered={true}
      >
        <IndustryConfigDetail configId={configId} isOpen={true} />
      </Card>
      <Space style={{ marginTop: 16 }}>
        <Button type="primary" onClick={handleEdit}>
          编辑
        </Button>
        <Button onClick={handleBack}>
          {t('common.button.back')}
        </Button>
      </Space>
    </PageContainer>
  );
};

export default IndustryConfigDetailPage;
