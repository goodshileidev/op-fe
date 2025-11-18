# Claude 项目理解记录

## 📋 项目基本信息

- **项目名称**: uniform-fe (一体化表单管理平台)
- **内部代号**: op-fe-66
- **项目类型**: 企业级前端应用
- **主要技术**: React 18.2 + Umi 4.x + TypeScript 4.9 + Ant Design 5.12
- **业务领域**: 港口、航运、表单流程管理
- **开发团队**: 中化港口团队
- **项目作者**: wwl
- **当前版本**: 6.0.51-beta.2
- **代码总量**: 约 60,000 行 TypeScript/TSX 代码

## 🎯 项目定位与目标

### 核心价值
这是一个**通用的表单管理平台**，虽然最初为港口航运业务设计，但正在向通用化方向演进。系统的核心价值在于：

1. **动态表单引擎** - 允许非技术人员通过可视化方式设计复杂表单
2. **版本化管理** - 完善的模板版本控制，支持模板演进和回滚
3. **流程化处理** - 支持多步骤审批流程和权限控制
4. **数据化决策** - 提供数据分析和可视化能力

### 设计理念
- **配置优于编码** - 通过配置而非编写代码来适应业务变化
- **组件化架构** - 高度模块化的组件设计，易于复用和扩展
- **类型安全** - 完整的 TypeScript 类型定义，减少运行时错误
- **用户体验** - 基于 Ant Design 的一致性用户界面

## 🏗️ 技术架构详解

### 1. 框架层次

```
┌─────────────────────────────────────────┐
│         Ant Design Pro Layout           │  ← 布局层
├─────────────────────────────────────────┤
│              Umi Max 框架                │  ← 框架层
│  ┌──────────┬──────────┬──────────┐    │
│  │  Layout  │  Model   │  Access  │    │
│  ├──────────┼──────────┼──────────┤    │
│  │  i18n    │  Request │ OpenAPI  │    │
│  └──────────┴──────────┴──────────┘    │
├─────────────────────────────────────────┤
│              React 18.2.0                │  ← UI 层
├─────────────────────────────────────────┤
│           TypeScript 4.9.5               │  ← 类型层
└─────────────────────────────────────────┘
```

### 2. 分层架构

```
src/
├── pages/              # 视图层 (View)
│   └── 页面组件，处理用户交互
│
├── common/
│   ├── service/       # 服务层 (Service)
│   │   └── 业务逻辑封装
│   │
│   ├── api/           # API 层 (API)
│   │   └── HTTP 请求定义
│   │
│   └── data_type/     # 类型层 (Type)
│       └── TypeScript 接口定义
│
├── components/         # 组件层 (Component)
│   └── 可复用的 UI 组件
│
└── app.tsx            # 应用层 (App)
    └── 全局配置和初始化
```

### 3. 核心技术栈详细说明

#### Umi Max 特性使用

| 特性 | 使用情况 | 配置位置 |
|------|---------|---------|
| 约定式路由 | ✅ 使用 | config/routes.ts |
| 数据流 Model | ✅ 使用 | src/models/ |
| 权限管理 Access | ✅ 使用 | src/access.ts |
| 国际化 i18n | ✅ 使用 | src/locales/, src/lang/ |
| 请求封装 Request | ✅ 使用 | src/axios.ts |
| OpenAPI 集成 | ✅ 使用 | config/oneapi.json |
| Layout 布局 | ✅ 使用 | config/defaultSettings.ts |
| Mock 数据 | ✅ 使用 | mock/ |

#### Ant Design 组件使用

**高频使用的组件**:
- ProTable - 高级表格
- ProForm - 高级表单
- ProLayout - 页面布局
- Modal/Drawer - 弹窗/抽屉
- Steps - 步骤条
- Upload - 文件上传
- DatePicker - 日期选择

**数据可视化**:
- @antv/l7 - 地理可视化（地图展示）
- @ant-design/plots - 图表可视化

**富文本编辑**:
- Quill 2.0.2 - 核心编辑器
- react-quill - React 封装
- quill-better-table - 表格插件

## 📊 核心业务模块深度解析

### 1. 表单系统 (Form System)

#### 数据模型层次

```
DocumentTemplate (文档模板)
    ↓ 1:N
DocumentTemplateVersion (文档模板版本)
    ↓ 1:N
Document (文档实例)
    ↓ 1:N
FormTemplateVersion (表单模板版本)
    ↓ 1:1
Form (表单实例)
    ↓ 1:N
FormSection (表单区块)
    ↓ 1:N
FormQuestion (表单问题)
```

