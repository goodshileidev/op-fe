import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Tabs, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {renderDateInRow, renderTimeInRow} from "@/common/common_formatter";
import {getShipOperationDocument, updateShipOperationDocument, createShipOperationDocument} from "@/common/service/form/ship_operation_document";
import {ShipOperationDocumentType} from '@/common/data_type/form/ship_operation_document'
import {ShipOperationDocumentRules} from './ship_operation_document_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";
import TextArea from "antd/es/input/TextArea";




interface IShipOperationDocumentEditProps {
  shipOperationDocumentId: string
  shipOperationDocumentData?: ShipOperationDocumentType
  needReset: number
  needSubmit: number

  onUpdate: any
  onGetData: any
  isOpen: boolean
}
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ShipOperationDocumentEdit: React.FC<IShipOperationDocumentEditProps> = ((props) => {
  const shipOperationDocumentId = props.shipOperationDocumentId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [shipOperationDocumentForm] = Form.useForm();
  const isEdit = shipOperationDocumentId !== undefined && shipOperationDocumentId !=='' && shipOperationDocumentId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [shipOperationDocumentData, setShipOperationDocumentData] = useState<ShipOperationDocumentType | any>(props.shipOperationDocumentData)



  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getShipOperationDocumentDetail = async (shipOperationDocumentId: string) => {
    const response = await getShipOperationDocument(shipOperationDocumentId);
    const {data, code} = response
    if (code === 200 && data) {
      shipOperationDocumentForm.setFieldsValue({...data,})
      setShipOperationDocumentData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setShipOperationDocumentData(null);
    }
  }

  const createNewData:ShipOperationDocumentType = () => {
    const newData:ShipOperationDocumentType = {}

    return newData
  }

  useEffect(() => {
    console.debug("shipOperationDocumentId", shipOperationDocumentId)
    if (!props.shipOperationDocumentData) {
      if (shipOperationDocumentId && shipOperationDocumentId!=="" && shipOperationDocumentId!=="0") {
        getShipOperationDocumentDetail(shipOperationDocumentId)
      } else {
        const newData:ShipOperationDocumentType = createNewData()
        setShipOperationDocumentData(newData)
        shipOperationDocumentForm.setFieldsValue(newData)
        shipOperationDocumentForm.resetFields();
      }
    }
  }, [shipOperationDocumentId, props.shipOperationDocumentData, shipOperationDocumentForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      shipOperationDocumentForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      shipOperationDocumentForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await shipOperationDocumentForm.validateFields();
    const errors = shipOperationDocumentForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && shipOperationDocumentId && shipOperationDocumentId!=='0') {
      values.shipOperationDocumentId = shipOperationDocumentId
      updateShipOperationDocument(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('form.ship_operation_document')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createShipOperationDocument(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.shipOperationDocumentId){
            response.data.shipOperationDocumentId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('form.ship_operation_document')}));
          if (props.onUpdate){
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    }
  };

  const handleReset = () => {
    shipOperationDocumentForm.resetFields()
  }


  // // 编辑船舶作业一体化表单时候 获取船舶作业一体化表单数据失败
  // if (isEdit && shipOperationDocumentId && (!shipOperationDocumentData || !shipOperationDocumentData.shipOperationDocumentId)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('form.ship_operation_document')}):t("common.title.add",{'entity':t('form.ship_operation_document')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('form.ship_operation_document')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('form.ship_operation_document')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/form/ship_operation_document/ship_operation_document_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

const createBasicBasicItems = () =>{
  const items = []

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="bizType" label={t("form.ship_operation_document.biz_type")}
    rules={ShipOperationDocumentRules.bizType}
 >
 <Select
    options={
        codeList.BizType
      }
    placeholder={t("form.ship_operation_document.biz_type")} >
 </Select>
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="portName" label={t("form.ship_operation_document.port_name")}
    rules={ShipOperationDocumentRules.portName}
    >
    <Input placeholder={t("form.ship_operation_document.port_name")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="voyageNo" label={t("form.ship_operation_document.voyage_no")}
    rules={ShipOperationDocumentRules.voyageNo}
    >
    <Input placeholder={t("form.ship_operation_document.voyage_no")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="netTonnage" label={t("form.ship_operation_document.net_tonnage")}
    rules={ShipOperationDocumentRules.netTonnage}
    >
    <Input placeholder={t("form.ship_operation_document.net_tonnage")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="grossTonnage" label={t("form.ship_operation_document.gross_tonnage")}
    rules={ShipOperationDocumentRules.grossTonnage}
    >
    <Input placeholder={t("form.ship_operation_document.gross_tonnage")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="deadWeightTonnage" label={t("form.ship_operation_document.dead_weight_tonnage")}
    rules={ShipOperationDocumentRules.deadWeightTonnage}
    >
    <Input placeholder={t("form.ship_operation_document.dead_weight_tonnage")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="loadUnload" label={t("form.ship_operation_document.load_unload")}
    rules={ShipOperationDocumentRules.loadUnload}
    >
    <Input placeholder={t("form.ship_operation_document.load_unload")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="englishShipName" label={t("form.ship_operation_document.english_ship_name")}
    rules={ShipOperationDocumentRules.englishShipName}
    >
    <Input placeholder={t("form.ship_operation_document.english_ship_name")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="shipMmsi" label={t("form.ship_operation_document.ship_mmsi")}
    rules={ShipOperationDocumentRules.shipMmsi}
    >
    <Input placeholder={t("form.ship_operation_document.ship_mmsi")} />
</Form.Item>
</Col>
    ))

    items.push((
<Col className="gutter-row" span={12}>
<Form.Item name="dataDate" label={t("form.ship_operation_document.data_date")}
    rules={ShipOperationDocumentRules.dataDate}
    >
    <Input placeholder={t("form.ship_operation_document.data_date")} />
</Form.Item>
</Col>
    ))
  return items;
}


  const createInputFields = (conditionValue: string) => {
    const items = []
    items.push((
<Tabs
    defaultActiveKey="basic"
    items={[
    {label: '基本信息',key: 'basic',children:(
  <>
<Row>
{createBasicBasicItems()}
</Row>
</>)},

         ]}
  />
  ));

    return items;
  }

  const onFieldsChange = (changedFields, allFields) => {
    console.debug("onFieldsChange", changedFields, allFields)
  }
  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.debug("onFinishFailed", values, errorFields)
  }
  const onValuesChange = (changedValues, allValues) => {
    console.debug("onValuesChange", changedValues, allValues)
  }

  return (
    <>
      <Form
        form={shipOperationDocumentForm}
        layout="vertical"
        initialValues={shipOperationDocumentData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFinish={handleSubmit}>
        {createInputFields()}
        {shipOperationDocumentData?<>

        </>:<></>}
      </Form>
    </>
  )
})
export default ShipOperationDocumentEdit;
