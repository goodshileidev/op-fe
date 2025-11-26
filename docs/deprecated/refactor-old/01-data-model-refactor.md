# 数据模型重构方案

## 📋 文档信息

- **模块**: 数据模型层
- **优先级**: P0 (最高)
- **预计工时**: 5-7 工作日
- **依赖**: 无
- **负责人**: 待分配
- **状态**: 待开始

---

## 🎯 改造目标

将现有的港口航运专用数据模型重构为**通用的、场景无关的实体模型**，使其能够：

1. ✅ 支持任意业务场景的数据存储
2. ✅ 保持类型安全（TypeScript）
3. ✅ 向后兼容现有数据
4. ✅ 支持灵活的自定义字段
5. ✅ 提供清晰的数据迁移路径

---

## 📊 现状分析

### 当前数据模型的问题

#### 1. 强业务耦合

```typescript
// src/common/data_type/form/document.ts (当前)
interface DocumentType {
  documentId: string;

  // ❌ 港口航运特定字段
  shipName: string;              // 船名
  cargoName: string;             // 货名
  berthingTime: string;          // 靠泊时间
  departureTime: string;         // 离港时间
  domesticForeignTradeType: string;  // 内外贸类型
  shipType: string;              // 船舶类型

  // ✅ 通用字段
  documentNo: string;
  currentStep: string;
  status: string;
}
```

**问题**：
- 字段名称与港口业务强绑定
- 无法用于医疗、工业等其他场景
- 新场景需要修改 TypeScript 类型定义

#### 2. 缺乏扩展性

```typescript
// 当前：要添加新字段，必须修改类型定义
interface DocumentType {
  shipName: string;
  newField: string;  // ❌ 需要修改代码
}
```

**问题**：
- 每个新场景都要修改核心类型
- 无法动态添加字段
- 难以支持场景特定需求

#### 3. 类型定义分散

```typescript
// 分散在多个文件
src/common/data_type/form/document.ts
src/common/data_type/form/form.ts
src/common/data_type/template/document_template.ts
```

**问题**：
- 类型定义分散，难以维护
- 命名不统一
- 缺乏清晰的继承关系

---

## 🏗️ 新数据模型设计

### 架构概览

```
┌─────────────────────────────────────────────┐
│         通用实体模型 (Generic Entity)         │
│                                             │
│  - 基础字段（所有场景通用）                   │
│  - 场景映射字段（可配置的通用字段）            │
│  - 自定义字段（场景特定字段）                  │
└─────────────────────────────────────────────┘
              ↓ 实例化
┌─────────────────────────────────────────────┐
│            场景特定实体                       │
│                                             │
│  港口文档  |  病历记录  |  巡检记录  | ...    │
└─────────────────────────────────────────────┘
```

### 核心设计原则

1. **通用优先** - 基础字段适用所有场景
2. **映射灵活** - 通过配置映射到场景术语
3. **扩展简单** - 自定义字段存储任意数据
4. **类型安全** - 保持 TypeScript 类型检查

---

## 📝 完整类型定义

### 1. Entity - 通用实体实例