#### 关键数据结构

**Document (一体化文档)**
```typescript
interface DocumentType {
  documentId: string;                    // 文档 ID
  documentTemplateId: number;            // 文档模板 ID
  documentTemplateVersionId: number;     // 文档模板版本 ID
  documentNo: string;                    // 文档编号
  documentUuid: string;                  // 文档 UUID
  templateName: string;                  // 模板名称
  dataDate: string;                      // 数据日期
  shipType: string;                      // 船舶类型（业务字段）

  // 流程控制
  stepDefinition: string;                // 步骤定义（JSON）
  currentStep: string;                   // 当前步骤
  fillinStatus: string;                  // 填写状态

  // 权限控制
  recipientList: string;                 // 接收人列表
  viewerList: string;                    // 查看人列表
  editorList: string;                    // 编辑人列表

  // 时间控制
  inputStartTime: string;                // 开始填写时间
  inputFinishTime: string;               // 完成填写时间

  // 提交相关
  submissionRecipientUnit: string;       // 提交接收单位
  submissionStatus: string;              // 提交状态
  submissionFinishTime: string;          // 提交完成时间
  submissionSettings: string;            // 提交设置（JSON）
  submissionHistory: string;             // 提交历史（JSON）

  // 变量系统
  variableNameList: string;              // 变量名列表
  varConfigList: string;                 // 变量配置列表（JSON）
  varValueList: string;                  // 变量值列表（JSON）

  publishStatus: string;                 // 发布状态
}
```

**DocumentTemplate (文档模板)**
```typescript
interface DocumentTemplateType {
  documentTemplateId: string;            // 模板 ID
  templateName: string;                  // 模板名称
  templateNo: string;                    // 模板编号
  currentVersion: string;                // 当前版本号

  // 业务分类
  bizType: string;                       // 业务类型
  shipType: string;                      // 船舶类型
  usageScenarioDescription: string;      // 使用场景描述

  // 模板内容
  coverTemplateHtml: string;             // 封面模板 HTML

  // 权限配置
  editorRoleList: string;                // 编辑角色列表
  recipientList: string;                 // 接收人列表

  // 发布信息
  publishStatus: string;                 // 发布状态
  publishTime: string;                   // 发布时间
  publisherName: string;                 // 发布人姓名
  publisherId: string;                   // 发布人 ID

  // 流程配置
  stepDefinition: string;                // 步骤定义（JSON）
  submissionSettings: string;            // 提交设置（JSON）

  // 变量系统
  variableNameList: string;              // 变量名列表
  varConfigList: string;                 // 变量配置（JSON）
}
```

**用户 (User)**
```typescript
interface UserType {
  userId: string;                        // 用户 ID
  userName: string;                      // 用户名
  employeeNumber: string;                // 工号
  userType: string;                      // 用户类型

  // 签名和印章
  signatureFile: string;                 // 签名文件
  signatureImageUrl: string;             // 签名图片 URL
  stampImageUrl: string;                 // 印章图片 URL

  // 基本信息
  avatarUrl: string;                     // 头像 URL
  password: string;                      // 密码（加密）
  userStatus: string;                    // 用户状态

  // 权限
  menuCode: string;                      // 菜单权限代码
}
```

#### 表单变量系统

表单支持自定义变量，用于：
1. **数据绑定** - 将表单字段与变量关联
2. **公式计算** - 支持变量间的计算关系
3. **条件显示** - 根据变量值控制字段显示
4. **数据校验** - 基于变量值的验证规则

变量配置示例:
```typescript
interface FormVarConfig {
  varName: string;          // 变量名
  varType: string;          // 变量类型 (text/number/date/select)
  defaultValue: any;        // 默认值
  formula?: string;         // 计算公式
  validation?: string;      // 验证规则
  dependencies?: string[];  // 依赖的其他变量
}
```

### 2. 模板系统 (Template System)

#### 模板类型层次

```
DocumentTemplate (一体化文档模板)
    ├── FormTemplate (表单模板)
    │   ├── FormSectionTemplate (区块模板)
    │   │   └── FormQuestionTemplate (问题模板)
    │   │       └── SubQuestionTemplate (子问题模板)
    │   └── TableColumnConfig (表格列配置)
    └── DocumentTemplateRule (模板规则)
```

#### 版本控制机制

**版本状态流转**:
```
草稿 (draft) → 待发布 (pending) → 已发布 (published) → 已归档 (archived)
```

**版本继承**:
- 新版本可以基于已有版本创建
- 支持版本对比和差异显示
- 版本回滚功能

