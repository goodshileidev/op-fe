import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {DocumentTemplateType} from '@/common/data_type/template/document_template'
import {Link} from 'umi'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';

interface IDocumentTemplateSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const DocumentTemplateSearch: React.FC<IDocumentTemplateSearchProps> = ((props) => {
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

  const [searchBizType, setSearchBizType] = useState();
  const [searchShipType, setSearchShipType] = useState();
  const [searchTemplateName, setSearchTemplateName] = useState();
  const [searchTemplateNo, setSearchTemplateNo] = useState();
  const [searchCurrentVersion, setSearchCurrentVersion] = useState();
  const [searchCoverTemplateHtml, setSearchCoverTemplateHtml] = useState();
  const [searchPublishTime, setSearchPublishTime] = useState();
  const [searchRecipientList, setSearchRecipientList] = useState();
  const [searchPublishStatus, setSearchPublishStatus] = useState();
  const [searchStepDefinition, setSearchStepDefinition] = useState();
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
    exportDocumentTemplate({
      pageNo: 1,
     pageSize:pagination.pageSize,
      bizType: searchBizType,
      shipType: searchShipType,
      templateName: searchTemplateName,
      templateNo: searchTemplateNo,
      currentVersion: searchCurrentVersion,
      coverTemplateHtml: searchCoverTemplateHtml,
      publishTime: searchPublishTime,
      recipientList: searchRecipientList,
      publishStatus: searchPublishStatus,
      stepDefinition: searchStepDefinition,
      variableNameList: searchVariableNameList,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,

            }}>
    <Card title={t("common.title.search",{'entity':t('template.document_template')})} bordered={true}>
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
    <Form.Item name="bizTypeCondition" label={t("template.document_template.biz_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.BizType
          }
        placeholder={t("template.document_template.biz_type")} >
     </Select>
    </Form.Item>
</Col>
{/*<Col className="gutter-row" span={24}>*/}
{/*    <Form.Item name="shipTypeCondition" label={t("template.document_template.ship_type")}  valuePropName="checked" style={{maxWidth:500}}>*/}
{/*      <Checkbox.Group*/}
{/*        placeholder={t("template.document_template.ship_type")}*/}
{/*        options={*/}
{/*          codeList.ShipType*/}
{/*        }*/}
{/*      />*/}
{/*    </Form.Item>*/}
{/*</Col>*/}
<Col className="gutter-row" span={8}>
    <Form.Item name="templateNameCondition" label={t("template.document_template.template_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template.template_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="templateNoCondition" label={t("template.document_template.template_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("template.document_template.template_no")}
         />
    </Form.Item>
</Col>
{/*<Col className="gutter-row" span={8}>*/}
{/*    <Form.Item name="currentVersionCondition" label={t("template.document_template.current_version")}   style={{maxWidth:500}}>*/}
{/*        <Input placeholder={t("template.document_template.current_version")}*/}
{/*         />*/}
{/*    </Form.Item>*/}
{/*</Col>*/}
{/*<Col className="gutter-row" span={8}>*/}
{/*    <Form.Item name="coverTemplateHtmlCondition" label={t("template.document_template.cover_template_html")}   style={{maxWidth:500}}>*/}
{/*        <Input placeholder={t("template.document_template.cover_template_html")}*/}
{/*         />*/}
{/*    </Form.Item>*/}
{/*</Col>*/}
{/*<Col className="gutter-row" span={24}>*/}
{/*    <Form.Item name="publishTimeStartCondition" label={t("template.document_template.publish_time")}  style={{maxWidth:500}}>*/}
{/*        <DatePicker format="YYYY-MM-DD" placeholder={t("template.document_template.publish_time")}*/}
{/*        />*/}
{/*    </Form.Item>*/}
{/*    <Form.Item name="publishTimeEndCondition"   style={{maxWidth:500}}>*/}
{/*        <DatePicker format="YYYY-MM-DD" placeholder={t("template.document_template.publish_time")}*/}
{/*        />*/}
{/*    </Form.Item>*/}
{/*</Col>*/}
{/*<Col className="gutter-row" span={24}>*/}
{/*    <Form.Item name="recipientListCondition" label={t("template.document_template.recipient_list")}  valuePropName="checked" style={{maxWidth:500}}>*/}
{/*      <Checkbox.Group*/}
{/*        placeholder={t("template.document_template.recipient_list")}*/}
{/*        options={*/}
{/*          codeList.RecipientList*/}
{/*        }*/}
{/*      />*/}
{/*    </Form.Item>*/}
{/*</Col>*/}
<Col className="gutter-row" span={8}>
    <Form.Item name="publishStatusCondition" label={t("template.document_template.publish_status")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.PublishStatus
          }
        placeholder={t("template.document_template.publish_status")} >
     </Select>
    </Form.Item>
</Col>
          {/*<Col className="gutter-row" span={8}>*/}
          {/*    <Form.Item name="variableNameListCondition" label={t("template.document_template.variable_name_list")}   style={{maxWidth:500}}>*/}
          {/*        <Input placeholder={t("template.document_template.variable_name_list")}*/}
          {/*         />*/}
          {/*    </Form.Item>*/}
          {/*</Col>*/}

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

export default DocumentTemplateSearch;
