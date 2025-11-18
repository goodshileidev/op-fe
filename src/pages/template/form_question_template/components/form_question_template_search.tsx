import React, { useEffect, useState } from 'react'
import { Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin } from 'antd'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import { FormQuestionTemplateType } from '@/common/data_type/template/form_question_template'
import { Link } from 'umi'
import { codeList } from '@/common/code_list/code_list_static'
import { codeListService } from '@/common/code_list/code_list_service'
import { useTranslation } from 'react-i18next';

interface IFormQuestionTemplateSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormQuestionTemplateSearch: React.FC<IFormQuestionTemplateSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchQuestionNo, setSearchQuestionNo] = useState();
  const [searchQuestionTitleList, setSearchQuestionTitleList] = useState();
  const [searchSubQuestionType, setSearchSubQuestionType] = useState();
  const [searchInputControlType, setSearchInputControlType] = useState();
  const [searchVariableNameList, setSearchVariableNameList] = useState();
  const [searchOperationMode, setSearchOperationMode] = useState();
  const [searchIsPhotoEvidenceRequired, setSearchIsPhotoEvidenceRequired] = useState();
  const [searchIsSignatureEvidenceRequired, setSearchIsSignatureEvidenceRequired] = useState();




  const handleAdd = () => {
    props.onAdd()
  };

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
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
    props.onReloadTable(params);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportFormQuestionTemplate({
      pageNo: 1,
     pageSize:pagination.pageSize,
      questionNo: searchQuestionNo,
      questionTitleList: searchQuestionTitleList,
      subQuestionType: searchSubQuestionType,
      inputControlType: searchInputControlType,
      variableNameList: searchVariableNameList,
      operationMode: searchOperationMode,
      isPhotoEvidenceRequired: searchIsPhotoEvidenceRequired,
      isSignatureEvidenceRequired: searchIsSignatureEvidenceRequired,

    });*/
  };

  return (
    <div style={{
      //display: 'flex',
    }}>
      <Card title={t("common.title.search", { 'entity': t('template.form_question_template') })} bordered={true}>
        <Form
          form={searchForm}
          colon={true}
          labelAlign={'right'}
          labelCol={{ span: 6 }}
          labelWrap={true}
          initialValues={searchData}
          //labelCol={{ span: 4 }}
          //wrapperCol={{ span: 14 }}
          //style={{ maxWidth: 1920 }}
          disabled={formDisabled}
          onFinish={handleSearch}>
          <Row gutter={[16, 24]} style={{ rowGap: "0px" }}>
            <Col className="gutter-row" span={8}>
              <Form.Item name="questionNoCondition" label={t("template.form_question_template.question_no")} style={{ maxWidth: 500 }}>
                <Input placeholder={t("template.form_question_template.question_no")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="questionTitleListCondition" label={t("template.form_question_template.question_title_list")} style={{ maxWidth: 500 }}>
                <Input placeholder={t("template.form_question_template.question_title_list")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="subQuestionTypeCondition" label={t("template.form_question_template.sub_question_type")} style={{ maxWidth: 500 }}>
                <Input placeholder={t("template.form_question_template.sub_question_type")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="inputControlTypeCondition" label={t("template.form_question_template.input_control_type")} valuePropName="checked" style={{ maxWidth: 500 }}>
                <Checkbox.Group
                  options={
                    codeList.InputControlType
                  }
                />
              </Form.Item>
            </Col>
            {/* <Col className="gutter-row" span={8}>
              <Form.Item name="variableNameListCondition" label={t("template.form_question_template.variable_name_list")} style={{ maxWidth: 500 }}>
                <Input placeholder={t("template.form_question_template.variable_name_list")}
                />
              </Form.Item>
            </Col> */}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="operationModeCondition" label={t("template.form_question_template.operation_mode")} valuePropName="checked" style={{ maxWidth: 500 }}>*/}
            {/*    <Checkbox.Group*/}
            {/*      options={*/}
            {/*        codeList.OperationMode*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/* <Col className="gutter-row" span={8}>
              <Form.Item name="isPhotoEvidenceRequiredCondition" label={t("template.form_question_template.is_photo_evidence_required")} valuePropName="checked" style={{ maxWidth: 500 }}>
                <Radio.Group
                  options={
                    codeList.YesNo
                  }
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Col> */}
            {/* <Col className="gutter-row" span={8}>
              <Form.Item name="isSignatureEvidenceRequiredCondition" label={t("template.form_question_template.is_signature_evidence_required")} valuePropName="checked" style={{ maxWidth: 500 }}>
                <Radio.Group
                  options={
                    codeList.YesNo
                  }
                  optionType="button"
                  buttonStyle="solid"
                />
              </Form.Item>
            </Col> */}

          </Row>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <Space>
            <Button type="primary" onClick={handleSearch}>{t("common.button.search")}</Button>
            <Button type="primary" onClick={handleResetSearch}>{t("common.button.reset")}</Button>
            {/* <Button type="primary" onClick={handleImport}>{t("common.button.import")}</Button>
            <Button type="primary" onClick={handleExport}>{t("common.button.export")}</Button> */}
          </Space>
          <Space>
            <Button type="primary" onClick={handleAdd}>{t("common.button.add")}</Button>
          </Space>
        </div>
      </Card>
    </div>
  )
})

export default FormQuestionTemplateSearch;