#### 模板规则引擎

**DocumentTemplateRule** 用于配置:
1. **适用条件** - 什么情况下使用该模板
2. **必填字段** - 哪些字段必须填写
3. **验证规则** - 字段验证逻辑
4. **计算规则** - 自动计算逻辑
5. **联动规则** - 字段间的联动关系

### 3. 通知系统 (Notification System)

#### 通知配置 (NotificationConfig)

```typescript
interface NotificationConfig {
  configId: string;
  configName: string;

  // 触发时机
  triggerEvent: string;      // create/submit/approve/reject/...

  // 通知方式
  notifyMethod: string[];    // email/sms/app/...

  // 通知对象
  recipientType: string;     // role/user/org/...
  recipientList: string[];   // 接收人列表

  // 通知内容
  notifyTitle: string;       // 通知标题模板
  notifyContent: string;     // 通知内容模板

  // 其他配置
  isEnabled: boolean;        // 是否启用
  priority: string;          // 优先级
}
```

#### 通知历史 (NotificationHistory)

```typescript
interface NotificationHistory {
  historyId: string;
  configId: string;

  // 发送信息
  sentTime: string;          // 发送时间
  sentTo: string[];          // 发送对象
  sentMethod: string;        // 发送方式

  // 内容
  title: string;             // 标题
  content: string;           // 内容

  // 状态
  status: string;            // pending/sent/failed/read
  readTime?: string;         // 阅读时间

  // 关联数据
  relatedEntityType: string; // document/form/...
  relatedEntityId: string;   // 关联实体 ID
}
```

### 4. 权限系统 (Permission System)

#### 权限模型

**多级权限控制**:
1. **菜单级权限** - 控制菜单可见性
2. **页面级权限** - 控制页面访问
3. **操作级权限** - 控制按钮显示
4. **数据级权限** - 控制数据可见性

#### 业务权限

```typescript
// src/access.ts
access: {
  hasMeiyan: boolean,      // 煤盐业务权限
  hasHuagong: boolean,     // 化工业务权限
  hasSystem: boolean,      // 系统管理权限
  hasTemplate: boolean,    // 模板管理权限
  hasForm: boolean,        // 表单管理权限
}
```

#### 文档级权限

每个文档实例都有:
- **viewerList** - 查看权限列表
- **editorList** - 编辑权限列表
- **recipientList** - 接收权限列表

### 5. 业务操作模块 (Operation Modules)

#### 船舶作业 (Ship Operation)

**ShipOperationDocument** - 船舶作业一体化文档
- 化工船舶作业
- 煤盐船舶作业
- 作业流程跟踪
- 文档生成和打印

**业务字段**:
- shipName - 船名
- cargoName - 货名
- berthingTime - 靠泊时间
- departureTime - 离港时间
- domesticForeignTradeType - 内外贸类型

#### 安全检查

**MonthlySecurityCheck** - 月度安全检查
- 检查项配置
- 检查结果记录
- 不合格项跟踪
- 整改验证

**SecurityDeclare** - 保安声明
- 保安等级声明
- 保安措施记录
- 符合性确认

#### 仓储作业

**YuancangOperation** - 圆仓作业
- 作业计划
- 作业记录
- 库存管理
- 统计报表

## 🔄 数据流设计

### 1. API 请求流程

```
Page Component
    ↓ 调用
Service Layer (src/common/service/)
    ↓ 调用
API Layer (src/common/api/)
    ↓ HTTP 请求
Axios Instance (src/axios.ts)
    ↓ 拦截器处理
Backend Server
```

### 2. Axios 拦截器

**请求拦截器**:
```typescript
// 添加 token
request.headers.set('token', localStorage.getItem('token'))
```

**响应拦截器**:
```typescript
// 统一消息提示
if (response.data.code !== 200) {
  message.error(response.data.message)
} else {
  message.success(response.data.message)
}

// 更新 token
localStorage.setItem('token', response.data.token)
```

### 3. 状态管理

**全局状态 (InitialState)**:
```typescript
interface InitialState {
  currentUser?: UserType;     // 当前用户
  settings?: LayoutSettings;  // 布局设置
  loading?: boolean;          // 加载状态
}
```

**Model 数据流**:
- 使用 Umi 内置的 Model 机制
- 支持 namespace 隔离
- 自动管理状态订阅

## 🎨 UI/UX 设计规范

### 1. 布局系统