```typescript
/**
 * 通用实体实例
 * 文件位置: src/common/data_type/generic/entity.ts
 */

/**
 * 实体基础信息
 */
interface EntityBase {
  // === 唯一标识 ===
  entityId: string;                    // 实体 ID (主键)
  entityUuid: string;                  // 全局唯一标识 (UUID)
  entityNo: string;                    // 实体编号 (业务编号)

  // === 类型标识 ===
  entityType: string;                  // 实体类型 (patient/equipment/ship)
  scenarioId: string;                  // 所属场景 (medical/inspection/shipping)

  // === 模板关联 ===
  templateId: string;                  // 模板 ID
  templateVersionId: string;           // 模板版本 ID
  templateName: string;                // 模板名称
}

/**
 * 实体核心字段（通用化）
 */
interface EntityCoreFields {
  // === 标题和描述 ===
  title: string;                       // 主标题 (如：患者姓名/设备名称/船名)
  subtitle?: string;                   // 副标题 (如：病症/设备型号/货名)
  description?: string;                // 详细描述

  // === 时间字段 ===
  eventDate?: Date;                    // 主要事件日期 (如：就诊日期/巡检日期/靠泊时间)
  startDate?: Date;                    // 开始日期
  endDate?: Date;                      // 结束日期 (如：出院日期/完成日期/离港时间)

  // === 分类字段 ===
  category?: string;                   // 主分类 (如：科室/设备类别/贸易类型)
  subcategory?: string;                // 子分类 (如：病种/设备型号/船舶类型)
  tags?: string[];                     // 标签数组 (如：['急诊','重症'])
}

/**
 * 地理位置信息
 */
interface EntityLocation {
  name: string;                        // 地点名称
  address?: string;                    // 详细地址
  coordinates?: {                      // GPS 坐标
    latitude: number;                  // 纬度
    longitude: number;                 // 经度
    altitude?: number;                 // 海拔（可选）
  };
  region?: string;                     // 区域/城市
  building?: string;                   // 建筑物
  floor?: string;                      // 楼层
  room?: string;                       // 房间号
}

/**
 * 关联实体
 */
interface RelatedEntity {
  entityType: string;                  // 关联实体类型
  entityId: string;                    // 关联实体 ID
  relationshipType: 'parent' | 'child' | 'reference' | 'dependency';
  relationshipName?: string;           // 关系名称 (如：'主治医生'/'维修人员')
  metadata?: Record<string, any>;      // 关系元数据
}

/**
 * 工作流信息
 */
interface EntityWorkflow {
  workflowId?: string;                 // 工作流 ID
  currentStep: string;                 // 当前步骤
  stepDefinition: string;              // 步骤定义 (JSON 字符串)
  status: EntityStatus;                // 状态
  priority: Priority;                  // 优先级

  // 步骤历史
  stepHistory?: {
    step: string;                      // 步骤名称
    status: 'completed' | 'skipped' | 'failed';
    operator: string;                  // 操作人
    operatedAt: Date;                  // 操作时间
    comment?: string;                  // 备注
  }[];
}

/**
 * 权限信息
 */
interface EntityPermissions {
  owner: string;                       // 所有者 (用户 ID)

  // 各种权限列表
  viewers: string[];                   // 可查看用户列表
  editors: string[];                   // 可编辑用户列表
  approvers: string[];                 // 可审批用户列表

  // 角色权限
  viewerRoles?: string[];              // 可查看角色列表
  editorRoles?: string[];              // 可编辑角色列表
  approverRoles?: string[];            // 可审批角色列表

  // 组织权限
  viewerOrgs?: string[];               // 可查看组织列表
  editorOrgs?: string[];               // 可编辑组织列表
}

/**
 * 变量定义
 */
interface EntityVariable {
  name: string;                        // 变量名
  value: any;                          // 变量值
  type: FieldType;                     // 变量类型
  label?: string;                      // 变量标签
  computed?: boolean;                  // 是否计算字段
  formula?: string;                    // 计算公式
  unit?: string;                       // 单位 (如：kg, ℃, mm)
}

/**
 * 附件信息
 */
interface EntityAttachment {
  id: string;                          // 附件 ID
  name: string;                        // 文件名
  type: string;                        // 文件类型 (image/pdf/doc/...)
  mimeType: string;                    // MIME 类型
  url: string;                         // 访问 URL
  size: number;                        // 文件大小 (bytes)
  uploadedBy: string;                  // 上传人
  uploadedAt: Date;                    // 上传时间
  thumbnail?: string;                  // 缩略图 URL (for images)
  description?: string;                // 附件描述
}

/**
 * 实体元数据
 */
interface EntityMetadata {
  createdBy: string;                   // 创建人
  createdAt: Date;                     // 创建时间
  updatedBy: string;                   // 最后更新人
  updatedAt: Date;                     // 最后更新时间
  version: number;                     // 版本号

  // 软删除
  isDeleted: boolean;                  // 是否已删除
  deletedBy?: string;                  // 删除人
  deletedAt?: Date;                    // 删除时间

  // 审计
  auditLog?: {
    action: 'create' | 'update' | 'delete' | 'approve' | 'reject';
    operator: string;
    operatedAt: Date;
    changes?: Record<string, { old: any; new: any }>;
    comment?: string;
  }[];
}

/**
 * 完整的实体类型定义
 */
export interface Entity
  extends EntityBase,
    EntityCoreFields,
    EntityWorkflow {

  // === 地理位置 ===
  location?: EntityLocation;

  // === 关联实体 ===
  relatedEntities?: RelatedEntity[];

  // === 权限 ===
  permissions: EntityPermissions;

  // === 自定义字段（核心扩展点） ===
  customFields: Record<string, any>;

  // === 变量系统 ===
  variables: EntityVariable[];

  // === 附件 ===
  attachments?: EntityAttachment[];

  // === 元数据 ===
  metadata: EntityMetadata;
}

/**
 * 实体状态枚举
 */
export enum EntityStatus {
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
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
  CRITICAL = 'critical',
}

/**
 * 字段类型枚举
 */
export enum FieldType {
  // 基础类型
  TEXT = 'text',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
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
  TREE_SELECT = 'tree_select',

  // 文本类型
  TEXTAREA = 'textarea',
  RICH_TEXT = 'rich_text',
  MARKDOWN = 'markdown',
  CODE = 'code',

  // 数值类型
  SLIDER = 'slider',
  RATE = 'rate',
  PROGRESS = 'progress',

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
  COLOR = 'color',

  // 复杂类型
  TABLE = 'table',
  SUB_FORM = 'sub_form',
  REPEATER = 'repeater',
  JSON = 'json',

  // 展示类型
  DIVIDER = 'divider',
  TEXT_BLOCK = 'text_block',
  IMAGE_BLOCK = 'image_block',
  ALERT = 'alert',

  // 关联类型
  ENTITY_REFERENCE = 'entity_reference',
  USER_SELECT = 'user_select',
  ORG_SELECT = 'org_select',
  ROLE_SELECT = 'role_select',

  // 自定义
  CUSTOM = 'custom',
}
```

