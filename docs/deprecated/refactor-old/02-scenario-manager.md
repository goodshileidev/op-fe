# 场景管理器实现方案

## 📋 文档信息

- **模块**: 场景管理器
- **优先级**: P0
- **预计工时**: 4-5 工作日
- **依赖**: 01-data-model-refactor
- **负责人**: 待分配

---

## 🎯 改造目标

实现一个**场景管理器 (ScenarioManager)**，负责：

1. ✅ 场景配置的加载和管理
2. ✅ 场景之间的动态切换
3. ✅ 术语映射和国际化
4. ✅ 主题配置和 UI 适配
5. ✅ 场景生命周期管理

---

## 🏗️ 核心架构

```typescript
/**
 * 场景管理器
 * 文件位置: src/core/scenario-manager.ts
 */

import { ScenarioConfig } from '@/common/data_type/generic/scenario-config';
import EventEmitter from 'events';

export class ScenarioManager extends EventEmitter {
  private static instance: ScenarioManager;
  private scenarios: Map<string, ScenarioConfig> = new Map();
  private currentScenario?: ScenarioConfig;
  private loadingPromises: Map<string, Promise<ScenarioConfig>> = new Map();

  private constructor() {
    super();
  }

  /**
   * 获取单例实例
   */
  static getInstance(): ScenarioManager {
    if (!ScenarioManager.instance) {
      ScenarioManager.instance = new ScenarioManager();
    }
    return ScenarioManager.instance;
  }

  /**
   * 初始化场景管理器
   */
  async initialize(): Promise<void> {
    // 加载内置场景
    await this.loadBuiltInScenarios();

    // 从服务器加载自定义场景
    await this.loadCustomScenarios();

    // 设置默认场景
    const defaultScenarioId = this.getDefaultScenarioId();
    if (defaultScenarioId) {
      await this.switchScenario(defaultScenarioId);
    }

    this.emit('initialized');
  }

  /**
   * 加载内置场景
   */
  private async loadBuiltInScenarios(): Promise<void> {
    // 从静态配置文件加载
    const scenarios = await Promise.all([
      import('@/scenarios/shipping.json'),
      import('@/scenarios/medical.json'),
      import('@/scenarios/inspection.json'),
    ]);

    scenarios.forEach(scenario => {
      this.registerScenario(scenario.default);
    });
  }

  /**
   * 加载自定义场景
   */
  private async loadCustomScenarios(): Promise<void> {
    try {
      const response = await fetch('/api/scenarios');
      const scenarios = await response.json();
      scenarios.forEach((s: ScenarioConfig) => this.registerScenario(s));
    } catch (error) {
      console.error('Failed to load custom scenarios:', error);
    }
  }

  /**
   * 注册场景
   */
  registerScenario(scenario: ScenarioConfig): void {
    // 验证场景配置
    this.validateScenario(scenario);

    // 注册场景
    this.scenarios.set(scenario.id, scenario);

    // 触发事件
    this.emit('scenario:registered', scenario);
  }

  /**
   * 加载场景（支持懒加载）
   */
  async loadScenario(scenarioId: string): Promise<ScenarioConfig> {
    // 如果已经加载，直接返回
    if (this.scenarios.has(scenarioId)) {
      return this.scenarios.get(scenarioId)!;
    }

    // 如果正在加载，等待加载完成
    if (this.loadingPromises.has(scenarioId)) {
      return this.loadingPromises.get(scenarioId)!;
    }

    // 开始加载
    const loadingPromise = this.fetchScenario(scenarioId);
    this.loadingPromises.set(scenarioId, loadingPromise);

    try {
      const scenario = await loadingPromise;
      this.registerScenario(scenario);
      return scenario;
    } finally {
      this.loadingPromises.delete(scenarioId);
    }
  }

  /**
   * 从服务器获取场景
   */
  private async fetchScenario(scenarioId: string): Promise<ScenarioConfig> {
    const response = await fetch(`/api/scenarios/${scenarioId}`);
    if (!response.ok) {
      throw new Error(`Failed to load scenario: ${scenarioId}`);
    }
    return response.json();
  }

  /**
   * 切换场景
   */
  async switchScenario(scenarioId: string): Promise<void> {
    // 加载场景（如果未加载）
    const scenario = await this.loadScenario(scenarioId);

    // 保存到本地存储
    localStorage.setItem('currentScenarioId', scenarioId);

    // 设置当前场景
    const previousScenario = this.currentScenario;
    this.currentScenario = scenario;

    // 应用场景配置
    await this.applyScenario(scenario);

    // 触发场景切换事件
    this.emit('scenario:changed', {
      previous: previousScenario,
      current: scenario,
    });
  }

  /**
   * 应用场景配置
   */
  private async applyScenario(scenario: ScenarioConfig): Promise<void> {
    // 1. 更新国际化
    this.applyTerminology(scenario.terminology);

    // 2. 应用主题
    this.applyTheme(scenario.theme);

    // 3. 更新权限配置
    this.applyRoles(scenario.roles);

    // 4. 应用功能开关
    this.applyFeatures(scenario.features);

    // 触发应用完成事件
    this.emit('scenario:applied', scenario);
  }

  /**
   * 应用术语映射
   */
  private applyTerminology(terminology: Record<string, string>): void {
    // 更新 i18n 资源
    const i18n = window.i18n; // 假设有全局 i18n 实例
    if (i18n) {
      Object.entries(terminology).forEach(([key, value]) => {
        i18n.addResource('zh-CN', 'scenario', key, value);
      });
    }
  }

  /**
   * 应用主题配置
   */
  private applyTheme(theme: ScenarioConfig['theme']): void {
    if (!theme) return;

    // 更新 Ant Design 主题
    const root = document.documentElement;
    if (theme.primaryColor) {
      root.style.setProperty('--ant-primary-color', theme.primaryColor);
    }

    // 更新其他主题变量
    // ...
  }

  /**
   * 应用角色配置
   */
  private applyRoles(roles: ScenarioConfig['roles']): void {
    // 存储到全局状态
    window.__SCENARIO_ROLES__ = roles;
  }

  /**
   * 应用功能开关
   */
  private applyFeatures(features: ScenarioConfig['features']): void {
    // 存储到全局状态
    window.__SCENARIO_FEATURES__ = features;
  }

  /**
   * 获取当前场景
   */
  getCurrentScenario(): ScenarioConfig | undefined {
    return this.currentScenario;
  }

  /**
   * 获取所有场景
   */
  getAllScenarios(): ScenarioConfig[] {
    return Array.from(this.scenarios.values());
  }

  /**
   * 获取场景术语
   */
  getTerm(key: string, defaultValue?: string): string {
    if (!this.currentScenario) {
      return defaultValue || key;
    }
    return this.currentScenario.terminology[key] || defaultValue || key;
  }

  /**
   * 获取字段标签
   */
  getFieldLabel(entityType: string, fieldName: string): string {
    if (!this.currentScenario) return fieldName;

    const entity = this.currentScenario.entities[entityType];
    if (!entity) return fieldName;

    const mapping = entity.fieldMapping[fieldName];
    return mapping?.label || fieldName;
  }

  /**
   * 获取字段配置
   */
  getFieldMapping(entityType: string, fieldName: string) {
    if (!this.currentScenario) return undefined;

    const entity = this.currentScenario.entities[entityType];
    if (!entity) return undefined;

    return entity.fieldMapping[fieldName];
  }

  /**
   * 检查功能是否启用
   */
  isFeatureEnabled(featureName: keyof ScenarioConfig['features']): boolean {
    if (!this.currentScenario) return false;
    return this.currentScenario.features[featureName] ?? false;
  }

  /**
   * 获取默认场景 ID
   */
  private getDefaultScenarioId(): string | undefined {
    // 1. 从 URL 参数读取
    const urlParams = new URLSearchParams(window.location.search);
    const urlScenario = urlParams.get('scenario');
    if (urlScenario && this.scenarios.has(urlScenario)) {
      return urlScenario;
    }

    // 2. 从本地存储读取
    const storedScenario = localStorage.getItem('currentScenarioId');
    if (storedScenario && this.scenarios.has(storedScenario)) {
      return storedScenario;
    }

    // 3. 返回第一个可用场景
    return Array.from(this.scenarios.keys())[0];
  }

  /**
   * 验证场景配置
   */
  private validateScenario(scenario: ScenarioConfig): void {
    // 必填字段检查
    const requiredFields = ['id', 'name', 'displayName', 'entities'];
    for (const field of requiredFields) {
      if (!scenario[field as keyof ScenarioConfig]) {
        throw new Error(`Scenario validation failed: missing ${field}`);
      }
    }

    // 实体配置检查
    if (Object.keys(scenario.entities).length === 0) {
      throw new Error('Scenario must have at least one entity');
    }

    // 更多验证...
  }
}

/**
 * 导出单例实例
 */
export const scenarioManager = ScenarioManager.getInstance();
```

