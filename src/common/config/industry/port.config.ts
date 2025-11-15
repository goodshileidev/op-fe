import { IndustryConfig } from '@/common/data_type/form/form';

/**
 * 港口行业字段配置
 *
 * 说明：定义港口行业的 industryFields JSON 字段配置
 * 包含16个字段（除去shipName, cargoName, berthingTime三个高频字段）
 */
const portConfig: IndustryConfig = {
  code: 'PORT',
  name: '港口航运',
  fields: [
    // ==================== 基础信息 ====================
    {
      code: 'platformCargoName',
      name: '平台货物名称',
      type: 'STRING',
      required: false,
      placeholder: '请输入平台货物名称',
      maxLength: 200,
    },
    {
      code: 'domesticForeignTradeType',
      name: '内外贸类型',
      type: 'SELECT',
      required: false,
      placeholder: '请选择内外贸类型',
      options: [
        { label: '内贸', value: 'DOMESTIC' },
        { label: '外贸', value: 'FOREIGN' },
      ],
    },
    {
      code: 'bizType',
      name: '业务类型',
      type: 'SELECT',
      required: false,
      placeholder: '请选择业务类型',
      options: [
        { label: '煤盐', value: 'MEI_YAN' },
        { label: '化工', value: 'HUA_GONG' },
      ],
    },
    {
      code: 'operationType',
      name: '作业类型',
      type: 'SELECT',
      required: false,
      placeholder: '请选择作业类型',
      options: [
        { label: '装', value: 'LOAD' },
        { label: '卸', value: 'UNLOAD' },
        { label: '装卸', value: 'LOAD_UNLOAD' },
      ],
    },

    // ==================== 泊位信息 ====================
    {
      code: 'portName',
      name: '泊位名称',
      type: 'STRING',
      required: false,
      placeholder: '请输入泊位名称',
      maxLength: 200,
    },

    // ==================== 船舶信息 ====================
    {
      code: 'voyageNo',
      name: '航次号',
      type: 'STRING',
      required: false,
      placeholder: '请输入航次号',
      maxLength: 100,
    },
    {
      code: 'englishShipName',
      name: '英文船名',
      type: 'STRING',
      required: false,
      placeholder: '请输入英文船名',
      maxLength: 200,
    },
    {
      code: 'shipMmsi',
      name: '船舶MMSI',
      type: 'STRING',
      required: false,
      placeholder: '请输入9位MMSI号码',
      maxLength: 9,
    },

    // ==================== 吨位信息 ====================
    {
      code: 'netTonnage',
      name: '净吨位',
      type: 'STRING',
      required: false,
      placeholder: '请输入净吨位',
      maxLength: 50,
    },
    {
      code: 'grossTonnage',
      name: '总吨位',
      type: 'STRING',
      required: false,
      placeholder: '请输入总吨位',
      maxLength: 50,
    },
    {
      code: 'deadWeightTonnage',
      name: '载重吨',
      type: 'STRING',
      required: false,
      placeholder: '请输入载重吨',
      maxLength: 50,
    },

    // ==================== 装卸信息 ====================
    {
      code: 'loadUnload',
      name: '装卸情况',
      type: 'STRING',
      required: false,
      placeholder: '请输入装卸情况',
      maxLength: 200,
    },

    // ==================== 时间信息 ====================
    {
      code: 'planedArrivingTime',
      name: '计划抵港时间',
      type: 'DATE',
      required: false,
      placeholder: '请选择计划抵港时间',
    },
    {
      code: 'departureTime',
      name: '离泊时间',
      type: 'DATE',
      required: false,
      placeholder: '请选择离泊时间',
    },

    // ==================== 班次信息 ====================
    {
      code: 'turnGroup',
      name: '班组',
      type: 'STRING',
      required: false,
      placeholder: '请输入班组',
      maxLength: 50,
    },
    {
      code: 'turnNo',
      name: '班次',
      type: 'STRING',
      required: false,
      placeholder: '请输入班次',
      maxLength: 50,
    },
  ],
};

export default portConfig;
