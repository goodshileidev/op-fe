# 表单模板系统重构方案

## 一、重构目标

1. 支持动态字段类型定义
2. 实现字段验证规则引擎
3. 支持条件显示和字段依赖
4. 提供可复用的字段组件库
5. 支持模板版本控制和继承

## 二、核心架构设计

### 1. 模板引擎架构

```
FormTemplateEngine
├── FieldRegistry (字段注册器)
├── ValidationEngine (验证引擎)
├── ConditionEngine (条件引擎)
├── LayoutEngine (布局引擎)
└── RenderEngine (渲染引擎)
```

### 2. 字段类型系统

#### 基础字段类型
```typescript
// 字段类型基类
abstract class BaseFieldType {
  abstract type: string;
  abstract component: React.ComponentType<FieldProps>;
  abstract validate(value: any, rules: ValidationRule[]): ValidationResult;
  abstract serialize(value: any): any;
  abstract deserialize(value: any): any;
}

// 文本字段
class TextField extends BaseFieldType {
  type = 'text';
  component = TextInput;

  validate(value: any, rules: ValidationRule[]) {
    // 实现文本验证逻辑
  }
}

// 数字字段
class NumberField extends BaseFieldType {
  type = 'number';
  component = NumberInput;

  validate(value: any, rules: ValidationRule[]) {
    // 实现数字验证逻辑
  }
}

// 选择字段
class SelectField extends BaseFieldType {
  type = 'select';
  component = SelectInput;

  validate(value: any, rules: ValidationRule[]) {
    // 实现选择验证逻辑
  }
}

// 日期字段
class DateField extends BaseFieldType {
  type = 'date';
  component = DatePicker;

  validate(value: any, rules: ValidationRule[]) {
    // 实现日期验证逻辑
  }
}

// 文件上传字段
class FileField extends BaseFieldType {
  type = 'file';
  component = FileUpload;

  validate(value: any, rules: ValidationRule[]) {
    // 实现文件验证逻辑
  }
}

// 签名字段
class SignatureField extends BaseFieldType {
  type = 'signature';
  component = SignaturePad;

  validate(value: any, rules: ValidationRule[]) {
    // 实现签名验证逻辑
  }
}

// 表格字段
class TableField extends BaseFieldType {
  type = 'table';
  component = DataTable;

  validate(value: any, rules: ValidationRule[]) {
    // 实现表格验证逻辑
  }
}

// 自定义字段
class CustomField extends BaseFieldType {
  type = 'custom';
  component: React.ComponentType<FieldProps>;

  constructor(component: React.ComponentType<FieldProps>) {
    super();
    this.component = component;
  }
}
```

### 3. 字段注册器

```typescript
class FieldRegistry {
  private fields: Map<string, BaseFieldType> = new Map();

  register(fieldType: BaseFieldType) {
    this.fields.set(fieldType.type, fieldType);
  }

  get(type: string): BaseFieldType | undefined {
    return this.fields.get(type);
  }

  getAll(): BaseFieldType[] {
    return Array.from(this.fields.values());
  }
}

// 全局字段注册器实例
export const fieldRegistry = new FieldRegistry();

// 注册默认字段类型
fieldRegistry.register(new TextField());
fieldRegistry.register(new NumberField());
fieldRegistry.register(new SelectField());
fieldRegistry.register(new DateField());
fieldRegistry.register(new FileField());
fieldRegistry.register(new SignatureField());
fieldRegistry.register(new TableField());
```

### 4. 验证规则引擎

