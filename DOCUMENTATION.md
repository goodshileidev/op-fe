# 📚 项目文档导航

> uniform-fe (一体化表单管理平台) 完整文档体系

---

## 🚀 快速入口

根据您的需求选择对应的文档：

| 我想要... | 推荐文档 | 说明 |
|----------|---------|------|
| **快速开始开发** | [README.md](./README.md) | 项目说明、安装和快速启动 |
| **日常开发参考** | [CLAUDES.md](./CLAUDES.md) ⭐ | 开发流程、命令、规范（AI 助手首选） |
| **深入理解项目** | [CLAUDE.md](./CLAUDE.md) | 详细架构、业务知识、技术方案 |
| **通用化改造** | [docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md) | 产品化改造完整方案 |
| **实施任务** | [docs/KICKOFF_TASKS.md](./docs/KICKOFF_TASKS.md) | Week 1 可执行任务清单 |
| **文档总览** | [docs/README.md](./docs/README.md) | docs/ 目录文档索引 |

---

## 📖 文档体系架构

```
uniform-fe/
├── README.md                              # 项目说明书
│   └─ 功能: 项目介绍、快速开始、基本配置
│
├── CLAUDES.md ⭐                          # 短期记忆（开发指南）
│   └─ 功能: 日常开发、工作流程、代码规范、常用命令
│   └─ 受众: AI 助手、开发人员
│   └─ 更新: 频繁（跟随开发任务）
│
├── CLAUDE.md                              # 长期记忆（技术文档）
│   └─ 功能: 项目架构、业务领域、数据模型、技术选型
│   └─ 受众: 新人培训、技术决策、深度开发
│   └─ 更新: 定期（重大变更时）
│
├── DOCUMENTATION.md                       # 本文件（文档导航）
│   └─ 功能: 文档索引、快速查找
│
├── transform-plan.md                      # 早期改造计划（已过时）
│   └─ 状态: 参考性文档，已被 docs/ 下的新方案替代
│
└── docs/                                  # 专题文档目录
    ├── README.md                         # docs 导航索引
    │
    ├── PRODUCT_TRANSFORMATION_PLAN.md    # ⭐ 产品化改造方案（最终版）
    │   └─ 内容: 字段动态化、Connector 架构、数据库设计
    │   └─ 状态: ✅ 立即可实施
    │
    ├── KICKOFF_TASKS.md                  # 🚀 Week 1 任务清单
    │   └─ 内容: 可执行任务、代码示例、验收标准
    │   └─ 状态: ✅ 行动指南
    │
    ├── TRANSFORMATION_OVERVIEW.md        # v2.0 场景适配方案
    │   └─ 内容: 保守改造方案（参考）
    │   └─ 状态: 已被 PRODUCT_TRANSFORMATION_PLAN.md 替代
    │
    ├── v2/                               # v2.0 技术文档（场景适配）
    │   ├── 01-poc-guide.md              # POC 实施指南
    │   └── 02-scenario-config-spec.md   # 场景配置规范
    │
    ├── deprecated/                       # 已废弃文档
    │   ├── README.md                    # 废弃原因说明
    │   ├── generic-data-model.md        # v1.0 数据模型（已废弃）
    │   └── ...
    │
    └── archived/                         # 归档文档
        └── ...
```

---

## 👥 针对不同角色的阅读建议

### 🤖 AI 助手（Claude Code）

**主要参考**:
1. [CLAUDES.md](./CLAUDES.md) - 开发流程、命令、规范（首选）
2. [CLAUDE.md](./CLAUDE.md) - 深入了解时参考
3. [docs/](./docs/) - 查看具体实施方案

**工作流程**:
```
接到任务 → 读 CLAUDES.md（工作流程）→ 需要深入了解 → 读 CLAUDE.md（技术细节）
```

### 👨‍💻 新加入的开发人员

**推荐路径**:
1. [README.md](./README.md) - 了解项目，安装环境
2. [CLAUDES.md](./CLAUDES.md) - 学习开发流程和规范
3. [CLAUDE.md](./CLAUDE.md) - 深入理解架构和业务
4. [docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md) - 了解当前重点任务

**时间安排**:
- Day 1: README.md + 环境搭建
- Day 2-3: CLAUDES.md + 实践开发
- Week 1: CLAUDE.md + 业务学习
- Week 2+: 深入 docs/ 专题文档

### 🏗️ 架构师/技术负责人

**推荐路径**:
1. [CLAUDE.md](./CLAUDE.md) - 了解现有架构
2. [docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md) - 改造方案评审
3. [docs/v2/](./docs/v2/) - 技术方案细节
4. [docs/deprecated/README.md](./docs/deprecated/README.md) - 了解历史决策

### 📋 产品经理

**推荐路径**:
1. [README.md](./README.md) - 了解产品功能
2. [CLAUDE.md](./CLAUDE.md) 的"核心业务模块"部分 - 了解业务功能
3. [docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md) - 产品规划

### 🧪 测试工程师

**推荐路径**:
1. [README.md](./README.md) - 了解功能和环境
2. [CLAUDE.md](./CLAUDE.md) 的"核心业务模块"部分 - 了解测试点
3. [docs/KICKOFF_TASKS.md](./docs/KICKOFF_TASKS.md) - 验收标准

---

## 🔍 按主题查找文档

### 项目了解

