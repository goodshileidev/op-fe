# 产品化改造方案（最终版）

> **目标**: 将港口航运专用系统改造为可快速适配多行业的基础产品

**关键词**: 字段动态化 | 配置驱动 | Connector架构 | 产品化

---

## 📋 核心理念

### 产品化三原则

1. **字段动态化** - 业务字段不在代码和数据库表中硬编码
2. **配置驱动** - 通过配置文件定义字段元数据和业务逻辑
3. **灵活集成** - Connector 架构支持多种外部系统对接

### 目标客户模型

```
基础产品（Core Product）
    ↓ 快速配置（1-3天）
行业版本（医疗/工业/教育...）
    ↓ 定制开发（按需）
客户专用版（Customer Edition）
    ↓ 裁剪优化
最终交付版本
```

---

## 🏗️ 架构设计

### 1. 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    配置层 (Configuration)                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │ application-{industry}.yml                        │   │
│  │ - 字段定义 (name, type, label, validation...)    │   │
│  │ - UI配置 (layout, theme, components...)          │   │
│  │ - 业务规则 (workflow, permissions, triggers...)  │   │
│  │ - Connector配置 (endpoints, mappings...)         │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓ 加载
┌─────────────────────────────────────────────────────────┐
│                    应用层 (Application)                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ MetadataService (元数据服务)                      │   │
│  │ - 字段定义加载和缓存                              │   │
│  │ - 验证规则编译                                    │   │
│  │ - 权限规则解析                                    │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ DynamicFormService (动态表单服务)                 │   │
│  │ - 动态表单渲染                                    │   │
│  │ - 数据验证和转换                                  │   │
│  │ - 业务规则执行                                    │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ConnectorService (集成服务)                       │   │
│  │ - 外部系统数据拉取                                │   │
│  │ - 数据推送和同步                                  │   │
│  │ - 映射和转换                                      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          ↓ 存储
┌─────────────────────────────────────────────────────────┐
│                    数据层 (Data Layer)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │ documents 表 (通用字段)                           │   │
│  │ - document_id, document_no, template_id...        │   │
│  │ - business_data JSON  ← 所有业务字段              │   │
│  │ - metadata JSON       ← 元数据                   │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ forms 表 (通用字段)                               │   │
│  │ - form_id, document_id, template_version_id...    │   │
│  │ - form_data JSON      ← 所有表单数据              │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ field_metadata 表 (字段元数据缓存)                │   │
│  │ - field_name, field_type, industry, config...     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 数据库改造方案

### 改造策略

**原则**: 保留通用字段，删除业务字段，使用 JSON 存储

### 1. Document 表改造

#### 改造前（当前）
```sql
CREATE TABLE documents (
  document_id VARCHAR(64) PRIMARY KEY,
  document_no VARCHAR(100),
  document_uuid VARCHAR(64),
  template_id BIGINT,
  template_version_id BIGINT,

  -- ❌ 港务特定字段 - 需要删除
  ship_name VARCHAR(200),
  cargo_name VARCHAR(200),
  berthing_time DATETIME,
  departure_time DATETIME,
  domestic_foreign_trade_type VARCHAR(10),
  ship_type VARCHAR(50),

  -- ✅ 通用字段 - 保留
  data_date VARCHAR(20),
  current_step VARCHAR(50),
  fillin_status VARCHAR(20),
  recipient_list TEXT,
  viewer_list TEXT,
  editor_list TEXT,

  -- 其他通用字段...
  created_at DATETIME,
  updated_at DATETIME
);
```

