import { IndustryConfig } from '@/common/data_type/form/form';
import portConfig from './port.config';
import medicalConfig from './medical.config';
import manufacturingConfig from './manufacturing.config';

/**
 * 行业配置映射
 */
const industryConfigs: Record<string, IndustryConfig> = {
  PORT: portConfig,
  MEDICAL: medicalConfig,
  MANUFACTURING: manufacturingConfig,
};

/**
 * 获取行业配置
 *
 * @param industryType 行业类型
 * @returns 行业配置对象
 */
export function getIndustryConfig(industryType: string): IndustryConfig {
  return industryConfigs[industryType] || industryConfigs.PORT;
}

/**
 * 获取所有行业列表
 *
 * @returns 行业列表
 */
export function getAllIndustries(): Array<{ code: string; name: string }> {
  return Object.values(industryConfigs).map((config) => ({
    code: config.code,
    name: config.name,
  }));
}

export { portConfig, medicalConfig, manufacturingConfig };
