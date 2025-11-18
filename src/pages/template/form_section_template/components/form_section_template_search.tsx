import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormSectionTemplateType} from '@/common/data_type/template/form_section_template'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IFormSectionTemplateSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormSectionTemplateSearch: React.FC<IFormSectionTemplateSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchSectionNo, setSearchSectionNo] = useState();
  const [searchSectionName, setSearchSectionName] = useState();
  const [searchMainSubSectionType, setSearchMainSubSectionType] = useState();
  const [searchSectionType, setSearchSectionType] = useState();
  const [searchSubSectionType, setSearchSubSectionType] = useState();
  const [searchDetailedContent, setSearchDetailedContent] = useState();
  const [searchFormatTemplateHtml, setSearchFormatTemplateHtml] = useState();
  const [searchVariableNameList, setSearchVariableNameList] = useState();




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
    exportFormSectionTemplate({
      pageNo: 1,
     pageSize:pagination.pageSize,
      sectionNo: searchSectionNo,
      sectionName: searchSectionName,
      mainSubSectionType: searchMainSubSectionType,
      sectionType: searchSectionType,
      subSectionType: searchSubSectionType,
      detailedContent: searchDetailedContent,
      formatTemplateHtml: searchFormatTemplateHtml,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
            }}>
    <Card title={t("common.title.search",{'entity':t('template.form_section_template')})}  bordered={true}>
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
    <Form.Item name="sectionNoCondition" label={t("template.form_section_template.section_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_section_template.section_no")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="sectionNameCondition" label={t("template.form_section_template.section_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_section_template.section_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="mainSubSectionTypeCondition" label={t("template.form_section_template.main_sub_section_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.MainSubSectionType
          }
        placeholder={t("template.form_section_template.main_sub_section_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="sectionTypeCondition" label={t("template.form_section_template.section_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.SectionType
          }
        placeholder={t("template.form_section_template.section_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="subSectionTypeCondition" label={t("template.form_section_template.sub_section_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.SubSectionType
          }
        placeholder={t("template.form_section_template.sub_section_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="detailedContentCondition" label={t("template.form_section_template.detailed_content")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_section_template.detailed_content")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="formatTemplateHtmlCondition" label={t("template.form_section_template.format_template_html")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_section_template.format_template_html")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="variableNameListCondition" label={t("template.form_section_template.variable_name_list")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_section_template.variable_name_list")}
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

export default FormSectionTemplateSearch;