### 2. EntityTemplate - 实体模板

```typescript
/**
 * 实体模板定义
 * 文件位置: src/common/data_type/generic/entity-template.ts
 */

import { FieldType } from './entity';

/**
 * 实体模板
 */
export interface EntityTemplate {
  // === 基础信息 ===
  templateId: string;
  templateName: string;
  templateNo: string;
  description?: string;
  icon?: string;

  // === 场景关联 ===
  scenarioId: string;                  // 所属场景 ID
  entityType: string;                  // 实体类型

  // === 版本信息 ===
  version: string;                     // 版本号 (如: "1.0.0")
  status: TemplateStatus;              // 模板状态

  // === 字段定义 ===
  fields: EntityFieldDefinition[];     // 字段定义数组

  // === 布局配置 ===
  layout: TemplateLayout;

  // === 规则配置 ===
  rules: TemplateRules;

  // === 工作流配置 ===
  workflow?: WorkflowDefinition;

  // === 权限配置 ===
  permissions: TemplatePermissions;

  // === 通知配置 ===
  notifications?: TemplateNotifications;

  // === UI 配置 ===
  ui?: TemplateUIConfig;

  // === 元数据 ===
  metadata: {
    createdBy: string;
    createdAt: Date;
    updatedBy: string;
    updatedAt: Date;
    publishedBy?: string;
    publishedAt?: Date;
    usageCount?: number;               // 使用次数统计
  };
}

/**
 * 字段定义
 */
export interface EntityFieldDefinition {
  // === 基础信息 ===
  id: string;                          // 字段 ID (唯一)
  name: string;                        // 字段名 (程序中使用)
  label: string;                       // 字段标签 (用户看到的)
  placeholder?: string;                // 占位符
  helpText?: string;                   // 帮助文本
  tooltip?: string;                    // 提示信息

  // === 字段类型 ===
  type: FieldType;                     // 字段类型

  // === 字段属性 ===
  required: boolean;                   // 是否必填
  readonly?: boolean;                  // 是否只读
  hidden?: boolean;                    // 是否隐藏
  disabled?: boolean;                  // 是否禁用

  // === 默认值 ===
  defaultValue?: any;                  // 默认值

  // === 验证规则 ===
  validation?: {
    rules: ValidationRule[];
    errorMessage?: string;
    validateTrigger?: 'change' | 'blur' | 'submit';
  };

  // === 字段选项 ===
  options?: FieldOption[];             // 静态选项

  // === 数据源配置 ===
  dataSource?: FieldDataSource;        // 动态数据源

  // === 条件显示 ===
  conditional?: ConditionalRule[];     // 条件显示规则

  // === 字段依赖 ===
  dependencies?: string[];             // 依赖的其他字段

  // === 计算配置 ===
  computed?: {
    formula: string;                   // 计算公式
    dependencies: string[];            // 依赖字段
    trigger?: 'change' | 'blur';       // 触发时机
  };

  // === UI 配置 ===
  ui?: {
    width?: string | number;           // 字段宽度
    span?: number;                     // Grid span
    offset?: number;                   // Grid offset
    style?: React.CSSProperties;
    className?: string;
    labelAlign?: 'left' | 'right';
    colon?: boolean;                   // 是否显示冒号
  };

  // === 字段特定配置 ===
  config?: Record<string, any>;        // 字段类型特定的配置

  // === 排序 ===
  order?: number;                      // 排序序号
}

/**
 * 验证规则
 */
export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'email' | 'phone' | 'url' | 'custom';
  value?: any;                         // 规则值
  message?: string;                    // 错误消息
  validator?: (value: any, formData: any) => boolean | Promise<boolean>;
}

/**
 * 字段选项
 */
export interface FieldOption {
  label: string;                       // 选项标签
  value: any;                          // 选项值
  disabled?: boolean;                  // 是否禁用
  icon?: string;                       // 图标
  description?: string;                // 描述
  children?: FieldOption[];            // 子选项 (级联)
  extra?: Record<string, any>;         // 额外数据
}

/**
 * 字段数据源
 */
export interface FieldDataSource {
  type: 'static' | 'api' | 'entity' | 'sql' | 'function';
  config: {
    // API 数据源
    url?: string;
    method?: 'GET' | 'POST';
    params?: Record<string, any>;
    transform?: (data: any) => FieldOption[];

    // Entity 数据源
    entityType?: string;
    labelField?: string;
    valueField?: string;
    filter?: Record<string, any>;

    // Function 数据源
    function?: (formData: any) => FieldOption[] | Promise<FieldOption[]>;
  };
}

/**
 * 条件规则
 */
export interface ConditionalRule {
  field: string;                       // 依赖字段
  operator: ComparisonOperator;        // 比较操作符
  value: any;                          // 比较值
  logicalOperator?: 'and' | 'or';     // 逻辑操作符
}

/**
 * 比较操作符
 */
export type ComparisonOperator =
  | 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte'
  | 'in' | 'not_in' | 'contains' | 'not_contains'
  | 'starts_with' | 'ends_with'
  | 'is_empty' | 'is_not_empty'
  | 'is_true' | 'is_false';

/**
 * 模板布局配置
 */
export interface TemplateLayout {
  type: 'grid' | 'flex' | 'tabs' | 'steps' | 'collapse';
  columns?: number;                    // 列数 (grid)
  gutter?: number | [number, number]; // 间距

  // 分组配置
  sections?: {
    id: string;
    title: string;
    description?: string;
    fields: string[];                  // 字段 ID 数组
    collapsible?: boolean;             // 是否可折叠
    defaultCollapsed?: boolean;        // 默认折叠
    icon?: string;
    order?: number;
  }[];

  // Tabs 配置
  tabs?: {
    id: string;
    title: string;
    icon?: string;
    fields: string[];
  }[];

  // Steps 配置
  steps?: {
    id: string;
    title: string;
    description?: string;
    fields: string[];
  }[];
}

/**
 * 模板规则配置
 */
export interface TemplateRules {
  validation?: ValidationRule[];       // 表单级验证
  calculation?: CalculationRule[];     // 计算规则
  dependency?: DependencyRule[];       // 依赖规则
  conditional?: ConditionalRule[];     // 条件规则
  business?: BusinessRule[];           // 业务规则
}

/**
 * 计算规则
 */
export interface CalculationRule {
  id: string;
  targetField: string;                 // 目标字段
  formula: string;                     // 公式
  dependencies: string[];              // 依赖字段
  trigger?: 'change' | 'blur' | 'submit';
}

/**
 * 依赖规则
 */
export interface DependencyRule {
  id: string;
  field: string;                       // 字段
  dependsOn: string[];                 // 依赖于哪些字段
  action: 'show' | 'hide' | 'enable' | 'disable' | 'require' | 'optional';
  condition: ConditionalRule[];
}

/**
 * 业务规则
 */
export interface BusinessRule {
  id: string;
  name: string;
  description?: string;
  condition: ConditionalRule[];
  actions: {
    type: 'set_value' | 'show_message' | 'call_api' | 'trigger_workflow';
    config: Record<string, any>;
  }[];
}

/**
 * 工作流定义
 */
export interface WorkflowDefinition {
  id: string;
  name: string;
  steps: WorkflowStep[];
  transitions: WorkflowTransition[];
}

/**
 * 工作流步骤
 */
export interface WorkflowStep {
  id: string;
  name: string;
  type: 'task' | 'approval' | 'notification' | 'auto';
  assignee?: string | string[];        // 负责人/角色
  optional?: boolean;                  // 是否可选
  timeout?: number;                    // 超时时间(分钟)
  actions?: {
    type: string;
    config: Record<string, any>;
  }[];
}

/**
 * 工作流转换
 */
export interface WorkflowTransition {
  from: string;                        // 源步骤
  to: string;                          // 目标步骤
  condition?: ConditionalRule[];       // 转换条件
  action?: string;                     // 触发动作
}

/**
 * 模板权限配置
 */
export interface TemplatePermissions {
  create: string[];                    // 可创建的角色
  view: string[];                      // 可查看的角色
  edit: string[];                      // 可编辑的角色
  delete: string[];                    // 可删除的角色
  approve: string[];                   // 可审批的角色
  export: string[];                    // 可导出的角色
}

/**
 * 模板通知配置
 */
export interface TemplateNotifications {
  onCreate?: NotificationConfig;
  onUpdate?: NotificationConfig;
  onSubmit?: NotificationConfig;
  onApprove?: NotificationConfig;
  onReject?: NotificationConfig;
  onComplete?: NotificationConfig;
}

/**
 * 通知配置
 */
export interface NotificationConfig {
  enabled: boolean;
  recipients: {
    type: 'user' | 'role' | 'org' | 'email';
    value: string[];
  }[];
  channels: ('email' | 'sms' | 'app' | 'webhook')[];
  template?: string;                   // 通知模板
}

/**
 * 模板 UI 配置
 */
export interface TemplateUIConfig {
  theme?: {
    primaryColor?: string;
    borderRadius?: number;
    componentSize?: 'small' | 'middle' | 'large';
  };
  submitButton?: {
    text?: string;
    icon?: string;
    type?: 'primary' | 'default' | 'dashed' | 'link';
  };
  cancelButton?: {
    text?: string;
    show?: boolean;
  };
  showReset?: boolean;                 // 是否显示重置按钮
  showPreview?: boolean;               // 是否显示预览按钮
}

/**
 * 模板状态
 */
export enum TemplateStatus {
  DRAFT = 'draft',                     // 草稿
  TESTING = 'testing',                 // 测试中
  PUBLISHED = 'published',             // 已发布
  DEPRECATED = 'deprecated',           // 已废弃
  ARCHIVED = 'archived',               // 已归档
}
```

