# 通用表单渲染器方案

## 📋 文档信息

- **模块**: 通用表单渲染器
- **优先级**: P0
- **预计工时**: 7-8 工作日
- **依赖**: 03-field-type-system, 04-rule-engine
- **负责人**: 待分配

---

## 🎯 改造目标

实现一个**通用的表单渲染引擎**，支持：

1. ✅ 基于配置的动态表单渲染
2. ✅ 多种布局模式 (Grid/Flex/Tabs/Steps/Collapse)
3. ✅ 字段联动和依赖处理
4. ✅ 实时验证和错误提示
5. ✅ 计算规则自动执行
6. ✅ 条件显示/隐藏
7. ✅ 性能优化（虚拟化、懒加载）
8. ✅ 表单状态管理

---

## 🏗️ 核心架构

### 表单配置接口

```typescript
/**
 * 表单配置接口
 * 文件位置: src/components/GenericFormRenderer/types.ts
 */

import { FieldTypeConfig } from '@/core/field-types/base-field-type';
import { ValidationRule, CalculationRule, ConditionalRule } from '@/core/rules/types';

/**
 * 表单配置
 */
export interface FormConfig {
  id: string;
  name: string;
  title: string;
  description?: string;

  // 布局配置
  layout: FormLayout;

  // 字段配置
  fields: FieldTypeConfig[];

  // 规则配置
  rules?: {
    validation?: ValidationRule[];
    calculation?: CalculationRule[];
    conditional?: ConditionalRule[];
  };

  // 提交配置
  submit?: {
    url?: string;
    method?: 'POST' | 'PUT';
    transform?: (data: any) => any;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  };
}

/**
 * 布局配置
 */
export interface FormLayout {
  type: 'grid' | 'flex' | 'tabs' | 'steps' | 'collapse';
  config?: GridLayoutConfig | FlexLayoutConfig | TabsLayoutConfig | StepsLayoutConfig | CollapseLayoutConfig;
}

/**
 * 网格布局配置
 */
export interface GridLayoutConfig {
  columns: number;  // 列数 (1-4)
  gutter: [number, number];  // 水平和垂直间距
  responsive?: {
    xs?: number;  // < 576px
    sm?: number;  // ≥ 576px
    md?: number;  // ≥ 768px
    lg?: number;  // ≥ 992px
    xl?: number;  // ≥ 1200px
    xxl?: number; // ≥ 1600px
  };
}

/**
 * 弹性布局配置
 */
export interface FlexLayoutConfig {
  direction: 'horizontal' | 'vertical';
  wrap?: boolean;
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between';
  align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  gap?: number;
}

/**
 * 标签页布局配置
 */
export interface TabsLayoutConfig {
  tabs: FormTab[];
  tabPosition?: 'top' | 'left' | 'right' | 'bottom';
  animated?: boolean;
}

export interface FormTab {
  key: string;
  label: string;
  icon?: string;
  fields: string[];  // 字段名称列表
}

/**
 * 步骤布局配置
 */
export interface StepsLayoutConfig {
  steps: FormStep[];
  direction?: 'horizontal' | 'vertical';
  current?: number;
}

export interface FormStep {
  key: string;
  title: string;
  description?: string;
  icon?: string;
  fields: string[];
}

/**
 * 折叠面板布局配置
 */
export interface CollapseLayoutConfig {
  panels: FormPanel[];
  accordion?: boolean;
  defaultActiveKeys?: string[];
}

export interface FormPanel {
  key: string;
  header: string;
  fields: string[];
}
```

---

## 🎨 GenericFormRenderer 实现

