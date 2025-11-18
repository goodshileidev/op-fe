import React, {useEffect, useState} from 'react'
import {Alert, Descriptions, DescriptionsProps} from 'antd'
import {DocumentType} from '@/common/data_type/form/document'
import {getDocument} from '@/common/service/form/document'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';


interface IDocumentDetailProps {
  documentId?: string
  isOpen?: boolean
  onGetData?: any
  style: "basic" | "simple"
}

const DocumentDetail: React.FC<IDocumentDetailProps> = ((props) => {
  const documentId = props.documentId
  const [documentData, setDocumentData] = useState<DocumentType | any>({})
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();
  let isOpen = props.isOpen

  const [isStepDefinitionTableViewerOpen, setIsStepDefinitionTableViewerOpen] = useState(false);

  const [isSubmissionSettingsTableViewerOpen, setIsSubmissionSettingsTableViewerOpen] = useState(false);

  const [isSubmissionHistoryTableViewerOpen, setIsSubmissionHistoryTableViewerOpen] = useState(false);

  const [isVarConfigListTableViewerOpen, setIsVarConfigListTableViewerOpen] = useState(false);

  const [isVarValueListTableViewerOpen, setIsVarValueListTableViewerOpen] = useState(false);

  createBasicBasicItems
  const getDocumentDetail = async (documentId: string) => {
    setLoading(true);
    const response = await getDocument(documentId);
    const data = response.data ?? null;
    setDocumentData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (documentId && documentId !== "" && documentId !== "0") {
      getDocumentDetail(documentId)
    }
  }, [documentId, isOpen])

  //if (documentData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  const createBasicBasicItems = () => {
    const items: DescriptionsProps['items'] = []
    if (props.style === "basic") {
      items.push((
        {
          'key': 'shipName', 'label': t('form.document.ship_name'), 'children': <span>
            {documentData.shipName}
          </span>
        }))
      items.push((
        {
          'key': 'berthingNumber', 'label': "靠泊次数", 'children': <p>
            {documentData.berthingNumber}
          </p>
        }))

      items.push((
        {
          'key': 'cargoName', 'label': t('form.document.cargo_name'), 'children': <span>
            {documentData.cargoName}
          </span>
        }))

      items.push((
        {
          'key': 'domesticForeignTradeType', 'label': t('form.document.domestic_foreign_trade_type'), 'children': <span>
            {codeList.DomesticForeignTradeType
              .filter((item: any) => (item.value === documentData.domesticForeignTradeType))
              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          </span>

        }))
      items.push((
        {
          'key': 'bizType', 'label': t('form.document.biz_type'), 'children': <span>
            {codeList.BizType
              .filter((item: any) => (item.value === documentData.bizType))
              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          </span>

        }))

      items.push((
        {
          'key': 'operationType', 'label': t('form.document.operation_type'), 'children': <span>
            {codeList.OperationType
              .filter((item: any) => (item.value === documentData.operationType))
              .map((item: any) => (<span color="green" key={item.value}>{item.label}</span>))}
          </span>

        }))
    }
    items.push((
      {
        'key': 'dataDate', 'label': t('form.document.data_date'), 'children': <span>
          {documentData.dataDate}
        </span>
      }))

    // items.push((
    //   {
    //     'key': 'templateName', 'label': t('form.document.template_name'), 'children': <span>
    //       {documentData.templateName}
    //     </span>
    //   }))
    //
    // items.push((
    //   {
    //     'key': 'templateNo', 'label': t('form.document.template_no'), 'children': <span>
    //       {documentData.templateNo}
    //     </span>
    //   }))

    // items.push((
    //   {
    //     'key': 'currentVersion', 'label': t('form.document.current_version'), 'children': <span>
    //       {documentData.currentVersion}
    //     </span>
    //   }))

    // items.push((
    //   {
    //     'key': 'documentNo', 'label': t('form.document.document_no'), 'children': <span>
    //       {documentData.documentNo}
    //     </span>
    //   }))
    // items.push((
    //   {
    //     'key': 'publishTime', 'label': t('form.document.publish_time'), 'children': <span>
    //       {documentData.publishTime}
    //     </span>
    //   }))
    //
    // items.push((
    //   {
    //     'key': 'publisherName', 'label': t('form.document.publisher_name'), 'children': <span>
    //       {documentData.publisherName}
    //     </span>
    //   }))

    items.push((
      {
        'key': 'fillinStatus', 'label': t('form.document.fillin_status'), 'children': <span>
          {documentData.fillinStatus}
        </span>

      }))
    if (documentData && !documentData.shipName) {
      items.push((
        {
          'key': 'turnNo', 'label': t('form.document.turn_no'), 'children': <span>
            {documentData.turnNo}
          </span>
  
        }))
      items.push((
          {
            'key': 'turnGroup', 'label': t('form.document.turn_group'), 'children': <span>
              {documentData.turnGroup}
            </span>
    
          }))
    }
    return items;
  }
  const createContentComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'coverTemplateHtml', 'label': t('form.document.cover_template_html'), 'children': <span>
          {documentData.coverTemplateHtml}
        </span>
      }))

    items.push((
      {
        'key': 'varConfigList', 'label': t('form.document.var_config_list'), 'children': <span>
          {documentData.varConfigList}
        </span>
      }))

    items.push((
      {
        'key': 'varValueList', 'label': t('form.document.var_value_list'), 'children': <span>
          {documentData.varValueList}
        </span>
      }))
    return items;
  }
  const createFlowBasicItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'currentStep', 'label': t('form.document.current_step'), 'children': <span>
          {documentData.currentStep}
        </span>
      }))
    return items;
  }
  const createFlowComplexItems = () => {
    const items: DescriptionsProps['items'] = []

    items.push((
      {
        'key': 'stepDefinition', 'label': t('form.document.step_definition'), 'children': <span>
          {documentData.stepDefinition}
        </span>
      }))

    items.push((
      {
        'key': 'viewerList', 'label': t('form.document.viewer_list'), 'children': <span>
          {documentData.viewerList}
        </span>
      }))

    items.push((
      {
        'key': 'editorList', 'label': t('form.document.editor_list'), 'children': <span>
          {documentData.editorList}
        </span>
      }))

    items.push((
      {
        'key': 'submissionSettings', 'label': t('form.document.submission_settings'), 'children': <span>
          {documentData.submissionSettings}
        </span>
      }))

    items.push((
      {
        'key': 'submissionHistory', 'label': t('form.document.submission_history'), 'children': <span>
          {documentData.submissionHistory}
        </span>
      }))
    return items;
  }


  const createDescriptionFields = (conditionValue: string) => {
    const items = []
    items.push((
      <><Descriptions bordered column={4} items={createBasicBasicItems()}>
      </Descriptions>
      </>)
    );
    return items;
  }
  return (
    <>
      {createDescriptionFields()}
    </>
  );
})
export default DocumentDetail;
