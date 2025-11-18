import React, {useEffect, useState} from 'react'
import { v4 as uuid } from 'uuid'
import {Space, Modal, Popconfirm, Table, Tag, TableProps, Button, Select, RadioGroup, CheckboxGroup, Card, message, Input, Spin} from 'antd'
import {DeleteFilled, EditFilled} from '@ant-design/icons'
import {Link} from 'umi'
import {DocumentStepType} from '@/common/data_type/system/document_step'
import {codeList, renderCodeList} from '@/common/code_list/code_list_static'
import {codeListService} from '@/common/code_list/code_list_service'
import {useTranslation} from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DocumentStepFormEditor from '@/components/document_step/document_step_form_editor'

interface IDocumentStepFormEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  jsonFieldLabel: string
  onClose: any
}

const DocumentStepFormEditorModal: React.FC<IDocumentStepFormEditorModalProps> = ((props) => {
  const [documentStepList, setDocumentStepList] = useState<DocumentStepType|any>([]);
  let isOpen = props.isEditorModalOpen
  const parentData = props.parentData
  const jsonFieldName = props.jsonFieldName
  const { t } = useTranslation();
  const onClose = props.onClose
  useEffect(() => {
    console.debug("DocumentStepTableEditorModal->useEffect", parentData, jsonFieldName)
    let list =[]
    if (jsonFieldName && !parentData) {
        const value = props.parentData[props.jsonFieldName]
        if (value) {
          try{
            list = JSON.parse(value)
          } catch (e) {
            console.debug("Parse data failed->documentStep:", e)
          }
        }
    }
    console.debug("DocumentStepList", list)
    setDocumentStepList(list)
  }, [parentData, jsonFieldName]);

  const handleSave = () => {
    const value = documentStepList
    props.parentData[props.jsonFieldName]=value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setDocumentStepList(value[props.jsonFieldName])
  }

  return (
      <div>
        <Modal
          width={"80%"}
          title={t("common.title.edit", {"entity": props.jsonFieldLabel})}
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
          <DocumentStepFormEditor
            onUpdate={onUpdate}
            fieldName={props.jsonFieldName}
            fieldLabel={props.jsonFieldLabel}
            documentStepList = {documentStepList}
            />
       </Modal>
      </div>
   )
})

export default DocumentStepFormEditorModal;

