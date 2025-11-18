# 通用表单管理平台改造计划

## 📋 文档信息

- **制定日期**: 2025-01-13
- **版本**: v1.0
- **目标**: 将港口航运表单系统改造为通用表单管理平台
- **适用场景**: 医疗调研、工业巡检、质量检测、设备维护、客户调研等

---

## 🎯 改造目标

### 核心目标

将现有的港口航运专用表单系统改造为**通用的、可配置的、场景化的表单管理平台**，使其能够：

1. **零代码适配** - 通过配置而非编码适应不同业务场景
2. **快速部署** - 新场景 1-2 天内完成配置和部署
3. **灵活扩展** - 支持自定义字段、流程、规则
4. **向后兼容** - 不影响现有港口航运业务
5. **场景复用** - 场景配置可导入导出，快速复制

### 目标场景举例

| 场景 | 核心实体 | 关键流程 | 特殊需求 |
|------|---------|---------|---------|
| 医疗调研 | 患者、病历、医生 | 问诊→诊断→治疗→复查 | HIPAA 合规、隐私保护 |
| 工业巡检 | 设备、检查项、巡检员 | 计划→执行→记录→整改 | 照片上传、GPS 定位 |
| 质量检测 | 产品、检测项、检测员 | 抽样→检测→记录→判定 | 标准对比、合格率统计 |
| 设备维护 | 设备、故障、维修员 | 报修→派单→维修→验收 | 配件管理、工时统计 |
| 客户调研 | 客户、问卷、调研员 | 设计→发放→回收→分析 | 匿名支持、统计分析 |

---

## 🔍 现状分析

### 当前系统的行业耦合点

#### 1. 数据模型层面

**硬编码的港口航运字段**:
```typescript
// src/common/data_type/form/document.ts
interface DocumentType {
  shipName: string;              // ❌ 船名 - 行业特定
  cargoName: string;             // ❌ 货名 - 行业特定
  berthingTime: string;          // ❌ 靠泊时间 - 行业特定
  departureTime: string;         // ❌ 离港时间 - 行业特定
  domesticForeignTradeType: string; // ❌ 内外贸类型 - 行业特定
  shipType: string;              // ❌ 船舶类型 - 行业特定
}
```

**问题**:
- 字段名称与港口业务强绑定
- 无法适应其他行业的业务实体
- 类型定义缺乏灵活性

#### 2. 业务逻辑层面

**固化的业务模块**:
```
src/pages/operation/
├── ship_operation_document/    # ❌ 船舶作业
├── monthly_security_check/     # ❌ 月度安全检查（港口特定）
├── security_declare/           # ❌ 保安声明（港口特定）
└── yuancang_operaton/          # ❌ 圆仓作业（港口特定）
```

**问题**:
- 业务模块与港口运营强绑定
- 页面组件无法复用到其他场景
- 路由配置写死业务类型

#### 3. UI/UX 层面

**行业术语固化**:
```typescript
// src/lang/zh/total/document.ts
{
  shipName: '船名',
  cargoName: '货名',
  berthingTime: '靠泊时间',
  // ...
}
```

**问题**:
- 界面文本与港口术语强绑定
- 图标、颜色主题针对港口设计
- 工作流名称不通用

#### 4. 权限体系层面

**业务线权限硬编码**:
```typescript
// src/access.ts
{
  hasMeiyan: boolean,    // ❌ 煤盐业务权限
  hasHuagong: boolean,   // ❌ 化工业务权限
}
```

**问题**:
- 权限代码与具体业务线绑定
- 无法动态配置新的业务线
- 扩展需要修改代码

### 可复用的核心能力

✅ **已经通用化的部分**:

1. **表单引擎核心**
   - 动态表单渲染
   - 表单变量系统
   - 表单验证机制

2. **模板系统**
   - 模板版本控制
   - 模板发布机制
   - 模板继承复制

3. **通知系统**
   - 通知配置引擎
   - 通知发送机制
   - 回执管理

4. **权限框架**
   - 基于角色的权限控制
   - 数据级权限过滤
   - 菜单权限控制

5. **技术基础设施**
   - Umi Max 框架
   - TypeScript 类型系统
   - Ant Design 组件库
   - 国际化支持

---

## 🏗️ 总体架构设计

### 改造后的系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                     场景配置层 (Scenario Layer)               │
│  ┌─────────────┬─────────────┬─────────────┬─────────────┐  │
│  │医疗调研场景 │ 工业巡检场景 │ 质量检测场景 │  自定义场景  │  │
│  └─────────────┴─────────────┴─────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   应用配置层 (Application Layer)              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 场景管理器 (Scenario Manager)                         │   │
│  │  - 场景切换、场景配置加载、术语映射                   │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 字段类型注册器 (Field Type Registry)                  │   │
│  │  - 内置字段类型、自定义字段类型、字段扩展             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 规则引擎 (Rule Engine)                                │   │
│  │  - 验证规则、计算规则、联动规则、条件显示             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   业务抽象层 (Business Layer)                 │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐   │
│  │ 实体管理  │ 表单管理  │ 模板管理  │ 流程管理  │ 权限管理 │   │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   通用数据层 (Data Layer)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 通用实体模型 (Generic Entity Model)                   │   │
│  │  - Entity、EntityTemplate、EntityField、EntityValue  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   基础设施层 (Infrastructure)                 │
│  ┌─────────┬─────────┬─────────┬─────────┬─────────────┐    │
│  │ Umi Max │ React   │ Ant D   │ Axios   │ TypeScript  │    │
│  └─────────┴─────────┴─────────┴─────────┴─────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 核心设计原则

1. **配置优于编码** (Configuration over Code)
   - 新场景通过配置文件定义，无需修改代码
   - 字段、流程、规则全部配置化

2. **约定优于配置** (Convention over Configuration)
   - 提供合理的默认值和预设模板
   - 80% 场景开箱即用，20% 场景需要定制

3. **组合优于继承** (Composition over Inheritance)
   - 通过组合字段类型构建复杂表单
   - 场景通过组合基础能力实现

4. **渐进式增强** (Progressive Enhancement)
   - 基础功能对所有场景可用
   - 高级功能按需启用

---

## 📊 数据模型改造

### 改造策略：三层数据模型

```
┌─────────────────────────────────────────────────────────┐
│                    场景配置层                             │
│  (Scenario Configuration - JSON/YAML)                    │
│  定义：实体名称、字段映射、术语翻译、UI主题               │
└─────────────────────────────────────────────────────────┘
                          ↓ 映射
┌─────────────────────────────────────────────────────────┐
│                    通用业务层                             │
│  (Generic Business Model - TypeScript Interface)         │
│  抽象：Entity、Field、Value、Template、Rule              │
└─────────────────────────────────────────────────────────┘
                          ↓ 存储
┌─────────────────────────────────────────────────────────┐
│                    物理存储层                             │
│  (Physical Storage - Database Tables)                    │
│  表结构：entity、entity_field、entity_value              │
└─────────────────────────────────────────────────────────┘
```

### 1. 通用实体模型 (Generic Entity Model)

#### Entity - 实体实例

