import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {FormTemplateVersionType} from '@/common/data_type/template/form_template_version'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IFormTemplateVersionSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const FormTemplateVersionSearch: React.FC<IFormTemplateVersionSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchFormName, setSearchFormName] = useState();
  const [searchFormNo, setSearchFormNo] = useState();
  const [searchPrintTemplate, setSearchPrintTemplate] = useState();
  const [searchRecipientList, setSearchRecipientList] = useState();
  const [searchOperationMode, setSearchOperationMode] = useState();
  const [searchPreviewHtml, setSearchPreviewHtml] = useState();
  const [searchIsSignatureRequired, setSearchIsSignatureRequired] = useState();
  const [searchIsStampSignatureRequired, setSearchIsStampSignatureRequired] = useState();
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
    exportFormTemplateVersion({
      pageNo: 1,
     pageSize:pagination.pageSize,
      formName: searchFormName,
      formNo: searchFormNo,
      printTemplate: searchPrintTemplate,
      recipientList: searchRecipientList,
      operationMode: searchOperationMode,
      previewHtml: searchPreviewHtml,
      isSignatureRequired: searchIsSignatureRequired,
      isStampSignatureRequired: searchIsStampSignatureRequired,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
            }}>
    <Card title={t("common.title.search",{'entity':t('template.form_template_version')})}  bordered={true}>
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
    <Form.Item name="formNameCondition" label={t("template.form_template_version.form_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_template_version.form_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="formNoCondition" label={t("template.form_template_version.form_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_template_version.form_no")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="printTemplateCondition" label={t("template.form_template_version.print_template")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_template_version.print_template")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="recipientListCondition" label={t("template.form_template_version.recipient_list")}  valuePropName="checked" style={{maxWidth:500}}>
      <Checkbox.Group
        placeholder={t("template.form_template_version.recipient_list")}
        options={
          codeList.RecipientList
        }
      />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="operationModeCondition" label={t("template.form_template_version.operation_mode")}  valuePropName="checked" style={{maxWidth:500}}>
      <Checkbox.Group
        placeholder={t("template.form_template_version.operation_mode")}
        options={
          codeList.OperationMode
        }
      />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="previewHtmlCondition" label={t("template.form_template_version.preview_html")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_template_version.preview_html")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="isSignatureRequiredCondition" label={t("template.form_template_version.is_signature_required")}  valuePropName="checked"  style={{maxWidth:500}}>
      <Radio.Group
            options={
            codeList.YesNo
            }
            placeholder={t("template.form_template_version.is_signature_required")}
            optionType="button"
            buttonStyle="solid"
          />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="isStampSignatureRequiredCondition" label={t("template.form_template_version.is_stamp_signature_required")}  valuePropName="checked"  style={{maxWidth:500}}>
      <Radio.Group
            options={
            codeList.YesNo
            }
            placeholder={t("template.form_template_version.is_stamp_signature_required")}
            optionType="button"
            buttonStyle="solid"
          />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="variableNameListCondition" label={t("template.form_template_version.variable_name_list")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.form_template_version.variable_name_list")}
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

export default FormTemplateVersionSearch;