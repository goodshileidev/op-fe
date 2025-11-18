import React, {useState} from 'react'
import {Button, Card, Col, Form, Input, Row, Select, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

interface IFormTemplateSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormTemplateSearch: React.FC<IFormTemplateSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const {t} = useTranslation();

  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: 'none',
//      background: token.colorFillAlter,
//      borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const [searchformTemplateName, setSearchformTemplateName] = useState();
  const [searchformTemplateNo, setSearchformTemplateNo] = useState();
  const [searchPrintTemplate, setSearchPrintTemplate] = useState();
  const [searchRecipientList, setSearchRecipientList] = useState();
  const [searchOperationMode, setSearchOperationMode] = useState();
  const [searchDisplayPosition, setSearchDisplayPosition] = useState();
  const [searchPublishStatus, setSearchPublishStatus] = useState();
  const [searchPreviewHtml, setSearchPreviewHtml] = useState();
  const [searchIsSignatureRequired, setSearchIsSignatureRequired] = useState();
  const [searchIsStampSignatureRequired, setSearchIsStampSignatureRequired] = useState();
  const [searchSubmissionRecipientUnit, setSearchSubmissionRecipientUnit] = useState();
  const [searchVariableNameList, setSearchVariableNameList] = useState();


  const handleAdd = () => {
    props.onAdd()
  };

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    props.setCurrentConditions(values)
    const params = Object.assign({}, values, {
      pageNo: 1,
      pageSize: pagination.pageSize,
    })
    props.onReloadTable(params);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    const params = Object.assign({}, {
      pageNo: 1,
      pageSize: pagination.pageSize,
    })
    props.setCurrentConditions({})
    props.onReloadTable(params);
    searchForm.resetFields();
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportFormTemplate({
      pageNo: 1,
     pageSize:pagination.pageSize,
      formTemplateName: searchformTemplateName,
      formTemplateNo: searchformTemplateNo,
      printTemplate: searchPrintTemplate,
      recipientList: searchRecipientList,
      operationMode: searchOperationMode,
      displayPosition: searchDisplayPosition,
      publishStatus: searchPublishStatus,
      previewHtml: searchPreviewHtml,
      isSignatureRequired: searchIsSignatureRequired,
      isStampSignatureRequired: searchIsStampSignatureRequired,
      submissionRecipientUnit: searchSubmissionRecipientUnit,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
      //display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,

    }}>
      <Card title={t("common.title.search", {'entity': t('template.form_template')})} bordered={true}>
        <Form
          style={{}}
          size={'small'}
          form={searchForm}
          labelAlign={'right'}
          labelCol={{span: 8, offset: 0}}
          wrapperCol={{span: 12, offset: 0}}
          layout="horizontal"
          initialValues={searchData}
          //labelCol={{ span: 4 }}
          //wrapperCol={{ span: 14 }}
          //style={{ maxWidth: 1920 }}
          disabled={formDisabled}
          onFinish={handleSearch}>
          <Row gutter={[16, 24]}>
            <Col className="gutter-row" span={8}>
              <Form.Item name="formTemplateNameCondition" label={t("template.form_template.form_template_name")}
                         style={{maxWidth: 500}}>
                <Input placeholder={t("template.form_template.form_template_name")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="formTemplateNoCondition" label={t("template.form_template.form_template_no")}
                         style={{maxWidth: 500}}>
                <Input placeholder={t("template.form_template.form_template_no")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="publishStatusCondition" label={t("template.form_template.publish_status")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.PublishStatus
                  }
                  placeholder={t("template.form_template.publish_status")}>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <a style={{
          fontSize: 12,
          display: "none"
        }}
           onClick={() => {
             setExpand(!expand);
           }}
        ><DownOutlined rotate={expand ? 180 : 0}/>折叠条件
        </a>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}>
          <Space>
            <Button type="primary" onClick={handleSearch}>{t("common.button.search")}</Button>
            <Button type="primary" onClick={handleResetSearch}>{t("common.button.reset")}</Button>
            {/*<Button type="primary" onClick={handleImport}>{t("common.button.import")}</Button>*/}
            {/*<Button type="primary" onClick={handleExport}>{t("common.button.export")}</Button>*/}
          </Space>
          <Space>
            <Button type="primary" onClick={handleAdd}>{t("common.button.add")}</Button>
          </Space>

        </div>
      </Card>
    </div>
  )
})

export default FormTemplateSearch;
