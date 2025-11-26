# Claude Code 项目记忆文件

> 本文件为 Claude Code AI 助手提供项目核心上下文和开发指南

---

## 🎯 项目概览

**项目名称**: uniform-fe (一体化表单管理平台)
**内部代号**: op-fe-66
**项目类型**: 企业级前端应用
**当前分支**: `master`
**主分支**: `master`

### 核心特性

- 🎨 **动态表单引擎**: 支持变量化表单设计和动态渲染
- 📋 **模板版本控制**: 完善的表单模板和文档模板版本管理
- 🔐 **细粒度权限**: 基于菜单代码的权限控制，支持业务线隔离
- 🔔 **智能通知系统**: 灵活的通知配置和完整的回执记录
- 📊 **数据可视化**: 基于 @antv/l7 的地理可视化展示
- 🚀 **富文本编辑**: 集成 Quill 编辑器，支持表格和自定义变量
- 🏭 **行业定制**: 专为港口航运行业设计，正在向通用化演进

---

## 📦 技术栈

### 前端核心

- **框架**: React 18.2 + TypeScript 4.9
- **构建工具**: Umi Max 4.1.0
- **包管理器**: pnpm
- **UI 组件库**: Ant Design 5.12 + Pro Components 2.6
- **表单处理**: ProForm + Ant Design Form
- **状态管理**: Umi Model
- **路由**: Umi 约定式路由 (Hash 模式)
- **国际化**: i18next + Umi locale
- **富文本编辑**: Quill 2.0.2 + React Quill

### 开发工具

- **代码检查**: ESLint + Prettier
- **类型检查**: TypeScript strict mode
- **测试框架**: Jest + @testing-library/react
- **API 管理**: Axios + OpenAPI

### MCP 服务器（已集成）

- **context7**: 文档和代码示例检索
- **http-api**: HTTP 请求和图像获取

---

## 📁 项目结构

```
op-fe-66/
├── config/                    # 配置文件
│   ├── config.ts             # Umi 主配置
│   ├── routes.ts             # 路由配置
│   ├── proxy.ts              # 代理配置
│   └── defaultSettings.ts    # 布局配置
├── docs/                      # 项目文档（详见文档导航）
│   ├── PRODUCT_TRANSFORMATION_PLAN.md  # 通用化改造方案 ⭐
│   ├── KICKOFF_TASKS.md                # 实施任务清单
│   └── README.md                       # 文档导航
├── src/
│   ├── common/               # 通用模块
│   │   ├── api/             # API 接口定义（按模块分类）
│   │   ├── service/         # 业务服务层
│   │   ├── data_type/       # TypeScript 类型定义
│   │   └── code_list/       # 代码表/枚举
│   ├── components/           # 公共组件
│   │   ├── common/          # 通用组件 (SuperTable, DynamicForm)
│   │   ├── text_editor/     # 富文本编辑器
│   │   ├── form_var_config/ # 表单变量配置
│   │   └── sub_question/    # 子问题组件
│   ├── lang/                 # i18next 国际化
│   ├── locales/              # Umi 国际化
│   ├── pages/                # 页面组件
│   │   ├── form/            # 表单管理
│   │   ├── template/        # 模板管理
│   │   ├── operation/       # 业务操作
│   │   ├── system/          # 系统管理
│   │   └── notification/    # 通知管理
│   ├── app.tsx               # 运行时配置
│   ├── access.ts             # 权限定义
│   └── axios.ts              # Axios 实例配置
├── CLAUDE.md                  # 详细项目理解文档（长期记忆）
├── CLAUDES.md                 # 本文件（短期记忆）
└── README.md                  # 项目说明
```

---

## 🛠️ 开发命令

### 快速启动

```bash
# 安装依赖
pnpm install

# 启动开发服务器（端口 8000）
pnpm dev
pnpm start         # 同 pnpm dev
pnpm start:dev     # 开发环境（默认）
pnpm start:test    # 测试环境
pnpm start:pre     # 预发布环境
pnpm start:no-mock # 无 Mock 模式
```

### 常用脚本

```bash
# 代码质量
pnpm lint              # ESLint 检查
pnpm lint:fix          # 自动修复 ESLint 问题
pnpm prettier          # Prettier 格式化
pnpm tsc               # TypeScript 类型检查

# 构建相关
pnpm build             # 生产构建
pnpm analyze           # 分析包大小
pnpm preview           # 预览生产构建

# 测试相关
pnpm test              # 运行单元测试
pnpm test:coverage     # 测试覆盖率
pnpm test:e2e          # E2E 测试

# OpenAPI
pnpm openapi           # 根据 OpenAPI 规范生成服务代码
```

---

## 🔐 代码规范

### 核心原则

