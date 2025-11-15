import { FormType } from '@/common/data_type/form/form';

/**
 * 行业字段工具函数
 *
 * 用于处理 industryFields 的提取和合并
 */

/**
 * 从 FormType 对象提取行业字段到 industryFields
 *
 * 说明：将16个字段从Form对象提取到industryFields Map中
 * 用于：保存表单前调用
 *
 * @param form FormType 对象
 * @returns 处理后的 FormType 对象
 */
export function extractIndustryFields(form: FormType): FormType {
  if (!form) {
    return form;
  }

  // 初始化 industryFields
  if (!form.industryFields) {
    form.industryFields = {};
  }

  // 提取16个字段到 JSON（与后端保持一致）
  const fieldsToExtract = [
    'platformCargoName',
    'domesticForeignTradeType',
    'bizType',
    'operationType',
    'portName',
    'voyageNo',
    'netTonnage',
    'grossTonnage',
    'deadWeightTonnage',
    'loadUnload',
    'englishShipName',
    'shipMmsi',
    'planedArrivingTime',
    'departureTime',
    'turnGroup',
    'turnNo',
  ];

  fieldsToExtract.forEach((fieldName) => {
    const value = form[fieldName as keyof FormType];
    if (value !== undefined && value !== null && value !== '') {
      form.industryFields![fieldName] = value;
    }
  });

  // 设置行业类型（如果未设置，默认为 PORT）
  if (!form.industryType) {
    form.industryType = 'PORT';
  }

  return form;
}

/**
 * 从 industryFields 合并字段回 FormType 对象
 *
 * 说明：将industryFields Map中的字段合并回Form对象（保持向后兼容）
 * 用于：查询表单后调用
 *
 * @param form FormType 对象
 * @returns 处理后的 FormType 对象
 */
export function mergeIndustryFields(form: FormType): FormType {
  if (!form || !form.industryFields) {
    return form;
  }

  const industryFields = form.industryFields;

  // 合并16个字段回 Form 对象（保持向后兼容）
  const fieldsThatMerge = [
    'platformCargoName',
    'domesticForeignTradeType',
    'bizType',
    'operationType',
    'portName',
    'voyageNo',
    'netTonnage',
    'grossTonnage',
    'deadWeightTonnage',
    'loadUnload',
    'englishShipName',
    'shipMmsi',
    'planedArrivingTime',
    'departureTime',
    'turnGroup',
    'turnNo',
  ];

  fieldsThatMerge.forEach((fieldName) => {
    const value = industryFields[fieldName];
    if (value !== undefined && value !== null) {
      (form as any)[fieldName] = value;
    }
  });

  return form;
}

/**
 * 获取 industryFields 中的字段值
 *
 * @param form FormType 对象
 * @param fieldName 字段名
 * @returns 字段值
 */
export function getIndustryFieldValue(
  form: FormType,
  fieldName: string
): any {
  if (!form || !form.industryFields) {
    return undefined;
  }
  return form.industryFields[fieldName];
}

/**
 * 设置 industryFields 中的字段值
 *
 * @param form FormType 对象
 * @param fieldName 字段名
 * @param value 字段值
 */
export function setIndustryFieldValue(
  form: FormType,
  fieldName: string,
  value: any
): void {
  if (!form) {
    return;
  }

  if (!form.industryFields) {
    form.industryFields = {};
  }

  form.industryFields[fieldName] = value;
}

/**
 * 批量设置 industryFields
 *
 * @param form FormType 对象
 * @param fields 字段键值对
 */
export function setIndustryFields(
  form: FormType,
  fields: Record<string, any>
): void {
  if (!form) {
    return;
  }

  if (!form.industryFields) {
    form.industryFields = {};
  }

  Object.assign(form.industryFields, fields);
}
