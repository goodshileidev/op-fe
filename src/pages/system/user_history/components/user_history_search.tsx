import React, {useEffect, useState} from 'react'
import {Col, Divider, Row, Card, Form, Input, Button, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload, Space, Modal, Popconfirm, Table, Tag, TableProps, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {Link} from 'umi'
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';

interface IUserHistorySearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const UserHistorySearch: React.FC<IUserHistorySearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const { t } = useTranslation();

  const [searchUserType, setSearchUserType] = useState();
  const [searchUserStatus, setSearchUserStatus] = useState();




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
    searchForm.resetFields()
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
    exportUserHistory({
      pageNo: 1,
     pageSize:pagination.pageSize,
      userType: searchUserType,
      userStatus: searchUserStatus,

    });*/
  };

  return (
    <div style={{
            //display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16
            }}>
    <Card title={t("common.title.search",{'entity':t('system.user_history')})}  bordered={true}>
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
    <Form.Item name="userTypeCondition" label={t("system.user_history.user_type")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.UserType
          }
        placeholder={t("system.user_history.user_type")} >
     </Select>
    </Form.Item>
</Col>
<Col className="gutter-row" span={12}>
    <Form.Item name="userStatusCondition" label={t("system.user_history.user_status")}  style={{maxWidth:500}}>
     <Select
        options={
            codeList.UserStatus
          }
        placeholder={t("system.user_history.user_status")} >
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

export default UserHistorySearch;
