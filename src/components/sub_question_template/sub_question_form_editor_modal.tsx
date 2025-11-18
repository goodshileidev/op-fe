import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {SubQuestionType} from '@/common/data_type/template/sub_question'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import SubQuestionFormEditor from '@/components/sub_question_template/sub_question_form_editor'

interface ISubQuestionFormEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const SubQuestionTableEditorModal: React.FC<ISubQuestionFormEditorModalProps> = ((props) => {
  const [subQuestionList, setSubQuestionList] = useState<SubQuestionType | any>([]);
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
        console.debug("Parse data failed->subQuestion:", e)
      }
    }
    setSubQuestionList(list)
    console.debug("SubQuestionList", subQuestionList)
  }, []);

  const handleSave = () => {
    const value = subQuestionList
    props.parentData[props.jsonFieldName] = value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setSubQuestionList(value[props.jsonFieldName])
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('template.sub_question')})}
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
        <SubQuestionFormEditor onUpdate={onUpdate} fieldName={props.jsonFieldName} subQuestionList={subQuestionList}/>
      </Modal>
    </div>
  )
})

export default SubQuestionTableEditorModal;

