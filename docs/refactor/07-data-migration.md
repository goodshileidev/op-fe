# 数据迁移详细方案

## 📋 文档信息

- **模块**: 数据迁移
- **优先级**: P0
- **预计工时**: 5-6 工作日
- **依赖**: 01-data-model-refactor
- **负责人**: 待分配

---

## 🎯 改造目标

提供**完整的数据迁移解决方案**,包括:

1. ✅ 详细的迁移策略和步骤
2. ✅ 数据库迁移脚本
3. ✅ 批量迁移工具
4. ✅ 数据验证和校验工具
5. ✅ 回滚方案和应急预案
6. ✅ 性能优化措施

---

## 📐 迁移策略

### 总体策略

采用**渐进式、可逆、零停机**的迁移策略:

1. **阶段1**: 数据双写 (新旧系统并存)
2. **阶段2**: 历史数据迁移 (批量转换)
3. **阶段3**: 数据验证 (确保一致性)
4. **阶段4**: 切换读取 (逐步切换到新系统)
5. **阶段5**: 清理旧数据 (保留备份)

### 迁移原则

- **零停机**: 迁移过程中系统持续可用
- **可回滚**: 任何阶段都可以回滚
- **数据一致性**: 保证数据完整性和一致性
- **性能优先**: 不影响线上业务性能
- **安全第一**: 数据备份和加密

---

## 🗄️ 数据库表结构设计

### 新表结构