```typescript
/**
 * 通用表单渲染器
 * 文件位置: src/components/GenericFormRenderer/index.tsx
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Form, Button, Space, message } from 'antd';
import { Entity } from '@/common/data_type/generic/entity';
import { FormConfig } from './types';
import { FieldRenderer } from '../FieldRenderer';
import { useRuleEngine } from '@/hooks/useRuleEngine';
import { ruleEngine } from '@/core/rules/rule-engine';
import { GridLayout } from './layouts/GridLayout';
import { FlexLayout } from './layouts/FlexLayout';
import { TabsLayout } from './layouts/TabsLayout';
import { StepsLayout } from './layouts/StepsLayout';
import { CollapseLayout } from './layouts/CollapseLayout';

export interface GenericFormRendererProps {
  config: FormConfig;
  entity: Entity;
  mode?: 'create' | 'edit' | 'view';
  onSubmit?: (entity: Entity) => void | Promise<void>;
  onChange?: (entity: Entity) => void;
  loading?: boolean;
}

export const GenericFormRenderer: React.FC<GenericFormRendererProps> = ({
  config,
  entity: initialEntity,
  mode = 'edit',
  onSubmit,
  onChange,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [entity, setEntity] = useState<Entity>(initialEntity);
  const [submitting, setSubmitting] = useState(false);

  // 使用规则引擎
  const {
    fieldStates,
    errors,
    handleFieldChange,
    validateAll,
    getFieldState,
    getFieldErrors,
  } = useRuleEngine(entity);

  // 初始化规则引擎
  useEffect(() => {
    if (config.rules) {
      ruleEngine.loadScenarioRules(entity.scenarioId, [
        ...(config.rules.validation || []),
        ...(config.rules.calculation || []),
        ...(config.rules.conditional || []),
      ]);
    }
  }, [config.rules, entity.scenarioId]);

  // 同步表单值
  useEffect(() => {
    form.setFieldsValue(entity.customFields);
  }, [entity.customFields, form]);

  /**
   * 字段变化处理
   */
  const handleChange = useCallback(
    async (fieldName: string, value: any) => {
      // 更新实体
      const updatedEntity = {
        ...entity,
        customFields: {
          ...entity.customFields,
          [fieldName]: value,
        },
      };
      setEntity(updatedEntity);

      // 执行规则
      const { calculations } = await handleFieldChange(fieldName, value);

      // 应用计算结果
      if (Object.keys(calculations).length > 0) {
        const finalEntity = {
          ...updatedEntity,
          customFields: {
            ...updatedEntity.customFields,
            ...calculations,
          },
        };
        setEntity(finalEntity);
        form.setFieldsValue(calculations);
      }

      // 触发onChange回调
      onChange?.(updatedEntity);
    },
    [entity, handleFieldChange, onChange, form]
  );

  /**
   * 表单提交
   */
  const handleSubmit = useCallback(async () => {
    setSubmitting(true);

    try {
      // 验证表单
      const { isValid, errors: validationErrors } = await validateAll();

      if (!isValid) {
        message.error('表单验证失败，请检查输入');
        form.setFields(
          Object.entries(validationErrors).map(([name, errors]) => ({
            name,
            errors,
          }))
        );
        return;
      }

      // 执行提交
      if (onSubmit) {
        await onSubmit(entity);
      } else if (config.submit?.url) {
        // 默认提交逻辑
        const data = config.submit.transform
          ? config.submit.transform(entity)
          : entity;

        const response = await fetch(config.submit.url, {
          method: config.submit.method || 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('提交失败');
        }

        const result = await response.json();
        config.submit.onSuccess?.(result);
        message.success('提交成功');
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      config.submit?.onError?.(error);
      message.error('提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  }, [entity, validateAll, onSubmit, config.submit, form]);

  /**
   * 渲染字段
   */
  const renderField = useCallback(
    (fieldConfig: FieldTypeConfig) => {
      const fieldState = getFieldState(fieldConfig.name);
      const fieldErrors = getFieldErrors(fieldConfig.name);

      // 条件隐藏
      if (!fieldState.visible) {
        return null;
      }

      return (
        <FieldRenderer
          key={fieldConfig.name}
          config={{
            ...fieldConfig,
            disabled: !fieldState.enabled || fieldConfig.disabled,
            required: fieldState.required || fieldConfig.required,
          }}
          value={entity.customFields[fieldConfig.name]}
          onChange={(value) => handleChange(fieldConfig.name, value)}
          entity={entity}
          disabled={mode === 'view'}
          mode={mode === 'view' ? 'preview' : 'edit'}
        />
      );
    },
    [entity, getFieldState, getFieldErrors, handleChange, mode]
  );

  /**
   * 渲染布局
   */
  const renderLayout = () => {
    const { layout, fields } = config;

    switch (layout.type) {
      case 'grid':
        return (
          <GridLayout config={layout.config} fields={fields} renderField={renderField} />
        );

      case 'flex':
        return (
          <FlexLayout config={layout.config} fields={fields} renderField={renderField} />
        );

      case 'tabs':
        return (
          <TabsLayout config={layout.config} fields={fields} renderField={renderField} />
        );

      case 'steps':
        return (
          <StepsLayout config={layout.config} fields={fields} renderField={renderField} />
        );

      case 'collapse':
        return (
          <CollapseLayout config={layout.config} fields={fields} renderField={renderField} />
        );

      default:
        return fields.map(renderField);
    }
  };

  return (
    <Form form={form} layout="vertical">
      <div className="generic-form-renderer">
        {/* 表单标题 */}
        {config.title && (
          <div className="form-header">
            <h2>{config.title}</h2>
            {config.description && <p>{config.description}</p>}
          </div>
        )}

        {/* 表单内容 */}
        <div className="form-content">{renderLayout()}</div>

        {/* 表单操作 */}
        {mode !== 'view' && (
          <div className="form-actions">
            <Space>
              <Button type="primary" onClick={handleSubmit} loading={submitting || loading}>
                提交
              </Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
            </Space>
          </div>
        )}
      </div>
    </Form>
  );
};
```

