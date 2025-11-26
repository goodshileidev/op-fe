/**
 * Tiger Cloud v4.0 - 行业配置搜索组件
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useState } from 'react';
import { Button, Card, Col, Form, Input, Row, Select, Space } from 'antd';
import { useTranslation } from 'react-i18next';

interface IIndustryConfigSearchProps {
  onReloadTable: any;
  setCurrentConditions: any;
  onAdd: any;
  pagination?: any;
}

const IndustryConfigSearch: React.FC<IIndustryConfigSearchProps> = (props) => {
  const pagination = props.pagination;
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({});
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleAdd = () => {
    props.onAdd();
  };

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
      <Card title="行业配置查询" bordered={true}>
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
                name="industryType"
                label="场景类型"
                style={{ maxWidth: 500 }}
              >
                <Input placeholder="场景类型（如：SCENARIO_A）" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="industryName"
                label="场景名称"
                style={{ maxWidth: 500 }}
              >
                <Input placeholder="场景名称" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="isActive"
                label="启用状态"
                style={{ maxWidth: 500 }}
              >
                <Select
                  allowClear
                  placeholder="请选择启用状态"
                  options={[
                    { label: '全部', value: undefined },
                    { label: '启用', value: true },
                    { label: '禁用', value: false }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="isDeleted"
                label="删除状态"
                style={{ maxWidth: 500 }}
              >
                <Select
                  allowClear
                  placeholder="请选择删除状态"
                  options={[
                    { label: '全部', value: undefined },
                    { label: '正常', value: false },
                    { label: '已删除', value: true }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="createdBy"
                label="创建人"
                style={{ maxWidth: 500 }}
              >
                <Input placeholder="创建人" />
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
          <Space>
            <Button type="primary" onClick={handleAdd}>
              {t('common.button.add')}
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default IndustryConfigSearch;
