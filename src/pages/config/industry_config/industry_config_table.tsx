/**
 * Tiger Cloud v4.0 - 行业配置管理主页
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useEffect, useState } from 'react';
import { Button, Card, message, Popconfirm, Spin, TableProps, Tag, Space } from 'antd';
import { DeleteFilled, EditFilled, CheckCircleOutlined, CloseCircleOutlined, RollbackOutlined } from '@ant-design/icons';
import { IndustryConfigType } from '@/common/data_type/config/industry_config';
import { Link, useNavigate } from 'umi';
import {
  searchIndustryConfig,
  deleteIndustryConfig,
  enableIndustryConfig,
  disableIndustryConfig,
  restoreIndustryConfig
} from '@/common/service/config/industry_config';
import IndustryConfigSearch from './components/industry_config_search';
import { useTranslation } from 'react-i18next';
import SuperTable from '@/components/common/super-table';
import { PageContainer } from '@ant-design/pro-components';

const IndustryConfigTablePage: React.FC = () => {
  const [configList, setConfigList] = useState<IndustryConfigType[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentConditions, setCurrentConditions] = useState<any>({});
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isColumnsSelectOpen, setIsColumnsSelectOpen] = useState(false);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    showTotal: true,
    size: 'small',
    pageSizeOptions: [10, 50, 100]
  });

  const fetchConfigList = async (params: any = {}) => {
    setLoading(true);
    params.pageNo = params.pageNo || pagination.current;
    params.pageSize = params.pageSize || pagination.pageSize;

    try {
      const response = await searchIndustryConfig(params);
      const { list: records, pageInfo } = response.data;
      const { totalCount, pageNo, pageSize } = pageInfo;
      setConfigList(records);
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

  const handleAdd = () => {
    navigate('/config/industry_config/industry_config_edit_page/0', { replace: true });
  };

  const handleSearch = (params: any) => {
    const conditions = JSON.parse(JSON.stringify(params));
    conditions['pageNo'] = 1;
    conditions['pageSize'] = pagination.pageSize;
    setCurrentConditions(conditions);
    fetchConfigList(conditions);
  };

  const handleResetSearch = () => {
    const conditions = {};
    conditions['pageNo'] = 1;
    conditions['pageSize'] = pagination.pageSize;
    setCurrentConditions(conditions);
    fetchConfigList(conditions);
  };

  const handleTableChange = (pagination: any) => {
    currentConditions['pageNo'] = pagination.current;
    currentConditions['pageSize'] = pagination.pageSize;
    fetchConfigList(currentConditions);
  };

  useEffect(() => {
    fetchConfigList();
  }, []);

  const handleDelete = (row: IndustryConfigType) => {
    if (row.id) {
      deleteIndustryConfig(row.id).then((response: any) => {
        const { code } = response;
        if (code === 200) {
          message.success('删除成功');
          fetchConfigList(currentConditions);
        }
      });
    }
  };

  const handleEnable = (row: IndustryConfigType) => {
    if (row.id) {
      enableIndustryConfig(row.id).then((response: any) => {
        const { code } = response;
        if (code === 200) {
          message.success('启用成功');
          fetchConfigList(currentConditions);
        }
      });
    }
  };

  const handleDisable = (row: IndustryConfigType) => {
    if (row.id) {
      disableIndustryConfig(row.id).then((response: any) => {
        const { code } = response;
        if (code === 200) {
          message.success('禁用成功');
          fetchConfigList(currentConditions);
        }
      });
    }
  };

  const handleRestore = (row: IndustryConfigType) => {
    if (row.id) {
      restoreIndustryConfig(row.id).then((response: any) => {
        const { code } = response;
        if (code === 200) {
          message.success('恢复成功');
          fetchConfigList(currentConditions);
        }
      });
    }
  };

  const columns: TableProps<IndustryConfigType>['columns'] = [
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
      title: '场景名称',
      key: 'industry_name',
      dataIndex: 'industryName',
      ellipsis: true,
      width: '200px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '状态',
      key: 'is_active',
      dataIndex: 'isActive',
      width: '100px',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '启用' : '禁用'}
        </Tag>
      ),
      className: 'text_center'
    },
    {
      align: 'center',
      title: '删除状态',
      key: 'is_deleted',
      dataIndex: 'isDeleted',
      width: '100px',
      render: (isDeleted: boolean) => (
        <Tag color={isDeleted ? 'red' : 'green'}>
          {isDeleted ? '已删除' : '正常'}
        </Tag>
      ),
      className: 'text_center'
    },
    {
      align: 'center',
      title: '创建人',
      key: 'created_by',
      dataIndex: 'createdBy',
      ellipsis: true,
      width: '120px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: '创建时间',
      key: 'created_time',
      dataIndex: 'createdTime',
      ellipsis: true,
      width: '180px',
      className: 'text_center'
    },
    {
      align: 'center',
      title: t('common.button.operate'),
      key: 'action',
      width: '320px',
      fixed: 'right',
      render: (text: string, row: IndustryConfigType) => (
        <Space size="small">
          <Link to={`/config/industry_config/industry_config_detail_page/${row.id}`}>
            <Button size="small" type="link">详情</Button>
          </Link>

          {!row.isDeleted && (
            <>
              <Link to={`/config/industry_config/industry_config_edit_page/${row.id}`}>
                <Button size="small" type="link" icon={<EditFilled />}>编辑</Button>
              </Link>

              {row.isActive ? (
                <Button
                  size="small"
                  type="link"
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleDisable(row)}
                >
                  禁用
                </Button>
              ) : (
                <Button
                  size="small"
                  type="link"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleEnable(row)}
                >
                  启用
                </Button>
              )}

              <Popconfirm
                title="确认删除"
                description="确定要删除这条配置吗？"
                onConfirm={() => handleDelete(row)}
                okText="确定"
                cancelText="取消"
              >
                <Button size="small" icon={<DeleteFilled />} type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            </>
          )}

          {row.isDeleted && (
            <Button
              size="small"
              type="link"
              icon={<RollbackOutlined />}
              onClick={() => handleRestore(row)}
            >
              恢复
            </Button>
          )}
        </Space>
      )
    }
  ];

  return (
    <PageContainer>
      <IndustryConfigSearch
        onAdd={handleAdd}
        onReloadTable={handleSearch}
        pagination={pagination}
        setCurrentConditions={setCurrentConditions}
      />
      <Card
        title="行业配置列表"
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
            tableKey="industry_config_table"
            columns={columns}
            dataSource={configList}
            rowKey="id"
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Spin>
      </Card>
    </PageContainer>
  );
};

export default IndustryConfigTablePage;
