/**
 * Tiger Cloud v4.0 - 配置版本管理主页
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useEffect, useState } from 'react';
import { Button, Card, message, Popconfirm, Spin, TableProps, Tag, Space, Modal } from 'antd';
import { RollbackOutlined, EyeOutlined } from '@ant-design/icons';
import { IndustryConfigVersionType } from '@/common/data_type/config/industry_config';
import { useNavigate, useSearchParams } from 'umi';
import {
  searchIndustryConfigVersion,
  rollbackIndustryConfigVersion
} from '@/common/service/config/industry_config';
import IndustryConfigVersionSearch from './components/industry_config_version_search';
import { useTranslation } from 'react-i18next';
import SuperTable from '@/components/common/super-table';
import { PageContainer } from '@ant-design/pro-components';

const IndustryConfigVersionTablePage: React.FC = () => {
  const [versionList, setVersionList] = useState<IndustryConfigVersionType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState<any>({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [viewJsonModalVisible, setViewJsonModalVisible] = useState(false);
  const [currentViewJson, setCurrentViewJson] = useState<any>(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchVersionList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current;
    params.pageSize = params.pageSize || pagination.pageSize;

    // 从URL参数中获取configId
    const configIdFromUrl = searchParams.get('configId');
    if (configIdFromUrl) {
      params.configId = Number(configIdFromUrl);
    }

    try {
      const response = await searchIndustryConfigVersion(params);
      const { list: records, pageInfo } = response.data;
      const { totalCount, pageNo, pageSize } = pageInfo;
      setVersionList(records);
      setPagination({
        current: pageNo,
        pageSize: pageSize,
        total: totalCount,
        showSizeChanger: true,
        showTotal: true,
        size: 'small',
        pageSizeOptions: [10, 50, 100]
      });
    } catch (error) {
      message.error('查询失败');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params));
    conditions['pageNo'] = 1;
    conditions['pageSize'] = pagination.pageSize;
    setCurrentConditions(conditions);
    fetchVersionList(conditions);
  };

  const handleResetSearch = () => {
    const conditions = {};
    conditions['pageNo'] = 1;
    conditions['pageSize'] = pagination.pageSize;
    setCurrentConditions(conditions);
    fetchVersionList(conditions);
  };

  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current;
    currentConditions['pageSize'] = pagination.pageSize;
    fetchVersionList(currentConditions);
  };

  useEffect(() => {
    fetchVersionList();
  }, []);

  const handleRollback = (row: IndustryConfigVersionType) => {
    if (row.configId && row.id) {
      rollbackIndustryConfigVersion(row.configId, row.id, 'SYSTEM').then((response: any) => {
        const { code } = response;
        if (code === 200) {
          message.success('回滚成功');
          fetchVersionList(currentConditions);
        } else {
          message.error('回滚失败');
        }
      });
    }
  };

  const handleViewJson = (row: IndustryConfigVersionType) => {
    setCurrentViewJson(row.configJson);
    setViewJsonModalVisible(true);
  };

  const getOperationTypeTag = (operationType: string) => {
    const colorMap: Record<string, string> = {
      CREATE: 'green',
      UPDATE: 'blue',
      DELETE: 'red',
      RESTORE: 'orange',
      ROLLBACK: 'purple'
    };
    return <Tag color={colorMap[operationType] || 'default'}>{operationType}</Tag>;
  };

  const columns: TableProps<IndustryConfigVersionType>['columns'] = [
    {
      align: 'center',
      title: '版本ID',
      key: 'id',
      dataIndex: 'id',
      width: '80px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '配置ID',
      key: 'config_id',
      dataIndex: 'configId',
      width: '100px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '场景类型',
      key: 'industry_type',
      dataIndex: 'industryType',
      ellipsis: true,
      width: '150px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '操作类型',
      key: 'operation_type',
      dataIndex: 'operationType',
      width: '120px',
      render: (operationType: string) => getOperationTypeTag(operationType),
      className: 'text_center'
    },
    {
      align: 'center',
      title: '操作人',
      key: 'operator',
      dataIndex: 'operator',
      ellipsis: true,
      width: '120px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '操作时间',
      key: 'operation_time',
      dataIndex: 'operationTime',
      ellipsis: true,
      width: '180px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '变更原因',
      key: 'remark',
      dataIndex: 'remark',
      ellipsis: true,
      width: '200px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: t('common.button.operate'),
      key: 'action',
      width: '200px',
      fixed: 'right',
      render: (text: string, row: IndustryConfigVersionType) => (
        <Space size="small">
          <Button
            size="small"
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewJson(row)}
          >
            查看配置
          </Button>

          <Popconfirm
            title="确认回滚"
            description={`确定要回滚到此版本吗？（版本ID: ${row.id}）`}
            onConfirm={() => handleRollback(row)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" type="link" icon={<RollbackOutlined />}>
              回滚
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <IndustryConfigVersionSearch
        onReloadTable={handleSearch}
        pagination={pagination}
        setCurrentConditions={setCurrentConditions}
      />
      <Card
        title="配置版本列表"
        bordered={true}
        extra={[
          <Button
            key="column-select"
            onClick={() => setIsColumnsSelectOpen(true)}
          >
            {t('common.button.show_hide_column')}
          </Button>
        ]}
      >
        <Spin spinning={loading}>
          <SuperTable
            style={{ width: '100%' }}
            setIsColumnsOpen={setIsColumnsSelectOpen}
            isColumnsSelectOpen={isColumnsSelectOpen}
            tableKey="industry_config_version_table"
            columns={columns}
            dataSource={versionList}
            rowKey="id"
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Spin>
      </Card>

      <Modal
        title="配置JSON详情"
        open={viewJsonModalVisible}
        onCancel={() => setViewJsonModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewJsonModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        <pre
          style={{
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '4px',
            maxHeight: '500px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '13px'
          }}
        >
          {currentViewJson ? JSON.stringify(currentViewJson, null, 2) : '{}'}
        </pre>
      </Modal>
    </PageContainer>
  );
};

export default IndustryConfigVersionTablePage;
