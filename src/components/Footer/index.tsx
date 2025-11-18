import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      className={"hide-on-print"}
      style={{
        background: 'none',
      }}
      copyright="Powered by 66云链"
      links={[
        {
          key: '一体化表单管理平台',
          title: '一体化表单管理平台',
          href: '/#/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
