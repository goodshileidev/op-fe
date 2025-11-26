# 场景配置规范

> **目标**: 定义标准的场景配置格式和最佳实践

---

## 📋 文档信息

- **文档版本**: v1.0
- **创建日期**: 2025-01-14
- **适用对象**: 场景配置开发者
- **前置阅读**: [TRANSFORMATION_OVERVIEW.md](../TRANSFORMATION_OVERVIEW.md)

---

## 📐 配置文件结构

### 完整示例

```json
{
  "$schema": "./scenario-schema.json",
  "id": "medical",
  "name": "医疗调研",
  "description": "用于医疗机构的患者调研和病历管理",
  "version": "1.0.0",
  "author": "开发团队",

  "fieldSemantics": {
    "document": {
      "documentNo": "病历编号",
      "documentUuid": "病历UUID",
      "templateName": "病历模板",
      "dataDate": "就诊日期",
      "currentStep": "当前步骤",
      "fillinStatus": "填写状态",
      "recipientList": "接收医生",
      "editorList": "编辑权限",
      "viewerList": "查看权限"
    },
    "form": {
      "patient_basic_info": {
        "question_patient_id": "患者ID",
        "question_patient_name": "患者姓名",
        "question_gender": "性别",
        "question_age": "年龄",
        "question_id_number": "身份证号",
        "question_contact": "联系方式"
      },
      "diagnosis": {
        "question_symptoms": "主诉症状",
        "question_diagnosis": "诊断结果",
        "question_treatment": "治疗方案"
      }
    }
  },

  "terminology": {
    "document": "病历",
    "form": "诊疗表单",
    "template": "病历模板",
    "section": "检查项",
    "question": "检查内容",

    "create": "创建病历",
    "edit": "编辑病历",
    "view": "查看病历",
    "delete": "删除病历",
    "submit": "提交病历",
    "approve": "审核病历",
    "reject": "退回病历",

    "list": "病历列表",
    "detail": "病历详情",
    "search": "搜索病历"
  },

  "ui": {
    "theme": {
      "primaryColor": "#1890ff",
      "icon": "MedicineBoxOutlined"
    },
    "layout": {
      "tableColumns": [
        "documentNo",
        "dataDate",
        "patientName",
        "doctor",
        "fillinStatus"
      ],
      "searchFields": [
        "documentNo",
        "patientName",
        "dataDate"
      ],
      "detailLayout": "vertical"
    }
  },

  "roles": {
    "doctor": {
      "name": "医生",
      "permissions": ["view", "create", "edit", "submit", "approve"]
    },
    "nurse": {
      "name": "护士",
      "permissions": ["view", "create", "edit"]
    },
    "admin": {
      "name": "管理员",
      "permissions": ["view", "create", "edit", "delete", "approve"]
    }
  }
}
```

---

## 📖 字段说明

### 基础字段

| 字段 | 类型 | 必填 | 说明 | 示例 |
|------|------|------|------|------|
| `$schema` | string | 否 | JSON Schema 引用 | `"./scenario-schema.json"` |
| `id` | string | 是 | 场景唯一标识符 | `"medical"` |
| `name` | string | 是 | 场景显示名称 | `"医疗调研"` |
| `description` | string | 否 | 场景描述 | `"用于..."` |
| `version` | string | 否 | 配置版本（语义化版本） | `"1.0.0"` |
| `author` | string | 否 | 配置作者 | `"开发团队"` |

**id 命名规范**:
- 只能包含小写字母、数字、下划线
- 必须以字母开头
- 长度: 3-30 字符
- 正则: `/^[a-z][a-z0-9_]{2,29}$/`

**合法示例**:
- ✅ `medical`
- ✅ `inspection_facility`
- ✅ `shipping_2024`

**非法示例**:
- ❌ `Medical` - 包含大写
- ❌ `_inspection` - 以下划线开头
- ❌ `medical-research` - 包含连字符
- ❌ `123medical` - 以数字开头

### fieldSemantics (字段语义)

定义字段在当前场景下的显示标签。