**新的通用实体模型**:
```typescript
/**
 * 通用实体实例
 * 替代原有的 DocumentType
 */
interface Entity {
  // === 基础标识 ===
  entityId: string;                    // 实体 ID
  entityType: string;                  // 实体类型（患者/设备/产品/船舶）
  entityNo: string;                    // 实体编号
  entityUuid: string;                  // 全局唯一标识

  // === 模板关联 ===
  templateId: string;                  // 模板 ID
  templateVersionId: string;           // 模板版本 ID
  templateName: string;                // 模板名称

  // === 场景信息 ===
  scenarioId: string;                  // 场景 ID（medical/inspection/shipping）
  scenarioName: string;                // 场景名称

  // === 核心字段（通用化） ===
  title: string;                       // 标题（替代 shipName）
  subtitle?: string;                   // 副标题（替代 cargoName）
  description?: string;                // 描述

  // === 时间字段（通用化） ===
  eventDate?: Date;                    // 事件日期（替代 berthingTime）
  startDate?: Date;                    // 开始日期
  endDate?: Date;                      // 结束日期（替代 departureTime）

  // === 分类字段（通用化） ===
  category?: string;                   // 主分类（替代 domesticForeignTradeType）
  subcategory?: string;                // 子分类（替代 shipType）
  tags?: string[];                     // 标签数组

  // === 地理位置（可选） ===
  location?: {
    name: string;                      // 地点名称
    address?: string;                  // 详细地址
    coordinates?: {                    // GPS 坐标
      latitude: number;
      longitude: number;
    };
    region?: string;                   // 区域
    building?: string;                 // 建筑物
    floor?: string;                    // 楼层
    room?: string;                     // 房间
  };

  // === 关联实体 ===
  relatedEntities?: {
    entityType: string;                // 关联实体类型
    entityId: string;                  // 关联实体 ID
    relationshipType: string;          // 关系类型（parent/child/reference）
    metadata?: Record<string, any>;    // 关系元数据
  }[];

  // === 流程控制 ===
  workflowId?: string;                 // 工作流 ID
  currentStep: string;                 // 当前步骤
  stepDefinition: string;              // 步骤定义（JSON）
  status: EntityStatus;                // 状态
  priority: Priority;                  // 优先级

  // === 权限控制 ===
  permissions: {
    owner: string;                     // 所有者
    viewers: string[];                 // 查看者列表
    editors: string[];                 // 编辑者列表
    approvers: string[];               // 审批者列表
  };

  // === 自定义字段（核心） ===
  customFields: Record<string, any>;   // 场景特定字段的存储

  // === 变量系统 ===
  variables: {
    name: string;                      // 变量名
    value: any;                        // 变量值
    type: FieldType;                   // 变量类型
    computed?: boolean;                // 是否计算字段
    formula?: string;                  // 计算公式
  }[];

  // === 附件 ===
  attachments?: {
    id: string;
    name: string;
    type: string;                      // image/pdf/doc/...
    url: string;
    size: number;
    uploadedBy: string;
    uploadedAt: Date;
  }[];

  // === 元数据 ===
  metadata: {
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    version: number;
    isDeleted: boolean;
    deletedBy?: string;
    deletedAt?: Date;
  };
}

/**
 * 实体状态枚举
 */
enum EntityStatus {
  DRAFT = 'draft',                     // 草稿
  IN_PROGRESS = 'in_progress',         // 进行中
  PENDING_REVIEW = 'pending_review',   // 待审核
  APPROVED = 'approved',               // 已批准
  REJECTED = 'rejected',               // 已拒绝
  COMPLETED = 'completed',             // 已完成
  ARCHIVED = 'archived',               // 已归档
  CANCELLED = 'cancelled',             // 已取消
}

/**
 * 优先级枚举
 */
enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}
```

#### EntityTemplate - 实体模板

```typescript
/**
 * 通用实体模板
 * 替代原有的 DocumentTemplateType
 */
interface EntityTemplate {
  // === 基础信息 ===
  templateId: string;
  templateName: string;
  templateNo: string;
  description?: string;
  icon?: string;

  // === 场景关联 ===
  scenarioId: string;                  // 所属场景
  entityType: string;                  // 实体类型

  // === 版本信息 ===
  version: string;
  status: TemplateStatus;

  // === 字段定义 ===
  fields: EntityFieldDefinition[];     // 字段定义数组

  // === 布局配置 ===
  layout: {
    type: 'grid' | 'flex' | 'tabs' | 'steps';
    columns?: number;
    sections?: {
      id: string;
      title: string;
      fields: string[];                // 字段 ID 数组
      collapsible?: boolean;
      defaultCollapsed?: boolean;
    }[];
  };

  // === 规则配置 ===
  rules: {
    validation: ValidationRule[];      // 验证规则
    calculation: CalculationRule[];    // 计算规则
    dependency: DependencyRule[];      // 依赖规则
    conditional: ConditionalRule[];    // 条件规则
  };

  // === 工作流配置 ===
  workflow?: {
    steps: WorkflowStep[];
    transitions: WorkflowTransition[];
  };

  // === 权限配置 ===
  permissions: {
    create: string[];                  // 可创建角色
    view: string[];                    // 可查看角色
    edit: string[];                    // 可编辑角色
    delete: string[];                  // 可删除角色
    approve: string[];                 // 可审批角色
  };

  // === 通知配置 ===
  notifications?: {
    onCreate?: NotificationConfig;
    onUpdate?: NotificationConfig;
    onSubmit?: NotificationConfig;
    onApprove?: NotificationConfig;
    onReject?: NotificationConfig;
  };

  // === 元数据 ===
  metadata: {
    createdBy: string;
    createdAt: Date;
    publishedBy?: string;
    publishedAt?: Date;
  };
}

/**
 * 模板状态
 */
enum TemplateStatus {
  DRAFT = 'draft',
  TESTING = 'testing',
  PUBLISHED = 'published',
  DEPRECATED = 'deprecated',
  ARCHIVED = 'archived',
}
```

#### EntityFieldDefinition - 字段定义

```typescript
/**
 * 实体字段定义
 */
interface EntityFieldDefinition {
  // === 基础信息 ===
  id: string;
  name: string;                        // 字段名（程序使用）
  label: string;                       // 字段标签（用户看到）
  placeholder?: string;
  helpText?: string;

  // === 字段类型 ===
  type: FieldType;

  // === 字段属性 ===
  required: boolean;
  readonly?: boolean;
  hidden?: boolean;
  disabled?: boolean;

  // === 默认值 ===
  defaultValue?: any;

  // === 验证规则 ===
  validation?: {
    rules: ValidationRule[];
    errorMessage?: string;
  };

  // === 字段选项（用于选择类字段） ===
  options?: FieldOption[];

  // === 数据源配置（用于动态选项） ===
  dataSource?: {
    type: 'static' | 'api' | 'entity';
    config: any;
  };

  // === 条件显示 ===
  conditional?: {
    field: string;                     // 依赖字段
    operator: ComparisonOperator;
    value: any;
    logicalOperator?: 'and' | 'or';
  }[];

  // === 字段依赖 ===
  dependencies?: string[];             // 依赖的其他字段

  // === 计算配置 ===
  computed?: {
    formula: string;                   // 计算公式
    dependencies: string[];            // 依赖字段
  };

  // === UI 配置 ===
  ui?: {
    width?: string | number;           // 字段宽度
    grid?: {                           // Grid 布局
      span?: number;
      offset?: number;
    };
    style?: React.CSSProperties;
    className?: string;
  };

  // === 字段特定配置 ===
  config?: Record<string, any>;        // 字段类型特定的配置
}

/**
 * 字段类型枚举
 */
enum FieldType {
  // 基础类型
  TEXT = 'text',
  NUMBER = 'number',
  EMAIL = 'email',
  PHONE = 'phone',
  URL = 'url',

  // 日期时间
  DATE = 'date',
  DATETIME = 'datetime',
  TIME = 'time',
  DATE_RANGE = 'date_range',

  // 选择类型
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  CASCADER = 'cascader',

  // 文本类型
  TEXTAREA = 'textarea',
  RICH_TEXT = 'rich_text',
  MARKDOWN = 'markdown',
  CODE = 'code',

  // 数值类型
  SLIDER = 'slider',
  RATE = 'rate',

  // 文件类型
  FILE = 'file',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',

  // 特殊类型
  LOCATION = 'location',
  SIGNATURE = 'signature',
  QR_CODE = 'qr_code',
  BARCODE = 'barcode',

  // 复杂类型
  TABLE = 'table',
  SUB_FORM = 'sub_form',
  REPEATER = 'repeater',

  // 展示类型
  DIVIDER = 'divider',
  TEXT_BLOCK = 'text_block',
  IMAGE_BLOCK = 'image_block',

  // 关联类型
  ENTITY_REFERENCE = 'entity_reference',
  USER_SELECT = 'user_select',
  ORG_SELECT = 'org_select',

  // 自定义类型
  CUSTOM = 'custom',
}

/**
 * 比较操作符
 */
type ComparisonOperator =
  | 'eq'          // 等于
  | 'ne'          // 不等于
  | 'gt'          // 大于
  | 'gte'         // 大于等于
  | 'lt'          // 小于
  | 'lte'         // 小于等于
  | 'in'          // 包含于
  | 'not_in'      // 不包含于
  | 'contains'    // 包含
  | 'starts_with' // 开始于
  | 'ends_with'   // 结束于
  | 'is_empty'    // 为空
  | 'is_not_empty'; // 不为空
```