#### 改造后
```sql
CREATE TABLE documents (
  document_id VARCHAR(64) PRIMARY KEY,
  document_no VARCHAR(100),
  document_uuid VARCHAR(64),
  template_id BIGINT,
  template_version_id BIGINT,

  -- ✅ 新增：业务数据（JSON）
  business_data JSON NOT NULL DEFAULT '{}' COMMENT '业务字段数据',

  -- ✅ 新增：元数据（JSON）
  metadata JSON COMMENT '扩展元数据',

  -- ✅ 通用字段保留
  data_date VARCHAR(20),
  current_step VARCHAR(50),
  fillin_status VARCHAR(20),
  recipient_list TEXT,
  viewer_list TEXT,
  editor_list TEXT,

  -- 新增：行业标识
  industry_type VARCHAR(50) COMMENT '行业类型：shipping/medical/inspection',

  -- 通用时间戳
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- 索引
  INDEX idx_industry_type (industry_type),
  INDEX idx_template (template_id, template_version_id),
  INDEX idx_data_date (data_date)
);
```

**business_data 示例**:
```json
{
  "shipName": "XX号船",
  "cargoName": "煤炭",
  "berthingTime": "2025-01-14 08:00:00",
  "departureTime": "2025-01-15 18:00:00",
  "domesticForeignTradeType": "1",
  "shipType": "散货船"
}
```

### 2. Form 表改造

#### 改造后
```sql
CREATE TABLE forms (
  form_id VARCHAR(64) PRIMARY KEY,
  document_id VARCHAR(64) NOT NULL,
  form_template_id BIGINT,
  form_template_version_id BIGINT,
  form_order INT,

  -- ✅ 新增：表单数据（JSON）
  form_data JSON NOT NULL DEFAULT '{}' COMMENT '表单字段数据',

  -- ✅ 通用字段
  form_status VARCHAR(20),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (document_id) REFERENCES documents(document_id),
  INDEX idx_document (document_id)
);
```

**form_data 示例**:
```json
{
  "patientName": "张三",
  "age": 45,
  "gender": "male",
  "diagnosis": "高血压",
  "treatment": "降压药物治疗"
}
```

### 3. 新增：字段元数据表

```sql
CREATE TABLE field_metadata (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  -- 字段标识
  field_name VARCHAR(100) NOT NULL COMMENT '字段名称',
  field_path VARCHAR(200) NOT NULL COMMENT '字段路径：document.business_data.shipName',

  -- 行业分类
  industry_type VARCHAR(50) NOT NULL COMMENT '所属行业',
  entity_type VARCHAR(50) NOT NULL COMMENT '实体类型：document/form',

  -- 字段属性
  label VARCHAR(100) COMMENT '显示标签',
  field_type VARCHAR(50) COMMENT 'string/number/date/boolean/object/array',
  data_type VARCHAR(50) COMMENT 'varchar/int/datetime/json',

  -- 验证和约束
  required BOOLEAN DEFAULT FALSE,
  validation_rules JSON COMMENT '验证规则配置',

  -- UI配置
  ui_config JSON COMMENT 'UI组件配置',

  -- 默认值
  default_value TEXT,

  -- 排序和分组
  display_order INT DEFAULT 0,
  group_name VARCHAR(100),

  -- 启用状态
  is_active BOOLEAN DEFAULT TRUE,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_field_path (industry_type, entity_type, field_path),
  INDEX idx_industry (industry_type),
  INDEX idx_entity (entity_type)
);
```

---

## ⚙️ 配置驱动架构

### Spring Boot 配置文件结构

```
src/main/resources/
├── application.yml                      # 主配置
├── application-shipping.yml             # 港口航运配置
├── application-medical.yml              # 医疗配置
├── application-inspection.yml           # 工业巡检配置
└── industries/                          # 行业配置目录
    ├── shipping/
    │   ├── fields.yml                   # 字段定义
    │   ├── workflows.yml                # 工作流配置
    │   ├── permissions.yml              # 权限配置
    │   └── connectors.yml               # 集成配置
    ├── medical/
    │   ├── fields.yml
    │   ├── workflows.yml
    │   └── ...
    └── inspection/
        └── ...
```

### 字段配置示例 (application-shipping.yml)

