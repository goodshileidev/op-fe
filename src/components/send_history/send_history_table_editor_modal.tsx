import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {SendHistoryType} from '@/common/data_type/form/send_history'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import SendHistoryTableEditor from '@/components/send_history/send_history_table_editor'

interface ISendHistoryTableEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const SendHistoryTableEditorModal: React.FC<ISendHistoryTableEditorModalProps> = ((props) => {
  const [sendHistoryList, setSendHistoryList] = useState<SendHistoryType | any>([]);
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
        console.debug("Parse data failed->sendHistory:", e)
      }
    }
    setSendHistoryList(list)
  }, []);

  const handleSave = () => {
    const value = sendHistoryList
    props.parentData[props.jsonFieldName] = value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setSendHistoryList(value)
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('form.send_history')})}
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
        <SendHistoryTableEditor onUpdate={onUpdate} sendHistoryList={sendHistoryList}/>
      </Modal>
    </div>
  )
})

export default SendHistoryTableEditorModal;

