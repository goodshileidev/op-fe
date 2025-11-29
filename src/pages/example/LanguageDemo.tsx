import React from 'react';
import { Card, Space, Typography, Divider, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '@/components/LanguageSelector';
import LanguageSelectVersion from '@/components/LanguageSelector/SelectVersion';

const { Title, Paragraph, Text } = Typography;

const LanguageDemo: React.FC = () => {
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || 'zh';

  const handleButtonClick = (action: string) => {
    message.success(t(`common.${action}_success`));
  };

  return (
    <Card>
      <Title level={2}>多语言演示页面 / Language Demo / 言語デモページ</Title>

      <Divider />

      <Title level={3}>当前语言 / Current Language / 現在の言語</Title>
      <Paragraph>
        <Text strong>语言代码 / Language Code / 言語コード: </Text>
        <Text code>{currentLanguage}</Text>
      </Paragraph>

      <Divider />

      <Title level={3}>语言切换组件 / Language Selector / 言語切り替えコンポーネント</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={5}>下拉菜单版本 / Dropdown Version / ドロップダウンバージョン</Title>
          <LanguageSelector />
        </div>

        <div>
          <Title level={5}>选择框版本 / Select Version / セレクトバージョン</Title>
          <LanguageSelectVersion />
        </div>
      </Space>

      <Divider />

      <Title level={3}>多语言文本示例 / Multilingual Text Example / 多言語テキストの例</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* 通用按钮文本 */}
        <Space wrap>
          <Button type="primary">{t('common.button.save')}</Button>
          <Button>{t('common.button.cancel')}</Button>
          <Button>{t('common.button.edit')}</Button>
          <Button>{t('common.button.delete')}</Button>
          <Button>{t('common.button.add')}</Button>
          <Button>{t('common.button.search')}</Button>
          <Button>{t('common.button.export')}</Button>
          <Button>{t('common.button.import')}</Button>
        </Space>

        {/* 通用操作文本 */}
        <Space wrap>
          <Text>{t('common.loading')}</Text>
          <Text>{t('common.success')}</Text>
          <Text>{t('common.failed')}</Text>
          <Text>{t('common.error')}</Text>
          <Text>{t('common.warning')}</Text>
        </Space>

        {/* 标题文本示例 */}
        <Space direction="vertical">
          <Text>{t('common.title.list', { entity: 'User' })}</Text>
          <Text>{t('common.title.add', { entity: 'Document' })}</Text>
          <Text>{t('common.title.edit', { entity: 'Form' })}</Text>
          <Text>{t('common.title.detail', { entity: 'Template' })}</Text>
        </Space>

        {/* 表格相关文本 */}
        <Space direction="vertical">
          <Text>{t('common.table.total_records', { total: 100 })}</Text>
          <Text>{t('common.created')}</Text>
          <Text>{t('common.updated')}</Text>
        </Space>
      </Space>

      <Divider />

      <Title level={3}>使用说明 / Usage Instructions / 使用方法</Title>
      <Paragraph>
        <pre style={{ background: '#f5f5f5', padding: '10px' }}>
{`// 在组件中使用多语言
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <Button>{t('common.button.save')}</Button>
  );
};

// 带参数的翻译
{t('common.title.edit', { entity: 'User' })}

// 切换语言
i18n.changeLanguage('en');
`}
        </pre>
      </Paragraph>
    </Card>
  );
};

export default LanguageDemo;