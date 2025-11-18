import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Col, DatePicker, Form, Input, message, Row, Select} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'
import {createUserPermission, getUserPermission, updateUserPermission} from "@/common/service/system/user_permission";
import {UserPermissionType} from '@/common/data_type/system/user_permission'
import {UserPermissionRules} from './user_permission_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

const {RangePicker} = DatePicker;


interface IUserPermissionEditProps {
  userPermissionId: string
  needReset: number
  needSubmit: number

  onUpdate: any
  isOpen: boolean
  onGetData: any
}

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UserPermissionEdit: React.FC<IUserPermissionEditProps> = ((props) => {
  const userPermissionId = props.userPermissionId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [userPermissionForm] = Form.useForm();
  const isEdit = userPermissionId !== undefined && userPermissionId !== '' && userPermissionId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [userPermissionData, setUserPermissionData] = useState<UserPermissionType | any>({})


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getUserPermissionDetail = async (userPermissionId: string) => {
    const response = await getUserPermission(userPermissionId);
    const {data, code} = response
    if (code === 200 && data) {
      userPermissionForm.setFieldsValue({...data,})
      setUserPermissionData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setUserPermissionData(null);
    }
  }

  const createNewData: UserPermissionType = () => {
    const newData: UserPermissionType = {}

    return newData
  }

  useEffect(() => {
    console.debug("userPermissionId", userPermissionId)
    if (userPermissionId && userPermissionId !== "" && userPermissionId !== "0") {
      getUserPermissionDetail(userPermissionId)
    } else {
      const newData: UserPermissionType = createNewData()
      setUserPermissionData(newData)
      userPermissionForm.setFieldsValue(newData)
      userPermissionForm.resetFields();
    }
  }, [userPermissionId, userPermissionForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      userPermissionForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      userPermissionForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await userPermissionForm.validateFields();
    const errors = userPermissionForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && userPermissionId && userPermissionId !== '0') {
      values.userPermissionId = userPermissionId
      updateUserPermission(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('system.user_permission')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createUserPermission(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.userPermissionId) {
            response.data.userPermissionId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('system.user_permission')}));
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
    userPermissionForm.resetFields()
  }


  // // 编辑用户权限时候 获取用户权限数据失败
  // if (isEdit && userPermissionId && (userPermissionData === null || userPermissionData.userPermissionId == null)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('system.user_permission')}) : t("common.title.add", {'entity': t('system.user_permission')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('system.user_permission')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('system.user_permission')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary"
  //                   onClick={() => history.push('/system/user_permission/user_permission_table')}>
  //             {t("common.button.return_list")}
  //           </Button>
  //         }
  //       />
  //     </Card>
  //   );
  // }

  const createBasicItems = () => {
    const items = []

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="userName" label={t("system.user_permission.user_name")}
                   rules={UserPermissionRules.userName}
        >
          <Input placeholder={t("system.user_permission.user_name")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="employeeNumber" label={t("system.user_permission.employeeNumber")}
                   rules={UserPermissionRules.employeeNumber}
        >
          <Input placeholder={t("system.user_permission.employeeNumber")}/>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="bizType" label={t("system.user_permission.user_biz_type")}
                   rules={UserPermissionRules.bizType}
        >
          <Select
            options={
              codeList.UserBizType
            }
            placeholder={t("system.user_permission.user_biz_type")}>
          </Select>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="turnGroup" label={t("system.user_permission.turn_group")}
                   rules={UserPermissionRules.turnGroup}
        >
          <Select
            options={
              codeList.TurnGroup
            }
            placeholder={t("system.user_permission.turn_group")}>
          </Select>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="position" label={t("system.user_permission.position")}
                   rules={UserPermissionRules.position}
        >
          <Select
            options={
              codeList.BizPosition
            }
            placeholder={t("system.user_permission.position")}>
          </Select>
        </Form.Item>
      </Col>
    ))

    items.push((
      <Col className="gutter-row" span={12}>
        <Form.Item name="title" label={t("system.user_permission.title")}
                   rules={UserPermissionRules.title}
        >
          <Select
            options={
              codeList.BizTitle
            }
            placeholder={t("system.user_permission.title")}>
          </Select>
        </Form.Item>
      </Col>
    ))

    
    return items;
  }


  const createInputFields = (conditionValue: string) => {
    const items = []
    items.push((<><Row gutter={[16, 24]}>
      {createBasicItems()}
    </Row>
    </>));

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
        form={userPermissionForm}
        layout="vertical"
        initialValues={userPermissionData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFinish={handleSubmit}>
        {createInputFields()}

      </Form>
    </>
  )
})
export default UserPermissionEdit;
