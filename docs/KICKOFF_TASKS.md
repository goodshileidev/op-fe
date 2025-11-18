# 🚀 启动任务清单

> **目标**: 产品化改造，立即开干！

**日期**: 2025-01-14

---

## 📋 Week 1 任务（本周完成）

### 任务 1: 字段梳理 [DBA + 后端]

**负责人**: DBA

**任务**:
1. 梳理 `documents` 表所有字段
2. 标记哪些是通用字段（保留）
3. 标记哪些是港务特定字段（移到JSON）
4. 输出字段清单

**交付物**: `docs/field-inventory.xlsx`

| 字段名 | 中文名 | 当前类型 | 是否港务特定 | 处理方式 |
|-------|--------|---------|------------|---------|
| ship_name | 船名 | VARCHAR(200) | ✅ 是 | 移到 business_data |
| cargo_name | 货名 | VARCHAR(200) | ✅ 是 | 移到 business_data |
| document_no | 文档编号 | VARCHAR(100) | ❌ 否 | 保留 |
| ... | ... | ... | ... | ... |

**时间**: 2天

---

### 任务 2: 数据库改造方案 [DBA]

**负责人**: DBA

**任务**:
1. 编写 ALTER TABLE 脚本
2. 设计数据迁移脚本
3. 设计回滚方案
4. 准备测试环境

**交付物**:
- `db/migrations/001_add_business_data_column.sql`
- `db/migrations/002_migrate_shipping_fields.sql`
- `db/migrations/rollback.sql`

**脚本示例**:
```sql
-- 001_add_business_data_column.sql

-- 1. 添加新列
ALTER TABLE documents
ADD COLUMN business_data JSON NOT NULL DEFAULT '{}' COMMENT '业务字段数据',
ADD COLUMN metadata JSON COMMENT '扩展元数据',
ADD COLUMN industry_type VARCHAR(50) COMMENT '行业类型';

-- 2. 添加索引
CREATE INDEX idx_industry_type ON documents(industry_type);

-- 3. 更新现有数据的 industry_type
UPDATE documents SET industry_type = 'shipping';
```

```sql
-- 002_migrate_shipping_fields.sql

-- 迁移港务字段到 business_data
UPDATE documents
SET business_data = JSON_OBJECT(
  'shipName', ship_name,
  'cargoName', cargo_name,
  'berthingTime', berthing_time,
  'departureTime', departure_time,
  'domesticForeignTradeType', domestic_foreign_trade_type,
  'shipType', ship_type
)
WHERE ship_name IS NOT NULL OR cargo_name IS NOT NULL;

-- 验证迁移（建议在测试环境先执行）
SELECT
  document_id,
  ship_name,
  JSON_UNQUOTE(JSON_EXTRACT(business_data, '$.shipName')) as migrated_ship_name
FROM documents
WHERE ship_name != JSON_UNQUOTE(JSON_EXTRACT(business_data, '$.shipName'))
LIMIT 10;

-- 确认无误后，删除旧列（谨慎！）
-- ALTER TABLE documents
-- DROP COLUMN ship_name,
-- DROP COLUMN cargo_name,
-- DROP COLUMN berthing_time,
-- DROP COLUMN departure_time,
-- DROP COLUMN domestic_foreign_trade_type,
-- DROP COLUMN ship_type;
```

**时间**: 3天

---

### 任务 3: 字段元数据表设计 [DBA]

**负责人**: DBA

**任务**:
1. 创建 `field_metadata` 表
2. 准备测试数据（港务字段）

**交付物**: `db/schema/field_metadata.sql`