```yaml
industry:
  type: shipping
  name: 港口航运
  description: 港口船舶作业管理

  # 字段定义
  fields:
    document:
      # 船名
      - name: shipName
        label: 船名
        type: string
        dataType: varchar
        length: 200
        required: true
        validation:
          - type: notEmpty
            message: 船名不能为空
          - type: maxLength
            value: 200
            message: 船名不能超过200字符
        ui:
          component: Input
          placeholder: 请输入船名
          width: 300
        searchable: true
        sortable: true
        showInList: true
        displayOrder: 1

      # 货名
      - name: cargoName
        label: 货名
        type: string
        dataType: varchar
        length: 200
        required: true
        ui:
          component: Input
          placeholder: 请输入货名
        showInList: true
        displayOrder: 2

      # 靠泊时间
      - name: berthingTime
        label: 靠泊时间
        type: datetime
        dataType: datetime
        required: true
        validation:
          - type: notNull
            message: 靠泊时间不能为空
          - type: futureOrPresent
            message: 靠泊时间不能早于当前时间
        ui:
          component: DateTimePicker
          format: YYYY-MM-DD HH:mm:ss
        searchable: true
        showInList: true
        displayOrder: 3

      # 离港时间
      - name: departureTime
        label: 离港时间
        type: datetime
        dataType: datetime
        validation:
          - type: custom
            expression: "departureTime > berthingTime"
            message: 离港时间必须晚于靠泊时间
        ui:
          component: DateTimePicker
        displayOrder: 4

      # 内外贸类型
      - name: domesticForeignTradeType
        label: 内外贸类型
        type: enum
        dataType: varchar
        required: true
        options:
          - value: "1"
            label: 国内贸易
          - value: "2"
            label: 国际贸易
        defaultValue: "1"
        ui:
          component: Select
        showInList: true
        displayOrder: 5

      # 船舶类型
      - name: shipType
        label: 船舶类型
        type: enum
        dataType: varchar
        options:
          - value: bulk_carrier
            label: 散货船
          - value: container
            label: 集装箱船
          - value: tanker
            label: 油轮
          - value: ro_ro
            label: 滚装船
        ui:
          component: Select
          allowClear: true
        searchable: true
        displayOrder: 6

    # Form 级别字段定义
    form:
      cargo_info:
        - name: cargoQuantity
          label: 货物数量
          type: number
          dataType: decimal
          precision: 10
          scale: 2
          required: true
          validation:
            - type: min
              value: 0
              message: 货物数量不能为负数
          ui:
            component: InputNumber
            min: 0
            step: 0.01
            unit: 吨

  # 列表页配置
  listView:
    columns:
      - field: documentNo
        label: 作业单号
        width: 150
        fixed: left
      - field: shipName
        label: 船名
        width: 200
      - field: cargoName
        label: 货名
        width: 150
      - field: berthingTime
        label: 靠泊时间
        width: 180
        format: YYYY-MM-DD HH:mm
      - field: domesticForeignTradeType
        label: 内外贸
        width: 100
      - field: fillinStatus
        label: 状态
        width: 100

    searchFields:
      - documentNo
      - shipName
      - cargoName
      - berthingTime

    defaultSort:
      field: berthingTime
      order: desc

  # 术语配置
  terminology:
    document: 作业文档
    form: 作业表单
    create: 创建作业
    edit: 编辑作业
    submit: 提交作业

  # UI主题
  theme:
    primaryColor: "#fa8c16"
    icon: ShipOutlined
```

### 医疗行业配置示例 (application-medical.yml)

```yaml
industry:
  type: medical
  name: 医疗调研
  description: 医疗机构患者病历管理

  fields:
    document:
      - name: patientId
        label: 患者ID
        type: string
        required: true
        validation:
          - type: pattern
            value: "^[A-Z0-9]{8}$"
            message: 患者ID必须是8位大写字母或数字
        ui:
          component: Input
          maxLength: 8
        searchable: true
        showInList: true

      - name: patientName
        label: 患者姓名
        type: string
        required: true
        ui:
          component: Input
        searchable: true
        showInList: true

      - name: visitDate
        label: 就诊日期
        type: date
        required: true
        ui:
          component: DatePicker
        searchable: true
        showInList: true

      - name: department
        label: 就诊科室
        type: enum
        options:
          - value: internal
            label: 内科
          - value: surgery
            label: 外科
          - value: pediatrics
            label: 儿科
        ui:
          component: Select

  terminology:
    document: 病历
    form: 诊疗表单
    create: 创建病历
```

