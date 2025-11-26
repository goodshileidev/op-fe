/**
 * Tiger Cloud v4.0 - 配置版本搜索组件
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

interface IIndustryConfigVersionSearchProps {
  onReloadTable: any;
  setCurrentConditions: any;
  pagination?: any;
}

const IndustryConfigVersionSearch: React.FC<IIndustryConfigVersionSearchProps> = (props) => {
  const pagination = props.pagination;
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({});
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    props.setCurrentConditions(values);
    const params = Object.assign({}, values, {
      pageNo: 1,
      pageSize: pagination.pageSize
    });
    props.onReloadTable(params);
  };

  const handleResetSearch = () => {
    const params = Object.assign(
      {},
      {
        pageNo: 1,
        pageSize: pagination.pageSize
      }
    );
    props.setCurrentConditions({});
    props.onReloadTable(params);
    searchForm.resetFields();
  };

  return (
    <div
      style={{
        justifyContent: 'space-between',
        marginBottom: 16
      }}
    >
      <Card title="配置版本查询" bordered={true}>
        <Form
          style={{}}
          size="small"
          form={searchForm}
          labelAlign="right"
          labelCol={{ span: 8, offset: 0 }}
          wrapperCol={{ span: 12, offset: 0 }}
          layout="horizontal"
          initialValues={searchData}
          disabled={formDisabled}
          onFinish={handleSearch}
        >
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="configId"
                label="配置ID"
                style={{ maxWidth: 500 }}
              >
                <Input placeholder="配置ID" type="number" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="industryType"
                label="场景类型"
                style={{ maxWidth: 500 }}
              >
                <Input placeholder="场景类型" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="operationType"
                label="操作类型"
                style={{ maxWidth: 500 }}
              >
                <Select
                  allowClear
                  placeholder="请选择操作类型"
                  options={[
                    { label: '全部', value: undefined },
                    { label: 'CREATE', value: 'CREATE' },
                    { label: 'UPDATE', value: 'UPDATE' },
                    { label: 'DELETE', value: 'DELETE' },
                    { label: 'RESTORE', value: 'RESTORE' },
                    { label: 'ROLLBACK', value: 'ROLLBACK' }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="operator"
                label="操作人"
                style={{ maxWidth: 500 }}
              >
                <Input placeholder="操作人" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
          }}
        >
          <Space>
            <Button type="primary" onClick={handleSearch}>
              {t('common.button.search')}
            </Button>
            <Button type="primary" onClick={handleResetSearch}>
              {t('common.button.reset')}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default IndustryConfigVersionSearch;