#### document (文档级字段)

```typescript
{
  "document": {
    [fieldName: string]: string;  // 字段名 → 显示标签
  }
}
```

**常用字段**:

| 字段名 | 说明 | 示例标签 |
|-------|------|---------|
| `documentNo` | 文档编号 | "病历编号" / "巡检单号" |
| `documentUuid` | 文档UUID | "病历UUID" / "巡检UUID" |
| `templateName` | 模板名称 | "病历模板" / "巡检模板" |
| `dataDate` | 数据日期 | "就诊日期" / "巡检日期" |
| `currentStep` | 当前步骤 | "诊疗步骤" / "检查步骤" |
| `fillinStatus` | 填写状态 | "病历状态" / "巡检状态" |

**完整字段列表**: 参考 `DocumentType` 接口定义

#### form (表单级字段)

```typescript
{
  "form": {
    [formType: string]: {          // 表单类型
      [questionName: string]: string;  // 问题名 → 显示标签
    }
  }
}
```

**示例**:
```json
{
  "form": {
    "patient_basic_info": {
      "question_patient_name": "患者姓名",
      "question_age": "年龄"
    },
    "diagnosis": {
      "question_symptoms": "主诉症状",
      "question_diagnosis": "诊断结果"
    }
  }
}
```

**formType 命名**:
- 使用 snake_case
- 描述性名称
- 示例: `patient_basic_info`, `inspection_items`, `equipment_check`

**questionName 命名**:
- 固定前缀 `question_`
- 后接字段标识
- 示例: `question_name`, `question_result`, `question_photos`

### terminology (术语)

定义场景专用术语。

**必填术语**:

| 键 | 说明 | 示例 |
|---|------|------|
| `document` | 文档的场景名称 | "病历" / "巡检记录" |
| `form` | 表单的场景名称 | "诊疗表单" / "检查表单" |
| `template` | 模板的场景名称 | "病历模板" / "巡检模板" |

**常用操作术语**:

| 键 | 说明 | 示例 |
|---|------|------|
| `create` | 创建操作 | "创建病历" / "创建巡检" |
| `edit` | 编辑操作 | "编辑病历" / "编辑巡检" |
| `view` | 查看操作 | "查看病历" / "查看巡检" |
| `delete` | 删除操作 | "删除病历" / "删除巡检" |
| `submit` | 提交操作 | "提交病历" / "提交巡检" |
| `approve` | 审核通过 | "审核病历" / "审核巡检" |
| `reject` | 审核退回 | "退回病历" / "退回巡检" |
| `list` | 列表页面 | "病历列表" / "巡检列表" |
| `detail` | 详情页面 | "病历详情" / "巡检详情" |

**自定义术语**:
可以添加场景特定的术语，如:
```json
{
  "terminology": {
    "patient": "患者",
    "doctor": "医生",
    "equipment": "设备",
    "inspector": "巡检员"
  }
}
```

### ui (UI配置)

#### theme (主题)

```typescript
{
  "theme": {
    "primaryColor": string;  // 主色调（Hex颜色）
    "icon"?: string;         // 图标名称（Ant Design图标）
  }
}
```

**推荐颜色**:
- 医疗: `#1890ff` (蓝色)
- 工业/巡检: `#52c41a` (绿色)
- 港口/物流: `#fa8c16` (橙色)
- 教育/调研: `#722ed1` (紫色)

**图标名称**: 使用 Ant Design Icons
- 医疗: `MedicineBoxOutlined`
- 工业: `ToolOutlined`, `SafetyOutlined`
- 调研: `FormOutlined`, `FileTextOutlined`

#### layout (布局)

```typescript
{
  "layout": {
    "tableColumns"?: string[];   // 列表页显示的列
    "searchFields"?: string[];   // 搜索栏字段
    "detailLayout"?: "vertical" | "horizontal";  // 详情页布局
  }
}
```

