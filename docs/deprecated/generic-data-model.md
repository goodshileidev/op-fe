# 通用表单管理系统数据模型设计

## 一、设计原则

1. **通用性**: 摒弃行业特定字段，使用可配置的通用字段
2. **灵活性**: 支持自定义字段类型和业务规则
3. **扩展性**: 预留扩展接口，支持多场景应用
4. **兼容性**: 保持核心功能不变，平滑迁移

## 二、核心数据模型改造

### 1. 表单实例模型 (Form Instance)

#### 原模型（航运特有字段）
```typescript
{
  shipName: string;        // 船名
  cargoName: string;       // 货名
  berthingTime: Date;      // 靠泊时间
  departureTime: Date;     // 离港时间
  domesticForeignTradeType: string;  // 内外贸类型
}
```

#### 新通用模型
```typescript
interface FormInstance {
  // 基础字段
  formId: string;
  formTemplateId: string;
  formTemplateVersionId: string;
  formNo: string;
  title: string;           // 通用标题，替代船名
  description?: string;    // 通用描述

  // 时间字段（通用化）
  eventDate?: Date;        // 事件日期（替代靠泊时间）
  endDate?: Date;          // 结束日期（替代离港时间）

  // 分类字段（可配置）
  category?: string;       // 业务类别（替代贸易类型）
  subcategory?: string;    // 子类别
  tags?: string[];         // 标签系统

  // 地理位置字段（可选）
  location?: {
    name: string;          // 地点名称
    coordinates?: [number, number];  // 经纬度
    address?: string;      // 详细地址
  };

  // 自定义字段
  customFields: {
    [key: string]: any;    // 灵活存储各种自定义数据
  };

  // 流程字段
  currentStep: string;
  status: FormStatus;
  priority: Priority;

  // 元数据
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}
```

### 2. 表单模板模型 (Form Template)

#### 增强的模板模型
```typescript
interface FormTemplate {
  templateId: string;
  name: string;
  description?: string;

  // 场景配置
  scenario: FormScenario;  // 场景类型（医疗、巡检、通用等）

  // 字段定义
  fields: FormFieldDefinition[];

  // 业务规则
  rules: FormRule[];

  // UI配置
  layout: LayoutConfig;

  // 版本管理
  version: string;
  status: 'draft' | 'published' | 'archived';

  // 权限配置
  permissions: {
    view: Role[];
    edit: Role[];
    submit: Role[];
    approve: Role[];
  };
}

interface FormFieldDefinition {
  id: string;
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  defaultValue?: any;
  validation?: ValidationRule[];
  options?: FieldOption[];  // 用于选择类字段
  dependencies?: string[];  // 依赖的其他字段
  conditional?: {           // 条件显示
    field: string;
    operator: 'eq' | 'ne' | 'gt' | 'lt' | 'in' | 'not_in';
    value: any;
  }[];
}

enum FieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  DATETIME = 'datetime',
  SELECT = 'select',
  MULTI_SELECT = 'multi_select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXTAREA = 'textarea',
  FILE = 'file',
  IMAGE = 'image',
  LOCATION = 'location',
  SIGNATURE = 'signature',
  TABLE = 'table',
  CUSTOM = 'custom'
}
```

### 3. 场景配置模型

```typescript
interface FormScenario {
  id: string;
  name: string;
  icon?: string;
  description?: string;

  // 预设字段模板
  presetFields: FormFieldDefinition[];

  // 预设规则
  presetRules: FormRule[];

  // 主题配置
  theme: {
    primaryColor: string;
    layout: 'vertical' | 'horizontal';
    labelPosition: 'top' | 'left';
  };

  // 术语配置
  terminology: {
    [key: string]: string;  // 如: { shipName: '设备名称', cargoName: '检查项目' }
  };
}
```

## 三、预设场景模板