---

## 🔌 Connector 架构

### Connector 接口定义

```java
package com.company.uniform.connector;

/**
 * 数据连接器接口
 */
public interface DataConnector {

    /**
     * 连接器类型
     */
    String getType();

    /**
     * 连接器名称
     */
    String getName();

    /**
     * 拉取数据
     * @param request 请求参数
     * @return 数据列表
     */
    List<Map<String, Object>> pull(ConnectorRequest request);

    /**
     * 推送数据
     * @param data 数据
     * @param request 请求参数
     */
    void push(List<Map<String, Object>> data, ConnectorRequest request);

    /**
     * 测试连接
     */
    boolean testConnection();

    /**
     * 字段映射
     */
    Map<String, Object> mapFields(Map<String, Object> sourceData, FieldMapping mapping);
}

/**
 * 连接器请求
 */
@Data
public class ConnectorRequest {
    private String connectorId;
    private Map<String, Object> params;
    private FieldMapping fieldMapping;
    private FilterCriteria filter;
    private Integer pageSize;
    private Integer pageNum;
}

/**
 * 字段映射配置
 */
@Data
public class FieldMapping {
    private Map<String, String> fieldMap;  // 源字段 -> 目标字段
    private Map<String, String> transforms; // 字段转换规则
}
```

### HTTP Connector 实现

```java
@Component
public class HttpConnector implements DataConnector {

    @Override
    public String getType() {
        return "HTTP";
    }

    @Override
    public List<Map<String, Object>> pull(ConnectorRequest request) {
        HttpConnectorConfig config = getConfig(request.getConnectorId());

        // 构建 HTTP 请求
        HttpRequest httpRequest = buildHttpRequest(config, request);

        // 发送请求
        HttpResponse response = httpClient.send(httpRequest);

        // 解析响应
        List<Map<String, Object>> data = parseResponse(response, config);

        // 字段映射
        return data.stream()
            .map(item -> mapFields(item, request.getFieldMapping()))
            .collect(Collectors.toList());
    }

    @Override
    public void push(List<Map<String, Object>> data, ConnectorRequest request) {
        HttpConnectorConfig config = getConfig(request.getConnectorId());

        // 字段映射
        List<Map<String, Object>> mappedData = data.stream()
            .map(item -> mapFields(item, request.getFieldMapping()))
            .collect(Collectors.toList());

        // 构建请求体
        String requestBody = buildRequestBody(mappedData, config);

        // 发送 POST 请求
        httpClient.post(config.getEndpoint(), requestBody);
    }
}
```

### Database Connector 实现

```java
@Component
public class DatabaseConnector implements DataConnector {

    @Autowired
    private DataSourceManager dataSourceManager;

    @Override
    public List<Map<String, Object>> pull(ConnectorRequest request) {
        DbConnectorConfig config = getConfig(request.getConnectorId());

        // 获取数据源
        DataSource dataSource = dataSourceManager.getDataSource(config);

        // 构建 SQL
        String sql = buildQuery(config, request);

        // 执行查询
        try (Connection conn = dataSource.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            ResultSet rs = stmt.executeQuery();
            List<Map<String, Object>> data = resultSetToList(rs);

            // 字段映射
            return data.stream()
                .map(item -> mapFields(item, request.getFieldMapping()))
                .collect(Collectors.toList());
        }
    }
}
```

### Connector 配置示例

