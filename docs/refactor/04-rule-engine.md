# 规则引擎开发方案

## 📋 文档信息

- **模块**: 规则引擎
- **优先级**: P1
- **预计工时**: 6-7 工作日
- **依赖**: 03-field-type-system
- **负责人**: 待分配

---

## 🎯 改造目标

实现一个**强大的规则引擎系统**，支持：

1. ✅ 验证规则引擎 (ValidationEngine)
2. ✅ 计算规则引擎 (CalculationEngine)
3. ✅ 条件显示引擎 (ConditionalEngine)
4. ✅ 字段依赖管理 (DependencyManager)
5. ✅ 业务规则配置 (BusinessRules)
6. ✅ 规则执行上下文
7. ✅ 规则表达式解析器

---

## 🏗️ 核心架构

### 规则类型定义

```typescript
/**
 * 规则类型定义
 * 文件位置: src/core/rules/types.ts
 */

import { Entity } from '@/common/data_type/generic/entity';

/**
 * 规则基础接口
 */
export interface BaseRule {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  priority?: number;
}

/**
 * 验证规则
 */
export interface ValidationRule extends BaseRule {
  type: 'validation';
  field: string;
  validator: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'url' | 'custom';
  value?: any;
  message?: string;
  customValidator?: (value: any, entity: Entity, context: RuleContext) => boolean | Promise<boolean>;
}

/**
 * 计算规则
 */
export interface CalculationRule extends BaseRule {
  type: 'calculation';
  targetField: string;
  formula: string;  // 例如: "field1 + field2 * 0.1"
  dependencies: string[];  // 依赖的字段
  executeOn?: 'change' | 'blur' | 'submit';
}

/**
 * 条件规则
 */
export interface ConditionalRule extends BaseRule {
  type: 'conditional';
  targetField: string;
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require';
  condition: RuleCondition;
}

/**
 * 依赖规则
 */
export interface DependencyRule extends BaseRule {
  type: 'dependency';
  sourceField: string;
  targetField: string;
  action: 'load_options' | 'filter_options' | 'set_value' | 'clear_value';
  mapping?: Record<string, any>;
  handler?: (sourceValue: any, entity: Entity) => any | Promise<any>;
}

/**
 * 业务规则
 */
export interface BusinessRule extends BaseRule {
  type: 'business';
  trigger: 'before_submit' | 'after_submit' | 'on_change' | 'on_load';
  condition?: RuleCondition;
  action: (entity: Entity, context: RuleContext) => void | Promise<void>;
}

/**
 * 规则条件
 */
export interface RuleCondition {
  operator: 'and' | 'or' | 'not';
  conditions?: RuleCondition[];
  field?: string;
  comparison?: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'notIn' | 'contains' | 'startsWith' | 'endsWith' | 'isEmpty' | 'isNotEmpty';
  value?: any;
}

/**
 * 规则执行上下文
 */
export interface RuleContext {
  entity: Entity;
  changedFields?: string[];
  user?: any;
  scenario?: any;
  timestamp: Date;
  metadata?: Record<string, any>;
}

/**
 * 规则执行结果
 */
export interface RuleExecutionResult {
  ruleId: string;
  success: boolean;
  error?: string;
  value?: any;
  executionTime: number;
}
```

---

## 🔧 规则引擎核心实现

### 1. 验证规则引擎