- **类型安全**: 避免使用 `any`，使用严格的 TypeScript 类型
- **组件化**: 高度模块化的组件设计，易于复用和扩展
- **配置优于编码**: 通过配置而非编写代码来适应业务变化
- **详细日志**: 文件编辑时输出详细日志，便于实时观察
- **提交规范**: 每完成一项任务应及时提交 git，commit message 要详细

### TypeScript 规范

```typescript
// ✅ 使用 interface 定义数据类型（遵循项目约定）
export interface DocumentType {
  documentId: string;
  templateName: string;
  currentStep: string;
  fillinStatus: string;
}

// ✅ 明确的函数类型定义
const fetchDocument = async (id: string): Promise<DocumentType> => {
  // ...
};

// ❌ 避免使用 any
// ✅ 使用具体类型或 unknown
const handleData = (data: DocumentType | null) => {
  if (data) {
    // ...
  }
};
```

### React 组件规范

```typescript
// ✅ 函数组件 + Hooks（项目标准）
export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onEdit }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Typography>{document.templateName}</Typography>
      <Button onClick={() => onEdit(document.documentId)}>
        {t('common.edit')}
      </Button>
    </Card>
  );
};

// ✅ 自定义 Hook
export const useDocumentData = (documentId: string) => {
  const [data, setData] = useState<DocumentType | null>(null);
  // ...
  return { data, loading, error };
};
```

### 文件命名规范

- **页面文件**: `{entity}_table.tsx`（列表）、`{entity}_edit_page.tsx`（编辑）、`{entity}_detail_page.tsx`（详情）
- **组件文件**: `{entity}_search.tsx`（搜索）、`{entity}_validate.tsx`（验证）
- **数据文件**:
  - API: `src/common/api/{module}/{entity}.ts`
  - Service: `src/common/service/{module}/{entity}.ts`
  - Type: `src/common/data_type/{module}/{entity}.ts`

### 导入路径规范

```typescript
// ✅ 使用绝对路径（基于 tsconfig.json baseUrl 配置）
import { DocumentType } from '@/common/data_type/form/document';
import { DocumentService } from '@/common/service/form/document';
import SuperTable from '@/components/common/super-table';

// ❌ 避免复杂的相对路径
// import { DocumentType } from '../../../common/data_type/form/document';
```

---

## 🚀 工作流程

### 完整开发流程

1. **需求分析**
   - 明确理解用户需求
   - 查阅相关文档（CLAUDE.md、docs/）
   - 使用 `AskUserQuestion` 工具询问不明确之处

2. **任务规划**
   - 使用 `TodoWrite` 工具创建任务清单
   - 将复杂任务分解为小步骤
   - 明确验收标准

3. **实施开发**
   - 按计划逐步实现
   - 实时更新 todo 状态 (pending → in_progress → completed)
   - 遵循代码规范和项目约定

4. **代码检查**
   - 运行 `pnpm lint` 检查代码质量
   - 运行 `pnpm tsc` 检查类型错误
   - 运行 `pnpm test` 确保测试通过

5. **浏览器验证**（如适用）
   - 启动开发服务器 `pnpm dev`
   - 在浏览器中测试功能
   - 检查控制台无 error 或 warning
   - 验证功能正常工作

6. **文档更新**
   - 重大变更更新 CLAUDE.md
   - 创建或更新相关文档
   - 更新 README.md（如需要）

7. **代码提交**
   - 使用规范的 commit message
   - 包含 Claude Code 署名

---

## 📝 Git 提交规范

### Commit Message 格式

```
type(scope): 简短描述

详细说明：
- 变更内容
- 变更原因
- 影响范围

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Type 类型说明

- `feat` - 新功能
- `fix` - Bug 修复
- `refactor` - 重构（不改变功能）
- `perf` - 性能优化
- `docs` - 文档更新
- `style` - 代码格式（不影响逻辑）
- `test` - 测试相关
- `chore` - 构建/工具/依赖更新
- `revert` - 撤销提交

### Scope 范围示例

- `form` - 表单相关
- `template` - 模板相关
- `system` - 系统管理
- `notification` - 通知系统
- `operation` - 业务操作
- `component` - 组件
- `api` - API 接口
- `config` - 配置文件

---

## 🔧 常见模式

### API 调用模式

```typescript
// 1. 定义 API 函数（src/common/api/form/document.ts）
import request from '@/axios';

export const getDocumentById = (id: string) => {
  return request({
    url: `/api/form/document/${id}`,
    method: 'GET',
  });
};

// 2. 创建 Service（src/common/service/form/document.ts）
import { getDocumentById } from '@/common/api/form/document';

export class DocumentService {
  static async fetchById(id: string) {
    const response = await getDocumentById(id);
    return response.data;
  }
}

// 3. 页面中使用
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

### ProTable 使用模式

