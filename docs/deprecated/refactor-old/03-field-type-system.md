# 字段类型系统方案

## 📋 文档信息

- **模块**: 字段类型系统
- **优先级**: P0
- **预计工时**: 5-6 工作日
- **依赖**: 01-data-model-refactor
- **负责人**: 待分配

---

## 🎯 改造目标

实现一个**可扩展的字段类型系统**，支持：

1. ✅ 15+ 内置字段类型
2. ✅ 统一的字段类型接口
3. ✅ 字段类型注册器
4. ✅ 字段验证框架
5. ✅ 自定义字段类型扩展
6. ✅ 字段渲染组件
7. ✅ 字段值处理和转换

---

## 🏗️ 核心架构

### 字段类型基类

```typescript
/**
 * 字段类型基类
 * 文件位置: src/core/field-types/base-field-type.ts
 */

import { Entity } from '@/common/data_type/generic/entity';

export interface FieldTypeConfig {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
  hidden?: boolean;

  // 验证规则
  validation?: FieldValidationRule[];

  // 字段特定配置
  config?: Record<string, any>;

  // 显示条件
  visibleWhen?: FieldCondition;

  // 字段依赖
  dependencies?: string[];
}

export interface FieldValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any, entity: Entity) => boolean | Promise<boolean>;
}

export interface FieldCondition {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'in' | 'notIn' | 'contains';
  value: any;
}

export interface FieldRenderProps {
  config: FieldTypeConfig;
  value: any;
  onChange: (value: any) => void;
  entity: Entity;
  disabled?: boolean;
  errors?: string[];
}

/**
 * 字段类型基类
 */
export abstract class BaseFieldType {
  /**
   * 字段类型唯一标识
   */
  abstract readonly type: string;

  /**
   * 字段类型显示名称
   */
  abstract readonly displayName: string;

  /**
   * 字段类型描述
   */
  abstract readonly description: string;

  /**
   * 字段类型图标
   */
  abstract readonly icon: string;

  /**
   * 验证字段值
   */
  async validate(
    value: any,
    config: FieldTypeConfig,
    entity: Entity
  ): Promise<string[]> {
    const errors: string[] = [];

    if (!config.validation) return errors;

    for (const rule of config.validation) {
      const error = await this.validateRule(value, rule, entity);
      if (error) {
        errors.push(error);
      }
    }

    return errors;
  }

  /**
   * 验证单个规则
   */
  protected async validateRule(
    value: any,
    rule: FieldValidationRule,
    entity: Entity
  ): Promise<string | null> {
    switch (rule.type) {
      case 'required':
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return rule.message || '此字段为必填项';
        }
        break;

      case 'min':
        if (typeof value === 'number' && value < rule.value) {
          return rule.message || `值不能小于 ${rule.value}`;
        }
        if (typeof value === 'string' && value.length < rule.value) {
          return rule.message || `长度不能小于 ${rule.value}`;
        }
        break;

      case 'max':
        if (typeof value === 'number' && value > rule.value) {
          return rule.message || `值不能大于 ${rule.value}`;
        }
        if (typeof value === 'string' && value.length > rule.value) {
          return rule.message || `长度不能大于 ${rule.value}`;
        }
        break;

      case 'pattern':
        if (typeof value === 'string' && !new RegExp(rule.value).test(value)) {
          return rule.message || '格式不正确';
        }
        break;

      case 'custom':
        if (rule.validator) {
          const isValid = await rule.validator(value, entity);
          if (!isValid) {
            return rule.message || '验证失败';
          }
        }
        break;
    }

    return null;
  }

  /**
   * 格式化显示值
   */
  formatValue(value: any, config: FieldTypeConfig): string {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  /**
   * 解析输入值
   */
  parseValue(value: any, config: FieldTypeConfig): any {
    return value;
  }

  /**
   * 获取默认值
   */
  getDefaultValue(config: FieldTypeConfig): any {
    return config.defaultValue ?? null;
  }

  /**
   * 渲染字段（返回 React 组件）
   */
  abstract render(props: FieldRenderProps): React.ReactNode;

  /**
   * 渲染预览（只读模式）
   */
  renderPreview(value: any, config: FieldTypeConfig): React.ReactNode {
    return this.formatValue(value, config);
  }

  /**
   * 导出为普通对象（用于序列化）
   */
  serialize(value: any): any {
    return value;
  }

  /**
   * 从普通对象导入（用于反序列化）
   */
  deserialize(data: any): any {
    return data;
  }
}
```