```typescript
/**
 * 验证规则引擎
 * 文件位置: src/core/rules/validation-engine.ts
 */

import { ValidationRule, RuleContext, RuleExecutionResult } from './types';
import { Entity } from '@/common/data_type/generic/entity';

export class ValidationEngine {
  private rules: Map<string, ValidationRule[]> = new Map();

  /**
   * 注册验证规则
   */
  registerRule(fieldName: string, rule: ValidationRule): void {
    if (!this.rules.has(fieldName)) {
      this.rules.set(fieldName, []);
    }
    this.rules.get(fieldName)!.push(rule);
  }

  /**
   * 批量注册规则
   */
  registerRules(rules: ValidationRule[]): void {
    rules.forEach(rule => {
      if (rule.enabled) {
        this.registerRule(rule.field, rule);
      }
    });
  }

  /**
   * 验证单个字段
   */
  async validateField(
    fieldName: string,
    value: any,
    entity: Entity,
    context: RuleContext
  ): Promise<string[]> {
    const rules = this.rules.get(fieldName) || [];
    const errors: string[] = [];

    // 按优先级排序
    const sortedRules = rules.sort((a, b) => (b.priority || 0) - (a.priority || 0));

    for (const rule of sortedRules) {
      if (!rule.enabled) continue;

      const error = await this.executeValidationRule(rule, value, entity, context);
      if (error) {
        errors.push(error);
      }
    }

    return errors;
  }

  /**
   * 验证整个实体
   */
  async validateEntity(entity: Entity, context: RuleContext): Promise<Record<string, string[]>> {
    const allErrors: Record<string, string[]> = {};

    for (const [fieldName, rules] of this.rules.entries()) {
      const value = entity.customFields[fieldName];
      const errors = await this.validateField(fieldName, value, entity, context);

      if (errors.length > 0) {
        allErrors[fieldName] = errors;
      }
    }

    return allErrors;
  }

  /**
   * 执行验证规则
   */
  private async executeValidationRule(
    rule: ValidationRule,
    value: any,
    entity: Entity,
    context: RuleContext
  ): Promise<string | null> {
    const startTime = Date.now();

    try {
      switch (rule.validator) {
        case 'required':
          if (value === null || value === undefined || value === '' ||
              (Array.isArray(value) && value.length === 0)) {
            return rule.message || `${rule.field} 为必填项`;
          }
          break;

        case 'min':
          if (typeof value === 'number' && value < rule.value) {
            return rule.message || `${rule.field} 不能小于 ${rule.value}`;
          }
          if (typeof value === 'string' && value.length < rule.value) {
            return rule.message || `${rule.field} 长度不能小于 ${rule.value}`;
          }
          if (Array.isArray(value) && value.length < rule.value) {
            return rule.message || `${rule.field} 至少选择 ${rule.value} 项`;
          }
          break;

        case 'max':
          if (typeof value === 'number' && value > rule.value) {
            return rule.message || `${rule.field} 不能大于 ${rule.value}`;
          }
          if (typeof value === 'string' && value.length > rule.value) {
            return rule.message || `${rule.field} 长度不能大于 ${rule.value}`;
          }
          if (Array.isArray(value) && value.length > rule.value) {
            return rule.message || `${rule.field} 最多选择 ${rule.value} 项`;
          }
          break;

        case 'pattern':
          if (typeof value === 'string' && !new RegExp(rule.value).test(value)) {
            return rule.message || `${rule.field} 格式不正确`;
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof value === 'string' && !emailRegex.test(value)) {
            return rule.message || `${rule.field} 邮箱格式不正确`;
          }
          break;

        case 'url':
          const urlRegex = /^https?:\/\/.+/;
          if (typeof value === 'string' && !urlRegex.test(value)) {
            return rule.message || `${rule.field} URL格式不正确`;
          }
          break;

        case 'custom':
          if (rule.customValidator) {
            const isValid = await rule.customValidator(value, entity, context);
            if (!isValid) {
              return rule.message || `${rule.field} 验证失败`;
            }
          }
          break;
      }

      return null;
    } catch (error) {
      console.error(`Validation rule execution failed:`, error);
      return `${rule.field} 验证时发生错误`;
    }
  }

  /**
   * 清空规则
   */
  clear(): void {
    this.rules.clear();
  }

  /**
   * 获取字段的所有规则
   */
  getFieldRules(fieldName: string): ValidationRule[] {
    return this.rules.get(fieldName) || [];
  }
}
```

---

### 2. 计算规则引擎