```typescript
// 验证规则类型
interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message?: string;
  validator?: (value: any) => boolean | Promise<boolean>;
}

// 验证结果
interface ValidationResult {
  valid: boolean;
  errors?: string[];
}

// 验证引擎
class ValidationEngine {
  async validateField(
    value: any,
    rules: ValidationRule[],
    fieldType: BaseFieldType
  ): Promise<ValidationResult> {
    const errors: string[] = [];

    for (const rule of rules) {
      switch (rule.type) {
        case 'required':
          if (!value || (Array.isArray(value) && value.length === 0)) {
            errors.push(rule.message || '此字段为必填项');
          }
          break;

        case 'min':
          if (typeof value === 'number' && value < rule.value) {
            errors.push(rule.message || `值不能小于${rule.value}`);
          }
          if (typeof value === 'string' && value.length < rule.value) {
            errors.push(rule.message || `长度不能少于${rule.value}个字符`);
          }
          break;

        case 'max':
          if (typeof value === 'number' && value > rule.value) {
            errors.push(rule.message || `值不能大于${rule.value}`);
          }
          if (typeof value === 'string' && value.length > rule.value) {
            errors.push(rule.message || `长度不能超过${rule.value}个字符`);
          }
          break;

        case 'pattern':
          if (value && !new RegExp(rule.value).test(value)) {
            errors.push(rule.message || '格式不正确');
          }
          break;

        case 'custom':
          if (rule.validator && !(await rule.validator(value))) {
            errors.push(rule.message || '验证失败');
          }
          break;
      }
    }

    // 执行字段类型的内置验证
    const fieldResult = fieldType.validate(value, rules);
    if (!fieldResult.valid) {
      errors.push(...(fieldResult.errors || []));
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined
    };
  }

  async validateForm(
    data: Record<string, any>,
    fields: FormFieldDefinition[]
  ): Promise<Record<string, ValidationResult>> {
    const results: Record<string, ValidationResult> = {};

    for (const field of fields) {
      const fieldType = fieldRegistry.get(field.type);
      if (!fieldType) continue;

      const value = data[field.name];
      results[field.name] = await this.validateField(
        value,
        field.validation || [],
        fieldType
      );
    }

    return results;
  }
}
```

### 5. 条件引擎

```typescript
// 条件表达式
interface ConditionExpression {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'not_in' | 'contains';
  value: any;
  logicalOperator?: 'and' | 'or';
}

// 条件引擎
class ConditionEngine {
  evaluate(
    condition: ConditionExpression | ConditionExpression[],
    formData: Record<string, any>
  ): boolean {
    if (Array.isArray(condition)) {
      return condition.reduce((result, expr, index) => {
        const currentResult = this.evaluateExpression(expr, formData);
        if (index === 0) return currentResult;

        return expr.logicalOperator === 'or'
          ? result || currentResult
          : result && currentResult;
      }, true);
    }

    return this.evaluateExpression(condition, formData);
  }

  private evaluateExpression(
    expression: ConditionExpression,
    formData: Record<string, any>
  ): boolean {
    const fieldValue = formData[expression.field];

    switch (expression.operator) {
      case 'eq':
        return fieldValue === expression.value;
      case 'ne':
        return fieldValue !== expression.value;
      case 'gt':
        return Number(fieldValue) > Number(expression.value);
      case 'lt':
        return Number(fieldValue) < Number(expression.value);
      case 'gte':
        return Number(fieldValue) >= Number(expression.value);
      case 'lte':
        return Number(fieldValue) <= Number(expression.value);
      case 'in':
        return Array.isArray(expression.value) &&
               expression.value.includes(fieldValue);
      case 'not_in':
        return Array.isArray(expression.value) &&
               !expression.value.includes(fieldValue);
      case 'contains':
        return String(fieldValue).includes(String(expression.value));
      default:
        return false;
    }
  }

  // 获取依赖于某个字段的所有字段
  getDependentFields(
    fieldName: string,
    fields: FormFieldDefinition[]
  ): FormFieldDefinition[] {
    return fields.filter(field =>
      field.dependencies && field.dependencies.includes(fieldName)
    );
  }
}
```

### 6. 动态表单渲染器