---

## 📦 内置字段类型实现

### 1. 文本字段 (TextField)

```typescript
/**
 * 文本字段
 * 文件位置: src/core/field-types/text-field.ts
 */

import React from 'react';
import { Input } from 'antd';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export class TextField extends BaseFieldType {
  readonly type = 'text';
  readonly displayName = '文本';
  readonly description = '单行文本输入';
  readonly icon = 'FontSizeOutlined';

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled, errors } = props;

    return (
      <Input
        placeholder={config.placeholder}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || config.disabled}
        maxLength={config.config?.maxLength}
        status={errors && errors.length > 0 ? 'error' : undefined}
      />
    );
  }
}
```

### 2. 数字字段 (NumberField)

```typescript
/**
 * 数字字段
 * 文件位置: src/core/field-types/number-field.ts
 */

import React from 'react';
import { InputNumber } from 'antd';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export class NumberField extends BaseFieldType {
  readonly type = 'number';
  readonly displayName = '数字';
  readonly description = '数字输入';
  readonly icon = 'NumberOutlined';

  parseValue(value: any): number | null {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(value);
    return isNaN(num) ? null : num;
  }

  formatValue(value: any): string {
    if (value === null || value === undefined) return '';
    return String(value);
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled, errors } = props;

    return (
      <InputNumber
        placeholder={config.placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled || config.disabled}
        min={config.config?.min}
        max={config.config?.max}
        step={config.config?.step || 1}
        precision={config.config?.precision}
        style={{ width: '100%' }}
        status={errors && errors.length > 0 ? 'error' : undefined}
      />
    );
  }
}
```

### 3. 日期字段 (DateField)

```typescript
/**
 * 日期字段
 * 文件位置: src/core/field-types/date-field.ts
 */

import React from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export class DateField extends BaseFieldType {
  readonly type = 'date';
  readonly displayName = '日期';
  readonly description = '日期选择';
  readonly icon = 'CalendarOutlined';

  parseValue(value: any): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;
    return dayjs(value).toDate();
  }

  formatValue(value: any, config: FieldTypeConfig): string {
    if (!value) return '';
    const format = config.config?.format || 'YYYY-MM-DD';
    return dayjs(value).format(format);
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled, errors } = props;
    const format = config.config?.format || 'YYYY-MM-DD';

    return (
      <DatePicker
        placeholder={config.placeholder}
        value={value ? dayjs(value) : null}
        onChange={(date) => onChange(date?.toDate() || null)}
        disabled={disabled || config.disabled}
        format={format}
        showTime={config.config?.showTime}
        style={{ width: '100%' }}
        status={errors && errors.length > 0 ? 'error' : undefined}
      />
    );
  }

  serialize(value: any): string | null {
    if (!value) return null;
    return dayjs(value).toISOString();
  }

  deserialize(data: any): Date | null {
    if (!data) return null;
    return dayjs(data).toDate();
  }
}
```

### 4. 选择字段 (SelectField)

```typescript
/**
 * 选择字段
 * 文件位置: src/core/field-types/select-field.ts
 */

import React from 'react';
import { Select } from 'antd';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export interface SelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

export class SelectField extends BaseFieldType {
  readonly type = 'select';
  readonly displayName = '单选';
  readonly description = '下拉单选';
  readonly icon = 'SelectOutlined';

  formatValue(value: any, config: FieldTypeConfig): string {
    const options: SelectOption[] = config.config?.options || [];
    const option = options.find((opt) => opt.value === value);
    return option?.label || String(value);
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled, errors } = props;
    const options: SelectOption[] = config.config?.options || [];

    return (
      <Select
        placeholder={config.placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled || config.disabled}
        allowClear={!config.required}
        showSearch={config.config?.searchable}
        style={{ width: '100%' }}
        status={errors && errors.length > 0 ? 'error' : undefined}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
```