```typescript
/**
 * 计算规则引擎
 * 文件位置: src/core/rules/calculation-engine.ts
 */

import { CalculationRule, RuleContext } from './types';
import { Entity } from '@/common/data_type/generic/entity';
import { create, all } from 'mathjs';

const math = create(all);

export class CalculationEngine {
  private rules: Map<string, CalculationRule> = new Map();
  private dependencyGraph: Map<string, Set<string>> = new Map();

  /**
   * 注册计算规则
   */
  registerRule(rule: CalculationRule): void {
    if (!rule.enabled) return;

    this.rules.set(rule.targetField, rule);

    // 构建依赖图
    rule.dependencies.forEach(dep => {
      if (!this.dependencyGraph.has(dep)) {
        this.dependencyGraph.set(dep, new Set());
      }
      this.dependencyGraph.get(dep)!.add(rule.targetField);
    });
  }

  /**
   * 批量注册规则
   */
  registerRules(rules: CalculationRule[]): void {
    rules.forEach(rule => this.registerRule(rule));
  }

  /**
   * 执行计算
   */
  async calculate(
    fieldName: string,
    entity: Entity,
    context: RuleContext
  ): Promise<any> {
    const rule = this.rules.get(fieldName);
    if (!rule || !rule.enabled) {
      return null;
    }

    try {
      // 准备变量
      const scope: Record<string, any> = {};
      rule.dependencies.forEach(dep => {
        scope[dep] = entity.customFields[dep] || 0;
      });

      // 执行公式
      const result = math.evaluate(rule.formula, scope);
      return result;
    } catch (error) {
      console.error(`Calculation failed for ${fieldName}:`, error);
      throw new Error(`计算失败: ${rule.formula}`);
    }
  }

  /**
   * 当字段变化时，自动计算依赖它的字段
   */
  async onFieldChange(
    changedField: string,
    entity: Entity,
    context: RuleContext
  ): Promise<Record<string, any>> {
    const affectedFields = this.dependencyGraph.get(changedField);
    if (!affectedFields || affectedFields.size === 0) {
      return {};
    }

    const calculations: Record<string, any> = {};

    for (const fieldName of affectedFields) {
      const rule = this.rules.get(fieldName);
      if (rule && rule.enabled) {
        try {
          const value = await this.calculate(fieldName, entity, context);
          calculations[fieldName] = value;
        } catch (error) {
          console.error(`Failed to calculate ${fieldName}:`, error);
        }
      }
    }

    return calculations;
  }

  /**
   * 计算所有字段
   */
  async calculateAll(entity: Entity, context: RuleContext): Promise<Record<string, any>> {
    const calculations: Record<string, any> = {};

    for (const [fieldName, rule] of this.rules.entries()) {
      if (!rule.enabled) continue;

      try {
        const value = await this.calculate(fieldName, entity, context);
        calculations[fieldName] = value;
      } catch (error) {
        console.error(`Failed to calculate ${fieldName}:`, error);
      }
    }

    return calculations;
  }

  /**
   * 获取字段的依赖关系
   */
  getDependencies(fieldName: string): string[] {
    const rule = this.rules.get(fieldName);
    return rule?.dependencies || [];
  }

  /**
   * 获取依赖某字段的所有字段
   */
  getDependents(fieldName: string): string[] {
    return Array.from(this.dependencyGraph.get(fieldName) || []);
  }

  /**
   * 清空规则
   */
  clear(): void {
    this.rules.clear();
    this.dependencyGraph.clear();
  }
}
```

---

### 3. 条件显示引擎

