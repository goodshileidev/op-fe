import { IndustryConfig } from '@/common/data_type/form/form';

/**
 * 医疗行业字段配置
 *
 * 说明：定义医疗行业的 industryFields JSON 字段配置
 */
const medicalConfig: IndustryConfig = {
  code: 'MEDICAL',
  name: '医疗健康',
  fields: [
    // ==================== 患者基本信息 ====================
    {
      code: 'patientName',
      name: '患者姓名',
      type: 'STRING',
      required: true,
      placeholder: '请输入患者姓名',
      maxLength: 100,
    },
    {
      code: 'patientId',
      name: '患者ID',
      type: 'STRING',
      required: true,
      placeholder: '请输入患者ID',
      maxLength: 50,
    },
    {
      code: 'patientGender',
      name: '性别',
      type: 'SELECT',
      required: true,
      placeholder: '请选择性别',
      options: [
        { label: '男', value: 'MALE' },
        { label: '女', value: 'FEMALE' },
        { label: '其他', value: 'OTHER' },
      ],
    },
    {
      code: 'patientAge',
      name: '年龄',
      type: 'NUMBER',
      required: true,
      placeholder: '请输入年龄',
    },

    // ==================== 就诊信息 ====================
    {
      code: 'visitDate',
      name: '就诊日期',
      type: 'DATE',
      required: true,
      placeholder: '请选择就诊日期',
    },
    {
      code: 'visitDepartment',
      name: '就诊科室',
      type: 'SELECT',
      required: true,
      placeholder: '请选择就诊科室',
      options: [
        { label: '内科', value: 'INTERNAL' },
        { label: '外科', value: 'SURGERY' },
        { label: '儿科', value: 'PEDIATRICS' },
        { label: '妇产科', value: 'OBSTETRICS' },
      ],
    },
    {
      code: 'doctorName',
      name: '主治医生',
      type: 'STRING',
      required: true,
      placeholder: '请输入医生姓名',
      maxLength: 100,
    },
    {
      code: 'diagnosis',
      name: '诊断结果',
      type: 'TEXTAREA',
      required: false,
      placeholder: '请输入诊断结果',
      maxLength: 500,
    },
  ],
};

export default medicalConfig;