### 5. 多选字段 (MultiSelectField)

```typescript
/**
 * 多选字段
 * 文件位置: src/core/field-types/multi-select-field.ts
 */

import React from 'react';
import { Select } from 'antd';
import { BaseFieldType, FieldRenderProps } from './base-field-type';
import { SelectOption } from './select-field';

export class MultiSelectField extends BaseFieldType {
  readonly type = 'multi-select';
  readonly displayName = '多选';
  readonly description = '下拉多选';
  readonly icon = 'CheckSquareOutlined';

  getDefaultValue(): any[] {
    return [];
  }

  formatValue(value: any[], config: FieldTypeConfig): string {
    if (!Array.isArray(value) || value.length === 0) return '';
    const options: SelectOption[] = config.config?.options || [];
    const labels = value
      .map((v) => options.find((opt) => opt.value === v)?.label || v)
      .filter(Boolean);
    return labels.join(', ');
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled, errors } = props;
    const options: SelectOption[] = config.config?.options || [];

    return (
      <Select
        mode="multiple"
        placeholder={config.placeholder}
        value={value || []}
        onChange={onChange}
        disabled={disabled || config.disabled}
        allowClear
        showSearch={config.config?.searchable}
        maxTagCount={config.config?.maxTagCount}
        style={{ width: '100%' }}
        status={errors && errors.length > 0 ? 'error' : undefined}
      >
        {options.map((option) => (
          <Select.Option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Option>
        ))}
      </Select>
    );
  }
}
```

### 6. 文件字段 (FileField)

```typescript
/**
 * 文件字段
 * 文件位置: src/core/field-types/file-field.ts
 */

import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export interface FileValue {
  uid: string;
  name: string;
  url: string;
  size?: number;
  type?: string;
}

export class FileField extends BaseFieldType {
  readonly type = 'file';
  readonly displayName = '文件';
  readonly description = '文件上传';
  readonly icon = 'FileOutlined';

  getDefaultValue(): FileValue[] {
    return [];
  }

  formatValue(value: FileValue[]): string {
    if (!Array.isArray(value) || value.length === 0) return '';
    return value.map((f) => f.name).join(', ');
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled, errors } = props;
    const maxCount = config.config?.maxCount || 1;
    const accept = config.config?.accept;

    const fileList = Array.isArray(value) ? value : [];

    return (
      <Upload
        fileList={fileList}
        onChange={({ fileList }) => onChange(fileList)}
        disabled={disabled || config.disabled}
        maxCount={maxCount}
        accept={accept}
        beforeUpload={() => false} // 阻止自动上传
      >
        <Button icon={<UploadOutlined />} disabled={disabled || config.disabled}>
          {config.placeholder || '选择文件'}
        </Button>
      </Upload>
    );
  }

  renderPreview(value: FileValue[]): React.ReactNode {
    if (!Array.isArray(value) || value.length === 0) {
      return <span style={{ color: '#999' }}>无文件</span>;
    }

    return (
      <div>
        {value.map((file) => (
          <div key={file.uid}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.name}
            </a>
          </div>
        ))}
      </div>
    );
  }
}
```

### 7. 图片字段 (ImageField)

```typescript
/**
 * 图片字段
 * 文件位置: src/core/field-types/image-field.ts
 */

import React from 'react';
import { Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export class ImageField extends BaseFieldType {
  readonly type = 'image';
  readonly displayName = '图片';
  readonly description = '图片上传';
  readonly icon = 'PictureOutlined';

  getDefaultValue(): any[] {
    return [];
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled } = props;
    const maxCount = config.config?.maxCount || 1;

    const fileList = Array.isArray(value) ? value : [];

    return (
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={({ fileList }) => onChange(fileList)}
        disabled={disabled || config.disabled}
        maxCount={maxCount}
        accept="image/*"
        beforeUpload={() => false}
      >
        {fileList.length < maxCount && (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
          </div>
        )}
      </Upload>
    );
  }

  renderPreview(value: any[]): React.ReactNode {
    if (!Array.isArray(value) || value.length === 0) {
      return <span style={{ color: '#999' }}>无图片</span>;
    }

    return (
      <Image.PreviewGroup>
        {value.map((file) => (
          <Image
            key={file.uid}
            src={file.url}
            width={100}
            height={100}
            style={{ objectFit: 'cover' }}
          />
        ))}
      </Image.PreviewGroup>
    );
  }
}
```

