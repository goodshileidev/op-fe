/**
 * Tiger Cloud v4.0 - 行业配置编辑组件
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import React, { useEffect, useState } from 'react';
import { Form, Input, message, Select, Row, Col, Alert, Button } from 'antd';
import {
  createIndustryConfig,
  getIndustryConfigById,
  updateIndustryConfig
} from '@/common/service/config/industry_config';
import { IndustryConfigType } from '@/common/data_type/config/industry_config';
import { useTranslation } from 'react-i18next';
import { history } from 'umi';

const { TextArea } = Input;

interface IIndustryConfigEditProps {
  configId: string;
  needReset: number;
  needSubmit: number;
  onUpdate: any;
  isOpen: boolean;
}

const IndustryConfigEdit: React.FC<IIndustryConfigEditProps> = (props) => {
  const { configId, needReset, needSubmit } = props;
  const [configForm] = Form.useForm();
  const isEdit = configId !== undefined && configId !== '' && configId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [configData, setConfigData] = useState<IndustryConfigType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();

  const getConfigDetail = async (id: string) => {
    setLoading(true);
    try {
      const response = await getIndustryConfigById(Number(id));
      const { data, code } = response;
      if (code === 200 && data) {
        // configJson 已经被 service 层解析为对象，需要转回字符串用于编辑
        if (data.configJson && typeof data.configJson === 'object') {
          data.configJson = JSON.stringify(data.configJson, null, 2);
        }
        configForm.setFieldsValue({ ...data });
        setConfigData(data);
      } else {
        setConfigData(null);
        message.error('加载配置失败');
      }
    } catch (error) {
      message.error('加载配置失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (configId && configId !== '' && configId !== '0') {
      getConfigDetail(configId);
    } else {
      // 新建时的默认值
      const newData: IndustryConfigType = {
        industryType: '',
        industryName: '',
        configJson: JSON.stringify({
          fields: [
            {
              code: 'field1',
              name: '字段1',
              type: 'text',
              required: true
            }
          ]
        }, null, 2),
        isActive: true
      };
      setConfigData(newData);
      configForm.setFieldsValue(newData);
    }
  }, [configId]);

  useEffect(() => {
    if (needReset !== 0) {
      configForm.resetFields();
    }
  }, [needReset]);

  useEffect(() => {
    if (needSubmit !== 0) {
      configForm.submit();
    }
  }, [needSubmit]);

  const handleSubmit = async () => {
    try {
      const values = await configForm.validateFields();

      // 验证 configJson 是否为有效 JSON
      try {
        const parsedJson = JSON.parse(values.configJson);
        // 验证是否包含 fields 数组
        if (!parsedJson.fields || !Array.isArray(parsedJson.fields)) {
          message.error('配置JSON必须包含 fields 数组');
          return;
        }
      } catch (e) {
        message.error('配置JSON格式不正确，请检查');
        return;
      }

      if (isEdit && configId && configId !== '0') {
        // 更新
        values.id = Number(configId);
        updateIndustryConfig(values).then((response: any) => {
          const { code, msg } = response;
          if (code === 200) {
            message.success('保存成功');
            if (props.onUpdate) {
              props.onUpdate(true, response.data);
            }
          } else {
            message.error(msg || '保存失败');
          }
        });
      } else {
        // 新增
        createIndustryConfig(values).then((response: any) => {
          const { code, msg } = response;
          if (code === 200) {
            message.success('添加成功');
            if (props.onUpdate) {
              props.onUpdate(true, response.data);
            }
          } else {
            message.error(msg || '添加失败');
          }
        });
      }
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  if (isEdit && configId && (!configData || !configData.id)) {
    return (
      <Alert
        message="加载配置失败"
        description="无法加载配置数据，请重试"
        type="error"
        showIcon
        action={
          <Button
            size="small"
            type="primary"
            onClick={() => history.push('/config/industry_config/industry_config_table')}
          >
            返回列表
          </Button>
        }
      />
    );
  }

  return (
    <Form
      form={configForm}
      labelAlign="right"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 18 }}
      layout="horizontal"
      disabled={formDisabled}
      onFinish={handleSubmit}
    >
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Form.Item
            name="industryType"
            label="场景类型"
            rules={[
              { required: true, message: '请输入场景类型' },
              { pattern: /^[A-Z0-9_]+$/, message: '场景类型只能包含大写字母、数字和下划线' }
            ]}
            extra="场景类型标识，如：SCENARIO_A, SCENARIO_B（仅支持大写字母、数字、下划线）"
          >
            <Input
              placeholder="SCENARIO_A"
              disabled={isEdit}
              maxLength={50}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="industryName"
            label="场景名称"
            rules={[{ required: true, message: '请输入场景名称' }]}
            extra="场景的显示名称，如：场景A"
          >
            <Input placeholder="场景A" maxLength={200} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="configJson"
            label="字段配置"
            rules={[
              { required: true, message: '请输入字段配置JSON' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  try {
                    const parsed = JSON.parse(value);
                    if (!parsed.fields || !Array.isArray(parsed.fields)) {
                      return Promise.reject(new Error('配置必须包含 fields 数组'));
                    }
                    return Promise.resolve();
                  } catch (e) {
                    return Promise.reject(new Error('JSON 格式不正确'));
                  }
                }
              }
            ]}
            extra={
              <div>
                <div>字段配置JSON格式示例：</div>
                <pre style={{ background: '#f5f5f5', padding: '8px', fontSize: '12px' }}>
{`{
  "fields": [
    {
      "code": "objectName",
      "name": "对象名称",
      "type": "text",
      "required": true,
      "maxLength": 200
    },
    {
      "code": "quantity",
      "name": "数量",
      "type": "number",
      "required": false,
      "min": 0
    }
  ]
}`}
                </pre>
              </div>
            }
          >
            <TextArea
              rows={16}
              placeholder="请输入字段配置JSON"
              style={{ fontFamily: 'monospace' }}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="isActive"
            label="启用状态"
            rules={[{ required: true, message: '请选择启用状态' }]}
          >
            <Select
              options={[
                { label: '启用', value: true },
                { label: '禁用', value: false }
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default IndustryConfigEdit;
