# 常见问题解答 (FAQ)

**文档编号**: KB-001
**创建时间**: 2025-11-26 11:57
**最后修改**: 2025-11-26 11:57
**执行模型**: claude-sonnet-4-5 (claude-sonnet-4-5-20250929)
**文档状态**: 生效中

---

## 修改历史

| 日期 | 修改人/模型 | 修改概要 |
|------|------------|---------|
| 2025-11-26 11:57 | claude-sonnet-4-5 | 创建文档 |

---

## 环境和配置问题

### Q1: TypeScript 导入路径报错？

**问题描述**: 使用 `@/` 导入时提示找不到模块

**原因**: tsconfig.json 的 baseUrl 配置为 `./uniform/`，而代码在 `src/` 目录

**解决方案**:
```typescript
// 使用 @/ 前缀（推荐）
import { DocumentType } from '@/common/data_type/form/document';

// 或使用相对路径
import { DocumentType } from '../../../common/data_type/form/document';
```

**相关配置**: `tsconfig.json`
```json
{
  "compilerOptions": {
    "baseUrl": "./uniform/",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Q2: 开发环境如何切换？

**问题描述**: 需要连接不同的后端环境

**解决方案**:
```bash
# 开发环境（默认）
REACT_APP_ENV=dev pnpm start

# 测试环境
REACT_APP_ENV=test pnpm start

# 预发布环境
REACT_APP_ENV=pre pnpm start

