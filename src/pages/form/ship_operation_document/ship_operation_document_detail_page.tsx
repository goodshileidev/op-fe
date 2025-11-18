import React from 'react'
import {useNavigate, useParams} from 'umi'
import {Button, Card, Space} from 'antd'
import {useTranslation} from 'react-i18next';
import ShipOperationDocumentDetail from './components/ship_operation_document_detail'
import {PageContainer} from "@ant-design/pro-components";


const ShipOperationDocumentDetailPage: React.FC = (() => {
  const {shipOperationDocumentId} = useParams<{ shipOperationDocumentId: string }>()

  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/form/ship_operation_document/ship_operation_document_table/", {replace: true});
  }


  return (
    <PageContainer>
      <Card title={t("common.title.detail", {'entity': t('form.ship_operation_document')})} bordered={true}>
        <ShipOperationDocumentDetail
          shipOperationDocumentId={shipOperationDocumentId}
          isOpen={true}
        />

        <Space>
          <Button htmlType="button"
                  onClick={handleCloseWindow}
                  style={{marginLeft: 8}}>
            {t("common.button.close")}
          </Button>

        </Space>
      </Card>
    </PageContainer>
  );
})

export default ShipOperationDocumentDetailPage;