---

## 📐 布局引擎实现

### 1. 网格布局

```typescript
/**
 * 网格布局
 * 文件位置: src/components/GenericFormRenderer/layouts/GridLayout.tsx
 */

import React from 'react';
import { Row, Col } from 'antd';
import { GridLayoutConfig } from '../types';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';

export interface GridLayoutProps {
  config?: GridLayoutConfig;
  fields: FieldTypeConfig[];
  renderField: (field: FieldTypeConfig) => React.ReactNode;
}

export const GridLayout: React.FC<GridLayoutProps> = ({ config, fields, renderField }) => {
  const columns = config?.columns || 2;
  const gutter = config?.gutter || [16, 16];
  const responsive = config?.responsive;

  const colSpan = responsive
    ? {
        xs: responsive.xs ? 24 / responsive.xs : 24,
        sm: responsive.sm ? 24 / responsive.sm : 24,
        md: responsive.md ? 24 / responsive.md : 24 / columns,
        lg: responsive.lg ? 24 / responsive.lg : 24 / columns,
        xl: responsive.xl ? 24 / responsive.xl : 24 / columns,
        xxl: responsive.xxl ? 24 / responsive.xxl : 24 / columns,
      }
    : 24 / columns;

  return (
    <Row gutter={gutter}>
      {fields.map((field) => (
        <Col key={field.name} {...(typeof colSpan === 'object' ? colSpan : { span: colSpan })}>
          {renderField(field)}
        </Col>
      ))}
    </Row>
  );
};
```

### 2. 标签页布局