### 2. 场景配置模型 (Scenario Configuration)

```typescript
/**
 * 场景配置
 * 定义一个业务场景的完整配置
 */
interface ScenarioConfig {
  // === 基础信息 ===
  id: string;                          // 场景 ID（medical/inspection/shipping）
  name: string;                        // 场景名称
  displayName: string;                 // 显示名称
  description: string;                 // 场景描述
  icon: string;                        // 场景图标
  version: string;                     // 场景版本

  // === 实体定义 ===
  entities: {
    [entityType: string]: {
      name: string;                    // 实体名称
      displayName: string;             // 显示名称
      icon: string;
      description?: string;

      // 预设字段
      presetFields: EntityFieldDefinition[];

      // 字段映射（将通用字段映射到场景术语）
      fieldMapping: {
        [genericField: string]: {
          label: string;               // 场景中的标签
          helpText?: string;
          placeholder?: string;
        };
      };
    };
  };

  // === 术语表 ===
  terminology: {
    [key: string]: string;             // 通用术语 → 场景术语
  };

  // === 工作流预设 ===
  workflows: {
    [workflowId: string]: {
      name: string;
      steps: WorkflowStep[];
      transitions: WorkflowTransition[];
    };
  };

  // === 权限预设 ===
  roles: {
    [roleId: string]: {
      name: string;
      displayName: string;
      permissions: string[];
    };
  };

  // === UI 主题 ===
  theme: {
    primaryColor: string;
    layout: 'vertical' | 'horizontal' | 'inline';
    labelPosition: 'top' | 'left' | 'right';
    componentSize: 'small' | 'middle' | 'large';
  };

  // === 功能开关 ===
  features: {
    enableGeolocation: boolean;        // 启用地理定位
    enableSignature: boolean;          // 启用电子签名
    enableAttachment: boolean;         // 启用附件
    enableComment: boolean;            // 启用评论
    enableVersion: boolean;            // 启用版本控制
    enableExport: boolean;             // 启用导出
    enableImport: boolean;             // 启用导入
  };

  // === 集成配置 ===
  integrations?: {
    [integrationType: string]: {
      enabled: boolean;
      config: Record<string, any>;
    };
  };
}
```

### 3. 数据迁移映射

```typescript
/**
 * 从旧模型到新模型的映射函数
 */
class DataMigration {
  /**
   * 迁移 Document → Entity
   */
  static migrateDocument(oldDoc: DocumentType, scenario: ScenarioConfig): Entity {
    return {
      entityId: oldDoc.documentId,
      entityType: 'ship_operation',
      entityNo: oldDoc.documentNo,
      entityUuid: oldDoc.documentUuid,

      templateId: oldDoc.documentTemplateId.toString(),
      templateVersionId: oldDoc.documentTemplateVersionId.toString(),
      templateName: oldDoc.templateName,

      scenarioId: 'shipping',
      scenarioName: '港口航运',

      // 字段映射
      title: oldDoc.shipName || oldDoc.documentNo,
      subtitle: oldDoc.cargoName,

      eventDate: oldDoc.berthingTime ? new Date(oldDoc.berthingTime) : undefined,
      endDate: oldDoc.departureTime ? new Date(oldDoc.departureTime) : undefined,

      category: this.mapTradeType(oldDoc.domesticForeignTradeType),
      subcategory: oldDoc.shipType,

      currentStep: oldDoc.currentStep,
      status: this.mapStatus(oldDoc.fillinStatus),

      permissions: {
        owner: oldDoc.editorList?.split(',')[0] || '',
        viewers: oldDoc.viewerList?.split(',') || [],
        editors: oldDoc.editorList?.split(',') || [],
        approvers: [],
      },

      // 将原有的特定字段存入 customFields
      customFields: {
        shipName: oldDoc.shipName,
        cargoName: oldDoc.cargoName,
        berthingTime: oldDoc.berthingTime,
        departureTime: oldDoc.departureTime,
        domesticForeignTradeType: oldDoc.domesticForeignTradeType,
        shipType: oldDoc.shipType,
        // ... 其他原有字段
      },

      variables: this.parseVariables(oldDoc.varValueList),

      metadata: {
        createdBy: oldDoc.editorList?.split(',')[0] || '',
        createdAt: new Date(oldDoc.inputStartTime || Date.now()),
        updatedBy: oldDoc.editorList?.split(',')[0] || '',
        updatedAt: new Date(oldDoc.inputFinishTime || Date.now()),
        version: 1,
        isDeleted: false,
      },
    };
  }

  /**
   * 贸易类型映射
   */
  private static mapTradeType(type: string): string {
    const mapping: Record<string, string> = {
      '1': '国内贸易',
      '2': '国际贸易',
    };
    return mapping[type] || type;
  }

  /**
   * 状态映射
   */
  private static mapStatus(status: string): EntityStatus {
    const mapping: Record<string, EntityStatus> = {
      'draft': EntityStatus.DRAFT,
      'filling': EntityStatus.IN_PROGRESS,
      'submitted': EntityStatus.PENDING_REVIEW,
      'approved': EntityStatus.APPROVED,
      'completed': EntityStatus.COMPLETED,
    };
    return mapping[status] || EntityStatus.DRAFT;
  }

  /**
   * 解析变量列表
   */
  private static parseVariables(varValueList: string): Entity['variables'] {
    try {
      const vars = JSON.parse(varValueList || '[]');
      return vars.map((v: any) => ({
        name: v.varName,
        value: v.varValue,
        type: v.varType,
        computed: v.computed || false,
        formula: v.formula,
      }));
    } catch {
      return [];
    }
  }
}
```

---

## 🎨 前端组件改造

### 1. 场景管理器 (Scenario Manager)