# 不使用 Mock 数据
pnpm start:no-mock
```

**相关配置**: `config/proxy.ts`、`config/config.ts`

---

### Q3: 如何配置代理解决 CORS 问题？

**问题描述**: API 请求跨域错误

**解决方案**: 修改 `config/proxy.ts`
```typescript
export default {
  dev: {
    '/api': {
      target: 'http://your-backend-url',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
```

---

## TypeScript 类型问题

### Q4: 如何避免使用 any 类型？

**问题描述**: 不知道如何定义类型

**解决方案**:
```typescript
// ❌ 不推荐
const handleData = (data: any) => { ... }

// ✅ 推荐 - 使用具体类型
const handleData = (data: DocumentType | null) => { ... }

// ✅ 推荐 - 使用泛型
function fetchData<T>(url: string): Promise<T> { ... }

// ✅ 推荐 - 使用 unknown（真的不知道类型时）
const parseJSON = (json: string): unknown => {
  return JSON.parse(json);
}

// 使用时进行类型检查
const result = parseJSON(jsonString);
if (typeof result === 'object' && result !== null) {
  // 安全使用
}
```

---

### Q5: interface 和 type 如何选择？

**问题描述**: 不知道什么时候用 interface，什么时候用 type

**项目约定**: 优先使用 `interface`

**解决方案**:
```typescript
// ✅ 数据类型使用 interface
export interface DocumentType {
  documentId: string;
  templateName: string;
}

// ✅ 联合类型使用 type
export type FillinStatus = 'pending' | 'filling' | 'completed';

// ✅ 函数类型使用 type
export type OnSuccess<T> = (data: T) => void;
```

---

## React 组件问题

### Q6: 组件重新渲染太频繁怎么办？

**问题描述**: 组件性能问题，频繁重新渲染

**解决方案**:
```typescript
// 1. 使用 React.memo 包裹组件
export const DocumentCard = React.memo<DocumentCardProps>(({ document }) => {
  return <Card>{document.templateName}</Card>;
});

// 2. 使用 useCallback 缓存回调函数
const handleEdit = useCallback((id: string) => {
  // 编辑逻辑
}, []); // 依赖数组为空，函数不会重新创建

// 3. 使用 useMemo 缓存计算结果
const filteredDocuments = useMemo(() => {
  return documents.filter(d => d.fillinStatus === 'completed');
}, [documents]); // 只在 documents 变化时重新计算
```

---

### Q7: 如何正确使用 useEffect？

**问题描述**: useEffect 无限循环或不触发

**解决方案**:
```typescript
// ❌ 错误 - 无限循环（依赖缺失）
useEffect(() => {
  setCount(count + 1);
}); // 没有依赖数组，每次渲染都执行

// ❌ 错误 - 依赖不完整
useEffect(() => {
  fetchData(documentId);
}, []); // documentId 变化时不会重新执行

// ✅ 正确 - 依赖完整
useEffect(() => {
  const fetchData = async () => {
    const data = await DocumentService.fetchById(documentId);
    setDocument(data);
  };

  if (documentId) {
    fetchData();
  }
}, [documentId]); // documentId 变化时重新执行

// ✅ 正确 - 清理副作用
useEffect(() => {
  const timer = setInterval(() => {
    // 定时任务
  }, 1000);

  // 清理函数
  return () => {
    clearInterval(timer);
  };
}, []);
```

---

## API 和数据请求问题

### Q8: API 调用失败如何排查？

**问题描述**: API 请求返回错误或无响应

**排查步骤**:
1. **检查网络请求**
   - 打开浏览器开发者工具 → Network 标签
   - 查看请求 URL、Method、Headers、Response

2. **检查代理配置**
   - 确认 `config/proxy.ts` 配置正确
   - 确认后端服务已启动

3. **检查 Axios 拦截器**
   - 查看 `src/axios.ts` 请求/响应拦截器
   - 检查 token 是否正确

4. **检查 API 定义**
   - 确认 URL 路径正确
   - 确认请求参数格式正确

**示例**:
```typescript
// 检查 API 调用
const response = await getDocumentList({
  pageNum: 1,
  pageSize: 10,
});

console.log('API Response:', response);
```

---

### Q9: 如何处理 API 错误？

**问题描述**: API 请求失败后如何友好地提示用户

**解决方案**:
```typescript
import { message } from 'antd';

// Service 层处理
export class DocumentService {
  static async fetchById(id: string): Promise<DocumentType | null> {
    try {
      const response = await getDocumentById(id);
      return response.data;
    } catch (error) {
      console.error('获取文档失败:', error);
      message.error('获取文档失败，请稍后重试');
      return null;
    }
  }
}

// 组件中使用
const DocumentPage = ({ id }: { id: string }) => {
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const data = await DocumentService.fetchById(id);

      if (data) {
        setDocument(data);
      } else {
        setError('获取文档失败');
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) return <Spin />;
  if (error) return <Alert type="error" message={error} />;
  if (!document) return <Empty />;

  return <DocumentCard document={document} />;
};
```

---

## 权限和路由问题

### Q10: 如何跳过某个页面的权限检查？

**问题描述**: 某些页面不需要登录就能访问

**解决方案**: 修改 `src/escape_authcheck.ts`
```typescript
const escapeAuthCheckList = [
  '/user/login',
  '/sharedFormTable',
  '/viewForm',
  '/printForm',
  '/your-new-path',  // 添加你的路径
];

export default escapeAuthCheckList;
```

---

### Q11: 如何配置路由？

**问题描述**: 添加新页面后如何配置路由

**解决方案**: 修改 `config/routes.ts`
```typescript
export default [
  {
    path: '/form/document',
    name: '文档管理',
    icon: 'FileTextOutlined',
    routes: [
      {
        path: '/form/document/list',
        name: '文档列表',
        component: './form/document/document_table',
      },
      {
        path: '/form/document/edit/:id',
        name: '编辑文档',
        component: './form/document/document_edit_page',
        hideInMenu: true,
      },
    ],
  },
];
```

---

## 国际化问题

### Q12: 国际化文本不显示？

**问题描述**: 使用 `t()` 函数后文本不显示

**排查步骤**:
1. **检查翻译文件是否存在**
   - `src/lang/zh/total/{entity}.ts`
   - `src/locales/zh-CN/pages.ts`

2. **检查翻译键名是否正确**
   ```typescript
   // 翻译文件 src/lang/zh/total/document.ts
   export default {
     documentNo: '文档编号',
     templateName: '模板名称',
   };

   // 使用
   const { t } = useTranslation();
   const label = t('document.documentNo'); // ✅ 正确
   // const label = t('documentNo'); // ❌ 错误：缺少前缀
   ```

3. **检查是否导入 useTranslation**
   ```typescript
   import { useTranslation } from 'react-i18next';
   ```

---

## 构建和部署问题

### Q13: 构建失败如何排查？

**问题描述**: `pnpm build` 失败

**排查步骤**:
1. **运行类型检查**
   ```bash
   pnpm tsc
   ```

2. **运行 ESLint 检查**
   ```bash
   pnpm lint
   ```

3. **清理缓存**
   ```bash
   rm -rf node_modules/.cache
   rm -rf .umi
   pnpm install
   ```

4. **检查依赖版本**
   ```bash
   pnpm outdated
   ```

---

### Q14: 生产环境如何配置 CDN？

**问题描述**: 需要将静态资源部署到 CDN

**解决方案**: 查看 `config/config.ts`
```typescript
if (REACT_APP_ENV !== 'dev') {
  config.publicPath = REACT_APP_ENV === 'prod'
    ? `//g.66yunliancdn.cn/${projectName}/${projectVersion}/`
    : `//g.66yunliantest.cn/${projectName}/${projectVersion}/`;
}
```

项目会根据环境变量自动配置 CDN 路径。

---

## 性能优化问题

### Q15: 大列表渲染卡顿怎么办？

**问题描述**: 列表数据量大时页面卡顿

**解决方案**:
1. **使用 ProTable 的虚拟滚动**
   ```typescript
   <ProTable
     scroll={{ y: 400 }}
     pagination={{
       pageSize: 20,
       showSizeChanger: true,
     }}
   />
   ```

2. **分页加载**
   ```typescript
   request={async (params) => {
     const { list, total } = await DocumentService.fetchList({
       pageNum: params.current,
       pageSize: params.pageSize,
     });
     return { data: list, total, success: true };
   }}
   ```

3. **使用 React.memo 优化列表项**
   ```typescript
   const ListItem = React.memo(({ item }) => {
     return <div>{item.name}</div>;
   });
   ```

---

### Q16: 图片加载慢怎么办？

**问题描述**: 图片资源加载缓慢

**解决方案**:
1. **使用 CDN**
   - 将图片上传到 CDN
   - 使用 CDN URL

2. **图片懒加载**
   ```typescript
   import { Image } from 'antd';

   <Image
     src="image-url"
     placeholder={<Spin />}
     preview={false}
   />
   ```

3. **图片压缩**
   - 使用 WebP 格式
   - 压缩图片大小

---

## 其他常见问题

### Q17: Mock 数据如何配置？

**问题描述**: 需要本地 Mock 数据进行开发

**解决方案**: 在 `mock/` 目录下创建 Mock 文件
```typescript
// mock/form/document.ts
export default {
  'GET /api/form/document/list': {
    code: 200,
    message: '查询成功',
    data: {
      list: [
        {
          documentId: '1',
          documentNo: 'DOC-001',
          templateName: '测试文档',
          fillinStatus: 'completed',
        },
      ],
      total: 1,
    },
  },

  'GET /api/form/document/:id': (req: any, res: any) => {
    res.json({
      code: 200,
      message: '查询成功',
      data: {
        documentId: req.params.id,
        documentNo: 'DOC-001',
        templateName: '测试文档',
      },
    });
  },
};
```

---

### Q18: 如何调试代码？

**问题描述**: 需要调试代码找出问题

**解决方案**:
1. **浏览器 DevTools**
   - 打开开发者工具 (F12)
   - 在 Sources 标签中设置断点
   - 刷新页面触发断点

2. **Console 调试**
   ```typescript
   console.log('变量值:', variable);
   console.table(arrayData);
   console.error('错误:', error);
   ```

3. **React DevTools**
   - 安装 React DevTools 浏览器扩展
   - 查看组件树和 Props/State

4. **Redux DevTools（如使用）**
   - 安装 Redux DevTools 浏览器扩展
   - 查看 Action 和 State 变化

---

## 获取更多帮助

如果以上 FAQ 无法解决你的问题：

1. **查阅项目文档**
   - @CLAUDE.md - 项目详细文档
   - @docs/01-指引/ - 开发指引
   - @docs/99-知识/ - 知识库

2. **查看官方文档**
   - [Umi 4.x](https://umijs.org/)
   - [Ant Design 5.x](https://ant.design/)
   - [React](https://react.dev/)
   - [TypeScript](https://www.typescriptlang.org/)

3. **使用 AskUserQuestion 工具**
   - 向用户询问具体问题
   - 获取更多上下文信息

4. **提交 Issue**
   - 在项目 GitHub 仓库提交 Issue
   - 详细描述问题和复现步骤

---

**本文档持续更新中，欢迎补充常见问题。**
