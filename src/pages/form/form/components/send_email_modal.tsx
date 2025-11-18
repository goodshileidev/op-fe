import React, {useState} from 'react'
import {Form, type FormProps, Input, message, Modal} from 'antd'
import {FormType} from '@/common/data_type/form/form'
import {useTranslation} from 'react-i18next';
import {sendEmail} from "@/common/service/form/form";
import {createPdf} from "@/common/service/common";


interface IShowAccessLinkModalProps {
  isVisible: boolean
  formData: FormType
  onClose: any
  style: "basic" | "simple"
}


type FieldType = {
  receiverEmail: string;
};

const SendMailModal: React.FC<IShowAccessLinkModalProps> = ((props) => {
  const [isModalOpen, setIsModalOpen] = useState(props.isVisible);
  const {t} = useTranslation();
  let isOpen = props.isVisible
  const [sendMailForm] = Form.useForm();
  const handleClose = () => {
    setIsModalOpen(false)
    if (props.onClose) {
      props.onClose()
    }
    return true
  }


  const handleOk = () => {
    sendMailForm.submit();
  }

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const params = {
      pageName: props.formData?.formName,
      url: location.protocol + "//" + location.host + location.pathname + "/#/printForm/" + props.formData.formId
    }
    console.debug("onCreatePdf", params)
    createPdf(params).then((response) => {
      const pdfUrl = response
      sendEmail({
        formId: props.formData.formId,
        formName: props.formData.formName,
        accessCode: props.formData.accessCode,
        receiverEmail: values.receiverEmail,
        printUrl: params.url,
        //pdfUrl: "https://oss.66yunliantest.cn/test/ship/form//%E5%8C%96%E5%B7%A5%E7%A0%81%E5%A4%B4%E6%B6%88%E9%98%B2%E8%AE%BE%E6%96%BD%E6%A3%80%E6%9F%A5%E8%A1%A81%23.pdf?Expires=1730735278&OSSAccessKeyId=LTAI5tNhXmBxCasMKHWiKZon&Signature=6oG8wVkxyrygxXWTRQoQiAPORkE%3D"
        pdfUrl: pdfUrl
      }).then((response) => {
        if (response.success) {
          message.success("发送邮件成功")
          handleClose()
        } else {
          message.error("发送邮件失败")
        }
        console.log('verifyForm result:', values, response);
      })
    })
  };
  return (
    <div>
      <Modal
        width={"600px"}
        title={"邮件发送PDF"}
        open={isOpen}
        okText={t("common.ok")}
        onOk={handleOk}
        onCancel={handleClose}
        okType={"primary"}

        // footer={[<Button type={'primary'} onClick={() => {
        //   isOpen = false
        //   console.debug("isOpen", isOpen)
        // }
        // }></Button>,
        //   <Button onClick={() => {
        //     isOpen = false
        //     console.debug("isOpen", isOpen)
        //   }
        //   }>
        //   </Button>]}
      >
        <Form
          name="basic"
          form={sendMailForm}
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          initialValues={{remember: true}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="接受邮箱"
            name="receiverEmail"
            rules={[{required: true, message: '请输入接受Email'}, {type: 'email', message: '请输入合法的Email'}]}
          >
            <Input style={{width: 300}}/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
})

export default SendMailModal;