---

## 🔄 数据迁移映射

### 1. Document → Entity 映射

```typescript
/**
 * 数据迁移工具
 * 文件位置: src/utils/data-migration/document-to-entity.ts
 */

import { Entity, EntityStatus, Priority } from '@/common/data_type/generic/entity';
import { DocumentType } from '@/common/data_type/form/document';

export class DocumentToEntityMigrator {
  /**
   * 迁移单个文档
   */
  static migrate(doc: DocumentType): Entity {
    return {
      // === 基础标识 ===
      entityId: doc.documentId,
      entityUuid: doc.documentUuid,
      entityNo: doc.documentNo,

      // === 类型标识 ===
      entityType: 'ship_operation',
      scenarioId: 'shipping',

      // === 模板关联 ===
      templateId: doc.documentTemplateId.toString(),
      templateVersionId: doc.documentTemplateVersionId.toString(),
      templateName: doc.templateName,

      // === 核心字段（映射） ===
      title: doc.shipName || doc.documentNo,
      subtitle: doc.cargoName,
      description: undefined,

      // === 时间字段（映射） ===
      eventDate: doc.berthingTime ? new Date(doc.berthingTime) : undefined,
      startDate: doc.berthingTime ? new Date(doc.berthingTime) : undefined,
      endDate: doc.departureTime ? new Date(doc.departureTime) : undefined,

      // === 分类字段（映射） ===
      category: this.mapTradeType(doc.domesticForeignTradeType),
      subcategory: doc.shipType,
      tags: [],

      // === 地理位置 ===
      location: undefined, // 原数据中没有

      // === 关联实体 ===
      relatedEntities: [],

      // === 工作流 ===
      workflowId: undefined,
      currentStep: doc.currentStep,
      stepDefinition: doc.stepDefinition,
      status: this.mapStatus(doc.fillinStatus),
      priority: Priority.MEDIUM,

      // === 权限 ===
      permissions: {
        owner: doc.editorList?.split(',')[0] || '',
        viewers: doc.viewerList?.split(',').filter(Boolean) || [],
        editors: doc.editorList?.split(',').filter(Boolean) || [],
        approvers: [],
      },

      // === 自定义字段（保留原有港口字段） ===
      customFields: {
        // 原有的港口特定字段
        shipName: doc.shipName,
        cargoName: doc.cargoName,
        berthingTime: doc.berthingTime,
        departureTime: doc.departureTime,
        domesticForeignTradeType: doc.domesticForeignTradeType,
        shipType: doc.shipType,

        // 其他原有字段
        templateNo: doc.templateNo,
        fillinStatus: doc.fillinStatus,
        recipientList: doc.recipientList,
        inputStartTime: doc.inputStartTime,
        inputFinishTime: doc.inputFinishTime,
        submissionRecipientUnit: doc.submissionRecipientUnit,
        submissionStatus: doc.submissionStatus,
        submissionFinishTime: doc.submissionFinishTime,
        submissionSettings: doc.submissionSettings,
        submissionHistory: doc.submissionHistory,
        publishStatus: doc.publishStatus,
      },

      // === 变量系统 ===
      variables: this.parseVariables(doc.varValueList, doc.varConfigList),

      // === 附件 ===
      attachments: [],

      // === 元数据 ===
      metadata: {
        createdBy: doc.editorList?.split(',')[0] || '',
        createdAt: doc.inputStartTime ? new Date(doc.inputStartTime) : new Date(),
        updatedBy: doc.editorList?.split(',')[0] || '',
        updatedAt: doc.inputFinishTime ? new Date(doc.inputFinishTime) : new Date(),
        version: 1,
        isDeleted: false,
      },
    };
  }

  /**
   * 批量迁移
   */
  static async batchMigrate(docs: DocumentType[]): Promise<Entity[]> {
    return docs.map(doc => this.migrate(doc));
  }

  /**
   * 映射贸易类型
   */
  private static mapTradeType(type: string): string {
    const mapping: Record<string, string> = {
      '1': '国内贸易',
      '2': '国际贸易',
      'domestic': '国内贸易',
      'foreign': '国际贸易',
    };
    return mapping[type] || type || '未分类';
  }

  /**
   * 映射状态
   */
  private static mapStatus(status: string): EntityStatus {
    const mapping: Record<string, EntityStatus> = {
      'draft': EntityStatus.DRAFT,
      'filling': EntityStatus.IN_PROGRESS,
      'in_progress': EntityStatus.IN_PROGRESS,
      'submitted': EntityStatus.PENDING_REVIEW,
      'pending': EntityStatus.PENDING_REVIEW,
      'approved': EntityStatus.APPROVED,
      'rejected': EntityStatus.REJECTED,
      'completed': EntityStatus.COMPLETED,
      'archived': EntityStatus.ARCHIVED,
      'cancelled': EntityStatus.CANCELLED,
    };
    return mapping[status?.toLowerCase()] || EntityStatus.DRAFT;
  }

  /**
   * 解析变量
   */
  private static parseVariables(
    varValueList: string,
    varConfigList: string
  ): Entity['variables'] {
    try {
      const values = JSON.parse(varValueList || '{}');
      const configs = JSON.parse(varConfigList || '{}');

      return Object.keys(values).map(key => ({
        name: key,
        value: values[key],
        type: configs[key]?.type || 'text',
        label: configs[key]?.label || key,
        computed: configs[key]?.computed || false,
        formula: configs[key]?.formula,
        unit: configs[key]?.unit,
      }));
    } catch (error) {
      console.error('Failed to parse variables:', error);
      return [];
    }
  }
}
```

