import {QuestionCircleOutlined} from '@ant-design/icons';
import {SelectLang as UmiSelectLang} from '@umijs/max';
import LanguageSelector from '@/components/LanguageSelector';

export type SiderTheme = 'light' | 'dark';

export const SelectLang = () => {
  // 使用自定义的语言切换组件替代 Umi 默认组件
  return <LanguageSelector />
};

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined/>
    </div>
  );
};
