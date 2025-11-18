import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {DocumentTemplateVersionType} from '@/common/data_type/template/document_template_version'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IDocumentTemplateVersionSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const DocumentTemplateVersionSearch: React.FC<IDocumentTemplateVersionSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchBizType, setSearchBizType] = useState();
  const [searchTemplateName, setSearchTemplateName] = useState();
  const [searchVersionNo, setSearchVersionNo] = useState();
  const [searchPublishTime, setSearchPublishTime] = useState();
  const [searchCoverTemplateHtml, setSearchCoverTemplateHtml] = useState();
  const [searchRecipientList, setSearchRecipientList] = useState();
  const [searchStepDefinition, setSearchStepDefinition] = useState();
  const [searchSubmissionRecipientUnit, setSearchSubmissionRecipientUnit] = useState();
  const [searchVariableNameList, setSearchVariableNameList] = useState();


  const [codeListFormTemplate, setCodeListFormTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListFormTemplate({}).then((FormTemplateCodeList)=>{
      setCodeListFormTemplate(FormTemplateCodeList)
      console.debug("FormTemplateCodeList", FormTemplateCodeList)
    })
  }, [])



  const handleAdd = () => {
    props.onAdd()
  };

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    const params=Object.assign({}, values, {
      pageNo: 1,
     pageSize:pagination.pageSize,
    })
    props.onReloadTable(params);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const params=Object.assign({}, {
      pageNo: 1,
     pageSize:pagination.pageSize,
    })
    props.onReloadTable(params);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportDocumentTemplateVersion({
      pageNo: 1,
     pageSize:pagination.pageSize,
      bizType: searchBizType,
      templateName: searchTemplateName,
      versionNo: searchVersionNo,
      publishTime: searchPublishTime,
      coverTemplateHtml: searchCoverTemplateHtml,
      recipientList: searchRecipientList,
      stepDefinition: searchStepDefinition,
      submissionRecipientUnit: searchSubmissionRecipientUnit,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
            }}>
    <Card title={t("common.title.search",{'entity':t('template.document_template_version')})}  bordered={true}>
      <Form
        form={searchForm}
        layout="vertical"
        initialValues={searchData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFinish={handleSearch}>
        <Row gutter={[16, 24]}>
<Col className="gutter-row" span={12}>
    <Form.Item name="bizTypeCondition" label={t("template.document_template_version.biz_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.BizType
          }
        placeholder={t("template.document_template_version.biz_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="templateNameCondition" label={t("template.document_template_version.template_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template_version.template_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="versionNoCondition" label={t("template.document_template_version.version_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template_version.version_no")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="publishTimeStartCondition" label={t("template.document_template_version.publish_time")}  style={{maxWidth:500}}>
        <DatePicker format="YYYY-MM-DD" placeholder={t("template.document_template_version.publish_time")}
        />
    </Form.Item>
    <Form.Item name="publishTimeEndCondition"   style={{maxWidth:500}}>
        <DatePicker format="YYYY-MM-DD" placeholder={t("template.document_template_version.publish_time")}
        />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="coverTemplateHtmlCondition" label={t("template.document_template_version.cover_template_html")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template_version.cover_template_html")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="recipientListCondition" label={t("template.document_template_version.recipient_list")}  valuePropName="checked" style={{maxWidth:500}}>
      <Checkbox.Group
        placeholder={t("template.document_template_version.recipient_list")}
        options={
          codeList.RecipientList
        }
      />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="stepDefinitionCondition" label={t("template.document_template_version.step_definition")}  valuePropName="checked" style={{maxWidth:500}}>
      <Checkbox.Group
        placeholder={t("template.document_template_version.step_definition")}
        options={
          codeListFormTemplate
        }
      />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="submissionRecipientUnitCondition" label={t("template.document_template_version.submission_recipient_unit")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template_version.submission_recipient_unit")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="variableNameListCondition" label={t("template.document_template_version.variable_name_list")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template_version.variable_name_list")}
         />
    </Form.Item>
</Col>

        </Row>
        </Form>
     <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
        <Space>
          <Button type="primary" onClick={handleSearch}>{t("common.button.search")}</Button>
          <Button type="primary" onClick={handleResetSearch}>{t("common.button.reset")}</Button>
          <Button type="primary" onClick={handleImport}>{t("common.button.import")}</Button>
          <Button type="primary" onClick={handleExport}>{t("common.button.export")}</Button>
        </Space>
        <Space>
          <Button type="primary" onClick={handleAdd}>{t("common.button.add")}</Button>
        </Space>
      </div>
      </Card>
    </div>
  )
})

export default DocumentTemplateVersionSearch;