```typescript
interface FormRendererProps {
  template: FormTemplate;
  data?: Record<string, any>;
  onChange?: (field: string, value: any) => void;
  onValidate?: (results: Record<string, ValidationResult>) => void;
  readonly?: boolean;
}

const FormRenderer: React.FC<FormRendererProps> = ({
  template,
  data = {},
  onChange,
  onValidate,
  readonly = false
}) => {
  const [formData, setFormData] = useState(data);
  const [validationResults, setValidationResults] = useState<Record<string, ValidationResult>>({});
  const [visibleFields, setVisibleFields] = useState<Set<string>>(new Set());

  const validationEngine = useMemo(() => new ValidationEngine(), []);
  const conditionEngine = useMemo(() => new ConditionEngine(), []);

  // 计算字段可见性
  const updateFieldVisibility = useCallback(() => {
    const visible = new Set<string>();

    template.fields.forEach(field => {
      if (!field.conditional) {
        visible.add(field.name);
        return;
      }

      if (conditionEngine.evaluate(field.conditional, formData)) {
        visible.add(field.name);
      }
    });

    setVisibleFields(visible);
  }, [template.fields, formData]);

  // 验证表单
  const validateForm = useCallback(async () => {
    const results = await validationEngine.validateForm(formData, template.fields);
    setValidationResults(results);
    onValidate?.(results);
    return results;
  }, [formData, template.fields, validationEngine, onValidate]);

  // 更新字段值
  const updateField = useCallback(async (fieldName: string, value: any) => {
    const newData = { ...formData, [fieldName]: value };
    setFormData(newData);
    onChange?.(fieldName, value);

    // 延迟验证，避免频繁验证
    setTimeout(() => {
      validateForm();
      updateFieldVisibility();
    }, 300);
  }, [formData, onChange, validateForm]);

  // 初始化
  useEffect(() => {
    updateFieldVisibility();
    validateForm();
  }, []);

  return (
    <div className="dynamic-form">
      {template.fields.map(field => {
        if (!visibleFields.has(field.name)) return null;

        const fieldType = fieldRegistry.get(field.type);
        if (!fieldType) return null;

        const Component = fieldType.component;
        const error = validationResults[field.name]?.errors?.[0];

        return (
          <FormField
            key={field.id}
            field={field}
            error={error}
          >
            <Component
              value={formData[field.name]}
              onChange={(value) => updateField(field.name, value)}
              options={field.options}
              readonly={readonly}
              placeholder={field.placeholder}
            />
          </FormField>
        );
      })}
    </div>
  );
};
```

### 7. 表单构建器

```typescript
// 表单构建器组件
const FormBuilder: React.FC = () => {
  const [template, setTemplate] = useState<Partial<FormTemplate>>({
    fields: [],
    rules: []
  });
  const [selectedField, setSelectedField] = useState<FormFieldDefinition | null>(null);

  // 添加字段
  const addField = (fieldType: string) => {
    const type = fieldRegistry.get(fieldType);
    if (!type) return;

    const newField: FormFieldDefinition = {
      id: generateId(),
      name: `field_${Date.now()}`,
      label: '新字段',
      type: fieldType as FieldType,
      required: false
    };

    setTemplate(prev => ({
      ...prev,
      fields: [...(prev.fields || []), newField]
    }));
    setSelectedField(newField);
  };

  // 更新字段
  const updateField = (fieldId: string, updates: Partial<FormFieldDefinition>) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields?.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  // 删除字段
  const removeField = (fieldId: string) => {
    setTemplate(prev => ({
      ...prev,
      fields: prev.fields?.filter(field => field.id !== fieldId)
    }));
    if (selectedField?.id === fieldId) {
      setSelectedField(null);
    }
  };

  return (
    <div className="form-builder">
      {/* 字段类型面板 */}
      <FieldTypesPanel
        types={fieldRegistry.getAll()}
        onAddField={addField}
      />

      {/* 表单预览区 */}
      <FormPreview
        template={template as FormTemplate}
        onFieldSelect={setSelectedField}
      />

      {/* 字段属性面板 */}
      {selectedField && (
        <FieldPropertiesPanel
          field={selectedField}
          onChange={(updates) => updateField(selectedField.id, updates)}
          onRemove={() => removeField(selectedField.id)}
        />
      )}
    </div>
  );
};
```

