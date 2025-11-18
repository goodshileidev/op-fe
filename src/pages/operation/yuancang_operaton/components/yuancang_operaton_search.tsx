import React, {useState} from 'react'
import {Button, Card, Col, DatePicker, Form, Row, Select, Space} from 'antd'
import {DownOutlined} from '@ant-design/icons'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';

interface IYuancangOperatonSearchProps {
  onReloadTable: any,
  setCurrentConditions: any,
  onAdd: any,
  pagination?: any
}

const YuancangOperatonSearch: React.FC<IYuancangOperatonSearchProps> = ((props) => {
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

  const [searchDataDate, setSearchDataDate] = useState();
  const [searchFormName, setSearchFormName] = useState();
  const [searchOperateStatus, setSearchOperateStatus] = useState();


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
    exportYuancangOperaton({
      pageNo: 1,
     pageSize:pagination.pageSize,
      dataDate: searchDataDate,
      formName: searchFormName,
      operateStatus: searchOperateStatus,

    });*/
  };

  return (
    <div style={{
      //display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 16,

    }}>
      <Card title={t("common.title.search", {'entity': t('operation.yuancang_operaton')})} bordered={true}>
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
            <Col className="gutter-row" span={8}>
              <Form.Item name="dataDateCondition" label={t("operation.yuancang_operaton.data_date")}
                         style={{maxWidth: 500}}>
                <DatePicker format="YYYY-MM-DD" placeholder={t("operation.yuancang_operaton.data_date")}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="turnGroupCondition" label={t("operation.yuancang_operaton.turn_group")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.TurnGroup
                  }
                  placeholder={t("operation.yuancang_operaton.turn_group")}>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item name="turnNoCondition" label={t("operation.yuancang_operaton.turn_no")}
                         style={{maxWidth: 500}}>
                <Select
                  options={
                    codeList.TurnNo
                  }
                  placeholder={t("operation.yuancang_operaton.turn_no")}>
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
        </div>
      </Card>
    </div>
  )
})

export default YuancangOperatonSearch;