### 8. 位置字段 (LocationField)

```typescript
/**
 * 位置字段 (GPS定位)
 * 文件位置: src/core/field-types/location-field.ts
 */

import React, { useState } from 'react';
import { Button, Space, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export interface LocationValue {
  latitude: number;
  longitude: number;
  address?: string;
  accuracy?: number;
}

export class LocationField extends BaseFieldType {
  readonly type = 'location';
  readonly displayName = '位置';
  readonly description = 'GPS定位';
  readonly icon = 'EnvironmentOutlined';

  formatValue(value: LocationValue): string {
    if (!value) return '';
    if (value.address) return value.address;
    return `${value.latitude}, ${value.longitude}`;
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled } = props;
    const [loading, setLoading] = useState(false);

    const getCurrentLocation = () => {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onChange({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
          setLoading(false);
        },
        (error) => {
          console.error('获取位置失败:', error);
          setLoading(false);
        }
      );
    };

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          icon={<EnvironmentOutlined />}
          onClick={getCurrentLocation}
          loading={loading}
          disabled={disabled || config.disabled}
        >
          获取当前位置
        </Button>
        {value && (
          <div>
            <div>经度: {value.longitude}</div>
            <div>纬度: {value.latitude}</div>
            {value.address && <div>地址: {value.address}</div>}
          </div>
        )}
      </Space>
    );
  }
}
```

### 9. 签名字段 (SignatureField)

```typescript
/**
 * 签名字段
 * 文件位置: src/core/field-types/signature-field.ts
 */

import React, { useRef } from 'react';
import { Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export class SignatureField extends BaseFieldType {
  readonly type = 'signature';
  readonly displayName = '签名';
  readonly description = '电子签名';
  readonly icon = 'EditOutlined';

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleClear = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      }
      onChange(null);
    };

    const handleSave = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dataUrl = canvas.toDataURL();
        onChange(dataUrl);
      }
    };

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={200}
          style={{
            border: '1px solid #d9d9d9',
            borderRadius: 4,
            cursor: disabled ? 'not-allowed' : 'crosshair',
          }}
        />
        <Space>
          <Button onClick={handleSave} disabled={disabled}>
            保存签名
          </Button>
          <Button onClick={handleClear} icon={<DeleteOutlined />} disabled={disabled}>
            清除
          </Button>
        </Space>
        {value && (
          <img src={value} alt="签名" style={{ maxWidth: '100%', marginTop: 8 }} />
        )}
      </Space>
    );
  }

  renderPreview(value: string): React.ReactNode {
    if (!value) return <span style={{ color: '#999' }}>未签名</span>;
    return <img src={value} alt="签名" style={{ maxWidth: 200 }} />;
  }
}
```

### 10. 表格字段 (TableField)

```typescript
/**
 * 表格字段 (动态表格)
 * 文件位置: src/core/field-types/table-field.ts
 */

import React from 'react';
import { Table, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { BaseFieldType, FieldRenderProps } from './base-field-type';

export interface TableColumn {
  name: string;
  label: string;
  type: string;
  width?: number;
}

export class TableField extends BaseFieldType {
  readonly type = 'table';
  readonly displayName = '表格';
  readonly description = '动态表格';
  readonly icon = 'TableOutlined';

  getDefaultValue(): any[] {
    return [];
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled } = props;
    const columns: TableColumn[] = config.config?.columns || [];
    const dataSource = Array.isArray(value) ? value : [];

    const handleAdd = () => {
      const newRow = columns.reduce((acc, col) => {
        acc[col.name] = null;
        return acc;
      }, {} as any);
      onChange([...dataSource, { ...newRow, __id: Date.now() }]);
    };

    const handleDelete = (record: any) => {
      onChange(dataSource.filter((row) => row.__id !== record.__id));
    };

    const tableColumns = [
      ...columns.map((col) => ({
        title: col.label,
        dataIndex: col.name,
        key: col.name,
        width: col.width,
      })),
      {
        title: '操作',
        key: 'action',
        width: 100,
        render: (_: any, record: any) => (
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={disabled}
          >
            删除
          </Button>
        ),
      },
    ];

    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={tableColumns}
          pagination={false}
          rowKey="__id"
          size="small"
        />
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          disabled={disabled}
          style={{ marginTop: 8, width: '100%' }}
        >
          添加行
        </Button>
      </div>
    );
  }
}
```