## 三、模板配置示例

### 1. 医疗记录模板
```json
{
  "id": "medical-record-template",
  "name": "医疗记录模板",
  "scenario": "medical",
  "fields": [
    {
      "id": "patient-info",
      "name": "patientInfo",
      "label": "患者信息",
      "type": "section",
      "fields": [
        {
          "id": "patient-id",
          "name": "patientId",
          "label": "患者ID",
          "type": "text",
          "required": true,
          "validation": [
            { "type": "required", "message": "请输入患者ID" },
            { "type": "pattern", "value": "^[A-Z0-9]{8}$", "message": "患者ID格式不正确" }
          ]
        },
        {
          "id": "patient-name",
          "name": "patientName",
          "label": "患者姓名",
          "type": "text",
          "required": true
        },
        {
          "id": "birth-date",
          "name": "birthDate",
          "label": "出生日期",
          "type": "date",
          "required": true
        }
      ]
    },
    {
      "id": "diagnosis",
      "name": "diagnosis",
      "label": "诊断信息",
      "type": "textarea",
      "required": true,
      "conditional": {
        "field": "isFirstVisit",
        "operator": "eq",
        "value": true
      }
    },
    {
      "id": "treatment",
      "name": "treatment",
      "label": "治疗方案",
      "type": "table",
      "required": true,
      "columns": [
        { "name": "medicine", "label": "药品", "type": "select", "options": [] },
        { "name": "dosage", "label": "剂量", "type": "text" },
        { "name": "frequency", "label": "频次", "type": "select", "options": [] }
      ]
    },
    {
      "id": "doctor-signature",
      "name": "doctorSignature",
      "label": "医生签名",
      "type": "signature",
      "required": true
    }
  ]
}
```

### 2. 工厂巡检模板
```json
{
  "id": "inspection-template",
  "name": "工厂巡检模板",
  "scenario": "inspection",
  "fields": [
    {
      "id": "equipment-info",
      "name": "equipmentInfo",
      "label": "设备信息",
      "type": "section",
      "fields": [
        {
          "id": "equipment-id",
          "name": "equipmentId",
          "label": "设备编号",
          "type": "text",
          "required": true
        },
        {
          "id": "equipment-name",
          "name": "equipmentName",
          "label": "设备名称",
          "type": "text",
          "required": true
        },
        {
          "id": "location",
          "name": "location",
          "label": "设备位置",
          "type": "location",
          "required": true
        }
      ]
    },
    {
      "id": "inspection-items",
      "name": "inspectionItems",
      "label": "检查项目",
      "type": "table",
      "required": true,
      "columns": [
        { "name": "item", "label": "检查项", "type": "text", "required": true },
        { "name": "standard", "label": "标准", "type": "text" },
        { "name": "result", "label": "检查结果", "type": "select", "options": [
          { "label": "合格", "value": "pass" },
          { "label": "不合格", "value": "fail" },
          { "label": "需整改", "value": "need_fix" }
        ]},
        { "name": "photos", "label": "现场照片", "type": "file", "multiple": true }
      ]
    },
    {
      "id": "inspector-signature",
      "name": "inspectorSignature",
      "label": "巡检员签名",
      "type": "signature",
      "required": true
    }
  ]
}
```

## 四、实施步骤

1. **第一阶段**：实现字段类型系统和注册器
2. **第二阶段**：开发验证引擎和条件引擎
3. **第三阶段**：创建动态表单渲染器
4. **第四阶段**：开发表单构建器
5. **第五阶段**：迁移现有模板
6. **第六阶段**：测试和优化

## 五、技术优势

1. **高度灵活**：支持任意字段类型和验证规则
2. **可视化配置**：通过拖拽方式构建表单
3. **条件逻辑**：支持复杂的字段显示条件
4. **性能优化**：增量渲染和验证
5. **扩展性强**：易于添加新的字段类型