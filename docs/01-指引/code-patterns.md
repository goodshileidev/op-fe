# 代码模式和最佳实践

**文档编号**: GUIDE-001
**创建时间**: 2025-11-26 11:55
**最后修改**: 2025-11-26 11:55
**执行模型**: claude-sonnet-4-5 (claude-sonnet-4-5-20250929)
**文档状态**: 生效中

---

## 修改历史

| 日期 | 修改人/模型 | 修改概要 |
|------|------------|---------|
| 2025-11-26 11:55 | claude-sonnet-4-5 | 创建文档 |

---

## TypeScript 代码模式

### 1. 类型定义规范

```typescript
// ✅ 使用 interface 定义数据类型（遵循项目约定）
export interface DocumentType {
  documentId: string;
  templateName: string;
  currentStep: string;
  fillinStatus: string;
  // 流程控制
  stepDefinition: string;  // JSON string
  // 权限控制
  viewerList: string;      // 用户ID列表
  editorList: string;
}

// ✅ 请求参数类型
export interface DocumentQueryParams {
  pageNum: number;
  pageSize: number;
  templateName?: string;
  fillinStatus?: string;
}

// ✅ 响应数据类型
export interface DocumentResponse {
  code: number;
  message: string;
  data: {
    list: DocumentType[];
    total: number;
  };
}
```

### 2. 避免使用 any

```typescript
// ❌ 不推荐
const handleData = (data: any) => {
  // 类型不安全
};

// ✅ 推荐 - 使用具体类型
const handleData = (data: DocumentType | null) => {
  if (data) {
    console.log(data.templateName);
  }
};

// ✅ 推荐 - 使用泛型
function fetchData<T>(url: string): Promise<T> {
  return request({ url, method: 'GET' });
}

// ✅ 如果确实不知道类型，使用 unknown
const parseJSON = (json: string): unknown => {
  return JSON.parse(json);
};
```

### 3. 函数类型定义

```typescript
// ✅ 明确的函数类型
const fetchDocument = async (id: string): Promise<DocumentType> => {
  const response = await getDocumentById(id);
  return response.data;
};

// ✅ 回调函数类型
type OnSuccess<T> = (data: T) => void;
type OnError = (error: Error) => void;

const fetchWithCallback = <T>(
  url: string,
  onSuccess: OnSuccess<T>,
  onError: OnError
) => {
  // ...
};
```

---

## React 组件模式

### 1. 函数组件标准写法

```typescript
// ✅ 推荐的组件写法
import React from 'react';

interface DocumentCardProps {
  document: DocumentType;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();

  const handleEdit = () => {
    onEdit?.(document.documentId);
  };

  return (
    <Card>
      <Typography.Title level={4}>
        {document.templateName}
      </Typography.Title>
      <Space>
        <Button onClick={handleEdit}>
          {t('common.edit')}
        </Button>
        <Button danger onClick={() => onDelete?.(document.documentId)}>
          {t('common.delete')}
        </Button>
      </Space>
    </Card>
  );
};
```

### 2. 自定义 Hook

```typescript
// ✅ 自定义 Hook 模式
export const useDocumentData = (documentId: string) => {
  const [data, setData] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await DocumentService.fetchById(documentId);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (documentId) {
      fetchData();
    }
  }, [documentId]);

  return { data, loading, error };
};

// 使用
const DocumentPage = ({ id }: { id: string }) => {
  const { data, loading, error } = useDocumentData(id);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error.message} />;
  if (!data) return null;

  return <DocumentCard document={data} />;
};
```

### 3. 性能优化模式

```typescript
// ✅ 使用 React.memo 优化渲染
export const DocumentListItem = React.memo<DocumentListItemProps>(
  ({ document, onEdit }) => {
    return (
      <List.Item>
        <Typography.Text>{document.templateName}</Typography.Text>
        <Button onClick={() => onEdit(document.documentId)}>
          编辑
        </Button>
      </List.Item>
    );
  }
);

// ✅ 使用 useCallback 缓存回调
const DocumentList = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);

  const handleEdit = useCallback((id: string) => {
    // 编辑逻辑
  }, []);

  return (
    <List
      dataSource={documents}
      renderItem={(doc) => (
        <DocumentListItem document={doc} onEdit={handleEdit} />
      )}
    />
  );
};

// ✅ 使用 useMemo 缓存计算结果
const DocumentStats = ({ documents }: { documents: DocumentType[] }) => {
  const stats = useMemo(() => {
    return {
      total: documents.length,
      completed: documents.filter(d => d.fillinStatus === 'completed').length,
      pending: documents.filter(d => d.fillinStatus === 'pending').length,
    };
  }, [documents]);

  return <Statistic.Group items={stats} />;
};
```

---

## API 调用模式

### 1. 标准三层架构