```typescript
/**
 * 条件显示引擎
 * 文件位置: src/core/rules/conditional-engine.ts
 */

import { ConditionalRule, RuleCondition, RuleContext } from './types';
import { Entity } from '@/common/data_type/generic/entity';

export class ConditionalEngine {
  private rules: Map<string, ConditionalRule[]> = new Map();

  /**
   * 注册条件规则
   */
  registerRule(rule: ConditionalRule): void {
    if (!rule.enabled) return;

    if (!this.rules.has(rule.targetField)) {
      this.rules.set(rule.targetField, []);
    }
    this.rules.get(rule.targetField)!.push(rule);
  }

  /**
   * 批量注册规则
   */
  registerRules(rules: ConditionalRule[]): void {
    rules.forEach(rule => this.registerRule(rule));
  }

  /**
   * 评估字段状态
   */
  async evaluateField(
    fieldName: string,
    entity: Entity,
    context: RuleContext
  ): Promise<{
    visible: boolean;
    enabled: boolean;
    required: boolean;
  }> {
    const rules = this.rules.get(fieldName) || [];

    // 默认状态
    let visible = true;
    let enabled = true;
    let required = false;

    for (const rule of rules) {
      if (!rule.enabled) continue;

      const conditionMet = await this.evaluateCondition(rule.condition, entity, context);

      if (conditionMet) {
        switch (rule.action) {
          case 'show':
            visible = true;
            break;
          case 'hide':
            visible = false;
            break;
          case 'enable':
            enabled = true;
            break;
          case 'disable':
            enabled = false;
            break;
          case 'require':
            required = true;
            break;
        }
      }
    }

    return { visible, enabled, required };
  }

  /**
   * 评估条件
   */
  private async evaluateCondition(
    condition: RuleCondition,
    entity: Entity,
    context: RuleContext
  ): Promise<boolean> {
    if (condition.operator === 'and') {
      if (!condition.conditions) return true;
      for (const subCondition of condition.conditions) {
        const result = await this.evaluateCondition(subCondition, entity, context);
        if (!result) return false;
      }
      return true;
    }

    if (condition.operator === 'or') {
      if (!condition.conditions) return false;
      for (const subCondition of condition.conditions) {
        const result = await this.evaluateCondition(subCondition, entity, context);
        if (result) return true;
      }
      return false;
    }

    if (condition.operator === 'not') {
      if (!condition.conditions || condition.conditions.length === 0) return false;
      const result = await this.evaluateCondition(condition.conditions[0], entity, context);
      return !result;
    }

    // 叶子条件
    if (!condition.field || !condition.comparison) return true;

    const fieldValue = entity.customFields[condition.field];
    return this.compareValues(fieldValue, condition.comparison, condition.value);
  }

  /**
   * 比较值
   */
  private compareValues(fieldValue: any, comparison: string, targetValue: any): boolean {
    switch (comparison) {
      case 'eq':
        return fieldValue === targetValue;
      case 'ne':
        return fieldValue !== targetValue;
      case 'gt':
        return fieldValue > targetValue;
      case 'gte':
        return fieldValue >= targetValue;
      case 'lt':
        return fieldValue < targetValue;
      case 'lte':
        return fieldValue <= targetValue;
      case 'in':
        return Array.isArray(targetValue) && targetValue.includes(fieldValue);
      case 'notIn':
        return Array.isArray(targetValue) && !targetValue.includes(fieldValue);
      case 'contains':
        return typeof fieldValue === 'string' && fieldValue.includes(targetValue);
      case 'startsWith':
        return typeof fieldValue === 'string' && fieldValue.startsWith(targetValue);
      case 'endsWith':
        return typeof fieldValue === 'string' && fieldValue.endsWith(targetValue);
      case 'isEmpty':
        return !fieldValue || fieldValue === '' ||
               (Array.isArray(fieldValue) && fieldValue.length === 0);
      case 'isNotEmpty':
        return !!fieldValue && fieldValue !== '' &&
               (!Array.isArray(fieldValue) || fieldValue.length > 0);
      default:
        return false;
    }
  }

  /**
   * 评估所有字段
   */
  async evaluateAll(
    entity: Entity,
    context: RuleContext
  ): Promise<Record<string, { visible: boolean; enabled: boolean; required: boolean }>> {
    const results: Record<string, any> = {};

    for (const fieldName of this.rules.keys()) {
      results[fieldName] = await this.evaluateField(fieldName, entity, context);
    }

    return results;
  }

  /**
   * 清空规则
   */
  clear(): void {
    this.rules.clear();
  }
}
```

---

### 4. 规则引擎管理器

```typescript
/**
 * 规则引擎管理器
 * 文件位置: src/core/rules/rule-engine.ts
 */

import { ValidationEngine } from './validation-engine';
import { CalculationEngine } from './calculation-engine';
import { ConditionalEngine } from './conditional-engine';
import { RuleContext } from './types';
import { Entity } from '@/common/data_type/generic/entity';

export class RuleEngine {
  private static instance: RuleEngine;

  public validation: ValidationEngine;
  public calculation: CalculationEngine;
  public conditional: ConditionalEngine;

  private constructor() {
    this.validation = new ValidationEngine();
    this.calculation = new CalculationEngine();
    this.conditional = new ConditionalEngine();
  }

  /**
   * 获取单例实例
   */
  static getInstance(): RuleEngine {
    if (!RuleEngine.instance) {
      RuleEngine.instance = new RuleEngine();
    }
    return RuleEngine.instance;
  }

  /**
   * 加载场景规则
   */
  loadScenarioRules(scenarioId: string, rules: any[]): void {
    // 清空现有规则
    this.clear();

    // 加载各类规则
    const validationRules = rules.filter(r => r.type === 'validation');
    const calculationRules = rules.filter(r => r.type === 'calculation');
    const conditionalRules = rules.filter(r => r.type === 'conditional');

    this.validation.registerRules(validationRules);
    this.calculation.registerRules(calculationRules);
    this.conditional.registerRules(conditionalRules);
  }

  /**
   * 字段变化处理
   */
  async onFieldChange(
    fieldName: string,
    newValue: any,
    entity: Entity,
    context: RuleContext
  ): Promise<{
    calculations: Record<string, any>;
    fieldStates: Record<string, any>;
  }> {
    // 更新实体
    entity.customFields[fieldName] = newValue;

    // 执行计算规则
    const calculations = await this.calculation.onFieldChange(fieldName, entity, context);

    // 应用计算结果
    Object.assign(entity.customFields, calculations);

    // 评估条件规则
    const fieldStates = await this.conditional.evaluateAll(entity, context);

    return { calculations, fieldStates };
  }

  /**
   * 验证实体
   */
  async validateEntity(entity: Entity, context: RuleContext): Promise<{
    isValid: boolean;
    errors: Record<string, string[]>;
  }> {
    const errors = await this.validation.validateEntity(entity, context);
    const isValid = Object.keys(errors).length === 0;

    return { isValid, errors };
  }

  /**
   * 创建规则上下文
   */
  createContext(entity: Entity, options?: Partial<RuleContext>): RuleContext {
    return {
      entity,
      timestamp: new Date(),
      ...options,
    };
  }

  /**
   * 清空所有规则
   */
  clear(): void {
    this.validation.clear();
    this.calculation.clear();
    this.conditional.clear();
  }
}

/**
 * 导出单例实例
 */
export const ruleEngine = RuleEngine.getInstance();
```

