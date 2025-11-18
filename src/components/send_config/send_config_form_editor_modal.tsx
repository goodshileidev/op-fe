import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {SendConfigType} from '@/common/data_type/template/send_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import SendConfigFormEditor from '@/components/send_config/send_config_form_editor'

interface ISendConfigFormEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const SendConfigTableEditorModal: React.FC<ISendConfigFormEditorModalProps> = ((props) => {
  const [sendConfigList, setSendConfigList] = useState<SendConfigType | any>([]);
  let isOpen = props.isEditorModalOpen
  const {t} = useTranslation();
  const onClose = props.onClose
  useEffect(() => {
    const value = props.parentData[props.jsonFieldName]
    let list = []
    if (value) {
      try {
        list = JSON.parse(value)
      } catch (e) {
        console.debug("Parse data failed->sendConfig:", e)
      }
    }
    setSendConfigList(list)
    console.debug("SendConfigList", sendConfigList)
  }, []);

  const handleSave = () => {
    const value = sendConfigList
    props.parentData[props.jsonFieldName] = value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setSendConfigList(value[props.jsonFieldName])
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('template.send_config')})}
        open={isOpen}
        okText={t("common.button.save")}
        cancelText={t("common.button.close")}
        onOk={handleSave}
        onCancel={handleCancel}
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
        <SendConfigFormEditor onUpdate={onUpdate} fieldName={props.jsonFieldName} sendConfigList={sendConfigList}/>
      </Modal>
    </div>
  )
})

export default SendConfigTableEditorModal;

