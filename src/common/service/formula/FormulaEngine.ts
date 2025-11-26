/**
 * 公式计算引擎
 *
 * @file FormulaEngine.ts
 * @description 基于 varKey 的公式计算引擎，支持表达式计算和日期计算
 * @created 2025-11-26
 */

/**
 * 公式计算引擎类
 */
export class FormulaEngine {
  /**
   * 计算字段值
   *
   * @param formula 公式配置，如: {"type":"expression","expression":"{varKey001} * {varKey002}"}
   * @param varValues 所有变量的当前值，如: { varKey001: "5", varKey002: "100" }
   * @returns 计算结果
   */
  calculate(formula: any, varValues: { [key: string]: any }): any {
    if (!formula || !formula.type) {
      return null;
    }

    try {
      switch (formula.type) {
        case 'expression':
          return this.evaluateExpression(formula.expression, varValues);
        case 'days':
          return this.calculateDays(formula.startDate, formula.endDate, varValues);
        default:
          return null;
      }
    } catch (error) {
      console.error('公式计算错误:', formula, error);
      return null;
    }
  }

  /**
   * 表达式计算
   *
   * @param expression 表达式字符串，如: "{varKey001} * {varKey002}"
   * @param varValues 变量值映射
   * @returns 计算结果（数字）
   *
   * @example
   * evaluateExpression("{varKey001} * {varKey002}", { varKey001: 5, varKey002: 100 })
   * // 返回: 500
   */
  private evaluateExpression(expression: string, varValues: { [key: string]: any }): number {
    let expr = expression;

    // 替换所有 {varKey} 为实际值
    Object.keys(varValues).forEach((varKey) => {
      const value = varValues[varKey];
      const numValue = parseFloat(value) || 0;

      // 替换表达式中的变量引用
      expr = expr.replace(new RegExp(`\\{${varKey}\\}`, 'g'), String(numValue));
    });

    // 安全检查：只允许数字和基本运算符
    if (!/^[\d\s+\-*/.()]+$/.test(expr)) {
      console.error('表达式包含非法字符:', expr);
      return 0;
    }

    // 执行计算
    try {
      return new Function(`return ${expr}`)();
    } catch (error) {
      console.error('表达式执行失败:', expr, error);
      return 0;
    }
  }

  /**
   * 日期天数计算
   *
   * @param startDateKey 开始日期变量 key，如: "{varKey001}"
   * @param endDateKey 结束日期变量 key，如: "{varKey002}"
   * @param varValues 变量值映射
   * @returns 天数（包含首尾）
   *
   * @example
   * calculateDays("{varKey001}", "{varKey002}", {
   *   varKey001: "2025-01-01",
   *   varKey002: "2025-01-10"
   * })
   * // 返回: 10
   */
  private calculateDays(
    startDateKey: string,
    endDateKey: string,
    varValues: { [key: string]: any }
  ): number {
    // 去除 {}，获取 varKey
    const startKey = startDateKey.replace(/[{}]/g, '');
    const endKey = endDateKey.replace(/[{}]/g, '');

    const startDate = varValues[startKey];
    const endDate = varValues[endKey];

    if (!startDate || !endDate) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays + 1; // 包含首尾
  }
}