---

## 🔧 字段类型注册器

```typescript
/**
 * 字段类型注册器
 * 文件位置: src/core/field-type-registry.ts
 */

import { BaseFieldType } from './field-types/base-field-type';

export class FieldTypeRegistry {
  private static instance: FieldTypeRegistry;
  private fieldTypes: Map<string, BaseFieldType> = new Map();

  private constructor() {}

  /**
   * 获取单例实例
   */
  static getInstance(): FieldTypeRegistry {
    if (!FieldTypeRegistry.instance) {
      FieldTypeRegistry.instance = new FieldTypeRegistry();
    }
    return FieldTypeRegistry.instance;
  }

  /**
   * 注册字段类型
   */
  register(fieldType: BaseFieldType): void {
    if (this.fieldTypes.has(fieldType.type)) {
      console.warn(`Field type "${fieldType.type}" is already registered. Overwriting...`);
    }
    this.fieldTypes.set(fieldType.type, fieldType);
  }

  /**
   * 批量注册字段类型
   */
  registerMany(fieldTypes: BaseFieldType[]): void {
    fieldTypes.forEach((ft) => this.register(ft));
  }

  /**
   * 获取字段类型
   */
  get(type: string): BaseFieldType | undefined {
    return this.fieldTypes.get(type);
  }

  /**
   * 检查字段类型是否已注册
   */
  has(type: string): boolean {
    return this.fieldTypes.has(type);
  }

  /**
   * 获取所有字段类型
   */
  getAll(): BaseFieldType[] {
    return Array.from(this.fieldTypes.values());
  }

  /**
   * 获取字段类型列表（用于选择器）
   */
  getFieldTypeOptions(): Array<{
    type: string;
    displayName: string;
    description: string;
    icon: string;
  }> {
    return this.getAll().map((ft) => ({
      type: ft.type,
      displayName: ft.displayName,
      description: ft.description,
      icon: ft.icon,
    }));
  }

  /**
   * 注销字段类型
   */
  unregister(type: string): void {
    this.fieldTypes.delete(type);
  }

  /**
   * 清空所有字段类型
   */
  clear(): void {
    this.fieldTypes.clear();
  }
}

/**
 * 导出单例实例
 */
export const fieldTypeRegistry = FieldTypeRegistry.getInstance();
```

---

## 🚀 初始化和使用

```typescript
/**
 * 初始化字段类型系统
 * 文件位置: src/core/initialize-field-types.ts
 */

import { fieldTypeRegistry } from './field-type-registry';
import { TextField } from './field-types/text-field';
import { NumberField } from './field-types/number-field';
import { DateField } from './field-types/date-field';
import { SelectField } from './field-types/select-field';
import { MultiSelectField } from './field-types/multi-select-field';
import { FileField } from './field-types/file-field';
import { ImageField } from './field-types/image-field';
import { LocationField } from './field-types/location-field';
import { SignatureField } from './field-types/signature-field';
import { TableField } from './field-types/table-field';

/**
 * 初始化所有内置字段类型
 */
export function initializeFieldTypes(): void {
  fieldTypeRegistry.registerMany([
    new TextField(),
    new NumberField(),
    new DateField(),
    new SelectField(),
    new MultiSelectField(),
    new FileField(),
    new ImageField(),
    new LocationField(),
    new SignatureField(),
    new TableField(),
    // 可以继续添加更多字段类型...
  ]);
}
```

