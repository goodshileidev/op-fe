# 开发检查清单

**文档编号**: GUIDE-002
**创建时间**: 2025-11-26 11:56
**最后修改**: 2025-11-26 11:56
**执行模型**: claude-sonnet-4-5 (claude-sonnet-4-5-20250929)
**文档状态**: 生效中

---

## 修改历史

| 日期 | 修改人/模型 | 修改概要 |
|------|------------|---------|
| 2025-11-26 11:56 | claude-sonnet-4-5 | 创建文档 |

---

## 任务开始前检查清单

### 环境准备

- [ ] 确认 Node.js 版本 >= 16
- [ ] 确认 pnpm 已安装
- [ ] 拉取最新代码 `git pull origin master`
- [ ] 安装依赖 `pnpm install`
- [ ] 检查是否有依赖更新 `pnpm outdated`

### 需求理解

- [ ] 明确需求目标和验收标准
- [ ] 了解相关业务背景
- [ ] 查阅相关文档（CLAUDE.md、docs/）
- [ ] 使用 `AskUserQuestion` 工具询问不明确之处
- [ ] 确认技术方案可行性

### 任务规划

- [ ] 使用 `TodoWrite` 工具创建任务清单
- [ ] 将复杂任务分解为小步骤
- [ ] 评估工作量和风险
- [ ] 确认依赖关系和优先级

---

## 开发过程中检查清单

### 代码规范

- [ ] 遵循 TypeScript 严格模式
- [ ] 避免使用 `any` 类型
- [ ] 所有函数参数和返回值有明确类型
- [ ] 使用 interface 定义数据类型（项目约定）
- [ ] 组件使用函数式写法 + Hooks
- [ ] 自定义 Hook 以 `use` 开头

### 文件命名

- [ ] 页面文件遵循命名规范（`{entity}_table.tsx`）
- [ ] 组件文件遵循命名规范（`{entity}_search.tsx`）
- [ ] 数据文件按模块组织（`src/common/api/{module}/{entity}.ts`）

### 导入路径

- [ ] 使用绝对路径（`@/` 前缀）
- [ ] 避免复杂的相对路径（`../../../`）
- [ ] 按类型分组导入（React、第三方库、项目内部）

### 代码质量

- [ ] 实时更新 todo 状态（pending → in_progress → completed）
- [ ] 代码有适当的注释（复杂逻辑）
- [ ] 避免重复代码，提取公共逻辑
- [ ] 使用 React.memo / useCallback / useMemo 优化性能
- [ ] 处理异步操作的错误情况
- [ ] 处理边界情况和空值

### 国际化

- [ ] 所有用户可见文本使用国际化
- [ ] 翻译文件已更新（`src/lang/zh/`）
- [ ] 使用 `useTranslation` Hook 获取翻译
- [ ] 翻译键名清晰明了

### API 调用

- [ ] 遵循三层架构（API → Service → Page）
- [ ] API 函数有明确的参数和返回值类型
- [ ] Service 层处理业务逻辑
- [ ] 错误处理完善（try-catch）
- [ ] Loading 状态处理
- [ ] 请求参数验证

### 权限控制

- [ ] 检查页面是否需要权限验证
- [ ] 如需跳过权限，更新 `src/escape_authcheck.ts`
- [ ] 按钮级权限控制（使用 `access` 对象）
- [ ] 数据级权限控制（viewerList / editorList）

---

## 提交前检查清单

### 代码检查

- [ ] 运行 `pnpm lint` 无错误
- [ ] 运行 `pnpm tsc` 无类型错误
- [ ] 运行 `pnpm prettier` 格式化代码
- [ ] 删除无用的 console.log
- [ ] 删除注释掉的代码

### 功能测试

- [ ] 启动开发服务器 `pnpm dev`
- [ ] 在浏览器中测试所有功能点
- [ ] 检查控制台无 error 或 warning
- [ ] 测试不同权限角色的访问
- [ ] 测试边界情况和错误处理
- [ ] 测试不同浏览器兼容性（Chrome、Firefox）

### 单元测试

- [ ] 运行 `pnpm test` 确保测试通过
- [ ] 新增功能有对应测试用例
- [ ] 测试覆盖率符合要求
- [ ] Mock 数据完整

### 文档更新

- [ ] 重大变更更新 CLAUDE.md
- [ ] 更新相关技术文档
- [ ] 更新 README.md（如需要）
- [ ] 添加或更新注释

### 性能检查

- [ ] 大列表使用虚拟滚动
- [ ] 图片使用 CDN 或压缩
- [ ] 组件使用 React.memo 优化
- [ ] 避免不必要的重新渲染
- [ ] 检查打包体积 `pnpm analyze`

---

## Git 提交检查清单

### 提交准备

- [ ] 确认修改内容符合需求
- [ ] 确认没有提交无关文件
- [ ] 确认没有提交敏感信息（密码、token）
- [ ] 代码已经过 code review（团队协作）

### Commit Message

- [ ] 使用规范的 type（feat/fix/refactor 等）
- [ ] 包含清晰的 scope
- [ ] 简短描述清晰明了
- [ ] 详细说明包含：
  - 变更内容
  - 变更原因
  - 影响范围
- [ ] 包含 Claude Code 署名

### Commit Message 模板

```
type(scope): 简短描述

详细说明：
- 变更内容
- 变更原因
- 影响范围

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### 提交后

- [ ] 推送到远程仓库 `git push`
- [ ] 检查 CI/CD 构建状态
- [ ] 通知相关人员（如需要）

---

## 发布前检查清单

### 构建检查

- [ ] 运行 `pnpm build` 成功
- [ ] 检查构建产物大小
- [ ] 检查 source map 是否正确
- [ ] 运行 `pnpm preview` 预览构建结果

### 环境检查

- [ ] 确认目标环境（dev/test/pre/prod）
- [ ] 确认环境变量配置正确
- [ ] 确认 API 地址配置正确
- [ ] 确认 CDN 配置正确

### 功能回归

- [ ] 核心功能全部测试通过
- [ ] 新功能测试通过
- [ ] 修复的 bug 不再出现
- [ ] 没有引入新的 bug

### 文档交付

- [ ] 发布说明文档完整
- [ ] 用户手册更新（如需要）
- [ ] API 文档更新（如需要）
- [ ] 变更日志更新

---

## 快速检查命令

### 一键质量检查
```bash
pnpm tsc && pnpm lint && pnpm test
```

### 一键完整验证
```bash
pnpm tsc && pnpm lint && pnpm test && pnpm build
```

---

## 常见问题自查

### TypeScript 类型错误
- [ ] 检查 tsconfig.json 配置
- [ ] 检查导入路径是否正确
- [ ] 检查类型定义是否完整
- [ ] 运行 `pnpm tsc --noEmit` 查看详细错误

### ESLint 错误
- [ ] 运行 `pnpm lint:fix` 自动修复
- [ ] 检查是否违反项目规范
- [ ] 必要时添加 eslint-disable 注释（谨慎使用）

### 构建失败
- [ ] 检查依赖是否安装完整
- [ ] 检查环境变量配置
- [ ] 清理缓存 `rm -rf node_modules/.cache`
- [ ] 重新安装依赖 `pnpm install`

### 运行时错误
- [ ] 检查浏览器控制台
- [ ] 检查网络请求
- [ ] 检查 API 返回数据格式
- [ ] 检查权限配置

---

**提示**: 将此检查清单作为日常开发的参考，确保代码质量和交付标准。
