import React, {useState, useEffect} from 'react'
import {Modal, Card, Tag, Tabs, Alert, Descriptions, Image, Button, Spin, Col, Row,} from 'antd'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {getFormSectionTemplate} from '@/common/service/template/form_section_template'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

import TableColumnConfigTableViewer from '@/components/table_column_config/table_column_config_table_viewer'
    
import FormVarConfigTableViewer from '@/components/form_var_config/form_var_config_table_viewer'
    

interface IFormSectionTemplateDetailProps {
  formSectionTemplateId: string
  isOpen: boolean
}

const FormSectionTemplateDetail: React.FC<IFormSectionTemplateDetailProps> = ((props) => {
  const formSectionTemplateId = props.formSectionTemplateId
  const [formSectionTemplateData, setFormSectionTemplateData] = useState<FormSectionTemplateType | any>({})
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  let isOpen = props.isOpen


  const [isTableColumnListTableViewerVisible, setIsTableColumnListTableViewerVisible] = useState(false);
    
  const [isVarConfigListTableViewerVisible, setIsVarConfigListTableViewerVisible] = useState(false);
    



  const getFormSectionTemplateDetail = async (formSectionTemplateId: string) => {
    setLoading(true);
    const response = await getFormSectionTemplate(formSectionTemplateId);
    setFormSectionTemplateData(response.data ?? null);
    setLoading(false);
  };

  useEffect(() => {
    if (formSectionTemplateId && formSectionTemplateId!=="" && formSectionTemplateId!=="0") {
      getFormSectionTemplateDetail(formSectionTemplateId)
    }
  }, [formSectionTemplateId, isOpen])

  //if (formSectionTemplateData === undefined) {
  //  Loading ...
  //  return <Spin/>
  //}


  return (
    <>
      <Descriptions bordered column={2}>

<Tabs
    defaultActiveKey="basic"
    items={[
    {label: '基本信息',key: 'basic',children:(
  <>
  <Descriptions.Item label={t("template.form_section_template.section_no")}>
        {formSectionTemplateData.sectionNo}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_section_template.section_name")}>
        {formSectionTemplateData.sectionName}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_section_template.main_sub_section_type")}>
        {codeList.MainSubSectionType
            .filter((item:any) => (item.value===formSectionTemplateData.mainSubSectionType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_section_template.section_type")}>
        {codeList.SectionType
            .filter((item:any) => (item.value===formSectionTemplateData.sectionType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_section_template.sub_section_type")}>
        {codeList.SubSectionType
            .filter((item:any) => (item.value===formSectionTemplateData.subSectionType))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_section_template.summary")}>
        {formSectionTemplateData.summary}
  </Descriptions.Item>

  <Descriptions.Item label={t("template.form_section_template.detailed_content")}>
        {formSectionTemplateData.detailedContent}
  </Descriptions.Item>

</>)},
{label: '流转设置',key: 'flow',children:(
  <>
  <Descriptions.Item label={t("template.form_section_template.viewer_role_list")}>
        {codeList.Role
            .filter((item:any) => (formSectionTemplateData.viewerRoleList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


  <Descriptions.Item label={t("template.form_section_template.editor_role_list")}>
        {codeList.Role
            .filter((item:any) => (formSectionTemplateData.editorRoleList).includes(item.value))
            .map((item:any) => (<span color="green" key={item.value}>{item.label}</span>))}
  </Descriptions.Item>


</>)},
{label: '内容设计',key: 'content',children:(
  <>
  <Descriptions.Item label={t("template.form_section_template.format_template_html")}>
        {formSectionTemplateData.formatTemplateHtml}
  </Descriptions.Item>

</>)},

         ]}
  />
  
      </Descriptions>

      <TableColumnConfigTableViewer 
        tableColumnConfigList={formSectionTemplateData.tableColumnList} />
    
      <FormVarConfigTableViewer 
        formVarConfigList={formSectionTemplateData.varConfigList} />
    
    </>
  );
})
export default FormSectionTemplateDetail;