```typescript
/**
 * 场景管理器
 * 负责场景的加载、切换、配置管理
 */
class ScenarioManager {
  private static instance: ScenarioManager;
  private currentScenario?: ScenarioConfig;
  private scenarios: Map<string, ScenarioConfig> = new Map();

  /**
   * 获取单例实例
   */
  static getInstance(): ScenarioManager {
    if (!this.instance) {
      this.instance = new ScenarioManager();
    }
    return this.instance;
  }

  /**
   * 注册场景
   */
  registerScenario(scenario: ScenarioConfig) {
    this.scenarios.set(scenario.id, scenario);
  }

  /**
   * 加载场景
   */
  async loadScenario(scenarioId: string): Promise<ScenarioConfig> {
    // 从服务器或本地加载场景配置
    const response = await fetch(`/api/scenarios/${scenarioId}`);
    const scenario = await response.json();
    this.registerScenario(scenario);
    return scenario;
  }

  /**
   * 切换场景
   */
  switchScenario(scenarioId: string) {
    const scenario = this.scenarios.get(scenarioId);
    if (!scenario) {
      throw new Error(`Scenario ${scenarioId} not found`);
    }
    this.currentScenario = scenario;

    // 触发场景切换事件
    this.notifyScenarioChange(scenario);
  }

  /**
   * 获取当前场景
   */
  getCurrentScenario(): ScenarioConfig | undefined {
    return this.currentScenario;
  }

  /**
   * 获取场景术语
   */
  getTerm(key: string): string {
    if (!this.currentScenario) return key;
    return this.currentScenario.terminology[key] || key;
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
   * 通知场景切换
   */
  private notifyScenarioChange(scenario: ScenarioConfig) {
    // 更新 i18n
    // 更新主题
    // 更新路由
    // ...
  }
}
```

### 2. 字段类型注册器 (Field Type Registry)

```typescript
/**
 * 字段类型基类
 */
abstract class BaseFieldType<T = any> {
  abstract type: FieldType;
  abstract component: React.ComponentType<FieldProps<T>>;

  /**
   * 验证字段值
   */
  validate(value: T, rules: ValidationRule[]): ValidationResult {
    const errors: string[] = [];

    for (const rule of rules) {
      const error = this.validateRule(value, rule);
      if (error) errors.push(error);
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * 验证单条规则
   */
  protected abstract validateRule(value: T, rule: ValidationRule): string | null;

  /**
   * 序列化值（保存到数据库）
   */
  serialize(value: T): any {
    return value;
  }

  /**
   * 反序列化值（从数据库读取）
   */
  deserialize(value: any): T {
    return value;
  }

  /**
   * 格式化显示值
   */
  format(value: T): string {
    return String(value);
  }
}

/**
 * 字段类型注册器
 */
class FieldTypeRegistry {
  private static instance: FieldTypeRegistry;
  private types: Map<FieldType, BaseFieldType> = new Map();

  static getInstance(): FieldTypeRegistry {
    if (!this.instance) {
      this.instance = new FieldTypeRegistry();
      this.instance.registerBuiltInTypes();
    }
    return this.instance;
  }

  /**
   * 注册内置字段类型
   */
  private registerBuiltInTypes() {
    this.register(new TextField());
    this.register(new NumberField());
    this.register(new DateField());
    this.register(new SelectField());
    this.register(new FileField());
    this.register(new ImageField());
    this.register(new LocationField());
    this.register(new SignatureField());
    this.register(new TableField());
    this.register(new RichTextField());
    // ... 更多内置类型
  }

  /**
   * 注册字段类型
   */
  register(fieldType: BaseFieldType) {
    this.types.set(fieldType.type, fieldType);
  }

  /**
   * 获取字段类型
   */
  get(type: FieldType): BaseFieldType | undefined {
    return this.types.get(type);
  }

  /**
   * 获取所有字段类型
   */
  getAll(): BaseFieldType[] {
    return Array.from(this.types.values());
  }

  /**
   * 注册自定义字段类型
   */
  registerCustom(type: string, component: React.ComponentType<FieldProps>) {
    const customField = new CustomFieldType(type, component);
    this.types.set(type as FieldType, customField);
  }
}

/**
 * 文本字段类型实现
 */
class TextField extends BaseFieldType<string> {
  type = FieldType.TEXT;
  component = TextInput;

  protected validateRule(value: string, rule: ValidationRule): string | null {
    switch (rule.type) {
      case 'required':
        return !value ? rule.message || '此字段为必填项' : null;
      case 'min':
        return value && value.length < rule.value
          ? rule.message || `长度不能少于${rule.value}个字符`
          : null;
      case 'max':
        return value && value.length > rule.value
          ? rule.message || `长度不能超过${rule.value}个字符`
          : null;
      case 'pattern':
        return value && !new RegExp(rule.value).test(value)
          ? rule.message || '格式不正确'
          : null;
      default:
        return null;
    }
  }
}

/**
 * 地理位置字段类型实现
 */
class LocationField extends BaseFieldType<Location> {
  type = FieldType.LOCATION;
  component = LocationPicker;

  protected validateRule(value: Location, rule: ValidationRule): string | null {
    if (rule.type === 'required') {
      return !value || !value.coordinates
        ? rule.message || '请选择位置'
        : null;
    }
    return null;
  }

  serialize(value: Location): any {
    return JSON.stringify(value);
  }

  deserialize(value: any): Location {
    return typeof value === 'string' ? JSON.parse(value) : value;
  }

  format(value: Location): string {
    return value.name || value.address || '未指定位置';
  }
}
```

### 3. 规则引擎 (Rule Engine)

```typescript
/**
 * 规则引擎
 * 处理验证、计算、联动、条件显示等规则
 */
class RuleEngine {
  /**
   * 验证字段
   */
  async validateField(
    field: EntityFieldDefinition,
    value: any,
    formData: Record<string, any>
  ): Promise<ValidationResult> {
    const errors: string[] = [];
    const fieldType = FieldTypeRegistry.getInstance().get(field.type);

    if (!fieldType) {
      return { valid: true };
    }

    // 执行字段类型的内置验证
    if (field.validation?.rules) {
      const result = fieldType.validate(value, field.validation.rules);
      if (!result.valid && result.errors) {
        errors.push(...result.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  /**
   * 执行计算
   */
  calculate(
    formula: string,
    dependencies: string[],
    formData: Record<string, any>
  ): any {
    try {
      // 构建计算上下文
      const context: Record<string, any> = {};
      dependencies.forEach(dep => {
        context[dep] = formData[dep];
      });

      // 安全的公式求值（使用 math.js 或自定义解析器）
      // 这里简化处理
      const result = eval(this.replaceVariables(formula, context));
      return result;
    } catch (error) {
      console.error('Formula calculation error:', error);
      return null;
    }
  }

  /**
   * 评估条件显示
   */
  evaluateConditional(
    conditional: EntityFieldDefinition['conditional'],
    formData: Record<string, any>
  ): boolean {
    if (!conditional || conditional.length === 0) {
      return true;
    }

    return conditional.reduce((result, condition, index) => {
      const fieldValue = formData[condition.field];
      const currentResult = this.compareValues(
        fieldValue,
        condition.operator,
        condition.value
      );

      if (index === 0) return currentResult;

      return condition.logicalOperator === 'or'
        ? result || currentResult
        : result && currentResult;
    }, true);
  }

  /**
   * 比较值
   */
  private compareValues(
    fieldValue: any,
    operator: ComparisonOperator,
    compareValue: any
  ): boolean {
    switch (operator) {
      case 'eq':
        return fieldValue === compareValue;
      case 'ne':
        return fieldValue !== compareValue;
      case 'gt':
        return Number(fieldValue) > Number(compareValue);
      case 'gte':
        return Number(fieldValue) >= Number(compareValue);
      case 'lt':
        return Number(fieldValue) < Number(compareValue);
      case 'lte':
        return Number(fieldValue) <= Number(compareValue);
      case 'in':
        return Array.isArray(compareValue) && compareValue.includes(fieldValue);
      case 'not_in':
        return Array.isArray(compareValue) && !compareValue.includes(fieldValue);
      case 'contains':
        return String(fieldValue).includes(String(compareValue));
      case 'starts_with':
        return String(fieldValue).startsWith(String(compareValue));
      case 'ends_with':
        return String(fieldValue).endsWith(String(compareValue));
      case 'is_empty':
        return !fieldValue || (Array.isArray(fieldValue) && fieldValue.length === 0);
      case 'is_not_empty':
        return !!fieldValue && (!Array.isArray(fieldValue) || fieldValue.length > 0);
      default:
        return false;
    }
  }

  /**
   * 替换公式中的变量
   */
  private replaceVariables(formula: string, context: Record<string, any>): string {
    let result = formula;
    Object.keys(context).forEach(key => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      result = result.replace(regex, String(context[key] || 0));
    });
    return result;
  }
}
```

