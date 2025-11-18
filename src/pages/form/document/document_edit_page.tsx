import React, {useEffect, useState} from 'react'
import {useParams, history, useNavigate} from 'umi'
import {Space, Card, Button, message, Alert, Slider} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
import {DocumentRules} from './document_validate'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {DocumentType} from '@/common/data_type/form/document'
import {useTranslation} from 'react-i18next';
import DocumentEdit from './components/document_edit'

const DocumentEditPage: React.FC = (() => {
  const {documentId} = useParams<{documentId: string}>()
  const isEdit = (documentId !== undefined && documentId !=='0');
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
    navigate("/form/document/document_table/", { replace: true });
  }

  const handleBack = () => {
    navigate("/form/document/document_table/", { replace: true });
  }
  const handleCloseWindow = () => {
    window.close()
  }

  return (
    <>
      <Card title={isEdit ? t("common.title.edit",{'entity':t('form.document')}) : t("common.title.add",{'entity':t('form.document')})} bordered={false} style={{width: "80%"}}>
        <DocumentEdit
          documentId={documentId}
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
            onClick={handleCloseWindow}
            style={{marginLeft: 8}}>
            {t("common.button.close")}
          </Button>
        </Space>
      </Card>
    </>
  )
})

export default DocumentEditPage;