### 2. Entity → Document 反向映射（兼容层）

```typescript
/**
 * 反向映射工具（用于向后兼容）
 * 文件位置: src/utils/data-migration/entity-to-document.ts
 */

import { Entity } from '@/common/data_type/generic/entity';
import { DocumentType } from '@/common/data_type/form/document';

export class EntityToDocumentAdapter {
  /**
   * 将 Entity 转换回 DocumentType
   */
  static toDocument(entity: Entity): DocumentType {
    const customFields = entity.customFields || {};

    return {
      documentId: entity.entityId,
      documentTemplateId: Number(entity.templateId) || 0,
      documentTemplateVersionId: Number(entity.templateVersionId) || 0,
      documentNo: entity.entityNo,
      documentUuid: entity.entityUuid,
      templateNo: customFields.templateNo || entity.entityNo,
      templateName: entity.templateName,
      dataDate: entity.eventDate?.toISOString().split('T')[0] || '',

      // 从 customFields 恢复原有字段
      shipName: customFields.shipName || entity.title,
      cargoName: customFields.cargoName || entity.subtitle,
      berthingTime: customFields.berthingTime || entity.eventDate?.toISOString(),
      departureTime: customFields.departureTime || entity.endDate?.toISOString(),
      domesticForeignTradeType: customFields.domesticForeignTradeType || entity.category,
      shipType: customFields.shipType || entity.subcategory,

      // 流程相关
      stepDefinition: entity.stepDefinition,
      currentStep: entity.currentStep,
      fillinStatus: this.mapStatus(entity.status),

      // 权限相关
      recipientList: entity.permissions.viewers.join(','),
      viewerList: entity.permissions.viewers.join(','),
      editorList: entity.permissions.editors.join(','),

      // 时间相关
      inputStartTime: entity.metadata.createdAt.toISOString(),
      inputFinishTime: entity.metadata.updatedAt.toISOString(),

      // 提交相关
      submissionRecipientUnit: customFields.submissionRecipientUnit || '',
      submissionStatus: customFields.submissionStatus || '',
      submissionFinishTime: customFields.submissionFinishTime || '',
      submissionSettings: customFields.submissionSettings || '',
      submissionHistory: customFields.submissionHistory || '',

      // 变量相关
      variableNameList: entity.variables.map(v => v.name).join(','),
      varConfigList: JSON.stringify(
        entity.variables.reduce((acc, v) => ({
          ...acc,
          [v.name]: {
            type: v.type,
            label: v.label,
            computed: v.computed,
            formula: v.formula,
          }
        }), {})
      ),
      varValueList: JSON.stringify(
        entity.variables.reduce((acc, v) => ({
          ...acc,
          [v.name]: v.value
        }), {})
      ),

      // 发布状态
      publishStatus: customFields.publishStatus || '',
    };
  }

  /**
   * 映射状态
   */
  private static mapStatus(status: Entity['status']): string {
    const mapping: Record<Entity['status'], string> = {
      [EntityStatus.DRAFT]: 'draft',
      [EntityStatus.IN_PROGRESS]: 'filling',
      [EntityStatus.PENDING_REVIEW]: 'submitted',
      [EntityStatus.APPROVED]: 'approved',
      [EntityStatus.REJECTED]: 'rejected',
      [EntityStatus.COMPLETED]: 'completed',
      [EntityStatus.ARCHIVED]: 'archived',
      [EntityStatus.CANCELLED]: 'cancelled',
    };
    return mapping[status] || 'draft';
  }
}
```

