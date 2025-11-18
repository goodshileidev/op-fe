import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {FormTemplateVersionType} from '@/common/data_type/template/form_template_version'
import {getFormTemplateVersion} from '@/common/service/template/form_template_version'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

import SendConfigTableViewer from '@/components/send_config/send_config_table_viewer'
    
import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'
    

interface IFormTemplateVersionDetailProps {
  formTemplateVersionId: string
  isOpen: boolean
}

const FormTemplateVersionDetail: React.FC<IFormTemplateVersionDetailProps> = ((props) => {
  const formTemplateVersionId = props.formTemplateVersionId
  const [formTemplateVersionData, setFormTemplateVersionData] = useState<FormTemplateVersionType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen


  const [isSubmissionSettingsTableViewerVisible, setIsSubmissionSettingsTableViewerVisible] = useState(false);
    
  const [isVarConfigListTableViewerVisible, setIsVarConfigListTableViewerVisible] = useState(false);
    



  const getFormTemplateVersionDetail = async (formTemplateVersionId: string) => {
    setLoading(true);
    const response = await getFormTemplateVersion(formTemplateVersionId);
    setFormTemplateVersionData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (formTemplateVersionId && formTemplateVersionId!=="" && formTemplateVersionId!=="0") {
      getFormTemplateVersionDetail(formTemplateVersionId)
    }
  }, [formTemplateVersionId, isOpen])

  //if (formTemplateVersionData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}

  return (
    <>
      <Descriptions bordered column={2}>
  <Descriptions.Item label={t("template.form_template_version.version_no")}>
        {formTemplateVersionData.versionNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.publish_time")}>
        {formTemplateVersionData.publishTime}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.form_name")}>
        {formTemplateVersionData.formName}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.form_no")}>
        {formTemplateVersionData.formNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.viewer_role_list")}>
        {codeList.Role
            .filter((item:any) => (formTemplateVersionData.viewerRoleList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_template_version.editor_role_list")}>
        {codeList.Role
            .filter((item:any) => (formTemplateVersionData.editorRoleList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_template_version.print_template")}>
        {formTemplateVersionData.printTemplate}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.recipient_list")}>
        {codeList.RecipientList
            .filter((item:any) => (formTemplateVersionData.recipientList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_template_version.operation_mode")}>
        {codeList.OperationMode
            .filter((item:any) => (formTemplateVersionData.operationMode).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_template_version.preview_html")}>
        {formTemplateVersionData.previewHtml}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.reminder_settings")}>
        {formTemplateVersionData.reminderSettings}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.is_signature_required")}>
        {codeList.YesNo
            .filter((item:any) => (item.value===formTemplateVersionData.isSignatureRequired))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_template_version.is_stamp_signature_required")}>
        {codeList.YesNo
            .filter((item:any) => (item.value===formTemplateVersionData.isStampSignatureRequired))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_template_version.submission_recipient_unit")}>
        {formTemplateVersionData.submissionRecipientUnit}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_template_version.variable_name_list")}>
        {formTemplateVersionData.variableNameList}
  </Descriptions.Item>


      </Descriptions>

      <SendConfigTableViewer 
        sendConfigList={formTemplateVersionData.submissionSettings} />
    
      <FormVarConfigTableViewer 
        formVarConfigList={formTemplateVersionData.varConfigList} />
    
    </>
  );
})
export default FormTemplateVersionDetail;
