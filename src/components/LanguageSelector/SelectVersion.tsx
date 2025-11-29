import React from 'react';
import { Select } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import i18n from '@/lang/i18n';

const { Option } = Select;

const LanguageSelectVersion: React.FC = () => {
  const { i18n: i18nInstance } = useTranslation();

  const languages = [
    { value: 'zh', label: '简体中文', flag: '🇨🇳' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ja', label: '日本語', flag: '🇯🇵' }
  ];

  const currentLanguage = i18nInstance.language || 'zh';

  const handleLanguageChange = (value: string) => {
    i18nInstance.changeLanguage(value);
    window.localStorage.setItem('lang', value);
  };

  return (
    <Select
      value={currentLanguage}
      onChange={handleLanguageChange}
      style={{ width: 150 }}
      suffixIcon={<GlobalOutlined />}
    >
      {languages.map(lang => (
        <Option key={lang.value} value={lang.value}>
          <span>{lang.flag} {lang.label}</span>
        </Option>
      ))}
    </Select>
  );
};

export default LanguageSelectVersion;