**tableColumns**: 定义列表页显示哪些列
```json
{
  "tableColumns": [
    "documentNo",    // 文档编号
    "dataDate",      // 日期
    "patientName",   // 自定义字段
    "doctor",        // 自定义字段
    "fillinStatus"   // 状态
  ]
}
```

**searchFields**: 定义搜索栏字段
```json
{
  "searchFields": [
    "documentNo",
    "patientName",
    "dataDate"
  ]
}
```

### roles (角色)

定义场景特定的角色和权限。

```typescript
{
  "roles": {
    [roleId: string]: {
      "name": string;          // 角色显示名称
      "permissions": string[]; // 权限列表
    }
  }
}
```

**标准权限**:
- `view` - 查看
- `create` - 创建
- `edit` - 编辑
- `delete` - 删除
- `submit` - 提交
- `approve` - 审核
- `export` - 导出
- `import` - 导入

**示例**:
```json
{
  "roles": {
    "doctor": {
      "name": "医生",
      "permissions": ["view", "create", "edit", "submit", "approve"]
    },
    "nurse": {
      "name": "护士",
      "permissions": ["view", "create", "edit"]
    }
  }
}
```

---

## ✅ 最佳实践

### 1. 配置文件组织

**文件位置**:
```
scenarios/
├── medical.json          # 医疗场景
├── inspection.json       # 巡检场景
├── shipping.json         # 港口场景
├── schema.json           # JSON Schema（可选）
└── README.md             # 场景说明
```

**文件命名**:
- 使用场景 id 作为文件名
- 小写，使用连字符（可选）
- 扩展名: `.json`

### 2. 字段映射原则

**DO** ✅:
```json
{
  "document": {
    "documentNo": "病历编号",
    "dataDate": "就诊日期"
  }
}
```

**DON'T** ❌:
```json
{
  "document": {
    "documentNo": "documentNo",  // ❌ 不要映射到自己
    "dataDate": ""               // ❌ 不要使用空字符串
  }
}
```

**原则**:
- 只映射需要改变显示名称的字段
- 未映射的字段会使用默认名称（驼峰转空格）
- 保持映射简洁，不要过度配置

### 3. 术语一致性

**DO** ✅:
```json
{
  "terminology": {
    "document": "病历",
    "create": "创建病历",  // ✅ 使用 "病历"
    "list": "病历列表"     // ✅ 一致
  }
}
```

**DON'T** ❌:
```json
{
  "terminology": {
    "document": "病历",
    "create": "创建记录",  // ❌ 不一致
    "list": "文档列表"     // ❌ 不一致
  }
}
```

### 4. 配置大小控制

**目标**: 每个配置文件 < 200 行

**如果配置过大**:
1. 检查是否有不必要的字段映射
2. 是否可以使用默认值
3. 考虑拆分为多个场景

### 5. 版本管理

使用语义化版本（Semantic Versioning）:
- `1.0.0` - 初始版本
- `1.0.1` - 修复bug（字段标签错误）
- `1.1.0` - 新增功能（新增字段映射）
- `2.0.0` - 破坏性变更（修改核心结构）

---

## 🔍 验证和测试

### JSON Schema 验证

创建 `scenarios/schema.json`:
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "name", "fieldSemantics", "terminology", "ui"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z][a-z0-9_]{2,29}$"
    },
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 50
    },
    "version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "fieldSemantics": {
      "type": "object",
      "required": ["document"],
      "properties": {
        "document": {
          "type": "object"
        },
        "form": {
          "type": "object"
        }
      }
    },
    "terminology": {
      "type": "object",
      "required": ["document", "form", "template"]
    },
    "ui": {
      "type": "object",
      "required": ["theme"],
      "properties": {
        "theme": {
          "type": "object",
          "required": ["primaryColor"],
          "properties": {
            "primaryColor": {
              "type": "string",
              "pattern": "^#[0-9A-Fa-f]{6}$"
            }
          }
        }
      }
    }
  }
}
```

### 验证工具

```typescript
// tools/validate-scenario.ts

import Ajv from 'ajv';
import * as fs from 'fs';