### 4. 通用表单渲染器 (Generic Form Renderer)

```typescript
/**
 * 通用表单渲染器组件
 */
interface GenericFormRendererProps {
  template: EntityTemplate;
  entity?: Entity;
  mode: 'create' | 'edit' | 'view';
  onSubmit?: (data: Partial<Entity>) => void;
  onChange?: (field: string, value: any) => void;
}

const GenericFormRenderer: React.FC<GenericFormRendererProps> = ({
  template,
  entity,
  mode,
  onSubmit,
  onChange,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(
    entity?.customFields || {}
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());

  const scenarioManager = ScenarioManager.getInstance();
  const fieldRegistry = FieldTypeRegistry.getInstance();
  const ruleEngine = new RuleEngine();

  // 计算字段可见性
  useEffect(() => {
    const visible = new Set<string>();

    template.fields.forEach(field => {
      const isVisible = ruleEngine.evaluateConditional(
        field.conditional,
        formData
      );
      if (isVisible) {
        visible.add(field.id);
      }
    });

    setVisibleFields(visible);
  }, [formData, template.fields]);

  // 处理字段变更
  const handleFieldChange = async (fieldId: string, value: any) => {
    const field = template.fields.find(f => f.id === fieldId);
    if (!field) return;

    // 更新表单数据
    const newData = { ...formData, [field.name]: value };
    setFormData(newData);
    onChange?.(field.name, value);

    // 处理计算字段
    template.fields.forEach(f => {
      if (f.computed && f.computed.dependencies.includes(field.name)) {
        const computedValue = ruleEngine.calculate(
          f.computed.formula,
          f.computed.dependencies,
          newData
        );
        newData[f.name] = computedValue;
        setFormData(prev => ({ ...prev, [f.name]: computedValue }));
      }
    });

    // 验证字段
    const validationResult = await ruleEngine.validateField(field, value, newData);
    setValidationErrors(prev => ({
      ...prev,
      [fieldId]: validationResult.errors?.[0] || '',
    }));
  };

  // 渲染字段
  const renderField = (field: EntityFieldDefinition) => {
    if (!visibleFields.has(field.id)) return null;

    const fieldType = fieldRegistry.get(field.type);
    if (!fieldType) {
      console.warn(`Field type ${field.type} not found`);
      return null;
    }

    const FieldComponent = fieldType.component;
    const value = formData[field.name] ?? field.defaultValue;
    const error = validationErrors[field.id];
    const readonly = mode === 'view' || field.readonly;

    return (
      <Form.Item
        key={field.id}
        label={scenarioManager.getFieldLabel(template.entityType, field.name) || field.label}
        required={field.required}
        validateStatus={error ? 'error' : ''}
        help={error || field.helpText}
        {...field.ui?.grid}
      >
        <FieldComponent
          value={value}
          onChange={(newValue) => handleFieldChange(field.id, newValue)}
          options={field.options}
          readonly={readonly}
          disabled={field.disabled}
          placeholder={field.placeholder}
          config={field.config}
        />
      </Form.Item>
    );
  };

  // 渲染表单
  return (
    <Form
      layout={template.layout.type === 'grid' ? 'horizontal' : 'vertical'}
      onFinish={() => onSubmit?.(formData)}
    >
      {/* 按 sections 渲染 */}
      {template.layout.sections?.map(section => (
        <Card
          key={section.id}
          title={section.title}
          size="small"
          style={{ marginBottom: 16 }}
        >
          <Row gutter={16}>
            {section.fields.map(fieldId => {
              const field = template.fields.find(f => f.id === fieldId);
              return field ? renderField(field) : null;
            })}
          </Row>
        </Card>
      ))}

      {/* 渲染未分组字段 */}
      <Row gutter={16}>
        {template.fields
          .filter(f => !template.layout.sections?.some(s => s.fields.includes(f.id)))
          .map(renderField)}
      </Row>

      {/* 操作按钮 */}
      {mode !== 'view' && (
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
            <Button>
              取消
            </Button>
          </Space>
        </Form.Item>
      )}
    </Form>
  );
};
```

### 5. 场景切换组件

```typescript
/**
 * 场景选择器组件
 */
const ScenarioSelector: React.FC = () => {
  const [scenarios, setScenarios] = useState<ScenarioConfig[]>([]);
  const [current, setCurrent] = useState<string>();

  useEffect(() => {
    // 加载可用场景
    fetchScenarios().then(setScenarios);
  }, []);

  const handleScenarioChange = (scenarioId: string) => {
    const manager = ScenarioManager.getInstance();
    manager.switchScenario(scenarioId);
    setCurrent(scenarioId);

    // 刷新页面或重新加载路由
    window.location.reload();
  };

  return (
    <Select
      value={current}
      onChange={handleScenarioChange}
      style={{ width: 200 }}
      placeholder="选择场景"
    >
      {scenarios.map(scenario => (
        <Select.Option key={scenario.id} value={scenario.id}>
          <Space>
            {scenario.icon && <Icon component={scenario.icon} />}
            <span>{scenario.displayName}</span>
          </Space>
        </Select.Option>
      ))}
    </Select>
  );
};
```

---

## 🔄 场景配置示例

### 1. 医疗调研场景配置

