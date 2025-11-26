/**
 * 变量输入组件 - 根据 varInputType 动态渲染
 *
 * @file VarInput.tsx
 * @description 通用变量输入组件，支持多种输入类型
 * @created 2025-11-26
 */
import React from 'react';
import { Input, InputNumber, DatePicker, Select, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';

interface VarInputProps {
  varKey: string;
  varName: string;
  varInputType: string;
  varValue?: any;
  options?: Array<{ label: string; value: string }>;
  onChange?: (value: any) => void;
  readOnly?: boolean;
}

const VarInput: React.FC<VarInputProps> = (props) => {
  const { varKey, varName, varInputType, varValue, options, onChange, readOnly } = props;

  // 格式化初始值
  const getInitialValue = () => {
    if (varInputType === 'date' || varInputType === 'time') {
      return varValue ? moment(varValue) : null;
    }
    return varValue;
  };

  // 处理变化
  const handleChange = (value: any) => {
    if (onChange) {
      onChange(value);
    }
  };

  // 根据类型渲染不同组件
  switch (varInputType) {
    case 'text':
      return (
        <Input
          value={varValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={`请输入${varName}`}
          disabled={readOnly}
          style={{ width: '200px' }}
        />
      );

    case 'number':
      return (
        <InputNumber
          value={varValue}
          onChange={handleChange}
          placeholder={`请输入${varName}`}
          disabled={readOnly}
          style={{ width: '200px' }}
        />
      );

    case 'date':
      return (
        <DatePicker
          value={getInitialValue()}
          onChange={handleChange}
          placeholder={`请选择${varName}`}
          disabled={readOnly}
          style={{ width: '200px' }}
        />
      );

    case 'time':
      return (
        <DatePicker
          showTime
          value={getInitialValue()}
          onChange={handleChange}
          placeholder={`请选择${varName}`}
          disabled={readOnly}
          style={{ width: '200px' }}
        />
      );

    case 'select':
      return (
        <Select
          value={varValue}
          onChange={handleChange}
          placeholder={`请选择${varName}`}
          disabled={readOnly}
          style={{ width: '200px' }}
          options={options}
        />
      );

    case 'picture':
    case 'file':
      return (
        <Upload
          fileList={varValue || []}
          onChange={(info) => handleChange(info.fileList)}
          disabled={readOnly}
        >
          <Button icon={<UploadOutlined />}>
            {varInputType === 'picture' ? '上传图片' : '上传文件'}
          </Button>
        </Upload>
      );

    case 'calc':
      // 计算字段：只读显示
      return (
        <span
          style={{
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: '#e6f7ff',
            border: '1px solid #91d5ff',
            borderRadius: '4px',
            color: '#1890ff',
            fontWeight: 500,
          }}
        >
          {varValue || '0.00'}
        </span>
      );

    default:
      return (
        <Input
          value={varValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={`请输入${varName}`}
          disabled={readOnly}
          style={{ width: '200px' }}
        />
      );
  }
};

export default VarInput;
