import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Form, Row, Select, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IDocumentTemplateRuleSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const DocumentTemplateRuleSearch: React.FC<IDocumentTemplateRuleSearchProps> = ((props) => {
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

  const [searchCargoName, setSearchCargoName] = useState();
  const [searchOperationType, setSearchOperationType] = useState();
  const [searchBizType, setSearchBizType] = useState();
  const [searchDomesticForeignTradeType, setSearchDomesticForeignTradeType] = useState();


  const [codeListDocumentTemplate, setCodeListDocumentTemplate] = useState<any>([])
  useEffect(() => {
    codeListService.getCodeListDocumentTemplate({}).then((DocumentTemplateCodeList) => {
      setCodeListDocumentTemplate(DocumentTemplateCodeList)
      console.debug("DocumentTemplateCodeList", DocumentTemplateCodeList)
    })
  }, [])


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
    exportDocumentTemplateRule({
      pageNo: 1,
     pageSize:pagination.pageSize,
      cargoName: searchCargoName,
      operationType: searchOperationType,
      bizType: searchBizType,
      domesticForeignTradeType: searchDomesticForeignTradeType,

    });*/
  };

  return (
    <div style={{
      //display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,

    }}>
      <Card title={t("common.title.search", {'entity': t('template.document_template_rule')})} bordered={true}>
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
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="cargoNameCondition" label={t("template.document_template_rule.cargo_name")}*/}
            {/*             valuePropName="checked" style={{maxWidth: 500}}>*/}
            {/*    <Checkbox.Group*/}
            {/*      placeholder={t("template.document_template_rule.cargo_name")}*/}
            {/*      options={*/}
            {/*        codeList.CargoName*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            <Col className="gutter-row" span={8}>
              <Form.Item name="operationTypeCondition" label={t("template.document_template_rule.operation_type")}
                         valuePropName="checked" style={{maxWidth: 500}}>
                <Select
                  placeholder={t("template.document_template_rule.operation_type")}
                  options={
                    codeList.OperationType
                  }
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="bizTypeCondition" label={t("template.document_template_rule.biz_type")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.BizType
                  }
                  placeholder={t("template.document_template_rule.biz_type")}>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="domesticForeignTradeTypeCondition"
                         label={t("template.document_template_rule.domestic_foreign_trade_type")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.DomesticForeignTradeType
                  }
                  placeholder={t("template.document_template_rule.domestic_foreign_trade_type")}>
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

export default DocumentTemplateRuleSearch;
