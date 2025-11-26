/**
 * Tiger Cloud v4.0 - 行业配置详情组件
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useEffect, useState } from 'react';
import { Descriptions, Tag, Spin, Alert, Button, Card } from 'antd';
import { getIndustryConfigById } from '@/common/service/config/industry_config';
import { IndustryConfigType } from '@/common/data_type/config/industry_config';
import { useNavigate } from 'umi';
import { Link } from 'umi';

interface IIndustryConfigDetailProps {
  configId: string;
  isOpen: boolean;
}

const IndustryConfigDetail: React.FC<IIndustryConfigDetailProps> = (props) => {
  const { configId } = props;
  const [configData, setConfigData] = useState<IndustryConfigType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (configId && configId !== '0') {
      loadConfigDetail();
    }
  }, [configId]);

  const loadConfigDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getIndustryConfigById(Number(configId));
      const { data, code } = response;
      if (code === 200 && data) {
        setConfigData(data);
      } else {
        setError('加载配置失败');
      }
    } catch (err) {
      setError('加载配置失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin tip="加载中..." style={{ display: 'block', margin: '40px auto' }} />;
  }

  if (error) {
    return (
      <Alert
        message="加载失败"
        description={error}
        type="error"
        showIcon
        action={
          <Button size="small" onClick={loadConfigDetail}>
            重试
          </Button>
        }
      />
    );
  }

  if (!configData) {
    return <Alert message="未找到配置数据" type="warning" showIcon />;
  }

  return (
    <>
      <Descriptions bordered column={2} size="middle">
        <Descriptions.Item label="ID">{configData.id}</Descriptions.Item>
        <Descriptions.Item label="场景类型">
          <Tag color="blue">{configData.industryType}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="场景名称" span={2}>
          {configData.industryName}
        </Descriptions.Item>
        <Descriptions.Item label="启用状态">
          <Tag color={configData.isActive ? 'green' : 'red'}>
            {configData.isActive ? '启用' : '禁用'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="删除状态">
          <Tag color={configData.isDeleted ? 'red' : 'green'}>
            {configData.isDeleted ? '已删除' : '正常'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="创建人">{configData.createdBy}</Descriptions.Item>
        <Descriptions.Item label="创建时间">{configData.createdTime}</Descriptions.Item>
        <Descriptions.Item label="更新人">{configData.updatedBy || '-'}</Descriptions.Item>
        <Descriptions.Item label="更新时间">{configData.updatedTime || '-'}</Descriptions.Item>
      </Descriptions>

      <Card
        title="字段配置JSON"
        style={{ marginTop: 24 }}
        extra={
          <Link to={`/config/industry_config_version/industry_config_version_table?configId=${configData.id}`}>
            <Button type="link">查看版本历史</Button>
          </Link>
        }
      >
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '4px',
            maxHeight: '600px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}
        >
          {configData.configJson
            ? JSON.stringify(configData.configJson, null, 2)
            : '{}'}
        </pre>
      </Card>
    </>
  );
};

export default IndustryConfigDetail;