---

## 📦 实施步骤

### 第一步：创建新的类型定义文件

```bash
# 创建目录结构
mkdir -p src/common/data_type/generic
mkdir -p src/utils/data-migration

# 创建文件
touch src/common/data_type/generic/entity.ts
touch src/common/data_type/generic/entity-template.ts
touch src/common/data_type/generic/index.ts
touch src/utils/data-migration/document-to-entity.ts
touch src/utils/data-migration/entity-to-document.ts
```

### 第二步：实现类型定义

将上面的完整类型定义代码复制到对应文件中。

### 第三步：编写单元测试

```typescript
/**
 * 数据迁移测试
 * 文件位置: src/utils/data-migration/__tests__/document-to-entity.test.ts
 */

import { DocumentToEntityMigrator } from '../document-to-entity';
import { EntityToDocumentAdapter } from '../entity-to-document';
import { DocumentType } from '@/common/data_type/form/document';

describe('DocumentToEntityMigrator', () => {
  const mockDocument: DocumentType = {
    documentId: 'doc-001',
    documentUuid: 'uuid-001',
    documentNo: 'DOC2025001',
    documentTemplateId: 1,
    documentTemplateVersionId: 1,
    templateName: '船舶作业文档',
    templateNo: 'TPL-001',
    dataDate: '2025-01-13',

    shipName: '测试船舶',
    cargoName: '煤炭',
    berthingTime: '2025-01-13T08:00:00Z',
    departureTime: '2025-01-13T18:00:00Z',
    domesticForeignTradeType: '1',
    shipType: '散货船',

    currentStep: 'filling',
    stepDefinition: '{}',
    fillinStatus: 'in_progress',

    viewerList: 'user1,user2',
    editorList: 'user1',
    recipientList: 'org1',

    inputStartTime: '2025-01-13T08:00:00Z',
    inputFinishTime: '2025-01-13T18:00:00Z',

    submissionRecipientUnit: '',
    submissionStatus: '',
    submissionFinishTime: '',
    submissionSettings: '',
    submissionHistory: '',

    variableNameList: 'var1,var2',
    varConfigList: '{"var1":{"type":"text","label":"变量1"}}',
    varValueList: '{"var1":"value1"}',

    publishStatus: 'published',
  };

  test('应该正确迁移 Document 到 Entity', () => {
    const entity = DocumentToEntityMigrator.migrate(mockDocument);

    expect(entity.entityId).toBe(mockDocument.documentId);
    expect(entity.entityNo).toBe(mockDocument.documentNo);
    expect(entity.title).toBe(mockDocument.shipName);
    expect(entity.subtitle).toBe(mockDocument.cargoName);
    expect(entity.category).toBe('国内贸易');
    expect(entity.scenarioId).toBe('shipping');
    expect(entity.entityType).toBe('ship_operation');

    // 检查 customFields
    expect(entity.customFields.shipName).toBe(mockDocument.shipName);
    expect(entity.customFields.cargoName).toBe(mockDocument.cargoName);
  });

  test('应该正确解析变量', () => {
    const entity = DocumentToEntityMigrator.migrate(mockDocument);

    expect(entity.variables).toHaveLength(1);
    expect(entity.variables[0].name).toBe('var1');
    expect(entity.variables[0].value).toBe('value1');
    expect(entity.variables[0].label).toBe('变量1');
  });

  test('应该可以反向转换回 Document', () => {
    const entity = DocumentToEntityMigrator.migrate(mockDocument);
    const doc = EntityToDocumentAdapter.toDocument(entity);

    expect(doc.documentId).toBe(mockDocument.documentId);
    expect(doc.shipName).toBe(mockDocument.shipName);
    expect(doc.cargoName).toBe(mockDocument.cargoName);
  });
});
```

