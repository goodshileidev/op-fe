import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {FormVarConfigType} from '@/common/data_type/template/form_var_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import FormVarConfigTableEditor from '@/components/form_var_config/form_var_config_table_editor'

interface IFormVarConfigTableEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const FormVarConfigTableEditorModal: React.FC<IFormVarConfigTableEditorModalProps> = ((props) => {
  const [formVarConfigList, setFormVarConfigList] = useState<FormVarConfigType | any>([]);
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
        console.debug("Parse data failed->formVarConfig:", e)
      }
    }
    setFormVarConfigList(list)
  }, []);

  const handleSave = () => {
    const value = formVarConfigList
    props.parentData[props.jsonFieldName] = value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setFormVarConfigList(value)
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('template.form_var_config')})}
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
        <FormVarConfigTableEditor onUpdate={onUpdate} formVarConfigList={formVarConfigList}/>
      </Modal>
    </div>
  )
})

export default FormVarConfigTableEditorModal;