---

## 🎨 React Hook 封装

```typescript
/**
 * 规则引擎 React Hook
 * 文件位置: src/hooks/useRuleEngine.ts
 */

import { useState, useEffect, useCallback } from 'react';
import { ruleEngine } from '@/core/rules/rule-engine';
import { Entity } from '@/common/data_type/generic/entity';

export function useRuleEngine(entity: Entity) {
  const [fieldStates, setFieldStates] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  /**
   * 字段变化处理
   */
  const handleFieldChange = useCallback(
    async (fieldName: string, value: any) => {
      const context = ruleEngine.createContext(entity);

      // 执行规则
      const { calculations, fieldStates: newStates } = await ruleEngine.onFieldChange(
        fieldName,
        value,
        entity,
        context
      );

      // 更新状态
      setFieldStates(newStates);

      // 验证字段
      const fieldErrors = await ruleEngine.validation.validateField(
        fieldName,
        value,
        entity,
        context
      );

      setErrors(prev => ({
        ...prev,
        [fieldName]: fieldErrors,
      }));

      return { calculations, fieldStates: newStates };
    },
    [entity]
  );

  /**
   * 验证所有字段
   */
  const validateAll = useCallback(async () => {
    const context = ruleEngine.createContext(entity);
    const result = await ruleEngine.validateEntity(entity, context);
    setErrors(result.errors);
    return result;
  }, [entity]);

  /**
   * 获取字段状态
   */
  const getFieldState = useCallback(
    (fieldName: string) => {
      return fieldStates[fieldName] || { visible: true, enabled: true, required: false };
    },
    [fieldStates]
  );

  /**
   * 获取字段错误
   */
  const getFieldErrors = useCallback(
    (fieldName: string) => {
      return errors[fieldName] || [];
    },
    [errors]
  );

  return {
    fieldStates,
    errors,
    handleFieldChange,
    validateAll,
    getFieldState,
    getFieldErrors,
  };
}
```

---

## 🧪 单元测试示例

