import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionType} from '@/common/data_type/form/form_section'
import {Link} from 'umi'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';

interface IFormSectionSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormSectionSearch: React.FC<IFormSectionSearchProps> = ((props) => {
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

  const [searchSectionNo, setSearchSectionNo] = useState();
  const [searchSectionName, setSearchSectionName] = useState();
  const [searchMainSubSectionType, setSearchMainSubSectionType] = useState();
  const [searchSectionType, setSearchSectionType] = useState();
  const [searchContentType, setSearchContentType] = useState();
  const [searchDetailedContent, setSearchDetailedContent] = useState();
  const [searchCurrentStep, setSearchCurrentStep] = useState();
  const [searchFillinStatus, setSearchFillinStatus] = useState();
  const [searchFormatTemplateHtml, setSearchFormatTemplateHtml] = useState();
  const [searchVariableNameList, setSearchVariableNameList] = useState();




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
    exportFormSection({
      pageNo: 1,
     pageSize:pagination.pageSize,
      sectionNo: searchSectionNo,
      sectionName: searchSectionName,
      mainSubSectionType: searchMainSubSectionType,
      sectionType: searchSectionType,
      contentType: searchContentType,
      detailedContent: searchDetailedContent,
      currentStep: searchCurrentStep,
      fillinStatus: searchFillinStatus,
      formatTemplateHtml: searchFormatTemplateHtml,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,

            }}>
    <Card title={t("common.title.search",{'entity':t('form.form_section')})} bordered={true}>
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
    <Form.Item name="sectionNoCondition" label={t("form.form_section.section_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.section_no")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="sectionNameCondition" label={t("form.form_section.section_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.section_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="mainSubSectionTypeCondition" label={t("form.form_section.main_sub_section_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.MainSubSectionType
          }
        placeholder={t("form.form_section.main_sub_section_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="sectionTypeCondition" label={t("form.form_section.section_type")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.section_type")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="contentTypeCondition" label={t("form.form_section.content_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.ContentType
          }
        placeholder={t("form.form_section.content_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="detailedContentCondition" label={t("form.form_section.detailed_content")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.detailed_content")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="currentStepCondition" label={t("form.form_section.current_step")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.current_step")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="fillinStatusCondition" label={t("form.form_section.fillin_status")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.FillinStatus
          }
        placeholder={t("form.form_section.fillin_status")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="formatTemplateHtmlCondition" label={t("form.form_section.format_template_html")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.format_template_html")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="variableNameListCondition" label={t("form.form_section.variable_name_list")}   style={{maxWidth:500}}>
        <Input placeholder={t("form.form_section.variable_name_list")}
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

export default FormSectionSearch;
