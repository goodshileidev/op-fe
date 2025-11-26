/**
 * Tiger Cloud v4.0 - 行业配置编辑页面
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useState } from 'react';
import { useNavigate, useParams } from 'umi';
import { Button, Card, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import IndustryConfigEdit from './components/industry_config_edit';
import { PageContainer } from '@ant-design/pro-components';

const IndustryConfigEditPage: React.FC = () => {
  const { configId } = useParams<{ configId: string }>();
  const isEdit = configId !== undefined && configId !== '0';
  const [needReset, setNeedReset] = useState<number>(0);
  const [needSubmit, setNeedSubmit] = useState<number>(0);

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setNeedSubmit(new Date().getMilliseconds());
  };

  const handleReset = () => {
    setNeedReset(new Date().getMilliseconds());
  };

  const handleUpdate = () => {
    navigate('/config/industry_config/industry_config_table/', { replace: true });
  };

  const handleBack = () => {
    navigate('/config/industry_config/industry_config_table/', { replace: true });
  };

  return (
    <PageContainer>
      <Card
        title={isEdit ? '编辑行业配置' : '新增行业配置'}
        bordered={false}
        style={{ width: '100%' }}
      >
        <IndustryConfigEdit
          configId={configId}
          isOpen={true}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
        />
        <Space style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            {t('common.button.save')}
          </Button>
          <Button htmlType="button" onClick={handleReset} style={{ marginLeft: 8 }}>
            {t('common.button.reset')}
          </Button>
          <Button htmlType="button" onClick={handleBack} style={{ marginLeft: 8 }}>
            {t('common.button.back')}
          </Button>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default IndustryConfigEditPage;