| 主题 | 文档 |
|-----|------|
| 项目介绍和功能 | [README.md](./README.md) |
| 技术架构 | [CLAUDE.md](./CLAUDE.md) - "技术架构详解" |
| 业务领域 | [CLAUDE.md](./CLAUDE.md) - "核心业务模块" |
| 数据模型 | [CLAUDE.md](./CLAUDE.md) - "表单系统" |

### 开发指南

| 主题 | 文档 |
|-----|------|
| 快速开始 | [README.md](./README.md) - "快速开始" |
| 开发命令 | [CLAUDES.md](./CLAUDES.md) - "开发命令" |
| 代码规范 | [CLAUDES.md](./CLAUDES.md) - "代码规范" |
| 工作流程 | [CLAUDES.md](./CLAUDES.md) - "工作流程" |
| Git 规范 | [CLAUDES.md](./CLAUDES.md) - "Git 提交规范" |

### 技术实施

| 主题 | 文档 |
|-----|------|
| 通用化改造 | [docs/PRODUCT_TRANSFORMATION_PLAN.md](./docs/PRODUCT_TRANSFORMATION_PLAN.md) ⭐ |
| 实施任务 | [docs/KICKOFF_TASKS.md](./docs/KICKOFF_TASKS.md) |
| POC 开发 | [docs/v2/01-poc-guide.md](./docs/v2/01-poc-guide.md) |
| 场景配置 | [docs/v2/02-scenario-config-spec.md](./docs/v2/02-scenario-config-spec.md) |

### 故障排查

| 主题 | 文档 |
|-----|------|
| 常见问题 | [CLAUDES.md](./CLAUDES.md) - "故障排查" |
| 已知问题 | [README.md](./README.md) - "已知问题" |

---

## 📝 文档维护规范

### 文档更新原则

1. **CLAUDES.md** - 每次开发任务变化时更新
2. **CLAUDE.md** - 重大架构变更、新业务模块时更新
3. **README.md** - 项目配置、依赖变化时更新
4. **docs/** - 新增技术方案、废弃旧方案时更新

### 文档命名规范

- **全大写 + .md**: 项目级重要文档（README.md, CLAUDE.md, CLAUDES.md）
- **描述性名称**: docs/ 下的专题文档（kebab-case）
- **版本前缀**: 技术文档系列（01-xxx.md, 02-xxx.md）

### 文档状态标记

- ✅ **正式** - 当前有效的文档
- 🚧 **进行中** - 正在编写的文档
- 📝 **草稿** - 初步想法，未定稿
- ⚠️ **已过时** - 内容过时但保留参考
- ❌ **已废弃** - 移至 deprecated/

---

## 🔄 文档版本历史

### v3.0 (2025-11-26)

**新增**:
- ✅ 创建 CLAUDES.md（Claude Code 短期记忆文档）
- ✅ 创建 DOCUMENTATION.md（本文件）
- ✅ 完善文档体系架构

**更新**:
- ✅ CLAUDE.md 添加文档体系说明
- ✅ 明确双文档体系定位

### v2.0 (2025-01-14)

**新增**:
- docs/PRODUCT_TRANSFORMATION_PLAN.md（产品化改造方案）
- docs/KICKOFF_TASKS.md（实施任务清单）
- docs/v2/ 技术文档系列

**废弃**:
- 移动 v1.0 文档到 deprecated/

### v1.0 (2025-01-13)

**初始版本**:
- 创建 CLAUDE.md
- 创建 README.md
- 创建初始技术文档

---

## 📞 获取帮助

### 文档相关问题

| 问题类型 | 联系方式 |
|---------|---------|
| 文档错误/遗漏 | 提交 Issue 或 PR |
| 文档不清晰 | 联系文档维护者 |
| 需要新文档 | 提出需求 Issue |

### 技术支持

- **开发团队**: 中化港口团队
- **项目作者**: wwl
- **GitHub Issues**: [项目地址]

---

## 📊 文档统计

| 文档 | 行数 | 字数 | 最后更新 |
|-----|------|------|---------|
| README.md | ~625 | ~16KB | 2025-01-13 |
| CLAUDES.md | ~600 | ~15KB | 2025-11-26 ⭐ |
| CLAUDE.md | ~920 | ~23KB | 2025-11-26 |
| docs/PRODUCT_TRANSFORMATION_PLAN.md | ~800+ | ~33KB | 2025-01-14 |
| docs/KICKOFF_TASKS.md | ~300+ | ~13KB | 2025-01-14 |

---

## 🎯 下一步

根据您的角色，建议从以下文档开始：

- 👨‍💻 **开发人员** → [CLAUDES.md](./CLAUDES.md)
- 🤖 **AI 助手** → [CLAUDES.md](./CLAUDES.md)
- 🏗️ **架构师** → [CLAUDE.md](./CLAUDE.md)
- 📋 **产品经理** → [README.md](./README.md)
- 🚀 **实施团队** → [docs/KICKOFF_TASKS.md](./docs/KICKOFF_TASKS.md)

---

**文档版本**: v3.0
**最后更新**: 2025-11-26
**维护者**: 开发团队 + AI 助手 (Claude)

---

<div align="center">

**开始探索** | [README](./README.md) | [CLAUDES](./CLAUDES.md) | [CLAUDE](./CLAUDE.md) | [docs](./docs/)

</div>