**ProLayout 配置**:
```typescript
{
  navTheme: 'light',           // 导航主题
  layout: 'mix',               // 混合布局
  splitMenus: true,            // 分割菜单
  siderMenuType: 'group',      // 侧边栏分组
  siderWidth: 220,             // 侧边栏宽度
  fixedHeader: false,          // 固定头部
  fixSiderbar: true,           // 固定侧边栏
  colorPrimary: '#1890ff',     // 主题色
}
```

### 2. 路由设计

**Hash 路由模式**:
- 使用 `history: { type: 'hash' }`
- 适合部署到子路径
- 避免服务器配置问题

**路由结构**:
```
/user/login              # 登录
/template                # 模板管理
  /document_template     # 文档模板
  /form_template         # 表单模板
/form                    # 表单管理
  /document              # 文档实例
  /form                  # 表单实例
/operation               # 业务操作
  /ship_operation_document  # 船舶作业
  /monthly_security_check   # 月度安全检查
/system                  # 系统管理
  /user                  # 用户管理
  /user_permission       # 权限管理
```

### 3. 页面模式

**标准 CRUD 页面**:
1. **列表页** - `*_table.tsx`
2. **编辑页** - `*_edit_page.tsx`
3. **详情页** - `*_detail_page.tsx`
4. **搜索组件** - `components/*_search.tsx`
5. **验证组件** - `components/*_validate.tsx`

### 4. 组件复用策略

**通用组件** (src/components/):
- super-table.tsx - 超级表格
- text_editor - 富文本编辑器
- sub_question - 子问题组件
- form_var_config - 表单变量配置
- document_step - 文档步骤

**业务组件**:
- 表单编辑器
- 模板设计器
- 流程图组件
- 签名板

## 🔧 开发实践指南

### 1. 文件命名规范

**页面文件**:
- 表格页: `{entity}_table.tsx`
- 编辑页: `{entity}_edit_page.tsx`
- 详情页: `{entity}_detail_page.tsx`

**组件文件**:
- 搜索组件: `{entity}_search.tsx`
- 验证组件: `{entity}_validate.tsx`
- 列表组件: `{entity}_list_drawer.tsx` 或 `{entity}_list_modal.tsx`

**数据文件**:
- API: `src/common/api/{module}/{entity}.ts`
- Service: `src/common/service/{module}/{entity}.ts`
- Type: `src/common/data_type/{module}/{entity}.ts`

### 2. 类型定义规范

**接口命名**:
```typescript
// 实体类型
interface {Entity}Type { ... }

// 请求参数
interface {Entity}QueryParams { ... }

// 响应数据
interface {Entity}Response { ... }
```

**类型导出**:
```typescript
// src/common/data_type/{module}/{entity}.ts
export interface EntityType { ... }

// 在其他文件中导入
import { EntityType } from '@/common/data_type/{module}/{entity}'
```

### 3. API 调用规范

**API 定义**:
```typescript
// src/common/api/{module}/{entity}.ts
import request from '@/axios'

export const getEntityList = (params: any) => {
  return request({
    url: '/api/{module}/{entity}/list',
    method: 'GET',
    params
  })
}
```

**Service 封装**:
```typescript
// src/common/service/{module}/{entity}.ts
import { getEntityList } from '@/common/api/{module}/{entity}'

export class EntityService {
  static async fetchList(params: any) {
    const response = await getEntityList(params)
    return response.data
  }
}
```

**页面使用**:
```typescript
// 在页面组件中
import { EntityService } from '@/common/service/{module}/{entity}'

const fetchData = async () => {
  const data = await EntityService.fetchList(params)
  setDataSource(data)
}
```

### 4. 国际化实践

**双语支持**:
1. **i18next** - 业务逻辑国际化 (src/lang/)
2. **Umi locale** - 框架国际化 (src/locales/)

**翻译文件结构**:
```
src/lang/zh/
├── total/              # 实体翻译
│   ├── document.ts
│   ├── form.ts
│   └── ...
├── common/             # 通用翻译
├── code_list/          # 代码表翻译
└── translation.ts      # 汇总
```

### 5. Mock 数据规范

**Mock 文件位置**:
- 全局 Mock: `mock/*.ts`
- 页面 Mock: `src/pages/**/_mock.ts`

**Mock 示例**:
```typescript
// mock/form/document.ts
export default {
  'GET /api/form/document/list': {
    code: 200,
    data: {
      list: [...],
      total: 100
    },
    message: '查询成功'
  }
}
```

## 🚀 性能优化策略

### 1. 代码分割

- 使用 Umi 的动态导入
- 路由级别的代码分割
- 组件懒加载