```typescript
import { ProTable } from '@ant-design/pro-components';

const DocumentTable = () => {
  const columns: ProColumns<DocumentType>[] = [
    {
      title: '文档编号',
      dataIndex: 'documentNo',
      key: 'documentNo',
    },
    {
      title: '模板名称',
      dataIndex: 'templateName',
      key: 'templateName',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleEdit(record)}>编辑</Button>
      ),
    },
  ];

  return (
    <ProTable
      columns={columns}
      request={async (params) => {
        const data = await DocumentService.fetchList(params);
        return {
          data: data.list,
          total: data.total,
          success: true,
        };
      }}
    />
  );
};
```

### 国际化模式

```typescript
// 1. 定义翻译（src/lang/zh/total/document.ts）
export default {
  documentNo: '文档编号',
  templateName: '模板名称',
  currentStep: '当前步骤',
  // ...
};

// 2. 使用翻译
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();

  return (
    <div>
      <label>{t('document.documentNo')}</label>
    </div>
  );
};
```

---

## 🐛 故障排查

### 常见问题

**Q: 类型导入报错？**
A: 检查 `tsconfig.json` 的 baseUrl 配置（当前设置为 `./uniform/`），使用 `@/` 前缀导入。

**Q: API 调用失败？**
A: 检查代理配置 `config/proxy.ts`，确认后端服务已启动。

**Q: 国际化文本未显示？**
A: 检查 `src/lang/zh/` 和 `src/locales/zh-CN/` 是否存在对应的键值。

**Q: 权限检查问题？**
A: 查看 `src/escape_authcheck.ts` 了解哪些页面不需要权限检查。

**Q: 构建失败？**
A: 运行 `pnpm tsc` 检查类型错误，运行 `pnpm lint` 检查代码规范。

---

## 📊 性能优化

### 优化策略

- 使用 `React.memo` 优化组件渲染
- 使用 `useMemo` 缓存计算结果
- 使用 `useCallback` 缓存回调函数
- ProTable 使用虚拟滚动处理大数据
- 图片使用 CDN 加载
- 路由级代码分割（Umi 自动）

---

## 📅 当前任务和状态

### 当前重点: 通用化改造

项目正在从**港口航运专用系统**向**跨行业通用数据收集平台**演进。

**核心文档**:
- **[docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md)** - 产品化改造方案（⭐ 重要）
- **[docs/KICKOFF_TASKS.md](./docs/KICKOFF_TASKS.md)** - Week 1 实施任务清单

**改造要点**:
1. ✅ 字段动态化 - 将行业特定字段改为可配置
2. ✅ Connector 架构 - 支持外部系统集成
3. 🚧 数据库改造 - 新增场景配置表
4. 🚧 前端重构 - 动态字段渲染

### 已完成功能

- ✅ 动态表单引擎
- ✅ 模板版本控制
- ✅ 权限管理系统
- ✅ 通知系统
- ✅ 富文本编辑器
- ✅ 业务操作模块（港口航运）

### 进行中

- 🚧 通用化改造（v3.0）
- 🚧 字段动态化
- 🚧 场景配置系统

### 计划中

- [ ] 工作流引擎集成
- [ ] 低代码平台能力
- [ ] 移动端原生支持
- [ ] 数据分析和报表

---

## 📚 相关文档

### 核心文档

- **[CLAUDE.md](./CLAUDE.md)** - 详细项目理解文档（长期记忆）
- **[README.md](./README.md)** - 项目说明和快速开始
- **[docs/README.md](./docs/README.md)** - 文档导航

### 通用化改造文档

- **[docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md)** - 产品化改造方案
- **[docs/KICKOFF_TASKS.md](./docs/KICKOFF_TASKS.md)** - 实施任务清单
- **[docs/TRANSFORMATION_OVERVIEW.md](./docs/TRANSFORMATION_OVERVIEW.md)** - 改造方案概览

### 技术参考

- [Umi 4.x 官方文档](https://umijs.org/)
- [Ant Design 5.x 官方文档](https://ant.design/)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

---

## 🤝 团队协作

### Code Review 要点

- 是否遵循了代码规范
- 是否有足够的类型定义
- 是否更新了相关文档
- 是否考虑了性能影响
- 是否通过了测试

### 分支策略

- `master` - 主分支，生产环境代码
- `develop` - 开发分支（如有）
- `feature/*` - 功能分支
- `hotfix/*` - 紧急修复分支

---

## 🔒 安全要求

- 避免 XSS 攻击（React 默认转义）
- 防止 SQL 注入（后端处理）
- CSRF 保护（使用 token）
- 敏感数据加密传输
- 权限验证和访问控制

---

## 📮 反馈渠道

- **GitHub Issues**: 报告问题和建议
- **内部文档**: docs/ 目录
- **团队讨论**: 使用 `AskUserQuestion` 工具

---

**最后更新**: 2025-11-26
**Claude Code 版本**: Sonnet 4.5 (claude-sonnet-4-5-20250929)
**项目版本**: 6.0.51-beta.2
