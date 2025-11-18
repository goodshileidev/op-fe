import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormQuestionType} from '@/common/data_type/form/form_question'
import {Link} from 'umi'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';

interface IFormQuestionSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormQuestionSearch: React.FC<IFormQuestionSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
      maxWidth: 'none',
//      background: token.colorFillAlter,
//      borderRadius: token.borderRadiusLG,
      padding: 24,
  };

  const [searchQuestionNo, setSearchQuestionNo] = useState();
  const [searchQuestionTitleList, setSearchQuestionTitleList] = useState();
  const [searchSubQuestionType, setSearchSubQuestionType] = useState();
  const [searchInputControlType, setSearchInputControlType] = useState();
  const [searchVariableNameList, setSearchVariableNameList] = useState();
  const [searchInputTime, setSearchInputTime] = useState();
  const [searchOperationMode, setSearchOperationMode] = useState();
  const [searchIsPhotoEvidenceRequired, setSearchIsPhotoEvidenceRequired] = useState();
  const [searchIsSignatureEvidenceRequired, setSearchIsSignatureEvidenceRequired] = useState();




  const handleAdd = () => {
    props.onAdd()
  };

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    props.setCurrentConditions(values)
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
    props.setCurrentConditions({})
    props.onReloadTable(params);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportFormQuestion({
      pageNo: 1,
     pageSize:pagination.pageSize,
      questionNo: searchQuestionNo,
      questionTitleList: searchQuestionTitleList,
      subQuestionType: searchSubQuestionType,
      inputControlType: searchInputControlType,
      variableNameList: searchVariableNameList,
      inputTime: searchInputTime,
      operationMode: searchOperationMode,
      isPhotoEvidenceRequired: searchIsPhotoEvidenceRequired,
      isSignatureEvidenceRequired: searchIsSignatureEvidenceRequired,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,

            }}>
    <Card title={t("common.title.search",{'entity':t('form.form_question')})} bordered={true}>
      <Form
        style={{  }}
        size={'small'}
        form={searchForm}
        labelAlign={'right'}
        labelCol={{ span: 8, offset: 0 }}
        wrapperCol={{ span: 12, offset: 0 }}
        layout="horizontal"
        initialValues={searchData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFinish={handleSearch}>
        <Row gutter={[16, 24]}>
<Col className="gutter-row" span={8}>
    <Form.Item name="questionNoCondition" label={t("form.form_question.question_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_question.question_no")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="questionTitleListCondition" label={t("form.form_question.question_title_list")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_question.question_title_list")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="subQuestionTypeCondition" label={t("form.form_question.sub_question_type")}  valuePropName="checked" style={{maxWidth:500}}>
      <Checkbox.Group
        placeholder={t("form.form_question.sub_question_type")}
        options={
          codeList.SubQuestionType
        }
      />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="inputControlTypeCondition" label={t("form.form_question.input_control_type")}  valuePropName="checked" style={{maxWidth:500}}>
      <Checkbox.Group
        placeholder={t("form.form_question.input_control_type")}
        options={
          codeList.InputControlType
        }
      />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="variableNameListCondition" label={t("form.form_question.variable_name_list")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_question.variable_name_list")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="inputTimeStartCondition" label={t("form.form_question.input_time")}  style={{maxWidth:500}}>
        <DatePicker format="YYYY-MM-DD" placeholder={t("form.form_question.input_time")}
        />
    </Form.Item>
    <Form.Item name="inputTimeEndCondition"   style={{maxWidth:500}}>
        <DatePicker format="YYYY-MM-DD" placeholder={t("form.form_question.input_time")}
        />
    </Form.Item>
</Col>
{/*<Col className="gutter-row" span={8}>*/}
{/*    <Form.Item name="operationModeCondition" label={t("form.form_question.operation_mode")}  valuePropName="checked" style={{maxWidth:500}}>*/}
{/*      <Checkbox.Group*/}
{/*        placeholder={t("form.form_question.operation_mode")}*/}
{/*        options={*/}
{/*          codeList.OperationMode*/}
{/*        }*/}
{/*      />*/}
{/*    </Form.Item>*/}
{/*</Col>*/}
<Col className="gutter-row" span={8}>
    <Form.Item name="isPhotoEvidenceRequiredCondition" label={t("form.form_question.is_photo_evidence_required")}  valuePropName="checked"  style={{maxWidth:500}}>
      <Radio.Group
            options={
            codeList.YesNo
            }
            placeholder={t("form.form_question.is_photo_evidence_required")}
            optionType="button"
            buttonStyle="solid"
          />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="isSignatureEvidenceRequiredCondition" label={t("form.form_question.is_signature_evidence_required")}  valuePropName="checked"  style={{maxWidth:500}}>
      <Radio.Group
            options={
            codeList.YesNo
            }
            placeholder={t("form.form_question.is_signature_evidence_required")}
            optionType="button"
            buttonStyle="solid"
          />
    </Form.Item>
</Col>

        </Row>
        </Form>
            <a style={{
               fontSize: 12,
               display:"none"
               }}
             onClick={() => {
              setExpand(!expand);
              }}
            ><DownOutlined rotate={expand ? 180 : 0} />折叠条件
            </a>
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

export default FormQuestionSearch;
