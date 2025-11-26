/**
 * Tiger Cloud v4.0 - 配置管理系统Service
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import {
  requestSearchIndustryConfig,
  requestCreateIndustryConfig,
  requestUpdateIndustryConfig,
  requestDeleteIndustryConfig,
  requestEnableIndustryConfig,
  requestDisableIndustryConfig,
  requestRestoreIndustryConfig,
  requestGetIndustryConfigById,
  requestGetIndustryConfigByType,
  requestListIndustryConfig,
  requestSearchIndustryConfigVersion,
  requestCreateIndustryConfigVersion,
  requestUpdateIndustryConfigVersion,
  requestDeleteIndustryConfigVersion,
  requestGetIndustryConfigVersionById,
  requestListIndustryConfigVersionByConfigId,
  requestRollbackIndustryConfigVersion,
  requestListIndustryConfigVersion
} from '@/common/api/config/industry_config';
import { IndustryConfigType, IndustryConfigSearchType, IndustryConfigVersionType, IndustryConfigVersionSearchType } from '@/common/data_type/config/industry_config';

/**
 * ============================================================================
 * 行业配置Service
 * ============================================================================
 */

/**
 * 转换配置对象（解析configJson）
 */
const transformIndustryConfig = (config: IndustryConfigType) => {
  if (config.configJson && typeof config.configJson === 'string') {
    try {
      config.configJson = JSON.parse(config.configJson);
    } catch (e) {
      console.error('Failed to parse configJson:', e);
    }
  }
  return config;
};

/**
 * 转换配置对象列表
 */
const transformIndustryConfigList = (list: IndustryConfigType[]) => {
  if (list && Array.isArray(list)) {
    return list.map(item => transformIndustryConfig(item));
  }
  return list;
};

/**
 * 准备配置对象（序列化configJson）
 */
const prepareIndustryConfig = (config: IndustryConfigType) => {
  const params = JSON.parse(JSON.stringify(config));
  if (params.configJson && typeof params.configJson === 'object') {
    params.configJson = JSON.stringify(params.configJson);
  }
  return params;
};

/**
 * 查询行业配置（分页）
 */
export const searchIndustryConfig = (data: IndustryConfigSearchType | Record<string, any>) => {
  const params = JSON.parse(JSON.stringify(data));

  return requestSearchIndustryConfig(params).then((response) => {
    let data = response.data;
    if (data && data.list) {
      data.list = transformIndustryConfigList(data.list);
    }
    return response;
  });
};

/**
 * 创建行业配置
 */
export const createIndustryConfig = (data: IndustryConfigType) => {
  const params = prepareIndustryConfig(data);

  return requestCreateIndustryConfig(params).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfig(data);
    }
    return response;
  });
};

/**
 * 更新行业配置
 */
export const updateIndustryConfig = (data: IndustryConfigType) => {
  const params = prepareIndustryConfig(data);

  return requestUpdateIndustryConfig(params).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfig(data);
    }
    return response;
  });
};

/**
 * 删除行业配置
 */
export const deleteIndustryConfig = (id: number) => {
  return requestDeleteIndustryConfig(id);
};

/**
 * 启用行业配置
 */
export const enableIndustryConfig = (id: number) => {
  return requestEnableIndustryConfig(id);
};

/**
 * 禁用行业配置
 */
export const disableIndustryConfig = (id: number) => {
  return requestDisableIndustryConfig(id);
};

/**
 * 恢复已删除的行业配置
 */
export const restoreIndustryConfig = (id: number) => {
  return requestRestoreIndustryConfig(id);
};

/**
 * 根据ID查询行业配置
 */
export const getIndustryConfigById = (id: number) => {
  return requestGetIndustryConfigById(id).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfig(data);
    }
    return response;
  });
};

/**
 * 根据场景类型查询行业配置
 */
export const getIndustryConfigByType = (industryType: string) => {
  return requestGetIndustryConfigByType(industryType).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfig(data);
    }
    return response;
  });
};

