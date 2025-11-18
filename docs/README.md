# 通用化改造方案文档

> 港口航运表单管理系统 → 跨行业通用数据收集和管理平台

---

## 📖 文档导航

### 🚀 快速开始

1. **[PRODUCT_TRANSFORMATION_PLAN.md](./PRODUCT_TRANSFORMATION_PLAN.md)** ⭐⭐⭐ **最终方案**
   - 产品化改造方案
   - 字段动态化设计
   - Connector架构
   - 数据库改造方案
   - **立即可实施**

2. **[KICKOFF_TASKS.md](./KICKOFF_TASKS.md)** 🚀 **行动指南**
   - Week 1 任务清单
   - 可执行的代码示例
   - 验收标准
   - **开干！**

3. **[CLAUDE.md](./CLAUDE.md)** - 项目理解记录
   - 项目背景和现状
   - 技术架构详解
   - 业务模块说明

---

### 📚 参考文档

4. **[TRANSFORMATION_OVERVIEW.md](./TRANSFORMATION_OVERVIEW.md)** - v2.0 场景适配方案（参考）
   - 保守改造方案
   - 适用于最小改动场景
   - 不适用于产品化需求

### 📐 v2.0 详细技术文档

| 文档 | 内容 | 适用对象 |
|------|------|---------|
| [01-poc-guide.md](./v2/01-poc-guide.md) | POC实施指南（4周） | POC开发团队 |
| [02-scenario-config-spec.md](./v2/02-scenario-config-spec.md) | 场景配置规范 | 配置开发者 |

### 📁 其他文档

- **[transform-plan.md](./transform-plan.md)** - 早期改造计划（已过时，参考性）
- **[deprecated/](./deprecated/)** - 已废弃的v1.0方案文档

---

## 🎯 阅读路径

### 新成员入职

```
1. 阅读 CLAUDE.md（了解项目）
   ↓
2. 阅读 TRANSFORMATION_OVERVIEW.md（了解改造方案）
   ↓
3. 根据角色选择：
   - POC开发 → 01-poc-guide.md
   - 场景配置 → 02-scenario-config-spec.md
```

### POC 开发团队

```
1. TRANSFORMATION_OVERVIEW.md（理解全局）
   ↓
2. 01-poc-guide.md（详细实施步骤）
   ↓
3. 02-scenario-config-spec.md（配置规范）
   ↓
4. 开始编码
```

### 技术评审

```
1. TRANSFORMATION_OVERVIEW.md（方案总览）
   ↓
2. v2/ 目录下的技术文档（深入细节）
   ↓
3. deprecated/README.md（了解v1.0为何废弃）
```

---

## 📊 文档状态

### 当前版本: v2.0

| 文档 | 版本 | 状态 | 最后更新 |
|------|------|------|---------|
| TRANSFORMATION_OVERVIEW.md | v2.0 | ✅ 正式 | 2025-01-14 |
| CLAUDE.md | v1.0 | ✅ 正式 | 2025-01-13 |
| v2/01-poc-guide.md | v1.0 | ✅ 正式 | 2025-01-14 |
| v2/02-scenario-config-spec.md | v1.0 | ✅ 正式 | 2025-01-14 |

### 已废弃: v1.0

| 文档 | 废弃日期 | 原因 |
|------|---------|------|
| deprecated/generic-data-model.md | 2025-01-14 | 数据模型设计缺陷 |
| deprecated/universal-transformation-plan.md | 2025-01-14 | 过度设计，不切实际 |
| deprecated/form-template-refactor.md | 2025-01-14 | 技术方案错误 |

**详见**: [deprecated/README.md](./deprecated/README.md)

---

## 🔄 文档维护

### 更新规范

1. **版本管理**
   - 使用语义化版本（Semantic Versioning）
   - 主要更新递增主版本号
   - 修正错误递增次版本号

2. **变更记录**
   - 在文档顶部添加"修订说明"章节
   - 记录变更日期、内容、原因

3. **评审流程**
   - 技术文档需经过技术负责人评审
   - 方案文档需经过团队讨论
   - 重大变更需要会议决策

### 贡献指南

**提交文档变更**:
1. 创建分支 `docs/your-topic`
2. 修改文档
3. 提交 PR，说明变更原因
4. 等待评审

**报告文档问题**:
- 在 GitHub Issues 中报告
- 标签: `documentation`
- 描述: 问题位置 + 建议修正

---

## 📞 支持

### 文档相关问题

- **技术问题**: 联系技术负责人
- **业务问题**: 联系产品经理
- **文档错误**: 提交 Issue 或 PR

### 资源链接

- **技术栈文档**:
  - [Umi 4.x](https://umijs.org/)
  - [Ant Design 5.x](https://ant.design/)
  - [TypeScript](https://www.typescriptlang.org/)

- **项目仓库**:
  - GitHub: [项目地址]
  - 文档: [文档地址]

---

## 📝 待完成文档

### 计划中

- [ ] `v2/03-testing-strategy.md` - 测试策略
- [ ] `v2/04-deployment-guide.md` - 部署指南
- [ ] `v2/05-development-workflow.md` - 开发工作流

### 未来可能

- [ ] 场景开发最佳实践
- [ ] 性能优化指南
- [ ] 故障排查手册
- [ ] API 文档

---

## 📈 版本历史

### v2.0 (2025-01-14)

**重大变更**:
- ✅ 废弃 v1.0 方案
- ✅ 发布 v2.0 新方案
- ✅ 采用场景适配层架构
- ✅ POC 先行策略

**文档更新**:
- 新增 `TRANSFORMATION_OVERVIEW.md` v2.0
- 新增 `v2/01-poc-guide.md`
- 新增 `v2/02-scenario-config-spec.md`
- 移动旧文档到 `deprecated/`

### v1.0 (2025-01-13)

**初始版本**:
- 创建 `CLAUDE.md`
- 创建 `generic-data-model.md` (已废弃)
- 创建 `universal-transformation-plan.md` (已废弃)
- 创建 `form-template-refactor.md` (已废弃)

---

## 🎉 贡献者

- 开发团队
- 产品经理
- AI 助手 (Claude)

---

**文档版本**: v2.0
**最后更新**: 2025-01-14

---

<div align="center">

**📖 开始阅读**: [TRANSFORMATION_OVERVIEW.md](./TRANSFORMATION_OVERVIEW.md)

</div>