const ajv = new Ajv();
const schema = JSON.parse(fs.readFileSync('scenarios/schema.json', 'utf-8'));
const validate = ajv.compile(schema);

function validateScenario(configPath: string): void {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  const valid = validate(config);

  if (!valid) {
    console.error('验证失败:');
    console.error(validate.errors);
    process.exit(1);
  }

  console.log(`✅ ${configPath} 验证通过`);
}

// 验证所有场景
const files = fs.readdirSync('scenarios').filter(f => f.endsWith('.json') && f !== 'schema.json');
files.forEach(file => validateScenario(`scenarios/${file}`));
```

**运行验证**:
```bash
npx ts-node tools/validate-scenario.ts
```

### 单元测试

```typescript
// src/scenarios/__tests__/config.test.ts

import medicalConfig from '../../../scenarios/medical.json';
import inspectionConfig from '../../../scenarios/inspection.json';
import { ScenarioRegistry } from '../ScenarioRegistry';

describe('Scenario Configurations', () => {
  test('Medical config is valid', () => {
    expect(medicalConfig.id).toBe('medical');
    expect(medicalConfig.name).toBeTruthy();
    expect(medicalConfig.fieldSemantics.document).toBeDefined();
  });

  test('Can load medical config', () => {
    const registry = ScenarioRegistry.getInstance();
    expect(() => {
      registry.register(medicalConfig as any);
    }).not.toThrow();
  });

  test('Field semantics are complete', () => {
    // 检查必须的字段是否都有映射
    const requiredFields = ['documentNo', 'dataDate', 'templateName'];
    requiredFields.forEach(field => {
      expect(medicalConfig.fieldSemantics.document[field]).toBeDefined();
    });
  });

  test('Terminology is consistent', () => {
    const documentTerm = medicalConfig.terminology.document;
    const createTerm = medicalConfig.terminology.create;

    // 创建操作应该包含文档术语
    expect(createTerm).toContain(documentTerm);
  });
});
```

---

## 📝 配置检查清单

使用此清单检查配置是否完整：

### 基础信息
- [ ] `id` 符合命名规范
- [ ] `name` 简洁明确
- [ ] `description` 清晰描述场景用途
- [ ] `version` 遵循语义化版本

### 字段语义
- [ ] `document` 包含核心字段映射
- [ ] `form` 包含所有表单类型
- [ ] 字段标签简洁、易懂
- [ ] 无重复或冲突的映射

### 术语
- [ ] 必填术语完整 (document, form, template)
- [ ] 操作术语完整 (create, edit, view, etc.)
- [ ] 术语一致性良好
- [ ] 无错别字

### UI配置
- [ ] 主色调符合场景特点
- [ ] 图标合适
- [ ] `tableColumns` 包含关键字段
- [ ] `searchFields` 合理

### 角色
- [ ] 角色定义清晰
- [ ] 权限分配合理
- [ ] 覆盖主要用户类型

### 质量
- [ ] 文件大小 < 200 行
- [ ] JSON 格式正确
- [ ] 通过 Schema 验证
- [ ] 通过单元测试

---

## 🚀 快速开始模板

### 最小化配置

```json
{
  "id": "my_scenario",
  "name": "我的场景",

  "fieldSemantics": {
    "document": {
      "documentNo": "记录编号"
    },
    "form": {}
  },

  "terminology": {
    "document": "记录",
    "form": "表单",
    "template": "模板",
    "create": "创建记录"
  },

  "ui": {
    "theme": {
      "primaryColor": "#1890ff"
    }
  }
}
```

**大小**: 约 30 行

**使用**:
1. 复制模板
2. 修改 `id` 和 `name`
3. 添加需要的字段映射
4. 保存为 `scenarios/my_scenario.json`

---

## 📞 支持

**需要帮助？**
1. 查看示例配置: `scenarios/medical.json`
2. 运行验证工具
3. 查阅 [POC Guide](./01-poc-guide.md)
4. 联系技术负责人

---

**文档版本**: v1.0
**最后更新**: 2025-01-14
**维护者**: 开发团队
