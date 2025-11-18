import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {SendConfigType} from '@/common/data_type/template/send_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import SendConfigTableEditor from '@/components/send_config/send_config_table_editor'

interface ISendConfigTableEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const SendConfigTableEditorModal: React.FC<ISendConfigTableEditorModalProps> = ((props) => {
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
    setSendConfigList(value)
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('template.send_config')})}
        open={isOpen}
        okText={t("common.close")}
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
        <SendConfigTableEditor onUpdate={onUpdate} sendConfigList={sendConfigList}/>
      </Modal>
    </div>
  )
})

export default SendConfigTableEditorModal;