```typescript
// === 层1: API 定义（src/common/api/form/document.ts）===
import request from '@/axios';

export const getDocumentById = (id: string) => {
  return request({
    url: `/api/form/document/${id}`,
    method: 'GET',
  });
};

export const getDocumentList = (params: DocumentQueryParams) => {
  return request({
    url: '/api/form/document/list',
    method: 'GET',
    params,
  });
};

export const createDocument = (data: Partial<DocumentType>) => {
  return request({
    url: '/api/form/document',
    method: 'POST',
    data,
  });
};

// === 层2: Service 封装（src/common/service/form/document.ts）===
import { getDocumentById, getDocumentList, createDocument } from '@/common/api/form/document';
import { DocumentType, DocumentQueryParams } from '@/common/data_type/form/document';

export class DocumentService {
  static async fetchById(id: string): Promise<DocumentType> {
    const response = await getDocumentById(id);
    return response.data;
  }

  static async fetchList(params: DocumentQueryParams) {
    const response = await getDocumentList(params);
    return {
      list: response.data.list,
      total: response.data.total,
    };
  }

  static async create(data: Partial<DocumentType>): Promise<DocumentType> {
    const response = await createDocument(data);
    return response.data;
  }
}

// === 层3: 页面使用 ===
import { DocumentService } from '@/common/service/form/document';

const DocumentPage = () => {
  const [document, setDocument] = useState<DocumentType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await DocumentService.fetchById(id);
      setDocument(data);
    };
    fetchData();
  }, [id]);

  return <DocumentCard document={document} />;
};
```

---

## ProTable 使用模式

### 1. 基础 ProTable

```typescript
import { ProTable, ProColumns } from '@ant-design/pro-components';
import { DocumentType } from '@/common/data_type/form/document';
import { DocumentService } from '@/common/service/form/document';

const DocumentTable = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<DocumentType>[] = [
    {
      title: '文档编号',
      dataIndex: 'documentNo',
      key: 'documentNo',
      copyable: true,
    },
    {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
    },
    {
      title: '填写状态',
      dataIndex: 'fillinStatus',
      key: 'fillinStatus',
      valueType: 'select',
      valueEnum: {
        pending: { text: '待填写', status: 'Default' },
        filling: { text: '填写中', status: 'Processing' },
        completed: { text: '已完成', status: 'Success' },
      },
    },
    {
      title: '操作',
      key: 'action',
      valueType: 'option',
      render: (_, record) => [
        <a key="edit" onClick={() => handleEdit(record)}>
          编辑
        </a>,
        <a key="view" onClick={() => handleView(record)}>
          查看
        </a>,
      ],
    },
  ];

  return (
    <ProTable<DocumentType>
      columns={columns}
      actionRef={actionRef}
      request={async (params) => {
        const { list, total } = await DocumentService.fetchList(params);
        return {
          data: list,
          total,
          success: true,
        };
      }}
      rowKey="documentId"
      search={{
        labelWidth: 'auto',
      }}
      pagination={{
        pageSize: 10,
      }}
    />
  );
};
```

---

## 国际化模式

### 1. 定义翻译文件

```typescript
// src/lang/zh/total/document.ts
export default {
  documentNo: '文档编号',
  templateName: '模板名称',
  currentStep: '当前步骤',
  fillinStatus: '填写状态',
  status: {
    pending: '待填写',
    filling: '填写中',
    completed: '已完成',
  },
  actions: {
    create: '创建文档',
    edit: '编辑',
    delete: '删除',
    view: '查看',
  },
};
```

### 2. 使用翻译

```typescript
import { useTranslation } from 'react-i18next';

const DocumentCard = () => {
  const { t } = useTranslation();

  return (
    <Card title={t('document.templateName')}>
      <Descriptions>
        <Descriptions.Item label={t('document.documentNo')}>
          DOC-001
        </Descriptions.Item>
        <Descriptions.Item label={t('document.fillinStatus')}>
          {t('document.status.completed')}
        </Descriptions.Item>
      </Descriptions>
      <Button>{t('document.actions.edit')}</Button>
    </Card>
  );
};
```

---

## 表单处理模式

### 1. ProForm 标准写法

```typescript
import { ProForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';

const DocumentForm = ({ initialValues, onSubmit }) => {
  return (
    <ProForm
      initialValues={initialValues}
      onFinish={async (values) => {
        await onSubmit(values);
        return true;
      }}
    >
      <ProFormText
        name="documentNo"
        label="文档编号"
        placeholder="请输入文档编号"
        rules={[{ required: true, message: '请输入文档编号' }]}
      />
      <ProFormText
        name="templateName"
        label="模板名称"
        placeholder="请输入模板名称"
        rules={[{ required: true, message: '请输入模板名称' }]}
      />
      <ProFormSelect
        name="fillinStatus"
        label="填写状态"
        options={[
          { label: '待填写', value: 'pending' },
          { label: '填写中', value: 'filling' },
          { label: '已完成', value: 'completed' },
        ]}
      />
    </ProForm>
  );
};
```

---

## 路径导入规范

```typescript
// ✅ 使用绝对路径（基于 tsconfig.json baseUrl 配置）
import { DocumentType } from '@/common/data_type/form/document';
import { DocumentService } from '@/common/service/form/document';
import SuperTable from '@/components/common/super-table';
import { useTranslation } from 'react-i18next';

// ❌ 避免复杂的相对路径
// import { DocumentType } from '../../../common/data_type/form/document';
```

---

## 文件命名规范

### 页面文件
- 列表页: `{entity}_table.tsx`
- 编辑页: `{entity}_edit_page.tsx`
- 详情页: `{entity}_detail_page.tsx`

### 组件文件
- 搜索组件: `{entity}_search.tsx`
- 验证组件: `{entity}_validate.tsx`
- 列表组件: `{entity}_list_drawer.tsx` 或 `{entity}_list_modal.tsx`

### 数据文件
- API: `src/common/api/{module}/{entity}.ts`
- Service: `src/common/service/{module}/{entity}.ts`
- Type: `src/common/data_type/{module}/{entity}.ts`

---

本文档提供了项目中常用的代码模式和最佳实践，请在开发时遵循这些规范。