```typescript
/**
 * 验证引擎测试
 * 文件位置: tests/unit/rules/validation-engine.test.ts
 */

import { ValidationEngine } from '@/core/rules/validation-engine';
import { ValidationRule } from '@/core/rules/types';
import { Entity } from '@/common/data_type/generic/entity';

describe('ValidationEngine', () => {
  let engine: ValidationEngine;
  let entity: Entity;

  beforeEach(() => {
    engine = new ValidationEngine();
    entity = {
      entityId: 'test-1',
      entityType: 'patient',
      scenarioId: 'medical',
      customFields: {},
    } as Entity;
  });

  test('should validate required field', async () => {
    const rule: ValidationRule = {
      id: 'rule-1',
      name: 'Required Name',
      type: 'validation',
      field: 'name',
      validator: 'required',
      enabled: true,
      message: '姓名为必填项',
    };

    engine.registerRule('name', rule);

    const errors = await engine.validateField('name', '', entity, {
      entity,
      timestamp: new Date(),
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('姓名为必填项');
  });

  test('should validate min value', async () => {
    const rule: ValidationRule = {
      id: 'rule-2',
      name: 'Min Age',
      type: 'validation',
      field: 'age',
      validator: 'min',
      value: 18,
      enabled: true,
      message: '年龄不能小于18岁',
    };

    engine.registerRule('age', rule);

    const errors = await engine.validateField('age', 15, entity, {
      entity,
      timestamp: new Date(),
    });

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('年龄不能小于18岁');
  });

  test('should validate email format', async () => {
    const rule: ValidationRule = {
      id: 'rule-3',
      name: 'Email Format',
      type: 'validation',
      field: 'email',
      validator: 'email',
      enabled: true,
    };

    engine.registerRule('email', rule);

    const errors = await engine.validateField('email', 'invalid-email', entity, {
      entity,
      timestamp: new Date(),
    });

    expect(errors).toHaveLength(1);
  });
});
```

```typescript
/**
 * 计算引擎测试
 * 文件位置: tests/unit/rules/calculation-engine.test.ts
 */

import { CalculationEngine } from '@/core/rules/calculation-engine';
import { CalculationRule } from '@/core/rules/types';
import { Entity } from '@/common/data_type/generic/entity';

describe('CalculationEngine', () => {
  let engine: CalculationEngine;
  let entity: Entity;

  beforeEach(() => {
    engine = new CalculationEngine();
    entity = {
      entityId: 'test-1',
      entityType: 'order',
      scenarioId: 'shipping',
      customFields: {
        quantity: 10,
        unitPrice: 100,
        taxRate: 0.1,
      },
    } as Entity;
  });

  test('should calculate total amount', async () => {
    const rule: CalculationRule = {
      id: 'calc-1',
      name: 'Calculate Total',
      type: 'calculation',
      targetField: 'totalAmount',
      formula: 'quantity * unitPrice * (1 + taxRate)',
      dependencies: ['quantity', 'unitPrice', 'taxRate'],
      enabled: true,
    };

    engine.registerRule(rule);

    const result = await engine.calculate('totalAmount', entity, {
      entity,
      timestamp: new Date(),
    });

    expect(result).toBe(1100); // 10 * 100 * 1.1
  });

  test('should handle field changes', async () => {
    const rule: CalculationRule = {
      id: 'calc-2',
      name: 'Calculate Subtotal',
      type: 'calculation',
      targetField: 'subtotal',
      formula: 'quantity * unitPrice',
      dependencies: ['quantity', 'unitPrice'],
      enabled: true,
    };

    engine.registerRule(rule);

    const calculations = await engine.onFieldChange('quantity', entity, {
      entity,
      timestamp: new Date(),
    });

    expect(calculations.subtotal).toBe(1000); // 10 * 100
  });
});
```

---

## 📦 实施步骤

### 步骤 1: 创建目录结构

```bash
mkdir -p src/core/rules
mkdir -p tests/unit/rules

touch src/core/rules/types.ts
touch src/core/rules/validation-engine.ts
touch src/core/rules/calculation-engine.ts
touch src/core/rules/conditional-engine.ts
touch src/core/rules/rule-engine.ts
```

### 步骤 2: 实现规则类型定义

创建完整的类型定义（ValidationRule、CalculationRule、ConditionalRule等）

### 步骤 3: 实现三大引擎

1. ValidationEngine - 验证规则引擎
2. CalculationEngine - 计算规则引擎
3. ConditionalEngine - 条件显示引擎

### 步骤 4: 实现规则引擎管理器

统一管理三大引擎，提供统一接口

### 步骤 5: 创建 React Hook

实现 `useRuleEngine` Hook，方便在组件中使用

### 步骤 6: 编写单元测试

为每个引擎编写完整的单元测试

---

## ✅ 验收标准

- [ ] ValidationEngine 实现完整
- [ ] CalculationEngine 支持公式计算
- [ ] ConditionalEngine 支持条件评估
- [ ] 规则引擎管理器集成三大引擎
- [ ] 支持规则优先级
- [ ] 支持字段依赖管理
- [ ] React Hook 可用
- [ ] 单元测试覆盖率 > 80%
- [ ] 支持自定义验证器
- [ ] 支持异步规则执行

---

**版本**: v1.0
**创建日期**: 2025-01-13
