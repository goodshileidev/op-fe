/**
 * 表单详情包装器组件 - React化版本
 *
 * @description 使用 React + Ant Design 组件替代 dangerouslySetInnerHTML + DOM 操作
 * @refactored 2025-11-26
 */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Form } from 'antd';
import FormDetail from '@/pages/form/form/components/form_detail';
import { FormType } from '@/common/data_type/form/form';
import { FormQuestionType } from '@/common/data_type/form/form_question';
import { listFormQuestion } from '@/common/service/form/form_question';
import { parseHtmlToReact } from '@/common/utils/HtmlFormParser';
import { FormulaEngine } from '@/common/service/formula/FormulaEngine';

interface IFormDetailWrapperProps {
  formId: string;
  showBasic?: true;
  onGetData?: any;
  columnCount?: number | 4;
  onUpdated?: any;
  style?: 'basic' | 'simple';
}

const FormDetailWrapper: React.FC<IFormDetailWrapperProps> = (props) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<FormType | any>({});
  const [formQuestionList, setFormQuestionList] = useState<FormQuestionType[]>([]);
  const [varInfoMap, setVarInfoMap] = useState<{ [varKey: string]: any }>({});
  const [calcFieldsMap, setCalcFieldsMap] = useState<{ [varKey: string]: any }>({});

  const { t } = useTranslation();
  const formId = props.formId;
  const formulaEngine = useMemo(() => new FormulaEngine(), []);

  console.debug('formId', formId);

  useEffect(() => {
    listQuestion();
  }, [props.formId]);

  const listQuestion = () => {
    listFormQuestion({ formId }).then((response) => {
      if (response.data && response.data) {
        console.debug('listFormQuestion', response.data);
        const formQuestionList = response.data;

        // 构建变量信息映射表
        const varMap: { [varKey: string]: any } = {};
        const calcMap: { [varKey: string]: any } = {};

        formQuestionList.forEach((formQuestion) => {
          formQuestion.varValueList?.forEach((varValue) => {
            // 处理选项
            if (varValue.optionValues && varValue.optionValues !== '') {
              const options = varValue.optionValues.split('\n');
              varValue.options = options.map((opt) => ({
                label: opt,
                value: opt,
              }));
            } else {
              varValue.options = [];
            }

            // 使用默认值
            if (!varValue.varValue || varValue.varValue === '') {
              varValue.varValue = varValue.varDefaultValue;
            }

            // 存入映射表
            varMap[varValue.varKey] = {
              varKey: varValue.varKey,
              varName: varValue.varName,
              varInputType: varValue.varInputType,
              varValue: varValue.varValue,
              options: varValue.options,
              formula: varValue.formula,
            };

            // 计算字段单独记录
            if (varValue.varInputType === 'calc' && varValue.formula) {
              calcMap[varValue.varKey] = {
                varKey: varValue.varKey,
                formula: varValue.formula,
                dependencies: varValue.formula.dependencies || [],
              };
            }

            // 设置表单初始值
            form.setFieldValue(varValue.varKey, varValue.varValue);
          });
        });

        setVarInfoMap(varMap);
        setCalcFieldsMap(calcMap);
        setFormQuestionList(formQuestionList);

        console.log('变量信息映射表:', varMap);
        console.log('计算字段映射表:', calcMap);
      }
    });
  };

  // 变量值变化处理
  const handleVarChange = useCallback(
    (varKey: string, value: any) => {
      console.log('变量值变化:', varKey, value);

      // 更新表单值
      form.setFieldValue(varKey, value);

      // 更新映射表
      setVarInfoMap((prev) => ({
        ...prev,
        [varKey]: {
          ...prev[varKey],
          varValue: value,
        },
      }));

      // 触发计算字段重新计算
      recalculateFields();

      // 触发父组件回调
      if (props.onUpdated) {
        props.onUpdated(true, { varKey, varValue: value });
      }
    },
    [form, calcFieldsMap, props]
  );

  // 重新计算所有计算字段
  const recalculateFields = useCallback(() => {
    const allValues = form.getFieldsValue();

    Object.keys(calcFieldsMap).forEach((calcVarKey) => {
      const calcInfo = calcFieldsMap[calcVarKey];
      const { formula, dependencies } = calcInfo;

      // 收集依赖变量的值
      const depValues: { [key: string]: any } = {};
      dependencies.forEach((dep: string) => {
        depValues[dep] = allValues[dep];
      });

      // 执行计算
      const result = formulaEngine.calculate(formula, depValues);

      // 更新表单值
      form.setFieldValue(calcVarKey, result);

      // 更新映射表
      setVarInfoMap((prev) => ({
        ...prev,
        [calcVarKey]: {
          ...prev[calcVarKey],
          varValue: result,
        },
      }));

      console.log('计算字段更新:', calcVarKey, result);
    });
  }, [calcFieldsMap, form, formulaEngine]);

  const onGetData = (data: FormType) => {
    console.debug('onGetData', data);
    setFormData(data);
  };

  // 渲染问题列表
  const renderQuestionList = () => {
    if (!formQuestionList || formQuestionList.length === 0) {
      return null;
    }

    return formQuestionList.map((formQuestion) => {
      if (!formQuestion.subQuestionList) {
        return null;
      }

      return (
        <div
          key={formQuestion.formQuestionId}
          style={{ margin: 0, padding: 0 }}
          data-form-question-id={formQuestion.formQuestionId}
        >
          {formQuestion.subQuestionList.map((subQuestion, index) => {
            // SubQuestionType:
            // 1: 序号
            // 2: 提示文字
            // 3: 带输入框的富文本
            // 4: 刷卡签名
            // 6: 图片上传
            // 7: 文件上传
            // 8: 手写签名

            if (['1', '2'].includes(subQuestion.subQuestionType)) {
              // 纯文本：直接使用 dangerouslySetInnerHTML（保持原样）
              return (
                <span
                  key={index}
                  style={{ margin: 0, padding: 0 }}
                  dangerouslySetInnerHTML={{ __html: subQuestion.html }}
                />
              );
            } else if (['3'].includes(subQuestion.subQuestionType)) {
              // 带输入框的富文本：使用解析器
              return (
                <div
                  key={index}
                  className="ql-editor"
                  style={{ margin: 0, padding: 0 }}
                >
                  {parseHtmlToReact(subQuestion.html, {
                    varInfoMap,
                    onVarChange: handleVarChange,
                    readOnly: false,
                  })}
                </div>
              );
            } else if (['4', '6', '7', '8'].includes(subQuestion.subQuestionType)) {
              // 签名、上传：使用解析器
              return (
                <div key={index} style={{ margin: 0, padding: 0 }}>
                  {parseHtmlToReact(subQuestion.html, {
                    varInfoMap,
                    onVarChange: handleVarChange,
                    readOnly: false,
                  })}
                </div>
              );
            } else {
              // 其他：默认处理
              return (
                <div key={index} style={{ margin: 0, padding: 0 }}>
                  {parseHtmlToReact(subQuestion.html, {
                    varInfoMap,
                    onVarChange: handleVarChange,
                    readOnly: false,
                  })}
                </div>
              );
            }
          })}
        </div>
      );
    });
  };

  // 通知父组件数据
  useEffect(() => {
    if (props.onGetData && formData) {
      props.onGetData(formData);
    }
  }, [formData, props]);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      {!props.showBasic ? (
        <></>
      ) : (
        <Card
          className="hide-on-print"
          title={t('common.title.detail', {
            entity: formData ? '[' + formData.formNo + '] ' + formData.formName : '',
          })}
          bordered={true}
        >
          <FormDetail
            style={props.style}
            formId={props.formId}
            columnCount={props.columnCount}
            isOpen={true}
            onGetData={onGetData}
          />
        </Card>
      )}
      <Form form={form}>{renderQuestionList()}</Form>
    </div>
  );
};

export default FormDetailWrapper;