### 在应用入口初始化

```typescript
/**
 * 在应用入口初始化字段类型
 * 文件位置: src/app.tsx
 */

import { initializeFieldTypes } from '@/core/initialize-field-types';

// 在 app.tsx 中初始化
export async function getInitialState() {
  // 初始化字段类型系统
  initializeFieldTypes();

  return {
    // ... 其他初始状态
  };
}
```

---

## 🎨 字段渲染组件

```typescript
/**
 * 通用字段渲染器
 * 文件位置: src/components/FieldRenderer/index.tsx
 */

import React from 'react';
import { Form } from 'antd';
import { fieldTypeRegistry } from '@/core/field-type-registry';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';
import { Entity } from '@/common/data_type/generic/entity';

export interface FieldRendererProps {
  config: FieldTypeConfig;
  value: any;
  onChange: (value: any) => void;
  entity: Entity;
  disabled?: boolean;
  mode?: 'edit' | 'preview';
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  config,
  value,
  onChange,
  entity,
  disabled,
  mode = 'edit',
}) => {
  const fieldType = fieldTypeRegistry.get(config.type);

  if (!fieldType) {
    console.error(`Unknown field type: ${config.type}`);
    return <div>未知字段类型: {config.type}</div>;
  }

  // 预览模式
  if (mode === 'preview') {
    return <div>{fieldType.renderPreview(value, config)}</div>;
  }

  // 编辑模式
  const [errors, setErrors] = React.useState<string[]>([]);

  const handleChange = async (newValue: any) => {
    onChange(newValue);

    // 验证
    const validationErrors = await fieldType.validate(newValue, config, entity);
    setErrors(validationErrors);
  };

  return (
    <Form.Item
      label={config.label}
      required={config.required}
      validateStatus={errors.length > 0 ? 'error' : undefined}
      help={errors.length > 0 ? errors[0] : undefined}
      hidden={config.hidden}
    >
      {fieldType.render({
        config,
        value,
        onChange: handleChange,
        entity,
        disabled: disabled || config.disabled,
        errors,
      })}
    </Form.Item>
  );
};
```

---

## 🧪 单元测试示例

```typescript
/**
 * 字段类型单元测试
 * 文件位置: tests/unit/field-types/text-field.test.ts
 */

import { TextField } from '@/core/field-types/text-field';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';

describe('TextField', () => {
  let textField: TextField;

  beforeEach(() => {
    textField = new TextField();
  });

  test('should have correct type', () => {
    expect(textField.type).toBe('text');
  });

  test('should validate required field', async () => {
    const config: FieldTypeConfig = {
      name: 'name',
      type: 'text',
      label: '姓名',
      required: true,
      validation: [{ type: 'required' }],
    };

    const errors = await textField.validate('', config, {} as any);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('必填');
  });

  test('should validate max length', async () => {
    const config: FieldTypeConfig = {
      name: 'name',
      type: 'text',
      label: '姓名',
      validation: [{ type: 'max', value: 10, message: '长度不能超过10' }],
    };

    const errors = await textField.validate('12345678901', config, {} as any);
    expect(errors).toHaveLength(1);
    expect(errors[0]).toContain('10');
  });

  test('should pass validation', async () => {
    const config: FieldTypeConfig = {
      name: 'name',
      type: 'text',
      label: '姓名',
      validation: [
        { type: 'required' },
        { type: 'max', value: 10 },
      ],
    };

    const errors = await textField.validate('张三', config, {} as any);
    expect(errors).toHaveLength(0);
  });

  test('should format value', () => {
    const formatted = textField.formatValue('Hello', {} as any);
    expect(formatted).toBe('Hello');
  });

  test('should handle null value', () => {
    const formatted = textField.formatValue(null, {} as any);
    expect(formatted).toBe('');
  });
});
```