```sql
CREATE TABLE field_metadata (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  field_name VARCHAR(100) NOT NULL,
  field_path VARCHAR(200) NOT NULL,
  industry_type VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  label VARCHAR(100),
  field_type VARCHAR(50),
  data_type VARCHAR(50),
  required BOOLEAN DEFAULT FALSE,
  validation_rules JSON,
  ui_config JSON,
  default_value TEXT,
  display_order INT DEFAULT 0,
  group_name VARCHAR(100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uk_field_path (industry_type, entity_type, field_path),
  INDEX idx_industry (industry_type),
  INDEX idx_entity (entity_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='字段元数据表';

-- 插入测试数据（港务字段）
INSERT INTO field_metadata (
  field_name, field_path, industry_type, entity_type,
  label, field_type, data_type, required,
  validation_rules, ui_config, display_order
) VALUES
('shipName', 'business_data.shipName', 'shipping', 'document',
 '船名', 'string', 'varchar', TRUE,
 '[{"type":"notEmpty","message":"船名不能为空"}]',
 '{"component":"Input","placeholder":"请输入船名","width":300}',
 1),
('cargoName', 'business_data.cargoName', 'shipping', 'document',
 '货名', 'string', 'varchar', TRUE,
 '[{"type":"notEmpty","message":"货名不能为空"}]',
 '{"component":"Input","placeholder":"请输入货名"}',
 2);
```

**时间**: 2天

---

### 任务 4: 后端 Entity 改造 [后端]

**负责人**: 后端开发

**任务**:
1. 修改 `Document` Entity，添加 `businessData` 字段
2. 添加 JPA Converter 支持 JSON
3. 编写单元测试

**交付物**:
- `src/main/java/com/company/entity/Document.java`
- `src/test/java/com/company/entity/DocumentTest.java`

**代码**:
```java
package com.company.entity;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    @Column(name = "document_id")
    private String documentId;

    @Column(name = "document_no")
    private String documentNo;

    // ✅ 新增：业务数据JSON字段
    @Convert(converter = JsonConverter.class)
    @Column(name = "business_data", columnDefinition = "json")
    private Map<String, Object> businessData = new HashMap<>();

    // ✅ 新增：行业类型
    @Column(name = "industry_type")
    private String industryType;

    // 通用字段保留
    @Column(name = "data_date")
    private String dataDate;

    // ... 其他字段

    // ✅ 业务字段访问方法
    public <T> T getBusinessField(String fieldName, Class<T> type) {
        Object value = businessData.get(fieldName);
        return value != null ? type.cast(value) : null;
    }

    public void setBusinessField(String fieldName, Object value) {
        if (businessData == null) {
            businessData = new HashMap<>();
        }
        businessData.put(fieldName, value);
    }

    // Getters and Setters...
}
```

```java
package com.company.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;
import java.util.Map;

@Converter
public class JsonConverter implements AttributeConverter<Map<String, Object>, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Map<String, Object> attribute) {
        try {
            return objectMapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("JSON conversion error", e);
        }
    }

    @Override
    public Map<String, Object> convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, Map.class);
        } catch (IOException e) {
            return new HashMap<>();
        }
    }
}
```

**时间**: 2天

---

### 任务 5: 配置文件创建 [后端]

**负责人**: 后端开发

**任务**:
1. 创建 `application-shipping.yml`
2. 定义港务字段配置
3. 实现配置加载逻辑

**交付物**:
- `src/main/resources/application-shipping.yml`
- `src/main/java/com/company/config/IndustryConfigLoader.java`

**配置文件**:
```yaml
# src/main/resources/application-shipping.yml

industry:
  type: shipping
  name: 港口航运

  fields:
    document:
      - name: shipName
        label: 船名
        type: string
        required: true
        ui:
          component: Input
          placeholder: 请输入船名

      - name: cargoName
        label: 货名
        type: string
        required: true

      - name: berthingTime
        label: 靠泊时间
        type: datetime
        required: true
```

**配置加载器**:
```java
@Configuration
public class IndustryConfigLoader {

    @Value("${spring.profiles.active:shipping}")
    private String activeProfile;

    @Bean
    public IndustryConfig loadIndustryConfig() {
        // 从 application-{profile}.yml 加载配置
        // 实现配置解析逻辑
    }
}
```

**时间**: 2天

---

### 任务 6: MetadataService 开发 [后端]

**负责人**: 后端开发

**任务**:
1. 实现 `MetadataService`
2. 实现字段元数据加载
3. 实现缓存机制
4. 编写单元测试

**交付物**:
- `src/main/java/com/company/service/MetadataService.java`
- `src/test/java/com/company/service/MetadataServiceTest.java`

