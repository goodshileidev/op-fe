# 向后兼容策略

## 📋 文档信息

- **模块**: 向后兼容
- **优先级**: P0
- **预计工时**: 4-5 工作日
- **依赖**: 01-data-model-refactor, 07-data-migration
- **负责人**: 待分配

---

## 🎯 改造目标

确保**平滑过渡和零中断升级**:

1. ✅ API 层向后兼容
2. ✅ 数据层双写双读
3. ✅ UI 组件渐进式升级
4. ✅ 路由重定向和兼容
5. ✅ 配置文件兼容处理

---

## 🏗️ 兼容层架构

### 适配器模式

\`\`\`typescript
/**
 * API 兼容适配器
 * 文件位置: src/compat/api-adapter.ts
 */

import { Entity } from '@/common/data_type/generic/entity';
import { DocumentType } from '@/common/data_type/form/document';
import { EntityToDocumentAdapter } from '@/utils/data-migration/entity-to-document';
import { DocumentToEntityMigrator } from '@/utils/data-migration/document-to-entity';

export class APICompatAdapter {
  /**
   * Document API 兼容层
   */
  static wrapDocumentAPI(entityAPI: any): any {
    return {
      // 获取文档列表
      getDocumentList: async (params: any) => {
        // 调用新的 Entity API
        const response = await entityAPI.getEntityList({
          ...params,
          scenarioId: 'shipping',
          entityType: 'ship_operation',
        });

        // 将 Entity 转换回 Document
        return {
          ...response,
          data: {
            ...response.data,
            list: response.data.list.map((entity: Entity) =>
              EntityToDocumentAdapter.toDocument(entity)
            ),
          },
        };
      },

      // 获取文档详情
      getDocument: async (documentId: string) => {
        const entity = await entityAPI.getEntity(documentId);
        return EntityToDocumentAdapter.toDocument(entity);
      },

      // 创建文档
      createDocument: async (document: DocumentType) => {
        const entity = DocumentToEntityMigrator.migrate(document);
        const created = await entityAPI.createEntity(entity);
        return EntityToDocumentAdapter.toDocument(created);
      },

      // 更新文档
      updateDocument: async (documentId: string, document: Partial<DocumentType>) => {
        const entity = DocumentToEntityMigrator.migrate(document as DocumentType);
        const updated = await entityAPI.updateEntity(documentId, entity);
        return EntityToDocumentAdapter.toDocument(updated);
      },

      // 删除文档
      deleteDocument: async (documentId: string) => {
        return await entityAPI.deleteEntity(documentId);
      },
    };
  }
}
\`\`\`

---

## 📦 实施步骤

### 步骤 1: 创建兼容层

\`\`\`bash
mkdir -p src/compat
touch src/compat/api-adapter.ts
touch src/compat/component-wrapper.tsx
touch src/compat/route-compat.ts
\`\`\`

### 步骤 2: 实现双写策略

\`\`\`typescript
/**
 * 双写控制器
 */
export class DualWriteController {
  async write(data: Entity): Promise<void> {
    // 写入新表
    await newAPI.createEntity(data);
    
    // 同时写入旧表
    const document = EntityToDocumentAdapter.toDocument(data);
    await oldAPI.createDocument(document);
  }
}
\`\`\`

### 步骤 3: 渐进式路由切换

\`\`\`typescript
/**
 * 路由兼容处理
 */
const routeCompat = {
  '/form/document': '/entity/ship_operation',
  '/form/document/:id': '/entity/ship_operation/:id',
  // 更多路由映射...
};
\`\`\`

---

## ✅ 验收标准

- [ ] 旧 API 调用正常工作
- [ ] 数据双写无冲突
- [ ] 路由重定向正确
- [ ] 旧组件可用
- [ ] 性能无明显下降

---

**版本**: v1.0
**创建日期**: 2025-01-13