```yaml
connectors:
  # HTTP API 连接器
  - id: erp_system
    type: HTTP
    name: ERP系统
    enabled: true
    config:
      endpoint: https://erp.example.com/api/v1/shipments
      method: GET
      authentication:
        type: Bearer
        token: ${ERP_API_TOKEN}
      headers:
        Content-Type: application/json
      responseFormat: json
      dataPath: data.items
    fieldMapping:
      sourceFields:
        vessel_name: shipName
        cargo_type: cargoName
        etd: departureTime
      transforms:
        etd: "parseDateTime('yyyy-MM-dd HH:mm:ss')"

  # 数据库连接器
  - id: legacy_db
    type: DATABASE
    name: 旧系统数据库
    enabled: true
    config:
      driver: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://legacy-db:3306/shipping
      username: ${LEGACY_DB_USER}
      password: ${LEGACY_DB_PASSWORD}
      table: ship_operations
      primaryKey: operation_id
    fieldMapping:
      sourceFields:
        ship_name_cn: shipName
        cargo_name_cn: cargoName
        berthing_datetime: berthingTime

  # 消息队列连接器
  - id: kafka_events
    type: KAFKA
    name: Kafka事件流
    enabled: true
    config:
      bootstrapServers: kafka:9092
      topic: shipping.events
      consumerGroup: uniform-fe
      keyDeserializer: org.apache.kafka.common.serialization.StringDeserializer
      valueDeserializer: org.apache.kafka.common.serialization.JsonDeserializer
```

---

## 💻 后端实现

### 1. MetadataService (元数据服务)

```java
@Service
public class MetadataService {

    @Autowired
    private FieldMetadataRepository fieldMetadataRepository;

    private final Map<String, List<FieldMetadata>> cache = new ConcurrentHashMap<>();

    /**
     * 获取行业字段定义
     */
    public List<FieldMetadata> getFieldMetadata(String industryType, String entityType) {
        String cacheKey = industryType + ":" + entityType;

        return cache.computeIfAbsent(cacheKey, key -> {
            return fieldMetadataRepository.findByIndustryAndEntity(industryType, entityType);
        });
    }

    /**
     * 从配置文件加载字段元数据
     */
    @PostConstruct
    public void loadMetadataFromConfig() {
        IndustryConfig config = loadIndustryConfig();

        for (FieldConfig fieldConfig : config.getFields().getDocument()) {
            FieldMetadata metadata = FieldMetadata.builder()
                .fieldName(fieldConfig.getName())
                .fieldPath("business_data." + fieldConfig.getName())
                .industryType(config.getType())
                .entityType("document")
                .label(fieldConfig.getLabel())
                .fieldType(fieldConfig.getType())
                .dataType(fieldConfig.getDataType())
                .required(fieldConfig.getRequired())
                .validationRules(toJson(fieldConfig.getValidation()))
                .uiConfig(toJson(fieldConfig.getUi()))
                .defaultValue(fieldConfig.getDefaultValue())
                .build();

            fieldMetadataRepository.save(metadata);
        }
    }
}
```

### 2. DynamicFormService (动态表单服务)

```java
@Service
public class DynamicFormService {

    @Autowired
    private MetadataService metadataService;

    @Autowired
    private DocumentRepository documentRepository;

    /**
     * 获取表单配置
     */
    public FormConfig getFormConfig(String industryType, String templateId) {
        List<FieldMetadata> fields = metadataService.getFieldMetadata(industryType, "document");

        return FormConfig.builder()
            .fields(fields.stream()
                .map(this::toFormField)
                .collect(Collectors.toList()))
            .build();
    }

    /**
     * 保存表单数据
     */
    public void saveFormData(String documentId, Map<String, Object> formData, String industryType) {
        Document document = documentRepository.findById(documentId)
            .orElseThrow(() -> new NotFoundException("Document not found"));

        // 验证数据
        validateData(formData, industryType);

        // 合并到 business_data
        Map<String, Object> businessData = document.getBusinessData();
        if (businessData == null) {
            businessData = new HashMap<>();
        }
        businessData.putAll(formData);

        document.setBusinessData(businessData);
        documentRepository.save(document);
    }

    /**
     * 验证数据
     */
    private void validateData(Map<String, Object> data, String industryType) {
        List<FieldMetadata> fields = metadataService.getFieldMetadata(industryType, "document");

        for (FieldMetadata field : fields) {
            Object value = data.get(field.getFieldName());

            // 必填验证
            if (field.getRequired() && (value == null || value.toString().isEmpty())) {
                throw new ValidationException(field.getLabel() + "不能为空");
            }

            // 类型验证
            validateType(value, field);

            // 自定义验证规则
            validateRules(value, field);
        }
    }
}
```

