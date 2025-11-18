import React, {useState} from 'react'
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  type FormProps,
  Input,
  message,
  Modal,
  Radio,
  Space,
  Upload,
  UploadFile
} from 'antd'
import {If, Then} from 'react-if';
import {FormType} from '@/common/data_type/form/form'
import {useTranslation} from 'react-i18next';
import {FormQuestionType} from "@/common/data_type/form/form_question";
import {updateFormQuestionVar, uploadFile} from "@/common/service/form/form_question";
import {FormVarValueType} from "@/common/data_type/template/form_var_value";
import {PlusOutlined} from '@ant-design/icons';

import moment from 'moment';

const {TextArea} = Input;

interface IEditVarValueModalModalProps {
  isVisible: boolean
  formData: FormType
  formQuestionId: string
  formVarValue: FormVarValueType
  formQuestionData: FormQuestionType
  onClose: any
  fileList: UploadFile[]
}


type VarType = {
  varType: string;
  varValue: string;
};

const EditVarValueModel: React.FC<IEditVarValueModalModalProps> = ((props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isVisible);
  const [formQuestionData, setFormQuestionData] = useState(props.formQuestionData);
  const [fileList, setFileList] = useState<UploadFile[]>();
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [varForm] = Form.useForm();
  varForm.setFieldValue("varValue", props.formVarValue.varValue);
  const {t} = useTranslation();
  let isOpen = props.isVisible;
  // debugger
  const handleClose = () => {
    setFileList(props.fileList);
    setIsModalOpen(false)
    if (props.onClose) {
      props.onClose(false)
    }
    return true
  }


  const onFinish: FormProps<any>['onFinish'] = (values) => {
    let varValueVO = JSON.parse(JSON.stringify(props.formVarValue));
    varValueVO.required = props.formVarValue.required
    let varValue = values.varValue !== undefined ? JSON.parse(JSON.stringify(values.varValue)) : "";
    if (varValueVO.varInputType === 'picture') {
      varValue = fileList;
    } else if (varValueVO.varInputType === 'file') {
      varValue = fileList;
    } else if (values.varValue.$isDayjsObject) {
      if (varValueVO.varInputType === 'date') {
        varValue = moment(values.varValue).format('YYYY-MM-DD');
      } else if (varValueVO.varInputType === 'time') {
        varValue = moment(values.varValue).format('YYYY-MM-DD HH:mm:ss');
      }
    }
    varValueVO.varValue = varValue;
    let varValueVOList = JSON.parse(JSON.stringify(props.formQuestionData)).varValueVOList;
    for (let i = 0; i < varValueVOList.length; i++) {
      if (varValueVOList[i].varName === varValueVO.varName) {
        varValueVOList[i] = varValueVO;
        break;
      }
    }
    updateFormQuestionVar({
      formQuestionId: props.formQuestionId,
      varValueList: JSON.stringify(varValueVOList)
    }).then((response) => {
      if (response.code && response.code === 200) {
        setFileList(props.fileList);
        setIsModalOpen(false)
        if (props.onClose) {
          props.onClose(true, varValueVO)
        }
      } else {
        message.error("保存变量失败")
        console.log('保存变量失败:', values, response);
      }
    })
  };


  function customRequest(option: any) {
    const formData = new FormData();
    formData.append('file', option.file);
    formData.append("formId", 0);
    formData.append("formQuestionId", 0);
    setUploadDisabled(true);
    uploadFile(formData).then(response => {
      if (response.success && response.code === 200) {
        let tempFileList = fileList === null ? new Array() : JSON.parse(JSON.stringify(fileList));
        tempFileList.push({
          uid: option.file.uid,
          name: option.file.name,
          status: "done",
          url: response.data
        });
        setFileList(tempFileList);
      } else {
        message.error("上传文件失败")
      }
      setUploadDisabled(false);
    });

  }

  return (
    <div>
      <Modal
        width={"600px"}
        height={"400px"}
        title={"修改变量:" + props.formVarValue.varName}
        open={isOpen}
        // okText={t("common.button.save")}
        // onOk={handleSave}
        onCancel={handleClose}
        // okType={"primary"}
        footer={null}
      >
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Form
            name="basic"
            form={varForm}
            style={{width: "100%"}}
            labelCol={{span: 6}}
            wrapperCol={{span: 18}}
            onFinish={onFinish}
            initialValues={props.formVarValue}
            autoComplete="off"
          >
            <If condition={props.formVarValue.varInputType === 'text'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <Input style={{width: 300}}/>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'textarea'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <TextArea rows={4} style={{width: 300}}/>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'radio'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <Radio.Group>
                    <Space direction="horizontal">
                      {!props.formVarValue.options ? '' : props.formVarValue.options.map((optionItem: any, optionIndex) => {
                        return (
                          <Radio value={optionItem.value}>
                            {optionItem.value}
                          </Radio>
                        )
                      })}
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'checkbox'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <Checkbox.Group options={!props.formVarValue.options ? [] : props.formVarValue.options}>
                    {/* <Space direction="horizontal">
                      {props.formVarValue.options === null ? '' : props.formVarValue.options.map((optionItem: any, optionIndex) => {
                          return (
                              <Checkbox value={optionItem}>
                                  {optionItem}
                              </Checkbox>
                          )
                      })}
                    </Space> */}
                  </Checkbox.Group>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'date'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <DatePicker format="YYYY-MM-DD"/>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'time'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime/>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'picture'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    accept="image/png, image/jpeg, image/jpg"
                    customRequest={customRequest}
                    // onChange={handleChange}
                    showUploadList={{
                      showRemoveIcon: false
                    }}
                    disabled={uploadDisabled}
                  >
                    <button style={{border: 0, background: 'none'}} type="button">
                      <PlusOutlined/>
                      <div style={{marginTop: 8}}>Upload</div>
                    </button>
                  </Upload>
                </Form.Item>
              </Then>
            </If>
            <If condition={props.formVarValue.varInputType === 'file'}>
              <Then>
                <Form.Item
                  label={props.formVarValue.varName}
                  name="varValue">
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    customRequest={customRequest}
                    // onChange={handleChange}
                    showUploadList={{
                      showRemoveIcon: false
                    }}
                    disabled={uploadDisabled}
                  >
                    <button style={{border: 0, background: 'none'}} type="button">
                      <PlusOutlined/>
                      <div style={{marginTop: 8}}>Upload</div>
                    </button>
                  </Upload>
                </Form.Item>
              </Then>
            </If>
            <Form.Item wrapperCol={{offset: 18, span: 6}}>
              <Button style={{"margin-right": "10px"}} onClick={handleClose}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  )
})

export default EditVarValueModel;