### 第四步：更新导出

```typescript
/**
 * 统一导出
 * 文件位置: src/common/data_type/generic/index.ts
 */

export * from './entity';
export * from './entity-template';
export { DocumentToEntityMigrator } from '@/utils/data-migration/document-to-entity';
export { EntityToDocumentAdapter } from '@/utils/data-migration/entity-to-document';
```

---

## ✅ 验收标准

### 功能验收

- [ ] 所有类型定义编译通过，无 TypeScript 错误
- [ ] 单元测试覆盖率 > 90%
- [ ] 可以成功迁移现有 Document 数据
- [ ] 反向转换保持数据一致性
- [ ] customFields 可以存储任意 JSON 数据

### 性能验收

- [ ] 单条数据迁移耗时 < 10ms
- [ ] 批量迁移 1000 条数据 < 1s
- [ ] 类型定义不影响编译速度

### 质量验收

- [ ] 代码通过 ESLint 检查
- [ ] 所有字段都有注释说明
- [ ] 提供完整的使用示例
- [ ] 更新 CLAUDE.md 文档

---

## ⚠️ 注意事项

### 1. 类型安全

```typescript
// ✅ 正确：使用类型约束
function processEntity(entity: Entity) {
  console.log(entity.title);
}

// ❌ 错误：使用 any
function processEntity(entity: any) {
  console.log(entity.title);
}
```