### 3. Document Entity (使用 JSON)

```java
@Entity
@Table(name = "documents")
@Data
public class Document {

    @Id
    @Column(name = "document_id", length = 64)
    private String documentId;

    @Column(name = "document_no", length = 100)
    private String documentNo;

    @Column(name = "template_id")
    private Long templateId;

    @Column(name = "template_version_id")
    private Long templateVersionId;

    // ✅ 业务数据（JSON）
    @Type(type = "json")
    @Column(name = "business_data", columnDefinition = "json")
    private Map<String, Object> businessData = new HashMap<>();

    // ✅ 元数据（JSON）
    @Type(type = "json")
    @Column(name = "metadata", columnDefinition = "json")
    private Map<String, Object> metadata;

    // 行业类型
    @Column(name = "industry_type", length = 50)
    private String industryType;

    // 通用字段
    @Column(name = "data_date", length = 20)
    private String dataDate;

    @Column(name = "current_step", length = 50)
    private String currentStep;

    @Column(name = "fillin_status", length = 20)
    private String fillinStatus;

    // 时间戳
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /**
     * 获取业务字段值
     */
    public <T> T getBusinessField(String fieldName, Class<T> type) {
        Object value = businessData.get(fieldName);
        if (value == null) return null;
        return type.cast(value);
    }

    /**
     * 设置业务字段值
     */
    public void setBusinessField(String fieldName, Object value) {
        if (businessData == null) {
            businessData = new HashMap<>();
        }
        businessData.put(fieldName, value);
    }
}
```

---

## 🎨 前端实现

### 1. 动态表单渲染器

```typescript
// src/components/DynamicForm/index.tsx

import React, { useEffect, useState } from 'react';
import { Form, Spin } from 'antd';
import { DynamicFormService } from '@/services/DynamicFormService';
import { DynamicField } from './DynamicField';

interface DynamicFormProps {
  industryType: string;
  documentId?: string;
  onSubmit: (values: any) => void;
}

export const DynamicForm: React.FC<DynamicFormProps> = ({
  industryType,
  documentId,
  onSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<FieldMetadata[]>([]);

  useEffect(() => {
    loadFormConfig();
  }, [industryType]);

  const loadFormConfig = async () => {
    setLoading(true);
    try {
      const config = await DynamicFormService.getFormConfig(industryType);
      setFields(config.fields);

      if (documentId) {
        const data = await DynamicFormService.getFormData(documentId);
        form.setFieldsValue(data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      {fields.map(field => (
        <DynamicField
          key={field.fieldName}
          metadata={field}
        />
      ))}
    </Form>
  );
};
```

### 2. 动态字段组件

```typescript
// src/components/DynamicForm/DynamicField.tsx

import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select } from 'antd';
import type { FieldMetadata } from '@/types';

interface DynamicFieldProps {
  metadata: FieldMetadata;
}

export const DynamicField: React.FC<DynamicFieldProps> = ({ metadata }) => {
  // 根据字段类型渲染不同组件
  const renderInput = () => {
    const { uiConfig, fieldType } = metadata;

    switch (uiConfig.component) {
      case 'Input':
        return <Input {...uiConfig} />;

      case 'InputNumber':
        return <InputNumber {...uiConfig} />;

      case 'DatePicker':
        return <DatePicker {...uiConfig} />;

      case 'DateTimePicker':
        return <DatePicker showTime {...uiConfig} />;

      case 'Select':
        return (
          <Select {...uiConfig}>
            {metadata.options?.map(opt => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );

      default:
        return <Input />;
    }
  };

  // 构建验证规则
  const rules = metadata.validationRules?.map(rule => ({
    ...rule,
    message: rule.message || `${metadata.label}验证失败`,
  })) || [];

  if (metadata.required) {
    rules.unshift({
      required: true,
      message: `${metadata.label}不能为空`,
    });
  }

  return (
    <Form.Item
      name={metadata.fieldName}
      label={metadata.label}
      rules={rules}
      tooltip={metadata.uiConfig.helpText}
    >
      {renderInput()}
    </Form.Item>
  );
};
```

