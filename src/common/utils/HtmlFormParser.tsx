/**
 * HTML 表单解析器
 *
 * @file HtmlFormParser.tsx
 * @description 将后端返回的 HTML 解析为 React 组件，替换变量占位符为 Ant Design 组件
 * @created 2025-11-26
 */
import React from 'react';
import parse, { DOMNode, Element, domToReact } from 'html-react-parser';
import VarInput from '@/common/components/VarInput';

interface VarInfo {
  varKey: string;
  varName: string;
  varInputType: string;
  varValue?: any;
  options?: Array<{ label: string; value: string }>;
  formula?: any;
}

interface ParseOptions {
  varInfoMap: { [varKey: string]: VarInfo };  // 变量信息映射
  onVarChange: (varKey: string, value: any) => void;  // 变量值变化回调
  readOnly?: boolean;  // 是否只读模式
}

/**
 * 解析 HTML 为 React 组件
 *
 * @param html 后端返回的 HTML 字符串
 * @param options 解析选项
 * @returns React 元素
 */
export const parseHtmlToReact = (html: string, options: ParseOptions) => {
  const { varInfoMap, onVarChange, readOnly } = options;

  return parse(html, {
    replace: (domNode) => {
      // 只处理元素节点
      if (domNode.type !== 'tag') {
        return;
      }

      const element = domNode as Element;

      // 识别变量容器
      if (
        element.name === 'span' &&
        element.attribs?.class?.includes('var-value-container')
      ) {
        const varKey = element.attribs['data-var-key'];
        const varName = element.attribs['data-var-name'];

        if (!varKey) {
          console.warn('变量容器缺少 data-var-key:', element);
          return;
        }

        // 从映射表获取变量信息
        const varInfo = varInfoMap[varKey];

        if (!varInfo) {
          console.warn('未找到变量信息:', varKey);
          // 返回原始内容
          return domToReact(element.children as DOMNode[], options as any);
        }

        // 计算字段：特殊处理
        if (element.attribs.class?.includes('var-calc-field')) {
          const formula = element.attribs['data-formula'];
          return (
            <span
              key={varKey}
              data-var-key={varKey}
              data-formula={formula}
              className="var-calc-field"
            >
              <VarInput
                varKey={varKey}
                varName={varInfo.varName}
                varInputType="calc"
                varValue={varInfo.varValue}
                readOnly={true}
              />
            </span>
          );
        }

        // 普通变量：渲染输入组件
        return (
          <span
            key={varKey}
            data-var-key={varKey}
            className="var-value-container"
          >
            <VarInput
              varKey={varKey}
              varName={varInfo.varName}
              varInputType={varInfo.varInputType}
              varValue={varInfo.varValue}
              options={varInfo.options}
              onChange={(value) => onVarChange(varKey, value)}
              readOnly={readOnly}
            />
          </span>
        );
      }

      // 其他元素：保持原样
      return;
    },
  });
};