### 2. 构建优化

```typescript
// config/config.ts
{
  hash: true,                  // 文件 hash
  mfsu: {                      // 模块联邦加速
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,     // esbuild 压缩
}
```

### 3. 运行时优化

- 使用 React.memo 优化组件
- useCallback/useMemo 优化计算
- 虚拟滚动处理大列表

## 📝 重构计划

### 当前重构方向

根据 `docs/` 目录中的文档:

1. **表单模板系统重构** (form-template-refactor.md)
   - 动态字段类型系统
   - 验证规则引擎
   - 条件显示引擎
   - 可视化表单构建器

2. **通用数据模型设计** (generic-data-model.md)
   - 去除行业特定字段
   - 场景配置系统
   - 自定义字段支持
   - 数据迁移策略

### 未来演进

- [ ] 工作流引擎集成
- [ ] 低代码平台能力
- [ ] 移动端原生支持
- [ ] 微前端架构改造
- [ ] GraphQL API 支持

## 🐛 常见问题和陷阱

### 1. TypeScript 类型问题

**问题**: baseUrl 配置导致路径解析问题
```typescript
// tsconfig.json
{
  "baseUrl": "./uniform/"  // 注意：这里设置为 uniform，但实际代码在 src
}
```

**解决**: 使用路径别名
```typescript
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### 2. 权限检查逃逸

某些页面不需要权限检查，配置在:
```typescript
// src/escape_authcheck.ts
const escapeAuthCheckList = [
  '/sharedFormTable',
  '/viewForm',
  '/printForm',
  // ...
]
```

### 3. 环境变量

**开发环境切换**:
```bash
# 开发环境（默认）
REACT_APP_ENV=dev pnpm start

# 测试环境
REACT_APP_ENV=test pnpm start

# 预发布环境
REACT_APP_ENV=pre pnpm start
```

### 4. CDN 部署

生产环境自动使用 CDN:
```typescript
if (REACT_APP_ENV != "dev") {
  config.publicPath = REACT_APP_ENV === 'prod'
    ? `//g.66yunliancdn.cn/${projectName}/${projectVersion}/`
    : `//g.66yunliantest.cn/${projectName}/${projectVersion}/`
}
```

## 📚 学习资源

### 官方文档
- [Umi 4.x](https://umijs.org/)
- [Ant Design 5.x](https://ant.design/)
- [Ant Design Pro Components](https://procomponents.ant.design/)
- [TypeScript](https://www.typescriptlang.org/)

### 内部文档
- README.md - 项目说明
- docs/form-template-refactor.md - 模板系统重构方案
- docs/generic-data-model.md - 通用数据模型设计

## 🔄 更新记录

### 2025-01-13 (本次更新)
- 完整分析项目架构和代码结构
- 详细记录数据模型和业务逻辑
- 补充技术栈使用说明
- 添加开发实践指南
- 完善 README.md 项目说明

### 2025-01-11 (初始版本)
- 初始创建
- 完成项目结构和功能分析

## 💡 AI 助手使用建议

### 使用本文档的场景

1. **理解项目** - 快速了解项目整体架构
2. **定位代码** - 根据业务功能找到对应代码位置
3. **遵循规范** - 按照项目约定编写代码
4. **解决问题** - 查找常见问题的解决方案

### 给 AI 助手的提示

当你作为 AI 助手协助开发时:

1. **优先参考本文档** - 了解项目约定和规范
2. **保持一致性** - 遵循现有的命名和结构
3. **类型安全** - 确保 TypeScript 类型正确
4. **模块化设计** - 保持代码的模块化和复用性
5. **及时更新文档** - 重大变更后更新本文档

### 常见开发任务

**添加新表单页面**:
1. 在 `src/pages/form/{entity}/` 创建页面组件
2. 在 `src/common/data_type/form/` 添加类型定义
3. 在 `src/common/api/form/` 添加 API 接口
4. 在 `src/common/service/form/` 添加业务逻辑
5. 在 `config/routes.ts` 添加路由配置
6. 在 `src/lang/zh/total/` 添加国际化翻译

**修改现有功能**:
1. 找到对应的数据类型定义
2. 修改 API 接口（如需要）
3. 更新业务逻辑
4. 修改页面组件
5. 更新国际化文本
6. 测试功能

**调试问题**:
1. 检查浏览器控制台错误
2. 查看网络请求
3. 检查 TypeScript 类型错误
4. 查看本文档的常见问题章节

---

**维护建议**: 当项目发生重大变更时，请及时更新本文档，确保文档与代码同步。
