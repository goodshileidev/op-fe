import React, {useState} from 'react'
import {Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

const {RangePicker} = DatePicker;

interface IShipOperationDocumentSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const ShipOperationDocumentSearch: React.FC<IShipOperationDocumentSearchProps> = ((props) => {
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
  const [searchTurnGroup, setSearchTurnGroup] = useState();
  const [searchTurnNo, setSearchTurnNo] = useState();
  const [searchDomesticForeignTradeType, setSearchDomesticForeignTradeType] = useState();
  const [searchBizType, setSearchBizType] = useState();
  const [searchPortName, setSearchPortName] = useState();
  const [searchVoyageNo, setSearchVoyageNo] = useState();
  const [searchNetTonnage, setSearchNetTonnage] = useState();
  const [searchGrossTonnage, setSearchGrossTonnage] = useState();
  const [searchDeadWeightTonnage, setSearchDeadWeightTonnage] = useState();
  const [searchLoadUnload, setSearchLoadUnload] = useState();
  const [searchEnglishShipName, setSearchEnglishShipName] = useState();
  const [searchShipMmsi, setSearchShipMmsi] = useState();
  const [searchPlanedArrivingTime, setSearchPlanedArrivingTime] = useState();
  const [searchBerthingTime, setSearchBerthingTime] = useState();
  const [searchDepartureTime, setSearchDepartureTime] = useState();


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
    searchForm.resetFields();
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
    exportShipOperationDocument({
      pageNo: 1,
     pageSize:pagination.pageSize,
      operationPlanId: searchOperationPlanId,
      turnGroup: searchTurnGroup,
      turnNo: searchTurnNo,
      domesticForeignTradeType: searchDomesticForeignTradeType,
      bizType: searchBizType,
      portName: searchPortName,
      voyageNo: searchVoyageNo,
      netTonnage: searchNetTonnage,
      grossTonnage: searchGrossTonnage,
      deadWeightTonnage: searchDeadWeightTonnage,
      loadUnload: searchLoadUnload,
      englishShipName: searchEnglishShipName,
      shipMmsi: searchShipMmsi,
      planedArrivingTime: searchPlanedArrivingTime,
      berthingTime: searchBerthingTime,
      departureTime: searchDepartureTime,

    });*/
  };

  return (
    <div style={{
      //display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,

    }}>
      <Card title={t("common.title.search", {'entity': t('operation.ship_operation_document')})} bordered={true}>
        <Form
          style={{}}
          size={'small'}
          form={searchForm}
          labelAlign={'right'}
          labelCol={{span: 2, offset: 0}}
          wrapperCol={{span: 16, offset: 0}}
          layout="horizontal"
          initialValues={searchData}
          //labelCol={{ span: 4 }}
          //wrapperCol={{ span: 14 }}
          //style={{ maxWidth: 1920 }}
          disabled={formDisabled}
          onFinish={handleSearch}>
          <Row gutter={[16, 24]}>
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="operationPlanIdCondition"*/}
            {/*             label={t("operation.ship_operation_document.operation_plan_id")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.operation_plan_id")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="turnGroupCondition" label={t("operation.ship_operation_document.turn_group")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.turn_group")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="turnNoCondition" label={t("operation.ship_operation_document.turn_no")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.turn_no")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="domesticForeignTradeTypeCondition"*/}
            {/*             label={t("operation.ship_operation_document.domestic_foreign_trade_type")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Select*/}
            {/*      options={*/}
            {/*        codeList.DomesticForeignTradeType*/}
            {/*      }*/}
            {/*      placeholder={t("operation.ship_operation_document.domestic_foreign_trade_type")}>*/}
            {/*    </Select>*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="bizTypeCondition" label={t("operation.ship_operation_document.biz_type")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Select*/}
            {/*      options={*/}
            {/*        codeList.BizType*/}
            {/*      }*/}
            {/*      placeholder={t("operation.ship_operation_document.biz_type")}>*/}
            {/*    </Select>*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="portNameCondition" label={t("operation.ship_operation_document.port_name")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.port_name")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="voyageNoCondition" label={t("operation.ship_operation_document.voyage_no")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.voyage_no")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="netTonnageCondition" label={t("operation.ship_operation_document.net_tonnage")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.net_tonnage")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="grossTonnageCondition" label={t("operation.ship_operation_document.gross_tonnage")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.gross_tonnage")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="deadWeightTonnageCondition"*/}
            {/*             label={t("operation.ship_operation_document.dead_weight_tonnage")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.dead_weight_tonnage")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="loadUnloadCondition" label={t("operation.ship_operation_document.load_unload")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.load_unload")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="englishShipNameCondition"*/}
            {/*             label={t("operation.ship_operation_document.english_ship_name")} style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.english_ship_name")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={8}>*/}
            {/*  <Form.Item name="shipMmsiCondition" label={t("operation.ship_operation_document.ship_mmsi")}*/}
            {/*             style={{maxWidth: 500}}>*/}
            {/*    <Input placeholder={t("operation.ship_operation_document.ship_mmsi")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="planedArrivingTimeStartCondition"*/}
            {/*             label={t("operation.ship_operation_document.planed_arriving_time")} style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD"*/}
            {/*                placeholder={t("operation.ship_operation_document.planed_arriving_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="planedArrivingTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD"*/}
            {/*                placeholder={t("operation.ship_operation_document.planed_arriving_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*</Col>*/}
            <Col className="gutter-row" span={24}>
              <Form.Item name="berthingTimeCondition"
                         label={t("operation.ship_operation_document.berthing_time")}
                        >
                <RangePicker format={"YYYY-MM-DD"}/>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item name="shipNameCondition" label={t("operation.ship_operation_document.ship_name")}
                         >
                <Input placeholder={t("operation.ship_operation_document.ship_name")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={24}>
              <Form.Item name="cargoNameCondition" label={t("template.document_template_rule.cargo_name")}
                         valuePropName="checked" >
                <Checkbox.Group
                  placeholder={t("template.document_template_rule.cargo_name")}
                  options={
                    codeList.CargoName
                  }
                />
              </Form.Item>
            </Col>

            {/*<Col className="gutter-row" span={24}>*/}
            {/*  <Form.Item name="departureTimeStartCondition"*/}
            {/*             label={t("operation.ship_operation_document.departure_time")} style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("operation.ship_operation_document.departure_time")}*/}
            {/*    />*/}
            {/*  </Form.Item>*/}
            {/*  <Form.Item name="departureTimeEndCondition" style={{maxWidth: 500}}>*/}
            {/*    <DatePicker format="YYYY-MM-DD" placeholder={t("operation.ship_operation_document.departure_time")}*/}
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

        </div>
      </Card>
    </div>
  )
})

export default ShipOperationDocumentSearch;