```json
{
  "id": "medical",
  "name": "medical_research",
  "displayName": "医疗调研",
  "description": "用于医疗机构的患者调研和病历管理",
  "icon": "MedicineBoxOutlined",
  "version": "1.0.0",

  "entities": {
    "patient_record": {
      "name": "patient_record",
      "displayName": "患者病历",
      "icon": "FileTextOutlined",
      "description": "患者就诊病历记录",

      "presetFields": [
        {
          "id": "patient_id",
          "name": "patientId",
          "label": "患者ID",
          "type": "text",
          "required": true,
          "validation": {
            "rules": [
              { "type": "required", "message": "请输入患者ID" },
              { "type": "pattern", "value": "^[A-Z0-9]{8}$", "message": "患者ID格式：8位大写字母或数字" }
            ]
          }
        },
        {
          "id": "patient_name",
          "name": "patientName",
          "label": "患者姓名",
          "type": "text",
          "required": true
        },
        {
          "id": "gender",
          "name": "gender",
          "label": "性别",
          "type": "radio",
          "required": true,
          "options": [
            { "label": "男", "value": "male" },
            { "label": "女", "value": "female" }
          ]
        },
        {
          "id": "birth_date",
          "name": "birthDate",
          "label": "出生日期",
          "type": "date",
          "required": true
        },
        {
          "id": "age",
          "name": "age",
          "label": "年龄",
          "type": "number",
          "readonly": true,
          "computed": {
            "formula": "Math.floor((new Date() - new Date({birthDate})) / (365.25 * 24 * 60 * 60 * 1000))",
            "dependencies": ["birthDate"]
          }
        },
        {
          "id": "department",
          "name": "department",
          "label": "就诊科室",
          "type": "select",
          "required": true,
          "options": [
            { "label": "内科", "value": "internal" },
            { "label": "外科", "value": "surgery" },
            { "label": "儿科", "value": "pediatrics" },
            { "label": "妇产科", "value": "gynecology" }
          ]
        },
        {
          "id": "doctor",
          "name": "doctor",
          "label": "主治医生",
          "type": "user_select",
          "required": true
        },
        {
          "id": "symptoms",
          "name": "symptoms",
          "label": "主诉症状",
          "type": "textarea",
          "required": true,
          "validation": {
            "rules": [
              { "type": "required", "message": "请描述患者症状" },
              { "type": "min", "value": 10, "message": "症状描述不能少于10个字" }
            ]
          }
        },
        {
          "id": "diagnosis",
          "name": "diagnosis",
          "label": "诊断结果",
          "type": "rich_text",
          "required": true
        },
        {
          "id": "treatment_plan",
          "name": "treatmentPlan",
          "label": "治疗方案",
          "type": "table",
          "required": true,
          "config": {
            "columns": [
              { "name": "medicine", "label": "药品名称", "type": "text", "required": true },
              { "name": "dosage", "label": "剂量", "type": "text", "required": true },
              { "name": "frequency", "label": "用药频率", "type": "select", "options": [
                { "label": "每日一次", "value": "once_daily" },
                { "label": "每日两次", "value": "twice_daily" },
                { "label": "每日三次", "value": "three_times_daily" }
              ]},
              { "name": "duration", "label": "疗程（天）", "type": "number" }
            ]
          }
        },
        {
          "id": "medical_images",
          "name": "medicalImages",
          "label": "医学影像",
          "type": "image",
          "config": {
            "multiple": true,
            "maxCount": 10,
            "accept": "image/*"
          }
        },
        {
          "id": "doctor_signature",
          "name": "doctorSignature",
          "label": "医生签名",
          "type": "signature",
          "required": true
        }
      ],

      "fieldMapping": {
        "title": { "label": "病历编号", "placeholder": "自动生成" },
        "eventDate": { "label": "就诊日期" },
        "category": { "label": "就诊类型", "helpText": "初诊/复诊" },
        "status": { "label": "病历状态" }
      }
    }
  },

  "terminology": {
    "entity": "病历",
    "template": "病历模板",
    "document": "病历文档",
    "create": "创建病历",
    "edit": "编辑病历",
    "view": "查看病历",
    "submit": "提交病历",
    "approve": "审核病历"
  },

  "workflows": {
    "diagnosis_workflow": {
      "name": "诊疗流程",
      "steps": [
        { "id": "registration", "name": "挂号", "assignee": "nurse" },
        { "id": "diagnosis", "name": "问诊", "assignee": "doctor" },
        { "id": "treatment", "name": "治疗", "assignee": "doctor" },
        { "id": "review", "name": "复查", "assignee": "doctor", "optional": true },
        { "id": "completed", "name": "完成", "assignee": "system" }
      ],
      "transitions": [
        { "from": "registration", "to": "diagnosis" },
        { "from": "diagnosis", "to": "treatment" },
        { "from": "treatment", "to": "review" },
        { "from": "treatment", "to": "completed" },
        { "from": "review", "to": "completed" }
      ]
    }
  },

  "roles": {
    "doctor": {
      "name": "doctor",
      "displayName": "医生",
      "permissions": ["view", "create", "edit", "submit", "approve"]
    },
    "nurse": {
      "name": "nurse",
      "displayName": "护士",
      "permissions": ["view", "create", "edit"]
    },
    "admin": {
      "name": "admin",
      "displayName": "管理员",
      "permissions": ["view", "create", "edit", "submit", "approve", "delete", "export"]
    }
  },

  "theme": {
    "primaryColor": "#1890ff",
    "layout": "vertical",
    "labelPosition": "top",
    "componentSize": "middle"
  },

  "features": {
    "enableGeolocation": false,
    "enableSignature": true,
    "enableAttachment": true,
    "enableComment": true,
    "enableVersion": true,
    "enableExport": true,
    "enableImport": false
  }
}
```

### 2. 工业巡检场景配置

```json
{
  "id": "inspection",
  "name": "industrial_inspection",
  "displayName": "工业巡检",
  "description": "用于工厂设备的定期巡检和维护记录",
  "icon": "ToolOutlined",
  "version": "1.0.0",

  "entities": {
    "inspection_record": {
      "name": "inspection_record",
      "displayName": "巡检记录",
      "icon": "CheckSquareOutlined",

      "presetFields": [
        {
          "id": "equipment_id",
          "name": "equipmentId",
          "label": "设备编号",
          "type": "text",
          "required": true
        },
        {
          "id": "equipment_name",
          "name": "equipmentName",
          "label": "设备名称",
          "type": "text",
          "required": true
        },
        {
          "id": "equipment_location",
          "name": "equipmentLocation",
          "label": "设备位置",
          "type": "location",
          "required": true,
          "config": {
            "enableGPS": true,
            "enableMap": true
          }
        },
        {
          "id": "inspection_type",
          "name": "inspectionType",
          "label": "巡检类型",
          "type": "select",
          "required": true,
          "options": [
            { "label": "日常巡检", "value": "daily" },
            { "label": "周检", "value": "weekly" },
            { "label": "月检", "value": "monthly" },
            { "label": "年检", "value": "yearly" },
            { "label": "专项检查", "value": "special" }
          ]
        },
        {
          "id": "inspection_items",
          "name": "inspectionItems",
          "label": "检查项目",
          "type": "table",
          "required": true,
          "config": {
            "columns": [
              { "name": "item", "label": "检查项", "type": "text", "required": true },
              { "name": "standard", "label": "检查标准", "type": "text" },
              { "name": "result", "label": "检查结果", "type": "select", "required": true, "options": [
                { "label": "✓ 合格", "value": "pass" },
                { "label": "✗ 不合格", "value": "fail" },
                { "label": "⚠ 需整改", "value": "need_fix" }
              ]},
              { "name": "value", "label": "测量值", "type": "text" },
              { "name": "photos", "label": "现场照片", "type": "image", "config": { "multiple": true, "maxCount": 5 } },
              { "name": "notes", "label": "备注", "type": "textarea" }
            ],
            "minRows": 1
          }
        },
        {
          "id": "overall_status",
          "name": "overallStatus",
          "label": "综合评价",
          "type": "radio",
          "required": true,
          "options": [
            { "label": "良好", "value": "good" },
            { "label": "一般", "value": "normal" },
            { "label": "较差", "value": "poor" },
            { "label": "危险", "value": "dangerous" }
          ]
        },
        {
          "id": "issues_found",
          "name": "issuesFound",
          "label": "发现的问题",
          "type": "textarea",
          "conditional": [
            { "field": "overallStatus", "operator": "in", "value": ["poor", "dangerous"] }
          ]
        },
        {
          "id": "corrective_actions",
          "name": "correctiveActions",
          "label": "整改措施",
          "type": "textarea",
          "conditional": [
            { "field": "issuesFound", "operator": "is_not_empty" }
          ]
        },
        {
          "id": "inspector",
          "name": "inspector",
          "label": "巡检员",
          "type": "user_select",
          "required": true
        },
        {
          "id": "inspector_signature",
          "name": "inspectorSignature",
          "label": "巡检员签名",
          "type": "signature",
          "required": true
        }
      ],

      "fieldMapping": {
        "title": { "label": "巡检单号" },
        "eventDate": { "label": "巡检日期" },
        "category": { "label": "设备类别" },
        "subcategory": { "label": "设备型号" },
        "status": { "label": "巡检状态" }
      }
    }
  },

  "terminology": {
    "entity": "巡检记录",
    "template": "巡检模板",
    "create": "创建巡检",
    "edit": "编辑巡检",
    "submit": "提交巡检",
    "approve": "审核巡检"
  },

  "workflows": {
    "inspection_workflow": {
      "name": "巡检流程",
      "steps": [
        { "id": "plan", "name": "制定计划", "assignee": "manager" },
        { "id": "execute", "name": "执行巡检", "assignee": "inspector" },
        { "id": "record", "name": "记录结果", "assignee": "inspector" },
        { "id": "review", "name": "审核确认", "assignee": "manager" },
        { "id": "rectify", "name": "整改（如需）", "assignee": "maintenance", "optional": true },
        { "id": "verify", "name": "验证整改", "assignee": "inspector", "optional": true },
        { "id": "completed", "name": "完成归档", "assignee": "system" }
      ]
    }
  },

  "roles": {
    "inspector": {
      "name": "inspector",
      "displayName": "巡检员",
      "permissions": ["view", "create", "edit", "submit"]
    },
    "manager": {
      "name": "manager",
      "displayName": "主管",
      "permissions": ["view", "create", "edit", "submit", "approve"]
    },
    "maintenance": {
      "name": "maintenance",
      "displayName": "维修员",
      "permissions": ["view", "edit"]
    }
  },

  "theme": {
    "primaryColor": "#52c41a",
    "layout": "vertical",
    "labelPosition": "top",
    "componentSize": "middle"
  },

  "features": {
    "enableGeolocation": true,
    "enableSignature": true,
    "enableAttachment": true,
    "enableComment": true,
    "enableVersion": false,
    "enableExport": true,
    "enableImport": true
  }
}
```