```typescript
/**
 * 标签页布局
 * 文件位置: src/components/GenericFormRenderer/layouts/TabsLayout.tsx
 */

import React from 'react';
import { Tabs } from 'antd';
import * as Icons from '@ant-design/icons';
import { TabsLayoutConfig } from '../types';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';

export interface TabsLayoutProps {
  config?: TabsLayoutConfig;
  fields: FieldTypeConfig[];
  renderField: (field: FieldTypeConfig) => React.ReactNode;
}

export const TabsLayout: React.FC<TabsLayoutProps> = ({ config, fields, renderField }) => {
  const tabs = config?.tabs || [];
  const tabPosition = config?.tabPosition || 'top';
  const animated = config?.animated ?? true;

  // 创建字段映射
  const fieldMap = new Map(fields.map((f) => [f.name, f]));

  const items = tabs.map((tab) => {
    const Icon = tab.icon ? Icons[tab.icon as keyof typeof Icons] : null;

    return {
      key: tab.key,
      label: (
        <span>
          {Icon && <Icon />}
          {tab.label}
        </span>
      ),
      children: (
        <div className="tab-content">
          {tab.fields.map((fieldName) => {
            const field = fieldMap.get(fieldName);
            return field ? renderField(field) : null;
          })}
        </div>
      ),
    };
  });

  return <Tabs items={items} tabPosition={tabPosition} animated={animated} />;
};
```

### 3. 步骤布局

```typescript
/**
 * 步骤布局
 * 文件位置: src/components/GenericFormRenderer/layouts/StepsLayout.tsx
 */

import React, { useState } from 'react';
import { Steps, Button, Space } from 'antd';
import * as Icons from '@ant-design/icons';
import { StepsLayoutConfig } from '../types';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';

export interface StepsLayoutProps {
  config?: StepsLayoutConfig;
  fields: FieldTypeConfig[];
  renderField: (field: FieldTypeConfig) => React.ReactNode;
}

export const StepsLayout: React.FC<StepsLayoutProps> = ({ config, fields, renderField }) => {
  const steps = config?.steps || [];
  const direction = config?.direction || 'horizontal';
  const [current, setCurrent] = useState(config?.current || 0);

  const fieldMap = new Map(fields.map((f) => [f.name, f]));

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((step) => {
    const Icon = step.icon ? Icons[step.icon as keyof typeof Icons] : null;

    return {
      key: step.key,
      title: step.title,
      description: step.description,
      icon: Icon ? <Icon /> : undefined,
    };
  });

  const currentStep = steps[current];

  return (
    <div className="steps-layout">
      <Steps current={current} items={items} direction={direction} />

      <div className="steps-content" style={{ marginTop: 24, marginBottom: 24 }}>
        {currentStep?.fields.map((fieldName) => {
          const field = fieldMap.get(fieldName);
          return field ? renderField(field) : null;
        })}
      </div>

      <div className="steps-action">
        <Space>
          {current > 0 && <Button onClick={prev}>上一步</Button>}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={next}>
              下一步
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};
```

### 4. 折叠面板布局

```typescript
/**
 * 折叠面板布局
 * 文件位置: src/components/GenericFormRenderer/layouts/CollapseLayout.tsx
 */

import React from 'react';
import { Collapse } from 'antd';
import { CollapseLayoutConfig } from '../types';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';

export interface CollapseLayoutProps {
  config?: CollapseLayoutConfig;
  fields: FieldTypeConfig[];
  renderField: (field: FieldTypeConfig) => React.ReactNode;
}

export const CollapseLayout: React.FC<CollapseLayoutProps> = ({
  config,
  fields,
  renderField,
}) => {
  const panels = config?.panels || [];
  const accordion = config?.accordion ?? false;
  const defaultActiveKeys = config?.defaultActiveKeys;

  const fieldMap = new Map(fields.map((f) => [f.name, f]));

  const items = panels.map((panel) => ({
    key: panel.key,
    label: panel.header,
    children: (
      <div className="panel-content">
        {panel.fields.map((fieldName) => {
          const field = fieldMap.get(fieldName);
          return field ? renderField(field) : null;
        })}
      </div>
    ),
  }));

  return <Collapse items={items} accordion={accordion} defaultActiveKey={defaultActiveKeys} />;
};
```

---

## ⚡ 性能优化

### 1. 字段级别记忆化