### 2. customFields 的使用

```typescript
// ✅ 正确：明确场景特定字段
interface ShippingCustomFields {
  shipName: string;
  cargoName: string;
  // ...
}

const entity: Entity = {
  // ...
  customFields: {
    shipName: '测试船',
    cargoName: '煤炭',
  } as ShippingCustomFields,
};

// ❌ 错误：滥用 customFields
const entity: Entity = {
  // ...
  customFields: {
    anything: 'goes',  // 缺乏类型约束
  },
};
```

### 3. 数据迁移的完整性

```typescript
// 迁移前后数据校验
function validateMigration(oldDoc: DocumentType, newEntity: Entity): boolean {
  // 检查关键字段
  const checks = [
    oldDoc.documentId === newEntity.entityId,
    oldDoc.shipName === newEntity.title,
    oldDoc.cargoName === newEntity.subtitle,
    // ... 更多校验
  ];

  return checks.every(Boolean);
}
```

---

## 📚 参考资料

- [TypeScript 高级类型](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [数据迁移最佳实践](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/data-migration)
- [JSON Schema 规范](https://json-schema.org/)

---

## 🔄 下一步

完成本文档后，继续：
- [02-scenario-manager.md](./02-scenario-manager.md) - 场景管理器实现方案
- [07-data-migration.md](./07-data-migration.md) - 详细的数据迁移方案

---

**版本**: v1.0
**创建日期**: 2025-01-13
**最后更新**: 2025-01-13
**维护者**: 开发团队
