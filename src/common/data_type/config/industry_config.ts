/**
 * Tiger Cloud v4.0 - 配置管理系统类型定义
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

/**
 * 行业配置类型
 */
export interface IndustryConfigType {
  id?: number;
  industryType?: string;
  industryName?: string;
  configJson?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: string;
  createdTime?: string;
  updatedBy?: string;
  updatedTime?: string;
  deletedBy?: string;
  deletedTime?: string;
}

/**
 * 行业配置搜索参数
 */
export interface IndustryConfigSearchType {
  industryType?: string;
  industryName?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdBy?: string;
  createdTimeStart?: string;
  createdTimeEnd?: string;
}

/**
 * 配置版本类型
 */
export interface IndustryConfigVersionType {
  id?: number;
  configId?: number;
  industryType?: string;
  configJson?: string;
  operationType?: string;
  operator?: string;
  operationTime?: string;
  remark?: string;
}

/**
 * 配置版本搜索参数
 */
export interface IndustryConfigVersionSearchType {
  configId?: number;
  industryType?: string;
  operationType?: string;
  operator?: string;
  operationTimeStart?: string;
  operationTimeEnd?: string;
}

/**
 * 配置JSON结构（解析后的对象）
 */
export interface ConfigJsonType {
  fields?: ConfigFieldType[];
}

/**
 * 配置字段定义
 */
export interface ConfigFieldType {
  code: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'datetime' | 'select' | 'textarea';
  required?: boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  options?: ConfigFieldOptionType[];
  defaultValue?: any;
  placeholder?: string;
  description?: string;
}

/**
 * 字段选项（用于select类型）
 */
export interface ConfigFieldOptionType {
  label: string;
  value: string | number;
}
