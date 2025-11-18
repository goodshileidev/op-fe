import React, {useEffect, useState} from 'react'
import {Modal} from 'antd'
import {TableColumnConfigType} from '@/common/data_type/template/table_column_config'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import TableColumnConfigTableEditor from '@/components/table_column_config/table_column_config_table_editor'

interface ITableColumnConfigTableEditorModalProps {
  isEditorModalOpen?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const TableColumnConfigTableEditorModal: React.FC<ITableColumnConfigTableEditorModalProps> = ((props) => {
  const [tableColumnConfigList, setTableColumnConfigList] = useState<TableColumnConfigType | any>([]);
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
        console.debug("Parse data failed->tableColumnConfig:", e)
      }
    }
    setTableColumnConfigList(list)
  }, []);

  const handleSave = () => {
    const value = tableColumnConfigList
    props.parentData[props.jsonFieldName] = value
    props.onClose(value, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return false
  }

  const onUpdate = (value) => {
    setTableColumnConfigList(value)
  }

  return (
    <div>
      <Modal
        width={"80%"}
        title={t("common.title.edit", {'entity': t('template.table_column_config')})}
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
        <TableColumnConfigTableEditor onUpdate={onUpdate} tableColumnConfigList={tableColumnConfigList}/>
      </Modal>
    </div>
  )
})

export default TableColumnConfigTableEditorModal;

