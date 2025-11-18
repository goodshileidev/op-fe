import React, {useEffect, useState} from 'react'
import {history} from 'umi'
import {Alert, Button, Card, Checkbox, Col, DatePicker, Form, message, Row} from 'antd'
import {codeList} from '@/common/code_list/code_list_static'
import {createUserMenu, getUserMenu, updateUserMenu} from "@/common/service/system/user_menu";
import {UserMenuType} from '@/common/data_type/system/user_menu'
import {UserMenuRules} from './user_menu_validate'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

const {RangePicker} = DatePicker;


interface IUserMenuEditProps {
  userId: string
  userMenuId: string
  userMenuData?: UserMenuType
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

const UserMenuEdit: React.FC<IUserMenuEditProps> = ((props) => {
  const userMenuId = props.userMenuId
  const needReset = props.needReset
  const needSubmit = props.needSubmit
  const [userMenuForm] = Form.useForm();
  const isEdit = userMenuId !== undefined && userMenuId !== '' && userMenuId !== '0';
  const [formDisabled, setFormDisabled] = useState<boolean>(false)
  const [userMenuData, setUserMenuData] = useState<UserMenuType | any>(props.userMenuData)


  const {t} = useTranslation();
  let isOpen = props.isOpen


  const getUserMenuDetail = async (userMenuId: string) => {
    const response = await getUserMenu(userMenuId);
    const {data, code} = response
    if (code === 200 && data) {
      userMenuForm.setFieldsValue({...data,})
      setUserMenuData(data)
      if (props.onGetData) {
        props.onGetData(data);
      }
    } else {
      setUserMenuData(null);
    }
  }

  const createNewData: UserMenuType = () => {
    const newData: UserMenuType = {}
    newData.menuCode = []

    return newData
  }

  useEffect(() => {
    console.debug("userMenuId", userMenuId)
    if (!props.userMenuData) {
      if (userMenuId && userMenuId !== "" && userMenuId !== "0") {
        getUserMenuDetail(userMenuId)
      } else {
        const newData: UserMenuType = createNewData()
        setUserMenuData(newData)
        userMenuForm.setFieldsValue(newData)
        userMenuForm.resetFields();
      }
    }
  }, [userMenuId, props.userMenuData, userMenuForm, isOpen])

  useEffect(() => {
    console.debug("needReset", needReset)
    if (needReset !== 0) {
      userMenuForm.resetFields();
    }
  }, [needReset])

  useEffect(() => {
    console.debug("needSubmit", needSubmit)
    if (needSubmit !== 0) {
      userMenuForm.submit();
    }
  }, [needSubmit])

  const handleSubmit = async () => {
    const values = await userMenuForm.validateFields();
    const errors = userMenuForm.getFieldsError()
    if (errors.length > 0) {
      console.debug("handleSubmit terminated", errors)
      //return
    }
    console.debug("handleSubmit", values)
    // 修改
    if (isEdit && userMenuId && userMenuId !== '0') {
      values.userMenuId = userMenuId
      updateUserMenu(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          message.success(t("common.save_success", {'entity': t('system.user_menu')}));
          if (props.onUpdate) {
            props.onUpdate(true, response.data)
          }
        } else {
          message.error(msg);
        }
      });
    } else {
      // 新增

      createUserMenu(values).then((response: any) => {
        const {code, msg} = response;
        if (code === 200) {
          if (response.data && !response.data.userMenuId) {
            response.data.userMenuId = values.formSectionTemplateId
            values.formSectionTemplateId = (new Date()).getMilliseconds()
          }
          message.success(t("common.add_success", {'entity': t('system.user_menu')}));
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
    userMenuForm.resetFields()
  }


  // // 编辑用户菜单时候 获取用户菜单数据失败
  // if (isEdit && userMenuId && (!userMenuData || !userMenuData.userMenuId)) {
  //   return (
  //     <Card
  //       title={isEdit ? t("common.title.edit", {'entity': t('system.user_menu')}) : t("common.title.add", {'entity': t('system.user_menu')})}
  //       bordered={true}>
  //       <Alert
  //         message={t("common.load_failed", {'entity': t('system.user_menu')})}
  //         description={t("common.load_failed_please_retry", {'entity': t('system.user_menu')})}
  //         type="error"
  //         showIcon
  //         action={
  //           <Button size="small" type="primary" onClick={() => history.push('/system/user_menu/user_menu_table')}>
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
        <Form.Item name="menuCode" label={t("system.user_menu.menu_code")} valuePropName="checked"
                   rules={UserMenuRules.menuCode}>
          <Checkbox.Group
            placeholder={t("system.user_menu.menu_code")}
            options={
              codeList.MenuCode
            }
          />
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
        form={userMenuForm}
        layout="vertical"
        initialValues={userMenuData}
        //labelCol={{ span: 4 }}
        //wrapperCol={{ span: 14 }}
        //style={{ maxWidth: 1920 }}
        disabled={formDisabled}
        onFieldsChange={onFieldsChange}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        onFinish={handleSubmit}>
        {createInputFields()}
        {userMenuData ? <>

        </> : <></>}
      </Form>
    </>
  )
})
export default UserMenuEdit;