```java
@Service
public class MetadataService {

    @Autowired
    private FieldMetadataRepository repository;

    private Map<String, List<FieldMetadata>> cache = new ConcurrentHashMap<>();

    public List<FieldMetadata> getFieldMetadata(String industryType, String entityType) {
        String key = industryType + ":" + entityType;
        return cache.computeIfAbsent(key, k ->
            repository.findByIndustryAndEntity(industryType, entityType)
        );
    }

    @PostConstruct
    public void loadFromConfig() {
        // 从配置文件加载元数据到数据库
    }

    public void clearCache() {
        cache.clear();
    }
}
```

**时间**: 3天

---

### 任务 7: 前端 DynamicForm 组件 [前端]

**负责人**: 前端开发

**任务**:
1. 创建 `DynamicForm` 组件
2. 创建 `DynamicField` 组件
3. 实现字段类型映射
4. 编写组件测试

**交付物**:
- `src/components/DynamicForm/index.tsx`
- `src/components/DynamicForm/DynamicField.tsx`
- `src/components/DynamicForm/__tests__/DynamicForm.test.tsx`

```typescript
// src/components/DynamicForm/index.tsx
import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { getFieldMetadata } from '@/services/metadata';
import { DynamicField } from './DynamicField';

interface DynamicFormProps {
  industryType: string;
  entityType: string;
  initialValues?: Record<string, any>;
  onSubmit: (values: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  industryType,
  entityType,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);

  useEffect(() => {
    loadFields();
  }, [industryType, entityType]);

  const loadFields = async () => {
    const metadata = await getFieldMetadata(industryType, entityType);
    setFields(metadata);
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onSubmit}
      layout="vertical"
    >
      {fields.map(field => (
        <DynamicField key={field.fieldName} metadata={field} />
      ))}
    </Form>
  );
};
```

**时间**: 3天

---

## 📊 Week 1 里程碑

### 期望成果

- [ ] 数据库改造脚本完成
- [ ] 后端 Entity 支持 JSON 字段
- [ ] 基础配置文件创建
- [ ] MetadataService 核心功能完成
- [ ] DynamicForm 组件原型完成

### 验收标准

1. **数据库**
   - 测试环境完成表结构改造
   - 数据迁移脚本测试通过
   - 回滚脚本可用

2. **后端**
   - Document Entity 可以读写 businessData
   - 配置文件可以被正确加载
   - MetadataService 单元测试通过

3. **前端**
   - DynamicForm 可以渲染至少 3 种字段类型
   - 表单提交和验证基本可用

---

## 🎯 下周计划 (Week 2)

1. **后端**
   - DynamicFormService 实现
   - 数据验证引擎
   - API 接口开发

2. **前端**
   - 完善所有字段类型组件
   - 集成后端 API
   - 页面联调

3. **测试**
   - 端到端测试
   - 性能测试

---

## 📞 协作机制

### Daily Standup (每日站会)

- **时间**: 每天上午 10:00
- **时长**: 15分钟
- **内容**:
  - 昨天完成了什么
  - 今天计划做什么
  - 有什么阻碍

### Code Review

- 所有代码必须经过 Review
- 使用 Pull Request 流程
- 至少 1 人 Approve 才能合并

### 技术决策

- 重大技术决策需要团队讨论
- 记录在 `docs/decisions/` 目录

---

## ✅ 准备清单

### 开发环境

- [ ] 本地数据库（MySQL 8.0+）
- [ ] Java 11+ / Spring Boot 2.x
- [ ] Node.js 16+ / React 18
- [ ] IDE (IntelliJ IDEA / VS Code)

### 测试环境

- [ ] 测试数据库已准备
- [ ] 测试数据已导入
- [ ] CI/CD 流水线配置

### 文档

- [ ] PRODUCT_TRANSFORMATION_PLAN.md（已完成）
- [ ] 数据库设计文档（本周完成）
- [ ] API 接口文档（下周完成）

---

## 🚀 Let's Go!

**准备好了吗？开始冲刺！**

有任何问题随时沟通。记住：

1. **小步快跑** - 每天都要有可见成果
2. **频繁集成** - 不要等到最后才合并代码
3. **及时沟通** - 遇到问题立即讨论

**Good luck! 🎉**

---

**文档版本**: v1.0
**创建日期**: 2025-01-14
**更新**: 每日更新进度
