import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {ReceiptOrgType} from '@/common/data_type/system/receipt_org'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IReceiptOrgSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const ReceiptOrgSearch: React.FC<IReceiptOrgSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchOrgNo, setSearchOrgNo] = useState();
  const [searchOrgName, setSearchOrgName] = useState();
  const [searchOrgType, setSearchOrgType] = useState();




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
    searchForm.resetFields()
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
    exportReceiptOrg({
      pageNo: 1,
     pageSize:pagination.pageSize,
      orgNo: searchOrgNo,
      orgName: searchOrgName,
      orgType: searchOrgType,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
            }}>
    <Card title={t("common.title.search",{'entity':t('system.receipt_org')})}  bordered={true}>
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
    <Form.Item name="orgNoCondition" label={t("system.receipt_org.org_no")}   style={{maxWidth:500}}>
        <Input placeholder={t("system.receipt_org.org_no")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="orgNameCondition" label={t("system.receipt_org.org_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("system.receipt_org.org_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="orgTypeCondition" label={t("system.receipt_org.org_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.OrgType
          }
        placeholder={t("system.receipt_org.org_type")} >
     </Select>
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

export default ReceiptOrgSearch;