---

## 📋 实施路线图

### 阶段一：基础架构改造（2-3周）

**目标**: 建立通用化基础设施

#### Week 1: 数据模型重构
- [ ] 设计通用实体模型 (Entity)
- [ ] 设计场景配置模型 (ScenarioConfig)
- [ ] 实现数据迁移工具
- [ ] 创建数据库迁移脚本
- [ ] 单元测试

**产出**:
- `src/common/data_type/generic/entity.ts`
- `src/common/data_type/generic/scenario.ts`
- `src/utils/data-migration.ts`
- 数据库迁移脚本

#### Week 2: 场景管理器
- [ ] 实现场景管理器 (ScenarioManager)
- [ ] 实现场景加载和切换
- [ ] 实现术语映射
- [ ] 场景配置验证
- [ ] 集成测试

**产出**:
- `src/core/scenario-manager.ts`
- `src/core/scenario-loader.ts`
- API: `/api/scenarios/*`

#### Week 3: 字段类型系统
- [ ] 实现字段类型注册器
- [ ] 实现内置字段类型（15+种）
- [ ] 实现自定义字段类型支持
- [ ] 字段验证框架
- [ ] 组件测试

**产出**:
- `src/core/field-type-registry.ts`
- `src/core/field-types/*`
- `src/components/field-types/*`

---

### 阶段二：核心引擎开发（3-4周）

**目标**: 实现动态表单和规则引擎

#### Week 4-5: 规则引擎
- [ ] 验证规则引擎
- [ ] 计算规则引擎
- [ ] 条件显示引擎
- [ ] 字段依赖管理
- [ ] 性能优化

**产出**:
- `src/core/rule-engine.ts`
- `src/core/validation-engine.ts`
- `src/core/calculation-engine.ts`

#### Week 6-7: 通用表单渲染器
- [ ] 实现通用表单渲染器组件
- [ ] 实现动态布局引擎
- [ ] 实现字段联动
- [ ] 实现表单验证
- [ ] 响应式设计
- [ ] 性能优化

**产出**:
- `src/components/generic-form-renderer.tsx`
- `src/components/field-renderer.tsx`
- `src/components/layout-engine.tsx`

---

### 阶段三：场景适配（2-3周）

**目标**: 创建预设场景配置

#### Week 8: 港口航运场景迁移
- [ ] 创建港口航运场景配置
- [ ] 迁移现有模板到新场景
- [ ] 迁移现有数据
- [ ] 功能对比测试
- [ ] 用户验收测试

**产出**:
- `scenarios/shipping.json`
- 数据迁移报告
- 测试报告

#### Week 9: 医疗调研场景
- [ ] 创建医疗调研场景配置
- [ ] 设计病历模板
- [ ] 实现特定字段组件
- [ ] 场景测试
- [ ] 文档编写

**产出**:
- `scenarios/medical.json`
- 场景使用手册

#### Week 10: 工业巡检场景
- [ ] 创建工业巡检场景配置
- [ ] 设计巡检模板
- [ ] 实现 GPS 定位组件
- [ ] 场景测试
- [ ] 文档编写

**产出**:
- `scenarios/inspection.json`
- 场景使用手册

---

### 阶段四：管理工具开发（2-3周）

**目标**: 提供场景和模板管理界面

#### Week 11-12: 场景管理器
- [ ] 场景列表页面
- [ ] 场景创建/编辑页面
- [ ] 场景导入/导出功能
- [ ] 场景版本管理
- [ ] 场景预览功能

**产出**:
- `src/pages/admin/scenario-manager/*`

#### Week 13: 模板设计器增强
- [ ] 可视化字段拖拽
- [ ] 字段属性配置面板
- [ ] 规则配置界面
- [ ] 实时预览
- [ ] 模板测试功能

**产出**:
- `src/pages/admin/template-designer/*`

---

### 阶段五：测试和优化（2-3周）

**目标**: 全面测试和性能优化

#### Week 14: 集成测试
- [ ] 端到端测试
- [ ] 场景切换测试
- [ ] 数据迁移验证
- [ ] 性能测试
- [ ] 安全测试

#### Week 15: 性能优化
- [ ] 表单渲染性能优化
- [ ] 大数据量处理优化
- [ ] 缓存策略优化
- [ ] 代码分割
- [ ] CDN 部署优化

#### Week 16: 用户文档
- [ ] 用户使用手册
- [ ] 场景配置指南
- [ ] API 文档
- [ ] 开发者文档
- [ ] 视频教程

---

### 阶段六：上线和推广（1-2周）

**目标**: 灰度发布和全面上线

#### Week 17: 灰度发布
- [ ] 选择试点部门
- [ ] 灰度发布配置
- [ ] 监控和反馈收集
- [ ] 问题修复
- [ ] 用户培训

#### Week 18: 全面上线
- [ ] 全量发布
- [ ] 监控和运维
- [ ] 用户支持
- [ ] 持续优化

---

## 🔒 向后兼容策略

### 1. 数据兼容

