import { IndustryConfig } from '@/common/data_type/form/form';

/**
 * 制造业行业字段配置
 *
 * 说明：定义制造业的 industryFields JSON 字段配置
 */
const manufacturingConfig: IndustryConfig = {
  code: 'MANUFACTURING',
  name: '制造业',
  fields: [
    // ==================== 产品基本信息 ====================
    {
      code: 'productName',
      name: '产品名称',
      type: 'STRING',
      required: true,
      placeholder: '请输入产品名称',
      maxLength: 200,
    },
    {
      code: 'productCode',
      name: '产品编号',
      type: 'STRING',
      required: true,
      placeholder: '请输入产品编号',
      maxLength: 100,
    },
    {
      code: 'productCategory',
      name: '产品类别',
      type: 'SELECT',
      required: true,
      placeholder: '请选择产品类别',
      options: [
        { label: '电子产品', value: 'ELECTRONICS' },
        { label: '机械设备', value: 'MACHINERY' },
        { label: '化工产品', value: 'CHEMICAL' },
        { label: '纺织品', value: 'TEXTILE' },
      ],
    },

    // ==================== 生产信息 ====================
    {
      code: 'productionDate',
      name: '生产日期',
      type: 'DATE',
      required: true,
      placeholder: '请选择生产日期',
    },
    {
      code: 'batchNumber',
      name: '批次号',
      type: 'STRING',
      required: true,
      placeholder: '请输入批次号',
      maxLength: 100,
    },
    {
      code: 'productionQuantity',
      name: '生产数量',
      type: 'NUMBER',
      required: true,
      placeholder: '请输入生产数量',
    },

    // ==================== 质量控制 ====================
    {
      code: 'qualityGrade',
      name: '质量等级',
      type: 'SELECT',
      required: true,
      placeholder: '请选择质量等级',
      options: [
        { label: '优等品', value: 'PREMIUM' },
        { label: '一等品', value: 'FIRST' },
        { label: '合格品', value: 'QUALIFIED' },
      ],
    },
    {
      code: 'inspector',
      name: '质检员',
      type: 'STRING',
      required: false,
      placeholder: '请输入质检员姓名',
      maxLength: 100,
    },
  ],
};

export default manufacturingConfig;