---

## 🔌 React Hook 封装

```typescript
/**
 * React Hook for Scenario Manager
 * 文件位置: src/hooks/useScenario.ts
 */

import { useState, useEffect } from 'react';
import { ScenarioManager } from '@/core/scenario-manager';
import { ScenarioConfig } from '@/common/data_type/generic/scenario-config';

/**
 * 使用场景管理器 Hook
 */
export function useScenario() {
  const [currentScenario, setCurrentScenario] = useState<ScenarioConfig | undefined>();
  const [scenarios, setScenarios] = useState<ScenarioConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const manager = ScenarioManager.getInstance();

  useEffect(() => {
    // 初始化
    const init = async () => {
      try {
        await manager.initialize();
        setCurrentScenario(manager.getCurrentScenario());
        setScenarios(manager.getAllScenarios());
      } finally {
        setLoading(false);
      }
    };

    init();

    // 监听场景变化
    const handleChange = ({ current }: any) => {
      setCurrentScenario(current);
    };

    manager.on('scenario:changed', handleChange);

    return () => {
      manager.off('scenario:changed', handleChange);
    };
  }, []);

  /**
   * 切换场景
   */
  const switchScenario = async (scenarioId: string) => {
    setLoading(true);
    try {
      await manager.switchScenario(scenarioId);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 获取术语
   */
  const getTerm = (key: string, defaultValue?: string) => {
    return manager.getTerm(key, defaultValue);
  };

  /**
   * 获取字段标签
   */
  const getFieldLabel = (entityType: string, fieldName: string) => {
    return manager.getFieldLabel(entityType, fieldName);
  };

  /**
   * 检查功能是否启用
   */
  const isFeatureEnabled = (featureName: keyof ScenarioConfig['features']) => {
    return manager.isFeatureEnabled(featureName);
  };

  return {
    currentScenario,
    scenarios,
    loading,
    switchScenario,
    getTerm,
    getFieldLabel,
    isFeatureEnabled,
  };
}

/**
 * 使用当前场景 Hook
 */
export function useCurrentScenario() {
  const [scenario, setScenario] = useState<ScenarioConfig | undefined>();
  const manager = ScenarioManager.getInstance();

  useEffect(() => {
    setScenario(manager.getCurrentScenario());

    const handleChange = ({ current }: any) => {
      setScenario(current);
    };

    manager.on('scenario:changed', handleChange);

    return () => {
      manager.off('scenario:changed', handleChange);
    };
  }, []);

  return scenario;
}
```

