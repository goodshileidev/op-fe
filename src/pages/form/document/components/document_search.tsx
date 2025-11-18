import React, {useState} from 'react'
import {Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

interface IDocumentSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const DocumentSearch: React.FC<IDocumentSearchProps> = ((props) => {
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

  const [searchOperationPlanId, setSearchOperationPlanId] = useState();
  const [searchDomesticForeignTradeType, setSearchDomesticForeignTradeType] = useState();
  const [searchBizType, setSearchBizType] = useState();
  const [searchBerthingTime, setSearchBerthingTime] = useState();
  const [searchDepartureTime, setSearchDepartureTime] = useState();
  const [searchShipType, setSearchShipType] = useState();
  const [searchTemplateName, setSearchTemplateName] = useState();
  const [searchTemplateNo, setSearchTemplateNo] = useState();
  const [searchCurrentVersion, setSearchCurrentVersion] = useState();
  const [searchCoverTemplateHtml, setSearchCoverTemplateHtml] = useState();
  const [searchDocumentNo, setSearchDocumentNo] = useState();
  const [searchPublishTime, setSearchPublishTime] = useState();
  const [searchStepDefinition, setSearchStepDefinition] = useState();
  const [searchCurrentStep, setSearchCurrentStep] = useState();
  const [searchFillinStatus, setSearchFillinStatus] = useState();
  const [searchRecipientList, setSearchRecipientList] = useState();
  const [searchViewerList, setSearchViewerList] = useState();
  const [searchEditorList, setSearchEditorList] = useState();
  const [searchInputStartTime, setSearchInputStartTime] = useState();
  const [searchInputFinishTime, setSearchInputFinishTime] = useState();
  const [searchSubmissionStatus, setSearchSubmissionStatus] = useState();
  const [searchSubmissionFinishTime, setSearchSubmissionFinishTime] = useState();
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
    searchForm.resetFields()
    const params = Object.assign({}, {
      pageNo: 1,
      pageSize: pagination.pageSize,
    })
    props.setCurrentConditions({})
    props.onReloadTable(params);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportDocument({
      pageNo: 1,
     pageSize:pagination.pageSize,
      operationPlanId: searchOperationPlanId,
      domesticForeignTradeType: searchDomesticForeignTradeType,
      bizType: searchBizType,
      berthingTime: searchBerthingTime,
      departureTime: searchDepartureTime,
      shipType: searchShipType,
      templateName: searchTemplateName,
      templateNo: searchTemplateNo,
      currentVersion: searchCurrentVersion,
      coverTemplateHtml: searchCoverTemplateHtml,
      documentNo: searchDocumentNo,
      publishTime: searchPublishTime,
      stepDefinition: searchStepDefinition,
      currentStep: searchCurrentStep,
      fillinStatus: searchFillinStatus,
      recipientList: searchRecipientList,
      viewerList: searchViewerList,
      editorList: searchEditorList,
      inputStartTime: searchInputStartTime,
      inputFinishTime: searchInputFinishTime,
      submissionStatus: searchSubmissionStatus,
      submissionFinishTime: searchSubmissionFinishTime,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
      //display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,

    }}>
      <Card title={t("common.title.search", {'entity': t('form.document')})} bordered={true}>
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
              <Form.Item name="operationPlanIdCondition" label={t("form.document.operation_plan_id")}
                         style={{maxWidth: 500}}>
                <Input placeholder={t("form.document.operation_plan_id")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="domesticForeignTradeTypeCondition" label={t("form.document.domestic_foreign_trade_type")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.DomesticForeignTradeType
                  }
                  placeholder={t("form.document.domestic_foreign_trade_type")}>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="bizTypeCondition" label={t("form.document.biz_type")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.BizType
                  }
                  placeholder={t("form.document.biz_type")}>
                </Select>
              </Form.Item>
            </Col>
            {/*<Col className="gutter-row" span={24} style={{*/}
            {/*  display: "flex"*/}
            {/*}}>*/}
            {/*  <Space direction={"horizontal"}>*/}
            {/*    <Form.Item name="berthingTimeStartCondition" label={t("form.document.berthing_time")}*/}
            {/*               style={{maxWidth: 200}}>*/}
            {/*      <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.berthing_time")}*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*    <Form.Item name="berthingTimeEndCondition" style={{maxWidth: 200}}>*/}
            {/*      <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.berthing_time")}*/}
            {/*      />*/}
            {/*    </Form.Item>*/}
            {/*  </Space>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="departureTimeStartCondition" label={t("form.document.departure_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.departure_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="departureTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.departure_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="shipTypeCondition" label={t("form.document.ship_type")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.ship_type")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            <Col className="gutter-row" span={8}>
              <Form.Item name="templateNameCondition" label={t("form.document.template_name")} style={{maxWidth: 500}}>
                <Input placeholder={t("form.document.template_name")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="templateNoCondition" label={t("form.document.template_no")} style={{maxWidth: 500}}>
                <Input placeholder={t("form.document.template_no")}
                />
              </Form.Item>
            </Col>
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="currentVersionCondition" label={t("form.document.current_version")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.current_version")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="coverTemplateHtmlCondition" label={t("form.document.cover_template_html")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.cover_template_html")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="documentNoCondition" label={t("form.document.document_no")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.document_no")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="publishTimeStartCondition" label={t("form.document.publish_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.publish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="publishTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.publish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="currentStepCondition" label={t("form.document.current_step")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.current_step")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            <Col className="gutter-row" span={8}>
              <Form.Item name="fillinStatusCondition" label={t("form.document.fillin_status")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.FillinStatus
                  }
                  placeholder={t("form.document.fillin_status")}>
                </Select>
              </Form.Item>
            </Col>
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="recipientListCondition" label={t("form.document.recipient_list")} valuePropName="checked"*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Checkbox.Group*/}
            {/*      placeholder={t("form.document.recipient_list")}*/}
            {/*      options={*/}
            {/*        codeList.RecipientList*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="viewerListCondition" label={t("form.document.viewer_list")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.viewer_list")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="editorListCondition" label={t("form.document.editor_list")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.editor_list")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="inputStartTimeStartCondition" label={t("form.document.input_start_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.input_start_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="inputStartTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.input_start_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="inputFinishTimeStartCondition" label={t("form.document.input_finish_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.input_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="inputFinishTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.input_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="submissionStatusCondition" label={t("form.document.submission_status")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Select*/}
            {/*      options={*/}
            {/*        codeList.SubmissionStatus*/}
            {/*      }*/}
            {/*      placeholder={t("form.document.submission_status")}>*/}
            {/*    </Select>*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="submissionFinishTimeStartCondition" label={t("form.document.submission_finish_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.submission_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="submissionFinishTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.document.submission_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="variableNameListCondition" label={t("form.document.variable_name_list")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.document.variable_name_list")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}

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

export default DocumentSearch;