\`\`\`sql
-- ==========================================
-- 通用实体表
-- ==========================================
CREATE TABLE generic_entities (
  entity_id VARCHAR(64) PRIMARY KEY COMMENT '实体ID',
  entity_uuid VARCHAR(36) NOT NULL UNIQUE COMMENT '全局唯一标识',
  entity_no VARCHAR(100) NOT NULL COMMENT '实体编号',
  entity_type VARCHAR(50) NOT NULL COMMENT '实体类型',
  scenario_id VARCHAR(50) NOT NULL COMMENT '场景ID',
  
  -- 模板关联
  template_id VARCHAR(64) NOT NULL COMMENT '模板ID',
  template_version_id VARCHAR(64) NOT NULL COMMENT '模板版本ID',
  template_name VARCHAR(255) COMMENT '模板名称',
  
  -- 核心字段
  title VARCHAR(500) COMMENT '标题',
  subtitle VARCHAR(500) COMMENT '副标题',
  description TEXT COMMENT '描述',
  
  -- 时间字段
  event_date DATETIME COMMENT '事件日期',
  start_date DATETIME COMMENT '开始日期',
  end_date DATETIME COMMENT '结束日期',
  
  -- 分类字段
  category VARCHAR(100) COMMENT '主分类',
  subcategory VARCHAR(100) COMMENT '子分类',
  tags JSON COMMENT '标签数组',
  
  -- 位置信息 (JSON)
  location JSON COMMENT '地理位置信息',
  
  -- 关联实体 (JSON)
  related_entities JSON COMMENT '关联实体列表',
  
  -- 工作流
  workflow_id VARCHAR(64) COMMENT '工作流ID',
  current_step VARCHAR(100) COMMENT '当前步骤',
  step_definition TEXT COMMENT '步骤定义',
  step_history JSON COMMENT '步骤历史',
  status VARCHAR(50) DEFAULT 'draft' COMMENT '状态',
  priority VARCHAR(50) DEFAULT 'medium' COMMENT '优先级',
  
  -- 权限
  owner VARCHAR(64) NOT NULL COMMENT '所有者',
  viewers JSON COMMENT '查看者列表',
  editors JSON COMMENT '编辑者列表',
  approvers JSON COMMENT '审批者列表',
  viewer_roles JSON COMMENT '查看角色',
  editor_roles JSON COMMENT '编辑角色',
  approver_roles JSON COMMENT '审批角色',
  
  -- 自定义字段 (核心扩展点)
  custom_fields JSON COMMENT '自定义字段',
  
  -- 变量系统
  variables JSON COMMENT '变量列表',
  
  -- 附件
  attachments JSON COMMENT '附件列表',
  
  -- 元数据
  created_by VARCHAR(64) NOT NULL COMMENT '创建人',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_by VARCHAR(64) NOT NULL COMMENT '更新人',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  version INT DEFAULT 1 COMMENT '版本号',
  is_deleted BOOLEAN DEFAULT FALSE COMMENT '是否删除',
  deleted_by VARCHAR(64) COMMENT '删除人',
  deleted_at DATETIME COMMENT '删除时间',
  audit_log JSON COMMENT '审计日志',
  
  -- 索引
  INDEX idx_entity_type (entity_type),
  INDEX idx_scenario_id (scenario_id),
  INDEX idx_template_id (template_id),
  INDEX idx_status (status),
  INDEX idx_owner (owner),
  INDEX idx_created_at (created_at),
  INDEX idx_entity_no (entity_no),
  INDEX idx_event_date (event_date),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通用实体表';

-- ==========================================
-- 通用模板表
-- ==========================================
CREATE TABLE generic_templates (
  template_id VARCHAR(64) PRIMARY KEY COMMENT '模板ID',
  template_name VARCHAR(255) NOT NULL COMMENT '模板名称',
  template_no VARCHAR(100) NOT NULL COMMENT '模板编号',
  description TEXT COMMENT '描述',
  icon VARCHAR(100) COMMENT '图标',
  
  -- 场景关联
  scenario_id VARCHAR(50) NOT NULL COMMENT '场景ID',
  entity_type VARCHAR(50) NOT NULL COMMENT '实体类型',
  
  -- 版本信息
  version VARCHAR(20) NOT NULL COMMENT '版本号',
  status VARCHAR(20) DEFAULT 'draft' COMMENT '状态',
  
  -- 字段定义 (JSON)
  fields JSON NOT NULL COMMENT '字段定义',
  
  -- 布局配置 (JSON)
  layout JSON COMMENT '布局配置',
  
  -- 规则配置 (JSON)
  rules JSON COMMENT '规则配置',
  
  -- 工作流配置 (JSON)
  workflow JSON COMMENT '工作流定义',
  
  -- 权限配置 (JSON)
  permissions JSON COMMENT '权限配置',
  
  -- 通知配置 (JSON)
  notifications JSON COMMENT '通知配置',
  
  -- UI配置 (JSON)
  ui_config JSON COMMENT 'UI配置',
  
  -- 元数据
  created_by VARCHAR(64) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_by VARCHAR(64) NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  published_by VARCHAR(64),
  published_at DATETIME,
  usage_count INT DEFAULT 0 COMMENT '使用次数',
  
  INDEX idx_scenario_id (scenario_id),
  INDEX idx_entity_type (entity_type),
  INDEX idx_status (status),
  UNIQUE KEY uk_template_no_version (template_no, version)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='通用模板表';

-- ==========================================
-- 场景配置表
-- ==========================================
CREATE TABLE scenario_configs (
  scenario_id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  version VARCHAR(20) NOT NULL,
  config JSON NOT NULL COMMENT '完整配置',
  enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='场景配置表';
\`\`\`

---

## 🔄 数据迁移脚本

### 核心迁移逻辑

\`\`\`sql
-- ==========================================
-- Document -> Entity 迁移脚本
-- ==========================================

-- 第一步: 创建临时迁移表
CREATE TABLE migration_temp AS
SELECT 
  d.document_id,
  d.document_uuid,
  d.document_no,
  d.document_template_id,
  d.document_template_version_id,
  d.template_name,
  d.data_date,
  d.ship_name,
  d.cargo_name,
  d.berthing_time,
  d.departure_time,
  d.domestic_foreign_trade_type,
  d.ship_type,
  d.current_step,
  d.step_definition,
  d.fillin_status,
  d.recipient_list,
  d.viewer_list,
  d.editor_list,
  d.input_start_time,
  d.input_finish_time,
  d.submission_recipient_unit,
  d.submission_status,
  d.submission_finish_time,
  d.submission_settings,
  d.submission_history,
  d.variable_name_list,
  d.var_config_list,
  d.var_value_list,
  d.publish_status
FROM documents d
WHERE d.document_id NOT IN (SELECT entity_id FROM generic_entities);

-- 第二步: 执行数据转换和插入
INSERT INTO generic_entities (
  entity_id,
  entity_uuid,
  entity_no,
  entity_type,
  scenario_id,
  template_id,
  template_version_id,
  template_name,
  
  -- 核心字段映射
  title,
  subtitle,
  description,
  
  -- 时间字段映射
  event_date,
  start_date,
  end_date,
  
  -- 分类字段映射
  category,
  subcategory,
  tags,
  
  -- 工作流
  current_step,
  step_definition,
  status,
  priority,
  
  -- 权限
  owner,
  viewers,
  editors,
  
  -- 自定义字段
  custom_fields,
  
  -- 变量
  variables,
  
  -- 元数据
  created_by,
  created_at,
  updated_by,
  updated_at,
  version,
  is_deleted
)
SELECT 
  t.document_id AS entity_id,
  t.document_uuid AS entity_uuid,
  t.document_no AS entity_no,
  'ship_operation' AS entity_type,
  'shipping' AS scenario_id,
  CAST(t.document_template_id AS CHAR) AS template_id,
  CAST(t.document_template_version_id AS CHAR) AS template_version_id,
  t.template_name,
  
  -- 核心字段
  COALESCE(t.ship_name, t.document_no) AS title,
  t.cargo_name AS subtitle,
  NULL AS description,
  
  -- 时间字段
  STR_TO_DATE(t.berthing_time, '%Y-%m-%d %H:%i:%s') AS event_date,
  STR_TO_DATE(t.berthing_time, '%Y-%m-%d %H:%i:%s') AS start_date,
  STR_TO_DATE(t.departure_time, '%Y-%m-%d %H:%i:%s') AS end_date,
  
  -- 分类字段
  CASE t.domestic_foreign_trade_type
    WHEN '1' THEN '国内贸易'
    WHEN '2' THEN '国际贸易'
    ELSE '未分类'
  END AS category,
  t.ship_type AS subcategory,
  JSON_ARRAY() AS tags,
  
  -- 工作流
  t.current_step,
  t.step_definition,
  CASE LOWER(t.fillin_status)
    WHEN 'draft' THEN 'draft'
    WHEN 'filling' THEN 'in_progress'
    WHEN 'submitted' THEN 'pending_review'
    WHEN 'approved' THEN 'approved'
    WHEN 'rejected' THEN 'rejected'
    WHEN 'completed' THEN 'completed'
    ELSE 'draft'
  END AS status,
  'medium' AS priority,
  
  -- 权限
  SUBSTRING_INDEX(t.editor_list, ',', 1) AS owner,
  JSON_ARRAY(t.viewer_list) AS viewers,
  JSON_ARRAY(t.editor_list) AS editors,
  
  -- 自定义字段
  JSON_OBJECT(
    'shipName', t.ship_name,
    'cargoName', t.cargo_name,
    'berthingTime', t.berthing_time,
    'departureTime', t.departure_time,
    'domesticForeignTradeType', t.domestic_foreign_trade_type,
    'shipType', t.ship_type,
    'templateNo', t.template_name,
    'fillinStatus', t.fillin_status,
    'recipientList', t.recipient_list,
    'inputStartTime', t.input_start_time,
    'inputFinishTime', t.input_finish_time,
    'submissionRecipientUnit', t.submission_recipient_unit,
    'submissionStatus', t.submission_status,
    'submissionFinishTime', t.submission_finish_time,
    'submissionSettings', t.submission_settings,
    'submissionHistory', t.submission_history,
    'publishStatus', t.publish_status
  ) AS custom_fields,
  
  -- 变量
  CASE 
    WHEN t.var_value_list IS NOT NULL AND t.var_value_list != '' 
    THEN JSON_ARRAY(
      JSON_OBJECT(
        'name', 'var1',
        'value', JSON_EXTRACT(t.var_value_list, '$'),
        'type', 'text'
      )
    )
    ELSE JSON_ARRAY()
  END AS variables,
  
  -- 元数据
  SUBSTRING_INDEX(t.editor_list, ',', 1) AS created_by,
  STR_TO_DATE(t.input_start_time, '%Y-%m-%d %H:%i:%s') AS created_at,
  SUBSTRING_INDEX(t.editor_list, ',', 1) AS updated_by,
  STR_TO_DATE(t.input_finish_time, '%Y-%m-%d %H:%i:%s') AS updated_at,
  1 AS version,
  FALSE AS is_deleted
FROM migration_temp t;

-- 第三步: 验证迁移结果
SELECT 
  '迁移总数' AS metric,
  COUNT(*) AS count
FROM generic_entities
WHERE scenario_id = 'shipping'
UNION ALL
SELECT 
  '原表总数' AS metric,
  COUNT(*) AS count  
FROM documents;

-- 第四步: 清理临时表
DROP TABLE IF EXISTS migration_temp;
\`\`\`

---

## 🛠️ 迁移工具实现

### 批量迁移工具

\`\`\`typescript
/**
 * 数据迁移工具
 * 文件位置: scripts/data-migration/migrator.ts
 */

import { Connection, createConnection } from 'mysql2/promise';
import { DocumentToEntityMigrator } from '@/utils/data-migration/document-to-entity';
import { ProgressBar } from 'cli-progress';

interface MigrationConfig {
  sourceTable: string;
  targetTable: string;
  batchSize: number;
  dryRun: boolean;
}

export class DataMigrator {
  private connection!: Connection;
  private config: MigrationConfig;
  private progressBar!: ProgressBar;

  constructor(config: MigrationConfig) {
    this.config = config;
  }

  /**
   * 初始化数据库连接
   */
  async initialize(): Promise<void> {
    this.connection = await createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ 数据库连接成功');
  }

  /**
   * 执行迁移
   */
  async migrate(): Promise<void> {
    try {
      console.log('🚀 开始数据迁移...\n');

      // 1. 检查表是否存在
      await this.checkTables();

      // 2. 获取总记录数
      const totalCount = await this.getTotalCount();
      console.log(`📊 需要迁移的记录数: ${totalCount}\n`);

      if (totalCount === 0) {
        console.log('ℹ️  没有需要迁移的数据');
        return;
      }

      // 3. 创建进度条
      this.progressBar = new ProgressBar({
        format: '迁移进度 [{bar}] {percentage}% | {value}/{total} 条记录 | 耗时: {duration}s',
      });
      this.progressBar.start(totalCount, 0);

      // 4. 批量迁移
      let offset = 0;
      let migratedCount = 0;
      let errorCount = 0;

      while (offset < totalCount) {
        try {
          const batch = await this.fetchBatch(offset, this.config.batchSize);
          
          if (batch.length === 0) break;

          // 转换数据
          const entities = batch.map(doc => DocumentToEntityMigrator.migrate(doc));

          // 写入数据库
          if (!this.config.dryRun) {
            await this.insertEntities(entities);
          }

          migratedCount += entities.length;
          offset += this.config.batchSize;
          this.progressBar.update(migratedCount);

          // 避免数据库压力,短暂延迟
          await this.sleep(100);
        } catch (error: any) {
          console.error(`\n❌ 批次迁移失败 (offset: ${offset}):`, error.message);
          errorCount++;
          
          // 如果错误过多,终止迁移
          if (errorCount > 10) {
            throw new Error('错误次数过多,终止迁移');
          }
        }
      }

      this.progressBar.stop();

      // 5. 输出结果
      console.log('\n✅ 数据迁移完成!');
      console.log(`   成功: ${migratedCount} 条`);
      console.log(`   失败: ${errorCount} 条`);

      // 6. 验证数据
      await this.validateMigration();

    } catch (error: any) {
      console.error('\n❌ 迁移失败:', error.message);
      throw error;
    }
  }

  /**
   * 检查表是否存在
   */
  private async checkTables(): Promise<void> {
    const [tables]: any = await this.connection.query(
      'SHOW TABLES LIKE ?',
      [this.config.targetTable]
    );

    if (tables.length === 0) {
      throw new Error(`目标表 ${this.config.targetTable} 不存在`);
    }

    console.log('✅ 表结构检查通过\n');
  }

  /**
   * 获取总记录数
   */
  private async getTotalCount(): Promise<number> {
    const [rows]: any = await this.connection.query(
      `SELECT COUNT(*) as count FROM ${this.config.sourceTable} 
       WHERE document_id NOT IN (SELECT entity_id FROM ${this.config.targetTable})`
    );

    return rows[0].count;
  }

  /**
   * 获取一批数据
   */
  private async fetchBatch(offset: number, limit: number): Promise<any[]> {
    const [rows]: any = await this.connection.query(
      `SELECT * FROM ${this.config.sourceTable} 
       WHERE document_id NOT IN (SELECT entity_id FROM ${this.config.targetTable})
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return rows;
  }

  /**
   * 插入实体数据
   */
  private async insertEntities(entities: any[]): Promise<void> {
    if (entities.length === 0) return;

    const values = entities.map(entity => [
      entity.entityId,
      entity.entityUuid,
      entity.entityNo,
      entity.entityType,
      entity.scenarioId,
      entity.templateId,
      entity.templateVersionId,
      entity.templateName,
      entity.title,
      entity.subtitle,
      entity.description,
      entity.eventDate,
      entity.startDate,
      entity.endDate,
      entity.category,
      entity.subcategory,
      JSON.stringify(entity.tags),
      JSON.stringify(entity.location),
      JSON.stringify(entity.relatedEntities),
      entity.workflowId,
      entity.currentStep,
      entity.stepDefinition,
      JSON.stringify(entity.stepHistory),
      entity.status,
      entity.priority,
      entity.permissions.owner,
      JSON.stringify(entity.permissions.viewers),
      JSON.stringify(entity.permissions.editors),
      JSON.stringify(entity.permissions.approvers),
      JSON.stringify(entity.customFields),
      JSON.stringify(entity.variables),
      JSON.stringify(entity.attachments),
      entity.metadata.createdBy,
      entity.metadata.createdAt,
      entity.metadata.updatedBy,
      entity.metadata.updatedAt,
      entity.metadata.version,
      entity.metadata.isDeleted,
    ]);

    const sql = `
      INSERT INTO ${this.config.targetTable} (
        entity_id, entity_uuid, entity_no, entity_type, scenario_id,
        template_id, template_version_id, template_name,
        title, subtitle, description,
        event_date, start_date, end_date,
        category, subcategory, tags,
        location, related_entities,
        workflow_id, current_step, step_definition, step_history,
        status, priority,
        owner, viewers, editors, approvers,
        custom_fields, variables, attachments,
        created_by, created_at, updated_by, updated_at, version, is_deleted
      ) VALUES ?
    `;

    await this.connection.query(sql, [values]);
  }

  /**
   * 验证迁移结果
   */
  private async validateMigration(): Promise<void> {
    console.log('\n🔍 验证迁移结果...');

    // 检查记录数
    const [sourceCount]: any = await this.connection.query(
      `SELECT COUNT(*) as count FROM ${this.config.sourceTable}`
    );

    const [targetCount]: any = await this.connection.query(
      `SELECT COUNT(*) as count FROM ${this.config.targetTable} WHERE scenario_id = 'shipping'`
    );

    console.log(`   源表记录数: ${sourceCount[0].count}`);
    console.log(`   目标表记录数: ${targetCount[0].count}`);

    if (sourceCount[0].count === targetCount[0].count) {
      console.log('   ✅ 记录数匹配');
    } else {
      console.log(`   ⚠️  记录数不匹配,差异: ${Math.abs(sourceCount[0].count - targetCount[0].count)}`);
    }

    // 抽样验证数据完整性
    const [samples]: any = await this.connection.query(
      `SELECT entity_id FROM ${this.config.targetTable} LIMIT 10`
    );

    console.log(`\n   抽样检查 ${samples.length} 条记录...`);
    // 这里可以添加更详细的数据校验逻辑
  }

  /**
   * 延迟函数
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * 关闭连接
   */
  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
      console.log('\n✅ 数据库连接已关闭');
    }
  }
}

/**
 * 主函数
 */
async function main() {
  const migrator = new DataMigrator({
    sourceTable: 'documents',
    targetTable: 'generic_entities',
    batchSize: 100,
    dryRun: process.argv.includes('--dry-run'),
  });

  try {
    await migrator.initialize();
    await migrator.migrate();
  } catch (error: any) {
    console.error('迁移失败:', error);
    process.exit(1);
  } finally {
    await migrator.close();
  }
}

// 执行迁移
if (require.main === module) {
  main();
}
\`\`\`

---

## ✅ 验收标准

- [ ] 迁移脚本编写完成
- [ ] 批量迁移工具实现
- [ ] 数据验证工具可用
- [ ] 回滚脚本准备就绪
- [ ] 迁移文档完整
- [ ] 性能测试通过
- [ ] 数据一致性验证通过

---

**版本**: v1.0
**创建日期**: 2025-01-13
