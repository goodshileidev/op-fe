# 测试策略

## 📋 文档信息

- **模块**: 测试策略
- **优先级**: P1
- **预计工时**: 6-8 工作日
- **依赖**: 所有开发模块
- **负责人**: 待分配

---

## 🎯 测试目标

建立**全面的测试体系**:

1. ✅ 单元测试 (覆盖率 > 80%)
2. ✅ 集成测试 (关键流程 100%)
3. ✅ E2E 测试 (主要场景)
4. ✅ 性能测试 (关键指标)
5. ✅ 兼容性测试
6. ✅ 安全性测试

---

## 🧪 单元测试

### 测试框架

- **Jest** - 测试运行器
- **React Testing Library** - 组件测试
- **@testing-library/hooks** - Hook 测试

### 测试示例

\`\`\`typescript
/**
 * 字段类型单元测试
 */
describe('TextField', () => {
  test('should render correctly', () => {
    const { getByPlaceholderText } = render(
      <TextField config={{ placeholder: '请输入' }} />
    );
    expect(getByPlaceholderText('请输入')).toBeInTheDocument();
  });

  test('should validate required field', async () => {
    const field = new TextField();
    const errors = await field.validate('', { required: true });
    expect(errors).toHaveLength(1);
  });
});
\`\`\`

---

## 🔗 集成测试

### 测试关键流程

1. **表单提交流程**
2. **数据迁移流程**
3. **场景切换流程**
4. **权限验证流程**

\`\`\`typescript
/**
 * 表单提交集成测试
 */
describe('Form Submission Integration', () => {
  test('complete form submission flow', async () => {
    // 1. 加载模板
    const template = await loadTemplate('patient_record');
    
    // 2. 填写表单
    await fillForm({ name: '张三', age: 30 });
    
    // 3. 验证表单
    const validation = await validateForm();
    expect(validation.valid).toBe(true);
    
    // 4. 提交表单
    const result = await submitForm();
    expect(result.success).toBe(true);
  });
});
\`\`\`

---

## 🎭 E2E 测试

### 测试框架

- **Playwright** - E2E 测试框架

### 测试场景

\`\`\`typescript
/**
 * 医疗场景 E2E 测试
 */
test('medical scenario complete flow', async ({ page }) => {
  // 1. 登录
  await page.goto('/login');
  await page.fill('[name="username"]', 'doctor');
  await page.fill('[name="password"]', 'password');
  await page.click('button[type="submit"]');
  
  // 2. 切换场景
  await page.click('[data-testid="scenario-selector"]');
  await page.click('text=医疗调研');
  
  // 3. 创建患者记录
  await page.click('text=创建记录');
  await page.fill('[name="title"]', '张三');
  await page.fill('[name="subtitle"]', '感冒');
  
  // 4. 提交
  await page.click('button:has-text("提交")');
  
  // 5. 验证成功
  await expect(page.locator('.success-message')).toBeVisible();
});
\`\`\`

---

## ⚡ 性能测试

### 测试指标

| 指标 | 目标值 | 测试工具 |
|------|--------|----------|
| API 响应时间 | < 200ms | k6 |
| 页面加载时间 | < 2s | Lighthouse |
| 表单渲染时间 | < 500ms | Performance API |
| 并发用户数 | > 1000 | k6 |

### 性能测试脚本

\`\`\`javascript
/**
 * k6 性能测试
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100,
  duration: '30s',
};

export default function() {
  const res = http.get('http://localhost:8000/api/entities');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}
\`\`\`

---

## ✅ 验收标准

- [ ] 单元测试覆盖率 > 80%
- [ ] 所有集成测试通过
- [ ] E2E 测试覆盖主要场景
- [ ] 性能指标达标
- [ ] 兼容性测试通过
- [ ] 测试文档完整

---

**版本**: v1.0
**创建日期**: 2025-01-13
