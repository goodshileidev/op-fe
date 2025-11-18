import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, Input, message, Row, Select} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'

import {createUser, getUser, updateUser} from "@/common/service/system/user";
import {UserType} from '@/common/data_type/system/user'
import {UserRules} from './user_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import {
  FormSectionTemplateRules
} from "@/pages/template/form_section_template/components/form_section_template_validate";

const {RangePicker} = DatePicker;


interface IUserEditProps {
  userId: string
  needReset: number
  needSubmit: number

  onUpdate: any
  isOpen: boolean
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const UserEdit: React.FC<IUserEditProps> = ((props) => {
  const userId = props.userId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [userForm] = Form.useForm();
  const isEdit = userId !== undefined && userId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserType | any>({})
  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getUserDetail = async (userId: string) => {
    const response = await getUser(userId);
    const {data, code} = response
    if (code === 200 && data) {
      userForm.setFieldsValue({...data,})
      setUserData(data)
    } else {
      setUserData(null);
    }
  }

  useEffect(() => {
    if (userId && userId !== "" && userId !== "0") {
      getUserDetail(userId)
    } else {
      setUserData({})
      userForm.resetFields();
    }
  }, [userId, userForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      userForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      userForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {

    const values = await userForm.validateFields();

    //debugger
    const errors = userForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && userId && userId !== '0') {
      values.userId = userId
      updateUser(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('system.user')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createUser(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.userId) {
            response.data.userId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('system.user')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    }
  };

  const handleReset = () => {
    userForm.resetFields()
  }


  // // 编辑用户表时候 获取用户表数据失败
  // if (isEdit && userId && (userData === null || userData.userId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('system.user')}) : t("common.title.add", {'entity': t('system.user')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('system.user')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('system.user')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/system/user/user_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }


  const onFieldsChange = (changedFields, allFields) => {
    console.debug("onFieldsChange", changedFields, allFields)
  }
  const onFinishFailed = (values, errorFields, outOfDate) => {
    console.debug("onFinishFailed", values, errorFields)
  }
  const onValuesChange = (changedValues, allValues) => {
    console.debug("onValuesChange", changedValues, changedValues)
  }

  return (
    <>
      <Form form={userForm}
            layout="vertical"
            initialValues={userData}
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        // style={{ maxWidth: 1920 }}
            disabled={formDisabled}
            onFieldsChange={onFieldsChange}
            onFinishFailed={onFinishFailed}
            onValuesChange={onValuesChange}
            onFinish={handleSubmit}>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={12}>
            <Form.Item name="userName" label={t("system.user.user_name")}
                       rules={UserRules.userName}
            >
              <Input placeholder={t("system.user.user_name")}/>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item name="employeeNumber" label={t("system.user.employee_number")}
                       rules={UserRules.employeeNumber}
            >
              <Input placeholder={t("system.user.employee_number")}/>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="nfcCode" label={t("system.user.nfc_code")}
                       rules={UserRules.nfcCode}
            >
              <Input placeholder={t("system.user.nfc_code")}/>
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item name="userType" label={t("system.user.user_type")}
                       rules={UserRules.userType}
            >
              <Select
                options={
                  codeList.UserType
                }
                placeholder={t("system.user.user_type")}>
              </Select>
            </Form.Item>
          </Col>

          {/*<Col className="gutter-row" span={12}>*/}
          {/*  <Form.Item name="signatureFile" label={t("system.user.signature_file")}*/}
          {/*             rules={UserRules.signatureFile}*/}
          {/*  >*/}
          {/*    <Input placeholder={t("system.user.signature_file")}/>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

          {/*<Col className="gutter-row" span={12}>*/}
          {/*  <Form.Item name="avatarUrl" label={t("system.user.avatar_url")}*/}
          {/*             rules={UserRules.avatarUrl}*/}
          {/*  >*/}
          {/*    <Input placeholder={t("system.user.avatar_url")}/>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

          <Col className="gutter-row" span={12}>
            <Form.Item name="password" label={t("system.user.password")}
                       rules={UserRules.password}
            >
              <Input placeholder={t("system.user.password")}/>
            </Form.Item>
          </Col>

          {/*<Col className="gutter-row" span={12}>*/}
          {/*  <Form.Item name="signatureImageUrl" label={t("system.user.signature_image_url")}*/}
          {/*             rules={UserRules.signatureImageUrl}*/}
          {/*  >*/}
          {/*    <Input placeholder={t("system.user.signature_image_url")}/>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

          {/*<Col className="gutter-row" span={12}>*/}
          {/*  <Form.Item name="stampImageUrl" label={t("system.user.stamp_image_url")}*/}
          {/*             rules={UserRules.stampImageUrl}*/}
          {/*  >*/}
          {/*    <Input placeholder={t("system.user.stamp_image_url")}/>*/}
          {/*  </Form.Item>*/}
          {/*</Col>*/}

          <Col className="gutter-row" span={12}>
            <Form.Item name="userStatus" label={t("system.user.user_status")}
                       rules={UserRules.userStatus}
            >
              <Select
                options={
                  codeList.UserStatus
                }
                placeholder={t("system.user.user_status")}>
              </Select>
            </Form.Item>
          </Col>


        </Row>
        <Row gutter={[16, 24]}>
          <Col className="gutter-row" span={24}>
            <Form.Item name="menuCode" label={t("system.user.menu_code")}
                       rules={FormSectionTemplateRules.menuCode}>
              <Checkbox.Group
                options={
                  codeList.MenuCode
                }
              />
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </>
  )
})
export default UserEdit;
