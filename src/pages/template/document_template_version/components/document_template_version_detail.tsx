import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {DocumentTemplateVersionType} from '@/common/data_type/template/document_template_version'
import {getDocumentTemplateVersion} from '@/common/service/template/document_template_version'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

import SendConfigTableViewer from '@/components/send_config/send_config_table_viewer'
    
import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'
    

interface IDocumentTemplateVersionDetailProps {
  documentTemplateVersionId: string
  isOpen: boolean
}

const DocumentTemplateVersionDetail: React.FC<IDocumentTemplateVersionDetailProps> = ((props) => {
  const documentTemplateVersionId = props.documentTemplateVersionId
  const [documentTemplateVersionData, setDocumentTemplateVersionData] = useState<DocumentTemplateVersionType | any>({})
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



  const getDocumentTemplateVersionDetail = async (documentTemplateVersionId: string) => {
    setLoading(true);
    const response = await getDocumentTemplateVersion(documentTemplateVersionId);
    setDocumentTemplateVersionData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (documentTemplateVersionId && documentTemplateVersionId!=="" && documentTemplateVersionId!=="0") {
      getDocumentTemplateVersionDetail(documentTemplateVersionId)
    }
  }, [documentTemplateVersionId, isOpen])

  //if (documentTemplateVersionData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

 

  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("template.document_template_version.biz_type")}>
        {codeList.BizType
            .filter((item:any) => (item.value===documentTemplateVersionData.bizType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template_version.template_name")}>
        {documentTemplateVersionData.templateName}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.version_no")}>
        {documentTemplateVersionData.versionNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.publish_time")}>
        {documentTemplateVersionData.publishTime}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.publisher_name")}>
        {documentTemplateVersionData.publisherName}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.publisher_id")}>
        {documentTemplateVersionData.publisherId}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.cover_template_html")}>
        {documentTemplateVersionData.coverTemplateHtml}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.recipient_list")}>
        {codeList.RecipientList
            .filter((item:any) => (documentTemplateVersionData.recipientList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template_version.step_definition")}>
        {codeListFormTemplate
            .filter((item:any) => (documentTemplateVersionData.stepDefinition).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.document_template_version.usage_scenario_description")}>
        {documentTemplateVersionData.usageScenarioDescription}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.submission_recipient_unit")}>
        {documentTemplateVersionData.submissionRecipientUnit}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.document_template_version.variable_name_list")}>
        {documentTemplateVersionData.variableNameList}
  </Descriptions.Item>


      </Descriptions>

      <SendConfigTableViewer 
        sendConfigList={documentTemplateVersionData.submissionSettings} />
    
      <FormVarConfigTableViewer 
        formVarConfigList={documentTemplateVersionData.varConfigList} />
    
    </>
  );
})
export default DocumentTemplateVersionDetail;
