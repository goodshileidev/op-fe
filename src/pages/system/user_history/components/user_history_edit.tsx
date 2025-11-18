import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Modal, Card, Form, Input, Button, Col, Row, DatePicker, Select, InputNumber, message, Alert, Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch, TreeSelect, Upload} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import type { CheckboxProps } from 'antd'
const { RangePicker } = DatePicker;
import {codeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'

import {getUserHistory, updateUserHistory, createUserHistory} from "@/common/service/system/user_history";
import {UserHistoryType} from '@/common/data_type/system/user_history'
import {UserHistoryRules} from './user_history_validate'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Editor from "@monaco-editor/react";


interface IUserHistoryEditProps {
  userHistoryId: string
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
const UserHistoryEdit: React.FC<IUserHistoryEditProps> = ((props) => {
  const userHistoryId = props.userHistoryId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [userHistoryForm] = Form.useForm();
  const isEdit = userHistoryId !== undefined && userHistoryId !=='0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [userHistoryData, setUserHistoryData] = useState<UserHistoryType | any>({})
  const { t } = useTranslation();
  let isOpen = props.isOpen





  const getUserHistoryDetail = async (userHistoryId: string) => {
    const response = await getUserHistory(userHistoryId);
    const {data, code} = response
    if (code === 200 && data) {
      userHistoryForm.setFieldsValue({...data,})
      setUserHistoryData(data)
    } else {
      setUserHistoryData(null);
    }
  }

  useEffect(() => {
    if (userHistoryId && userHistoryId!=="" && userHistoryId!=="0") {
      getUserHistoryDetail(userHistoryId)
    } else {
      setUserHistoryData({})
      userHistoryForm.resetFields();
    }
  }, [userHistoryId, userHistoryForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      userHistoryForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      userHistoryForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await userHistoryForm.validateFields();
    const errors = formQuestionTemplateForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && userHistoryId && userHistoryId!=='0') {
      values.userHistoryId = userHistoryId
      updateUserHistory(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success",{'entity':t('system.user_history')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增
      createUserHistory(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (!response.data.userHistoryId){
            response.data.userHistoryId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success",{'entity':t('system.user_history')}));
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
    userHistoryForm.resetFields()
  }


  // // 编辑用户变更记录时候 获取用户变更记录数据失败
  // if (isEdit && userHistoryId && (userHistoryData === null || userHistoryData.userHistoryId == null)) {
  //   return (
  //     <Card title={isEdit?t("common.title.edit",{'entity':t('system.user_history')}):t("common.title.add",{'entity':t('system.user_history')})} bordered={true}>
  //       <Alert
  //         message={t("common.load_failed",{'entity':t('system.user_history')})}
  //         description={t("common.load_failed_please_retry",{'entity':t('system.user_history')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/system/user_history/user_history_table')}>
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
      <Form form={userHistoryForm}
                layout="vertical"
                initialValues={userHistoryData}
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
<Form.Item name="userName" label={t("system.user_history.user_name")}
    rules={UserHistoryRules.userName}
    >
    <Input placeholder={t("system.user_history.user_name")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="employeeNumber" label={t("system.user_history.employee_number")}
    rules={UserHistoryRules.employeeNumber}
    >
    <Input placeholder={t("system.user_history.employee_number")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="userType" label={t("system.user_history.user_type")}
    rules={UserHistoryRules.userType}
 >
 <Select
    options={
        codeList.UserType
      }
    placeholder={t("system.user_history.user_type")} >
 </Select>
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="signatureFile" label={t("system.user_history.signature_file")}
    rules={UserHistoryRules.signatureFile}
    >
    <Input placeholder={t("system.user_history.signature_file")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="avatarUrl" label={t("system.user_history.avatar_url")}
    rules={UserHistoryRules.avatarUrl}
    >
    <Input placeholder={t("system.user_history.avatar_url")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="password" label={t("system.user_history.password")}
    rules={UserHistoryRules.password}
    >
    <Input placeholder={t("system.user_history.password")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="signatureImageUrl" label={t("system.user_history.signature_image_url")}
    rules={UserHistoryRules.signatureImageUrl}
    >
    <Input placeholder={t("system.user_history.signature_image_url")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="stampImageUrl" label={t("system.user_history.stamp_image_url")}
    rules={UserHistoryRules.stampImageUrl}
    >
    <Input placeholder={t("system.user_history.stamp_image_url")} />
</Form.Item>
</Col>

<Col className="gutter-row" span={12}>
<Form.Item name="userStatus" label={t("system.user_history.user_status")}
    rules={UserHistoryRules.userStatus}
 >
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
    </>
  )
})
export default UserHistoryEdit;
