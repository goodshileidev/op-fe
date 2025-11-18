import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {DocumentTemplateType} from '@/common/data_type/template/document_template'
import {getDocumentTemplate} from '@/common/service/template/document_template'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

import SendConfigTableViewer from '@/components/send_config/send_config_table_viewer'
    
import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'
    

interface IDocumentTemplateDetailProps {
  documentTemplateId: string
  isOpen: boolean
  onGetData: any
}

const DocumentTemplateDetail: React.FC<IDocumentTemplateDetailProps> = ((props) => {
  const documentTemplateId = props.documentTemplateId
  const [documentTemplateData, setDocumentTemplateData] = useState<DocumentTemplateType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen


  const [isSubmissionSettingsTableViewerVisible, setIsSubmissionSettingsTableViewerVisible] = useState(false);
    
  const [isVarConfigListTableViewerVisible, setIsVarConfigListTableViewerVisible] = useState(false);
    

  const [codeListFormTemplate, setCodeListFormTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListFormTemplate({}).then((FormTemplateCodeList)=>{
      setCodeListFormTemplate(FormTemplateCodeList)
      console.debug("FormTemplateCodeList", FormTemplateCodeList)
    })
  }, [])



  const getDocumentTemplateDetail = async (documentTemplateId: string) => {
    setLoading(true);
    const response = await getDocumentTemplate(documentTemplateId);
    const data = response.data ?? null;
    setDocumentTemplateData(data);
    if (props.onGetData) {
      props.onGetData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (documentTemplateId && documentTemplateId!=="" && documentTemplateId!=="0") {
      getDocumentTemplateDetail(documentTemplateId)
    }
  }, [documentTemplateId, isOpen])

  //if (documentTemplateData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  if (documentTemplateId && (!documentTemplateData || !documentTemplateData.documentTemplateId)) {
    return <></>
  }

  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("template.document_template.biz_type")}>
        {codeList.BizType
            .filter((item:any) => (item.value===documentTemplateData.bizType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template.ship_type")}>
        {codeList.ShipType
            .filter((item:any) => (documentTemplateData.shipType).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template.template_name")}>
        {documentTemplateData.templateName}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.template_no")}>
        {documentTemplateData.templateNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.current_version")}>
        {documentTemplateData.currentVersion}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.cover_template_html")}>
        {documentTemplateData.coverTemplateHtml}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.editor_role_list")}>
        {codeList.Role
            .filter((item:any) => (documentTemplateData.editorRoleList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template.publish_time")}>
        {documentTemplateData.publishTime}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.publisher_name")}>
        {documentTemplateData.publisherName}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.publisher_id")}>
        {documentTemplateData.publisherId}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.recipient_list")}>
        {codeList.RecipientList
            .filter((item:any) => (documentTemplateData.recipientList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template.publish_status")}>
        {codeList.PublishStatus
            .filter((item:any) => (item.value===documentTemplateData.publishStatus))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template.step_definition")}>
        {codeListFormTemplate
            .filter((item:any) => (documentTemplateData.stepDefinition).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template.usage_scenario_description")}>
        {documentTemplateData.usageScenarioDescription}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template.variable_name_list")}>
        {documentTemplateData.variableNameList}
  </Descriptions.Item>


      </Descriptions>

      <SendConfigTableViewer 
        sendConfigList={documentTemplateData.submissionSettings} />
    
      <FormVarConfigTableViewer 
        formVarConfigList={documentTemplateData.varConfigList} />
    
    </>
  );
})
export default DocumentTemplateDetail;
