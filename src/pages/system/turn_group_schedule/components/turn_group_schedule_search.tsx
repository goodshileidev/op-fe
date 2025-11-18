import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {TurnGroupScheduleType} from '@/common/data_type/system/turn_group_schedule'
import {Link} from 'umi'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';

interface ITurnGroupScheduleSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const TurnGroupScheduleSearch: React.FC<ITurnGroupScheduleSearchProps> = ((props) => {
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
    searchForm.resetFields()
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
    exportTurnGroupSchedule({
      pageNo: 1,
     pageSize:pagination.pageSize,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,

            }}>
    <Card title={t("common.title.search",{'entity':t('system.turn_group_schedule')})} bordered={true}>
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

export default TurnGroupScheduleSearch;
