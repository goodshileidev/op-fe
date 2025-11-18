import React, {useState} from 'react'
import {Button, Card, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Select, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

interface IFormSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormSearch: React.FC<IFormSearchProps> = ((props) => {
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
  const [searchFormNo, setSearchFormNo] = useState();
  const [searchFormName, setSearchFormName] = useState();
  const [searchDomesticForeignTradeType, setSearchDomesticForeignTradeType] = useState();
  const [searchBerthingTime, setSearchBerthingTime] = useState();
  const [searchDepartureTime, setSearchDepartureTime] = useState();
  const [searchInputStartTime, setSearchInputStartTime] = useState();
  const [searchInputFinishTime, setSearchInputFinishTime] = useState();
  const [searchPrintTemplate, setSearchPrintTemplate] = useState();
  const [searchDisplayPosition, setSearchDisplayPosition] = useState();
  const [searchPublishStatus, setSearchPublishStatus] = useState();
  const [searchCurrentStep, setSearchCurrentStep] = useState();
  const [searchFillinStatus, setSearchFillinStatus] = useState();
  const [searchRecipientList, setSearchRecipientList] = useState();
  const [searchOperationMode, setSearchOperationMode] = useState();
  const [searchIsSignatureRequired, setSearchIsSignatureRequired] = useState();
  const [searchIsStampSignatureRequired, setSearchIsStampSignatureRequired] = useState();
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
    searchForm.resetFields()
    // 直接清空{t("common.button.search")}条件并重新加载数据
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
    exportForm({
      pageNo: 1,
     pageSize:pagination.pageSize,
      operationPlanId: searchOperationPlanId,
      formNo: searchFormNo,
      formName: searchFormName,
      domesticForeignTradeType: searchDomesticForeignTradeType,
      berthingTime: searchBerthingTime,
      departureTime: searchDepartureTime,
      inputStartTime: searchInputStartTime,
      inputFinishTime: searchInputFinishTime,
      printTemplate: searchPrintTemplate,
      displayPosition: searchDisplayPosition,
      publishStatus: searchPublishStatus,
      currentStep: searchCurrentStep,
      fillinStatus: searchFillinStatus,
      recipientList: searchRecipientList,
      operationMode: searchOperationMode,
      isSignatureRequired: searchIsSignatureRequired,
      isStampSignatureRequired: searchIsStampSignatureRequired,
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
      <Card title={t("common.title.search", {'entity': t('form.form')})} bordered={true}>
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
              <Form.Item name="operationPlanIdCondition" label={t("form.form.operation_plan_id")}
                         style={{maxWidth: 500}}>
                <Input placeholder={t("form.form.operation_plan_id")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="formNoCondition" label={t("form.form.form_no")} style={{maxWidth: 500}}>
                <Input placeholder={t("form.form.form_no")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="formNameCondition" label={t("form.form.form_name")} style={{maxWidth: 500}}>
                <Input placeholder={t("form.form.form_name")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="domesticForeignTradeTypeCondition" label={t("form.form.domestic_foreign_trade_type")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.DomesticForeignTradeType
                  }
                  placeholder={t("form.form.domestic_foreign_trade_type")}>
                </Select>
              </Form.Item>
            </Col>
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="berthingTimeStartCondition" label={t("form.form.berthing_time")} style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.berthing_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="berthingTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.berthing_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="departureTimeStartCondition" label={t("form.form.departure_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.departure_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="departureTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.departure_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="inputStartTimeStartCondition" label={t("form.form.input_start_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.input_start_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="inputStartTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.input_start_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="inputFinishTimeStartCondition" label={t("form.form.input_finish_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.input_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="inputFinishTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.input_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="printTemplateCondition" label={t("form.form.print_template")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.form.print_template")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="displayPositionCondition" label={t("form.form.display_position")} valuePropName="checked"*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Checkbox.Group*/}
            {/*      placeholder={t("form.form.display_position")}*/}
            {/*      options={*/}
            {/*        codeList.DisplayPosition*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="publishStatusCondition" label={t("form.form.publish_status")} style={{maxWidth: 500}}>*/}
            {/*    <Select*/}
            {/*      options={*/}
            {/*        codeList.PublishStatus*/}
            {/*      }*/}
            {/*      placeholder={t("form.form.publish_status")}>*/}
            {/*    </Select>*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="currentStepCondition" label={t("form.form.current_step")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.form.current_step")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            <Col className="gutter-row" span={8}>
              <Form.Item name="fillinStatusCondition" label={t("form.form.fillin_status")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.FillinStatus
                  }
                  placeholder={t("form.form.fillin_status")}>
                </Select>
              </Form.Item>
            </Col>
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="recipientListCondition" label={t("form.form.recipient_list")} valuePropName="checked"*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Checkbox.Group*/}
            {/*      placeholder={t("form.form.recipient_list")}*/}
            {/*      options={*/}
            {/*        codeList.RecipientList*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="operationModeCondition" label={t("form.form.operation_mode")} valuePropName="checked"*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Checkbox.Group*/}
            {/*      placeholder={t("form.form.operation_mode")}*/}
            {/*      options={*/}
            {/*        codeList.OperationMode*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="isSignatureRequiredCondition" label={t("form.form.is_signature_required")}*/}
            {/*             valuePropName="checked" style={{maxWidth: 500}}>*/}
            {/*    <Radio.Group*/}
            {/*      options={*/}
            {/*        codeList.YesNo*/}
            {/*      }*/}
            {/*      placeholder={t("form.form.is_signature_required")}*/}
            {/*      optionType="button"*/}
            {/*      buttonStyle="solid"*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="isStampSignatureRequiredCondition" label={t("form.form.is_stamp_signature_required")}*/}
            {/*             valuePropName="checked" style={{maxWidth: 500}}>*/}
            {/*    <Radio.Group*/}
            {/*      options={*/}
            {/*        codeList.YesNo*/}
            {/*      }*/}
            {/*      placeholder={t("form.form.is_stamp_signature_required")}*/}
            {/*      optionType="button"*/}
            {/*      buttonStyle="solid"*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="submissionFinishTimeStartCondition" label={t("form.form.submission_finish_time")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.submission_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="submissionFinishTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("form.form.submission_finish_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="variableNameListCondition" label={t("form.form.variable_name_list")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("form.form.variable_name_list")}*/}
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

export default FormSearch;
