import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {SecurityDeclareRules} from './security_declare_validate'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {SecurityDeclareType} from '@/common/data_type/operation/security_declare'
import {useTranslation} from 'react-i18next';
import SecurityDeclareEdit from './components/security_declare_edit'

const SecurityDeclareEditPage: React.FC = (() => {
  const {securityDeclareId} = useParams<{securityDeclareId: string}>()
  const isEdit = (securityDeclareId !== undefined && securityDeclareId !=='0');
  const [needReset, setNeedReset] = useState<number>(0)
  const [needSubmit, setNeedSubmit] = useState<number>(0)

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = () => {
    setNeedSubmit((new Date()).getMilliseconds())
  }

  const handleReset = () => {
    setNeedReset((new Date()).getMilliseconds())
  }

  const handleUpdate = () => {
    navigate("/operation/security_declare/security_declare_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/operation/security_declare/security_declare_table/", { replace: true });
  }


  return (
    <>
      <Card title={isEdit ? t("common.title.edit",{'entity':t('operation.security_declare')}) : t("common.title.add",{'entity':t('operation.security_declare')})} bordered={false} style={{width: "80%"}}>
        <SecurityDeclareEdit
          securityDeclareId={securityDeclareId}
          isOpen={true}
          onUpdate={handleUpdate}
          needReset={needReset}
          needSubmit={needSubmit}
          style={{
            paddingBottom: 50
          }}
        />
        <Space>
          <Button type="primary" htmlType="submit"
           onClick={handleSubmit}>
            {t("common.button.save")}
          </Button>
          <Button htmlType="button"
            onClick={handleReset}
            style={{marginLeft: 8}}>
            {t("common.button.reset")}
          </Button>

          <Button htmlType="button"
            onClick={handleBack}
            style={{marginLeft: 8}}>
            {t("common.button.back")}
          </Button>
        </Space>
      </Card>
    </>
  )
})

export default SecurityDeclareEditPage;
