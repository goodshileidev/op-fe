# 场景配置指南

## 📋 文档信息

- **模块**: 场景配置系统
- **优先级**: P1  
- **预计工时**: 3-4 工作日
- **依赖**: 所有核心模块 (01-05)
- **负责人**: 待分配

---

## 🎯 改造目标

提供**完整的场景配置指南和示例**,包括:

1. ✅ 场景配置文件格式说明
2. ✅ 医疗调研场景完整配置
3. ✅ 工业巡检场景完整配置  
4. ✅ 港口航运场景完整配置
5. ✅ 场景配置最佳实践
6. ✅ 常见问题和解决方案

---

## 📐 场景配置文件格式

### 核心配置结构

\`\`\`typescript
/**
 * 场景配置接口
 * 文件位置: src/common/data_type/generic/scenario-config.ts
 */

export interface ScenarioConfig {
  // === 基础信息 ===
  id: string;                          // 场景唯一标识
  name: string;                        // 场景名称(英文)
  displayName: string;                 // 场景显示名称(中文)
  description: string;                 // 场景描述
  icon?: string;                       // 场景图标
  version: string;                     // 配置版本
  
  // === 实体定义 ===
  entities: {
    [entityType: string]: EntityConfig;
  };
  
  // === 术语映射 ===
  terminology: {
    [key: string]: string;
  };
  
  // === 主题配置 ===
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
    favicon?: string;
  };
  
  // === 角色配置 ===
  roles: {
    [roleName: string]: RoleConfig;
  };
  
  // === 功能开关 ===
  features: {
    [featureName: string]: boolean | FeatureConfig;
  };
  
  // === 工作流配置 ===
  workflows?: WorkflowConfig[];
  
  // === 通知配置 ===
  notifications?: NotificationConfig[];
}

/**
 * 实体配置
 */
export interface EntityConfig {
  type: string;                        // 实体类型
  displayName: string;                 // 显示名称
  icon?: string;                       // 图标
  
  // 字段映射配置
  fieldMapping: {
    [fieldName: string]: {
      label: string;                   // 字段标签
      placeholder?: string;            // 占位符
      helpText?: string;               // 帮助文本
      order?: number;                  // 排序
      group?: string;                  // 分组
    };
  };
  
  // 模板配置
  templates?: TemplateReference[];
}

/**
 * 角色配置
 */
export interface RoleConfig {
  name: string;
  displayName: string;
  permissions: string[];
  dataScopes?: string[];
}

/**
 * 功能配置
 */
export interface FeatureConfig {
  enabled: boolean;
  config?: Record<string, any>;
}
\`\`\`

---

## 🏥 医疗调研场景配置

### 完整配置示例

\`\`\`json
{
  "id": "medical",
  "name": "medical_research",
  "displayName": "医疗调研",
  "description": "用于医疗机构的患者调研和病历记录管理",
  "icon": "MedicineBoxOutlined",
  "version": "1.0.0",
  
  "entities": {
    "patient_record": {
      "type": "patient_record",
      "displayName": "患者记录",
      "icon": "UserOutlined",
      "fieldMapping": {
        "title": {
          "label": "患者姓名",
          "placeholder": "请输入患者姓名",
          "order": 1,
          "group": "基本信息"
        },
        "subtitle": {
          "label": "主要症状",
          "placeholder": "请输入主要症状",
          "order": 2,
          "group": "基本信息"
        },
        "eventDate": {
          "label": "就诊日期",
          "placeholder": "选择就诊日期",
          "order": 3,
          "group": "基本信息"
        },
        "startDate": {
          "label": "入院日期",
          "placeholder": "选择入院日期",
          "order": 4,
          "group": "住院信息"
        },
        "endDate": {
          "label": "出院日期",
          "placeholder": "选择出院日期",
          "order": 5,
          "group": "住院信息"
        },
        "category": {
          "label": "就诊科室",
          "placeholder": "选择就诊科室",
          "helpText": "患者就诊的医院科室",
          "order": 6,
          "group": "医疗信息"
        },
        "subcategory": {
          "label": "疾病分类",
          "placeholder": "选择疾病分类",
          "order": 7,
          "group": "医疗信息"
        },
        "location": {
          "label": "医疗机构",
          "placeholder": "选择医疗机构",
          "order": 8,
          "group": "基本信息"
        }
      }
    },
    
    "examination": {
      "type": "examination",
      "displayName": "检查记录",
      "icon": "FileSearchOutlined",
      "fieldMapping": {
        "title": {
          "label": "检查项目",
          "placeholder": "请输入检查项目名称",
          "order": 1
        },
        "eventDate": {
          "label": "检查日期",
          "placeholder": "选择检查日期",
          "order": 2
        },
        "category": {
          "label": "检查类型",
          "placeholder": "选择检查类型",
          "order": 3
        }
      }
    }
  },
  
  "terminology": {
    "entity": "患者记录",
    "entities": "患者记录列表",
    "template": "病历模板",
    "templates": "病历模板库",
    "document": "病历文档",
    "documents": "病历文档列表",
    "form": "问诊表单",
    "forms": "问诊表单列表",
    "submit": "提交病历",
    "approve": "医生审核",
    "reject": "退回修改",
    "viewer": "可查看医生",
    "editor": "可编辑护士",
    "owner": "主治医生",
    "create_time": "创建时间",
    "update_time": "更新时间",
    "status": "病历状态"
  },
  
  "theme": {
    "primaryColor": "#1890ff",
    "secondaryColor": "#52c41a",
    "logo": "/assets/medical-logo.png"
  },
  
  "roles": {
    "doctor": {
      "name": "doctor",
      "displayName": "医生",
      "permissions": [
        "patient_record:view",
        "patient_record:create",
        "patient_record:edit",
        "patient_record:approve",
        "examination:view",
        "examination:create"
      ]
    },
    "nurse": {
      "name": "nurse",
      "displayName": "护士",
      "permissions": [
        "patient_record:view",
        "patient_record:create",
        "patient_record:edit",
        "examination:view"
      ]
    },
    "admin": {
      "name": "admin",
      "displayName": "管理员",
      "permissions": [
        "patient_record:*",
        "examination:*",
        "template:*",
        "user:*"
      ]
    }
  },
  
  "features": {
    "electronicSignature": true,
    "gpsLocation": false,
    "offlineMode": true,
    "dataExport": {
      "enabled": true,
      "config": {
        "formats": ["pdf", "excel", "csv"],
        "includeDiagnostics": true
      }
    },
    "multiLanguage": true,
    "auditLog": true,
    "dataEncryption": true
  },
  
  "workflows": [
    {
      "id": "patient_admission",
      "name": "患者入院流程",
      "steps": [
        {
          "id": "register",
          "name": "患者登记",
          "assignee": "nurse"
        },
        {
          "id": "diagnosis",
          "name": "医生诊断",
          "assignee": "doctor"
        },
        {
          "id": "treatment_plan",
          "name": "制定治疗方案",
          "assignee": "doctor"
        },
        {
          "id": "hospitalization",
          "name": "办理住院",
          "assignee": "nurse"
        }
      ]
    }
  ]
}
\`\`\`

---

## 🏭 工业巡检场景配置

### 完整配置示例

\`\`\`json
{
  "id": "inspection",
  "name": "industrial_inspection",
  "displayName": "工业巡检",
  "description": "用于工业设备巡检和安全检查管理",
  "icon": "ToolOutlined",
  "version": "1.0.0",
  
  "entities": {
    "inspection_record": {
      "type": "inspection_record",
      "displayName": "巡检记录",
      "icon": "FileProtectOutlined",
      "fieldMapping": {
        "title": {
          "label": "设备名称",
          "placeholder": "请输入设备名称",
          "order": 1,
          "group": "基本信息"
        },
        "subtitle": {
          "label": "设备型号",
          "placeholder": "请输入设备型号",
          "order": 2,
          "group": "基本信息"
        },
        "eventDate": {
          "label": "巡检日期",
          "placeholder": "选择巡检日期",
          "order": 3,
          "group": "基本信息"
        },
        "startDate": {
          "label": "巡检开始时间",
          "placeholder": "选择开始时间",
          "order": 4,
          "group": "时间信息"
        },
        "endDate": {
          "label": "巡检结束时间",
          "placeholder": "选择结束时间",
          "order": 5,
          "group": "时间信息"
        },
        "category": {
          "label": "设备类别",
          "placeholder": "选择设备类别",
          "order": 6,
          "group": "设备信息"
        },
        "subcategory": {
          "label": "设备子类",
          "placeholder": "选择设备子类",
          "order": 7,
          "group": "设备信息"
        },
        "location": {
          "label": "设备位置",
          "placeholder": "选择或定位设备位置",
          "helpText": "可使用GPS定位或手动选择",
          "order": 8,
          "group": "位置信息"
        },
        "tags": {
          "label": "标签",
          "placeholder": "添加标签",
          "helpText": "如:重点设备、高危设备等",
          "order": 9,
          "group": "分类信息"
        }
      }
    },
    
    "safety_check": {
      "type": "safety_check",
      "displayName": "安全检查",
      "icon": "SafetyCertificateOutlined",
      "fieldMapping": {
        "title": {
          "label": "检查区域",
          "order": 1
        },
        "eventDate": {
          "label": "检查日期",
          "order": 2
        },
        "category": {
          "label": "检查类型",
          "order": 3
        }
      }
    }
  },
  
  "terminology": {
    "entity": "巡检记录",
    "entities": "巡检记录列表",
    "template": "巡检模板",
    "templates": "巡检模板库",
    "document": "巡检文档",
    "documents": "巡检文档列表",
    "form": "巡检表单",
    "forms": "巡检表单列表",
    "submit": "提交巡检",
    "approve": "审核通过",
    "reject": "需要整改",
    "viewer": "可查看人员",
    "editor": "巡检人员",
    "owner": "负责人",
    "create_time": "创建时间",
    "update_time": "更新时间",
    "status": "巡检状态",
    "normal": "正常",
    "warning": "预警",
    "abnormal": "异常",
    "urgent": "紧急"
  },
  
  "theme": {
    "primaryColor": "#fa8c16",
    "secondaryColor": "#13c2c2"
  },
  
  "roles": {
    "inspector": {
      "name": "inspector",
      "displayName": "巡检员",
      "permissions": [
        "inspection_record:view",
        "inspection_record:create",
        "inspection_record:edit",
        "safety_check:view",
        "safety_check:create"
      ]
    },
    "supervisor": {
      "name": "supervisor",
      "displayName": "主管",
      "permissions": [
        "inspection_record:view",
        "inspection_record:approve",
        "safety_check:view",
        "safety_check:approve"
      ]
    },
    "manager": {
      "name": "manager",
      "displayName": "经理",
      "permissions": [
        "inspection_record:*",
        "safety_check:*",
        "template:*"
      ]
    }
  },
  
  "features": {
    "electronicSignature": true,
    "gpsLocation": true,
    "offlineMode": true,
    "photoCapture": true,
    "voiceRecording": true,
    "qrCodeScanning": true,
    "dataExport": {
      "enabled": true,
      "config": {
        "formats": ["pdf", "excel"]
      }
    },
    "realTimeAlerts": true,
    "statisticsReport": true
  },
  
  "workflows": [
    {
      "id": "daily_inspection",
      "name": "日常巡检流程",
      "steps": [
        {
          "id": "scan_qr",
          "name": "扫描设备二维码",
          "assignee": "inspector"
        },
        {
          "id": "fill_form",
          "name": "填写巡检表单",
          "assignee": "inspector"
        },
        {
          "id": "take_photos",
          "name": "拍照记录",
          "assignee": "inspector"
        },
        {
          "id": "submit",
          "name": "提交巡检",
          "assignee": "inspector"
        },
        {
          "id": "review",
          "name": "主管审核",
          "assignee": "supervisor"
        }
      ]
    }
  ]
}
\`\`\`

---

## 🚢 港口航运场景配置

### 完整配置示例

\`\`\`json
{
  "id": "shipping",
  "name": "port_shipping",
  "displayName": "港口航运",
  "description": "用于港口船舶作业和货运管理",
  "icon": "RocketOutlined",
  "version": "1.0.0",
  
  "entities": {
    "ship_operation": {
      "type": "ship_operation",
      "displayName": "船舶作业",
      "icon": "CarOutlined",
      "fieldMapping": {
        "title": {
          "label": "船名",
          "placeholder": "请输入船名",
          "order": 1,
          "group": "船舶信息"
        },
        "subtitle": {
          "label": "货名",
          "placeholder": "请输入货名",
          "order": 2,
          "group": "货物信息"
        },
        "eventDate": {
          "label": "作业日期",
          "placeholder": "选择作业日期",
          "order": 3,
          "group": "时间信息"
        },
        "startDate": {
          "label": "靠泊时间",
          "placeholder": "选择靠泊时间",
          "order": 4,
          "group": "时间信息"
        },
        "endDate": {
          "label": "离港时间",
          "placeholder": "选择离港时间",
          "order": 5,
          "group": "时间信息"
        },
        "category": {
          "label": "贸易类型",
          "placeholder": "选择内外贸类型",
          "order": 6,
          "group": "业务分类"
        },
        "subcategory": {
          "label": "船舶类型",
          "placeholder": "选择船舶类型",
          "order": 7,
          "group": "船舶信息"
        },
        "location": {
          "label": "泊位",
          "placeholder": "选择泊位",
          "order": 8,
          "group": "位置信息"
        }
      }
    },
    
    "security_check": {
      "type": "security_check",
      "displayName": "保安检查",
      "icon": "SafetyOutlined",
      "fieldMapping": {
        "title": {
          "label": "检查项目",
          "order": 1
        },
        "eventDate": {
          "label": "检查日期",
          "order": 2
        }
      }
    }
  },
  
  "terminology": {
    "entity": "作业文档",
    "entities": "作业文档列表",
    "template": "作业模板",
    "templates": "作业模板库",
    "document": "船舶文档",
    "documents": "船舶文档列表",
    "form": "作业表单",
    "forms": "作业表单列表",
    "submit": "提交作业",
    "approve": "审核通过",
    "reject": "退回修改",
    "viewer": "可查看人员",
    "editor": "作业人员",
    "owner": "负责人"
  },
  
  "theme": {
    "primaryColor": "#1890ff",
    "secondaryColor": "#722ed1"
  },
  
  "roles": {
    "operator": {
      "name": "operator",
      "displayName": "作业员",
      "permissions": [
        "ship_operation:view",
        "ship_operation:create",
        "ship_operation:edit"
      ]
    },
    "supervisor": {
      "name": "supervisor",
      "displayName": "主管",
      "permissions": [
        "ship_operation:view",
        "ship_operation:approve",
        "security_check:view",
        "security_check:approve"
      ]
    },
    "manager": {
      "name": "manager",
      "displayName": "经理",
      "permissions": [
        "ship_operation:*",
        "security_check:*",
        "template:*"
      ]
    }
  },
  
  "features": {
    "electronicSignature": true,
    "gpsLocation": true,
    "offlineMode": false,
    "dataExport": {
      "enabled": true,
      "config": {
        "formats": ["pdf", "excel", "word"]
      }
    },
    "reportGeneration": true,
    "statisticsAnalysis": true
  }
}
\`\`\`

---

## 📝 配置最佳实践

### 1. 命名规范

\`\`\`typescript
// ✅ 好的命名
{
  "id": "medical",              // 简短、语义化
  "name": "medical_research",   // 使用下划线分隔
  "displayName": "医疗调研"     // 用户友好的显示名称
}

// ❌ 不好的命名
{
  "id": "scenario1",            // 无意义的命名
  "name": "MedicalResearch",    // 驼峰命名不合适
  "displayName": "medical"      // 应该是中文
}
\`\`\`

### 2. 字段映射配置

\`\`\`typescript
// ✅ 完整的字段配置
{
  "title": {
    "label": "患者姓名",
    "placeholder": "请输入患者姓名",
    "helpText": "患者的真实姓名",
    "order": 1,
    "group": "基本信息"
  }
}

// ❌ 不完整的配置
{
  "title": {
    "label": "姓名"  // 缺少必要的配置项
  }
}
\`\`\`

### 3. 术语映射

\`\`\`typescript
// ✅ 全面的术语映射
{
  "terminology": {
    "entity": "患者记录",
    "entities": "患者记录列表",
    "template": "病历模板",
    "submit": "提交病历",
    "approve": "医生审核",
    // ... 覆盖所有通用术语
  }
}

// ❌ 不完整的映射
{
  "terminology": {
    "entity": "患者记录"  // 只映射了部分术语
  }
}
\`\`\`

### 4. 角色权限设计

\`\`\`typescript
// ✅ 清晰的权限划分
{
  "roles": {
    "doctor": {
      "permissions": [
        "patient_record:view",
        "patient_record:create",
        "patient_record:edit",
        "patient_record:approve"
      ]
    }
  }
}

// ❌ 过度宽松的权限
{
  "roles": {
    "doctor": {
      "permissions": ["*"]  // 给予所有权限不安全
    }
  }
}
\`\`\`

---

## ❓ 常见问题

### Q1: 如何添加自定义字段?

**A**: 在 customFields 中定义新字段,然后在 fieldMapping 中配置显示:

\`\`\`json
{
  "entities": {
    "patient_record": {
      "customFields": [
        {
          "name": "blood_type",
          "type": "select",
          "label": "血型",
          "options": [
            {"label": "A型", "value": "A"},
            {"label": "B型", "value": "B"},
            {"label": "AB型", "value": "AB"},
            {"label": "O型", "value": "O"}
          ]
        }
      ],
      "fieldMapping": {
        "blood_type": {
          "label": "血型",
          "order": 10,
          "group": "医疗信息"
        }
      }
    }
  }
}
\`\`\`

### Q2: 如何配置条件显示?

**A**: 使用条件规则:

\`\`\`json
{
  "conditionalRules": [
    {
      "field": "hospitalization_type",
      "showWhen": {
        "field": "needs_hospitalization",
        "operator": "eq",
        "value": true
      }
    }
  ]
}
\`\`\`

### Q3: 如何实现字段联动?

**A**: 配置计算规则或依赖规则:

\`\`\`json
{
  "calculationRules": [
    {
      "targetField": "total_cost",
      "formula": "examination_cost + treatment_cost + medicine_cost",
      "dependencies": ["examination_cost", "treatment_cost", "medicine_cost"]
    }
  ]
}
\`\`\`

### Q4: 如何配置工作流?

**A**: 在 workflows 中定义流程:

\`\`\`json
{
  "workflows": [
    {
      "id": "approval_flow",
      "name": "审批流程",
      "steps": [
        {
          "id": "submit",
          "name": "提交",
          "assignee": "editor"
        },
        {
          "id": "review",
          "name": "审核",
          "assignee": "supervisor"
        },
        {
          "id": "approve",
          "name": "批准",
          "assignee": "manager"
        }
      ]
    }
  ]
}
\`\`\`

---

## 📦 实施步骤

### 步骤 1: 创建场景配置文件

\`\`\`bash
# 创建场景配置目录
mkdir -p src/scenarios

# 创建配置文件
touch src/scenarios/medical.json
touch src/scenarios/inspection.json
touch src/scenarios/shipping.json
\`\`\`

### 步骤 2: 编写配置内容

按照上面的示例编写各场景的完整配置。

### 步骤 3: 验证配置

使用配置验证工具:

\`\`\`typescript
import { validateScenarioConfig } from '@/utils/scenario-validator';

const config = require('./scenarios/medical.json');
const errors = validateScenarioConfig(config);

if (errors.length > 0) {
  console.error('Configuration errors:', errors);
}
\`\`\`

### 步骤 4: 加载场景

在场景管理器中加载配置:

\`\`\`typescript
import { scenarioManager } from '@/core/scenario-manager';
import medicalConfig from '@/scenarios/medical.json';

scenarioManager.registerScenario(medicalConfig);
\`\`\`

---

## ✅ 验收标准

- [ ] 3个场景配置文件完整
- [ ] 所有必填字段都有配置
- [ ] 术语映射覆盖所有通用术语
- [ ] 角色权限配置合理
- [ ] 配置文件通过验证
- [ ] 场景可以正常加载和切换
- [ ] 字段映射正确显示
- [ ] 工作流正常运行

---

## 📚 参考资料

- [场景管理器实现](./02-scenario-manager.md)
- [字段类型系统](./03-field-type-system.md)
- [规则引擎配置](./04-rule-engine.md)

---

**版本**: v1.0
**创建日期**: 2025-01-13
**最后更新**: 2025-01-13
