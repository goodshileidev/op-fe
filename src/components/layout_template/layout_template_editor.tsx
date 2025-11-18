import React, {useEffect, useState} from 'react'
import {v4 as uuid} from 'uuid'
import {Button, Card, Input, message, Modal, Popconfirm, Select, Space, Spin, Table} from 'antd'
import {DeleteFilled} from '@ant-design/icons'
import {LayoutTemplateType} from '@/common/data_type/ui/layout_template'
import {codeList} from '@/common/code_list/code_list_static'
import {useTranslation} from 'react-i18next';
import 'react-quill/dist/quill.snow.css';

interface ILayoutTemplateTableProps {
  isEditorModalVisible?: boolean
  parentData: any,
  jsonFieldName: string,
  onClose: any
}

const LayoutTemplateEditor: React.FC<ILayoutTemplateTableProps> = ((props) => {
  const [layoutTemplateList, setLayoutTemplateList] = useState<LayoutTemplateType | any>([]);
  // const [currentLayoutTemplate, setCurrentLayoutTemplate] = useState<LayoutTemplateType|any>({});
  let isVisible = props.isEditorModalVisible
  const {t} = useTranslation();


  useEffect(() => {
    const value = props.parentData[props.jsonFieldName]
    let list = []
    if (value) {
      try {
        list = JSON.parse(value)
      } catch (e) {
        console.debug("Parse data failed->layoutTemplate:", e)
      }
    }
    setLayoutTemplateList(list)
  }, []);


  const confirm = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, row: any, index: number) => {
    console.log("PopconfirmProps['onConfirm']", row, index);
    delete layoutTemplateList[index]
    message.success(t("common.delete_success"));
  };

  const cancel = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
    console.log("PopconfirmProps['onCancel']", e);
  };

  const handleOk = () => {
    const value = JSON.stringify(layoutTemplateList)
    props.parentData[props.jsonFieldName] = value
    props.onClose(props.parentData, props.jsonFieldName)
    return true
  }

  const handleCancel = () => {
    props.onClose(null)
    return true
  }

  const columns = [
    {
      title: t("ui.layout_template.section_key"),
      key: "section_key",
      dataIndex: "sectionKey",
      render: (text: string, row: LayoutTemplateType, index: number) => (
        <Input placeholder={t("ui.layout_template.section_key")}
               value={row.sectionKey}
               onChange={(e) => {
                 let value = e.target.value
                 console.log('"sectionKey->changed', value, index);
                 row.sectionKey = value
               }}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("ui.layout_template.section_name"),
      key: "section_name",
      dataIndex: "sectionName",
      render: (text: string, row: LayoutTemplateType, index: number) => (
        <Input placeholder={t("ui.layout_template.section_name")}
               value={row.sectionName}
               onChange={(e) => {
                 let value = e.target.value
                 console.log('"sectionName->changed', value, index);
                 row.sectionName = value
               }}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("ui.layout_template.section_type"),
      key: "section_type",
      dataIndex: "sectionType",
      render: (text: string, row: LayoutTemplateType, index: number) => (
        <Select
          options={
            codeList.PageSectionType
          }
        >
          value={row.sectionType}
          onChange={(e) => {
          let value = e.target.value
          console.log('"sectionType->changed', value, index);
          row.sectionType = value
        }}
          placeholder={t("ui.layout_template.section_type")}
        </Select>
      ),
      className: " text_center ",
    },
    {
      title: t("ui.layout_template.column_count"),
      key: "column_count",
      dataIndex: "columnCount",
      render: (text: string, row: LayoutTemplateType, index: number) => (
        <Input placeholder={t("ui.layout_template.column_count")}
               value={row.columnCount}
               onChange={(e) => {
                 let value = e.target.value
                 console.log('"columnCount->changed', value, index);
                 row.columnCount = value
               }}
        />
      ),
      className: " text_center ",
    },
    {
      title: t("ui.layout_template.alignment"),
      key: "alignment",
      dataIndex: "alignment",
      render: (text: string, row: LayoutTemplateType, index: number) => (
        <Select
          options={
            codeList.PageAlignment
          }
        >
          value={row.alignment}
          onChange={(e) => {
          let value = e.target.value
          console.log('"alignment->changed', value, index);
          row.alignment = value
        }}
          placeholder={t("ui.layout_template.alignment")}
        </Select>
      ),
      className: " text_center ",
    },

    {
      title: t("common.button.operate"),
      align: "center",key: 'action',
      render: (text: string, row: LayoutTemplateType, index: number) => (
        <Space size="middle">
          <Popconfirm
            title={t("common.row_delete_title")}
            description={t("common.row_delete_description")}
            onConfirm={(e) => confirm(e, row, index)}
            onCancel={cancel}
            okText={t("common.yes")}
            cancelText={t("common.no")}
          >
            <Button icon={<DeleteFilled/>} type="link" ghost>
              {t("common.button.delete")}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Modal
        width={"800px"}
        title={t("common.title.detail", {'entity': 'ui.layout_template.layoutTemplate'})}
        visible={isVisible}
        open={isVisible}
        okText={t("common.close")}
        onOk={handleOk}
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
        <Card title={t("common.title.list", {'entity': 'ui.layout_template.layoutTemplate'})} bordered={true}>
          <div>
            <Button type="primary" onClick={() => {
              const newRow: LayoutTemplateType = {}
              newRow.layoutTemplateId = uuid()
              layoutTemplateList.push(newRow)
            }}>
              {t("common.button.add")}
            </Button>
          </div>
          <Spin>
            <Table columns={columns}
                   dataSource={layoutTemplateList}
                   rowKey="layoutTemplateId"/>
          </Spin>
        </Card>
      </Modal>
    </div>
  )
})

export default LayoutTemplateEditor;