```typescript
/**
 * 兼容层适配器
 * 保证旧代码仍然可以工作
 */
class BackwardCompatibilityAdapter {
  /**
   * 将 Entity 转换为旧的 DocumentType
   */
  static entityToDocument(entity: Entity): DocumentType {
    return {
      documentId: entity.entityId,
      documentTemplateId: Number(entity.templateId),
      documentTemplateVersionId: Number(entity.templateVersionId),
      documentNo: entity.entityNo,
      documentUuid: entity.entityUuid,
      templateName: entity.templateName,
      dataDate: entity.eventDate?.toISOString() || '',

      // 从 customFields 中恢复原有字段
      shipName: entity.customFields.shipName || entity.title,
      cargoName: entity.customFields.cargoName || entity.subtitle,
      berthingTime: entity.customFields.berthingTime || entity.eventDate?.toISOString(),
      departureTime: entity.customFields.departureTime || entity.endDate?.toISOString(),
      domesticForeignTradeType: entity.customFields.domesticForeignTradeType || entity.category,
      shipType: entity.customFields.shipType || entity.subcategory,

      stepDefinition: entity.stepDefinition,
      currentStep: entity.currentStep,
      fillinStatus: this.mapStatus(entity.status),

      recipientList: entity.permissions.viewers.join(','),
      viewerList: entity.permissions.viewers.join(','),
      editorList: entity.permissions.editors.join(','),

      // ... 其他字段映射
    } as any;
  }

  /**
   * 将旧的 DocumentType 转换为 Entity
   */
  static documentToEntity(doc: DocumentType): Entity {
    return DataMigration.migrateDocument(doc, ShippingScenario);
  }
}

/**
 * API 兼容层
 * 保证旧接口仍然可用
 */
@Controller('/api/form/document')
class DocumentCompatibilityController {
  @Get('/list')
  async getDocumentList(@Query() query: any) {
    // 调用新的 Entity API
    const entities = await EntityService.list({
      scenarioId: 'shipping',
      entityType: 'ship_operation',
      ...query
    });

    // 转换为旧的 Document 格式返回
    return entities.map(e => BackwardCompatibilityAdapter.entityToDocument(e));
  }

  @Post('/create')
  async createDocument(@Body() doc: DocumentType) {
    // 转换为新的 Entity 格式
    const entity = BackwardCompatibilityAdapter.documentToEntity(doc);

    // 调用新的 Entity API
    const created = await EntityService.create(entity);

    // 转换回旧格式返回
    return BackwardCompatibilityAdapter.entityToDocument(created);
  }
}
```

### 2. 渐进式迁移

```typescript
/**
 * 双写策略
 * 同时写入新旧两种数据格式
 */
class DualWriteStrategy {
  async saveEntity(entity: Entity) {
    // 1. 写入新的 Entity 表
    await EntityRepository.save(entity);

    // 2. 同时写入旧的 Document 表（兼容期）
    const doc = BackwardCompatibilityAdapter.entityToDocument(entity);
    await DocumentRepository.save(doc);
  }

  async getEntity(id: string): Promise<Entity> {
    // 优先从新表读取
    let entity = await EntityRepository.findById(id);

    // 如果新表没有，从旧表读取并迁移
    if (!entity) {
      const doc = await DocumentRepository.findById(id);
      if (doc) {
        entity = BackwardCompatibilityAdapter.documentToEntity(doc);
        // 迁移到新表
        await EntityRepository.save(entity);
      }
    }

    return entity;
  }
}
```

### 3. 路由兼容

```typescript
// config/routes.ts

/**
 * 保留旧路由，内部重定向到新路由
 */
export default [
  // === 新的通用路由 ===
  {
    path: '/entity/:scenarioId/:entityType',
    component: './generic/EntityListPage',
  },
  {
    path: '/entity/:scenarioId/:entityType/:id/edit',
    component: './generic/EntityEditPage',
  },

  // === 旧路由兼容（重定向或使用兼容组件） ===
  {
    path: '/form/document',
    component: './form/document/document_table',  // 保持旧组件
    // 或者重定向
    // redirect: '/entity/shipping/ship_operation',
  },
  {
    path: '/form/document/:documentId',
    component: './form/document/document_edit_page',  // 保持旧组件
  },

  // === 业务操作兼容 ===
  {
    path: '/operation/ship_operation_document',
    redirect: '/entity/shipping/ship_operation',
  },
];
```

---

## ⚠️ 风险评估与应对

### 高风险项

| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|---------|
| 数据迁移失败 | 严重 | 中 | 1. 充分测试迁移脚本<br>2. 先在测试环境验证<br>3. 保留原始数据备份<br>4. 支持回滚 |
| 性能下降 | 高 | 中 | 1. 性能基准测试<br>2. 关键路径优化<br>3. 缓存策略<br>4. 数据库索引优化 |
| 用户接受度低 | 高 | 低 | 1. 充分的用户培训<br>2. 详细的文档<br>3. 灰度发布<br>4. 收集反馈快速迭代 |
| 功能回归 | 中 | 中 | 1. 完整的测试用例<br>2. 自动化测试<br>3. 用户验收测试<br>4. 向后兼容层 |

### 中风险项

| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|---------|
| 时间延期 | 中 | 高 | 1. 预留缓冲时间<br>2. 分阶段交付<br>3. 核心功能优先 |
| 技术债务 | 中 | 中 | 1. 代码审查<br>2. 重构计划<br>3. 技术文档 |
| 第三方依赖 | 中 | 低 | 1. 依赖锁定版本<br>2. 定期更新<br>3. 备选方案 |

---

## 📊 成功指标

### 技术指标

- [ ] 新场景配置时间 < 2天
- [ ] 表单渲染性能 < 100ms
- [ ] 代码覆盖率 > 80%
- [ ] 无严重 Bug
- [ ] API 响应时间 < 500ms

### 业务指标

- [ ] 支持 5+ 个不同行业场景
- [ ] 用户满意度 > 90%
- [ ] 系统可用性 > 99.9%
- [ ] 数据迁移成功率 100%
- [ ] 培训完成率 > 95%

### 质量指标

- [ ] 单元测试通过率 100%
- [ ] 集成测试通过率 > 95%
- [ ] 文档完整度 > 90%
- [ ] 代码规范遵循率 100%

---

## 📚 参考文档

### 内部文档
- [README.md](../README.md) - 项目说明
- [CLAUDE.md](../CLAUDE.md) - 项目理解记录
- [form-template-refactor.md](./form-template-refactor.md) - 表单模板重构方案
- [generic-data-model.md](./generic-data-model.md) - 通用数据模型设计

### 技术文档
- [Umi 4.x 文档](https://umijs.org/)
- [Ant Design 5.x 文档](https://ant.design/)
- [TypeScript 文档](https://www.typescriptlang.org/)
- [React 18 文档](https://react.dev/)

---

## 🔄 持续改进

### 后续优化方向

1. **AI 辅助**
   - 智能表单设计建议
   - 自动字段识别和映射
   - 异常检测和提醒

2. **低代码能力**
   - 可视化流程编排
   - 自定义组件市场
   - 插件系统

3. **移动端原生**
   - React Native 适配
   - 离线支持
   - 移动端优化

4. **国际化**
   - 多语言支持
   - 多时区支持
   - 多币种支持

5. **集成能力**
   - 第三方系统对接
   - Webhook 支持
   - OpenAPI 标准

---

**版本**: v1.0
**最后更新**: 2025-01-13
**维护者**: Claude AI & 开发团队
