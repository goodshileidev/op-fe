import React from 'react';
import { Select, GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import i18n from '@/lang/i18n';

const LanguageSelector: React.FC = () => {
  const { i18n: i18nInstance } = useTranslation();

  const languages = [
    { key: 'zh', label: '简体中文', flag: '🇨🇳' },
    { key: 'en', label: 'English', flag: '🇺🇸' },
    { key: 'ja', label: '日本語', flag: '🇯🇵' }
  ];

  const currentLanguage = i18nInstance.language || 'zh';
  const currentLang = languages.find(lang => lang.key === currentLanguage) || languages[0];

  const handleLanguageChange = (key: string) => {
    i18nInstance.changeLanguage(key);
    window.localStorage.setItem('lang', key);

    // 可选：刷新页面以确保所有组件更新
    // window.location.reload();
  };

  const menu = (
    <Menu
      selectedKeys={[currentLanguage]}
      onClick={({ key }) => handleLanguageChange(key)}
    >
      {languages.map(lang => (
        <Menu.Item key={lang.key}>
          <Space>
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </Space>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <div style={{
        cursor: 'pointer',
        padding: '0 12px',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <Space>
          <GlobalOutlined />
          <span>{currentLang.flag}</span>
          <span>{currentLang.label}</span>
        </Space>
      </div>
    </Dropdown>
  );
};

export default LanguageSelector;