import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {Link} from 'umi'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import { DownOutlined } from '@ant-design/icons';

interface IUserPermissionSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const UserPermissionSearch: React.FC<IUserPermissionSearchProps> = ((props) => {
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

  const [searchPosition, setSearchPosition] = useState();
  const [searchEmployeeNumber, setSearchEmployeeNumber] = useState();
  const [searchUserName, setSearchUserName] = useState();
  const [searchTitle, setSearchTitle] = useState();




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
    searchForm.resetFields()
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
    exportUserPermission({
      pageNo: 1,
     pageSize:pagination.pageSize,
      position: searchPosition,
      employeeNumber: searchEmployeeNumber,
      userName: searchUserName,
      title: searchTitle,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,

            }}>
    <Card title={t("common.title.search",{'entity':t('system.user_permission')})} bordered={true}>
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
    <Form.Item name="positionCondition" label={t("system.user_permission.position")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.BizPosition
          }
        placeholder={t("system.user_permission.position")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="employeeNumberCondition" label={t("system.user_permission.employee_number")}   style={{maxWidth:500}}>
        <Input placeholder={t("system.user_permission.employee_number")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="userNameCondition" label={t("system.user_permission.user_name")}   style={{maxWidth:500}}>
        <Input placeholder={t("system.user_permission.user_name")}
         />
    </Form.Item>
</Col>
<Col className="gutter-row" span={8}>
    <Form.Item name="titleCondition" label={t("system.user_permission.title")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.BizTitle
          }
        placeholder={t("system.user_permission.title")} >
     </Select>
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
        </Space>
        <Space>
          <Button type="primary" onClick={handleAdd}>{t("common.button.add")}</Button>
        </Space>

      </div>
      </Card>
    </div>
  )
})

export default UserPermissionSearch;
