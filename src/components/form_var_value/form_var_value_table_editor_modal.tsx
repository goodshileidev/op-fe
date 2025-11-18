import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {FormVarValueType} from '@/common/data_type/template/form_var_value'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import FormVarValueTableEditor from '@/components/form_var_value/form_var_value_table_editor'

interface IFormVarValueTableEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const FormVarValueTableEditorModal: React.FC<IFormVarValueTableEditorModalProps> = ((props) => {
  const [formVarValueList, setFormVarValueList] = useState<FormVarValueType | any>([]);
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
        console.debug("Parse data failed->formVarValue:", e)
      }
    }
    setFormVarValueList(list)
  }, []);

  const handleSave = () => {
    const value = formVarValueList
    props.parentData[props.jsonFieldName] = value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setFormVarValueList(value)
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('template.form_var_value')})}
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
        <FormVarValueTableEditor onUpdate={onUpdate} formVarValueList={formVarValueList}/>
      </Modal>
    </div>
  )
})

export default FormVarValueTableEditorModal;

