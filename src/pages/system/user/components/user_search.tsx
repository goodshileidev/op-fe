import React, {useState} from 'react'
import {Button, Card, Col, Form, Row, Select, Space, Input} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

interface IUserSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const UserSearch: React.FC<IUserSearchProps> = ((props) => {
  const pagination = props.pagination
  const [searchForm] = Form.useForm();
  const [searchData, setSearchData] = useState<any>({})
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const {t} = useTranslation();

  const [searchUserName, setSearchUserName] = useState();
  const [searchEmployeeNumber, setSearchEmployeeNumber] = useState();
  const [searchUserType, setSearchUserType] = useState();
  const [searchUserStatus, setSearchUserStatus] = useState();


  const handleAdd = () => {
    props.onAdd()
  };

  const handleSearch = async () => {
    const values = await searchForm.validateFields();
    const params = Object.assign({}, values, {
      pageNo: 1,
      pageSize: pagination.pageSize,
    })
    props.onReloadTable(params);
  };

  const handleResetSearch = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    searchForm.resetFields()
    const params = Object.assign({}, {
      pageNo: 1,
      pageSize: pagination.pageSize,
    })
    props.onReloadTable(params);
  };
  const handleImport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
  };
  const handleExport = () => {
    // 直接清空{t("common.button.search")}条件并重新加载数据
    /*
    exportUser({
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
      <Card title={t("common.title.search", {'entity': t('system.user')})} bordered={true}>
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
		    <Form.Item name="userNameCondition" label={t("system.user.user_name")}   style={{maxWidth:500}}>
		        <Input placeholder={t("system.user.user_name")}
		         />
		    </Form.Item>
		</Col>
		<Col className="gutter-row" span={12}>
		    <Form.Item name="employeeNumberCondition" label={t("system.user.employee_number")}   style={{maxWidth:500}}>
		        <Input placeholder={t("system.user.employee_number")}
		         />
		    </Form.Item>
		</Col>
		<Col className="gutter-row" span={12}>
              <Form.Item name="userTypeCondition" label={t("system.user.user_type")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.UserType
                  }
                  placeholder={t("system.user.user_type")}>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="userStatusCondition" label={t("system.user.user_status")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.UserStatus
                  }
                  placeholder={t("system.user.user_status")}>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="hasNfcCodeCondition" label={t("system.user.has_nfc_code")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.YesNo
                  }
                  placeholder={t("system.user.has_nfc_code")}>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item name="hasSignatureCondition" label={t("system.user.has_signature")} style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.YesNo
                  }
                  placeholder={t("system.user.has_signature")}>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
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

export default UserSearch;