/**
 * 查询行业配置列表（不分页）
 */
export const listIndustryConfig = (data: IndustryConfigSearchType) => {
  const params = JSON.parse(JSON.stringify(data));

  return requestListIndustryConfig(params).then((response) => {
    let data = response.data;
    if (data && Array.isArray(data)) {
      data = transformIndustryConfigList(data);
    }
    return response;
  });
};

/**
 * ============================================================================
 * 配置版本Service
 * ============================================================================
 */

/**
 * 转换配置版本对象（解析configJson）
 */
const transformIndustryConfigVersion = (version: IndustryConfigVersionType) => {
  if (version.configJson && typeof version.configJson === 'string') {
    try {
      version.configJson = JSON.parse(version.configJson);
    } catch (e) {
      console.error('Failed to parse configJson:', e);
    }
  }
  return version;
};

/**
 * 转换配置版本对象列表
 */
const transformIndustryConfigVersionList = (list: IndustryConfigVersionType[]) => {
  if (list && Array.isArray(list)) {
    return list.map(item => transformIndustryConfigVersion(item));
  }
  return list;
};

/**
 * 准备配置版本对象（序列化configJson）
 */
const prepareIndustryConfigVersion = (version: IndustryConfigVersionType) => {
  const params = JSON.parse(JSON.stringify(version));
  if (params.configJson && typeof params.configJson === 'object') {
    params.configJson = JSON.stringify(params.configJson);
  }
  return params;
};

/**
 * 查询配置版本（分页）
 */
export const searchIndustryConfigVersion = (data: IndustryConfigVersionSearchType | Record<string, any>) => {
  const params = JSON.parse(JSON.stringify(data));

  return requestSearchIndustryConfigVersion(params).then((response) => {
    let data = response.data;
    if (data && data.list) {
      data.list = transformIndustryConfigVersionList(data.list);
    }
    return response;
  });
};

/**
 * 创建配置版本
 */
export const createIndustryConfigVersion = (data: IndustryConfigVersionType) => {
  const params = prepareIndustryConfigVersion(data);

  return requestCreateIndustryConfigVersion(params).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfigVersion(data);
    }
    return response;
  });
};

/**
 * 更新配置版本
 */
export const updateIndustryConfigVersion = (data: IndustryConfigVersionType) => {
  const params = prepareIndustryConfigVersion(data);

  return requestUpdateIndustryConfigVersion(params).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfigVersion(data);
    }
    return response;
  });
};

/**
 * 删除配置版本
 */
export const deleteIndustryConfigVersion = (id: number) => {
  return requestDeleteIndustryConfigVersion(id);
};

/**
 * 根据ID查询配置版本
 */
export const getIndustryConfigVersionById = (id: number) => {
  return requestGetIndustryConfigVersionById(id).then((response) => {
    const data = response.data;
    if (data) {
      return transformIndustryConfigVersion(data);
    }
    return response;
  });
};

/**
 * 根据配置ID查询版本列表
 */
export const listIndustryConfigVersionByConfigId = (configId: number) => {
  return requestListIndustryConfigVersionByConfigId(configId).then((response) => {
    let data = response.data;
    if (data && Array.isArray(data)) {
      data = transformIndustryConfigVersionList(data);
    }
    return response;
  });
};

/**
 * 回滚到指定版本
 */
export const rollbackIndustryConfigVersion = (configId: number, versionId: number, operator: string) => {
  return requestRollbackIndustryConfigVersion({ configId, versionId, operator });
};

/**
 * 查询配置版本列表（不分页）
 */
export const listIndustryConfigVersion = (data: IndustryConfigVersionSearchType) => {
  const params = JSON.parse(JSON.stringify(data));

  return requestListIndustryConfigVersion(params).then((response) => {
    let data = response.data;
    if (data && Array.isArray(data)) {
      data = transformIndustryConfigVersionList(data);
    }
    return response;
  });
};