---

## 🚀 实施计划

### 阶段 0: 准备和设计 (2周)

#### Week 1: 需求确认和设计细化
- [ ] 梳理港务系统所有业务字段
- [ ] 设计完整的字段元数据模型
- [ ] 设计 Connector 接口规范
- [ ] 确定第一个对接的外部系统

#### Week 2: 数据库设计和评审
- [ ] 设计数据库改造脚本
- [ ] 设计数据迁移方案
- [ ] 技术方案评审
- [ ] 确定实施策略

### 阶段 1: 核心框架开发 (4周)

#### Week 3-4: 后端核心服务
- [ ] MetadataService 实现
- [ ] DynamicFormService 实现
- [ ] Document/Form Entity 改造
- [ ] 字段验证引擎
- [ ] 单元测试

#### Week 5-6: 前端动态渲染
- [ ] DynamicForm 组件
- [ ] DynamicField 组件
- [ ] 字段类型组件库
- [ ] 表单验证集成

### 阶段 2: Connector 架构 (3周)

#### Week 7-8: Connector 基础框架
- [ ] Connector 接口定义
- [ ] HttpConnector 实现
- [ ] DatabaseConnector 实现
- [ ] ConnectorService 实现

#### Week 9: 第一个集成
- [ ] 选择一个外部系统（如ERP）
- [ ] 配置 Connector
- [ ] 实现字段映射
- [ ] 集成测试

### 阶段 3: 港务场景迁移 (4周)

#### Week 10-11: 数据库迁移
- [ ] 执行表结构改造
- [ ] 数据迁移脚本开发
- [ ] 数据迁移执行
- [ ] 数据验证

#### Week 12-13: 配置和测试
- [ ] 编写 application-shipping.yml
- [ ] 港务字段元数据配置
- [ ] 功能测试
- [ ] 性能测试

### 阶段 4: 第二个行业验证 (4周)

#### Week 14-15: 医疗场景开发
- [ ] 医疗行业需求调研
- [ ] 编写 application-medical.yml
- [ ] 医疗字段元数据配置
- [ ] 页面开发

#### Week 16-17: 测试和优化
- [ ] 功能测试
- [ ] 用户验收测试
- [ ] 性能优化
- [ ] Bug修复

### 阶段 5: 产品化完善 (2周)

#### Week 18-19: 工具和文档
- [ ] 字段配置生成工具
- [ ] 数据迁移工具
- [ ] Connector 配置工具
- [ ] 开发者文档
- [ ] 运维文档

---

## ✅ 成功标准

### 技术指标

- [ ] 新增行业配置时间 < 3天
- [ ] 字段动态渲染性能损耗 < 15%
- [ ] Connector 吞吐量 > 1000条/秒
- [ ] 数据迁移成功率 100%
- [ ] 单元测试覆盖率 > 80%

### 业务指标

- [ ] 支持 3+ 个行业
- [ ] 可对接 2+ 个外部系统
- [ ] 配置复杂度降低 70%
- [ ] 新客户交付周期 < 2周

---

## 📝 下一步行动

### 立即开始

1. **创建技术任务** ✅
   - 数据库改造任务
   - 后端开发任务
   - 前端开发任务
   - Connector 开发任务

2. **组建团队**
   - 后端开发: 2人
   - 前端开发: 2人
   - DBA: 1人
   - 测试: 1人

3. **Week 1 冲刺**
   - [ ] 完整梳理所有港务字段
   - [ ] 设计字段元数据表结构
   - [ ] 设计数据迁移方案
   - [ ] 搭建开发环境

---

**文档版本**: v1.0
**创建日期**: 2025-01-14
**状态**: 准备实施

**让我们开干！** 🚀