### 1. 医疗场景
```typescript
const MedicalScenario: FormScenario = {
  id: 'medical',
  name: '医疗记录',
  icon: 'stethoscope',
  presetFields: [
    {
      id: 'patientId',
      name: 'patientId',
      label: '患者ID',
      type: FieldType.TEXT,
      required: true
    },
    {
      id: 'patientName',
      name: 'patientName',
      label: '患者姓名',
      type: FieldType.TEXT,
      required: true
    },
    {
      id: 'diagnosis',
      name: 'diagnosis',
      label: '诊断结果',
      type: FieldType.TEXTAREA,
      required: true
    },
    {
      id: 'treatment',
      name: 'treatment',
      label: '治疗方案',
      type: FieldType.TEXTAREA
    },
    {
      id: 'doctor',
      name: 'doctor',
      label: '主治医生',
      type: FieldType.SELECT,
      options: []  // 从用户系统加载
    }
  ],
  terminology: {
    title: '病历记录',
    eventDate: '就诊日期',
    category: '科室',
    customFields: '检查项目'
  }
}
```

### 2. 工厂巡检场景
```typescript
const InspectionScenario: FormScenario = {
  id: 'inspection',
  name: '工厂巡检',
  icon: 'clipboard-check',
  presetFields: [
    {
      id: 'equipmentId',
      name: 'equipmentId',
      label: '设备编号',
      type: FieldType.TEXT,
      required: true
    },
    {
      id: 'equipmentName',
      name: 'equipmentName',
      label: '设备名称',
      type: FieldType.TEXT,
      required: true
    },
    {
      id: 'inspectionType',
      name: 'inspectionType',
      label: '巡检类型',
      type: FieldType.SELECT,
      options: [
        { label: '日常巡检', value: 'daily' },
        { label: '周检', value: 'weekly' },
        { label: '月检', value: 'monthly' },
        { label: '年检', value: 'yearly' }
      ]
    },
    {
      id: 'checkItems',
      name: 'checkItems',
      label: '检查项目',
      type: FieldType.TABLE,
      required: true
    },
    {
      id: 'inspector',
      name: 'inspector',
      label: '巡检员',
      type: FieldType.SELECT,
      options: []  // 从用户系统加载
    }
  ],
  terminology: {
    title: '巡检记录',
    eventDate: '巡检日期',
    category: '巡检区域',
    customFields: '检查结果'
  }
}
```

### 3. 通用场景
```typescript
const GeneralScenario: FormScenario = {
  id: 'general',
  name: '通用表单',
  icon: 'file-alt',
  presetFields: [],
  terminology: {
    title: '表单标题',
    eventDate: '日期',
    category: '类别',
    customFields: '自定义字段'
  }
}
```

## 四、数据迁移策略

### 1. 字段映射表
| 原字段 | 新字段 | 转换规则 |
|--------|--------|----------|
| shipName | title | 直接映射 |
| cargoName | customFields.cargo | 存入自定义字段 |
| berthingTime | eventDate | 直接映射 |
| departureTime | endDate | 直接映射 |
| domesticForeignTradeType | category | '1'->'国内贸易', '2'->'国际贸易' |

### 2. 迁移脚本示例
```typescript
function migrateFormData(oldData: any): FormInstance {
  return {
    ...oldData,
    title: oldData.shipName || oldData.title,
    eventDate: oldData.berthingTime || oldData.eventDate,
    endDate: oldData.departureTime || oldData.endDate,
    category: mapTradeType(oldData.domesticForeignTradeType),
    customFields: {
      cargo: oldData.cargoName,
      ...oldData.customFields
    }
  };
}
```

## 五、API接口调整

### 1. 表单创建接口
```typescript
POST /api/forms
{
  templateId: string,
  scenario?: string,      // 新增：场景ID
  data: {
    title: string,
    eventDate?: Date,
    endDate?: Date,
    category?: string,
    location?: Location,
    customFields?: object
  }
}
```

### 2. 场景管理接口
```typescript
GET    /api/scenarios           // 获取所有场景
POST   /api/scenarios           // 创建自定义场景
PUT    /api/scenarios/:id       // 更新场景
DELETE /api/scenarios/:id       // 删除场景
```

## 六、实施步骤

1. **第一阶段**：更新数据模型和API接口
2. **第二阶段**：实现场景配置系统
3. **第三阶段**：迁移现有数据
4. **第四阶段**：更新前端组件
5. **第五阶段**：测试和优化

## 七、预期效果

1. **通用性提升**：系统可适用于多种业务场景
2. **配置灵活性**：用户可根据需求自定义表单
3. **开发效率**：新场景快速配置，无需修改代码
4. **维护成本降低**：统一的架构减少维护复杂度