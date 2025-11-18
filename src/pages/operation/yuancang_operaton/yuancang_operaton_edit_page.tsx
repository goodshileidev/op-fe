import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {YuancangOperatonRules} from './yuancang_operaton_validate'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {YuancangOperatonType} from '@/common/data_type/operation/yuancang_operaton'
import {useTranslation} from 'react-i18next';
import YuancangOperatonEdit from './components/yuancang_operaton_edit'

const YuancangOperatonEditPage: React.FC = (() => {
  const {yuancangOperatonId} = useParams<{yuancangOperatonId: string}>()
  const isEdit = (yuancangOperatonId !== undefined && yuancangOperatonId !=='0');
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
    navigate("/operation/yuancang_operaton/yuancang_operaton_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/operation/yuancang_operaton/yuancang_operaton_table/", { replace: true });
  }


  return (
    <>
      <Card title={isEdit ? t("common.title.edit",{'entity':t('operation.yuancang_operaton')}) : t("common.title.add",{'entity':t('operation.yuancang_operaton')})} bordered={false} style={{width: "80%"}}>
        <YuancangOperatonEdit
          yuancangOperatonId={yuancangOperatonId}
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

export default YuancangOperatonEditPage;