```typescript
/**
 * 优化的字段渲染器
 * 文件位置: src/components/GenericFormRenderer/OptimizedFieldRenderer.tsx
 */

import React, { memo } from 'react';
import { FieldRenderer, FieldRendererProps } from '../FieldRenderer';
import { isEqual } from 'lodash-es';

/**
 * 使用 memo 优化的字段渲染器
 */
export const OptimizedFieldRenderer = memo<FieldRendererProps>(
  FieldRenderer,
  (prevProps, nextProps) => {
    // 自定义比较逻辑
    return (
      isEqual(prevProps.config, nextProps.config) &&
      isEqual(prevProps.value, nextProps.value) &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.mode === nextProps.mode &&
      isEqual(prevProps.errors, nextProps.errors)
    );
  }
);
```

### 2. 虚拟化长表单

```typescript
/**
 * 虚拟化表单渲染器
 * 文件位置: src/components/GenericFormRenderer/VirtualizedFormRenderer.tsx
 */

import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { FieldTypeConfig } from '@/core/field-types/base-field-type';

export interface VirtualizedFormRendererProps {
  fields: FieldTypeConfig[];
  renderField: (field: FieldTypeConfig) => React.ReactNode;
  itemHeight?: number;
  height?: number;
}

export const VirtualizedFormRenderer: React.FC<VirtualizedFormRendererProps> = ({
  fields,
  renderField,
  itemHeight = 80,
  height = 600,
}) => {
  const Row = ({ index, style }: any) => (
    <div style={style}>{renderField(fields[index])}</div>
  );

  return (
    <List height={height} itemCount={fields.length} itemSize={itemHeight} width="100%">
      {Row}
    </List>
  );
};
```

### 3. 防抖优化

```typescript
/**
 * 防抖Hook
 * 文件位置: src/hooks/useDebounce.ts
 */

import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

// 使用示例
const debouncedHandleChange = useDebounce(handleChange, 300);
```

---

## 🧪 单元测试示例

```typescript
/**
 * GenericFormRenderer 测试
 * 文件位置: tests/unit/components/GenericFormRenderer.test.tsx
 */

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { GenericFormRenderer } from '@/components/GenericFormRenderer';
import { FormConfig } from '@/components/GenericFormRenderer/types';
import { Entity } from '@/common/data_type/generic/entity';

describe('GenericFormRenderer', () => {
  const mockConfig: FormConfig = {
    id: 'test-form',
    name: 'Test Form',
    title: '测试表单',
    layout: {
      type: 'grid',
      config: { columns: 2, gutter: [16, 16] },
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        label: '姓名',
        required: true,
      },
      {
        name: 'age',
        type: 'number',
        label: '年龄',
      },
    ],
    rules: {
      validation: [
        {
          id: 'rule-1',
          name: 'Required Name',
          type: 'validation',
          field: 'name',
          validator: 'required',
          enabled: true,
        },
      ],
    },
  };

  const mockEntity: Entity = {
    entityId: 'test-1',
    entityType: 'patient',
    scenarioId: 'medical',
    customFields: {},
  } as Entity;

  test('should render form with title', () => {
    const { getByText } = render(
      <GenericFormRenderer config={mockConfig} entity={mockEntity} />
    );

    expect(getByText('测试表单')).toBeInTheDocument();
  });

  test('should render all fields', () => {
    const { getByLabelText } = render(
      <GenericFormRenderer config={mockConfig} entity={mockEntity} />
    );

    expect(getByLabelText('姓名')).toBeInTheDocument();
    expect(getByLabelText('年龄')).toBeInTheDocument();
  });

  test('should handle field change', async () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <GenericFormRenderer config={mockConfig} entity={mockEntity} onChange={onChange} />
    );

    const nameInput = getByLabelText('姓名') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: '张三' } });

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  test('should validate on submit', async () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <GenericFormRenderer config={mockConfig} entity={mockEntity} onSubmit={onSubmit} />
    );

    const submitButton = getByText('提交');
    fireEvent.click(submitButton);

    await waitFor(() => {
      // 验证失败，不应该调用 onSubmit
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
```