---

## 🎨 场景选择器组件

```typescript
/**
 * 场景选择器组件
 * 文件位置: src/components/ScenarioSelector/index.tsx
 */

import React from 'react';
import { Select, Space } from 'antd';
import { useScenario } from '@/hooks/useScenario';
import * as Icons from '@ant-design/icons';

export const ScenarioSelector: React.FC = () => {
  const { currentScenario, scenarios, loading, switchScenario } = useScenario();

  const handleChange = async (scenarioId: string) => {
    await switchScenario(scenarioId);
    // 可选：刷新页面以应用新场景
    // window.location.reload();
  };

  return (
    <Select
      value={currentScenario?.id}
      onChange={handleChange}
      loading={loading}
      style={{ width: 200 }}
      placeholder="选择场景"
    >
      {scenarios.map(scenario => {
        const Icon = scenario.icon ? Icons[scenario.icon as keyof typeof Icons] : null;

        return (
          <Select.Option key={scenario.id} value={scenario.id}>
            <Space>
              {Icon && <Icon />}
              <span>{scenario.displayName}</span>
            </Space>
          </Select.Option>
        );
      })}
    </Select>
  );
};
```

---

## 📦 实施步骤

### 步骤 1: 创建核心文件

```bash
# 创建目录
mkdir -p src/core
mkdir -p src/hooks
mkdir -p src/components/ScenarioSelector

# 创建文件
touch src/core/scenario-manager.ts
touch src/hooks/useScenario.ts
touch src/components/ScenarioSelector/index.tsx
```

### 步骤 2: 实现场景管理器

将上面的代码复制到对应文件中。

### 步骤 3: 集成到应用

```typescript
/**
 * 在应用入口初始化
 * 文件位置: src/app.tsx
 */

import { scenarioManager } from '@/core/scenario-manager';

// 在 app.tsx 中初始化
export async function getInitialState() {
  // 初始化场景管理器
  await scenarioManager.initialize();

  return {
    // ... 其他初始状态
  };
}
```

### 步骤 4: 添加到布局

```typescript
/**
 * 在顶部导航栏添加场景选择器
 */

import { ScenarioSelector } from '@/components/ScenarioSelector';

export const RightContent: React.FC = () => {
  return (
    <Space>
      <ScenarioSelector />
      {/* 其他组件 */}
    </Space>
  );
};
```

---

## ✅ 验收标准

- [ ] 场景管理器单例正常工作
- [ ] 可以加载内置和自定义场景
- [ ] 场景切换功能正常
- [ ] 术语映射生效
- [ ] 主题配置正确应用
- [ ] React Hook 正常工作
- [ ] 场景选择器组件可用
- [ ] 单元测试覆盖率 > 80%

---

**版本**: v1.0
**创建日期**: 2025-01-13