```typescript
/**
 * 字段类型注册器测试
 * 文件位置: tests/unit/field-type-registry.test.ts
 */

import { FieldTypeRegistry } from '@/core/field-type-registry';
import { TextField } from '@/core/field-types/text-field';
import { NumberField } from '@/core/field-types/number-field';

describe('FieldTypeRegistry', () => {
  let registry: FieldTypeRegistry;

  beforeEach(() => {
    registry = FieldTypeRegistry.getInstance();
    registry.clear();
  });

  test('should register field type', () => {
    const textField = new TextField();
    registry.register(textField);

    expect(registry.has('text')).toBe(true);
    expect(registry.get('text')).toBe(textField);
  });

  test('should register multiple field types', () => {
    registry.registerMany([new TextField(), new NumberField()]);

    expect(registry.has('text')).toBe(true);
    expect(registry.has('number')).toBe(true);
    expect(registry.getAll()).toHaveLength(2);
  });

  test('should unregister field type', () => {
    registry.register(new TextField());
    expect(registry.has('text')).toBe(true);

    registry.unregister('text');
    expect(registry.has('text')).toBe(false);
  });

  test('should get field type options', () => {
    registry.registerMany([new TextField(), new NumberField()]);

    const options = registry.getFieldTypeOptions();
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveProperty('type');
    expect(options[0]).toHaveProperty('displayName');
    expect(options[0]).toHaveProperty('icon');
  });
});
```

---

## 📦 实施步骤

### 步骤 1: 创建目录结构

```bash
# 创建目录
mkdir -p src/core/field-types
mkdir -p src/components/FieldRenderer
mkdir -p tests/unit/field-types

# 创建文件
touch src/core/field-types/base-field-type.ts
touch src/core/field-type-registry.ts
touch src/core/initialize-field-types.ts
```

### 步骤 2: 实现基类和注册器

1. 实现 `BaseFieldType` 抽象类
2. 实现 `FieldTypeRegistry` 单例
3. 创建初始化函数

### 步骤 3: 实现内置字段类型

按优先级实现字段类型：
1. **P0**: TextField, NumberField, DateField, SelectField
2. **P1**: MultiSelectField, FileField, ImageField
3. **P2**: LocationField, SignatureField, TableField

### 步骤 4: 创建字段渲染组件

实现 `FieldRenderer` 组件，支持：
- 编辑模式
- 预览模式
- 验证显示

### 步骤 5: 编写单元测试

为每个字段类型编写测试：
- 验证规则测试
- 值格式化测试
- 序列化/反序列化测试

### 步骤 6: 集成到应用

在应用入口初始化字段类型系统。

---

## ✅ 验收标准

- [ ] BaseFieldType 基类实现完整
- [ ] 至少实现 10 种内置字段类型
- [ ] FieldTypeRegistry 注册器正常工作
- [ ] 字段验证框架可用
- [ ] 支持自定义字段类型扩展
- [ ] FieldRenderer 组件可用
- [ ] 单元测试覆盖率 > 80%
- [ ] 所有字段类型可序列化/反序列化
- [ ] 支持编辑和预览两种模式

---

## 🔄 扩展示例

### 自定义字段类型

```typescript
/**
 * 自定义评分字段
 * 文件位置: src/custom-fields/rating-field.ts
 */

import React from 'react';
import { Rate } from 'antd';
import { BaseFieldType, FieldRenderProps } from '@/core/field-types/base-field-type';

export class RatingField extends BaseFieldType {
  readonly type = 'rating';
  readonly displayName = '评分';
  readonly description = '星级评分';
  readonly icon = 'StarOutlined';

  getDefaultValue(): number {
    return 0;
  }

  formatValue(value: number): string {
    return `${value} 星`;
  }

  render(props: FieldRenderProps): React.ReactNode {
    const { config, value, onChange, disabled } = props;

    return (
      <Rate
        value={value || 0}
        onChange={onChange}
        disabled={disabled || config.disabled}
        count={config.config?.count || 5}
        allowHalf={config.config?.allowHalf}
      />
    );
  }
}

// 注册自定义字段类型
import { fieldTypeRegistry } from '@/core/field-type-registry';
fieldTypeRegistry.register(new RatingField());
```

---

**版本**: v1.0
**创建日期**: 2025-01-13
