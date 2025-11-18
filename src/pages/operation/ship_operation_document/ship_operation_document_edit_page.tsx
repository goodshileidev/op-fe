import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {ShipOperationDocumentRules} from './ship_operation_document_validate'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {ShipOperationDocumentType} from '@/common/data_type/operation/ship_operation_document'
import {useTranslation} from 'react-i18next';
import ShipOperationDocumentEdit from './components/ship_operation_document_edit'

const ShipOperationDocumentEditPage: React.FC = (() => {
  const {shipOperationDocumentId} = useParams<{shipOperationDocumentId: string}>()
  const isEdit = (shipOperationDocumentId !== undefined && shipOperationDocumentId !=='0');
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
    navigate("/operation/ship_operation_document/ship_operation_document_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/operation/ship_operation_document/ship_operation_document_table/", { replace: true });
  }


  return (
    <>
      <Card title={isEdit ? t("common.title.edit",{'entity':t('operation.ship_operation_document')}) : t("common.title.add",{'entity':t('operation.ship_operation_document')})} bordered={false} style={{width: "80%"}}>
        <ShipOperationDocumentEdit
          shipOperationDocumentId={shipOperationDocumentId}
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

export default ShipOperationDocumentEditPage;
