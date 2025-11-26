/**
 * Tiger Cloud v4.0 - 配置管理系统API
 *
 * @author Tiger Cloud Platform
 * @date 2025-11-26
 */

import request from '@/common/axios';
import { IndustryConfigType, IndustryConfigSearchType, IndustryConfigVersionType, IndustryConfigVersionSearchType } from '@/common/data_type/config/industry_config';

/**
 * ============================================================================
 * 行业配置API
 * ============================================================================
 */

/**
 * 查询行业配置（分页）
 */
export function requestSearchIndustryConfig(params: any) {
  return request({
    url: '/config/industryConfig/search',
    method: 'post',
    data: params
  });
}

/**
 * 创建行业配置
 */
export function requestCreateIndustryConfig(data: IndustryConfigType) {
  return request({
    url: '/config/industryConfig/create',
    method: 'post',
    data: data
  });
}

/**
 * 更新行业配置
 */
export function requestUpdateIndustryConfig(data: IndustryConfigType) {
  return request({
    url: '/config/industryConfig/update',
    method: 'post',
    data: data
  });
}

/**
 * 删除行业配置
 */
export function requestDeleteIndustryConfig(id: number) {
  return request({
    url: `/config/industryConfig/delete/${id}`,
    method: 'get'
  });
}

/**
 * 启用行业配置
 */
export function requestEnableIndustryConfig(id: number) {
  return request({
    url: `/config/industryConfig/enable/${id}`,
    method: 'get'
  });
}

/**
 * 禁用行业配置
 */
export function requestDisableIndustryConfig(id: number) {
  return request({
    url: `/config/industryConfig/disable/${id}`,
    method: 'get'
  });
}

/**
 * 恢复已删除的行业配置
 */
export function requestRestoreIndustryConfig(id: number) {
  return request({
    url: `/config/industryConfig/restore/${id}`,
    method: 'get'
  });
}

/**
 * 根据ID查询行业配置
 */
export function requestGetIndustryConfigById(id: number) {
  return request({
    url: `/config/industryConfig/getById/${id}`,
    method: 'get'
  });
}

/**
 * 根据场景类型查询行业配置
 */
export function requestGetIndustryConfigByType(industryType: string) {
  return request({
    url: `/config/industryConfig/getByIndustryType/${industryType}`,
    method: 'get'
  });
}

/**
 * 查询行业配置列表（不分页）
 */
export function requestListIndustryConfig(data: IndustryConfigSearchType) {
  return request({
    url: '/config/industryConfig/list',
    method: 'post',
    data: data
  });
}

/**
 * ============================================================================
 * 配置版本API
 * ============================================================================
 */

/**
 * 查询配置版本（分页）
 */
export function requestSearchIndustryConfigVersion(params: any) {
  return request({
    url: '/config/industryConfigVersion/search',
    method: 'post',
    data: params
  });
}

/**
 * 创建配置版本
 */
export function requestCreateIndustryConfigVersion(data: IndustryConfigVersionType) {
  return request({
    url: '/config/industryConfigVersion/create',
    method: 'post',
    data: data
  });
}

/**
 * 更新配置版本
 */
export function requestUpdateIndustryConfigVersion(data: IndustryConfigVersionType) {
  return request({
    url: '/config/industryConfigVersion/update',
    method: 'post',
    data: data
  });
}

/**
 * 删除配置版本
 */
export function requestDeleteIndustryConfigVersion(id: number) {
  return request({
    url: `/config/industryConfigVersion/delete/${id}`,
    method: 'get'
  });
}

/**
 * 根据ID查询配置版本
 */
export function requestGetIndustryConfigVersionById(id: number) {
  return request({
    url: `/config/industryConfigVersion/getById/${id}`,
    method: 'get'
  });
}

/**
 * 根据配置ID查询版本列表
 */
export function requestListIndustryConfigVersionByConfigId(configId: number) {
  return request({
    url: `/config/industryConfigVersion/listByConfigId/${configId}`,
    method: 'get'
  });
}

/**
 * 回滚到指定版本
 */
export function requestRollbackIndustryConfigVersion(params: { configId: number; versionId: number; operator: string }) {
  return request({
    url: '/config/industryConfigVersion/rollback',
    method: 'post',
    params: params
  });
}

/**
 * 查询配置版本列表（不分页）
 */
export function requestListIndustryConfigVersion(data: IndustryConfigVersionSearchType) {
  return request({
    url: '/config/industryConfigVersion/list',
    method: 'post',
    data: data
  });
}