---

## 📦 实施步骤

### 步骤 1: 创建目录结构

```bash
mkdir -p src/components/GenericFormRenderer/layouts
mkdir -p tests/unit/components

touch src/components/GenericFormRenderer/index.tsx
touch src/components/GenericFormRenderer/types.ts
touch src/components/GenericFormRenderer/layouts/GridLayout.tsx
touch src/components/GenericFormRenderer/layouts/TabsLayout.tsx
touch src/components/GenericFormRenderer/layouts/StepsLayout.tsx
touch src/components/GenericFormRenderer/layouts/CollapseLayout.tsx
touch src/components/GenericFormRenderer/layouts/FlexLayout.tsx
```

### 步骤 2: 实现类型定义

创建完整的表单配置类型定义

### 步骤 3: 实现核心渲染器

实现 `GenericFormRenderer` 主组件

### 步骤 4: 实现布局引擎

实现 5 种布局组件

### 步骤 5: 集成规则引擎

整合验证、计算、条件规则

### 步骤 6: 性能优化

实现记忆化、虚拟化、防抖等优化

### 步骤 7: 编写测试

完整的单元测试和集成测试

---

## 📋 使用示例

```typescript
/**
 * 使用示例
 */

import React from 'react';
import { GenericFormRenderer } from '@/components/GenericFormRenderer';
import { FormConfig } from '@/components/GenericFormRenderer/types';

const PatientFormConfig: FormConfig = {
  id: 'patient-form',
  name: '患者登记表',
  title: '患者基本信息',
  layout: {
    type: 'tabs',
    config: {
      tabs: [
        {
          key: 'basic',
          label: '基本信息',
          icon: 'UserOutlined',
          fields: ['name', 'gender', 'age', 'phone'],
        },
        {
          key: 'medical',
          label: '病史信息',
          icon: 'MedicineBoxOutlined',
          fields: ['diagnosis', 'symptoms', 'allergies'],
        },
      ],
    },
  },
  fields: [
    { name: 'name', type: 'text', label: '姓名', required: true },
    {
      name: 'gender',
      type: 'select',
      label: '性别',
      config: {
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
      },
    },
    { name: 'age', type: 'number', label: '年龄', config: { min: 0, max: 150 } },
    { name: 'phone', type: 'text', label: '电话', validation: [{ type: 'pattern', value: /^1\d{10}$/ }] },
    { name: 'diagnosis', type: 'text', label: '诊断' },
    { name: 'symptoms', type: 'textarea', label: '症状描述' },
    { name: 'allergies', type: 'multi-select', label: '过敏史' },
  ],
  rules: {
    validation: [
      {
        id: 'v1',
        name: 'Required Name',
        type: 'validation',
        field: 'name',
        validator: 'required',
        enabled: true,
      },
    ],
  },
};

export const PatientForm: React.FC = () => {
  const handleSubmit = async (entity: Entity) => {
    console.log('提交数据:', entity);
    // 提交到服务器
  };

  return (
    <GenericFormRenderer
      config={PatientFormConfig}
      entity={initialEntity}
      onSubmit={handleSubmit}
    />
  );
};
```

---

## ✅ 验收标准

- [ ] GenericFormRenderer 核心组件实现
- [ ] 支持 5 种布局模式
- [ ] 字段联动正常工作
- [ ] 验证规则实时执行
- [ ] 计算规则自动触发
- [ ] 条件显示/隐藏正常
- [ ] 性能优化生效（大表单不卡顿）
- [ ] 支持 create/edit/view 三种模式
- [ ] 单元测试覆盖率 > 80%
- [ ] 支持表单状态管理

---

**版本**: v1.0
**创建日期**: 2025-01-13
